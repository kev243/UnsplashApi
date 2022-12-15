const imagesList = document.querySelector(".images-list");
const errorMsg = document.querySelector(".error-msg");
let searchQuery = "random";
let pageIndex = 1;
//fonction appel Api
async function fetchData() {

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=9ci3COhVFWel9sKyb7ezs2wdWNp6VSr5Mz0c0XD8bZo`)

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`)

        }
        const data = await response.json()
        console.log(data)
        createImages(data.results)
        //si il ya pas d'image
        if (!data.total) {
            imagesList.textContent = "";
            throw new Error("Oups! pas de resultats , essayer un autre mot clé !")
        }

    } catch (error) {
        errorMsg.textContent = `${error}`

    }
}

fetchData()

function createImages(data) {
    data.forEach(img => {
        const newImg = document.createElement("img");
        newImg.src = img.urls.regular;
        imagesList.appendChild(newImg)
    })

}

//scrolle infini

const observer = new IntersectionObserver(handleIntersect,
    { rootMargin: "50%" })

observer.observe(document.querySelector(".infinite-marker"))

function handleIntersect(entries) {
    console.log(entries);
    if (window.scrollY > window.innerHeight && entries[0].isIntersecting) {
        pageIndex++;
        fetchData()
    }
}

const input = document.querySelector("#search");
const form = document.querySelector("form")



form.addEventListener("submit", handleSearch)
 
function handleSearch(e) {
    //pour eviter de  renvoyer dans une autre page
    e.preventDefault()
    //on efface les contenu precedent 
    imagesList.textContent = "";
    if (!input.value) {
        errorMsg.textContent = "la recherche ne peut pas etre vide";
        return;
    }
    errorMsg.textContent = "";
    searchQuery = input.value;
    pageIndex = 1;
    fetchData()


}

//button scroll
const scrollToTop= document.querySelector(".scroll-to-top")

scrollToTop.addEventListener("click",()=>{
    window.scroll({
        top:0,
        behavior:"smooth"
    })
})



