import { useEffect } from "react";
import { useAppContext } from "../contexts/AuthContext";
import { env } from "../lib/env";

type UserRole = "admin" | "therapist" | "patient";

export default function withAuthentication<T>(
  Component: React.ComponentType<T>,
  allowOnly?: UserRole[]
) {
  return (props: T) => {
    const {
      isAuthenticated,
      user: { user_type },
    } = useAppContext();
    useEffect(() => {
      if (!isAuthenticated && (!allowOnly || allowOnly.includes(user_type)))
        window.location.href = env.v1.rootUrl;
    });

    return <>{isAuthenticated ? <Component {...props} /> : null}</>;
  };
}
