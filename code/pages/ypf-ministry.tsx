import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Badge } from "../components/UiBadge";
import { Briefcase, Users, BookOpen, Target, Calendar, Clock, MapPin, Video, ExternalLink, Heart, Lightbulb, Trophy } from "lucide-react";
const jabbokEvent = "/_cdn/static/WhatsApp_Image_2026-01-20_at_22.58.27_1768955550318.jpg";
const summitEvent = "/_cdn/static/WhatsApp_Image_2025-12-07_at_11.47.36_1768955553141.jpg";
const ypfBackground = "/_cdn/static/YPF_1768955844784.jpg";

interface YPFEvent {
  id: number;
  title: string;
  theme: string;
  subtitle?: string;
  date: string;
  time: string;
  venue: string;
  venueType: 'physical' | 'zoom' | 'hybrid';
  zoomId?: string;
  passcode?: string;
  rsvpLink?: string;
  image: string;
  isPast: boolean;
  description?: string;
}

const ypfEvents: YPFEvent[] = [
  {
    id: 1,
    title: "JABBOK",
    theme: "From Encounter to Territorial Takeover",
    subtitle: "A Day of Dynamic Transformation",
    date: "Saturday, 24th January 2026",
    time: "12:00 PM (Noon)",
    venue: "2-3 St Peter's Churchyard, Derby DE1 1NN",
    venueType: 'physical',
    rsvpLink: "https://forms.gle/RgmfTJbwSeS11x2h6",
    image: jabbokEvent,
    isPast: false,
    description: "Come and be empowered to take over territories for Christ.",
  },
  {
    id: 2,
    title: "YPF Summit",
    theme: "ÈGERSI (Awakening the Giants)",
    subtitle: "Inaugural East Midlands Regional",
    date: "Sunday, 14th December 2025",
    time: "6:00 PM",
    venue: "Zoom Meeting",
    venueType: 'zoom',
    zoomId: "83486339797",
    passcode: "EMR2025",
    image: summitEvent,
    isPast: true,
    description: "Come and rediscover your God-given purpose, passion and pursuit in life.",
  },
];

