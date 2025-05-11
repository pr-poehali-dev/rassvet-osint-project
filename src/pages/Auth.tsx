
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Имитация процесса авторизации
    setTimeout(() => {
      // Простая проверка для демо (в реальном проекте используйте настоящую аутентификацию)
      if (email && password) {
        // Сохраняем состояние авторизации
        localStorage.setItem("rassvet-auth", "true");
        localStorage.setItem("rassvet-user", email);
        // Перенаправляем на главную страницу
        navigate("/");
      } else {
        setError("Неверный логин или пароль");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 bg-accent rounded-md flex items-center justify-center font-bold text-white text-xl">
              РС
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Rassvet</h1>
          <p className="text-sidebar-foreground/70 mt-2">Вход в приватную систему</p>
        </div>

        <Card className="border-sidebar-border bg-sidebar/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center text-sidebar-foreground">Авторизация</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sidebar-foreground">Логин</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="text"
                    placeholder="Введите логин"
                    className="bg-sidebar/20 border-sidebar-border text-sidebar-foreground"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Icon 
                    name="User" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/50" 
                    size={18} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sidebar-foreground">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    className="bg-sidebar/20 border-sidebar-border text-sidebar-foreground"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Icon 
                    name="Lock" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/50" 
                    size={18} 
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm p-2 bg-red-400/10 rounded-md">
                  <Icon name="AlertTriangle" className="inline-block mr-2" size={16} />
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icon name="Loader" className="mr-2 animate-spin" size={16} />
                ) : (
                  <Icon name="LogIn" className="mr-2" size={16} />
                )}
                {isLoading ? "Авторизация..." : "Войти в систему"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-sm text-sidebar-foreground/50">
            <div className="w-full text-center">
              Для демо доступа введите любой логин и пароль
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-sidebar-foreground/50">
          © 2025 Rassvet OSINT. Все права защищены.
        </div>
      </div>
    </div>
  );
};

export default Auth;
</current-code>

<pp-write filepath="src/components/AuthProvider.tsx">
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const authStatus = localStorage.getItem("rassvet-auth") === "true";
    const storedUsername = localStorage.getItem("rassvet-user");
    
    setIsAuthenticated(authStatus);
    setUsername(storedUsername);
    
    // Если пользователь не авторизован и не на странице авторизации, редиректим
    if (!authStatus && location.pathname !== "/auth") {
      navigate("/auth");
    }
  }, [navigate, location.pathname]);

  const logout = () => {
    localStorage.removeItem("rassvet-auth");
    localStorage.removeItem("rassvet-user");
    setIsAuthenticated(false);
    setUsername(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
</current-code>

<pp-write filepath="src/App.tsx" partial>
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Search from "./pages/Search";
import Logger from "./pages/Logger";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AuthProvider } from "./components/AuthProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Search />} />
              <Route path="logger" element={<Logger />} />
              <Route path="library" element={<Library />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<NotFound />} />
              <Route path="purchase" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
