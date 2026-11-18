import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/UiButton";
import { Card } from "../components/UiCard";
import { Youtube, ExternalLink, Clock, Calendar } from "lucide-react";

export default function WatchLive() {
  const channelId = "UCLPHzAhvAsD0zRrzHBUvygw";
  const youtubeChannelUrl = "https://www.youtube.com/@dclmeastmidlandsuk";
  const youtubeLiveUrl = "https://www.youtube.com/@dclmeastmidlandsuk/live";
  
  // Embed URL for live stream with autoplay
  const embedUrl = `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-1">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-semibold text-white mb-4" data-testid="text-watchlive-heading">
                Watch Live
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Join our live services and experience worship with DCLM East Midlands
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Card className="overflow-hidden bg-slate-800 border-slate-700" data-testid="container-livestream">
                <div className="aspect-video bg-black">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    title="DCLM East Midlands Live Stream"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    data-testid="iframe-livestream"
                  />
                </div>
              </Card>

              <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-300 text-center mb-4">
                  <strong className="text-white">No live stream?</strong> If there's no active broadcast, you can visit the channel directly:
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" asChild className="bg-red-600 hover:bg-red-700 text-white" data-testid="button-watch-on-youtube">
                    <a href={youtubeLiveUrl} target="_blank" rel="noopener noreferrer">
                      <Youtube className="mr-2 h-5 w-5" />
                      Watch Live on YouTube
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="border-slate-600 text-slate-200 hover:bg-slate-800" data-testid="button-visit-youtube">
                    <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
                      Visit Channel
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-slate-800 border-slate-700">
                  <div className="flex items-start gap-4">
                    <Calendar className="h-8 w-8 text-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-white" data-testid="text-service-schedule">
                        Service Schedule
                      </h3>
                      <ul className="space-y-2 text-slate-400">
                        <li>Sunday Worship Service: 9:30 AM - 11:30 AM</li>
                        <li>Tuesday Bible Study: 6:00 PM - 8:00 PM</li>
                        <li>Friday Prayer & Revival: 6:00 PM - 8:00 PM</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-slate-800 border-slate-700">
                  <div className="flex items-start gap-4">
                    <Clock className="h-8 w-8 text-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-white" data-testid="text-timezone-info">
                        Time Zone
                      </h3>
                      <p className="text-slate-400">
                        All service times are in UK time (GMT/BST)
                      </p>
                    </div>
                  </div>
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
