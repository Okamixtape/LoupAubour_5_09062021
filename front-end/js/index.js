// Synchronisation Récupération et Génération des données de l'API 
(async () => {
    const teddies = await getTeddies()
    generatePage(teddies)
})()

// Récupération des données de l'API
async function getTeddies() {
    return fetch("http://localhost:3000/api/teddies/")
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((teddies) => teddies)

    .catch((error) => {
        alert(
        "Erreur 404 - La ressource n'a pas été trouvée à l'adresse demandée."
        )
    })
}

// Génération des données de l'API
function generatePage(teddies) {
    // Générer les données teddies dans la div "teddiesList" 
    document.getElementById("teddiesList").innerHTML = ""

    // Loop pour générer chaque données "teddy"
    teddies.forEach((teddy) => {
    displayTeddy(teddy)
    })
}

// Affichage des données de l'API dans template du HTML
function displayTeddy(teddy) {
    // Récupérer template
    const templateElt = document.getElementById("teddy")

    // Cloner template
    const cloneElt = document.importNode(templateElt.content, true)

    // Placer données dans template à chaque id
    cloneElt.getElementById("teddyLink").href = `/produit.html?id=${teddy._id}`
    cloneElt.getElementById("teddyImage").src = teddy.imageUrl
    cloneElt.getElementById("teddyName").textContent = teddy.name
    cloneElt.getElementById("teddyPrice").textContent = `${teddy.price / 100}.00 €`
    cloneElt.getElementById("teddyDescription").textContent = teddy.description

    // WATCH OUT : ` is not ' or "

    // Créer la div "template" dans "teddiesList"
    document.getElementById("teddiesList").appendChild(cloneElt)
}