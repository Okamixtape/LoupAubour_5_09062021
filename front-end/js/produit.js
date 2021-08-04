///////////////////////////////////////////////////////////
//                                                       //
// AFFICHAGE DES INFOS API D'UN TEDDY DANS PRODUCT.HTML  //
//                                                       //
///////////////////////////////////////////////////////////

// Récupération de l'id du Teddy de la page

const urlParams = new URLSearchParams(window.location.search)

// console.log(urlParams) => Test OK (on récupère URLSearchParams)

const id = urlParams.get('id')

// console.log(id) => Test OK (on récupère l'id du Teddy sélectionné / ex pour Norbert : 5be9c8541c9d440000665243)

// Fonction principale de la page / récupérer les données du Teddy sélectionné et les mettre en forme dans le DOM (HTML)
const getTeddy = async function (url) {
    
    // Récupération des données de l'API (instruction qu'on souhaite exécuter)
    try {
        // Requête faite à l'URL (on attends que la requête soit terminée)
        let response = await fetch(url)

        // console.log(response) => Response {type: "cors", url: "http://localhost:3000/api/teddies/5be9c8541c9d440000665243", redirected: false, status: 200, ok: true, …}

        // Promesse qui se résoud si accès aux données (HTTP-status is 200-299)
        if (response.ok) {

            // console.log(response.ok) => On récupère "true" (valeur booléenne)

            // En attente de l'extraction des résulats des données en JSON
            let teddy = await response.json()

            // console.log(teddy); => Test OK (on récupère l'array du teddy "Norbert")

            // Retourner l'élément qui a l'attribut ID "containerProduct"
            const containerProduct = document.getElementById('containerProduct')

            // Création d'une "div" dans le DOM comprenant l'image / nom / description / prix / choix couleur avec les données du teddy sélectionné
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

                // Éviter comportement par défaut
                event.preventDefault()
                
                // Déclaration d'une variable contenant les données du/des teddy(ies) à destination du panier (valeurs du formulaire)
                let teddiesChosen = {
                    teddyName: teddy.name,
                    teddyId: teddy._id,
                    teddyColor: select.value,
                    quantity: 1,
                    teddyPrice: teddy.price / 100,
                }

                // Déclaration de la variable couleur du Teddy (pour l'avoir dans le scope)
                const teddyColor = select.value;

                // console.log(teddiesChosen); => Test OK (on récupère les données du teddy qu'on veut ajouter au panier lors du "clic")

                //////  Stockage Local / Stocker localement les données du teddy (qu'on veut ajouter au panier)  //////
                // Mettre l'objet de la variable (teddiesChosen) du panier dans le local storage pour le sauvegarder //
                
                // Déclaration de la variable pour le stockage des données dans le localStorage
                // JSON.parse : Convertir les données au format JSON situées dans le local Storage en valeur JavaScript
                let storedTeddies = JSON.parse(localStorage.getItem('addTeddy'))

                // console.log(storedTeddies); => On récupère la valeur "null" car l'objet JSON ne peut être appelé ou construit, et, en dehors de ses deux méthodes, n’a pas de fonctionnalité propre.

                // Message popup après clic sur bouton "ajout au panier" = Continuer mes achats ou Voir mon panier
                const popupConfirmation = () => {
                    if (window.confirm('Le doudou ' + teddy.name + ' version "' + teddyColor + '" a bien été ajouté à votre panier ! Souhaitez-vous continuer vos achats ? (Ok : Oui / Annuler : Voir mon panier)')) {
                        window.location.href = "index.html";
                    } else {
                        window.location.href = "panier.html";
                    }
                }

                // Cas pour ajouter/push(mettre dans un tableau) un teddy (teddiesChosen) s'il y a DÉJÀ 'addTeddy' (clef) enregistré dans le local Storage
                if (storedTeddies) {
                    storedTeddies.push(teddiesChosen);
                    localStorage.setItem('addTeddy', JSON.stringify(storedTeddies));

                    // console.log(teddiesChosen); => Test OK (on récupère les infos du dernier teddy sélectionné)
                    // console.log(storedTeddies); => Test OK (on récupère bien des tableaux 0, 1, 2)

                    // Message popup
                    popupConfirmation();

                // SINON : Cas pour ajouter/push (mettre dans un tableau) un teddy (teddiesChosen) s'il n'y a PAS ENCORE de 'addTeddy' (clef) dans le local Storage => ajout de "storedTeddies = [];" array pour y créer la clé nécessaire
                } else {
                    storedTeddies = [];
                    storedTeddies.push(teddiesChosen);
                    localStorage.setItem('addTeddy', JSON.stringify(storedTeddies));

                    // console.log(teddiesChosen); => Test OK (on récupère les infos du teddy sélectionné)
                    // console.log(storedTeddies); => Test OK (on récupère bien un tableau 0)

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
// Appel de la fonction getTeddy avec l'id d'un produit(teddy)
getTeddy(apiUrl + id)