const API_URL = "http://192.168.1.2:3001";

export const itemsToFetch = (signal) => {
  return fetch(`${API_URL}/items`, { signal })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const itemToAdd = async (name, expenseData = {}) => {
  const body =
    expenseData && Object.keys(expenseData).length > 0
      ? expenseData
      : { productName: name };

  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(response);

  return response.json();
};

export const postLogin = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  return response.json().then((res) => {
    console.log(res);
  });
};

export const postSignIn = async (fname, lname, email, password) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    }),
  });
  return response.json().then((res) => {
    console.log(res);
  });
};
