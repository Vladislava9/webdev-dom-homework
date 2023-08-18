import { postComment } from "./api.js";
import { showElement, hideElement } from "./showHideEl.js";
import { fetchAndRenderComments } from "./fetch.js";

    export const postApi = () => {
      const formElement = document.querySelector(".add-form");
      const addCommentLoader = document.querySelector(".loader_2");
      showElement(addCommentLoader);
      hideElement(formElement);
      const authorInputElement = document.getElementById("author-input");
      const textInputElement = document.getElementById("text-input");
      
      postComment({
        text: textInputElement.value,
        name: authorInputElement.value
      })
        .then(() => {
          authorInputElement.value = "";
          textInputElement.value = "";
          fetchAndRenderComments();
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


