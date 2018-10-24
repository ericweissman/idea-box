class Idea {
  constructor(title, body){
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  }

  cardInfo(ideaCard) {
    ideaCard.innerHTML = 
      `<section class="card-title-body">
            <h2 class="card-title-text">${this.title}</h2>
            <p class="card-body-text">${this.body}</p>
          </section>
          <section class="card-actions" id= ${this.id} data-name="${this.id}"> 
            <div class="action-btns">
              <button class="downvote"><img class="downvote-img"src="images/downvote.svg" alt="down button"></button>
              <button class="upvote"><img class="upvote-img"src="images/upvote.svg" alt="up button"></button>
              <h3 class="idea-quality">QUALITY: Swill</h3>
            </div>
            <img class="delete" src="images/delete.svg" alt="delete button">
          </section>    
      `;
  }


  saveToStorage(){
    localStorage.setItem(this.id, JSON.stringify(this));
  };

  deleteFromStorage(){
//  Figure out next
  };

  updateSelf(){

  }

  updateQuality(){
   
  }
}
