// EVENT LISTENERS
document.querySelector('.save-btn').addEventListener("click", saveButton);
document.querySelector('.idea-card-area').addEventListener("click", removeIdeaCard);
document.querySelector('.idea-card-area').addEventListener("click", clickVote);
document.querySelector('.idea-card-area').addEventListener("keypress", editExistingCard);
document.querySelector('.search-bar').addEventListener("keyup", filterBySearchInput)

window.onload = (pullCardsFromStorage);

function pullCardsFromStorage() {
  var keys = Object.keys(localStorage);
  keys.forEach(function(key){
    var parsedStorageIdeas = JSON.parse(localStorage.getItem(key));
    buildIdeaObject(parsedStorageIdeas);
  })
}

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

// SEARCH FUNCTIONALITY
function compare(userTextFromInput, ideaFromPage) {
  var findTitle = ideaFromPage.title.toLowerCase();
  var findBody = ideaFromPage.body.toLowerCase();
  var specificIdeaCard = document.getElementById(ideaFromPage.id).parentElement.classList;
  if (!findTitle.includes(userTextFromInput) || !findBody.includes(userTextFromInput)) {
    specificIdeaCard.add("hidden");
  }
  if (findTitle.includes(userTextFromInput) || findBody.includes(userTextFromInput)) {
    specificIdeaCard.remove("hidden");
  }
}

function filterBySearchInput() {
  var userSearchText = document.querySelector('.search-bar').value.toLowerCase();
  var keys = Object.keys(localStorage);

  keys.forEach(function (key) {
    var ideaObj = JSON.parse(localStorage.getItem(key));
    var idea = new Idea(ideaObj.title, ideaObj.body, ideaObj.id, ideaObj.quality);
    compare(userSearchText, idea);
  })
}