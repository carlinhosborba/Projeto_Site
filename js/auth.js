import { Auth0Client } from "@auth0/auth0-spa-js";

// Configurações do Auth0
const auth0 = new Auth0Client({
  domain: "dev-gnzna8fqd2z5c3r7.us.auth0.com", // Substitua pelo seu domínio do Auth0
  clientId: "ZpZN8G7hHXpBdbyXUbTOb25896REIbYQ",      // Substitua pelo seu Client ID
  authorizationParams: {
    redirect_uri: window.location.origin, // URL de redirecionamento
  },
});

// Função para login
async function login() {
  await auth0.loginWithRedirect();
}

// Função para logout
async function logout() {
  await auth0.logout({
    logoutParams: {
      returnTo: window.location.origin, // Redirecionar após logout
    },
  });
}

// Checar o estado de autenticação
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

// Inicializar o Auth0 após redirecionamento
async function handleRedirect() {
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/"); // Remove query params
  }
}

// Configurações da página
document.getElementById("btn-login").addEventListener("click", login);
document.getElementById("btn-logout").addEventListener("click", logout);

// Inicialização
handleRedirect().then(checkAuthentication);
