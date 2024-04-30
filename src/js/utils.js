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

const getCookie = () => {
  const cname = "token=";
  const cookie = document.cookie.split(";");
  for (let i = 0; i < cookie.length; i++) {
    let c = cookie[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
};

const sessionCheck = async () => {
  const query = session;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie()}`,
  };

  const data = {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
    }),
  };

  const response = await fetch(url, data);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const dataResponse = await response.json();
  if (dataResponse.errors) {
    throw new Error(dataResponse.errors[0].message);
  }

  return dataResponse.data.session;
};

export { getCookie, sessionCheck, appendAlert };
