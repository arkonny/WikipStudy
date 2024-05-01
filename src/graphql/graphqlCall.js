import { getCookie } from "../js/utils.js";
const url = "http://localhost:3000/graphql";

const graphqlCall = async (query, variables) => {
  let headers;
  if (document.cookie === "") {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    };
  }

  const data = {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  const response = await fetch(url, data);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};

export default graphqlCall;
