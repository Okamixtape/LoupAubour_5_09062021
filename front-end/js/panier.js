////////////////////////////////////////////////////////////////////////
//                                                                    //
// AFFICHACHE DES TEDDIES STOCKÉS DANS LOCAL STORAGE SUR PANIER.HTML  //
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
        }
    }
}

let storedTeddies = getStoredTeddies()
