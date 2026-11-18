import { useEffect, type CSSProperties, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./UiSidebar";
import { AppSidebar } from "./AdminSidebar";
import { useAuth } from "../helpers/useAuth";
import { useToast } from "../helpers/useToast";

const editorAllowedPaths = ["/admin/hero-slides", "/admin/gallery", "/admin/events"];

function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4">
      <h2 className="text-2xl font-bold" data-testid="text-access-denied">Access Denied</h2>
      <p className="text-muted-foreground">You don't have permission to view this page.</p>
    </div>
  );
}

// Wraps every /admin page: checks the sign-in, applies the editor restrictions
// and renders the sidebar shell (ported from the original AdminRouter).
export function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const userRole = user?.role || "viewer";

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({ title: "Unauthorized", description: "Please log in to continue.", variant: "destructive" });
      const t = setTimeout(() => navigate("/admin/login"), 500);
      return () => clearTimeout(t);
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && userRole === "editor" && (location === "/admin" || location === "/admin/")) {
      navigate("/admin/gallery");
    }
  }, [isLoading, isAuthenticated, userRole, location, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (userRole === "viewer") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">Your account does not have admin panel access.</p>
          <a href="/" className="text-primary underline">Return to website</a>
        </div>
      </div>
    );
  }

  const isEditorOnRestrictedPage = userRole === "editor" && !editorAllowedPaths.some((p) => location.startsWith(p));
  const style = { "--sidebar-width": "16rem", "--sidebar-width-icon": "3rem" } as CSSProperties;

  return (
    <SidebarProvider style={style}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-view-site">
              View Site
            </a>
          </header>
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-screen-2xl mx-auto">
              {isEditorOnRestrictedPage ? <AccessDenied /> : children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
