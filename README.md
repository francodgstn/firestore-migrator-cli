# firestore-migrator-cli

A simple CLI for [firestore-export-import](https://github.com/dalenguyen/firestore-backup-restore) 
to help migrate firestore data between different environments.

## Install

`npm install firestore-migrator-cli`

## Use

Run and follow the questions, better to use full path for target and config file. 

`firestore-migrator`  


You can also directly pass the params:

`firestore-migrator [export|import] --env=dev --file=/fullpath/target_file.json --config=/fullpath/firestore-migrator-config.js`

The `--env` param should match one of the environment defied in the config file. 

## Config file

```javascript
const firestoreMigratorConfig = {
  // Dates param to pass to firestore-export-import
  dates:[],

  // Locations param to pass to firestore-export-import
  locations:[],

  // Sample config, you can define your custom environments 
  // the CLI will prompt to choose based on the key
  environments:
  {
    // dev environment 
    dev:{
      databaseUrl:"",
      key:{
        type: "",
        project_id: "",
        private_key_id: "",
        private_key: "",
        client_email: "",
        client_id: "",
        auth_uri: "",
        token_uri: "n",
        auth_provider_x509_cert_url: "",
        client_x509_cert_url: "" 
      },
    },

    // tst environment 
    test:{
      databaseUrl:"",
      key:{
        type: "",
        project_id: "",
        private_key_id: "",
        private_key: "",
        client_email: "",
        client_id: "",
        auth_uri: "",
        token_uri: "n",
        auth_provider_x509_cert_url: "",
        client_x509_cert_url: "" 
      },
    },
   
  }
}

export {
  firestoreMigratorConfig
}

```

## Additional metadata

The cli will only migrate collection data, for additional things like idexes, rules, auth 
and to delete all existing data use the firebase cli commands instead, below some example:

Firestore Indexes:   
`firebase firestore:indexes > firestore-indexes.json`  
`firebase deploy --only firestore:indexes`  

Firestore Rules:  
`firebase firestore:rules > firestore.rules`  
`firebase deploy --only firestore:rules`  


Firestore collection:   
`firebase firestore:delete --all-collections`  

Auth (replace `[?]` with the env specific info available in Firebase Console > Auth ):  
`firebase auth:export account_file.json --format=json`  
`firebase auth:import account_file.json --hash-algo=SCRYPT --hash-key=[?]  --salt-separator=[?] --rounds=[?] --mem-cost=`  


## Issues

- Importing dates and locations  
In [firestore-export-import](https://github.com/dalenguyen/firestore-backup-restore) parameterValid check for dates and geo locations should be removed as in general documents (even in the same collection) may have different fields,
see [Removed parameterValid](https://github.com/dalenguyen/firestore-backup-restore/pull/29).
