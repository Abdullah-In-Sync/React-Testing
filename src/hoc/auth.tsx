import { useEffect } from "react";
import { useAppContext } from "../contexts/AuthContext";
import { env } from "../lib/env";

export default function withAuthentication<T>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const { isAuthenticated } = useAppContext();
    useEffect(() => {
      if (!isAuthenticated) window.location.href = env.v1.rootUrl;
    });

    return <>{isAuthenticated ? <Component {...props} /> : null}</>;
  };
}
