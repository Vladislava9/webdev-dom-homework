import { getComments } from "./api.js";
import { renderApp } from "./renderApp.js";
import { setUsers } from "./users.js";
import { addComment } from "./addEl.js";

export const fetchAndRenderComments = () => {
    getComments()
        .then((data) => {
            return setUsers(data.comments);
        })
        .then(() => {
            renderApp();
            addComment();
        })
};