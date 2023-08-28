/* istanbul ignore file */
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { ThemeProvider } from "@mui/material";
import router from "next/router";
import { queryOrgTokenData } from "../hooks/fetchOrgTokenData";
import theme from "../styles/theme/theme";
import { clearSession, getSessionToken } from "../utility/storage";

type AuthContext = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  orgData: any;
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
  const { userToken, userType } = getSessionToken();

  const { orgQuery, getOrgDomainLoading, getTokenQuery } = queryOrgTokenData();
  const { _id: orgId } = orgQuery || {};

  useEffect(() => {
    if (userToken && userType && orgId) handleGetToken();
  }, [orgId]);

  const handleGetToken = () => {
    getTokenQuery[userType]({
      onCompleted: (orgTokenData) => {
        const { getTokenData: tData = {} } = orgTokenData;
        const { organization_settings: { _id: tokenOrgId = undefined } = {} } =
          tData;
        if (orgId === tokenOrgId) {
          setUser({
            ...tData,
          });
        } else {
          setUser(undefined);
          setIsAuthenticated(false);
          clearSession(() => {
            router.replace("/account");
          });
        }
      },
    });
  };

  return (
    <AuthContext.Provider
      data-testid="authContext"
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading: getOrgDomainLoading,
        orgData: orgQuery,
      }}
    >
      <ThemeProvider theme={theme(orgQuery)}>
        {!getOrgDomainLoading && children}
      </ThemeProvider>
    </AuthContext.Provider>
  );
};
