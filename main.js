var title = '';
var body = '';
var currentIdea = '';

// EVENT LISTENERS
document.querySelector('#title-input').addEventListener("keyup", getTitle);
document.querySelector('#body-input').addEventListener("keyup", getBody);
document.querySelector('.save-btn').addEventListener("click", addIdea);
document.querySelector('.idea-card-area').addEventListener("click", removeCard);

function getTitle(){
  title = document.querySelector('#title-input').value;
  console.log(title.value);
  return title;
};

function getBody(){
  body = document.querySelector('#body-input').value;
  console.log(body.value);
  return body;
};

function addCard(title, body){
  var newCard = document.createElement('article');
  newCard.innerHTML = `
      <article class="card1">
      <section class="card-title-body">
        <h2>${currentIdea.title}</h2>
        <p>${currentIdea.body}</p>
      </section>
      <section class="card-actions">
        <div>
          <button class="downvote"><img src="images/downvote.svg" alt="down button"></button>
          <button class="upvote"><img src="images/upvote.svg" alt="up button"></button>
          <h3 class="idea-quality">QUALITY: Swill</h3>
        </div>
        <img class="delete" src="images/delete.svg" alt="delete button">
      </section>
    </article>
  `;
  document.querySelector('.idea-card-area').prepend(newCard);
  currentIdea.saveToStorage(title, body);
  clearInputs();
}



function clearInputs() {
  document.querySelector('#title-input').value = null;
  document.querySelector('#body-input').value = null;
}

function eric(title){
  var temp = localStorage.getItem(title);
  temp.deleteFromStorage(temp);
};

function addIdea(){
  var idea = new Idea(title, body);
  currentIdea = idea;
  addCard(currentIdea.title, currentIdea.body);
};

function removeCard(event){
  if (event.target.classList.contains('delete')){
    event.target.parentElement.parentElement.parentElement.remove();
  }
}
