require('dotenv').config()
const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env
const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
}) 


module.exports = {
   getListings: (req, res) => {
    sequelize.query()
   },
   CreateTable: (req, res) => {
   }
}