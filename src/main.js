
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
// TODO: import properly (I'm not really familiar with this js/node imports so let's jist use require for now)
const firestoreService = require('firestore-export-import'); //import {firestoreService} from 'firestore-export-import';
// Init firestore-export-import

/** Exports all firestore collections into a json file. */
const exportDb = async ( filePath) => {
    console.log('Exporting firestore db..');
    let data = await firestoreService.backups();

    let targetDirectory = path.dirname(filePath)
    !fs.existsSync(targetDirectory) && fs.mkdirSync(targetDirectory);
   
    fs.writeFile(
        filePath,
        JSON.stringify(data),
        (err) => {
            if(err) 
               throw err;
            console.log(`${filePath} saved.`);
        }
    );
    return true;
};

/** Imports data from json file into firestore. */
const importDb = async (filePath, dates, locations) => {
    console.log('Importing data into firestore..');
    await firestoreService.restore(filePath, dates, locations);

    console.log(`${filePath} imported.`);
    return true;
};

/** Migrates data 
 * Connects to firestore db and runs the export/import
 */
export async function migrate(options) {
    // Init firestore-export-import
    firestoreService.initializeApp(
        options.config.environments[options.env].key,
        options.config.environments[options.env].databaseUrl
    );

    try {
        if (options.action === "export")
            await exportDb(options.file);
        else if (options.action === "import")
            await importDb(options.file, options.config.dates, options.config.locations );
    
    } catch (error) {
        console.error(`${chalk.red.bold('ERROR')} ${error}` );
        return false;
    }

    console.log(`${ chalk.green.bold('DONE')} ${options.action} finished.`);
    return true;
}