

// EVENT LISTENERS
select('#title-input').addEventListener("keyup", getIdeaTitle);
select('#body-input').addEventListener("keyup", getIdeaBody);
select('.save-btn').addEventListener("click", addNewIdea);
select('.idea-card-area').addEventListener("click", removeIdeaCard);
select('.idea-card-area').addEventListener("click", clickUpvote);


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
  return title;
};

function getIdeaBody(){
  body = select('#body-input').value;
  return body;
};

// Helper Functions

function addCardWith(idea){
  var newCard = document.createElement('article');
  newCard.className = 'idea-card';
  newCard.innerHTML = `
      <section class="card-title-body">
        <h2 class="card-title-text">${idea.title}</h2>
        <p class="card-body-text">${idea.body}</p>
      </section>
      <section class="card-actions" id= ${idea.id}> 
        <div class="action-btns">
          <button class="downvote"><img class="downvote-img"src="images/downvote.svg" alt="down button"></button>
          <button class="upvote"><img class="upvote-img"src="images/upvote.svg" alt="up button"></button>
          <h3 class="idea-quality">QUALITY: Swill</h3>
        </div>
        <img class="delete" src="images/delete.svg" alt="delete button">
      </section>
  `;
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
    console.log(event.target.parentElement);
    event.target.parentElement.parentElement.remove();
  }
}

function clickUpvote(event) {
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


