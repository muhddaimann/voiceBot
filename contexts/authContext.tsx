import {
  deleteToken,
  deleteUser,
  getToken,
  getUser,
  saveToken,
  saveUser,
} from "@/contexts/tokenContext";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

type AuthContextType = {
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  token: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  token: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const VALID_USERNAME = "011007100447";
  const VALID_PASSWORD = "LUpa@_01";
  const router = useRouter();
  const { showToast } = useToast();

  const login = async (username: string, password: string) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
      const tokenValue = JSON.stringify({
        token: "dummy_token_value",
        expiresAt,
      });

      const userData = { username };

      try {
        await saveToken(tokenValue);
        await saveUser(userData);
        setUser(userData);
        setToken(tokenValue);
        router.replace("/welcome");
        showToast({ message: "Login successful", type: "success" });
      } catch {}
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteToken();
              await deleteUser();
              setUser(null);
              setToken(null);
              setHasCheckedAuth(false);
              router.replace("/goodbye");
              showToast({ message: "Logout successful", type: "success" });
            } catch {}
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (hasCheckedAuth) return;

    (async () => {
      try {
        const storedToken = await getToken();
        const storedUser = await getUser();

        if (storedToken && storedUser) {
          const parsedToken = JSON.parse(storedToken);
          const now = Date.now();

          if (parsedToken.expiresAt && parsedToken.expiresAt > now) {
            setToken(storedToken);
            setUser(storedUser);
            if (!hasCheckedAuth) {
              router.replace("/welcome");
              setHasCheckedAuth(true);
            }
          } else {
            await deleteToken();
            await deleteUser();
            setUser(null);
            setToken(null);
            showToast({
              message: "Your session has expired. Please log in again.",
              type: "error",
            });
            router.replace("/");
            setHasCheckedAuth(true);
          }
        } else {
          router.replace("/");
          setHasCheckedAuth(true);
        }
      } catch {
        router.replace("/");
        setHasCheckedAuth(true);
      }
    })();
  }, [router, showToast, hasCheckedAuth]);

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
