import { renderUsers } from "./render.js";

const buttonElement = document.getElementById("add-form-buttonId");
const authorInputElement = document.getElementById("author-input");
const textInputElement = document.getElementById("text-input");

export const addComment = ({ postApi }) => {

    authorInputElement.classList.remove('error');
    textInputElement.classList.remove('error');
    buttonElement.addEventListener("click", () => {
    if (authorInputElement.value === '') {
      authorInputElement.classList.add('error');
      return;
    } else if (textInputElement.value === '') {
      textInputElement.classList.add('error');
      return;
    } else {
      postApi();
    }
  })
  };
  
export function addLike({users}) {
    const likeElements = document.querySelectorAll(".like-button");
  
    likeElements.forEach((likeElement, index) => {
  
      likeElement.addEventListener("click", (event) => {
        event.stopPropagation();
        const user = users[index];
        if (user.isLiked === true) {
          user.isLiked = false;
          user.likes -= 1;
          renderUsers({ users });
        } else {
          user.isLiked = true;
          user.likes += 1;
          renderUsers({ users });
        };
      });
    });
  };
  