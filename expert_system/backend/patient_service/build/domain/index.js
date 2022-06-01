"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = __importDefault(require("../data/DAO"));
let Patient = require("./entities/Patient");
let Biopsy = require("./entities/Biopsy");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    let dao = new DAO_1.default();
    if (dao == undefined)
        res.send("Api works but dao object was not created");
    else
        res.send("Api works and dao object got created.");
});
app.get("/getAllPatientBiopsies", (req, res) => {
    try {
        res.send([]);
    }
    catch (e) {
        res.send([]);
    }
});
app.post("/addPatientRecord", (req, res) => {
    try {
        let cnic = req.body.cnic;
        let name = req.body.name;
        let patient = new Patient(-1, cnic, name);
        console.log(cnic + " " + name);
        let dao = new DAO_1.default();
        dao.storePatientRecord(patient.getCnic(), patient.getName());
        res.send("done");
    }
    catch (e) {
        console.log(e);
        res.status(400).send();
    }
});
app.post("/addPatientSvsFile", (req, res) => {
    try {
        let cnic = req.body.cnic;
        let name = req.body.name;
        let biopsy = new Biopsy(name);
        let dao = new DAO_1.default();
        dao.storeBiopsyFile(cnic, biopsy.getFileName());
        res.send("done");
    }
    catch (e) {
        res.status(400).send();
    }
});
app.listen(3000, () => console.log("PMS listening on port 3000!"));
