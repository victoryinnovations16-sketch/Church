import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UiCard";
import { useQuery } from "@tanstack/react-query";
import type { Event, Location, Devotional } from "../helpers/siteSchema";
import { Calendar, MapPin, BookOpen, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: locations = [] } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  const { data: devotionals = [] } = useQuery<Devotional[]>({
    queryKey: ["/api/devotionals"],
  });

  const stats = [
    {
      title: "Calendar Events",
      value: events.length,
      icon: Calendar,
      description: "Scheduled events",
    },
    {
      title: "Church Locations",
      value: locations.length,
      icon: MapPin,
      description: "Active locations",
    },
    {
      title: "Devotionals",
      value: devotionals.length,
      icon: BookOpen,
      description: "Published devotionals",
    },
    {
      title: "Page Views",
      value: "N/A",
      icon: TrendingUp,
      description: "Coming soon",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-admin-heading">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your church website admin panel. Manage all content from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} data-testid={`card-stat-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`text-stat-value-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your church website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/admin/events" 
              className="p-4 border rounded-lg hover-elevate transition-colors"
              data-testid="link-quick-events"
            >
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Calendar Events</h3>
              <p className="text-sm text-muted-foreground">Manage the church event calendar</p>
            </a>
            <a 
              href="/admin/devotionals" 
              className="p-4 border rounded-lg hover-elevate transition-colors"
              data-testid="link-quick-devotionals"
            >
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Post Devotional</h3>
              <p className="text-sm text-muted-foreground">Add today's daily devotional</p>
            </a>
            <a 
              href="/admin/locations" 
              className="p-4 border rounded-lg hover-elevate transition-colors"
              data-testid="link-quick-locations"
            >
              <MapPin className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Update Locations</h3>
              <p className="text-sm text-muted-foreground">Manage church locations</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
