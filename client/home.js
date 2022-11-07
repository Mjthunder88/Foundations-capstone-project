
function allListings () {
    axios.get('/listings') 
    .then ((req, res) => {
        
    })
    .catch((error) => console.log(error))
}