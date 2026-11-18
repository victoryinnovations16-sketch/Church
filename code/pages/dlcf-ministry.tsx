import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Badge } from "../components/UiBadge";
import { GraduationCap, Users, BookOpen, Globe, Target, Mail, Calendar, Clock, Video, ExternalLink, User } from "lucide-react";
const dlcfLogo = "/_cdn/static/WhatsApp_Image_2025-11-15_at_12.03.22_1768953509872.jpg";
const welcomeEvent = "/_cdn/static/WhatsApp_Image_2025-11-16_at_02.08.36_1768953520123.jpg";
const koinoniaEvent = "/_cdn/static/WhatsApp_Image_2026-01-20_at_22.33.49_1768953536001.jpg";
const dlcfBackground = "/_cdn/static/image_1768954461618.jpg";

interface DLCFEvent {
  id: number;
  title: string;
  theme: string;
  date: string;
  time: string;
  venue: string;
  zoomId?: string;
  passcode?: string;
  image: string;
  isPast: boolean;
  highlights?: string[];
}

const dlcfEvents: DLCFEvent[] = [
  {
    id: 1,
    title: "Regional Monthly Koinonia",
    theme: "10 Times Better",
    date: "25th January 2026",
    time: "6:30 PM",
    venue: "Zoom Meeting",
    zoomId: "83486339797",
    passcode: "EMR2025",
    image: koinoniaEvent,
    isPast: false,
  },
  {
    id: 2,
    title: "Welcome Programme - Campus Students",
    theme: "Thrive, Serve, Shine - Kingdom Students",
    date: "22nd November 2025",
    time: "6:00 PM",
    venue: "Zoom Meeting",
    zoomId: "83486339797",
    passcode: "EMR2025",
    image: welcomeEvent,
    isPast: true,
    highlights: [
      "Engaging panel sessions and interactive Q&A",
      "Prayer for academic success and professional breakthrough",
      "Inspiring academic and professional charge",
      "Academic charge and motivational insights",
      "Introduction and networking opportunities",
    ],
  },
];

