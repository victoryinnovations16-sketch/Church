import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Badge } from "../components/UiBadge";
import { Clock, MapPin, Mail, ArrowLeft, Users, Phone, Calendar, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Location as ChurchLocation } from "../helpers/siteSchema";
import { Skeleton } from "../components/UiSkeleton";
import { Link, useParams } from "react-router-dom";
const fridayPrayerImage = "/_cdn/static/Friday_Prayer_1767660261541.jpg";
const bibleStudyImage = "/_cdn/static/Bible_Study_2026_1767660337989.jpg";

const churchDetails: Record<string, { pastor?: string; about: string; services: { name: string; time: string }[] }> = {
  'coventry-church': {
    pastor: 'Ndubuisi Njoku',
    about: 'DCLM Coventry is a vibrant and welcoming church community dedicated to spreading the Gospel and nurturing spiritual growth. We believe in the transformative power of God\'s Word and are committed to helping every member grow in their faith journey. Our services feature powerful worship, biblical teaching, and warm fellowship.',
    services: [
      { name: 'Sunday Worship Service', time: 'Sunday at 11:00 AM' },
      { name: 'Tuesday Bible Study', time: 'Tuesday 6:00 PM - 8:00 PM (Zoom)' },
      { name: 'Friday Revival Hour', time: 'Friday 6:00 PM - 8:00 PM (Zoom)' }
    ]
  },
  'leicester-church': {
    pastor: 'Peter',
    about: 'DCLM Leicester welcomes you to experience God\'s presence in a loving and caring community. We are passionate about sharing the love of Christ and helping individuals discover their purpose in God. Join us for uplifting worship services and in-depth Bible teaching that will strengthen your faith.',
    services: [
      { name: 'Sunday Worship Service', time: 'Sunday at 10:00 AM' },
      { name: 'Tuesday Bible Study', time: 'Tuesday 6:00 PM - 8:00 PM (Zoom)' },
      { name: 'Friday Revival Hour', time: 'Friday 6:00 PM - 8:00 PM (Zoom)' }
    ]
  },
  'loughborough-church': {
    pastor: 'Samuel Olutuase',
    about: 'DCLM Loughborough is a growing church family committed to reaching our community with the Gospel. Located at Glenmore Community Centre in Shepshed, we provide a welcoming environment for worship, fellowship, and spiritual development. Experience God\'s love and power in our midst.',
    services: [
      { name: 'Sunday Worship Service', time: 'Sunday at 9:30 AM' },
      { name: 'Tuesday Bible Study', time: 'Tuesday 6:00 PM - 8:00 PM (Zoom)' },
      { name: 'Friday Revival Hour', time: 'Friday 6:00 PM - 8:00 PM (Zoom)' }
    ]
  },
  'derby-church': {
    pastor: 'Jerry Affram',
    about: 'DCLM Derby is a dynamic church dedicated to making disciples and transforming lives through the power of God\'s Word. At Heatherton Community Centre in Littleover, we gather to worship, learn, and grow together in Christ. Our doors are open to all who seek a deeper relationship with God.',
    services: [
      { name: 'Sunday Worship Service', time: 'Sunday at 10:00 AM' },
      { name: 'Tuesday Bible Study', time: 'Tuesday 6:00 PM - 8:00 PM (Zoom)' },
      { name: 'Friday Revival Hour', time: 'Friday 6:00 PM - 8:00 PM (Zoom)' }
    ]
  },
  'rugby-church': {
    pastor: 'Funminiyi Taiwo',
    about: 'DCLM Rugby is a faith-filled congregation meeting at The Salvation Army Community Centre. We are committed to authentic worship and biblical teaching in a welcoming environment. Whether you\'re new to faith or have walked with God for years, you\'ll find a home here.',
    services: [
      { name: 'Sunday Worship Service', time: 'Sunday at 10:00 AM' },
      { name: 'Tuesday Bible Study', time: 'Tuesday 6:00 PM - 8:00 PM (Zoom)' },
      { name: 'Friday Revival Hour', time: 'Friday 6:00 PM - 8:00 PM (Zoom)' }
    ]
  },
  'lincoln-church': {
    pastor: 'Vincent Asmoah',
    about: 'DCLM Lincoln is a vibrant church family meeting at The Pavilion in Bracebridge Heath. We are passionate about creating an atmosphere where people can encounter God and experience life transformation. Join us for Sunday services and midweek Bible studies as we grow together in faith.',
    services: [
      { name: 'Sunday Worship Service', time: 'Sunday at 11:30 AM' },
      { name: 'Tuesday Bible Study', time: 'Tuesday 6:00 PM - 8:00 PM (Zoom)' },
      { name: 'Friday Revival Hour', time: 'Friday 6:00 PM - 8:00 PM (Zoom)' }
    ]
  },
  'nottingham-church': {
    pastor: 'Paul Akinwamide',
    about: 'DCLM Nottingham is a thriving church community in Beeston, dedicated to seeking God\'s presence together in worship and fellowship. We believe in the power of prayer, the authority of Scripture, and the importance of community. Come experience the warmth of our church family.',
    services: [
      { name: 'Sunday Worship Service', time: 'Sunday at 10:00 AM' },
      { name: 'Tuesday Bible Study', time: 'Tuesday 6:00 PM - 8:00 PM (Zoom)' },
      { name: 'Friday Revival Hour', time: 'Friday 6:00 PM - 8:00 PM (Zoom)' }
    ]
  },
  'grantham-church': {
    pastor: 'Vincent Owusu',
    about: 'DCLM Grantham is a welcoming and vibrant community of believers. We are committed to creating an environment where people can experience God\'s presence and grow in their faith. Join us for inspiring worship and life-changing biblical teaching every Sunday.',
    services: [
      { name: 'Sunday Worship Service', time: 'Sunday at 11:00 AM' },
      { name: 'Tuesday Bible Study', time: 'Tuesday 6:00 PM - 8:00 PM (Zoom)' },
      { name: 'Friday Revival Hour', time: 'Friday 6:00 PM - 8:00 PM (Zoom)' }
    ]
  },
  'peterborough-church': {
    pastor: 'Vincent Asmoah',
    about: 'DCLM Peterborough invites you to encounter the Living God in worship and community. We are a growing church family passionate about sharing God\'s love and helping people discover their purpose in Christ. Experience genuine fellowship and powerful worship with us.',
    services: [
      { name: 'Sunday Worship Service', time: 'Sunday at 10:30 AM' },
      { name: 'Tuesday Bible Study', time: 'Tuesday 6:00 PM - 8:00 PM (Zoom)' },
      { name: 'Friday Revival Hour', time: 'Friday 6:00 PM - 8:00 PM (Zoom)' }
    ]
  }
};

