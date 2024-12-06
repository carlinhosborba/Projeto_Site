import { Auth0Client } from "@auth0/auth0-spa-js";

const auth0 = new Auth0Client({
  domain: "dev-gnzna8fqd2z5c3r7.us.auth0.com", 
  clientId: "ZpZN8G7hHXpBdbyXUbTOb25896REIbYQ",      
  authorizationParams: {
    redirect_uri: window.location.origin, 
  },
});

async function login() {
  await auth0.loginWithRedirect();
}

async function logout() {
  await auth0.logout({
    logoutParams: {
      returnTo: window.location.origin, 
    },
  });
}

async function checkAuthentication() {
  const isAuthenticated = await auth0.isAuthenticated();
  if (isAuthenticated) {
    const user = await auth0.getUser();
    document.getElementById("user").textContent = `Bem-vindo, ${user.name}`;
    document.getElementById("btn-login").style.display = "none";
    document.getElementById("btn-logout").style.display = "block";
  } else {
    document.getElementById("user").textContent = "Você não está logado.";
    document.getElementById("btn-login").style.display = "block";
    document.getElementById("btn-logout").style.display = "none";
  }
}

async function handleRedirect() {
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/"); // Remove query params
  }
}

document.getElementById("btn-login").addEventListener("click", login);
document.getElementById("btn-logout").addEventListener("click", logout);

handleRedirect().then(checkAuthentication);

async function registerUser(nickname, email, password) {
  const user = new Parse.User();

  user.set("username", nickname); 
  user.set("nickname", nickname); 
  user.set("email", email);       
  user.set("password", password); 

  try {
      await user.signUp();
      alert("Usuário registrado com sucesso!");
      console.log("Usuário registrado:", { nickname, email });
  } catch (error) {
      alert(`Erro ao registrar: ${error.message}`);
      console.error("Erro ao registrar:", error);
  }
}

async function loginUser(nickname, password) {
  try {
      await Parse.User.logIn(nickname, password);
      alert("Login bem-sucedido!");
      console.log("Usuário logado:", { nickname });
      window.location.href = "home.html"; 
  } catch (error) {
      alert(`Erro ao fazer login: ${error.message}`);
      console.error("Erro ao fazer login:", error);
  }
}
