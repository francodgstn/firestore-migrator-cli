# firestore-migrator-cli

A simple CLI for [firestore-export-import](https://github.com/dalenguyen/firestore-backup-restore) 
to help migrate firestore data between different environments.

## Install

`npm install firestore-migrator-cli`

## Use

`firestore-migrator`

You can also directly pass params:

`firestore-migrator --file=target_file.json --env=dev --config=firestore-migrator-config.js`


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
