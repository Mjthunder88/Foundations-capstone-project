let listingContainer = document.getElementById('listings')
let main = document.querySelector('main')
let listingForm = document.querySelector('form')

// Modal section
const modal = document.getElementById('modal')
const openModal = document.querySelectorAll('offer-btns')
const closeModal = document.getElementById('close-modal-btn')
const cancelModal = document.getElementById('close-modal')


function modalFunc (e) {
    console.log(e.target.getAttribute('listingId'))
    modal.showModal()
}


function allListings () {

    axios.get('http://localhost:5002/listings') 
    .then (res => {
        let listings = res.data
        let rowDiv = null
        for (let i = 0; i < listings.length; i++) {
            // console.log(i)
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
        let listingCard = `<div class = "card-row">
        <div class = "card">
        <h3>$${listing.price}</h3>
        <h3>${listing.make}, ${listing.model}</h3>
        <image src= "${listing.image_url}" alt="Picture_of_a_car" class="listing-img"/>
        <h3>Features & Specs</h3>
        <ul>Year: ${listing.year}</ul>
        <ul>Mileage: ${listing.mileage}</ul>
        <ul>Color: ${listing.color}</ul>
        <ul>Vin: ${listing.vin}</ul>
        <p>Additional info: ${listing.additional_info}</p>
        <button listingId="${listing.id}" onclick="modalFunc(event)" class= "offer-btns">Make An Offer!</button>
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

closeModal.addEventListener('submit', () => {
    modal.close();
})
cancelModal.addEventListener('click', () => {
    modal.close();
})
