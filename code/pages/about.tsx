import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Heart, BookOpen, Users, Star, Target, Award, Baby, Sparkles, HandHeart, Mail, Phone, MapPin, Clock } from "lucide-react";
import { SiteLink as Link } from "../components/SiteLink";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-about-page-heading">
              About Us
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Discover our mission, vision, and the people who make our church family.
            </p>
          </div>
        </section>

        {/* About DCLM Section */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About DCLM East Midlands</h2>
              <p className="text-xl text-blue-400 italic">"Your spiritual welfare is our concern"</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-slate-300 text-lg leading-relaxed text-center">
                We are a Heaven-focused community committed to helping you walk with God, grow in holiness, 
                and prepare for eternity—because Heaven is not just our destination, it's our frame of reference for everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Deeper Christian Life Ministry began in 1973 when Pastor William Folorunso Kumuyi, 
                  a mathematics lecturer at the University of Lagos, started a Bible study group with 
                  just 15 people seeking deeper scriptural understanding and training.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  What began as a small gathering has grown into a global movement with over 800,000 
                  members across Nigeria and 3,000+ churches in 40 countries worldwide.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  In 1982, the ministry officially became Deeper Life Bible Church, built on a foundation 
                  of Bible-centered teaching, holiness living, and passionate prayer. Today, DCLM East Midlands 
                  is proud to be part of this worldwide family, bringing the same life-transforming message 
                  of salvation, holiness, and hope to communities across the East Midlands region of the United Kingdom.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-center">
                <div className="text-6xl font-bold text-white mb-2">50+</div>
                <p className="text-blue-100 text-lg mb-6">Years of Ministry</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white">800K+</div>
                    <p className="text-blue-200 text-sm">Members Worldwide</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">40+</div>
                    <p className="text-blue-200 text-sm">Countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <Target className="h-10 w-10 text-blue-400 mb-2" />
                  <CardTitle className="text-2xl text-white">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    To worship and glorify God and extend His kingdom by living according to the Bible 
                    (The Word of God) and proclaiming and spreading His truth in the world.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <Star className="h-10 w-10 text-blue-400 mb-2" />
                  <CardTitle className="text-2xl text-white">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    "Achieving Heaven's Goal" through Bible-based teaching, Christian holiness, 
                    and raising faithful leaders who live in moment-by-moment awareness of God's Presence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-white text-center mb-12">What We Believe</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-3">Bible-Centered</h4>
                <p className="text-slate-400">
                  The Bible is our final authority. We are committed to systematic, expository teaching of God's Word.
                </p>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <Heart className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-3">Holiness Living</h4>
                <p className="text-slate-400">
                  We believe in practical holiness—living set apart for God in thought, word, and deed every day.
                </p>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-3">Prayer & Fellowship</h4>
                <p className="text-slate-400">
                  We believe in the power of persistent prayer and the vital importance of Christian fellowship.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Founder */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-white mb-6">Our Founder: Pastor W. F. Kumuyi</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Pastor (Dr.) William Folorunso Kumuyi is the founder and General Superintendent of 
                  Deeper Christian Life Ministry. Born in 1941 into a strict Anglican home, he experienced 
                  a profound spiritual transformation that led him to start a Bible study in 1973.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Known for his humility, Bible-centered preaching, and unwavering commitment to holiness, 
                  Pastor Kumuyi has "preached Deeper Life into existence" through decades of faithful ministry. 
                  His emphasis on systematic Bible teaching and practical Christian living continues to impact 
                  millions worldwide.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <img 
                    src="https://gckhq.org/wp-content/uploads/2024/03/Dr-Kumuyi-Headshot.png" 
                    alt="Pastor W. F. Kumuyi"
                    className="w-56 h-56 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <Heart className="h-10 w-10 text-red-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Salvation</h4>
                <p className="text-slate-400 text-sm">
                  Preaching the saving gospel of Jesus Christ and leading people to new life in Him
                </p>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <Award className="h-10 w-10 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Excellence</h4>
                <p className="text-slate-400 text-sm">
                  Inspiring spiritual and physical excellence in all areas of life
                </p>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <Users className="h-10 w-10 text-green-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Leadership</h4>
                <p className="text-slate-400 text-sm">
                  Raising and developing faithful Christian leaders for Kingdom service
                </p>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <Sparkles className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Heaven-Focus</h4>
                <p className="text-slate-400 text-sm">
                  Living with eternity in view, cultivating moment-by-moment awareness of God's Presence
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Ministries */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Our Ministries</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Discover opportunities to grow, serve, and connect with God and others through our vibrant ministry programs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center">
                  <Baby className="h-16 w-16 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Children's Ministry</h4>
                  <p className="text-slate-400 text-sm">
                    Nurturing young hearts in faith through engaging Bible lessons, games, and activities designed for children ages 3-12.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Youth Ministry</h4>
                  <p className="text-slate-400 text-sm">
                    Empowering teenagers to develop a strong relationship with Christ through contemporary worship, discipleship, and fellowship.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
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
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                  <HandHeart className="h-16 w-16 text-white/80" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Community Outreach</h4>
                  <p className="text-slate-400 text-sm">
                    Serving our community with the love of Christ through charity programs, food banks, and compassionate service initiatives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Get in Touch</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We'd love to hear from you. Whether you have questions, need prayer, or want to visit, reach out to us.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Address</h4>
                <p className="text-slate-400 text-sm">East Midlands Region, United Kingdom</p>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <Phone className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Phone</h4>
                <p className="text-slate-400 text-sm">Contact your local church</p>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <Mail className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Email</h4>
                <p className="text-slate-400 text-sm">dclmeastmidlands@gmail.com</p>
              </Card>
              <Card className="bg-slate-800 border-slate-700 text-center p-6">
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Office Hours</h4>
                <p className="text-slate-400 text-sm">Sunday: After Service</p>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Link to="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Send Us a Message
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
