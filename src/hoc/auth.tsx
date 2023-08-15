import { useMemo } from "react";
import { useAppContext } from "../contexts/AuthContext";
type UserRole = "admin" | "therapist" | "patient";

export default function withAuthentication<T>(
  Component: React.ComponentType<T>,
  allowOnly?: UserRole[]
) {
  return (props: T) => {
    const { isAuthenticated, user } = useAppContext();

    // useEffect(() => {
    //   if (!isAuthenticated) {
    //     window.location.href = Link;
    //   } else if (allowOnly && !allowOnly.includes(user?.user_type)) {
    //     window.location.href = `${Link}/${
    //       user?.user_type == "admin" ? "superadmin" : user?.user_type
    //     }/dashboard`;
    //   }
    // }, []);

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
