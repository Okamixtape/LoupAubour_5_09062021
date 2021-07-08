/////////////////////////////////////////////////////////
//                                                     //
// AFFICHAGE DES INFOS API DES TEDDIES DANS INDEX.HTML //
//                                                     //
/////////////////////////////////////////////////////////


// Temporisation Récupération et Génération des données de l'API 
(async () => {
    const teddies = await getTeddies()
    // Vérifier si l'on récupère bien les infos : console.log(teddies)
    generatePage(teddies)
})() // Fonction auto-appelée

// Récupération des données de l'API avec fetch
async function getTeddies() {
    // Promesse GET
    return fetch("http://localhost:3000/api/teddies/")
    // Body de la response HTTP à transformer en JSON
    .then((httpBodyResponse) => httpBodyResponse.json())
    // On récupère les teddies
    .then((teddies) => teddies)
    // Si l'API n'est pas utilisable alerte : "Attention il y a un problème"
    .catch((alert) => {
        alert(
        "Erreur 404 - La ressource n'a pas été trouvée à l'adresse demandée."
        )
    })
}

// Génération des données de l'API
function generatePage(teddies) {
    // Générer les données teddies dans la div parent "teddiesList" 
    document.getElementById("teddiesList").innerHTML = ""

    // Boucle pour générer chaque données "teddy"
    teddies.forEach((teddy) => {
    displayTeddy(teddy)
    })
}

// Affichage des données de l'API dans template du HTML
function displayTeddy(teddy) {
    // Récupérer élement template
    const templateElt = document.getElementById("teddy")

    // Cloner template
    const cloneElt = document.importNode(templateElt.content, true)

    // Placer données dans template à chaque id correspondant
    // WATCH OUT : ` is not ' or "
    cloneElt.getElementById("teddyLink").href = `./produit.html?id=${teddy._id}`
    cloneElt.getElementById("teddyImage").src = teddy.imageUrl
    cloneElt.getElementById("teddyName").textContent = teddy.name
    cloneElt.getElementById("teddyPrice").textContent = "Seulement " + `${teddy.price / 100}.00 €`
    cloneElt.getElementById("teddyDescription").textContent = teddy.description

    // Créer la div "template" dans div parent "teddiesList"
    document.getElementById("teddiesList").appendChild(cloneElt)
}