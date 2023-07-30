const API_KEY = "&apiKey=8c3d5a102b1c4164881671f34feb593a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
    // reload the page to default.
}
async function fetchNews(query){
    try{
        const response = await fetch(`${url}${query}${API_KEY}`);
        const data = await response.json();  //! important

        bindData(data.articles);
    }
    catch(error){
        console.log( error);
        // alert("Can't load any more news, Sorry for the inconvenience.");
    }
}
function bindData(article){
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';
    // empties the page so that the new data can appear at top
    // otherwise they will come after the old news
    
    article.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        
        fillData(cardClone, article);
        cardContainer.appendChild(cardClone);
        console.log(cardClone);
    })
    
}
function fillData(card, article){
    const img = card.getElementById('news-img');
    img.src = article.urlToImage;

    const title = card.getElementById('news-title');
    title.innerHTML = article.title;

    const description = card.getElementById('news-desc');
    title.innerHTML = article.description;

    const source = card.getElementById('news-source');
    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone: 'Asia/Jakarta'
    } )
    // to get date in readable form

    source.innerHTML = `${article.source.name}•${date}`;

    card.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank"); 
        //" _blank" helps to open link in new tab
    })
}

let currActive = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    
    currActive?.classList.remove('active');
    currActive = navItem;
    currActive.classList.add('active');
}

const searchBtn = document.getElementById("search-button");
const text = document.getElementById("search-text");

searchBtn.addEventListener("click", () => {
    const query = text.value;
    text.value = "";
    if(!query){
        alert("There's nothing written in the text area.");
        return;
    }
    currActive?.classList.remove('active');
    fetchNews(query);
});