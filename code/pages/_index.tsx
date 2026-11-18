import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeroCarousel } from "../components/HeroCarousel";
import { Button } from "../components/UiButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UiCard";
import { Badge } from "../components/UiBadge";
import { Calendar, Clock, Users, ArrowRight, Video, BookOpen, Flame, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "../helpers/siteSchema";

interface DailyManna {
  title: string;
  date: string;
  keyVerse: string;
  bibleText: string;
  messageExcerpt: string;
  thoughtForTheDay: string;
  sourceUrl: string;
}
const backgroundImage = "/_cdn/static/HQ_1767641110235.jpg";
const bibleStudyImage = "/_cdn/static/Bible_Study_2026_1767660337989.jpg";
const fridayPrayerImage = "/_cdn/static/Friday_Prayer_1767660261541.jpg";
const sundayWorshipImage = "/_cdn/static/7_1767663541402.jpg";

export default function Home() {
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: dailyManna, isLoading: isMannaLoading } = useQuery<DailyManna>({
    queryKey: ["/api/daily-manna"],
    staleTime: 30 * 60 * 1000,
  });

  const featuredEvent = events[0];

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      <HeroCarousel />
      {/* Join Us Weekly Section */}
      <section className="py-20 mt-[80px] mb-[80px] bg-[#033745bf]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4" data-testid="text-weekly-heading">
              Join Us Weekly
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-[#ffffff]">
              Experience God's presence through worship, teaching, and fellowship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Sunday Worship */}
            <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-sunday-service">
              <div className="h-48 overflow-hidden">
                <img src={sundayWorshipImage} alt="Sunday Worship Service" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-white">Sunday Worship Service</CardTitle>
                <CardDescription className="text-slate-400">Sundays</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-400 font-medium mb-3">9:30 AM - 11:30 AM (various times)</p>
                <p className="text-slate-300 text-sm mb-4">
                  Join us for powerful worship, biblical teaching, and fellowship at any of our locations
                </p>
                <Link to="/locations">
                  <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-200 hover:bg-slate-700">
                    Find a Location
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tuesday Bible Study */}
            <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-tuesday-study">
              <div className="h-48 overflow-hidden">
                <img src={bibleStudyImage} alt="Tuesday Bible Study" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-white">Tuesday Bible Study</CardTitle>
                <CardDescription className="text-slate-400">Tuesdays</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-green-400 font-medium mb-3">6:00 PM - 8:00 PM</p>
                <p className="text-slate-300 text-sm mb-4">
                  Dive deeper into God's Word through systematic Bible study and discussion
                </p>
                <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-200 hover:bg-slate-700" asChild>
                  <a href="https://dclm-org.zoom.us/j/83486339797?pwd=LJlViOWyOUm3cV25P9PybdsLafUZbd.1" target="_blank" rel="noopener noreferrer">
                    <Video className="mr-2 h-4 w-4" />
                    Join on Zoom
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Friday Prayer & Revival */}
            <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-friday-revival">
              <div className="h-48 overflow-hidden">
                <img src={fridayPrayerImage} alt="Friday Prayer & Revival Service" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-white">Friday Prayer & Revival</CardTitle>
                <CardDescription className="text-slate-400">Fridays</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-orange-400 font-medium mb-3">6:00 PM - 8:00 PM</p>
                <p className="text-slate-300 text-sm mb-4">
                  Experience spiritual renewal through fervent prayer and worship
                </p>
                <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-200 hover:bg-slate-700" asChild>
                  <a href="https://dclm-org.zoom.us/j/83486339797?pwd=LJlViOWyOUm3cV25P9PybdsLafUZbd.1" target="_blank" rel="noopener noreferrer">
                    <Video className="mr-2 h-4 w-4" />
                    Join on Zoom
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Daily Manna Devotional Section */}
      {dailyManna && (
        <section className="py-16 mt-[80px] mb-[80px] bg-[#0a1929e6]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-3 bg-amber-600/20 text-amber-300 border-amber-600/30">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Daily Manna
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-2" data-testid="text-daily-manna-heading">
                  Today's Devotional
                </h2>
                {dailyManna.date && (
                  <p className="text-slate-400 text-sm" data-testid="text-daily-manna-date">{dailyManna.date}</p>
                )}
              </div>

              <Card className="bg-slate-800/80 border-slate-700" data-testid="card-daily-manna">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl text-amber-300 font-serif" data-testid="text-daily-manna-title">
                    {dailyManna.title}
                  </CardTitle>
                  {dailyManna.bibleText && (
                    <CardDescription className="text-blue-400 font-medium" data-testid="text-daily-manna-ref">
                      {dailyManna.bibleText}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {dailyManna.keyVerse && (
                    <div className="border-l-2 border-amber-500/50 pl-4 py-1">
                      <p className="text-sm font-medium text-slate-400 mb-1">Key Verse</p>
                      <p className="text-slate-200 italic text-sm leading-relaxed" data-testid="text-daily-manna-verse">
                        {dailyManna.keyVerse}
                      </p>
                    </div>
                  )}

                  {dailyManna.messageExcerpt && (
                    <p className="text-slate-300 text-sm leading-relaxed" data-testid="text-daily-manna-excerpt">
                      {dailyManna.messageExcerpt}
                    </p>
                  )}

                  {dailyManna.thoughtForTheDay && (
                    <div className="bg-slate-900/50 rounded-md p-4">
                      <p className="text-xs font-medium text-amber-400 mb-1">Thought for the Day</p>
                      <p className="text-slate-200 italic text-sm" data-testid="text-daily-manna-thought">
                        {dailyManna.thoughtForTheDay}
                      </p>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-200" asChild data-testid="link-daily-manna-read-more">
                      <Link to="/devotional">
                        Read Full Devotional
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <p className="text-center text-slate-500 text-xs mt-4">
                Devotional content from <a href="https://dailymanna.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">dailymanna.app</a> by Pastor W.F. Kumuyi
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 mt-[80px] mb-[80px] bg-[#22084296]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4" data-testid="text-testimonials-heading">
              Changed Lives, Transformed Hearts
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-[#ffffff]">
              Hear from our church family about how God has worked in their lives through our ministry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800 border-slate-700" data-testid="card-testimonial-1">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-slate-300 italic mb-6">
                  "This church has been a beacon of light in my life. The genuine love and support from the congregation helped me through my darkest times. I've grown spiritually in ways I never imagined."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    SJ
                  </div>
                  <div>
                    <p className="text-white font-medium">Sarah Johnson</p>
                    <p className="text-slate-400 text-sm">Member since 2018</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700" data-testid="card-testimonial-2">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-slate-300 italic mb-6">
                  "The youth ministry here is incredible! It's not just about having fun, but truly encountering God and discovering our purpose. I've seen so many young lives transformed by the power of Christ."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                    MO
                  </div>
                  <div>
                    <p className="text-white font-medium">Michael Obi</p>
                    <p className="text-slate-400 text-sm">Youth Leader</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700" data-testid="card-testimonial-3">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-slate-300 italic mb-6">
                  "Being part of this ministry has been such a blessing. Watching children learn about Jesus and seeing their faith grow is the most rewarding experience. This is truly a family in Christ."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    EW
                  </div>
                  <div>
                    <p className="text-white font-medium">Elizabeth Williams</p>
                    <p className="text-slate-400 text-sm">Sunday School Teacher</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6" data-testid="text-cta-heading">
            Take Your Next Step
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're exploring faith for the first time or looking to grow deeper, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/locations">
              <Button size="lg" className="text-lg px-8 bg-white text-blue-700 hover:bg-blue-50" data-testid="button-plan-visit">
                Plan Your Visit
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/40 text-white hover:bg-white/10" data-testid="button-get-in-touch">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
