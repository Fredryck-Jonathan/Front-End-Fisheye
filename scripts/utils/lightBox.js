function init_lightbox(event, medias_array, media, directory) {

    const element = event.currentTarget;

    console.log(medias_array)

    console.log(element)
    const lightbox = document.getElementById('lightbox');

    lightbox.style.display = 'flex';

    const div_lightbox_infos = document.getElementById('lightbox-infos');

    let currentIndex = 0;

    if (div_lightbox_infos.children.length === 0) {

        console.log("salut")

        medias_array.forEach(element => {

            const div_element_lightbox = document.createElement('div');
            div_element_lightbox.classList.add('element-lightbox');

            if (element.image) {
                const image_element_lightbox = document.createElement('img');
                image_element_lightbox.classList.add("img-element-lighbox");
                image_element_lightbox.setAttribute('src', `assets/Medias/${directory}/${element.image}`);
                image_element_lightbox.setAttribute('alt', element.title);
                div_element_lightbox.appendChild(image_element_lightbox);
            } else {

                const video_element_lightbox = document.createElement('video');
                video_element_lightbox.setAttribute('controls', '');

                const source_video_element_lighbox = document.createElement('source');
                source_video_element_lighbox.setAttribute('src', `assets/Medias/${directory}/${element.video}`);

                video_element_lightbox.appendChild(source_video_element_lighbox);
                div_element_lightbox.appendChild(video_element_lightbox);

            }

            const title_element_lightbox = document.createElement('p');
            title_element_lightbox.classList.add('title-element-lightbox');
            title_element_lightbox.textContent = element.title;
            div_element_lightbox.appendChild(title_element_lightbox);

            div_lightbox_infos.appendChild(div_element_lightbox);

        });

    }

    currentIndex = medias_array.indexOf(media);

    
    document.addEventListener('keydown', function (event) {
        console.log(event.key)
        if (event.key == "ArrowRight" && currentIndex  !== medias_array.length - 1) { 
            currentIndex++;
            translateImage(currentIndex, medias_array);
        }
        else if ((event.key == "ArrowLeft" && currentIndex  !== 0)) {
            currentIndex--;
            translateImage(currentIndex, medias_array);
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

function closeLightbox() {

    const lightbox = document.getElementById('lightbox');
    const div_lightbox_infos = document.getElementById('lightbox-infos');

    lightbox.style.display = 'none';

    while (div_lightbox_infos.firstChild) {
        div_lightbox_infos.removeChild(div_lightbox_infos.firstChild);
    }

}


function translateImage(index, medias_array) {

    console.log(index)

    const button_previous_image = document.getElementById('button-previous-image');
    const button_next_image = document.getElementById('button-next-image');

    button_previous_image.style.visibility = 'visible';
    button_next_image.style.visibility = 'visible';

    if (index == 0) {

        button_previous_image.style.visibility = 'hidden';


    } else if (index  == medias_array.length - 1) {


        button_next_image.style.visibility = 'hidden';


    }



    const element_lightbox = document.querySelectorAll('.element-lightbox');

    const offset = -index * 100;

    document.querySelector('#lightbox-infos').style.transform = `translateX(${offset}%)`;



}