import arg from 'arg';
import inquirer from 'inquirer';
import { migrate } from './main';
import path from 'path';

function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {
     '--file': String, 
     '--env': String,
     '--config': String,
     '--yes': Boolean,
     '-f': '--file',
     '-e': '--env',
     '-c': '--config',
     '-y': '--yes'
   },
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
   skipPrompts: args['--yes'] || false,
   action: args._[0],
   env: args['--env'],
   config: args['--config'],
   file: args['--file'],
 };
}


async function promptForMissingOptions(options) {
    const defaultAction = 'export';
    const defaultEnv = 'dev';
    const defaultConfig = '../config/firestore-migrator-config'; 
    if (options.skipPrompts) {
      return {
        ...options,
        action: options.action || defaultAction,
        env: options.env || defaultEnv,
        file: options.file || path.join(
          process.cwd(),
          "firestore-exports",
          `firestore_${defaultEnv}_${defaultAction}_${Date.now()}.json`),
        config: options.config || defaultConfig,
      };
    }

    // Ask for input params
    
    if (!options.config) {
      let answer = await inquirer.prompt({
        type: 'input',
        name: 'config',
        message: 'Where is the config file',
        default: defaultConfig,
      });
      options.config = answer.config;
    }
    var config =  require( options.config ).firestoreMigratorConfig;
    options.config = config;

    if (!options.action) {
      let answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Please choose which the action to perform',
        choices: ['export', 'import'],
        default: defaultAction,
      });
      options.action =answer.action;
    }

    if (!options.env) {
      let answer = await inquirer.prompt({
        type: 'list',
        name: 'env',
        message: 'Please choose which environment',
        choices: Object.keys(config.environments),
        default: defaultEnv,
      });
      options.env = answer.env;
    }

    if (!options.file) {
      let answer = await inquirer.prompt({
        type: 'input',
        name: 'file',
        message: 'Please insert a filepath',
        default:  
        path.join(
        process.cwd(),
        "firestore-exports",
         `firestore_${options.action}_${options.env}_${Date.now()}.json`
         ),
      });
      options.file =answer.file;
    }

    return options;
   }

   export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await migrate(options);
   }