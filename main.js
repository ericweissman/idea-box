// EVENT LISTENERS
document.querySelector('.save-btn').addEventListener("click", saveButton);
document.querySelector('.idea-card-area').addEventListener("click", removeIdeaCard);
document.querySelector('.idea-card-area').addEventListener("click", clickVote);
document.querySelector('.idea-card-area').addEventListener("keypress", editExistingCard);

window.onload = (pullCardsFromStorage);

function pullCardsFromStorage() {
  var keys = Object.keys(localStorage);
  // MAKE A FOR EACH LOOP
  for(var i = 0; i < keys.length; i++) {
    var parsedStorageIdeas = JSON.parse(localStorage.getItem(keys[i]));
    buildIdeaObject(parsedStorageIdeas);
  }
}


// IF NEW IDEA REFACTOR

function saveButton(event) {
  var title = document.querySelector('#title-input').value;
  var body = document.querySelector('#body-input').value;
  if (title !== '' && body !== ''){
    var idea = new Idea(title, body);
    buildIdeaObject(idea);
    idea.saveToStorage();
  } 
}

// Idea Card Creation
function buildIdeaObject(obj){
    var idea = new Idea(obj.title, obj.body, obj.id, obj.quality);
    addCardWith(idea);
}

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


// Manipulating Idea Cards
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
  var currentQuality = target.nextElementSibling;
  if(currentQuality.innerText === "QUALITY: Swill") {
    currentQuality.innerText = "QUALITY: " + idea.updateQuality('Plausible');
  } else if(currentQuality.innerText === "QUALITY: Plausible") {
    currentQuality.innerText = "QUALITY: " + idea.updateQuality('Genius');
  }
  idea.saveToStorage();
}

function qualityDecrease(target) {
  var idea = getIdeaFromEvent(event);
  var currentQuality = target.nextElementSibling.nextElementSibling;
  if(currentQuality.innerText === 'QUALITY: Plausible') {
    currentQuality.innerText = "QUALITY: " + idea.updateQuality('Swill');
  } else if (currentQuality.innerText === 'QUALITY: Genius') {
    currentQuality.innerText = "QUALITY: " + idea.updateQuality('Plausible');
  }
  idea.saveToStorage();
}

function getIdeaFromEvent(event) {
    var getIdeaID = localStorage.getItem(event.target.parentElement.parentElement.dataset.name);
    var obj = JSON.parse(getIdeaID);
    var idea = new Idea(obj.title, obj.body, obj.id, obj.quality);
    return idea;
}

// EDIT CARDS
function editExistingCard(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    editCardText(event);
  }
}

function editCardText(event) {
  if (event.target.classList.contains('card-title-text') || event.target.classList.contains('card-body-text')) {
    var idea = getIdFromExistingCard(event);
    var title = document.getElementById(idea.id).children[0];
    var body = document.getElementById(idea.id).children[1];
    idea.updateSelf(title.innerText, body.innerText);
    idea.saveToStorage();
  }
}

function getIdFromExistingCard(event) {
  var getIdeaID = localStorage.getItem(event.target.closest('.card-title-body').dataset.name);
  var obj = JSON.parse(getIdeaID);
  var idea = new Idea(obj.title, obj.body, obj.id, obj.quality);
  return idea
}