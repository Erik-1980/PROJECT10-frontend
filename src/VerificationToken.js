
export const verificationToken = async (url, options = {}) => {
  const old_token = options.headers?.Authorization;

  const response = await fetch(url, options);
  const new_token = response.headers.get('Authorization');

  if (new_token && old_token !== new_token) {
    localStorage.setItem('token', new_token)
  };
  return response;
};
