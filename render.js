import { addLike } from "./add_comment_and_like.js";
import { newReply } from "./newReply.js";

const listElement = document.getElementById("commentsId");

export const renderUsers = ({ users }) => {
   
    const addDate = (date) => {
      const newDate = new Date(date);
      let time = {
        hour: "numeric",
        minute: "numeric"
      };
      let year = {
        year: "2-digit",
        month: "numeric",
        day: "numeric"
      };
      
      return newDate.toLocaleString("ru", year) + " " + newDate.toLocaleString("ru", time);
      };

    const getLikeClass = (element) => {
        return element ? "like-button -active-like" : "like-button";
    };
    
    const usersHtml = users.map((user) => {
      return `<li class="comment">
          <div class="comment-header">
            <div>${user.author.name}</div>
            <div>${addDate((user.date))}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${user.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button class="${getLikeClass(user.isLiked)}"></button>
            </div>
          </div>
        </li>`
    }).join("");
  
    listElement.innerHTML = usersHtml;
    addLike({users});
    newReply();
  };