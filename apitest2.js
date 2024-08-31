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

async function sendPetData(pet) {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', pet);
        console.log('Send Status Code:', response.status);
        console.log('Send Response Data:', response.data);
        console.log('Send Response Id:', response.data.id);
        return { success: true, message: 'Send data successful', statusCode: response.status };
    } catch (error) {
        console.error('Send Error occurred:', error.message);
        return { success: false, message: error.message, statusCode: error.response ? error.response.status : 500 };
    }
}

async function getPetData(pet) {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', pet);
        console.log('Get Status Code:', response.status);
        console.log('Get Response Data:', response.data);
        console.log('Get Response Id:', response.data.id);
        return { success: true, message: 'Get data successful', statusCode: response.status };
    } catch (error) {
        console.error('Get Error occurred:', error.message);
        return { success: false, message: error.message, statusCode: error.response ? error.response.status : 500 };
    }
}

// Példa az objektum létrehozására és elküldésére
const pet = createPet(
    1,                     // id
    2,                     // categoryId
    "Pets",                // categoryName
    "doggie",              // name
    ["https://example.com/dog.jpg"], // photoUrls
    [{ id: 3, name: "cute" }], // tags
    "available"            // status
);

// Lépések végrehajtása
(async function() {
    const sendResult = await sendPetData(pet);
    const getResult = await getPetData(pet);

    if (!sendResult.success) {
        console.error(`Step 1 failed: ${sendResult.message}`);
        process.exit(1); // Kritikus hiba
    }

    if (!getResult.success) {
        console.error(`Step 2 failed: ${getResult.message}`);
        process.exit(2); // Nem kritikus hiba
    }

    console.log('All steps completed successfully.');
})();