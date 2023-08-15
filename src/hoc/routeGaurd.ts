import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { getSessionToken } from "../utility/storage";
import { homeRoute } from "../lib/constants";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    const { userToken, userType } = getSessionToken();
    const publicPaths = ["/login", "/login/"];
    const path = url.split("?")[0];
    if (!userToken && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else if (userToken && userType && path.split("/")[1] !== userType) {
      router.push(homeRoute[userType]);
    } else {
      setAuthorized(true);
    }
  }
  return authorized && children;
}
