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

            // Résulats des données en JSON
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

            // Fonction Ajout au panier / Gestion du panier
            // Récupération des données sélectionnées par l'utilisateur et envoie au panier

            function clickAddBasket(event) {
                event.preventDefault()
                
                // Déclaration des données du/des teddys(ies) incluses dans le panier (valeurs du formulaire)

                let teddiesChosen = {
                    teddyName: teddy.name,
                    teddyId: teddy._id,
                    teddyColor: select.value,
                    quantity: 1,
                    teddyPrice: teddy.price / 100,
                }

                // Déclaration de la variable couleur du Teddy (pour l'avoir dans le scope)
                const teddyColor = select.value;

                // console.log(teddiesChosen); => Test OK (on récupère les données demandées du teddy qu'on veut ajouter au panier)

                // Stockage Local / Stocker la récupération des valeurs du formulaire dans le local storage
                
                // Déclaration de la variable comprenant key et values Stockage des données du/des teddy(ies) dans le localStorage
                // JSON.parse : Convertir les données situées dans le local Storage au format JSON en valeur JavaScript
                let storedTeddies = JSON.parse(localStorage.getItem('addTeddy'))

                // console.log(storedTeddies);

                // Message popup après clic sur bouton "ajout au panier" = Continuer mes achats ou Voir mon panier
                const popupConfirmation = () => {
                    if (window.confirm('Le doudou ' + teddy.name + ' version "' + teddyColor + '" a bien été ajouté à votre panier ! Souhaitez-vous continuer vos achats ? (Ok : Oui / Annuler : Voir mon panier)')) {
                        window.location.href = "index.html";
                    } else {
                        window.location.href = "panier.html";
                    }
                }
                // Cas s'il y a DÉJÀ de teddies enregistrés dans le local Storage
                if (storedTeddies) {
                    storedTeddies.push(teddiesChosen);
                    localStorage.setItem('addTeddy', JSON.stringify(storedTeddies));

                    // console.log(storedTeddies); => Test OK

                    // Message popup
                    popupConfirmation();

                // Cas s'il n'y a PAS de teddy enregistré dans le local Storage
                } else {
                    storedTeddies = [];
                    storedTeddies.push(teddiesChosen);
                    localStorage.setItem('addTeddy', JSON.stringify(storedTeddies));

                    // console.log(storedTeddies); => Test OK

                    // Message popup
                    popupConfirmation();
                }
            }

            // Récupération des données et envoi au panier à l'écoute de l'évènement du clique sur le bouton "Ajout au panier"
            button.addEventListener("click", clickAddBasket)

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