// EVENT LISTENERS
select('#title-input').addEventListener("keyup", getIdeaTitle);
select('#body-input').addEventListener("keyup", getIdeaBody);
select('.save-btn').addEventListener("click", addNewIdea);
select('.idea-card-area').addEventListener("click", removeIdeaCard);
select('.idea-card-area').addEventListener("click", clickUpvote);
select('.idea-card-area').addEventListener("click", clickDownvote);


// Select function replaces typing document.query selector over and over
function select(field){
  return document.querySelector(field);
}


// Input Fields
function addNewIdea() {
  var idea = new Idea(title, body);
  addCardWith(idea);
};

function getIdeaTitle(){
  title = select('#title-input').value;
//ASK ABOUT HOISTING & GLOBAL VARIABLES
};

function getIdeaBody(){
  body = select('#body-input').value;
//ASK ABOUT HOISTING & GLOBAL VARIABLES
};

// Helper Functions

function addCardWith(idea){
  var newCard = document.createElement('article');
  newCard.className = 'idea-card';
  idea.cardInfo(newCard);
  select('.idea-card-area').prepend(newCard);
  idea.saveToStorage();
  clearInputs();
}

function clearInputs() {
  select('#title-input').value = null;
  select('#body-input').value = null;
}

function removeIdeaCard(event) {
  if (event.target.classList.contains('delete')) {
    localStorage.removeItem(event.target.parentElement.id);
    var someID = select('.card-actions').dataset.name;
    localStorage.removeItem("someID");
    event.target.parentElement.parentElement.remove();
  }
}

function clickUpvote(event) {
//DOES NOT TARGET SPECIFIC CARDS YET
  if(event.target.classList.contains('upvote-img')) {
    qualityIncrease();
  }
}

function qualityIncrease() {
  if(select('.idea-quality').innerHTML === 'QUALITY: Swill') {
    select('.idea-quality').innerHTML = 'QUALITY: Plausible';
  } else if(select('.idea-quality').innerHTML === 'QUALITY: Plausible') {
    select('.idea-quality').innerHTML = 'QUALITY: Genius';
  }
}

function clickDownvote(event) {
//DOES NOT TARGET SPECIFIC CARDS YET
  if(event.target.classList.contains('downvote-img')) {
    qualityDecrease();
   }
}

function qualityDecrease() {
  if(select('.idea-quality').innerHTML === 'QUALITY: Plausible') {
    select('.idea-quality').innerHTML = 'QUALITY: Swill';
  } else if (select('.idea-quality').innerHTML === 'QUALITY: Genius') {
    select('.idea-quality').innerHTML = 'QUALITY: Plausible';
  }
}
