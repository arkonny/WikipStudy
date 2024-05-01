import { sessionCheck, deleteCookie } from "./utils.js";

sessionCheck().then((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", async () => {
  deleteCookie("token");
  deleteCookie("user_name");
  deleteCookie("id");
  window.location.href = "login.html";
});
