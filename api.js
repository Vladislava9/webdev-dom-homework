const commentsURL = "https://wedev-api.sky.pro/api/v2/vlada/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";
const registrationURL = "https://wedev-api.sky.pro/api/user";

export let token;
export const setToken = (newToken) => {
token = newToken;
};

export function getComments() {
    return fetch(commentsURL,
    {
      method: "GET",
      
    })
    .then((response) => {
      if (response.status != 200) {
      throw new Error("error");
      } else return response.json();
    })
}

export function postComment({ text, name }) {
    return fetch(commentsURL,
    {
      method: "POST",
      body: JSON.stringify({
        text,
        name,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("< 2 sumb");
      } else if (response.status === 500) {
        throw new Error("server fall");
      } else return response.json();
    })
}

export function login({login, password}) {
  return fetch(userURL,
  {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    })
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json();
     } else {
      throw new Error ("incorrect login or password");
     }
  })
}

export function postRegistration({login, name, password}) {
  return fetch(registrationURL,
  {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    })
  })
  .then((response) => {
     if (response.status === 201) {
      return response.json();
     } else {
      throw new Error ("user already exists");
     }
  })
}