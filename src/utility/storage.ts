import Cookies from "js-cookie";

export const setSessionToken = (data, callback) => {
  const { jwtToken, userType, exp } = data;
  const expires = new Date(exp * 1000);
  Cookies.set("myhelptoken", jwtToken, {
    secure: true,
    expires,
    sameSite: "strict",
  });
  Cookies.set("user_type", userType, { expires });
  return callback(data);
};

export const getSessionToken = () => {
  const { myhelptoken: userToken, user_type: userType } = Cookies.get() || {};
  return { userToken, userType };
};

export const clearSession = (proceedNextCallback) => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
  return proceedNextCallback();
};
