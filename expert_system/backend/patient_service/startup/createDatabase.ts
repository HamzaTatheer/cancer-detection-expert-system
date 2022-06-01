import { Sequelize, DataTypes } from "sequelize";
import Patient from "../data/models/Patient";
import Biopsy from "../data/models/Biopsy";

const sequelize = new Sequelize('mysql://user:password@localhost.com:3307/db');
export default async function createDatabase(){

    Patient.init({
        // Model attributes are defined here
        CNIC:{
            type: DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        NAME: {
          type: DataTypes.STRING,
          allowNull: false
        },
    }, 
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
    });

    Biopsy.init({
        CNIC:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        file_name:{
            type: DataTypes.STRING,
            primaryKey:true,
            allowNull:false
        }
    },{sequelize});

    Patient.hasMany(Biopsy);
    Biopsy.belongsTo(Patient);

    await sequelize.sync();

}