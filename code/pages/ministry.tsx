import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Baby, Sparkles, Users, HandHeart, Music, BookOpen, Heart, GraduationCap, Briefcase, Globe, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Ministry() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-ministry-heading">
              Our Ministries
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Discover opportunities to grow, serve, and connect with God and others through our vibrant ministry programs.
            </p>
          </div>
        </section>

        {/* Main Ministries */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Age-Based Ministries</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We have dedicated ministries for every age group, ensuring everyone can grow in faith at their own pace.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Link to="/children-ministry">
                <Card className="bg-slate-800 border-slate-700 overflow-hidden hover-elevate cursor-pointer" data-testid="card-children-ministry">
                  <div className="h-32 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <Baby className="h-16 w-16 text-white/80" />
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Children's Church</h4>
                    <p className="text-slate-400 text-sm">
                      Raising a godly generation through engaging Bible lessons, games, and activities designed for children ages 1-12.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ypf-ministry">
                <Card className="bg-slate-800 border-slate-700 overflow-hidden hover-elevate cursor-pointer" data-testid="card-youth-ministry">
                  <div className="h-32 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                    <Sparkles className="h-16 w-16 text-white/80" />
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Young Professionals (YPF)</h4>
                    <p className="text-slate-400 text-sm">
                      Empowering young professionals to excel in their careers while maintaining a strong relationship with God.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-adult-fellowship">
                <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Users className="h-16 w-16 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Adult Fellowship</h4>
                  <p className="text-slate-400 text-sm">
                    Building authentic community through Bible study groups, prayer meetings, and spiritual growth opportunities for adults.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-couples-ministry">
                <div className="h-32 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Couples' Fellowship</h4>
                  <p className="text-slate-400 text-sm">
                    Strengthening marriages through biblical teaching, fellowship events, and support for couples at every stage of life.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-womens-ministry">
                <div className="h-32 bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
                  <Flower2 className="h-16 w-16 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Women's Ministry</h4>
                  <p className="text-slate-400 text-sm">
                    Empowering women to grow in faith, build meaningful relationships, and serve God through Bible study, prayer, and fellowship.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Ministries */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Service Ministries</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Opportunities to use your gifts and talents to serve God and the church community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-music-ministry">
                <div className="h-28 bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                  <Music className="h-12 w-12 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Music Ministry</h4>
                  <p className="text-slate-400 text-sm">
                    Leading the congregation in worship through choir, instrumentalists, and sound engineering.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-evangelism">
                <div className="h-28 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                  <Globe className="h-12 w-12 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Evangelism</h4>
                  <p className="text-slate-400 text-sm">
                    Sharing the gospel in our communities through outreach events, campus ministry, and personal evangelism.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-prayer-ministry">
                <div className="h-28 bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Prayer Ministry</h4>
                  <p className="text-slate-400 text-sm">
                    Interceding for the church, community, and world through organized prayer meetings and chains.
                  </p>
                </CardContent>
              </Card>
              <Link to="/dlcf-ministry">
                <Card className="bg-slate-800 border-slate-700 overflow-hidden hover-elevate cursor-pointer" data-testid="card-campus-ministry">
                  <div className="h-28 bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                    <GraduationCap className="h-12 w-12 text-white/80" />
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="text-lg font-semibold text-white mb-2">DLCF Ministry</h4>
                    <p className="text-slate-400 text-sm">
                      Deeper Life Campus Fellowship - Supporting students in universities with Bible studies, mentorship, and Christian fellowship.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-outreach">
                <div className="h-28 bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                  <HandHeart className="h-12 w-12 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Community Outreach</h4>
                  <p className="text-slate-400 text-sm">
                    Serving our community with the love of Christ through charity programs and compassionate service initiatives.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 overflow-hidden" data-testid="card-professionals">
                <div className="h-28 bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center">
                  <Briefcase className="h-12 w-12 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Career & Professionals</h4>
                  <p className="text-slate-400 text-sm">
                    Supporting professionals with career guidance, networking, and integrating faith in the workplace.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get Involved</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We believe everyone has gifts to share. Find your place to serve and make a difference in our church family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="text-lg px-8 bg-white text-blue-700 hover:bg-blue-50" data-testid="button-contact-us">
                  Contact Us
                </Button>
              </Link>
              <Link to="/locations">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white/40 text-white hover:bg-white/10" data-testid="button-find-church">
                  Find a Church
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
