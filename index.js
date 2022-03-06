console.log("This is my index.js file");

// Initialise the news api parameter
let source = 'bbc-news';
let apiKey = '78e6e53edccc43beba90d19ad4b7d5df';

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

// When response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHTML = "";
        articles.forEach(function(element,index) {
            let news = `<div class="card">
            <div class="card-header" id="heading${index}">
                <h2 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                    <b>Breaking News: ${index+1}</b> ${element["title"]}
                </button>
                </h2>
            </div>
            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}"
                data-parent="#newsAccordion">
                <div class="card-body">
                   ${element["content"]}. <a href="${element["url"]}" target="_blank" >Read more here</a>
                </div>
            </div>
        </div> `
        newsHTML+=news;
        });
        newsAccordion.innerHTML = newsHTML;
    }
    else{
        console.log("Some error occured");
    }
}

// send the request
xhr.send();
