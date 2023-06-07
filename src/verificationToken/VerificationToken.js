import jwt_decode from "jwt-decode";

export const verificationToken = async (url, options = {}) => {

  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now();
    const timeUntilExpiration = decodedToken.exp * 1000 - currentTime;
    if (decodedToken.exp * 1000 > currentTime) {
      if (timeUntilExpiration <= 10 * 60 * 1000) {
        const response = await fetch('http://localhost:5000/auth/refreshtoken', {
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
        } else {
          throw new Error("Failed to refresh token");
        }
      };
      options.headers = {
        ...options.headers,
        Authorization: token,
      }
      return await fetch(url, options)
    } else {
      localStorage.clear()
      window.location.href = "/";
    };
  };
};
