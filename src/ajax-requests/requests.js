export const COHORT_NAME = "2301-UNIV-ET-WEB-PT";
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


export const registerUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registeredUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const makePost = async (post, token) => {

  console.log(post, token);

  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          post
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
};
