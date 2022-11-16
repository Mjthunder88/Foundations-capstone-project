let listingContainer = document.getElementById('listings')
let main = document.querySelector('main')
let listingForm = document.querySelector('form')

// Modal section
const modal = document.getElementById('modal')
const openModal = document.querySelectorAll('offer-btns')
const closeModal = document.getElementById('close-modal-btn')
const cancelModal = document.getElementById('close-modal')
const offerForm = document.getElementById('modal-submit')

// Footer section

const link1 = document.getElementById('social-link-1')
const link2= document.getElementById('social-link-2')
const link3 = document.getElementById('social-link-3')


function modalFunc (e) {
    // console.log(e.target.getAttribute('listingId'))
    modal.showModal()
}


function allListings () {

    axios.get('/listings') 
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
                if (i === listings.length - 1) {
                    main.appendChild(rowDiv)
                }
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
    axios.get('/makes')
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

function makeOffer (e) {
    e.preventDefault()
    let userNameInput = document.getElementById('username-offer')
    let emailInput = document.getElementById('email-offer')
    let priceInput = document.getElementById('price-offer')

    let bodyObj = {
        userNameInput: userNameInput.value,
        emailInput: emailInput.value,
        priceInput: priceInput.value
    }

    modal.close()
    axios.post('/offer', bodyObj)
    .then(res => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your offer has been submitted!',
            showConfirmButton: false,
            timer: 1500
          })
    })
    .catch(error => {
        console.log(error)
    })

    userNameInput.value =''
    emailInput.value = ''
    priceInput.value = ''
}

// getMakes() 
allListings()

offerForm.addEventListener('submit', makeOffer)

cancelModal.addEventListener('click', () => {
    modal.close();
})

function alertFunc (event) {
    event.preventDefault()
    Swal.fire({
        position: 'center',
        icon: 'Error!',
        title: 'Under Maintenance',
        showConfirmButton: false,
        timer: 2000
    })
}


link1.addEventListener('click',alertFunc)
link2.addEventListener('click',alertFunc)
link3.addEventListener('click',alertFunc)

