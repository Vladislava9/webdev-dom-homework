import { getComments, postComment } from "./api.js";
import { showElement, hideElement } from "./show_hide_el.js";
import { renderUsers } from "./render.js";
import { addComment } from "./add_comment_and_like.js";

const formElement = document.querySelector(".add-form");
const getCommentsLoader = document.querySelector(".loader_1");
const addCommentLoader = document.querySelector(".loader_2");
const authorInputElement = document.getElementById("author-input");
const textInputElement = document.getElementById("text-input");

let users = [];
  
const getApi = () => {

  getComments().then((responseData) => {
      users = responseData.comments;
  
      hideElement(getCommentsLoader);
      showElement(formElement);
      renderUsers({ users });
      addComment({ postApi });
      return;
    })
  };

  const postApi = () => {
  
  showElement(addCommentLoader);
  hideElement(formElement);
  
  postComment({
    text: textInputElement.value, 
    name: authorInputElement.value })
    .then(() => {
      authorInputElement.value = "";
      textInputElement.value = "";
      getApi();
      hideElement(addCommentLoader);
      return;
    }).catch((error) => {
      console.log(error);
      if (error.message === "< 2 sumb") {
        alert("Имя и комментарий должны быть не короче 3 символов");
        authorInputElement.classList.add("error");
        textInputElement.classList.add("error");
      } else if (error.message === "server fall") {
        alert("Сервер сломался, попробуй позже");
      } else return alert("Кажется, у Вас пропал Интернет, попробуйте позже!");
      
      hideElement(addCommentLoader);
      showElement(formElement);
    })
    
};

getApi();

console.log("It works!");