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

// Need to add a image column for the listings database 
module.exports = {
    createTables: (req, res) => {
        sequelize.query(`
        CREATE TABLE listings (
            id SERIAL PRIMARY KEY,
            make_id INT NOT NULL REFERENCES makes(id),
            model VARCHAR(255) NOT NULL,
            year INT NOT NULL,
            mileage INT,
            price INT NOT NULL,
            color VARCHAR(255) NOT NULL,
            vin VARCHAR(17) CHECK (LENGTH(vin)=17) UNIQUE NOT NULL,
            additional_info VARCHAR(255),
            image_url VARCHAR
        );
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
        );
        CREATE TABLE users_listings (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id),
            listings_id INT REFERENCES listings(id)
        );
        CREATE TABLE makes (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );
        CREATE TABLE offers (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            price INT NOT NULL 
          );
        INSERT INTO makes (name) 
        VALUES ('Acura'),
        ('Alfa Romeo'),
        ('Audi'),
        ('Aston Martin'),
        ('Bently'),
        ('BMW'),
        ('Cadillac'),
        ('Chevrolet'),
        ('Doge'),
        ('Ferrari'),
        ('Ford'),
        ('Genisis'),
        ('GMC'),
        ('Honda'),
        ('Infiniti'),
        ('Jaguar'),
        ('Lamborghini'),
        ('Lexus'),
        ('Lotus'),
        ('Maserati'),
        ('Mazda'),
        ('Mclaren'),
        ('Mercedes-Benz'),
        ('Mitsubishi'),
        ('Nissan'),
        ('Porsche'),
        ('Rolls-Royce'),
        ('Scion'),
        ('Subaru'),
        ('Toyota'),
        ('Volkswagen');
        `)
    },
   getListings: (req, res) => {
    sequelize.query(`
        SELECT * FROM listings;
    `)
    .then(dbRes => {
        res.status(200).send(dbRes[0])
    })
    .catch((error) => {
    res.status(404).send(error)  
    })
   },
   getMakes: (req, res) => {
    sequelize.query(`
        SELECT * FROM makes;
    `)
    .then(dbRes => {
        res.status(200).send(dbRes[0])
    })
    .catch((error) => {
        res.status(404).send(error)
    })
   },
   createListing: (req, res) => {
    //    console.log(req.body)
    let {select, modelInput, mileageInput, priceInput, colorInput, vinInput, descriptionInput, imageInput, yearInput} = req.body
    sequelize.query(`
        INSERT INTO listings (make, model, year, mileage, price, color, vin, additional_info, image_url)
        VALUES ('${select}', '${modelInput}', ${yearInput}, ${mileageInput}, ${priceInput}, '${colorInput}', '${vinInput}', '${descriptionInput}', '${imageInput}');
    `)
    .then ( () => {
        res.status(200).send('Listing has been created!')
    })
    .catch(error => {
        console.log(error)
        res.status(404).send(`${error} something went wrong`)
    })
   },
   makeOffer: (req, res) => {
    let {userNameInput, emailInput, priceInput} =req.body
    
    sequelize.query(`
        INSERT INTO offers (username, email, price)
        VALUES ("${userNameInput}", "${emailInput}", ${priceInput})
    `)
    .then( () => {
        res.status(200).send('Your offer has been submitted!')
    })
    .catch(error => {
        res.status(404).send(`${error}`)
    })
   }
}