export default function DLCFMinistry() {
  const upcomingEvents = dlcfEvents.filter(e => !e.isPast);
  const pastEvents = dlcfEvents.filter(e => e.isPast);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Logo */}
        <section 
          className="relative py-20"
          style={{
            backgroundImage: `url(${dlcfBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 from-slate-900/80 via-slate-900/70 to-slate-900 bg-[#0000008f]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-amber-500/30 flex-shrink-0">
                <img 
                  src={dlcfLogo} 
                  alt="DLCF Campus Fellowship Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-dlcf-heading">
                  DLCF Ministry
                </h1>
                <p className="text-xl text-amber-400 font-semibold mb-2">
                  Deeper Life Campus Fellowship
                </p>
                <p className="text-lg text-slate-400">
                  East Midlands Region
                </p>
                <p className="text-slate-500 italic mt-2">
                  "Achieving Excellence"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-amber-500/50 text-amber-400 mb-4">
                  <Target className="h-3 w-3 mr-1" />
                  Our Mission
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-6">Winning Students for Christ</h2>
              </div>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    The DLCF has a divine mandate and mission to <strong className="text-amber-400">win, build and commission</strong> students 
                    and staff of institutions of higher learning and fresh graduate volunteers (corps members) schemes to be their best for the Master.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    It is an inter-denominational fellowship, embracing campus Christians who share the same doctrinal belief 
                    irrespective of their denominations and affiliations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What We Do</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Supporting students in their spiritual journey through various programs and activities.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card className="bg-slate-800 border-slate-700 text-center" data-testid="card-bible-study">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bible Study</h3>
                  <p className="text-slate-400 text-sm">
                    In-depth study of Scripture for spiritual growth and biblical understanding.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center" data-testid="card-fellowship">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Fellowship</h3>
                  <p className="text-slate-400 text-sm">
                    Building community among students through regular meetings and Koinonia.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center" data-testid="card-evangelism">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Evangelism</h3>
                  <p className="text-slate-400 text-sm">
                    Sharing the gospel on campuses and winning souls for Christ.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center" data-testid="card-mentorship">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mentorship</h3>
                  <p className="text-slate-400 text-sm">
                    Academic and spiritual mentorship for students to excel in all areas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Mentor */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-blue-500/50 text-blue-400 mb-4">
                  <User className="h-3 w-3 mr-1" />
                  Our Mentor
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-6">Pastor W.F. Kumuyi</h2>
              </div>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <p className="text-slate-300 leading-relaxed mb-6">
                    The history of Deeper Life Campus Fellowship cannot be written without mentioning first and foremost the human agent 
                    that God used to start Deeper Christian Life Ministry of which Deeper Life Campus Fellowship is just an arm.
                  </p>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    <strong className="text-white">Pastor Williams Folorunsho Kumuyi</strong> was born in 1941. He graduated from the Nigerian Premier University, 
                    University of Ibadan, with a <strong className="text-amber-400">first class honours in Mathematics</strong>. That same year of his graduation, 
                    he was offered the University Scholarship for Doctorate Degree, which he turned down because he had a greater calling.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    All of us can bear witness to that fact now that he truly had a greater calling - to lead Deeper Christian Life Ministry 
                    in discipling millions of believers across the world.
                  </p>
                  <div className="mt-6">
                    <a 
                      href="https://williamkumuyi.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                    >
                      Learn more about Pastor Kumuyi
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Message */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Our Message</h2>
              </div>
              <div className="bg-gradient-to-br from-amber-900/20 to-slate-800 rounded-xl p-8 border border-amber-500/20">
                <p className="text-slate-300 leading-relaxed mb-6">
                  Every builder knows that a house is only as strong as its foundations and the strength of the materials it is built with. 
                  Bible Doctrines or Teachings are the foundation and pillars that have enabled the DLCF stand amidst the changing seasons of life.
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  The DLCF stands against bigotry on the one hand and latitudinarianism on the other. It believes that 
                  <em className="text-amber-400"> "all scripture is given by the inspiration of God and is profitable for doctrine, for reproof, 
                  for correction, for instruction in righteousness."</em>
                </p>
                <p className="text-slate-400 leading-relaxed">
                  The DLCF teaches all the Word of God from the beginning of Genesis to the end of Revelation adding nothing to the word 
                  and taking nothing from it. The DLCF draws a clear distinction between nominal and genuine Christianity and between 
                  fanaticism and true worship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="py-16 bg-slate-800/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 mb-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  Upcoming
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-4">Upcoming Events</h2>
              </div>
              <div className="max-w-4xl mx-auto">
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
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 mb-3">
                          Upcoming Event
                        </Badge>
                        <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-amber-400 font-semibold mb-4">Theme: {event.theme}</p>
                        
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
                            <Video className="h-4 w-4 text-slate-500" />
                            <span>{event.venue}</span>
                          </div>
                        </div>

                        {event.zoomId && (
                          <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-slate-400 mb-1">Zoom ID: <span className="text-white font-mono">{event.zoomId}</span></p>
                            <p className="text-sm text-slate-400">Passcode: <span className="text-white font-mono">{event.passcode}</span></p>
                          </div>
                        )}

                        <a 
                          href={`https://zoom.us/j/${event.zoomId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="bg-amber-600 hover:bg-amber-700 text-white" data-testid="button-join-meeting">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Join Meeting
                          </Button>
                        </a>
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
          <section className="py-16 bg-slate-900">
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
                        <Badge variant="outline" className="border-slate-500/50 text-slate-400 mb-3">
                          Completed
                        </Badge>
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-amber-400/80 font-semibold mb-4">Theme: {event.theme}</p>
                        
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

                        {event.highlights && (
                          <div className="mt-4">
                            <p className="text-slate-500 text-sm mb-2">Event Highlights:</p>
                            <ul className="text-slate-400 text-sm space-y-1">
                              {event.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-amber-500">•</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-amber-700 to-amber-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join the Fellowship</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Are you a student in the East Midlands? Connect with DLCF and grow in your faith while excelling academically.
            </p>
            <div className="flex items-center justify-center gap-2 text-white mb-6">
              <Mail className="h-5 w-5" />
              <a href="mailto:dlcfeastmidlands@gmail.com" className="hover:underline" data-testid="link-dlcf-email">
                dlcfeastmidlands@gmail.com
              </a>
            </div>
            <p className="text-amber-200 text-sm">
              Everyone Welcome - Please Invite Your Friends and Family
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
