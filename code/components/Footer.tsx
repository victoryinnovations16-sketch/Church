import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Clock } from "lucide-react";
import { SiTiktok } from "react-icons/si";
const logoImage = "/_cdn/static/logo_1767634535083.png";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="lg:col-span-1">
            <img 
              src={logoImage} 
              alt="Deeper Life Bible Church - East Midlands Region, UK" 
              className="h-20 w-auto mb-3"
              data-testid="img-footer-logo"
            />
            <div className="mb-3">
              <p className="text-white font-semibold text-sm">Deeper Christian Life Ministry</p>
              <p className="text-slate-400 text-xs">East Midlands, UK</p>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Your spiritual welfare is our concern. We are a Heaven-focused community committed to helping you walk with God.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/DCLMEastMidlandsUK/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors" 
                aria-label="Facebook" 
                data-testid="link-footer-facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/dclm_eastmidlandsuk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-colors" 
                aria-label="Instagram" 
                data-testid="link-footer-instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://www.youtube.com/@dclmeastmidlandsuk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-colors" 
                aria-label="Youtube" 
                data-testid="link-footer-youtube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@DCLM_EastMidlandsUK" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" 
                aria-label="TikTok" 
                data-testid="link-footer-tiktok"
              >
                <SiTiktok className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white" data-testid="text-footer-quick-links">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" data-testid="link-footer-home">
                  <span className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/about" data-testid="link-footer-about">
                  <span className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/locations" data-testid="link-footer-locations">
                  <span className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">
                    Our Locations
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/events" data-testid="link-footer-events">
                  <span className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">
                    Events
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/sermons" data-testid="link-footer-sermons">
                  <span className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">
                    GCK Sermons
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/donate" data-testid="link-footer-donate">
                  <span className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">
                    Donate
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white" data-testid="text-footer-services">Service Times</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Sunday Worship</p>
                  <p className="text-slate-400 text-sm">9:30 AM - 11:30 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Tuesday Bible Study</p>
                  <p className="text-slate-400 text-sm">6:00 PM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Friday Revival</p>
                  <p className="text-slate-400 text-sm">6:00 PM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white" data-testid="text-footer-contact">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  East Midlands Region, United Kingdom
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a 
                  href="mailto:dclmeastmidlands@gmail.com" 
                  className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
                  data-testid="link-footer-email"
                >
                  dclmeastmidlands@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  Contact your local church
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/contact">
                <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors cursor-pointer" data-testid="link-footer-contact-btn">
                  Get in Touch
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left" data-testid="text-footer-copyright">
            © {new Date().getFullYear()} Deeper Life Bible Church East Midlands. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/prayer" data-testid="link-footer-prayer">
              <span className="text-slate-500 text-sm hover:text-blue-400 cursor-pointer transition-colors">
                Prayer Request
              </span>
            </Link>
            <Link to="/gallery" data-testid="link-footer-gallery">
              <span className="text-slate-500 text-sm hover:text-blue-400 cursor-pointer transition-colors">
                Gallery
              </span>
            </Link>
            <Link to="/admin" data-testid="link-footer-admin">
              <span className="text-slate-500 text-sm hover:text-blue-400 cursor-pointer transition-colors">
                Admin
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
