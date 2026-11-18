import { Home, Calendar, MapPin, BookOpen, FileText, Settings, LogOut, Mail, Camera, Users, ImageIcon, HeartHandshake } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./UiSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "../helpers/queryClient";
import { useToast } from "../helpers/useToast";
import { useAuth } from "../helpers/useAuth";

const allAdminItems = [
  {
    title: "Overview",
    url: "/admin",
    icon: Home,
    roles: ["admin"],
  },
  {
    title: "Hero Slides",
    url: "/admin/hero-slides",
    icon: ImageIcon,
    roles: ["admin", "editor"],
  },
  {
    title: "Calendar Events",
    url: "/admin/events",
    icon: Calendar,
    roles: ["admin", "editor"],
  },
  {
    title: "Locations",
    url: "/admin/locations",
    icon: MapPin,
    roles: ["admin"],
  },
  {
    title: "Devotionals",
    url: "/admin/devotionals",
    icon: BookOpen,
    roles: ["admin"],
  },
  {
    title: "Pages",
    url: "/admin/pages",
    icon: FileText,
    roles: ["admin"],
  },
  {
    title: "Contact",
    url: "/admin/contact",
    icon: Mail,
    roles: ["admin"],
  },
  {
    title: "Prayer Requests",
    url: "/admin/prayer",
    icon: HeartHandshake,
    roles: ["admin"],
  },
  {
    title: "Gallery",
    url: "/admin/gallery",
    icon: Camera,
    roles: ["admin", "editor"],
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
    roles: ["admin"],
  },
];

export function AppSidebar() {
  const location = useLocation().pathname;
  const setLocation = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const userRole = user?.role || "viewer";
  const visibleItems = allAdminItems.filter((item) => item.roles.includes(userRole));

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/auth/logout', {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/session'] });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      setLocation("/admin/login");
    },
    onError: (error: any) => {
      toast({
        title: "Logout failed",
        description: error.message || "Could not log out",
        variant: "destructive",
      });
    },
  });

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-serif font-bold">Church Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <a href={item.url} data-testid={`link-admin-${item.title.toLowerCase()}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} data-testid="button-logout">
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
