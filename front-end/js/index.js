/////////////////////////////////////////////////////////
//                                                     //
// AFFICHAGE DES INFOS API DES TEDDIES DANS INDEX.HTML //
//                                                     //
/////////////////////////////////////////////////////////

// Fonction principale pour récupérer les données de l'API et les mettre en forme dans le DOM (HTML)
const getTeddies = async function (url) {

    // Récupération des données de l'API (instruction qu'on souhaite exécuter)
    try {
        // Requête faite à l'URL
        let response = await fetch(url)

        // et promesse qui se résoud si accès aux données (HTTP-status is 200-299)
        if (response.ok) { 

            // Résulats des données en JSON (objet JavaScript)
            let teddies = await response.json()

            // console.log(teddies); => Test Ok (on récupère les 5 arrays)

            // Création d'une boucle pour parcourir l'objet et création des éléments dans le DOM
            for (let teddy of teddies) {

                // Retourner l'élément qui a l'attribut ID "containerTeddies"
                const containerTeddies = document.getElementById('containerTeddies')

                // Création d'une "div" box comprenant l'image / nom / description / prix et bouton pour chaque TEDDY
                const containerTeddies__boxes = createTag('div', 'containerTeddies__boxes', null, containerTeddies, null)
                const img = createTag('img', 'containerTeddies__boxes--img', null, containerTeddies__boxes, {
                    'src': teddy.imageUrl,
                    'alt': teddy.name
                })
                const name = createTag('h3', 'containerTeddies__boxes--name', teddy.name, containerTeddies__boxes, null)
                const description = createTag('p', 'containerTeddies__boxes--description', teddy.description, containerTeddies__boxes, null)
                const price = createTag('p', 'containerTeddies__boxes--price', "Seulement " + (teddy.price / 100) + ' €', containerTeddies__boxes, null)
                const button = createTag('a', 'containerTeddies__boxes--btn btn',  'Commandez' + ' ' + teddy.name + ' !', containerTeddies__boxes, {
                    'href': './produit.html?id=' + teddy._id
                })
            }

        // Gestion de l'erreur si accès aux données mais problème serveur
        } else {
            console.error('Retour du serveur : ', response.status)
        }

    // Gestion de l'erreur si impossibilité d'accèder aux données (ex : mauvaise adresse)
    } catch (error) {
        alert("Erreur : " + error)
    }
}
// Appel de la fonction getTeddies
getTeddies(apiUrl)