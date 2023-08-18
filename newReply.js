import { users } from "./users.js";

export const newReply = () => {
  const commentElements = document.querySelectorAll('.comment');  
  const textInputElement = document.getElementById("text-input");
    commentElements.forEach((commentElement, index) => {
      commentElement.addEventListener('click', (event) => {
        event.stopPropagation();
        const originalText = `${users[index].author.name} : ${users[index].text} /n /nОтвет:`;
        textInputElement.value = originalText;
      })
    });
  };