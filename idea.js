class Idea {
  constructor(title, body, id, quality){
    this.body = body;
    this.title = title;
    this.id = id || Date.now();
    this.quality = quality || 'Swill';
  }

  cardInfo(ideaCard) {
    ideaCard.innerHTML = 
      `<section class="card-title-body" id=${this.id} data-name="${this.id}">
            <h2 class="card-title-text" contenteditable="true">${this.title}</h2>
            <p class="card-body-text" contenteditable="true">${this.body}</p>
          </section>
          <section class="card-actions" id= ${this.id} data-name="${this.id}"> 
            <div class="action-btns">
              <img class="downvote-img"src="images/downvote.svg" alt="downvote button">
              <img class="upvote-img"src="images/upvote.svg" alt="upvote button">
              <h3 class="idea-quality">QUALITY: ${this.quality}</h3>
            </div>
            <img class="delete" src="images/delete.svg" alt="delete button">
          </section>    
      `;
  }


  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  };

  deleteFromStorage(event) {
    localStorage.removeItem(event.target.parentElement.id)  
  };

  updateSelf(updatedTitle, updatedBody) {
    this.title = updatedTitle;
    this.body = updatedBody;
    return this.title + this.body;
  }

  updateQuality(qual) {
    this.quality = qual;
    return this.quality;
  }
}
