let cardContainer = document.querySelector('.card-container');
let frame = document.querySelector('.frame');
let home = document.querySelector('.home');
let news = document.querySelector('.news');
let music = document.querySelector('.music');
let coding = document.querySelector('.coding');
let title = document.querySelector('.title');
let comments = document.querySelector('.comments');
let sec = document.querySelector('.sec');
let a=0; let d=0; let c=0; let intt=0;
let text = document.getElementById('text'); let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1'); let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5'); 

window.addEventListener('scroll', () => {
let value = window.scrollY; 
text.style.marginTop = value * 2.5 + 'px';
leaf.style.top = value * -1.5 + 'px'; leaf.style.left = value * 1.5 + 'px';
hill5.style.left = value * 1.5 + 'px'; hill4.style.left = value * -1.5 + 'px';
hill1.style.top = value * 1 + 'px';});

home.addEventListener('click', () => {if(intt!==1){searchFunc("Trending"); intt=1;}})
news.addEventListener('click', () => {if(intt!==2){searchFunc("News"); carousel.scrollIntoView(true); intt=2;}})
music.addEventListener('click', () => {if(intt!==3){searchFunc("Music"); carousel.scrollIntoView(true); intt=3;}})
coding.addEventListener('click', () => {if(intt!==4){searchFunc("Coding"); carousel.scrollIntoView(true); intt=4;}})

const carousel = document.querySelector('.carousel');
let sliders = []; let slideIndex = 0;

const createSlide = async (data) => {
/*carousel.innerHTML += `
<div class="slider">
                <div class="slide-content">
                    <h1 class="movie-title">${data.snippet.title}</h1>
                    <p class="movie-des">${data.snippet.description}</p>
                </div>
               <img src="${data.snippet.thumbnails.high.url}"></img>
            </div>`;
            slideIndex++;*/

    //Creating DOM element 
    let slide = document.createElement('div');
    let imgElement = document.createElement('img');
    let content = document.createElement('div');
    let h1 = document.createElement('h1');
    let p = document.createElement('p');

    //Attaching all elements
    imgElement.appendChild(document.createTextNode(''));
    h1.appendChild(document.createTextNode(`${data.snippet.title}`));
    p.appendChild(document.createTextNode(`${data.snippet.description}`));
    content.appendChild(h1); content.appendChild(p);
    slide.appendChild(content); slide.appendChild(imgElement);
    carousel.appendChild(slide);

    //Setting image source
    imgElement.src = `${data.snippet.thumbnails.high.url}`; 

    //Setting elements class name
    slide.className = 'slider';
    content.className = 'slide-content';
    h1.className = 'movie-title';
    p.className = 'movie-des';
    
    slide.addEventListener('click', () => {frame.innerHTML = `<iframe class="jFrame" width="560" height="315" 
    src="https://www.youtube.com/embed/${data.id.videoId}" 
    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
    encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
let f = data.id.videoId; comments.innerHTML = ``; frame.scrollIntoView(true); commentss(f);})
    
    sliders.push(slide); slideIndex++;
}

const createComment = (data) => {

    //Creating DOM element 
    let comment = document.createElement('div');
    let content = document.createElement('div');
    let imgElement = document.createElement('img');
    let h1 = document.createElement('h1');
    let p = document.createElement('p');

    //Attaching elements
    imgElement.appendChild(document.createTextNode(''));
    h1.appendChild(document.createTextNode(`${data.snippet.topLevelComment.snippet.authorDisplayName}`));
    p.appendChild(document.createTextNode(`${data.snippet.topLevelComment.snippet.textDisplay}`));
    //comment.appendChild(imgElement);
    content.appendChild(imgElement); content.appendChild(h1);
    comment.appendChild(content); comment.appendChild(p); 
    comments.appendChild(comment);

//Setting image source
imgElement.src = `${data.snippet.topLevelComment.snippet.authorProfileImageUrl}`; 

//Setting elements class name
comment.className = 'comm';
content.className = 'comm-content';
h1.className = 'comm-title';
p.className = 'comm-des';}

const options = {method: 'GET',
	headers: {'X-RapidAPI-Key': 'cf4839f9f4mshc382ef3df77563ep1bfd92jsnd3398559010a',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'}};

const makeVideoCard = (data) => {
    
    /*cardContainer.innerHTML += `
<div class="card">
<img src="${data.snippet.thumbnails.high.url}" class="card-img">
<div class="card-body">
    <h2 class="name">${data.snippet.title}</h2>
    <h6 class="des">${data.snippet.description}</h6>
</div>
</div>`;*/
let card = document.createElement('div');
let img = document.createElement('img');
let cbody = document.createElement('div');
let name = document.createElement('h2');
let des = document.createElement('h6');

img.appendChild(document.createTextNode(''));
name.appendChild(document.createTextNode(`${data.snippet.title}`));
des.appendChild(document.createTextNode(`${data.snippet.description}`));
cbody.appendChild(name); cbody.appendChild(des); card.appendChild(img);
card.appendChild(cbody); img.src=`${data.snippet.thumbnails.high.url}`;

cardContainer.appendChild(card);

card.className = 'card'; cbody.className = 'card-body'; name.className = 'name';
des.className = 'des';
 
card.addEventListener('click', () => {frame.innerHTML = `<iframe class="jFrame" width="560" height="315" 
src="https://www.youtube.com/embed/${data.id.videoId}" 
title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
let f = data.id.videoId; comments.innerHTML = ``; frame.scrollIntoView(true); commentss(f);})}

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener('click', () => {
	if(searchInput.value.length){cardContainer.innerHTML =``;
	searchFunc(searchInput.value);
	searchInput.value="";
	}
})

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if(searchInput.value.length){cardContainer.innerHTML =``;
        searchFunc(searchInput.value);
        searchInput.value="";}
    }
})

var b;

const searchFunc = (b) => {

    let g = b + " Videos";
	a="https://youtube-v31.p.rapidapi.com/search?q="+b+"&part=snippet%2Cid&regionCode=IN&maxResults=50&order=date";
	cardContainer.innerHTML = ``; carousel.innerHTML = ``; frame.innerHTML = ``; comments.innerHTML = ``;
    fetch(a, options)
.then(response => response.json())
.then(data => {title.innerHTML = g; text.innerHTML = `NEXSTREAM`;
    data.items.forEach(item => {makeVideoCard(item); createSlide(item);});})

.catch(err => {console.log(err); text.innerHTML = `Unable to connect to Servers`;
text.scrollIntoView(true); title.innerHTML = `ERROR`;})


intt = 0;
}

const commentss = (b) => {
    a="https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId="+b+"&maxResults=100";

    fetch(a, options)
    .then(response => response.json())
    .then(data => {data.items.forEach(item => {createComment(item); console.log(item);})})

    .catch(err => console.log(err));
}

document.onload = home.click();

let preBtn = document.querySelector('.pre-btn');
let nextBtn = document.querySelector('.nxt-btn');

let containerDimension = cardContainer.getBoundingClientRect();
let containerWidth = containerDimension.width; 

nextBtn.addEventListener('click', () => {cardContainer.scrollLeft += containerWidth - 200;})
preBtn.addEventListener('click', () => {cardContainer.scrollLeft -= containerWidth + 200;})