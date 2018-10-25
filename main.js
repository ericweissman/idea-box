// EVENT LISTENERS
document.querySelector('.save-btn').addEventListener("click", saveButton);
document.querySelector('.idea-card-area').addEventListener("click", removeIdeaCard);
document.querySelector('.idea-card-area').addEventListener("click", clickUpvote);
document.querySelector('.idea-card-area').addEventListener("click", clickDownvote);


window.onload = (pullCardsFromStorage);

function pullCardsFromStorage() {
  var keys = Object.keys(localStorage);

  for(var i = 0; i < keys.length; i++) {
    var ideaStr = localStorage.getItem(keys[i]);
    var parsedStr = JSON.parse(ideaStr);
    addNewIdea(parsedStr)
  }
}

function saveButton(event) {
  addNewIdea();
}



// PREVENT DEFAULT? CARD PERSISTENCE ON RELOAD - STORE 10 ON INITIAL LOAD
// CARDS INFO REPEATED ON MULTIPLE CLICKS OF THE SAVE BUTTON

// Input Fields
function addNewIdea(ideaObj) {

  if(ideaObj) {
    var idea = new Idea(ideaObj.title, ideaObj.body, ideaObj.id, ideaObj.quality);
    addCardWith(idea);
  } else {
    var title = document.querySelector('#title-input').value;
    var body = document.querySelector('#body-input').value;
    var idea = new Idea(title, body);
    addCardWith(idea);
    idea.saveToStorage();
  }
};

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

function removeIdeaCard(event) {
  if (event.target.classList.contains('delete')) {
    localStorage.removeItem(event.target.parentElement.id);
    var someID = document.querySelector('.card-actions').dataset.name;
    localStorage.removeItem("someID");
    event.target.parentElement.parentElement.remove();
  }
}

//REFACTOR TO ONE FUNCTION FOR VOTES
function clickUpvote(event) {
  if(event.target.classList.contains('upvote-img')) {
    qualityIncrease();
  }
}

function qualityIncrease() {
    if(event.target.nextElementSibling.innerText === "QUALITY: Swill") {
    event.target.nextElementSibling.innerText = "QUALITY: Plausible";
  } else if(event.target.nextElementSibling.innerText === "QUALITY: Plausible") {
    event.target.nextElementSibling.innerText = "QUALITY: Genius";
  }
}

function clickDownvote(event) {
  if(event.target.classList.contains('downvote-img')) {
    qualityDecrease();
   }
}

function qualityDecrease() {
  if(event.target.nextElementSibling.nextElementSibling.innerText === 'QUALITY: Plausible') {
    event.target.nextElementSibling.nextElementSibling.innerText = 'QUALITY: Swill';
  } else if (event.target.nextElementSibling.nextElementSibling.innerText === 'QUALITY: Genius') {
    event.target.nextElementSibling.nextElementSibling.innerText = 'QUALITY: Plausible';
  }
}
