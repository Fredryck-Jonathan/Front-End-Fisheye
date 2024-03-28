// Fonction qui sert a afficher la modal.
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    const mainDOM = document.getElementById('main');
    mainDOM.setAttribute('aria-hidden', 'true');
    const bodyDOM = document.querySelector("body");
    bodyDOM.setAttribute('scroll', "no");
    bodyDOM.style.overflow = "hidden";
}

//Fonction qui sert a fermer la modal.
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true')
    const mainDOM = document.getElementById('main');
    mainDOM.setAttribute('aria-hidden', 'false');
    const bodyDOM = document.querySelector("body");
    bodyDOM.setAttribute('scroll', "yes");
    bodyDOM.style.overflow = "visible";
}

//Fonction qui affiche la modal de confirmation du formulaire.
function displayValidatedModal() {
    const modal_validated = document.getElementById("modal-validated");
    modal_validated.style.display = "flex";
}

//Fonction qui ferme la modal de confirmation du formulaire.
function closeModalValidated() {
    const modal_validated = document.getElementById("modal-validated");
    modal_validated.style.display = "none";
}

//fonction qui envoie le formulaire si toutes les vérifications sont effectuer.
function submitForm(event) {
    event.preventDefault();
    const allErrorMessage = document.querySelectorAll('.formData[data-error-visible="true"]');
    for (let ErrorMessage of allErrorMessage) {
        ErrorMessage.setAttribute('data-error-visible','false')
    }
    /*Récuperation des éléments input du formulaire*/
    const inputFirstName = document.getElementById('first');
    const regexFirstName = /^[^%$€"'~*+.;:!?, <>"#°=+£¤&²{}[\]`@()_|\/[\\^¨§µ\d]{2,}$/g;
    const inputLastName = document.getElementById('last');
    const regexLastName = /^[^%$€"'~*+.;:!?, <>"#°=+£¤&²{}[\]`@()_|\/[\\^¨§µ\d]{2,}$/g;
    const inputEmail = document.getElementById('email');
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const inputMessage = document.getElementById('message');
    const regexMessage = /^[^"'~*<>"#°=+£¤&²{}[\]`@_|\/[\\^¨§µ\d]{2,}$/g;
    if (verificationText(inputFirstName, regexFirstName) && verificationText(inputLastName, regexLastName) && verificationText(inputEmail, regexEmail) && verificationText(inputMessage, regexMessage )) {
        const infosContact = {
            FirstName : inputFirstName.value,
            LastName: inputLastName.value,
            Email: inputEmail.value,
            Message: inputMessage.value
        }
        closeModal();
        document.querySelector('form').reset();
        displayValidatedModal();
    } else {
        return false
    }
}

//Fonction qui montre les erreurs sur la modal, via la data-error.
function montrerErreur(element) {
    const formDataEvent = element.parentElement;
    formDataEvent.setAttribute("data-error-visible", "true");
    return false
}

//Fonction qui récupère la regex et l'élément a vérifier, il vérifie que le texte réussi la regex.
function verificationText(element, regex) { 
    if (regex.test(element.value)) {
        return true
    } else {
        montrerErreur(element);
        return false
    }
}

//Fonction qui sert à se déplacer dans la modal et a fermer la modal avec le clavier.
document.addEventListener('keydown', function (event) {
    const modal = document.getElementById("contact_modal");
    const modalElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (modal.getAttribute("aria-hidden") === 'false') {
        if (event.key === "Escape") {
            closeModal();               
        } else if (event.key === 'Tab') {
            const firstElement = modalElements[0];
            const lastElement = modalElements[modalElements.length - 1];
            if (!modal.contains(document.activeElement)) {
                event.preventDefault();
                modalElements[0].focus();
            }
            else if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }  
        }
    }
});