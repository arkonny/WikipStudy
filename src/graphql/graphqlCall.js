import { getCookie } from "../js/utils.js";
const url = "http://localhost:3000/graphql";

const graphqlCall = async (query, variables) => {
  let headers;
  const token = getCookie("token");
  if (token === "") {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
