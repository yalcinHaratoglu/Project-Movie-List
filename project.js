const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//Elementleri Yükleme
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",() => {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        UI.displayMessages("Tüm Alanları Doldurun.❌","danger");
    }
    else {
        //Yeni Film Oluşturuldu
        const newFilm = new Film(title,director,url);

        //Arayüzüne Film Eklendi
        UI.addFilmToUI(newFilm);

        //Storage'a Film Ekleme
        Storage.addFilmToStorage(newFilm);

        UI.displayMessages("Film başarıyla eklendi.✔","success");
    }

    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
        UI.displayMessages("Silme İşlemi Başarılı.✔","success");
    }
}

function clearAllFilms(){
    if(confirm("Emin misiniz?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
        UI.displayMessages("Tüm Liste Başarıyla Silindi.✔","success");
    }

}