import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Sermons() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/30 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-sermons-page-heading">
              Sermons
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch and listen to inspiring messages from Global Crusade with Kumuyi
            </p>
          </div>
        </section>

        {/* Embedded Sermons */}
        <section className="pb-0">
          <div className="w-full">
            <iframe
              src="https://gckhq.org/sermon"
              className="w-full min-h-screen border-0"
              title="Sermons from Global Crusade with Kumuyi"
              data-testid="iframe-sermons"
              style={{ height: 'calc(100vh - 200px)', minHeight: '800px' }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
