function getCategories() {
    let galleryName = [];
    const images = document.querySelectorAll('.gallery img');
    images.forEach(image => {
        galleryName.push(image.dataset.galleryTag);
    });
    return new Set(galleryName);
}

function toggleFilters(category) {
    const images = document.querySelectorAll('.gallery img');
    document.querySelector("#gallery").scrollIntoView();
    removeActiveClass();
    images.forEach(image => {
        const curParent = image.closest('a');
        if(category === "Tous" || image.dataset.galleryTag === category) {
            curParent.classList.remove('hidden');
            if(category === "Tous") {
                curParent.dataset.fslightbox = "gallery"
            } else {
                curParent.dataset.fslightbox = category;
            }
        }
        else {
            curParent.classList.add('hidden');
            curParent.dataset.fslightbox = "gallery"
        }
    });
    refreshFsLightbox();
}

function removeActiveClass() {
    document.querySelectorAll('.filters button').forEach(button => button.classList.remove('active'));
}

function addFilters() {
    const categories = getCategories();

    // Create "All" button
    let buttonAll = document.createElement("button");
    buttonAll.textContent = "Tous";
    buttonAll.classList.add('active');
    buttonAll.addEventListener('click', function(e){
        e.preventDefault();
        toggleFilters("Tous");
        buttonAll.classList.add('active');
    });
    document.querySelector('.filters').append(buttonAll);

    // Create categories button
    categories.forEach(category => {
        let button = document.createElement("button");
        button.textContent = category;
        button.addEventListener('click', function(e){
            e.preventDefault();
            toggleFilters(category);
            button.classList.add('active');
        });
        document.querySelector('.filters').append(button);
    });
}

addFilters();