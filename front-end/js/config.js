/////////////////////////////////////////////////////////////////
//                                                             //
//  VARIABLES OU FONCTIONS POUR FACILITER ÉCRITURE JAVASCRIPT  //
//                                                             //
/////////////////////////////////////////////////////////////////

// Constante qui comprends l'addresse URL de l'API

const apiUrl = 'http://localhost:3000/api/teddies/'

// Fonction permettant la création d'un élément et la définition de son contenu / Ajout d'un enfant à un élément
// (balise, nom de la classe, contenu, balise parente, attributs)

function createTag(tag, className, content, parent, attributes) {
    const element = document.createElement(tag)
    element.className = className
    element.innerHTML = content
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    parent.appendChild(element)
    return element
}