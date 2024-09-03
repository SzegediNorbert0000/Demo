const axios = require('axios');

// Paraméterezhető függvény az objektum létrehozásához
function createPet(id, categoryId, categoryName, name, photoUrls = [], tags = [], status = "available") {
    return {
        id: id,
        category: {
            id: categoryId,
            name: categoryName
        },
        name: name,
        photoUrls: photoUrls,
        tags: tags.map(tag => ({
            id: tag.id,
            name: tag.name
        })),
        status: status
    };
}

function sendPetData(pet) {
    axios.post('https://jsonplaceholder.typicode.com/posts', pet)
        .then(response => {
            console.log('Status Code:', response.status);
            console.log('Response Data:', response.data);
            console.log('Response Id:', response.data.id);
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

function getPetData(pet) {
    axios.post('https://jsonplaceholder.typicode.com/posts', pet)
        .then(response => {
            console.log('Status Code:', response.status);
            console.log('Response Data:', response.data);
            console.log('Response Id:', response.data.id);
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}


// Példa az objektum létrehozására és elküldésére
const pet = createPet(
    11,                     // id
    2,                     // categoryId
    "Pets",                // categoryName
    "doggie",              // name
    ["https://example.com/dog.jpg"], // photoUrls
    [{ id: 3, name: "cute" }], // tags
    "available"            // status
);

sendPetData(pet);
getPetData(pet);