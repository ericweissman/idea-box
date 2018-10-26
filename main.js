// const qualitiesList = ['Swill','Plausible', 'Genius'];

// EVENT LISTENERS
document.querySelector('.save-btn').addEventListener("click", saveButton);
document.querySelector('.idea-card-area').addEventListener("click", removeIdeaCard);
document.querySelector('.idea-card-area').addEventListener("click", clickVote);
// document.querySelector('.idea-card-area').addEventListener("click", engageCardActions);


window.onload = (pullCardsFromStorage);
// PREVENT DEFAULT? 

function pullCardsFromStorage() {
  var keys = Object.keys(localStorage);
  for(var i = 0; i < keys.length; i++) {
    var parsedStorageIdeas = JSON.parse(localStorage.getItem(keys[i]));
    ifExistingIdea(parsedStorageIdeas);
  }
}


// IF NEW IDEA REFACTOR

function saveButton(event) {
  var title = document.querySelector('#title-input').value;
  var body = document.querySelector('#body-input').value;
  if (title !== '' && body !== ''){
    var idea = new Idea(title, body);
    ifExistingIdea(idea);
    idea.saveToStorage();
  } 
}

// Input Fields

// NOT CURRENTLY PULLING QUALITY FROM STORAGE TO HTML DISPLAY
function ifExistingIdea(obj){
  if (obj) {
    var idea = new Idea(obj.title, obj.body, obj.id, obj.quality);
    addCardWith(idea);
  }
}

// Helper Functions

function addCardWith(idea){
  var newCard = document.createElement('article');
  newCard.className = 'idea-card';
  idea.cardInfo(newCard);
  document.querySelector('.idea-card-area').prepend(newCard);
  clearInputs();
}

function clearInputs() {
  document.querySelector('#title-input').value = null;
  document.querySelector('#body-input').value = null;
}

// function engageCardActions (event){
//   if (event.target.classList.contains("downvote-img")) {
//     qualityDecrease(event.target);
//   } else if (event.target.classList.contains('upvote-img')) {
//     qualityIncrease(event.target);
//   } else if(event.target.classList.contains("delete")) {
//     localStorage.removeItem(event.target.parentElement.id);
//     event.target.parentElement.parentElement.remove();
//   }
// }


function removeIdeaCard(event) {
  if (event.target.classList.contains('delete')) {
    var idea = new Idea();
    idea.deleteFromStorage(event);
    event.target.parentElement.parentElement.remove();
  }
}


function clickVote(event) {
  if(event.target.classList.contains('upvote-img')) {
    qualityIncrease(event.target);
  } else if(event.target.classList.contains('downvote-img')) {
    qualityDecrease(event.target);
  }
}

function qualityIncrease(target) {
  var idea = getIdeaFromEvent(event);
  if(target.nextElementSibling.innerText === "QUALITY: Swill") {
    target.nextElementSibling.innerText = "QUALITY: Plausible";
    idea.quality = 'Plausible';
  } else if(target.nextElementSibling.innerText === "QUALITY: Plausible") {
    target.nextElementSibling.innerText = "QUALITY: Genius";
    idea.quality = 'Genius';
  }
  idea.saveToStorage();
}

function qualityDecrease(target) {
  var idea = getIdeaFromEvent(event);
  if(target.nextElementSibling.nextElementSibling.innerText === 'QUALITY: Plausible') {
    target.nextElementSibling.nextElementSibling.innerText = 'QUALITY: Swill';
    idea.quality = 'Swill';
  } else if (target.nextElementSibling.nextElementSibling.innerText === 'QUALITY: Genius') {
    target.nextElementSibling.nextElementSibling.innerText = 'QUALITY: Plausible';
    idea.quality = 'Plausible';
  }
  idea.saveToStorage();
}

function getIdeaFromEvent(event) {
    var getIdeaID = localStorage.getItem(event.target.parentElement.parentElement.dataset.name);
    var obj = JSON.parse(getIdeaID);
    var idea = new Idea(obj.title, obj.body, obj.id, obj.quality);
    return idea;
}