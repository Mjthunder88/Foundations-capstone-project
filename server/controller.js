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
    createTables: (req, res) => {
        sequelize.query(`
            CREATE TABLE listings (
                id SERIAL PRIMARY KEY,
                name VARCHAR() NOT NULL,
                make VARCHAR() NOT NULL,
                model VARCHAR() NOT NULL,
                year INT NOT NULL,
                mileage INT,
                price INT NOT NULL,
                vin INT NOT NULL
            );
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR() NOT NULL,
                last_name VARCHAR() NOT NULL,
                username VARCHAR() NOT NULL,
                password VARCHAR() NOT NULL,
                email VARCHAR() NOT NULL
            );
            CREATE TABLE users_listings (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id),
                listings_id INT REFERENCES listings(id)
            );
            
        `)
    },
   getListings: (req, res) => {
    sequelize.query(`
        SELECT * FROM listings
    `)
   }
}