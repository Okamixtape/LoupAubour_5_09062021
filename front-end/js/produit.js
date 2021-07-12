///////////////////////////////////////////////////////////
//                                                       //
// AFFICHAGE DES INFOS API D'UN TEDDY DANS PRODUCT.HTML  //
//                                                       //
///////////////////////////////////////////////////////////

// Récupération de l'id du Teddy de la page

const urlParams = new URLSearchParams(window.location.search)
// console.log(urlParams) => 

const id = urlParams.get('id')
// console.log(id) => Test OK (on récupère l'id du Teddy sélectionné)


// Fonction principale de la page / récupérer les données du Teddy sélectionné et les mettre en forme dans le DOM (HTML)
const getTeddy = async function (url) {
    
    // Récupération des données de l'API
    try {
        // Requête faite à l'URL
        let response = await fetch(url)

        // Promesse qui se résoud si accès aux données (HTTP-status is 200-299)
        if (response.ok) {

            // Résulats des données en JSON (objet JavaScript)
            let teddy = await response.json()

            // console.log(teddy); => Test OK (on récupère l'array du teddy sélectionné)

            // Retourner l'élément qui a l'attribut ID "containerProduct"
            const containerProduct = document.getElementById('containerProduct')

            //Création des éléments dans le DOM (tag, className, content, parent, attributes)

            // Création d'une "div" box comprenant l'image / nom / description / prix
            const containerProduct__boxes = createTag('div', 'containerProduct__boxes', null, containerProduct, null)
            const img = createTag('img', 'containerProduct__boxes--img', null, containerProduct__boxes, {
                'src': teddy.imageUrl,
                'alt': teddy.name
            })
            const name = createTag('h3', 'containerProduct__boxes--name', teddy.name, containerProduct__boxes, null)
            const description = createTag('p', 'containerProduct__boxes--description', teddy.description, containerProduct__boxes, null)
            const price = createTag('p', 'containerProduct__boxes--price', "Seulement " + (teddy.price / 100).toFixed(2) + ' €', containerProduct__boxes, null)

            // Sélection choix de la couleur du Teddy
            const label = createTag('label', 'containerProduct__boxes--color' , 'Choisissez sa couleur : ', containerProduct__boxes, {
                'for': 'Choix de couleurs de ' + teddy.name
            })
            const select = createTag('select', 'form-control', null, containerProduct__boxes, {
                'name': 'Choix de couleurs de ' + teddy.name
            });

            // Récupération des différentes options de couleurs (options de la balise select)
            const colors = teddy.colors
            for (const color of colors) {
                const selectColor = createTag('option', null, color, select, {
                    'value': color
                })
            }

            // Bouton "Ajoutez "Teddy" au panier"
            const button = createTag('button', 'btn', 'Ajoutez' + ' ' + teddy.name + ' ' + 'au panier', containerProduct__boxes, null)

        // Gestion de l'erreur si accès aux données mais problème serveur
        } else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        }
        
    // Gestion de l'erreur si impossibilité d'accèder aux données (ex : mauvaise adresse)
    } catch (error) {
        alert("Erreur : " + error)
    }
}
// Appel de la fonction getTeddy
getTeddy(apiUrl + id)