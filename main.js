var title = '';
var body = '';
var currentIdea = '';

// EVENT LISTENERS
select('#title-input').addEventListener("keyup", getIdeaTitle);
select('#body-input').addEventListener("keyup", getIdeaBody);
select('.save-btn').addEventListener("click", addNewIdea);
select('.idea-card-area').addEventListener("click", removeIdeaCard);

// Select function replaces typing documentquerey selector over and over
function select(field){
  return document.querySelector(field);
}

// Input Fields
function addNewIdea() {
  var idea = new Idea(title, body);
  currentIdea = idea;
  addCardWith(currentIdea.title, currentIdea.body);
};

function getIdeaTitle(){
  title = select('#title-input').value;
  return title;
};

function getIdeaBody(){
  body = select('#body-input').value;
  return body;
};

function removeIdeaCard(event) {
  if (event.target.classList.contains('delete')) {
    event.target.parentElement.parentElement.remove();
  }
}

// Helper Functions

function addCardWith(title, body){
  var newCard = document.createElement('article');
  newCard.className = 'idea-card';
  newCard.innerHTML = `
      <section class="card-title-body">
        <h2 class="card-title-text">${currentIdea.title}</h2>
        <p class="card-body-text">${currentIdea.body}</p>
      </section>
      <section class="card-actions">
        <div class="action-btns">
          <button class="downvote"><img src="images/downvote.svg" alt="down button"></button>
          <button class="upvote"><img src="images/upvote.svg" alt="up button"></button>
          <h3 class="idea-quality">QUALITY: Swill</h3>
        </div>
        <img class="delete" src="images/delete.svg" alt="delete button">
      </section>
  `;
  select('.idea-card-area').prepend(newCard);
  currentIdea.saveToStorage(title, body);
  clearInputs();
}

function clearInputs() {
  select('#title-input').value = null;
  select('#body-input').value = null;
}




