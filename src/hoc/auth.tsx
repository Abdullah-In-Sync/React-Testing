import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppContext } from "../contexts/AuthContext";

export default function withAuthentication<T>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const { isAuthenticated } = useAppContext();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) router.push("/account");
    });

    return <>{isAuthenticated ? <Component {...props} /> : null}</>;
  };
}
