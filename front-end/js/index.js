async function getTeddies(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const teddies = await response.json();
            const containerTeddies = document.getElementById('containerTeddies');
            teddies.forEach(teddy => createTeddyBox(teddy, containerTeddies));
        } else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        }
    } catch (error) {
        alert("Erreur : " + error);
    }
}

function createTeddyBox(teddy, container) {
    const box = createTag('div', 'containerTeddies__boxes', null, container);
    createTag('img', 'containerTeddies__boxes--img', null, box, {
        'src': teddy.imageUrl,
        'alt': teddy.name
    });
    createTag('h3', 'containerTeddies__boxes--name', teddy.name, box);
    createTag('p', 'containerTeddies__boxes--description', teddy.description, box);
    createTag('p', 'containerTeddies__boxes--price', "Seulement " + (teddy.price / 100) + ' €', box);
    createTag('a', 'containerTeddies__boxes--btn btn',  'Commandez' + ' ' + teddy.name + ' !', box, {
        'href': './produit.html?id=' + teddy._id
    });
}

getTeddies(apiUrl);