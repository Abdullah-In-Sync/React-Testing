import Cookies from "js-cookie";
import { COOKIES_POLICY, ID_TOKEN_LABEL } from "../lib/constants";

const setSecureCookie = (label: string, value: string, options?: object) => {
  Cookies.set(label, value, {
    secure: true,
    sameSite: "strict",
    ...options,
  });
};

export const setSessionToken = async (data, callback) => {
  const { jwtToken, jwtIdToken, userType, exp } = data;
  const expires = new Date(exp * 1000);
  const cookiesPolicy = localStorage.getItem(COOKIES_POLICY);
  localStorage.clear();
  localStorage.setItem(COOKIES_POLICY, cookiesPolicy);
  localStorage.setItem(ID_TOKEN_LABEL, jwtIdToken);
  await setSecureCookie("myhelptoken", await jwtToken, {
    expires,
  });
  await setSecureCookie("user_type", await userType, { expires });
  return callback(data);
};

export const getSessionToken = () => {
  const { myhelptoken: userToken, user_type: userType } = Cookies.get() || {};
  if (typeof window !== "undefined") {
    const userTokenId = localStorage.getItem(ID_TOKEN_LABEL);
    return { userToken, userType, userTokenId };
  } else return {};
};

export const clearSession = (proceedNextCallback) => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
  const cookiesPolicy = localStorage.getItem(COOKIES_POLICY);
  localStorage.clear();
  localStorage.setItem(COOKIES_POLICY, cookiesPolicy);
  return proceedNextCallback();
};
