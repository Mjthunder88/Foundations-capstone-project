let listingForm = document.querySelector('form')

function createListing (e) {
    e.preventDefault()

    let select = document.getElementById('make-dropdown')
    let modelInput = document.getElementById('model-input')
    let yearInput = document.getElementById('year-input')
    let mileageInput = document.getElementById('mileage-input')
    let vinInput = document.getElementById('vin-input')
    let descriptionInput = document.getElementById('description-input')
    let colorInput = document.getElementById('color-input')
    let priceInput = document.getElementById('price-input')
    let imageInput = document.getElementById('image-input')

    let bodyObj = {
        select: select.value,
        modelInput: modelInput.value,
        yearInput: yearInput.value,
        mileageInput: mileageInput.value,
        priceInput: priceInput.value,
        vinInput: vinInput.value,
        colorInput: colorInput.value,
        descriptionInput: descriptionInput.value,
        imageInput: imageInput.value

    }
    // console.log(bodyObj)
   
    
    axios.post('/create', bodyObj)
    .then(res => {
        setTimeout( () => {
            location.href = "/"
        }, 3000)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your listing has been created!',
            showConfirmButton: false,
            timer: 2000
        })
    })
    .catch(error =>  {
        console.log(error)
    })
    select.value = ''
    modelInput.value = ''
    yearInput.value = ''
    mileageInput.value = ''
    priceInput.value = ''
    vinInput.value = ''
    colorInput.value = ''
    descriptionInput.value = ''
    imageInput.value = ''
}

listingForm.addEventListener('submit', createListing)