export default function LocationDetail() {
  const params = useParams();
  const slug = params.slug;

  const { data: locations = [], isLoading } = useQuery<ChurchLocation[]>({
    queryKey: ["/api/locations"],
  });

  const location = locations.find(loc => {
    const locSlug = loc.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return locSlug === slug;
  });

  const details = slug ? churchDetails[slug] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Header />
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-96 w-full rounded-xl bg-slate-800" />
            <div className="mt-8 space-y-4">
              <Skeleton className="h-10 w-2/3 bg-slate-800" />
              <Skeleton className="h-6 w-full bg-slate-800" />
              <Skeleton className="h-6 w-3/4 bg-slate-800" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-20 w-20 mx-auto text-slate-600 mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Location Not Found</h1>
            <p className="text-slate-400 mb-8">The location you're looking for doesn't exist.</p>
            <Link to="/locations">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View All Locations
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-1">
        <section className="relative">
          <div className="h-[50vh] min-h-[400px] overflow-hidden">
            {location.imageUrl ? (
              <img 
                src={location.imageUrl} 
                alt={location.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
                <MapPin className="h-32 w-32 text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 pb-12">
            <div className="container mx-auto px-4">
              <Link to="/locations">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mb-6 border-white/30 text-white hover:bg-white/10"
                  data-testid="button-back-locations"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All Locations
                </Button>
              </Link>
              <Badge className="mb-4 bg-blue-600 text-white">DCLM East Midlands</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-location-title">
                {location.name}
              </h1>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="lg:col-span-2 space-y-8">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">About Our Church</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-lg leading-relaxed" data-testid="text-location-description">
                      {details?.about || location.description}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-400" />
                      Service Times
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {details?.services?.map((service, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
                          <div className="p-2 bg-blue-600/20 rounded-lg">
                            {service.name.includes('Bible') ? (
                              <BookOpen className="h-5 w-5 text-blue-400" />
                            ) : (
                              <Clock className="h-5 w-5 text-blue-400" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{service.name}</h4>
                            <p className="text-slate-400 text-sm">{service.time}</p>
                          </div>
                        </div>
                      )) || (
                        <div className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
                          <div className="p-2 bg-blue-600/20 rounded-lg">
                            <Clock className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Sunday Worship Service</h4>
                            <p className="text-slate-400 text-sm">{location.serviceTime}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-700 mb-4 flex items-center justify-center">
                      <a 
                        href={location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-center p-8 hover:bg-slate-600/50 transition-colors w-full h-full"
                      >
                        <MapPin className="h-16 w-16 text-blue-400 mb-4" />
                        <span className="text-white font-medium">View on Google Maps</span>
                        <span className="text-slate-400 text-sm mt-2">{location.address}</span>
                      </a>
                    </div>
                    <div className="flex items-start text-slate-300 gap-2">
                      <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{location.address}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-slate-300">
                      <Clock className="h-5 w-5 mr-3 text-blue-400" />
                      <span className="font-medium" data-testid="text-service-time">{location.serviceTime}</span>
                    </div>
                    <div className="flex items-start text-slate-300">
                      <MapPin className="h-5 w-5 mr-3 mt-0.5 text-blue-400 flex-shrink-0" />
                      <span data-testid="text-address">{location.address}</span>
                    </div>
                    {details?.pastor && (
                      <div className="flex items-center text-slate-300">
                        <Users className="h-5 w-5 mr-3 text-blue-400" />
                        <span>Pastor: {details.pastor}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-slate-300">
                      <Mail className="h-5 w-5 mr-3 text-blue-400" />
                      <a 
                        href={`mailto:${location.contactEmail || 'dclmeastmidlands@gmail.com'}`}
                        className="text-blue-400 hover:underline"
                      >
                        {location.contactEmail || 'dclmeastmidlands@gmail.com'}
                      </a>
                    </div>
                    {location.mapUrl && (
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        asChild
                        data-testid="button-get-directions"
                      >
                        <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                          <MapPin className="mr-2 h-4 w-4" />
                          Get Directions
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0">
                  <CardContent className="py-6 text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Join Us This Sunday</h3>
                    <p className="text-blue-100 mb-4">
                      We'd love to meet you and your family!
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-white/40 text-white hover:bg-white/10"
                      asChild
                    >
                      <a href={`mailto:${location.contactEmail || 'dclmeastmidlands@gmail.com'}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Us
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={bibleStudyImage} 
                      alt="Tuesday Bible Study" 
                      className="w-full h-auto"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">Tuesday Bible Study</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-slate-400 text-sm mb-4">
                      Join us weekly for Tuesday Bible Study on Zoom:
                    </p>
                    <div className="text-slate-300 text-sm space-y-1 mb-4">
                      <p><span className="text-blue-400">Meeting ID:</span> 83486339797</p>
                      <p><span className="text-blue-400">Passcode:</span> EMR2025</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-slate-600 text-slate-200 hover:bg-slate-700"
                      asChild
                    >
                      <a 
                        href="https://dclm-org.zoom.us/j/83486339797?pwd=LJlViOWyOUm3cV25P9PybdsLafUZbd.1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Join Zoom Meeting
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={fridayPrayerImage} 
                      alt="Friday Prayer & Revival Service" 
                      className="w-full h-auto"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">Friday Prayer & Revival Service</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-slate-400 text-sm mb-4">
                      Join us weekly for Friday Prayer & Revival Service on Zoom:
                    </p>
                    <div className="text-slate-300 text-sm space-y-1 mb-4">
                      <p><span className="text-blue-400">Meeting ID:</span> 83486339797</p>
                      <p><span className="text-blue-400">Passcode:</span> EMR2025</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-slate-600 text-slate-200 hover:bg-slate-700"
                      asChild
                    >
                      <a 
                        href="https://dclm-org.zoom.us/j/83486339797?pwd=LJlViOWyOUm3cV25P9PybdsLafUZbd.1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Join Zoom Meeting
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
