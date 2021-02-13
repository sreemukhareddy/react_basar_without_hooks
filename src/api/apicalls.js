import axios from "axios";

export const signUp = (user) => {
  return axios.post("/api/1.0/users", user, {
    timeout: 3000,
  });
};

export const login = (user) => {
  return axios.post(
    "api/1.0/login",
    {},
    {
      timeout: 3000,
      auth: user,
    }
  );
};

export const login2 = (user) => {
  return axios.post("/api/2.0/login", user, {
    timeout: 3000,
  });
};

export const listUsers = (param = { page: 0, size: 3 }) => {
  const path = `/api/1.0/users?page=${param.page || 0}&size=${param.size || 3}`;
  return axios.get(path, {
    timeout: 3000,
  });
};

export const getUser = (username) => {
  const path = `/api/1.0/users/${username}`;
  return axios.get(path);
};

export const updateUser = (userId, body) => {
  return axios.put("/api/1.0/users/" + userId, body, {
    timeout: 3000,
  });
};

export const postHoax = (hoax, user) => {
  return axios.post("/api/1.0/hoaxes", hoax, {
    timeout: 3000,
    auth: user,
  });
};

export const loadHoaxes = (username) => {
  const basePath = username
    ? `/api/1.0/users/${username}/hoaxes`
    : "/api/1.0/hoaxes";
  return axios.get(basePath + "?page=0&size=5&sort=id,desc", {
    timeout: 3000,
  });
};

export const loadOldHoaxes = (hoaxId, username) => {
  const basePath = username
    ? `/api/1.0/users/${username}/hoaxes`
    : "/api/1.0/hoaxes";
  const path = `${basePath}/${hoaxId}?direction=before&page=0&size=5&sort=id,desc`;
  return axios.get(path, {
    timeout: 3000,
  });
};

export const loadNewHoaxes = (hoaxId, username) => {
  const basePath = username
    ? `/api/1.0/users/${username}/hoaxes`
    : "/api/1.0/hoaxes";
  const path = `${basePath}/${hoaxId}?direction=after&sort=id,desc`;
  return axios.get(path, {
    timeout: 3000,
  });
};

export const loadNewHoaxCount = (hoaxId, username) => {
  const basePath = username
    ? `/api/1.0/users/${username}/hoaxes`
    : "/api/1.0/hoaxes";
  const path = `${basePath}/${hoaxId}?direction=after&count=true`;
  return axios.get(path, {
    timeout: 3000,
  });
};

export const postHoaxFile = (file) => {
  return axios.post("/api/1.0/hoaxes/upload", file, {
    timeout: 3000,
  });
};

export const deleteHoax = (hoaxId, user) => {
  return axios.delete("/api/1.0/hoaxes" + hoaxId, {
    timeout: 3000,
    auth: user,
  });
};
