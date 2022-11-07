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
    // createTables: (req, res) => {
    //     sequelize.query(`
    //     CREATE TABLE listings (
    //         id SERIAL PRIMARY KEY,
    //         make VARCHAR(255) NOT NULL,
    //         model VARCHAR(255) NOT NULL,
    //         year INT NOT NULL,
    //         mileage INT,
    //         price INT NOT NULL,
    //         color VARCHAR(255) NOT NULL,
    //         vin VARCHAR(17) CHECK (LENGTH(vin)=17) NOT NULL,
    //         additional_info VARCHAR(255)
    //     );
    //     CREATE TABLE users (
    //         id SERIAL PRIMARY KEY,
    //         first_name VARCHAR(255) NOT NULL,
    //         last_name VARCHAR(255) NOT NULL,
    //         username VARCHAR(255) NOT NULL,
    //         password VARCHAR(255) NOT NULL,
    //         email VARCHAR(255) NOT NULL
    //     );
    //     CREATE TABLE users_listings (
    //         id SERIAL PRIMARY KEY,
    //         user_id INT REFERENCES users(id),
    //         listings_id INT REFERENCES listings(id)
    //     );
    //     `)
    // },
   getListings: (req, res) => {
    sequelize.query(`
        SELECT * FROM listings
    `)
    .then(dbRes => {
        res.status(200).send(dbRes[0])
    })
    .catch((error) => {
    res.status(404).send(error)  
    })
   }
}