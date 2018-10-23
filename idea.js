class Idea {
  constructor(title, body){
    this.id = 'Idea: ' + Date.now();
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  }


  saveToStorage(title, body){
    // var num = new Date();
    // num += title;

    localStorage.setItem(this.id, body);

  };

  deleteFromStorage(title){
    localStorage.removeItem(title);
  };

  updateSelf(){

  }

  updateQuality(){

  }
}
