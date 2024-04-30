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
      Authorization: `Bearer ${getCookie()}`,
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

  return await fetch(url, data);
};

export default graphqlCall;
