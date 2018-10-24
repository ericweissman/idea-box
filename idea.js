class Idea {
  constructor(title, body){
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  }


  saveToStorage(){
    localStorage.setItem(this.id, JSON.stringify(this));
  };

  deleteFromStorage(){
    // localStorage.removeItem(this.id);
  };

  updateSelf(){

  }

  updateQuality(){

  }
}
