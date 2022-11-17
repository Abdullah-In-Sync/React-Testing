import { useEffect, useMemo } from "react";
import { useAppContext } from "../contexts/AuthContext";
import { env } from "../lib/env";

type UserRole = "admin" | "therapist" | "patient";

export default function withAuthentication<T>(
  Component: React.ComponentType<T>,
  allowOnly?: UserRole[]
) {
  return (props: T) => {
    const { isAuthenticated, user } = useAppContext();

    useEffect(() => {
      if (!isAuthenticated) {
        window.location.href = env.v1.rootUrl;
      } else if (
        user?.user_type != "admin" &&
        allowOnly &&
        !allowOnly.includes(user?.user_type)
      ) {
        window.location.href = `${env.v1.rootUrl}/${user?.user_type}/dashboard`;
      }
    }, []);

    const checkUserAuthorized = useMemo(() => {
      return !(allowOnly && !allowOnly.includes(user?.user_type));
    }, [user, allowOnly]);

    return (
      <>
        {isAuthenticated && checkUserAuthorized === true ? (
          <Component {...props} />
        ) : null}
      </>
    );
  };
}
