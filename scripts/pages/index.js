// Cette fonction sert a récupérer via un fetch notre json avec tous les éléments dans l'objet photographer.
async function getPhotographers() {
    try {
        const reponse = await fetch("data/photographers.json")
        const photographers = await reponse.json()
    return ({
        photographers: photographers.photographers})
    } catch (error) {
        alert(error)
    }
}
//Fonction pour afficher les données photographes.
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

//Fonction qui sert a initialiser le code, il est appelé au chargement de la page.
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}


//Appel la fonction d'initialisation au chargement de la page.
init();

