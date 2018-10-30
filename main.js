// EVENT LISTENERS
document.querySelector('.save-btn').addEventListener("click", saveButton);
document.querySelector('.idea-card-area').addEventListener("click", removeIdeaCard);
document.querySelector('.idea-card-area').addEventListener("click", clickVote);
document.querySelector('.idea-card-area').addEventListener("keypress", function(event) {
  var key = event.which || event.keyCode;
    if(key === 13) {
      event.preventDefault();
      changeCard(event);  
    }
  });

window.onload = (pullCardsFromStorage);

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



function changeCard(event) {
    var idea = grabCardCont(event);


    // IDed EACH CARD BY ID, NEED TO UPDATE BY ID ACCORDINGLY...
    // PLUS REFACTOR TO MAKE MORE READABLE
    if(idea.id ===  event.target.closest('.card-title-body').id){

    }



  
  if(event.target.classList.contains('card-title-text') || event.target.classList.contains('card-body-text')) {
    console.log(event.target.closest('.card-title-body').id);
    var newTitle = document.querySelector('.card-title-text').innerText;
    var newBody = document.querySelector('.card-body-text').innerText;
    idea.updateSelf(newTitle, newBody);
    editCardContent(idea);
    idea.saveToStorage();
  } 
}

function editCardContent(idea) {
    document.querySelector('.card-body-text').innerText = idea.body;
    document.querySelector('.card-title-text').innerText = idea.title;
}

function grabCardCont(event) {
    var getIdeaID = localStorage.getItem(event.target.parentElement.nextElementSibling.dataset.name);
    var obj = JSON.parse(getIdeaID);
    var idea = new Idea(obj.title, obj.body, obj.id, obj.quality);
    return idea;
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