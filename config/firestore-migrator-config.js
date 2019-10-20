const firestoreMigratorConfig = {
  // Dates param to pass to firestore-export-import
  dates:[],

  // Locations param to pass to firestore-export-import
  locations:[],

  // Sample config, you can define your custom environments
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
    tst:{
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
    
    // prd environment 
    prd:{
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