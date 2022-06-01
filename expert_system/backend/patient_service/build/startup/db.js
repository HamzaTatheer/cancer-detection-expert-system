"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sqlite::memory:');
function createDatabase() {
    // Patient.init({
    //     // Model attributes are defined here
    //     CNIC:{
    //         type: DataTypes.STRING,
    //         allowNull:false,
    //         primaryKey:true
    //     },
    //     NAME: {
    //       type: DataTypes.STRING,
    //       allowNull: false
    //     },
    // }, 
    // {
    //     // Other model options go here
    //     sequelize, // We need to pass the connection instance
    // });
    //await Patient.sync({ force: true });
}
exports.default = createDatabase;
