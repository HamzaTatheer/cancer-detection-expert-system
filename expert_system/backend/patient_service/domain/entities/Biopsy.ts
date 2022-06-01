class Biopsy{


    file_name:String;

    constructor(file_name:String){
        if(file_name == undefined) throw "Error: File Name For Biopsy Entity not defined";
        this.file_name = file_name;
    }

    getFileName(){
        return this.file_name;
    }

    setFileName(file_name:String){
        if(file_name == undefined) throw "Error: File Name For Biopsy Entity not defined";
        this.file_name = file_name;    
    }

}


module.exports = Biopsy;










