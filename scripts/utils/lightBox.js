//Cette fonction sert a créer la lightbox est initialiser les fonctions de celui-ci 
function init_lightbox(event, medias_array, media, directory) {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    const mainDOM = document.getElementById('main');
    mainDOM.setAttribute('aria-hidden', 'true');
    const bodyDOM = document.querySelector("body");
    bodyDOM.setAttribute('scroll', "no");
    bodyDOM.style.overflow = "hidden";
    const div_lightbox_infos = document.getElementById('lightbox-infos');
    let currentIndex = 0;
    if (div_lightbox_infos.children.length === 0) {
        medias_array.forEach(element => {
            const div_element_lightbox = document.createElement('div');
            div_element_lightbox.classList.add('element-lightbox');
            if (element.image) {
                const div_img_focusable = document.createElement('div');
                div_img_focusable.classList.add("img-div-lightbox");
                div_img_focusable.setAttribute('tabindex', "0");
                const image_element_lightbox = document.createElement('img');
                image_element_lightbox.classList.add("img-element-lightbox");
                image_element_lightbox.setAttribute('src', `assets/Medias/${directory}/${element.image}`);
                image_element_lightbox.setAttribute('alt', element.title);
                div_img_focusable.appendChild(image_element_lightbox)
                div_element_lightbox.appendChild(div_img_focusable);
            } else {
                const video_element_lightbox = document.createElement('video');
                video_element_lightbox.setAttribute('controls', '');
                video_element_lightbox.setAttribute('aria-label', element.title)
                const source_video_element_lighbox = document.createElement('source');
                source_video_element_lighbox.setAttribute('src', `assets/Medias/${directory}/${element.video}`);
                source_video_element_lighbox.setAttribute('type', "video/mp4")
                video_element_lightbox.appendChild(source_video_element_lighbox);
                div_element_lightbox.appendChild(video_element_lightbox);
                video_element_lightbox.addEventListener('keydown', function(event) {
                    if (event.key === '1') { 
                        video_element_lightbox.currentTime -= 1;
                    }else if (event.key === '2') { 
                        video_element_lightbox.currentTime += 1;
                    }else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                        // Empêcher le comportement par défaut des touches fléchées gauche et droite
                        event.preventDefault();
                    } 
                });
            }
            const title_element_lightbox = document.createElement('p');
            title_element_lightbox.classList.add('title-element-lightbox');
            title_element_lightbox.setAttribute('id', `title-element-${element.title}`)
            title_element_lightbox.textContent = element.title;
            title_element_lightbox.setAttribute('tabindex', "0")
            div_element_lightbox.appendChild(title_element_lightbox);
            div_lightbox_infos.appendChild(div_element_lightbox);
        });
    }
    currentIndex = medias_array.indexOf(media);

    //Cette fonction sert à gerer l'utilisation du clavier quand la lightbox est ouverte
    lightbox.addEventListener('keydown', function keyboardEvent(event) {
        if (lightbox.style.display == 'flex') {
            const button_previous_image = document.getElementById('button-previous-image');
            const button_next_image = document.getElementById('button-next-image');
            const info_lightbox = document.querySelector('#lightbox-infos');
            const button_close_lightbox = document.getElementById('button-close-lightbox')
            const children_lightbox = info_lightbox.children;
            const array_tab_lightbox = [];
            array_tab_lightbox.push(children_lightbox[currentIndex].firstChild);
            const title_lightbox_element = children_lightbox[currentIndex].querySelector('.title-element-lightbox')
            array_tab_lightbox.push(title_lightbox_element);
            if (currentIndex == medias_array.length - 1) {
                array_tab_lightbox.push(button_previous_image);
            } else if (currentIndex == 0) {
                array_tab_lightbox.push(button_next_image);
            } else {
                array_tab_lightbox.push(button_previous_image);
                array_tab_lightbox.push(button_next_image);
            }
            array_tab_lightbox.push(button_close_lightbox);
            if (event.key == "ArrowRight" && currentIndex !== medias_array.length - 1) {
                currentIndex++;
                translateImage(currentIndex, medias_array);
            }
            else if ((event.key == "ArrowLeft" && currentIndex !== 0)) {
                currentIndex--;
                translateImage(currentIndex, medias_array);
            } else if (event.key == "Escape") {
                closeLightbox();
            }
            else if (event.key == "Tab") {
                console.log(array_tab_lightbox)
                const firstElement = array_tab_lightbox[0];
                const lastElement = array_tab_lightbox[array_tab_lightbox.length-1];
                const activeElementIndex = Array.from(array_tab_lightbox).indexOf(document.activeElement);
                if (!lightbox.contains(document.activeElement)) {
                    event.preventDefault();
                    array_tab_lightbox[0].focus();
                }
                else if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                } else if (event.shiftKey ){
                    event.preventDefault();
                    array_tab_lightbox[activeElementIndex - 1].focus();
                } else{
                    event.preventDefault();
                    array_tab_lightbox[activeElementIndex + 1].focus();
                }
            }
        } else {
            return false
        }
    })
    const button_next_image = document.getElementById('button-next-image');
    button_next_image.addEventListener('click', (event) => {
        currentIndex++;
        translateImage(currentIndex, medias_array);
    });
    const button_previous_image = document.getElementById('button-previous-image');
    button_previous_image.addEventListener('click', (event) => {
        currentIndex--;
        translateImage(currentIndex, medias_array);
    });
    translateImage(currentIndex, medias_array)
}

//Cette fonction sert à fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const div_lightbox_infos = document.getElementById('lightbox-infos');
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true')
    const mainDOM = document.getElementById('main');
    mainDOM.setAttribute('aria-hidden', 'false');
    const bodyDOM = document.querySelector("body");
    bodyDOM.setAttribute('scroll', "yes");
    bodyDOM.style.overflow = "visible";
    
    // Reinitialiser l'event en le remplacent par un clone de lui meme, car anonymous fonction.
    const clonedLightbox = lightbox.cloneNode(true);
    lightbox.parentNode.replaceChild(clonedLightbox, lightbox);

    while (div_lightbox_infos.firstChild) {
        div_lightbox_infos.removeChild(div_lightbox_infos.firstChild);
    }
}

//Cette fonction sert a déplacé les imagesde la lightbox
function translateImage(index, medias_array) {
    const button_previous_image = document.getElementById('button-previous-image');
    const button_next_image = document.getElementById('button-next-image');
    button_previous_image.style.visibility = 'visible';
    button_next_image.style.visibility = 'visible';
    const info_lightbox = document.querySelector('#lightbox-infos');
    const children_lightbox = info_lightbox.children;
    if (index == 0) {
        button_previous_image.style.visibility = 'hidden';
    } else if (index  == medias_array.length - 1) {
        button_next_image.style.visibility = 'hidden';
    }
    const offset = -index * 100;
    info_lightbox.style.transform = `translateX(${offset}%)`;
    children_lightbox[index].firstChild.focus({ preventScroll: true });
}

