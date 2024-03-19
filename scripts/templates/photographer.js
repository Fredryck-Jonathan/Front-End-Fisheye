function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, directory, id, medias} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link_title = document.createElement('a');
        link_title.setAttribute("href", "photographer.html?id=" + id);
        link_title.textContent = name;
        const link_img = document.createElement('a');
        link_img.setAttribute("href", "photographer.html?id=" + id);
        link_img.classList.add('photographer_a_img')
        const img = document.createElement('img');
        link_img.appendChild(img);
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Représentation de " + name);
        img.setAttribute("aria-label", "Représentation de " + name)
        const h2 = document.createElement('h2');
        h2.appendChild(link_title);
        const div_infos_supplementaire = document.createElement('div');
        div_infos_supplementaire.classList.add('photographer_div_infos_supplementaire')
        const p_lieu = document.createElement( 'p' ); 
        p_lieu.textContent = city + ', ' + country;
        p_lieu.classList.add('photographer_p_lieu');
        const p_tagline = document.createElement('p');
        console.log(tagline)
        p_tagline.textContent = tagline;
        p_tagline.classList.add('photographer_p_tagline');
        console.log(p_tagline)
        const p_price = document.createElement('p');
        p_price.textContent = price + '€/jour'
        p_price.classList.add('photographer_p_price');
        article.appendChild(link_img);
        article.appendChild(h2);
        div_infos_supplementaire.appendChild(p_lieu);
        div_infos_supplementaire.appendChild(p_tagline);
        div_infos_supplementaire.appendChild(p_price);
        article.appendChild(div_infos_supplementaire);
        return (article);
    }


    function getUserPhotographeHeaderDOM() {


        const div_text_profil = document.createElement('div');
        div_text_profil.setAttribute("id", "div-text-profil");
        
        const name_title = document.createElement('h1');
        name_title.textContent = name;


        const p_lieu = document.createElement('p');
        p_lieu.textContent = city + ", " + country;


        const p_tagline = document.createElement('p');
        p_tagline.textContent = tagline;


        const div_img_profil = document.createElement('div');
        div_img_profil.setAttribute("id", "div-img-profil");


        const img_profil = document.createElement('img');
        div_img_profil.appendChild(img_profil);
        img_profil.setAttribute("src", picture);
        img_profil.setAttribute("alt",  name);
        img_profil.setAttribute("aria-label", name);

        div_text_profil.appendChild(name_title);
        div_text_profil.appendChild(p_lieu);
        div_text_profil.appendChild(p_tagline);

        return [div_text_profil, div_img_profil]


    }

    function getUserPhotographeMainPageDOM() {

        const section_gallery = document.createElement('section');
        section_gallery.setAttribute('id', "section-gallery");
        
        const div_select = document.createElement('div');
        div_select.setAttribute("id", "div-select");

        const label_select = document.createElement('label');
        label_select.setAttribute('for', "order-select");
        label_select.textContent = "Trier par";
        

        
        const order_select = document.createElement('select');
        order_select.setAttribute('id', "order-select");

        const option_popularity_select = document.createElement('option');
        option_popularity_select.setAttribute('value', "popularity");
        option_popularity_select.setAttribute('selected', "");
        option_popularity_select.textContent = "Popularité";


        const option_date_select = document.createElement('option');
        option_date_select.setAttribute('value', "date");
        option_date_select.textContent = "Date";

        const option_title_select = document.createElement('option');
        option_title_select.setAttribute('value', "title");
        option_title_select.textContent = "Titre";


        const div_gallery = document.createElement('div');
        div_gallery.setAttribute('id', 'gallery');

        medias.sort((a, b) => b.likes - a.likes);

        createGallery(medias, div_gallery)

        order_select.addEventListener("change", (event) => {
            console.log(event.currentTarget.value);
            value_selected = event.currentTarget.value;
            if (value_selected === "popularity") {
                medias.sort((a, b) => b.likes - a.likes);
            } else if (value_selected === "date") {
                medias.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else {
                medias.sort((a, b) => a.title.localeCompare(b.title));
            }
            reorganiserGallery(medias)
        })

        const div_infos_like_price = document.createElement('div');
        div_infos_like_price.setAttribute('id', 'div-info-like-price');

        const div_infos_like = document.createElement('div');

        const p_number_like = document.createElement('p');
        p_number_like.setAttribute('id', 'p-total-likes');
        p_number_like.textContent = countLikes();

        const emote_like = document.createElement('img');
        emote_like.setAttribute('src', 'assets/icons/heart_black.svg');
        emote_like.setAttribute('alt', "Heart icon like")

        div_infos_like.appendChild(p_number_like);
        div_infos_like.appendChild(emote_like);

        const p_price = document.createElement('p');
        p_price.classList.add('p-price');
        p_price.textContent = price + '€ / jour';

        div_infos_like_price.appendChild(div_infos_like);
        div_infos_like_price.appendChild(p_price);



        order_select.appendChild(option_popularity_select);
        order_select.appendChild(option_date_select);
        order_select.appendChild(option_title_select);

        div_select.appendChild(label_select);
        div_select.appendChild(order_select);

        section_gallery.appendChild(div_select);
        section_gallery.appendChild(div_gallery);
        section_gallery.appendChild(div_infos_like_price);



        return section_gallery
    }

    function countLikes() {
        let total_likes = 0;
        medias.forEach(media => {
            total_likes += media.likes;
        });
        return total_likes
    }


    function createGallery(medias, div_gallery) {

        medias.forEach((media, index )=> {

            console.log(media)
            const div_one_element_gallery = document.createElement('div');
            div_one_element_gallery.classList.add('div-one-gallery');
            div_one_element_gallery.setAttribute('data-id', media.id);



            // Création de l'élément div
            const div_media_one_element_gallery = document.createElement('button');
            div_media_one_element_gallery.classList.add('button-media-one-gallery');
            div_media_one_element_gallery.addEventListener('click', (event) => { init_lightbox(event, medias, media, directory) });

            if (media.image) {
                // Si c'est une image, créez simplement une balise img et attribuez-lui la source
                const img_one_element_gallery = document.createElement('img');
                img_one_element_gallery.src = `assets/Medias/${directory}/${media.image}`;
                div_media_one_element_gallery.appendChild(img_one_element_gallery);
                img_one_element_gallery.setAttribute('alt', media.title);
            } else {
                // Si c'est une vidéo
                const video_one_element_gallery = document.createElement('video');
                const source_video = document.createElement('source');
                source_video.src = `assets/Medias/${directory}/${media.video}`;
                source_video.type = "video/mp4";
                video_one_element_gallery.appendChild(source_video);
                div_media_one_element_gallery.appendChild(video_one_element_gallery);

            }

            // Ajouter l'élément div au conteneur
            div_one_element_gallery.appendChild(div_media_one_element_gallery);

            const div_text_one_element_gallery = document.createElement('div');
            div_text_one_element_gallery.classList.add('div-text-one-gallery');

            const p_title_one_element_gallery = document.createElement('p');
            p_title_one_element_gallery.classList.add('p-title-one-gallery');
            p_title_one_element_gallery.textContent = media.title;

            const div_like_one_element_gallery = document.createElement('div');
            div_like_one_element_gallery.classList.add('div-text-like-one-element')

            const p_like_one_element_gallery = document.createElement('p');
            p_like_one_element_gallery.classList.add('p-likes')
            p_like_one_element_gallery.textContent = media.likes;



            const div_icone_like_one_element_gallery = document.createElement('div');
            div_icone_like_one_element_gallery.classList.add('div-icone-like');


            const button_no_liked = document.createElement('button');
            button_no_liked.classList.add('button_no_liked_element');
            button_no_liked.addEventListener('click',(event) => addLike(event, media));

            const icone_like_no_liked_one_element_gallery = document.createElement('img');
            icone_like_no_liked_one_element_gallery.setAttribute('src', 'assets/icons/heart_black.svg');
            icone_like_no_liked_one_element_gallery.setAttribute('alt', "likes");
            icone_like_no_liked_one_element_gallery.classList.add('img-no-like-one-gallery')
            button_no_liked.appendChild(icone_like_no_liked_one_element_gallery);


            const button_liked = document.createElement('button');
            button_liked.classList.add('button_liked_element');
            button_liked.addEventListener('click',(event) => removeLike(event, media));

            const icone_like_liked_one_element_gallery = document.createElement('img');
            icone_like_liked_one_element_gallery.setAttribute('src', 'assets/icons/heart_red.svg');
            icone_like_liked_one_element_gallery.setAttribute('alt', "likes");
            icone_like_liked_one_element_gallery.classList.add('img-like-one-gallery');
            button_liked.appendChild(icone_like_liked_one_element_gallery);

            div_icone_like_one_element_gallery.appendChild(button_no_liked)
            div_icone_like_one_element_gallery.appendChild(button_liked)



            div_like_one_element_gallery.appendChild(p_like_one_element_gallery);
            div_like_one_element_gallery.appendChild(div_icone_like_one_element_gallery);
            div_text_one_element_gallery.appendChild(p_title_one_element_gallery);
            div_text_one_element_gallery.appendChild(div_like_one_element_gallery);
            div_one_element_gallery.appendChild(div_text_one_element_gallery);
            div_gallery.appendChild(div_one_element_gallery);

        });
    }

    function addLike(event ,media) {
        const mediaIndex = medias.indexOf(media);
        medias[mediaIndex].likes++;
        const totalLikes = countLikes();
        document.getElementById('p-total-likes').textContent = totalLikes;
        const heart_black = event.currentTarget;
        const div_text_like_one_element = heart_black.closest('.div-text-like-one-element');
        const p_like_one_element = div_text_like_one_element.querySelector('.p-likes');
        p_like_one_element.textContent = medias[mediaIndex].likes;
        const heart_red = heart_black.parentNode.querySelector('.button_liked_element');
        heart_black.style.visibility = "hidden";
        heart_red.style.visibility = "visible";
    }
    
    function removeLike(event, media) {
        const mediaIndex = medias.indexOf(media);
        medias[mediaIndex].likes--;
        const totalLikes = countLikes();
        document.getElementById('p-total-likes').textContent = totalLikes;
        const heart_red = event.currentTarget;
        const div_text_like_one_element = heart_red.closest('.div-text-like-one-element');
        const p_like_one_element = div_text_like_one_element.querySelector('.p-likes');
        p_like_one_element.textContent = medias[mediaIndex].likes;
        const heart_black = heart_red.parentNode.querySelector('.button_no_liked_element')
        heart_red.style.visibility = "hidden";
        heart_black.style.visibility = "visible";
    }


    function reorganiserGallery(medias) {

        const div_gallery = document.getElementById('gallery');
        const all_one_element = div_gallery.childNodes;

        medias.forEach(media => {
            console.log(media);
            for (let element of all_one_element) {
                const id_element = element.getAttribute('data-id');
                if (id_element == media.id) {
                    console.log(media, element)
                    div_gallery.appendChild(element);
                    return true
                }
            }
        });
    }


    return { name, picture, getUserCardDOM, getUserPhotographeHeaderDOM, getUserPhotographeMainPageDOM}
    
}