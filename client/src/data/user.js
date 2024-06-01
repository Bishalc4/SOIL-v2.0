import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  if(user !== null)
    setUser(username);

  return user;
}

async function findUser(username) {
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function deleteUser(username) {
  const response = await axios.delete(API_HOST + `/api/users/delete/${username}`);

  return response.data;
}

async function updateUser(username, first_name, last_name) {
  const response = await axios.put(API_HOST + `/api/users/select/${username}`, { first_name, last_name });
  return response.data;
}

async function updatePassword(username, old_password, new_password) {
  const response = await axios.put(`${API_HOST}/api/users/password/${username}`, {
    params: { old_password, new_password }
  });
  return response.data;
}

// --- Helper functions to store logged in user in localstorage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getUser, removeUser, deleteUser,
  setUser, updateUser, updatePassword
}
