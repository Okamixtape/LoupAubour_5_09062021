////////////////////////////////////////////////////////////////////////
//                                                                    //
// AFFICHACHE DES TEDDIES STOCKÉS DANS LOCAL STORAGE SUR PANIER.HTML  //
//             ET FORMULAIRE POUR CONFIRMER COMMANDE                  //
//                                                                    //
////////////////////////////////////////////////////////////////////////

// Création d'une "div" comprenant le titre "Récapitulatif de votre panier"
const containerCart = document.getElementById('containerCart')
const containerCart__listBox = createTag('div', 'containerCart__listBox', null, containerCart, null)
const containerCart__listBox__name = createTag('h3', 'containerCart__listBox--name', null, containerCart__listBox, null)

// Récupération des données du local Storage
function getStoredTeddies() {
    let storedTeddies = JSON.parse(localStorage.getItem('addTeddy'))
    
    // Si le panier est vide = Afficher "Vous n'avez encore rien commandé !"
    if (storedTeddies === null || storedTeddies.length === 0) {
        const containerCart__listBox__emptyBasket = createTag('p', 'containerCart__listBox__emptyBasket', "Vous n'avez encore rien commandé !", containerCart__listBox, null)
        localStorage.clear()

        // console.log("Panier vide")

    // Si le panier n'est PAS vide : affichage des teddies qui sont dans le localStorage (récupération des StoredTeddies)
    } else {

        // console.log("Panier PAS vide")

        for (let storedTeddy of storedTeddies) {
            const listTeddies = createTag('ul', 'listTeddies list-inline', null, containerCart__listBox, null)
            const eachTeddy = createTag('li', 'listTeddies__eachTeddy list-item m-2 d-flex justify-content-between', null, containerCart__listBox, null)
            const teddyDetails = createTag('div', 'listTeddies__eachTeddy--details', 'x ' + storedTeddy.quantity + ' ' + storedTeddy.teddyName + ", " + storedTeddy.teddyColor, eachTeddy, null)
            const teddyPrice = createTag('div', 'listTeddies__eachTeddy--divPrice d-flex justify-content-between align-items-center', null, eachTeddy, null)
            const price = createTag('div', 'listTeddies__eachTeddy--price', storedTeddy.teddyPrice * storedTeddy.quantity + '€ ', teddyPrice, null)
            
            // Création bouton "Supprimer un teddy"
            const deleteBtn = createTag('button', 'btn bg-white fas fa-trash-alt', null, teddyPrice, {
                'data-id': storedTeddy.teddyId,
                'data-color': storedTeddy.teddyColor
            })

            // Fonction suppression d'un teddy du bouton deleteBtn
            function deleteTeddy(e) {

                // Éviter comportement par défaut du deleteBtn (ex: rechargement de la page)
                e.preventDefault()

                // Méthode de sélection des données du teddy à supprimer avec data-id et data-color (condition ET logique)
                const storedTeddy = storedTeddies.filter(teddy => teddy.teddyId == e.target.getAttribute('data-id') && teddy.teddyColor == e.target.getAttribute('data-color'))[0]
                
                // Si égal ou supérieur à 1 = Moins 1 storedTeddy.quantity 
                if (storedTeddy.quantity >= 1) {
                    storedTeddy.quantity--

                    // Et on supprime la ligne de commande du panier
                    if (storedTeddy.quantity === 0) {
                        const index = storedTeddies.indexOf(storedTeddy)
                        storedTeddies.splice(index, 1)
                    }
                }
                // Enregistrement du nouveau localStorage (mise à jour du stockage local après suppression)
                localStorage.setItem('addTeddy', JSON.stringify(storedTeddies))
                JSON.parse(localStorage.getItem('addTeddy'))
    
                // Message d'alerte après suppression du teddy
                alert('Cet article a bien été supprimé !')
                window.location.href = "panier.html"
            }

            // Si clique sur deleteBtn (Écoute de l'évènement du clique) => Action de supression du teddy
            deleteBtn.addEventListener('click', deleteTeddy)
        }

        // Calcul du montant total de la commande
        let calculPrice = []
        for (storedTeddy of storedTeddies) {
            let article = storedTeddy.teddyPrice * storedTeddy.quantity
            calculPrice.push(article)
        }
    
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        const totalPrice = calculPrice.reduce(reducer, 0)
    
        const total = createTag('p', 'containerTeddies__listBox--totalPrice text-center', 'Montant total du panier = ' + totalPrice + ' €', containerCart__listBox, null)

        // Création du bouton pour vider TOUT le panier
        const containerTeddies__listBox__totalDelete = createTag('div', 'containerTeddies__listBox--totalDelete text-center ', null, containerCart__listBox, null)
        const containerTeddies__listBox__totalDeleteBtn = createTag('button', 'btn btn-danger', 'Vider le panier', containerTeddies__listBox__totalDelete, null)
        
        // Fonction pour supprimer le total du panier
        function deleteBasket(e) {

            // Éviter comportement par défaut du bouton (ex: rechargement de la page)
            e.preventDefault();

            // .removeItem pour vider le stockage local
            localStorage.removeItem('addTeddy')

            // Message d'alerte après suppression du panier
            alert('Votre panier a bien été vidé !')
            window.location.href = "panier.html"
        }

        // Si clique sur totalDelete (Écoute de l'évènement du clique) => Action de supression du panier
        containerTeddies__listBox__totalDelete.addEventListener("click", deleteBasket)

///////// FORMULAIRE ET CONDITION VALIDATION (REGEX) ////////////

        // Création du formulaire pour valider la commande
        const containerCart__listBox__form = createTag('form', 'containerCart__listBox--form text-center grid grid-cols-4 gap-4', null, containerCart__listBox, null)
        const h3 = createTag('h3', 'm-md-5 text-center', 'Merci de remplir ce formulaire pour valider votre commande', containerCart__listBox__form, null)

        // Fonction expression régulière (REGEX) pour valider prénom, nom et ville
        function validName(value) {
            return /^[A-Z-a-zéèàùôê\s]{3,40}$/.test(value)
        }

        // Fonction expression régulière (REGEX) pour valider adresse
        function validAddress(value) {
            return /^[A-Z-a-z-0-9éèàùôê\s]{5,80}$/.test(value)
        }

        // Fonction expression régulière (REGEX) pour valider code postal
        function validPostalCode(value) {
            return /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(value)
        }

        // Fonction expression régulière (REGEX) pour valider adresse email
        function validMail(value) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
        }

        // Ajout ligne du formulaire pour le prénom
        const formFirstName = createTag('div', 'form-group', null, containerCart__listBox__form, null)
        const labelFirstName = createTag('label', null, 'Votre prénom :', formFirstName, {
            'for': 'prénom'
        })
        const firstName = createTag('input', null, null, formFirstName, {
            'type': 'text',
            'class': 'form-control',
            'name': 'Prénom',
            'required': 'true'
        })

        // Vérification de la validité du prénom
        firstName.addEventListener('change', function (event) {
            if (validName(firstName.value)) {} else {
                event.preventDefault()
                alert("Ce prénom n'est pas valide, veuillez en renseigner un nouveau.")
            }
        })

        // Ajout ligne du formulaire pour le nom
        const formLastName = createTag('div', 'form-group', null, containerCart__listBox__form, null)
        const labelLastName = createTag('label', null, 'Votre nom : ', formLastName, {
            'for': 'nom'
        })
        const lastName = createTag('input', null, null, formLastName, {
            'type': 'text',
            'class': 'form-control',
            'name': 'Nom',
            'required': 'true'
        })

        // Vérification de la validité du nom
        lastName.addEventListener('change', function (e) {
            if (validName(lastName.value)) {} else {
                e.preventDefault()
                alert("Ce nom n'est pas valide, veuillez en renseigner un nouveau.")
            }
        })

        // Ajout ligne du formulaire pour l'adresse 
        const formAddress = createTag('div', 'form-group', null, containerCart__listBox__form, null)
        const labelAddress = createTag('label', null, 'Votre adresse : ', formAddress, {
            'for': 'adresse'
        })
        const address = createTag('textarea', null, null, formAddress, {
            'type': 'text',
            'class': 'form-control',
            'name': 'Adresse',
            'required': 'true'
        })

        // Vérification de la validité de l'adresse
        address.addEventListener('change', function (e) {
            if (validAddress(address.value)) {} else {
                e.preventDefault()
                alert("Cette adresse n'est pas valide, veuillez en renseigner une nouvelle.")
            }
        })

        // Ajout ligne du formulaire pour code postal
        const formPostalCode = createTag('div', 'form-group', null, containerCart__listBox__form, null)
        const labelPostalCode = createTag('label', null, 'Votre code postal : ', formPostalCode, {
            'for': 'code postal'
        })
        const postalCode = createTag('input', null, null, formPostalCode, {
            'type': 'text',
            'class': 'form-control',
            'name': 'Code postal',
            'required': 'true'
        })

        // Vérification de la validité du code postal
        postalCode.addEventListener('change', function (e) {
            if (validPostalCode(postalCode.value)) {} else {
                e.preventDefault()
                alert("Ce code postal n'est pas valide, veuillez en renseigner un nouveau.")
            }
        })

        // Ajout ligne du formulaire pour la ville
        const formCity = createTag('div', 'form-group', null, containerCart__listBox__form, null)
        const labelCity = createTag('label', null, 'Votre ville : ', formCity, {
            'for': 'ville'
        })
        const city = createTag('input', null, null, formCity, {
            'type': 'text',
            'class': 'form-control',
            'name': 'Ville',
            'required': 'true'
        })

        // Vérification de la validité de la ville
        city.addEventListener('change', function (e) {
            if (validName(city.value)) {} else {
                e.preventDefault()
                alert("Ce nom de ville n'est pas valide, veuillez en renseigner un nouveau.")
            }
        })

        // Ajout ligne du formulaire pour l'adresse mail
        const formMail = createTag('div', 'form-group', null, containerCart__listBox__form, null)
        const labelMail = createTag('label', null, 'Votre adresse mail : ', formMail, {
            'for': 'email'
        })
        const mail = createTag('input', null, null, formMail, {
            'type': 'email',
            'class': 'form-control',
            'name': 'Adresse mail',
            'required': 'true'
        })

        // Vérification de la validité de l'adresse mail
        mail.addEventListener("change", function (e) {
            if (validMail(mail.value)) {} else {
                e.preventDefault()
                alert("Cette adresse mail n'est pas valide, veuillez en renseigner une nouvelle (exemple d'adresse valide : abcd@mail.com).")
            }
        })

        // Création du bouton de validation du formulaire pour validation commande
        const submitBtn = createTag('button', 'btn', 'Valider ma commande', containerCart__listBox__form, {
            'type': 'submit',
            'name': 'Valider ma commande',
            'id': 'submit'
        })

        // Envoi des données du panier et du formulaire au serveur (condition : le formulaire doit être valide / ET logique)
        function confirmation(e) {
            if (validName(firstName.value) && validName(lastName.value) && validAddress(address.value) && validName(city.value) && validMail(mail.value)) {
                e.preventDefault()

                // Envoi du montant total de la commande au localStorage
                localStorage.setItem('totalPrice', totalPrice)
                const storagePrice = localStorage.getItem('totalPrice')

                // Création de l'objet contact (données du formulaire)
                let contact = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    postalCode: postalCode.value,
                    city: city.value,
                    email: mail.value,
                }


                // Création du tableau products (données des produits commandés)
                let products = []
                for (storedTeddy of storedTeddies) {
                    let productsId = storedTeddy.teddyId
                    products.push(productsId)
                }


                // Regrouper les données du formulaire et des produits commandés dans la fonction send
                let send = {
                    contact,
                    products,
                }

                // Envoi des données au serveur (méthode POST)
                const post = async function (data) {
                    try {
                        let response = await fetch(apiUrl + 'order', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        // Si réponse du serveur OK
                        if (response.ok) {
                            let data = await response.json()
                            localStorage.setItem('Order', data.orderId)
                            window.location = 'confirmation.html'
                            localStorage.removeItem('addTeddy')
                        
                        // Sinon affichage du message d'erreur
                        } else {
                            e.preventDefault();
                            console.error('Retour du serveur : ', response.status)
                            alert('Erreur rencontrée : ' + response.status)
                        }
                    } catch (error) {
                        alert("Erreur : " + error)
                    }
                }
                // Envoi des données du formulaire et des produits commandés
                post(send)
            }
        }
        // Écoute de l'évènement sur le bouton submit pour lancer fonction de confirmation
        submitBtn.addEventListener('click', confirmation)
    }
}

// Appel de la fonction principal de panier.js
let storedTeddies = getStoredTeddies()
