// var ideaCardLedger = [{title: 'test', body: 'afsafa', id: 21, quality: 'genius'}];
var ideaCardLedger = [];

// EVENT LISTENERS
document.querySelector('.save-btn').addEventListener("click", saveButton);
document.querySelector('.idea-card-area').addEventListener("click", removeIdeaCard);
document.querySelector('.idea-card-area').addEventListener("click", clickUpvote);
document.querySelector('.idea-card-area').addEventListener("click", clickDownvote);


// window.onload = (pullCardsFromStorage);
window.onload = (pullFromArray);
// PREVENT DEFAULT? 
// SHOULDN'T USE LOCAL STORAGE TO RELOAD IDEAS
// NEXT STEP - ASSIGN ARRAY TO LOCAL Storage
// PROBLEM - WHILE ON PAGE NEW IDEAS ARE PUSHED AND STORED IN ARRAY, BUT ON 
// PAGE RELAOD THE ARRAY DISAPPEARS



// function pullCardsFromStorage() {
//   var keys = Object.keys(localStorage);
//   for(var i = 0; i < keys.length; i++) {
//     var ideaStr = localStorage.getItem(keys[i]);
//     var parsedStr = JSON.parse(ideaStr);
//     addNewIdeaCard(parsedStr);
//   }
// }

function pullFromArray(){
  ideaCardLedger.forEach(function(e) {
    addNewIdeaCard(e);
  })
  // for (var i = 0; i < ideaCardLedger.length; i++){
  //   addNewIdeaCard(ideaCardLedger[i]);
  // }
}

function saveButton(event) {
  var title = document.querySelector('#title-input').value;
  var body = document.querySelector('#body-input').value;
  if (title !== '' && body !== ''){
      addNewIdeaCard();
  } 
}


// Input Fields
function addNewIdeaCard(ideaObj) {
  ifExistingIdea(ideaObj);
  ifNewIdea();
};

function ifNewIdea(){
  var title = document.querySelector('#title-input').value;
  var body = document.querySelector('#body-input').value;
  var idea = new Idea(title, body);

  addCardWith(idea);
  ideaCardLedger.push(idea);
  idea.saveToStorage(ideaCardLedger);
  // console.log(ideaCardLedger);
}

function ifExistingIdea(obj){
  if (obj) {
    var idea = new Idea(obj.title, obj.body, obj.id, obj.quality);
    ideaCardLedger.push(idea);
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


