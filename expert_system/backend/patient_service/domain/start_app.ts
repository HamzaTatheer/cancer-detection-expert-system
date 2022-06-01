import DAO from "../data/DAO";
let Patient = require("./entities/Patient");
let Biopsy = require("./entities/Biopsy");


import express from "express";
import bodyParser from "body-parser";

export default function start_express(){

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/",(req,res)=>{

        let dao = new DAO();
        

        if(dao==undefined)
            res.send("Api works but dao object was not created");
        else
            res.send("Api works and dao object got created.");


    });



    app.get("/getAllPatientBiopsies", (req, res) => {

        try{
            res.send([]);
        }
        catch(e){
            res.send([]);
        }

    });

    app.post("/addPatientRecord", (req, res) => {    
        try{
            let cnic = req.body.cnic;
            let name = req.body.name;

            let patient = new Patient(-1,cnic,name);

            console.log(cnic+" "+name);

            let dao = new DAO();
            dao.storePatientRecord(patient.getCnic(),patient.getName());
            
            res.send("done");

        }catch(e){
            console.log(e);
            res.status(400).send();
        }
    });



    app.post("/addPatientSvsFile", (req, res) => {    
        try{
        let cnic = req.body.cnic;
        let name = req.body.name;
        

        let biopsy = new Biopsy(name);

        let dao = new DAO();
        dao.storeBiopsyFile(cnic,biopsy.getFileName());
        res.send("done");

        }catch(e){

            res.status(400).send();
        }
    });



    app.listen(3000, () => console.log("PMS listening on port 3000!"));
}