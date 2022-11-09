let listingContainer = document.getElementById('listings')

function allListings () {
    // event.preventDefault()

    axios.get('http://localhost:5002/listings') 
    .then (res => {
        // console.log(res)
        let listings = res.data
        console.log(listings)
        for (let i = 0; i < res.data.length; i++) {
            let listingCard = listings[i]
            console.log(listingCard)
            let details = document.createElement('p')
            details.textContent = listingCard.make + ' ' + listingCard.model + ' ' + listingCard.year + ' ' + listingCard.mileage + ' ' + listingCard.price + ' ' + listingCard.vin
            console.log(details)
            listingContainer.appendChild(details)
        }
        
    })
    .catch((error) => console.log(error))
}




allListings()