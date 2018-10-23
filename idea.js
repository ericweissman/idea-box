class Idea {
  constructor(title, body){
    this.title = title;
    this.body = body;
  }


  saveToStorage(title, body){
    var num = new Date();
    num += title;

    localStorage.setItem(num, body);

  };

  deleteFromStorage(){

  };

  updateSelf(){

  }

  updateQuality(){

  }
}
