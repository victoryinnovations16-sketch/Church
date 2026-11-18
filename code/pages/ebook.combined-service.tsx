import { useState, useRef, useCallback, useEffect, forwardRef } from "react";
import { Button } from "../components/UiButton";
import { Badge } from "../components/UiBadge";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  BookOpen, ChevronLeft, ChevronRight, ArrowLeft,
  Download, Loader2, Maximize, Minimize
} from "lucide-react";
import { Link } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";

const pdfFile = "/_cdn/static/Combined_Service_8th_Feb_1770490712382.pdf";

// The PDF.js worker is loaded from a CDN (the version matches the installed pdfjs-dist).
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const FlipPage = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => (
    <div ref={ref} className={`bg-white ${className}`} style={{ overflow: "hidden" }}>
      {children}
    </div>
  )
);

export default function CombinedServiceBooklet() {
  const bookRef = useRef<{ pageFlip(): { flipNext(): void; flipPrev(): void; flip(page: number): void; getCurrentPageIndex(): number; getPageCount(): number } }>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDimensions, setPageDimensions] = useState({ width: 550, height: 733 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && !loading && pageImages.length > 0) {
      setIsFullscreen(true);
    }
  }, [isMobile, loading, pageImages.length]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        const loadingTask = pdfjsLib.getDocument(pdfFile);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        setTotalPages(numPages);

        const images: string[] = [];
        const scale = 2.0;

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) continue;

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvasContext: context,
            viewport: viewport,
            canvas: canvas,
          } as any).promise;

          if (i === 1) {
            const aspectRatio = viewport.width / viewport.height;
            const targetHeight = 733;
            const targetWidth = Math.round(targetHeight * aspectRatio);
            setPageDimensions({ width: targetWidth, height: targetHeight });
          }

          images.push(canvas.toDataURL("image/jpeg", 0.92));
          setLoadingProgress(Math.round((i / numPages) * 100));
        }

        setPageImages(images);
        setLoading(false);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setLoading(false);
      }
    };

    loadPdf();
  }, []);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  if (isFullscreen && pageImages.length > 0) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col" data-testid="fullscreen-flipbook">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-800/90 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(false)}
              className="text-slate-300"
              data-testid="button-exit-fullscreen"
            >
              <Minimize className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Exit</span>
            </Button>
          </div>

          <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs px-3" data-testid="badge-fullscreen-page">
            {currentPage + 1} / {pageImages.length}
          </Badge>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-slate-300"
              data-testid="button-download-pdf-fullscreen"
            >
              <a href={pdfFile} download="DCLM_Combined_Service_8th_Feb_2025.pdf">
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative min-h-0">
          <button
            onClick={() => bookRef.current?.pageFlip().flipPrev()}
            disabled={currentPage <= 0}
            className="absolute left-1 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white disabled:opacity-20 active:bg-black/50"
            data-testid="button-prev-fullscreen"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flipbook-container-fullscreen w-full h-full flex items-center justify-center px-12">
            {/* @ts-expect-error react-pageflip types don't fully align with React 18 */}
            <HTMLFlipBook
              width={pageDimensions.width}
              height={pageDimensions.height}
              size="stretch"
              minWidth={200}
              maxWidth={900}
              minHeight={280}
              maxHeight={1200}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="flipbook-shadow"
              ref={bookRef}
              drawShadow={true}
              flippingTime={800}
              usePortrait={true}
              startPage={currentPage}
              autoSize={true}
              clickEventForward={true}
              useMouseEvents={true}
              showPageCorners={true}
            >
              {pageImages.map((imgSrc, index) => (
                <FlipPage key={index}>
                  <img
                    src={imgSrc}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-contain"
                    style={{ display: "block" }}
                    data-testid={`img-fullscreen-page-${index}`}
                  />
                </FlipPage>
              ))}
            </HTMLFlipBook>
          </div>

          <button
            onClick={() => bookRef.current?.pageFlip().flipNext()}
            disabled={currentPage >= pageImages.length - 1}
            className="absolute right-1 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white disabled:opacity-20 active:bg-black/50"
            data-testid="button-next-fullscreen"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-center py-2 bg-slate-800/90 border-t border-slate-700 flex-shrink-0">
          <p className="text-slate-400 text-xs">Swipe or tap arrows to turn pages</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      <section className="relative py-12 md:py-16 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/programme-booklets">
            <Button variant="ghost" size="sm" className="text-slate-300 mb-4" data-testid="button-back-booklets">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programme Booklets
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 mb-4 text-sm px-4 py-1">
                <BookOpen className="h-4 w-4 mr-2" />
                Interactive Flipbook
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                DCLM East Midlands Regional Combined Service
              </h1>
              <p className="text-slate-300 text-lg">8th February 2025 Programme Booklet</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                asChild
                variant="outline"
                className="bg-white/10 border-white/30 text-white"
                data-testid="button-download-pdf"
              >
                <a href={pdfFile} download="DCLM_Combined_Service_8th_Feb_2025.pdf">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-slate-100 dark:bg-slate-800/50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20" data-testid="loading-flipbook">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
              <p className="text-slate-600 dark:text-slate-300 text-lg font-medium mb-2">
                Preparing flipbook...
              </p>
              <div className="w-64 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                {loadingProgress}% - Loading page {Math.ceil((loadingProgress / 100) * totalPages)} of {totalPages}
              </p>
            </div>
          ) : pageImages.length > 0 ? (
            <>
              <div className="flex items-center justify-center gap-2 md:gap-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => bookRef.current?.pageFlip().flipPrev()}
                  disabled={currentPage <= 0}
                  data-testid="button-prev-page"
                  className="bg-white dark:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <Badge variant="outline" className="bg-white dark:bg-slate-800 px-4 py-1.5 text-sm" data-testid="badge-page-number">
                  Page {currentPage + 1} of {pageImages.length}
                </Badge>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => bookRef.current?.pageFlip().flipNext()}
                  disabled={currentPage >= pageImages.length - 1}
                  data-testid="button-next-page"
                  className="bg-white dark:bg-slate-800"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(true)}
                  className="bg-white dark:bg-slate-800"
                  data-testid="button-enter-fullscreen"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-center flipbook-container">
                {/* @ts-expect-error react-pageflip types don't fully align with React 18 */}
                <HTMLFlipBook
                  width={pageDimensions.width}
                  height={pageDimensions.height}
                  size="stretch"
                  minWidth={280}
                  maxWidth={pageDimensions.width}
                  minHeight={400}
                  maxHeight={pageDimensions.height}
                  maxShadowOpacity={0.5}
                  showCover={true}
                  mobileScrollSupport={true}
                  onFlip={onFlip}
                  className="flipbook-shadow"
                  ref={bookRef}
                  drawShadow={true}
                  flippingTime={800}
                  usePortrait={true}
                  startPage={0}
                  autoSize={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  showPageCorners={true}
                >
                  {pageImages.map((imgSrc, index) => (
                    <FlipPage key={index}>
                      <img
                        src={imgSrc}
                        alt={`Page ${index + 1}`}
                        className="w-full h-full object-contain"
                        style={{ display: "block" }}
                        data-testid={`img-page-${index}`}
                      />
                    </FlipPage>
                  ))}
                </HTMLFlipBook>
              </div>

              <div className="flex items-center justify-center gap-4 mt-6">
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Click and drag or swipe to turn pages
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-20" data-testid="error-loading">
              <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
                Unable to load the booklet. Please try downloading the PDF instead.
              </p>
              <Button asChild data-testid="button-download-fallback">
                <a href={pdfFile} download="DCLM_Combined_Service_8th_Feb_2025.pdf">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        .flipbook-container {
          perspective: 2000px;
        }
        .flipbook-container-fullscreen {
          perspective: 2000px;
        }
        .flipbook-shadow {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
