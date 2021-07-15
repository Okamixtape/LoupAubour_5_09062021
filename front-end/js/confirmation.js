///////////////////////////////////////////////////////////////
//                                                           //
// RÉCUPÉRER DONNÉES DE LA COMMANDE ET MESSAGE REMERCIEMENT  //
//                                                           //
///////////////////////////////////////////////////////////////

// Récupération de l'id de la commande
let orderId = localStorage.getItem('Order')

// Récupération du prix total de la commande
let totalPrice = localStorage.getItem('totalPrice')

// Création du contenu : Récapitulatif de votre commande
const containerConfirmation = document.getElementById('containerConfirmation')
const containerConfirmation__thankYou = createTag('div', 'containerConfirmation__thankYou', null, containerConfirmation, null)
const containerConfirmation__thankYou__heading = createTag('h3', 'containerConfirmation__thankYou__heading text-light font-weight-bold text-center', 'Récapitulatif de votre commande :', containerConfirmation__thankYou, null)
const containerConfirmation__thankYou__paraOrder = createTag('p', 'containerConfirmation__thankYou--paragraphs card-text text-center', 'Numéro de commande : ' + orderId, containerConfirmation__thankYou, null)
const containerConfirmation__thankYou__paraPrice = createTag('p', 'containerConfirmation__thankYou--paragraphs card-text text-center', 'Montant total de votre commande : ' + totalPrice + ' €', containerConfirmation__thankYou, null)
const containerConfirmation__thankYou__paraTy = createTag('p', 'containerConfirmation__thankYou--paragraphs card-text text-center font-weight-bold mt-3', "Merci pour votre commande de doudous OriTeddies, nous nous occupons dès maintenant de son expédition !", containerConfirmation__thankYou, null)

// Efface le localStorage après avoir affiché les 
localStorage.clear()