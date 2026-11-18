import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UiCard";
import { Badge } from "../components/UiBadge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../components/UiSkeleton";
import { BookOpen, Calendar, Quote } from "lucide-react";

interface DailyManna {
  title: string;
  date: string;
  keyVerse: string;
  bibleText: string;
  messageExcerpt: string;
  fullMessage: string;
  thoughtForTheDay: string;
  sourceUrl: string;
}

export default function Devotional() {
  const { data: dailyManna, isLoading, error } = useQuery<DailyManna>({
    queryKey: ["/api/daily-manna"],
    staleTime: 30 * 60 * 1000,
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-1">
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-[#0a1929] to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge variant="secondary" className="mb-4 bg-amber-600/20 text-amber-300 border-amber-600/30">
              <BookOpen className="h-3 w-3 mr-1" />
              Daily Devotional
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4" data-testid="text-devotional-page-heading">
              Daily Manna
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Nourish your spirit with today's word from Pastor W.F. Kumuyi
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            {isLoading ? (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <Skeleton className="h-6 w-32 mb-4 bg-slate-700" />
                  <Skeleton className="h-10 w-full mb-2 bg-slate-700" />
                  <Skeleton className="h-6 w-48 bg-slate-700" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-20 w-full bg-slate-700" />
                  <Skeleton className="h-40 w-full bg-slate-700" />
                  <Skeleton className="h-16 w-full bg-slate-700" />
                </CardContent>
              </Card>
            ) : error ? (
              <div className="text-center py-20">
                <BookOpen className="h-16 w-16 mx-auto text-slate-600 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">Unable to Load Devotional</h3>
                <p className="text-slate-400">
                  Please try again later or visit{" "}
                  <a href="https://dailymanna.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    dailymanna.app
                  </a>{" "}
                  directly.
                </p>
              </div>
            ) : dailyManna ? (
              <div className="space-y-6">
                {dailyManna.date && (
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm" data-testid="text-devotional-date">{dailyManna.date}</span>
                  </div>
                )}

                <Card className="bg-slate-800/80 border-slate-700" data-testid="card-devotional-main">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-3xl font-serif text-amber-300" data-testid="text-devotional-title">
                      {dailyManna.title}
                    </CardTitle>
                    {dailyManna.bibleText && (
                      <p className="text-blue-400 font-medium text-lg" data-testid="text-devotional-bible-text">
                        {dailyManna.bibleText}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {dailyManna.keyVerse && (
                      <div className="border-l-2 border-amber-500/50 pl-4 py-2 bg-slate-900/40 rounded-r-md">
                        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Key Verse</p>
                        <p className="text-slate-200 italic leading-relaxed" data-testid="text-devotional-key-verse">
                          {dailyManna.keyVerse}
                        </p>
                      </div>
                    )}

                    {dailyManna.fullMessage && (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">Message</p>
                        <div className="text-slate-300 leading-relaxed whitespace-pre-wrap" data-testid="text-devotional-full-message">
                          {dailyManna.fullMessage}
                        </div>
                      </div>
                    )}

                    {dailyManna.thoughtForTheDay && (
                      <div className="bg-slate-900/60 rounded-md p-5 border border-slate-700/50">
                        <div className="flex items-start gap-3">
                          <Quote className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Thought for the Day</p>
                            <p className="text-slate-200 italic leading-relaxed text-lg" data-testid="text-devotional-thought">
                              {dailyManna.thoughtForTheDay}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <p className="text-center text-slate-500 text-xs">
                  Devotional content sourced from{" "}
                  <a href="https://dailymanna.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    dailymanna.app
                  </a>{" "}
                  by Pastor W.F. Kumuyi
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
