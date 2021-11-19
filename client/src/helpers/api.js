import { getToken } from "./auth";
import axios from "axios";

export const fetchProfile = async (id) => {
  const page = id;
  const config = {
    method: "get",
    url: `/api/profile/${page}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data;
};

export const fetchProfilePosts = async (id) => {
  const page = id;
  const config = {
    method: "get",
    url: `/api/profile/${page}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data.postSet;
};

export const fetchProfileInfo = async () => {
  const config = {
    method: "get",
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data;
};

export const fetchProfileInfoImage = async () => {
  const config = {
    method: "get",
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data.profileImage;
};

export const fetchProfileInfoBio = async () => {
  const config = {
    method: "get",
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data.profileBio;
};

export const fetchProfileInfoTrips = async () => {
  const config = {
    method: "get",
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
  };
  const response = await axios(config);
  console.log(response.data.postSet);
  return response.data.postSet;
};

export const updateProfileInformation = async (bio) => {
  console.log("this is my bio", bio);
  const config = {
    method: "put",
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
    data: JSON.stringify({
      profileBio: bio,
    }),
  };
  const response = await axios(config);
  return response.data;
};

export const updateProfileInformationImage = async (image) => {
  console.log("this is my bio", image);
  const config = {
    method: "put",
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
    data: JSON.stringify({
      profileImage: image,
    }),
  };
  const response = await axios(config);
  return response.data;
};

export const fetchUnfollow = async (id) => {
  console.log("this is me unfollowing!");
  const config = {
    method: "put",
    url: `/api/profile/${id}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data;
};

// export const addComment = async (id, comment) => {
//   const config = {
//     method: 'post',
//     url: `/posts/${id}/comments`,
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//       'content-Type': 'application/json'
//     },
//     "body": JSON.stringify({
//       "text": comment
//     }),
//   }

export const fetchFollow = async (id) => {
  return makeAxiosRequest(`/profile/${id}`);
};

export const login = async (data) => {
  return makeAxiosRequest("/login", data);
};

export const register = async (data) => {
  return makeAxiosRequest("/register", data);
};

export const postTrip = async (data) => {
  return makeAxiosRequest("/posts", data);
};

export const updatePost = async (id, data) => {
  return makeAxiosRequest(`/posts/${id}`, data, "put");
};

export const addComment = async (id, data) => {
  return makeAxiosRequest(`posts/${id}/comments`, data);
};

export const deletePost = async (id) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-Type": "application/json",
    },
  });
};

export const fetchPosts = async () => {
  const config = {
    method: "get",
    url: "api/posts",
    headers: {},
  };

  const response = await axios(config);
  return response.data;
};

export const makeAxiosRequest = async (url, data) => {
  const config = getAxiosRequestConfig(url, data);

  const response = await axios(config);
  return response.data;
};

export const getAxiosRequestConfig = (requestUrl, data, method = "post") => {
  const config = {
    method,
    url: `/api/${requestUrl}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    data: data,
  };
  return config;
};
