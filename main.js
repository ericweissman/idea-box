var title = '';
var body = '';

// EVENT LISTENERS
document.querySelector('#title-input').addEventListener("keyup", getTitle);
document.querySelector('#body-input').addEventListener("keyup", getBody);
document.querySelector('.save-btn').addEventListener("click", addCard);

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

function addCard(){
  var newCard = document.createElement('article');
  newCard.innerHTML = `
      <article>
      <section class="card-title-body">
        <h2>${title}</h2>
        <p>${body}</p>
      </section>
      <section class="card-actions">
        <div>
          <button class="downvote"><img src="images/downvote.svg" alt="down button"></button>
          <button class="upvote"><img src="images/upvote.svg" alt="up button"></button>
          <h3 class="idea-quality">QUALITY: Swill</h3>
        </div>
        <div>
          <button class="delete"><img src="images/delete.svg" alt="delete button"></button>
        </div>
      </section>
    </article>
  `;
  document.querySelector('.idea-card-area').prepend(newCard);
}