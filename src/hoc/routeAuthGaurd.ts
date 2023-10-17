import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { allowedPaths, homeRoute, publicPaths } from "../lib/constants";
import { getSessionToken } from "../utility/storage";
import { isAuth } from "../utility/helper";
import { useSnackbar } from "notistack";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(isAuth(router));
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    (document as any).enqueueSnackbar = enqueueSnackbar;

    return () => {
      (document as any).enqueueSnackbar = null;
    };
  }, []);

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(isAuth(router));

    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router.asPath.split("?")[0].split("/")[1]]);

  function authCheck(url) {
    const { userToken, userType } = getSessionToken();
    const allowed = [userType, ...allowedPaths];
    const path = url.split("?")[0];
    const initialPath = path.split("/")[1];
    if (!userToken && !publicPaths.includes(initialPath)) {
      setAuthorized(false);
      router.push({
        pathname: "/account",
        query: { returnUrl: router.asPath },
      });
    } else if (userToken && userType && !allowed.includes(initialPath)) {
      router.push(homeRoute[userType]);
    } else {
      setAuthorized(true);
    }
  }
  return authorized && children;
}
