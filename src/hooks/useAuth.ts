import { useRouter } from "next/router";

import { homeRoute } from "../lib/constants";
import { setSessionToken } from "../utility/storage";

export const useAuth = () => {
  const router = useRouter();
  const login = async (values, { setSubmitting, callback }) => {
    fetch("/v2/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((data) =>
        setSessionToken(data, ({ userType }) => {
          callback({
            status: "success",
            data: { data, message: "Login successful!" },
          });
          return router.replace(homeRoute[userType]);
        })
      )
      .catch(async (err) => {
        const responseData = await err.json();
        callback({ status: "error", data: responseData });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return {
    login,
  };
};

export default useAuth;
