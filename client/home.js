let listingContainer = document.getElementById('listings')
let main = document.querySelector('main')
let listingForm = document.querySelector('form')


function allListings () {
    // event.preventDefault()


    axios.get('http://localhost:5002/listings') 
    .then (res => {
        let listings = res.data
        console.log(listings)
        let rowDiv = null
        for (let i = 0; i < listings.length; i++) {
            if (i % 2 === 0) {
                rowDiv = document.createElement('div')
                rowDiv.classList.add('row-container')
                let currentCard = createCard(listings[i])
                rowDiv.innerHTML += currentCard
            } else {
                let currentCard = createCard(listings[i])
                rowDiv.innerHTML += currentCard
                main.appendChild(rowDiv)
            }
        }
        
    })
    .catch((error) => console.log(error))
}

function createCard (listing) {
    // listingContainer.innerHTML = ''
        let listingCard = `<div class = "card-row">
        <div class = "card">
        <h3>$${listing.price}</h3>
        <h3>${listing.make}, ${listing.model}</h3>
        <image src= "${listing.image_url}" alt="Picture_of_a_car"/>
        <h3>Features & Specs</h3>
        <ul>Year: ${listing.year}</ul>
        <ul>Mileage: ${listing.mileage}</ul>
        <ul>Color: ${listing.color}</ul>
        <ul>Vin: ${listing.vin}</ul>
        <p>Additional info: ${listing.additional_info}</p>
        <button id ="offer-btn" class= "offer-btns"><span>Make An Offer!</span></button>
        </div>
        </div>`
        return listingCard
}

function getMakes () {
    axios.get('http://localhost:5002/makes')
    .then(res => {
        let makes = res.data
        makes.array.forEach(make => {
            const option = document.createElement('option')
            option.setAttribute('value', make['make_id'])
            option.textContent = make.name
            select.appendChild(option)
        });

    })
    .catch((error) => console.log(error))
}

// getMakes() 
allListings()