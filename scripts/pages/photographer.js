//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(id) {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    try {
        const reponse = await fetch("data/photographers.json")
        const photographers = await reponse.json()
        console.log(photographers)
        const photographer = photographers.photographers.find(x => x.id == id);
        const media = photographers.media.filter(x => x.photographerId == id)
        photographer.medias = media;
        return { photographer }
    } catch (error) {
        console.log(error)
    }
}

async function displayDataPage(photographer) {
    const photographerModel = photographerTemplate(photographer);
    const pagePhotographer = document.getElementById('main');
    const userPhotographMainPageDOM = photographerModel.getUserPhotographeMainPageDOM();
    pagePhotographer.appendChild(userPhotographMainPageDOM);
    const headerPhotographePage = document.querySelector('.photograph-header');
    const userPhotographHeaderDOM = photographerModel.getUserPhotographeHeaderDOM();
    userPhotographHeaderDOM.forEach((element) => headerPhotographePage.appendChild(element));
}

async function addNameInModal(photographer) {
    const div_title_modal = document.getElementById('text-title-modal');
    const title_name_modal = document.createElement('h1');
    title_name_modal.textContent = photographer.name
    div_title_modal.appendChild(title_name_modal);
}

async function init() {
    // Récupère l'id du photographe et initie les autres fonctions
    const params = new URL(document.location).searchParams;
    const id = params.get("id");
    const { photographer } = await getPhotographer(id);
    displayDataPage(photographer);
    addNameInModal(photographer);
}

init();