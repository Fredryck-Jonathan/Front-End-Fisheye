// Cette fonction sert a récupérer les informations du photographe ainsi que ces medias via un ID.
async function getPhotographer(id) {
    try {
        const reponse = await fetch("data/photographers.json")
        const photographers = await reponse.json()
        const photographer = photographers.photographers.find(x => x.id == id);
        const media = photographers.media.filter(x => x.photographerId == id)
        photographer.medias = media;
        return { photographer }
    } catch (error) {
        alert(error)
    }
}

// Cette fonction sert a afficher les éléments sur la page après avoir créé les éléments grâce au template photographe.
async function displayDataPage(photographer) {
    const photographerModel = photographerTemplate(photographer);
    const pagePhotographer = document.getElementById('main');
    const userPhotographMainPageDOM = photographerModel.getUserPhotographeMainPageDOM();
    pagePhotographer.appendChild(userPhotographMainPageDOM);
    const headerPhotographePage = document.querySelector('.photograph-header');
    const userPhotographHeaderDOM = photographerModel.getUserPhotographeHeaderDOM();
    userPhotographHeaderDOM.forEach((element) => headerPhotographePage.appendChild(element));
}

//Cette fonction sert a ajouter le nom du photographe dans la modale.
async function addNameInModal(photographer) {
    const div_title_modal = document.getElementById('text-title-modal');
    const title_name_modal = document.createElement('h1');
    title_name_modal.setAttribute('id',"title-name-modal")
    title_name_modal.textContent = photographer.name
    div_title_modal.appendChild(title_name_modal);
}

//Fonction d'initialisation, on récupère l'ID du photographe dans les paramètres de l'URL et ensuite on initie les autres fonctions.
async function init() {
    const params = new URL(document.location).searchParams;
    const id = params.get("id");
    const { photographer } = await getPhotographer(id);
    displayDataPage(photographer);
    addNameInModal(photographer);
}

//Appel la fonction d'initialisation au chargement de la page.
init();