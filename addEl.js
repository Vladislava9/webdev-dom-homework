import { users } from "./users.js";
import { postApi } from "./postApi.js"
import { token } from "./api.js";
import { renderApp } from "./renderApp.js";

export const addComment = () => {
  if (token) {
    const buttonElement = document.getElementById("add-form-buttonId");
    const authorInputElement = document.getElementById("author-input");
    const textInputElement = document.getElementById("text-input");

    authorInputElement.classList.remove('error');
    textInputElement.classList.remove('error');
    buttonElement.addEventListener("click", () => {

      if (textInputElement.value === '') {
        textInputElement.classList.add('error');
        return;
      } else {
        postApi();
      }
    })
  }
};

export const getLikeClass = (element) => {
  return element ? "like-button -active-like" : "like-button";

};

export function addLike() {
  const likeElements = document.querySelectorAll(".like-button");

  likeElements.forEach((likeElement, index) => {

    likeElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const user = users[index];
      if (user.isLiked) {
        user.isLiked = false;
        user.likes -= 1;
        renderApp();
      } else {
        user.isLiked = true;
        user.likes += 1;
        renderApp();
      };
    });
  });
};

  // export const addDate = (date) => {
  //   const newDate = new Date(date);
  //   let time = {
  //     hour: "numeric",
  //     minute: "numeric"
  //   };
  //   let year = {
  //     year: "2-digit",
  //     month: "numeric",
  //     day: "numeric"
  //   };

  //   return newDate.toLocaleString("ru", year) + " " + newDate.toLocaleString("ru", time);
  // };
