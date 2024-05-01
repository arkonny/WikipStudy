import graphqlCall from "../graphql/graphqlCall.js";
import { checkToken } from "../graphql/queries.js";

const appendAlert = (alertElement, message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertElement.append(wrapper);
};

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()}`;
};

const getCookie = (name) => {
  const cookie = document.cookie
    .split(";")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
  return cookie ? cookie : "";
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

const sessionCheck = async () => {
  if (!getCookie("token")) {
    return null;
  }
  const response = await graphqlCall(checkToken, {});

  const dataResponse = await response.json();
  if (
    dataResponse.errors ||
    dataResponse.data.checkToken.message !== "Token is valid"
  ) {
    deleteCookie("token");
    deleteCookie("user_name");
    return null;
  }

  return dataResponse.data.checkToken.user;
};

export { appendAlert, setCookie, getCookie, deleteCookie, sessionCheck };
