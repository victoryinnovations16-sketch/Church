import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UiCard";
import { Badge } from "../components/UiBadge";
import { Button } from "../components/UiButton";
import { Calendar, Clock, MapPin, Globe, Building, Users, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "../helpers/siteSchema";

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'regional': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'national': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'global': return 'bg-green-500/20 text-green-300 border-green-500/30';
    case 'ypf': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

const getEventTypeLabel = (type: string) => {
  switch (type) {
    case 'regional': return 'Regional';
    case 'national': return 'National';
    case 'global': return 'Global';
    case 'ypf': return 'YPF';
    default: return type;
  }
};

export default function Events() {
  const { data: allEvents = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonth = today.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const upcomingEvents = allEvents
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === today.getFullYear() &&
             eventDate.getMonth() === today.getMonth() &&
             eventDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'global': return <Globe className="h-3 w-3" />;
      case 'national': return <Building className="h-3 w-3" />;
      case 'ypf': return <Users className="h-3 w-3" />;
      default: return <MapPin className="h-3 w-3" />;
    }
  };

  const formatDateRange = (event: Event) => {
    const startDate = new Date(event.date);
    if (event.endDate) {
      const endDate = new Date(event.endDate);
      if (startDate.getMonth() === endDate.getMonth()) {
        return `${startDate.getDate()}\u2013${endDate.getDate()} ${startDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
      }
      return `${startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} \u2013 ${endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
    return startDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getDaysUntil = (dateStr: string | Date) => {
    const eventDate = new Date(dateStr);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `In ${diffDays} days`;
    if (diffDays < 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
    return `In ${Math.ceil(diffDays / 30)} months`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-1">
        <section className="bg-slate-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-events-page-heading">
              Events This Month
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              {currentMonth} - Join us as we gather in His Presence for worship, fellowship, and growth
            </p>
            <Link to="/yearly-calendar">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-view-full-calendar">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Calendar
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-blue-400" />
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="bg-slate-800 border-slate-700 overflow-hidden hover:border-blue-500/50 transition-colors"
                    data-testid={`card-event-${event.id}`}
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-slate-800 relative">
                      {event.imageUrl ? (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-2 ${
                              event.type === 'regional' ? 'bg-blue-500/20' :
                              event.type === 'national' ? 'bg-purple-500/20' :
                              event.type === 'global' ? 'bg-green-500/20' :
                              'bg-orange-500/20'
                            }`}>
                              {event.type === 'global' ? <Globe className="h-8 w-8 text-green-400" /> :
                               event.type === 'national' ? <Building className="h-8 w-8 text-purple-400" /> :
                               event.type === 'ypf' ? <Users className="h-8 w-8 text-orange-400" /> :
                               <Calendar className="h-8 w-8 text-blue-400" />}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-black/60 text-white border-0">
                          {getDaysUntil(event.date)}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <Badge className={`w-fit mb-2 ${getEventTypeColor(event.type)}`} data-testid={`badge-event-type-${event.id}`}>
                        {getEventTypeIcon(event.type)}
                        <span className="ml-1">{getEventTypeLabel(event.type)}</span>
                      </Badge>
                      <CardTitle className="text-xl text-white" data-testid={`text-event-title-${event.id}`}>
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-slate-400">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm" data-testid={`text-event-date-${event.id}`}>
                          {formatDateRange(event)}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-slate-400">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="text-sm" data-testid={`text-event-location-${event.id}`}>
                            {event.location}
                          </span>
                        </div>
                      )}
                      {event.description && (
                        <p className="text-sm text-slate-300 pt-2 leading-relaxed line-clamp-3" data-testid={`text-event-description-${event.id}`}>
                          {event.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <Calendar className="h-16 w-16 mx-auto text-slate-500 mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2" data-testid="text-no-events-heading">
                    No Upcoming Events
                  </h3>
                  <p className="text-slate-400 mb-6" data-testid="text-no-events-message">
                    No upcoming events at this time. Check back soon for new events and gatherings!
                  </p>
                  <Link to="/yearly-calendar">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      View Full Calendar
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Regular Weekly Services</h2>
              <p className="text-slate-400">Join us every week for worship and fellowship</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Sunday Worship</h3>
                  <p className="text-slate-400 text-sm">Various times at all church locations</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Tuesday Bible Study</h3>
                  <p className="text-slate-400 text-sm">6:00 PM - 8:00 PM on Zoom</p>
                  <p className="text-slate-500 text-xs mt-2">ID: 83486339797 | Pass: EMR2025</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Friday Prayer & Revival</h3>
                  <p className="text-slate-400 text-sm">6:00 PM - 8:00 PM on Zoom</p>
                  <p className="text-slate-500 text-xs mt-2">ID: 83486339797 | Pass: EMR2025</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
