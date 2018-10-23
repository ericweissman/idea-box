var title = '';
var body = '';

// EVENT LISTENERS
document.querySelector('#title-input').addEventListener("keyup", getTitle);
document.querySelector('#body-input').addEventListener("keyup", getBody);
document.querySelector('#save-btn').addEventListener("click",)

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

