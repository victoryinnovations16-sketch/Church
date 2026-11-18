import { Card, CardContent } from "../components/UiCard";
import { Badge } from "../components/UiBadge";
import { Button } from "../components/UiButton";
import { BookOpen, Download, Calendar, Church, Users, Baby, Heart, Music, ArrowRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

const pdfFile = "/_cdn/static/Combined_Service_8th_Feb_1770490712382.pdf";

const booklets = [
  {
    title: "Sunday Worship Service",
    description: "Order of service, hymns, and announcements for our weekly Sunday worship gathering.",
    icon: Church,
    color: "from-blue-500 to-blue-600",
    category: "Weekly",
    flipbookLink: null,
    pdfDownload: null,
  },
  {
    title: "Bible Study Programme",
    description: "Weekly Bible study outlines, discussion questions, and reading plans.",
    icon: BookOpen,
    color: "from-emerald-500 to-emerald-600",
    category: "Weekly",
    flipbookLink: null,
    pdfDownload: null,
  },
  {
    title: "Youth Programme (YPF)",
    description: "Youth fellowship programme with activities, Bible teachings, and youth events schedule.",
    icon: Users,
    color: "from-green-500 to-green-600",
    category: "Monthly",
    flipbookLink: null,
    pdfDownload: null,
  },
  {
    title: "Children's Church Programme",
    description: "Fun-filled programme for children including Bible stories, crafts, and activities.",
    icon: Baby,
    color: "from-orange-500 to-orange-600",
    category: "Monthly",
    flipbookLink: null,
    pdfDownload: null,
  },
  {
    title: "DLCF Programme",
    description: "Deeper Life Campus Fellowship programme booklet with campus meeting schedules and outreach plans.",
    icon: Heart,
    color: "from-amber-500 to-amber-600",
    category: "Termly",
    flipbookLink: null,
    pdfDownload: null,
  },
  {
    title: "Special Events Programme",
    description: "Programme booklets for retreats, conventions, crusades, and other special church events.",
    icon: Calendar,
    color: "from-purple-500 to-purple-600",
    category: "Seasonal",
    flipbookLink: "/ebook/combined-service",
    pdfDownload: pdfFile,
    subItems: [
      {
        title: "Regional Combined Service (PDF)",
        date: "8th February 2025",
        link: "/ebook/combined-service",
      },
      {
        title: "Regional Combined Service (E-Book)",
        date: "8th February 2025",
        link: "/ebook/combined-service-programme",
      },
    ],
  },
  {
    title: "Choir & Music Ministry",
    description: "Choir rehearsal schedules, song lists, and music ministry programme outlines.",
    icon: Music,
    color: "from-pink-500 to-pink-600",
    category: "Monthly",
    flipbookLink: null,
    pdfDownload: null,
  },
];

export default function ProgrammeBooklets() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      <section className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTI5M2IiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bTAtMzBoMnYtNGgtMlYwaC0ydjRoLTR2Mmg0djRoMnYtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 mb-6 text-sm px-4 py-1">
            <BookOpen className="h-4 w-4 mr-2" />
            Media Resources
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Programme Booklets
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Download our church programme booklets for worship services, Bible studies, ministry activities, and special events.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/50 mb-3">
                <BookOpen className="h-3 w-3 mr-1" />
                Featured E-Book
              </Badge>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Read Online</h2>
            </div>
            <Link to="/ebook/combined-service-programme">
              <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-none shadow-xl cursor-pointer hover-elevate" data-testid="card-ebook-combined-service">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <Badge className="bg-white/20 text-white border-white/30 mb-2 text-xs">E-Book</Badge>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">DCLM East Midlands Regional Combined Service</h3>
                      <p className="text-blue-100 text-sm mb-1">8th February 2025 Programme Booklet</p>
                      <p className="text-blue-200 text-xs">Includes: Service Programme, Hymns, Search the Scriptures, Goal-Setting & Financial Management, Real Estate Investment Guide</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" data-testid="button-read-ebook">
                        Read Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {booklets.map((booklet, index) => (
              <Card key={index} className="bg-white dark:bg-slate-800 border-none shadow-lg hover-elevate" data-testid={`card-booklet-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${booklet.color} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                      <booklet.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">{booklet.title}</h3>
                        <Badge variant="outline" className="text-xs">{booklet.category}</Badge>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{booklet.description}</p>
                    </div>
                  </div>
                  {"subItems" in booklet && booklet.subItems ? (
                    <div className="space-y-3">
                      {booklet.subItems.map((item, subIndex) => (
                        <div key={subIndex} className="bg-slate-50 dark:bg-slate-700/50 rounded-md p-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                            <div>
                              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.title}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{item.date}</p>
                            </div>
                            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 text-xs">Flipbook</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button asChild variant="default" size="sm" className="flex-1" data-testid={`button-read-special-${subIndex}`}>
                              <Link to={item.link}>
                                <BookOpen className="h-4 w-4 mr-2" />
                                Read Online
                              </Link>
                            </Button>
                            {booklet.pdfDownload && (
                              <Button asChild variant="outline" size="sm" data-testid={`button-download-special-${subIndex}`}>
                                <a href={booklet.pdfDownload} download={`${item.title.replace(/\s+/g, '_')}.pdf`}>
                                  <Download className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-download-booklet-${index}`}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Looking for a specific programme?</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  If you need a programme booklet that isn't listed here, please contact the church office and we'll be happy to help.
                </p>
                <Button asChild data-testid="button-contact-office">
                  <a href="/contact">Contact Church Office</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
