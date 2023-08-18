import { login, postRegistration, setToken, token } from "./api.js";
import { fetchAndRenderComments } from "./fetch.js";
import { setName } from "./users.js";

export const authorization = () => {
  const appElement = document.getElementById("app");
  appElement.innerHTML =
    `<div class="login-container">
                        <h2 class="login-title">Форма входа</h2>
                        <div class="login-form">
                            <label for="username" class="login-label">Логин:</label>
                            <input type="text" id="login-input" name="username" class="login-input" required>
                            <label for="password" class="login-label">Пароль:</label>
                            <input type="password" id="password-input" name="password" class="login-input" required>
                            <button type="submit" class="login-button" id="login-button">Войти</button>
                            <div>или</div>
                            <button type="submit" class="login-button" id="reg-link"">Зарегистрироваться</button>
                        </div>
                    </div>`

  const loginButtonElement = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");
  const registrationLink = document.getElementById("reg-link");

  console.log(registrationLink);

  loginButtonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value
    }).then((responseData) => {
      setName(responseData.user.name);
      setToken(responseData.user.token)
      return
    }).then(() => {
      return fetchAndRenderComments();
    })
      .catch((error) => {
        if (error.message === "incorrect login or password") {
          alert("Вы ввели неправильный логин или пароль!")
        }
      })
  })

  registrationLink.addEventListener("click", () => {
    appElement.innerHTML =
      `<div class="login-container">
          <h2 class="login-title">Зарегистрироваться</h2>
              <div class="login-form">
                  <label for="username" class="login-label">Логин:</label>
                  <input type="text" id="user-login" name="username" class="login-input" required>
                  <label for="password" class="login-label">Пароль:</label>
                  <input type="password" id="user-password" name="password" class="login-input" required>
                  <label for="loginame" class="login-label">Имя</label>
                  <input type="text" id="name-input" name="loginame" class="login-input" required>
                  <button type="submit" class="login-button" id="reg-button">Зарегистрироваться</button>
                  <div>или</div>
                  <button type="submit" class="login-button" id="login-link">Войти</button>
                </div>
        </div>`
    console.log(appElement);
    const userLoginElement = document.getElementById("user-login")
    const nameInputElement = document.getElementById("name-input");
    const regButtonElement = document.getElementById("reg-button");
    const userPasswordElement = document.getElementById("user-password");
    console.log(regButtonElement);
    console.log(userPasswordElement);

    regButtonElement.addEventListener("click", () => {
      postRegistration({
        login: userLoginElement.value,
        name: nameInputElement.value,
        password: userPasswordElement.value

      }).then((responseData) => {
        console.log(userLoginElement.value, nameInputElement.value, userPasswordElement.value);
        console.log(token);
        setName(responseData.user.name);
        setToken(responseData.user.token);
        return
      }).then(() => {
        return fetchAndRenderComments();
      })
        .catch((error) => {
          if (error.message === "user already exists") {
            alert("Данный пользователь уже существует!")
          }
        })
    })

    const loginLink = document.getElementById("login-link")
    console.log(loginLink);
    loginLink.addEventListener("click", () => {
      authorization();
    })
  });
}