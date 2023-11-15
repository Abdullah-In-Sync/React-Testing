import Cookies from "js-cookie";

const setSecureCookie = (label: string, value: string, options?: object) => {
  Cookies.set(label, value, {
    secure: true,
    sameSite: "strict",
    ...options,
  });
};

export const setSessionToken = (data, callback) => {
  const { jwtToken, jwtIdToken, userType, exp } = data;
  const expires = new Date(exp * 1000);
  localStorage.clear();
  localStorage.setItem("myhelptokenid", jwtIdToken);
  setSecureCookie("myhelptoken", jwtToken, {
    expires,
  });
  setSecureCookie("user_type", userType, { expires });
  return callback(data);
};

export const getSessionToken = () => {
  const { myhelptoken: userToken, user_type: userType } = Cookies.get() || {};
  if (typeof window !== "undefined") {
    const userTokenId = localStorage.getItem("myhelptokenid");
    return { userToken, userType, userTokenId };
  } else return {};
};

export const clearSession = (proceedNextCallback) => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
  localStorage.clear();
  return proceedNextCallback();
};
