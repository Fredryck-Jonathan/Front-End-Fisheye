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

function displayValidatedModal() {
    const modal_validated = document.getElementById("modal-validated");
    modal_validated.style.display = "flex";
}

function closeModalValidated() {
    const modal_validated = document.getElementById("modal-validated");
    modal_validated.style.display = "none";

}


function submitForm(event) {

    event.preventDefault();
    console.log("button fonctionne")

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
        console.log(infosContact);


        closeModal();
        document.querySelector('form').reset();
        displayValidatedModal();


        


    } else {

        return false

    }

}

function montrerErreur(element) {
    const formDataEvent = element.parentElement;
    formDataEvent.setAttribute("data-error-visible", "true");
    return false
}

function verificationText(element, regex) { 
    console.log(element.value, regex)
    if (regex.test(element.value)) {
        return true
    } else {
        montrerErreur(element);
        return false
    }
}


/*document.addEventListener('keydown', function (event) {
    const modal = document.getElementById("contact_modal");
    const modalElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    if (modal.getAttribute("aria-hidden") === 'false') {
        if (event.key === "Escape") {
            closeModal();
        } else if (event.key === 'Tab') {
            const firstElement = modalElements[0];
            console.log(firstElement, modalElements)
            const lastElement = modalElements[modalElements.length - 1];
            if (event.shiftKey && document.activeElement === lastElement) {
                // Si la touche Tab est enfoncée et le dernier élément est en focus, revenir au premier élément
                event.preventDefault();
                firstElement.focus();
            } else if (event.shiftKey && document.activeElement === firstElement) {
                // Si la touche Maj + Tab est enfoncée et le premier élément est en focus, aller au dernier élément
                event.preventDefault();
                lastElement.focus();
            }
        }
    }
});*/

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




