const API_URL =
  "https://vercel.com/mehulgupta959009-sudos-projects/expense-manager-4re2/5mmjd2FgQko39quVGJEYT1tUEYqt"; // http://localhost:3001 , http://192.168.1.2:3001 , http://192.168.43.81:3001

export const itemsToFetch = (signal) => {
  return fetch(`${API_URL}/items`, { signal })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const itemsToFetchFavs = (signal) => {
  return fetch(`${API_URL}/favItems`, {
    signal,
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export const itemToAdd = async (e) => {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expenseReason: e.target.expenseReason.value,
      price: e.target.price.value,
      itemType: e.target.itemType.value,
    }),
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

export const addToFav = async (itemId) => {
  const response = await fetch(`${API_URL}/addToFavs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      itemId: itemId,
    }),
  });
  return response.json();
};
