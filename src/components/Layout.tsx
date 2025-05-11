
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background dark text-foreground flex">
      <AppSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
