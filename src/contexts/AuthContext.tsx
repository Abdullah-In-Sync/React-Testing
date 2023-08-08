/* istanbul ignore file */
import {
  useState,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  FC,
  useEffect,
  useContext,
} from "react";

import { localTokenValidation } from "../lib/helpers/auth";
import Cookies from "js-cookie";
import theme from "../styles/theme/theme";
import { ThemeProvider } from "@mui/material";
import router from "next/router";
import { getSessionToken } from "../utility/storage";

type AuthContext = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  isLoading: true,
} as AuthContext);

export interface AuthProviderProps {
  children: ReactNode;
}

export const useAppContext = () => useContext(AuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(undefined);

  const [getTokenData, tokenLoading, tokenData, tokenError] =
    localTokenValidation(Cookies.get("user_type"));

  useEffect(() => {
    handleGetToken();
    router.events.on("routeChangeComplete", handleGetToken);
    return () => {
      router.events.off("routeChangeComplete", handleGetToken);
    };
  }, [router.events]);

  const handleGetToken = () => {
    const { userToken, userType } = getSessionToken();
    if (userToken && userType) {
      getTokenData();
    } else {
      setUser(undefined);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const { userType } = getSessionToken();
    if (tokenData && tokenData?.getTokenData?.user_type == userType) {
      setUser({
        ...tokenData?.getTokenData,
      });
      setIsAuthenticated(true);
    } else if (tokenError) {
      setUser(undefined);
      setIsAuthenticated(false);
    }
  }, [tokenLoading]);

  return (
    <AuthContext.Provider
      data-testid="authContext"
      value={{
        user: tokenData?.getTokenData,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading: tokenLoading,
      }}
    >
      <ThemeProvider theme={theme(user?.organization_settings)}>
        {isAuthenticated != undefined && children}
      </ThemeProvider>
    </AuthContext.Provider>
  );
};
