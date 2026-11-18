import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Heart, CreditCard, Building2, Download } from "lucide-react";
const giftAidForm = "/_cdn/static/CHARITY_GIFT_AID_DECLARATION_FORM_1767636652590.pdf";

export default function Donate() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="container mx-auto px-4 text-center">
            <Heart className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-donate-title">
              Support Our Ministry
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Your generous giving helps us spread the Gospel, support our community, and expand God's Kingdom across the East Midlands.
            </p>
          </div>
        </section>

        {/* Giving Options */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white mb-4" data-testid="text-ways-to-give">
                Ways to Give
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Choose the giving method that works best for you. Every contribution makes a difference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Bank Transfer */}
              <Card className="bg-slate-800 border-slate-700" data-testid="card-bank-transfer">
                <CardHeader className="text-center">
                  <Building2 className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Bank Transfer</CardTitle>
                  <CardDescription className="text-slate-400">
                    Direct bank transfer to our account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="text-slate-400 text-sm">Account Name:</span>
                      <span className="text-white text-sm font-medium">DEEPER CHRISTIAN LIFE MINISTRY, EAST MIDLANDS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Sort Code:</span>
                      <span className="text-white text-sm font-medium">20-12-26</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Account No:</span>
                      <span className="text-white text-sm font-medium">83252868</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 text-center">
                    Please use your name as the payment reference
                  </p>
                </CardContent>
              </Card>

              {/* Online Giving */}
              <Card className="bg-slate-800 border-slate-700" data-testid="card-online-giving">
                <CardHeader className="text-center">
                  <CreditCard className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Online Giving</CardTitle>
                  <CardDescription className="text-slate-400">
                    Secure online payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm text-center">
                    Give securely online using your debit or credit card through our payment partner.
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    data-testid="button-give-online"
                  >
                    Give Online
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    Secure payment powered by Stripe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Scripture Quote */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <blockquote className="text-2xl italic text-slate-300 mb-4">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
            </blockquote>
            <cite className="text-blue-400 font-medium">— 2 Corinthians 9:7</cite>
          </div>
        </section>

        {/* Gift Aid */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-semibold text-white mb-4" data-testid="text-gift-aid">
                Gift Aid
              </h2>
              <p className="text-slate-300 mb-6">
                If you are a UK taxpayer, you can increase your donation by 25% at no extra cost to you through Gift Aid. 
                For every £1 you give, we can claim an extra 25p from HMRC.
              </p>
              <Card className="bg-slate-800 border-slate-700 text-left">
                <CardContent className="p-6 space-y-4">
                  <p className="text-slate-300 text-sm">
                    To enable Gift Aid on your donations, kindly download the Gift Aid declaration form and send to{" "}
                    <a 
                      href="mailto:dclmeastmidlands@gmail.com" 
                      className="text-blue-400 hover:underline"
                    >
                      dclmeastmidlands@gmail.com
                    </a>
                  </p>
                  <Button 
                    asChild 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    data-testid="button-download-gift-aid"
                  >
                    <a href={giftAidForm} download="DCLM_Gift_Aid_Declaration_Form.pdf">
                      <Download className="mr-2 h-4 w-4" />
                      Download Gift Aid Form
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact for Questions */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Questions About Giving?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're here to help. Reach out to us with any questions about donations or financial contributions.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50"
              asChild
              data-testid="button-contact-us"
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
