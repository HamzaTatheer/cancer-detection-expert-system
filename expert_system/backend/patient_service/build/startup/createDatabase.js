"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Patient_1 = __importDefault(require("../data/models/Patient"));
const Biopsy_1 = __importDefault(require("../data/models/Biopsy"));
const sequelize = new sequelize_1.Sequelize('sqlite::memory:');
function createDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        Patient_1.default.init({
            // Model attributes are defined here
            CNIC: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            NAME: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
        }, {
            // Other model options go here
            sequelize, // We need to pass the connection instance
        });
        Biopsy_1.default.init({
            CNIC: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            file_name: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            }
        }, { sequelize });
        Patient_1.default.hasMany(Biopsy_1.default);
        Biopsy_1.default.belongsTo(Patient_1.default);
        yield sequelize.sync();
    });
}
exports.default = createDatabase;
