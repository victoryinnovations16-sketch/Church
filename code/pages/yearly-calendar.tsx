import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UiCard";
import { Badge } from "../components/UiBadge";
import { Button } from "../components/UiButton";
import { Calendar, MapPin, Clock, Globe, Users, Building, ChevronLeft, ChevronRight, Image, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "../helpers/siteSchema";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

export default function YearlyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { data: allEvents = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedEvent(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedEvent(null);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getEventsForMonth = (year: number, month: number) => {
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return allEvents.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      const eventEndDate = event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : null;

      if (eventDate === dateStr) return true;

      if (eventEndDate) {
        const start = new Date(eventDate);
        const end = new Date(eventEndDate);
        const check = new Date(dateStr);
        return check >= start && check <= end;
      }

      return false;
    });
  };

  const monthEvents = getEventsForMonth(currentYear, currentMonth);

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
        return `${startDate.getDate()}\u2013${endDate.getDate()} ${startDate.toLocaleDateString('en-GB', { month: 'short' })}`;
      }
      return `${startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} \u2013 ${endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
    }
    return startDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 md:h-28 bg-slate-800/30 rounded-lg" />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayEvents = getEventsForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 md:h-28 bg-slate-800 rounded-lg p-2 border transition-colors cursor-pointer hover:border-blue-500/50 ${
            isToday ? 'border-blue-500 ring-1 ring-blue-500/30' : 'border-slate-700'
          } ${dayEvents.length > 0 ? 'bg-slate-800' : 'bg-slate-800/50'}`}
          onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents[0])}
          data-testid={`calendar-day-${day}`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-400' : 'text-slate-300'}`}>
            {day}
          </div>
          <div className="space-y-1 overflow-hidden">
            {dayEvents.slice(0, 2).map((event, idx) => (
              <div
                key={`${event.id}-${idx}`}
                className={`text-xs px-1.5 py-0.5 rounded truncate ${getEventTypeColor(event.type)}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-slate-400 pl-1">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-400" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-calendar-heading">
                {currentYear} Church Calendar
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-6">
                Deeper Life Bible Church - East Midlands Region, UK
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <MapPin className="h-3 w-3 mr-1" /> Regional
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Building className="h-3 w-3 mr-1" /> National
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Globe className="h-3 w-3 mr-1" /> Global
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <Users className="h-3 w-3 mr-1" /> YPF
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <div className="xl:col-span-2">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToPreviousMonth}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        data-testid="button-prev-month"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <CardTitle className="text-2xl text-white">
                        {months[currentMonth]} {currentYear}
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToNextMonth}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        data-testid="button-next-month"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {weekDays.map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-slate-400 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {renderCalendarDays()}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Image className="h-4 w-4 text-blue-400" />
                      Event Flyer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedEvent ? (
                      <div className="space-y-4">
                        {selectedEvent.imageUrl ? (
                          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-700">
                            <img
                              src={selectedEvent.imageUrl}
                              alt={selectedEvent.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-blue-900/50 to-slate-800 flex items-center justify-center border border-slate-600">
                            <div className="text-center p-4">
                              <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                              <p className="text-slate-400 text-sm">No flyer available</p>
                            </div>
                          </div>
                        )}
                        <div>
                          <Badge className={`mb-2 ${getEventTypeColor(selectedEvent.type)}`}>
                            {getEventTypeIcon(selectedEvent.type)}
                            <span className="ml-1">{getEventTypeLabel(selectedEvent.type)}</span>
                          </Badge>
                          <h3 className="text-lg font-semibold text-white mb-2">{selectedEvent.title}</h3>
                          <div className="flex items-center text-slate-400 text-sm mb-1">
                            <Clock className="h-3 w-3 mr-2" />
                            {formatDateRange(selectedEvent)}
                          </div>
                          {selectedEvent.location && (
                            <div className="flex items-center text-slate-400 text-sm mb-2">
                              <MapPin className="h-3 w-3 mr-2" />
                              {selectedEvent.location}
                            </div>
                          )}
                          {selectedEvent.description && (
                            <p className="text-slate-300 text-sm mt-3">
                              {selectedEvent.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800 flex items-center justify-center border border-dashed border-slate-600">
                        <div className="text-center p-4">
                          <Calendar className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                          <p className="text-slate-400 text-sm">Click on an event to see details</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      {months[currentMonth]} Events
                      {monthEvents.length > 0 && (
                        <span className="text-sm text-slate-400 font-normal">
                          ({monthEvents.length})
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {monthEvents.length > 0 ? (
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {monthEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedEvent?.id === event.id
                                ? 'bg-blue-900/30 border border-blue-500/50'
                                : 'bg-slate-700/50 hover:bg-slate-700'
                            }`}
                            onClick={() => setSelectedEvent(event)}
                            data-testid={`event-item-${event.id}`}
                          >
                            <Badge className={`text-xs mb-2 ${getEventTypeColor(event.type)}`}>
                              {getEventTypeIcon(event.type)}
                              <span className="ml-1">{getEventTypeLabel(event.type)}</span>
                            </Badge>
                            <h4 className="text-white text-sm font-medium mb-1">{event.title}</h4>
                            <div className="flex items-center text-slate-400 text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDateRange(event)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm text-center py-8">
                        No events scheduled for {months[currentMonth]}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8 space-y-6 max-w-4xl mx-auto">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Regular Weekly Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <p className="text-blue-400 font-medium mb-1">Sunday Worship</p>
                      <p className="text-slate-400">Various times at all locations</p>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <p className="text-green-400 font-medium mb-1">Tuesday Bible Study</p>
                      <p className="text-slate-400">6:00 PM - 8:00 PM (Zoom)</p>
                      <p className="text-slate-500 text-xs mt-1">ID: 83486339797 | Pass: EMR2025</p>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <p className="text-orange-400 font-medium mb-1">Friday Prayer & Revival</p>
                      <p className="text-slate-400">6:00 PM - 8:00 PM (Zoom)</p>
                      <p className="text-slate-500 text-xs mt-1">ID: 83486339797 | Pass: EMR2025</p>
                    </div>
                  </div>
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
