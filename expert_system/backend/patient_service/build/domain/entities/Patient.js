"use strict";
class Patient {
    constructor(id, name, cnic) {
        // find out if id should be added
        if (name == undefined || cnic == undefined)
            throw "Error: A parameter provided to patient is undefined";
        this.id = id;
        this.name = name;
        this.cnic = cnic;
        this.biopsy = [];
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getName() {
        return this.name;
    }
    getCnic() {
        return this.cnic;
    }
    setName(name) {
        if (name == undefined)
            throw "Error: Name must be defined";
        this.name = name;
        return true;
    }
    setCnic(cnic) {
        if (cnic == undefined)
            throw "Error: Cnic must be defined";
        this.cnic = cnic;
        return false;
    }
}
module.exports = Patient;
