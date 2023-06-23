const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photos = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

const count = 30
const apiKey = ''
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function imageLoaded() {
    console.log('image loaded')
    imageLoaded++
    if (imagesLoaded == totalImages){
        ready = true
    }
}

function displayPhotos() {
    imageLoaded = 0

    photos.forEach(photo => {
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        const img = document.createElement('img')
        img.setAttribute('src', photo.urls.regular)
        img.setAttribute('alt',photo.alt_description)
        img.setAttribute('title',photo.alt_description)

        img.addEventListener('load', imageLoaded)

        item.appendChild(img)
        imageContainer.appendChild(item)
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photos = await response.json()
        displayPhotos()
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos()
    }
})

getPhotos()