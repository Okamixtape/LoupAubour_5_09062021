///////////////////////////////////////////////////////////
//                                                       //
// AFFICHAGE DES INFOS API DES TEDDIES DANS PRODUCT.HTML //
//                                                       //
///////////////////////////////////////////////////////////

// Temporisation Récupération TeddyId et Récupération des données de l'API 
(async () => {
    const teddyId = getTeddyId()
    const teddyData = await getTeddyData(teddyId)
    // Vérifier si l'on récupère bien les infos : console.log(teddyId) et console.log(teddyData)
    generatePage(teddyData)
})() // Fonction auto-appelée

// Récupération de l'Id du doudou
function getTeddyId() {
    return new URL(window.location.href).searchParams.get('id')
}

// Récupération de l'Id depuis les données de l'API avec fetch
function getTeddyData(teddyId) {
    // Promesse GET
    return fetch(`http://localhost:3000/api/teddies/${teddyId}`)
    // Body de la response HTTP à transformer en JSON
    .then((httpBodyResponse) => httpBodyResponse.json())
    // On récupère les données du teddy
    .then((teddyData) => teddyData)
    // Si l'API n'est pas utilisable alerte : "Attention il y a un problème"
    .catch((error) => {
        alert(
            "Erreur 404 - La ressource n'a pas été trouvée à l'adresse demandée."
        )
    })

}

// Génération des données de l'API
function generatePage(teddy) {
    // Placer données dans template à chaque id correspondant
    // WATCH OUT : ` is not ' or "
    document.getElementById('teddyImage').src = teddy.imageUrl
    document.getElementById('teddyName').textContent = teddy.name
    document.getElementById('teddyPrice').textContent = "Seulement " + `${teddy.price / 100}.00 €`
    document.getElementById('teddyDescription').textContent = teddy.description
    document.getElementById('teddyColors').textContent = teddy.colors
}