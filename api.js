export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/vlada-pokolavina/comments",
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
    return fetch("https://wedev-api.sky.pro/api/v1/vlada-pokolavina/comments",
    {
      method: "POST",
      body: JSON.stringify({
        text: text,
        name: name,
        forceError: true
      })
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("< 2 sumb");
      } else if (response.status === 500) {
        throw new Error("server fall");
      } else return response.json();
    })
}