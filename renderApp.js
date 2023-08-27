import { users, name} from "./users.js";
import { token } from "./api.js";
import { authorization } from "./loginPage.js"
import { addLike, getLikeClass } from "./addEl.js";
import { newReply } from "./newReply.js";
import {format} from "date-fns";

const appElement = document.getElementById("app");

export const renderApp = () => {
    const usersHtml = users.map((user) => {
        return `<li class="comment">
              <div class="comment-header">
                <div>${user.author.name}</div>
                <div>${format(new Date(user.date), "yyyy-MM-dd hh.mm.ss")}</div>
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
            </li>
            ` 
      }).join("");
    
    const appHtml = `<div class="container">
        <div class="loader_1 hidden">
          Подождите, комментарии загружаются...
        </div>
        <ul class="comments" id="commentsId">
          ${usersHtml}
        </ul>
        ${token ?  `
          <div class="add-form">
            <input type="text" class="add-form-author" id="author-input" value="" placeholder="${name}" readonly/>
            <textarea type="textarea" class="add-form-text" id="text-input" value="" placeholder="Введите ваш коментарий"
            rows="4"></textarea>
            <div class="add-form-row">
            <button class="add-form-button" id="add-form-buttonId">Написать</button>
            </div>
            </div>` : `<p>Чтобы добавить комментарий, <a class="login-link" href="#">авторизируйтесь</a></p>`}
            <div class="loader_2 hidden">Комментарий загружается...</div>
          </div>
        `
appElement.innerHTML = appHtml;

if (!token) {
const linkElement = document.querySelector(".login-link");

linkElement.addEventListener("click", () => {
  authorization();
})}

addLike();
newReply();
}

