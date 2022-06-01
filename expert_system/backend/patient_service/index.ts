import createDatabase from "./startup/createDatabase";
import start_app from "./domain/start_app";
import Patient from "./data/models/Patient";
import Biopsy from "./data/models/Biopsy";


createDatabase().then(async ()=>{
    

    let p = Patient.build({});
    p.save();

    console.log((await Patient.findAll()));

    //start_app();
});
