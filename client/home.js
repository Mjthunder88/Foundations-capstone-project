let listingContainer = document.getElementById('listings')
let main = document.querySelector('main')

function allListings () {
    // event.preventDefault()


    axios.get('http://localhost:5002/listings') 
    .then (res => {
        let listings = res.data
        console.log(listings)
        for (let i = 0; i < listings.length; i++) {
            createCard(listings[i])
        }
        
    })
    .catch((error) => console.log(error))
}

function createCard (listing) {
    // listingContainer.innerHTML = ''
        let listingCard = `<div class = "card">
        <h3>$${listing.price}</h3>
        <h3>${listing.make}, ${listing.model}</h3>
        <image src= "${listing.image}" alt="Picture_of_a_car"/>
        <h3>Features & Specs</h3>
        <ul>Year: ${listing.year}</ul>
        <ul>Mileage: ${listing.mileage}</ul>
        <ul>Color: ${listing.color}</ul>
        <ul>Vin: ${listing.vin}</ul>
        <p>Additional info: ${listing.additional_info}</p>
        </div>`
        main.innerHTML += listingCard
}




allListings()