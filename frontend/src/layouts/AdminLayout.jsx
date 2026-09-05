
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/common/AdminHeader";
import BottomNav from "../components/common/BottomNav";

export default function AdminLayout() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--color-bg)",
      display: "flex",
      flexDirection: "column"
    }}>
      
      <div style={{
        width: "100%",
        maxWidth: "480px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--color-surface)",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.04)",
        position: "relative"
      }}>
        
        <AdminHeader />

        
        <main style={{
          flex: 1,
          padding: "16px 16px 90px 16px", 
          overflowY: "auto"
        }}>
          <Outlet />
        </main>

        
        <BottomNav />
      </div>
    </div>
  );
}
