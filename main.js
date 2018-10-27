// const qualitiesList = ['Swill','Plausible', 'Genius'];

// EVENT LISTENERS
document.querySelector('.save-btn').addEventListener("click", saveButton);
document.querySelector('.idea-card-area').addEventListener("click", removeIdeaCard);
document.querySelector('.idea-card-area').addEventListener("click", clickVote);
document.querySelector('.idea-card-area').addEventListener("click", changeCard);
// document.querySelector('.idea-card-area').addEventListener("click", engageCardActions);


window.onload = (pullCardsFromStorage);
// PREVENT DEFAULT? 
//ADD NEW IDEA SHOULD NOT RELOAD THE PAGE?? -- SAVE BTN

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



function changeCard(event) {

  if(event.target.classList.contains('card-title-text')) {
    // id for current idea card
    console.log(event.target.parentElement.nextElementSibling.dataset.name);
    var idea = editCardContent(event);

    event.target.onblur = editTitle();
    //idea.updateSelf(this.title);
    console.log(idea.id);


  } 

function editTitle() {
  alert('see this first');

}

function editCardContent(event) {
    var getIdeaID = localStorage.getItem(event.target.parentElement.nextElementSibling.dataset.name);
    var obj = JSON.parse(getIdeaID);
    var idea = new Idea(obj.title, obj.body, obj.id, obj.quality);
    return idea;
}


//   var idea = new Idea();
//   var atitle = "";
//   var bbody = 'b';

//   if(event.target.classList.contains('idea-card-area')) {
//     event.target.onblur = yo(event);
//     alert(atitle);
//   }

// function yo(event) {
//     console.log(event.target);
//     var idea = getIdeaFromEvent(event);
//     idea.updateSelf('newTitle', 'newBody');
//     idea.saveToStorage();
// }

  // assigned to = idea.updateQuality(atitle, abody);
}


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
    //REFACTOR target.nextElementSibling.innerText TO SOMTHING SMALLER????
  if(target.nextElementSibling.innerText === "QUALITY: Swill") {
    target.nextElementSibling.innerText = "QUALITY: " + idea.updateQuality('Plausible');
  } else if(target.nextElementSibling.innerText === "QUALITY: Plausible") {
    target.nextElementSibling.innerText = "QUALITY: " + idea.updateQuality('Genius');
  }
  idea.saveToStorage();
}

function qualityDecrease(target) {
  var idea = getIdeaFromEvent(event);
  //REFACTOR target.nextElementSibling.nextElementSibling.innerText TO SOMTHING SMALLER????
  if(target.nextElementSibling.nextElementSibling.innerText === 'QUALITY: Plausible') {
    target.nextElementSibling.nextElementSibling.innerText = "QUALITY: " + idea.updateQuality('Swill');
  } else if (target.nextElementSibling.nextElementSibling.innerText === 'QUALITY: Genius') {
    target.nextElementSibling.nextElementSibling.innerText = "QUALITY: " + idea.updateQuality('Plausible');
  }
  idea.saveToStorage();
}

function getIdeaFromEvent(event) {
    var getIdeaID = localStorage.getItem(event.target.parentElement.parentElement.dataset.name);
    var obj = JSON.parse(getIdeaID);
    var idea = new Idea(obj.title, obj.body, obj.id, obj.quality);
    return idea;
}