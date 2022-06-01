class Patient{


    id:number;
    name:String;
    cnic:String;
    biopsy:Array<Biopsy>;



    constructor(id:number,name:String,cnic:string){
        
        // find out if id should be added
        if(name == undefined || cnic == undefined) throw "Error: A parameter provided to patient is undefined";
        
        this.id = id;
        this.name = name;
        this.cnic = cnic;
        this.biopsy = [];
    }

    getId(){
        return this.id;
    }

    setId(id:number){
        this.id = id;
    }

    getName(){
        return this.name;
    }

    getCnic(){
        return this.cnic;
    }

    setName(name:String){

        if(name == undefined) throw "Error: Name must be defined";

        this.name = name;
        return true;
    }

    setCnic(cnic:String){

        if(cnic == undefined) throw "Error: Cnic must be defined";

        this.cnic = cnic;
        return false;
    }

}

module.exports = Patient;










