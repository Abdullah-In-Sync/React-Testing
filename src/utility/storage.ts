import Cookies from "js-cookie";

const setSecureCookie = (label: string, value: string, options?: object) => {
  Cookies.set(label, value, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    ...options,
  });
};

export const setSessionToken = (data, callback) => {
  /* istanbul ignore else */
  const { jwtToken, userType, exp } = data;
  const expires = new Date(exp * 1000);
  setSecureCookie("myhelptoken", jwtToken, {
    expires,
  });

  setSecureCookie("user_type", userType, { expires });
  return callback(data);
};

export const getSessionToken = () => {
  const { myhelptoken: userToken, user_type: userType } = Cookies.get() || {};
  return { userToken, userType };
};

export const clearSession = (proceedNextCallback) => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    /* istanbul ignore else */
    Cookies.remove(cookieName);
  });
  return proceedNextCallback();
};
