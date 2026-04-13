const API_URL = "http://192.168.1.2:3001";

// Get all transactions
export const itemsToFetch = (signal) => {
  return fetch(`${API_URL}/items`, { signal })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log("Error fetching items:", err);
      return [];
    });
};

// Get transactions by type (expense or earning)
export const itemsToFetchByType = (type, signal) => {
  return fetch(`${API_URL}/items/${type}`, { signal })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log("Error fetching items by type:", err);
      return [];
    });
};

// Add new expense or earning
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

// Delete transaction
export const deleteItem = async (itemId) => {
  const response = await fetch(`${API_URL}/items/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId }),
  });
  return response.json();
};

// Login
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

// Sign up
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
