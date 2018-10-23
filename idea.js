class Idea {
  constructor(title, body){
    // this.id = 'Idea: ' + Date.now();
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  }


  saveToStorage(title, body){
    localStorage.setItem(title, body);
  };

  // deleteFromStorage(title){
  //   localStorage.removeItem(title);
  // };

  updateSelf(){

  }

  updateQuality(){

  }
}