export default function YPFMinistry() {
  const upcomingEvents = ypfEvents.filter(e => !e.isPast);
  const pastEvents = ypfEvents.filter(e => e.isPast);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-green-950/30 to-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative py-20"
          style={{
            backgroundImage: `url(${ypfBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-900/50 to-slate-900"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block mb-6">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/50">
                  <Briefcase className="h-12 w-12 text-green-400" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-ypf-heading">
                Young Professionals Forum
              </h1>
              <p className="text-xl text-green-400 font-semibold mb-2">
                YPF East Midlands, UK
              </p>
              <p className="text-slate-400 italic">
                "Achieving Heaven's Goal"
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-green-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-green-500/50 text-green-400 mb-4">
                  <Target className="h-3 w-3 mr-1" />
                  Our Vision
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-6">Empowering Young Professionals</h2>
              </div>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    The Young Professionals Forum (YPF) is a vibrant arm of Deeper Christian Life Ministry dedicated to 
                    <strong className="text-green-400"> nurturing, equipping, and empowering</strong> young professionals 
                    to excel in their careers while maintaining a strong relationship with God.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    We believe that young professionals can be world-changers, influencing their workplaces, communities, 
                    and nations for Christ. Through fellowship, mentorship, and spiritual development, we help members 
                    discover their God-given purpose, passion, and pursuit in life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 bg-green-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What We Offer</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Programs and resources designed to help young professionals thrive spiritually and professionally.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card className="bg-slate-800 border-slate-700 text-center" data-testid="card-fellowship">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Fellowship</h3>
                  <p className="text-slate-400 text-sm">
                    Building meaningful connections with like-minded young professionals in faith.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center" data-testid="card-mentorship">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mentorship</h3>
                  <p className="text-slate-400 text-sm">
                    Guidance from experienced professionals to help you navigate your career journey.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center" data-testid="card-spiritual-growth">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Spiritual Growth</h3>
                  <p className="text-slate-400 text-sm">
                    Bible studies, prayer meetings, and spiritual development programs.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center" data-testid="card-career">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Career Excellence</h3>
                  <p className="text-slate-400 text-sm">
                    Workshops and sessions on excelling in your profession with Christian values.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-green-950/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-900/30 to-slate-800 rounded-xl p-6 border border-green-500/20 text-center">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Purpose</h3>
                  <p className="text-slate-400 text-sm">
                    Discovering and fulfilling your God-given calling in your profession and life.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-900/30 to-slate-800 rounded-xl p-6 border border-green-500/20 text-center">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Passion</h3>
                  <p className="text-slate-400 text-sm">
                    Pursuing excellence with zeal and dedication in everything you do.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-900/30 to-slate-800 rounded-xl p-6 border border-green-500/20 text-center">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Pursuit</h3>
                  <p className="text-slate-400 text-sm">
                    Actively chasing after God's best for your career and spiritual life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="py-16 bg-green-900/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 mb-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  Upcoming
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-4">Upcoming Events</h2>
              </div>
              <div className="max-w-4xl mx-auto space-y-6">
                {upcomingEvents.map(event => (
                  <Card key={event.id} className="bg-slate-800 border-slate-700 overflow-hidden" data-testid={`card-event-${event.id}`}>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex-1 pt-6">
                        {event.subtitle && (
                          <p className="text-green-400 text-sm font-medium mb-2">{event.subtitle}</p>
                        )}
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50 mb-3">
                          Upcoming Event
                        </Badge>
                        <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-green-400 font-semibold mb-4">Theme: {event.theme}</p>
                        
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            {event.venueType === 'zoom' ? (
                              <Video className="h-4 w-4 text-slate-500" />
                            ) : (
                              <MapPin className="h-4 w-4 text-slate-500" />
                            )}
                            <span>{event.venue}</span>
                          </div>
                        </div>

                        {event.description && (
                          <p className="text-slate-400 italic mb-4">{event.description}</p>
                        )}

                        {event.rsvpLink && (
                          <a 
                            href={event.rsvpLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-green-600 hover:bg-green-700 text-white" data-testid="button-rsvp">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              RSVP Now
                            </Button>
                          </a>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="py-16 bg-green-950/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-slate-500/50 text-slate-400 mb-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  Past Events
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-4">Previous Events</h2>
              </div>
              <div className="max-w-4xl mx-auto grid gap-6">
                {pastEvents.map(event => (
                  <Card key={event.id} className="bg-slate-800 border-slate-700 overflow-hidden opacity-90" data-testid={`card-past-event-${event.id}`}>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-64 md:h-full object-cover grayscale-[30%]"
                        />
                      </div>
                      <CardContent className="flex-1 pt-6">
                        {event.subtitle && (
                          <p className="text-green-400/70 text-sm font-medium mb-2">{event.subtitle}</p>
                        )}
                        <Badge variant="outline" className="border-slate-500/50 text-slate-400 mb-3">
                          Completed
                        </Badge>
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-green-400/80 font-semibold mb-4">Theme: {event.theme}</p>
                        
                        <div className="flex flex-wrap gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-1 text-slate-400">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>

                        {event.description && (
                          <p className="text-slate-500 italic text-sm">{event.description}</p>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Join Section */}
        <section className="py-16 bg-gradient-to-r from-green-700 to-green-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join the Movement</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Are you a young professional in the East Midlands? Connect with YPF and grow in your faith while excelling in your career.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white mb-6">
              <Heart className="h-5 w-5 text-green-300" />
              <span className="text-green-200">Everyone Welcome</span>
            </div>
            <p className="text-green-200 text-sm">
              Come and rediscover your God-given purpose, passion and pursuit in life.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
