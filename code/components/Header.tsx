import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./UiButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./UiNavigationMenu";
import { Menu, X, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
const logoImage = "/_cdn/static/logo_1767634535083.png";
import type { Location as ChurchLocation } from "../helpers/siteSchema";

export function Header() {
  const currentPath = useLocation().pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  const { data: locations = [] } = useQuery<ChurchLocation[]>({
    queryKey: ["/api/locations"],
  });

  const toggleMobileSubmenu = (label: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 bg-[#131d2e45]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                src={logoImage} 
                alt="Deeper Life Bible Church - East Midlands Region, UK" 
                className="h-14 w-auto"
                data-testid="img-logo"
              />
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-sm leading-tight">Deeper Christian Life Ministry</p>
                <p className="text-slate-400 text-xs">East Midlands, UK</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {/* Home */}
                <NavigationMenuItem>
                  <Link to="/" data-testid="link-home-nav">
                    <span className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-blue-400 cursor-pointer ${
                      currentPath === "/" ? "text-blue-400" : "text-slate-300"
                    }`}>
                      Home
                    </span>
                  </Link>
                </NavigationMenuItem>

                {/* About Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`bg-transparent text-sm font-medium transition-colors hover:text-blue-400 hover:bg-slate-800 ${
                      ["/about", "/ministry", "/what-we-believe", "/leadership"].includes(currentPath) ? "text-blue-400" : "text-slate-300"
                    }`}
                    data-testid="dropdown-about"
                  >
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-1 p-2 bg-slate-800 border border-slate-700">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/about">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/about" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-about-overview"
                            >
                              <div className="text-sm font-medium text-white">About Us</div>
                              <p className="text-xs text-slate-400 mt-1">Learn about our church</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/ministry">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/ministry" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-ministry"
                            >
                              <div className="text-sm font-medium text-white">Ministry</div>
                              <p className="text-xs text-slate-400 mt-1">Our ministries and outreach</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/what-we-believe">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/what-we-believe" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-what-we-believe"
                            >
                              <div className="text-sm font-medium text-white">What We Believe</div>
                              <p className="text-xs text-slate-400 mt-1">Our statement of faith</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/leadership">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/leadership" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-leadership"
                            >
                              <div className="text-sm font-medium text-white">Leadership Team</div>
                              <p className="text-xs text-slate-400 mt-1">Meet our pastors and leaders</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Locations Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`bg-transparent text-sm font-medium transition-colors hover:text-blue-400 hover:bg-slate-800 ${
                      currentPath === "/locations" ? "text-blue-400" : "text-slate-300"
                    }`}
                    data-testid="dropdown-locations"
                  >
                    Locations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[320px] gap-1 p-2 bg-slate-800 border border-slate-700">
                      {locations.map((loc) => {
                        const slug = loc.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        return (
                          <li key={loc.id}>
                            <NavigationMenuLink asChild>
                              <Link to={`/locations/${slug}`}>
                                <div
                                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer"
                                  data-testid={`link-location-${loc.id}`}
                                >
                                  <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="text-sm font-medium text-white">{loc.name}</div>
                                      <p className="text-xs text-slate-400 mt-1">{loc.serviceTime}</p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                      <li className="border-t border-slate-700 mt-1 pt-1">
                        <NavigationMenuLink asChild>
                          <Link to="/locations">
                            <div 
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer text-center"
                              data-testid="link-view-all-locations"
                            >
                              <span className="text-sm font-medium text-blue-400">View All Locations</span>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Events Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`bg-transparent text-sm font-medium transition-colors hover:text-blue-400 hover:bg-slate-800 ${
                      ["/events", "/yearly-calendar"].includes(currentPath) ? "text-blue-400" : "text-slate-300"
                    }`}
                    data-testid="dropdown-events"
                  >
                    Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-1 p-2 bg-slate-800 border border-slate-700">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/events">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/events" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-upcoming-events"
                            >
                              <div className="text-sm font-medium text-white">Upcoming Events</div>
                              <p className="text-xs text-slate-400 mt-1">View our upcoming church events</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/yearly-calendar">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/yearly-calendar" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-yearly-calendar"
                            >
                              <div className="text-sm font-medium text-white">Yearly Calendar</div>
                              <p className="text-xs text-slate-400 mt-1">View our annual event calendar</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Connect Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`bg-transparent text-sm font-medium transition-colors hover:text-blue-400 hover:bg-slate-800 ${
                      ["/contact", "/prayer"].includes(currentPath) ? "text-blue-400" : "text-slate-300"
                    }`}
                    data-testid="dropdown-connect"
                  >
                    Connect
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-1 p-2 bg-slate-800 border border-slate-700">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/contact">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/contact" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-contact-us"
                            >
                              <div className="text-sm font-medium text-white">Contact Us</div>
                              <p className="text-xs text-slate-400 mt-1">Get in touch with us</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/prayer">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/prayer" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-prayer-request"
                            >
                              <div className="text-sm font-medium text-white">Prayer Request</div>
                              <p className="text-xs text-slate-400 mt-1">Submit a prayer request</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Media Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`bg-transparent text-sm font-medium transition-colors hover:text-blue-400 hover:bg-slate-800 ${
                      ["/watch-live", "/sermons", "/gallery", "/programme-booklets"].includes(currentPath) ? "text-blue-400" : "text-slate-300"
                    }`}
                    data-testid="dropdown-media"
                  >
                    Media
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-1 p-2 bg-slate-800 border border-slate-700">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/watch-live">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/watch-live" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-watch-live-dropdown"
                            >
                              <div className="text-sm font-medium text-white">Watch Live</div>
                              <p className="text-xs text-slate-400 mt-1">Join our live services</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/sermons">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/sermons" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-gck-sermons"
                            >
                              <div className="text-sm font-medium text-white">GCK Sermons</div>
                              <p className="text-xs text-slate-400 mt-1">Browse sermon archive</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/gallery">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/gallery" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-gallery"
                            >
                              <div className="text-sm font-medium text-white">Gallery</div>
                              <p className="text-xs text-slate-400 mt-1">View our photo gallery</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/programme-booklets">
                            <div 
                              className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 cursor-pointer ${
                                currentPath === "/programme-booklets" ? "bg-slate-700" : ""
                              }`}
                              data-testid="link-programme-booklets"
                            >
                              <div className="text-sm font-medium text-white">Programme Booklets</div>
                              <p className="text-xs text-slate-400 mt-1">Download programme booklets</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Devotional */}
                <NavigationMenuItem>
                  <Link to="/devotional" data-testid="link-devotional-nav">
                    <span className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-blue-400 cursor-pointer ${
                      currentPath === "/devotional" ? "text-blue-400" : "text-slate-300"
                    }`}>
                      Devotional
                    </span>
                  </Link>
                </NavigationMenuItem>

                {/* Donate */}
                <NavigationMenuItem>
                  <Link to="/donate" data-testid="link-donate">
                    <span className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-blue-400 cursor-pointer ${
                      currentPath === "/donate" ? "text-blue-400" : "text-slate-300"
                    }`}>
                      Donate
                    </span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link to="/watch-live">
              <Button size="sm" className="ml-4 bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-watch-live">
                Watch Live
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-2 border-t border-slate-700">
            {/* Home */}
            <Link to="/" data-testid="link-mobile-home">
              <div
                className={`block py-2 px-2 text-sm font-medium transition-colors hover:text-blue-400 cursor-pointer ${
                  currentPath === "/" ? "text-blue-400" : "text-slate-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </div>
            </Link>

            {/* About Dropdown */}
            <div>
              <button
                className={`w-full flex items-center justify-between py-2 px-2 text-sm font-medium transition-colors hover:text-blue-400 ${
                  ["/about", "/ministry", "/what-we-believe", "/leadership"].includes(currentPath) ? "text-blue-400" : "text-slate-300"
                }`}
                onClick={() => toggleMobileSubmenu("About")}
                data-testid="button-mobile-about"
              >
                About
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenuOpen === "About" ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenuOpen === "About" && (
                <div className="pl-4 space-y-1 mt-1">
                  <Link to="/about">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/about" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-about-overview"
                    >
                      About Us
                    </div>
                  </Link>
                  <Link to="/ministry">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/ministry" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-ministry"
                    >
                      Ministry
                    </div>
                  </Link>
                  <Link to="/what-we-believe">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/what-we-believe" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-what-we-believe"
                    >
                      What We Believe
                    </div>
                  </Link>
                  <Link to="/leadership">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/leadership" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-leadership"
                    >
                      Leadership Team
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div>
              <button
                className={`w-full flex items-center justify-between py-2 px-2 text-sm font-medium transition-colors hover:text-blue-400 ${
                  currentPath === "/locations" ? "text-blue-400" : "text-slate-300"
                }`}
                onClick={() => toggleMobileSubmenu("Locations")}
                data-testid="button-mobile-locations"
              >
                Locations
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenuOpen === "Locations" ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenuOpen === "Locations" && (
                <div className="pl-4 space-y-1 mt-1">
                  {locations.map((loc) => {
                    const slug = loc.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    return (
                      <Link key={loc.id} href={`/locations/${slug}`}>
                        <div
                          className="flex items-center gap-2 py-2 px-2 text-sm transition-colors hover:text-blue-400 text-slate-400 cursor-pointer"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`link-mobile-location-${loc.id}`}
                        >
                          <MapPin className="h-3 w-3" />
                          {loc.name}
                        </div>
                      </Link>
                    );
                  })}
                  <Link to="/locations">
                    <div
                      className="block py-2 px-2 text-sm transition-colors text-blue-400 hover:text-blue-300 cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-view-all-locations"
                    >
                      View All Locations
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Events Dropdown */}
            <div>
              <button
                className={`w-full flex items-center justify-between py-2 px-2 text-sm font-medium transition-colors hover:text-blue-400 ${
                  ["/events", "/yearly-calendar"].includes(currentPath) ? "text-blue-400" : "text-slate-300"
                }`}
                onClick={() => toggleMobileSubmenu("Events")}
                data-testid="button-mobile-events"
              >
                Events
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenuOpen === "Events" ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenuOpen === "Events" && (
                <div className="pl-4 space-y-1 mt-1">
                  <Link to="/events">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/events" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-upcoming-events"
                    >
                      Upcoming Events
                    </div>
                  </Link>
                  <Link to="/yearly-calendar">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/yearly-calendar" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-yearly-calendar"
                    >
                      Yearly Calendar
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Connect Dropdown */}
            <div>
              <button
                className={`w-full flex items-center justify-between py-2 px-2 text-sm font-medium transition-colors hover:text-blue-400 ${
                  ["/contact", "/prayer"].includes(currentPath) ? "text-blue-400" : "text-slate-300"
                }`}
                onClick={() => toggleMobileSubmenu("Connect")}
                data-testid="button-mobile-connect"
              >
                Connect
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenuOpen === "Connect" ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenuOpen === "Connect" && (
                <div className="pl-4 space-y-1 mt-1">
                  <Link to="/contact">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/contact" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-contact"
                    >
                      Contact Us
                    </div>
                  </Link>
                  <Link to="/prayer">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/prayer" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-prayer"
                    >
                      Prayer Request
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Media Dropdown */}
            <div>
              <button
                className={`w-full flex items-center justify-between py-2 px-2 text-sm font-medium transition-colors hover:text-blue-400 ${
                  ["/watch-live", "/sermons", "/gallery", "/programme-booklets"].includes(currentPath) ? "text-blue-400" : "text-slate-300"
                }`}
                onClick={() => toggleMobileSubmenu("Media")}
                data-testid="button-mobile-media"
              >
                Media
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenuOpen === "Media" ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenuOpen === "Media" && (
                <div className="pl-4 space-y-1 mt-1">
                  <Link to="/watch-live">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/watch-live" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-watch-live"
                    >
                      Watch Live
                    </div>
                  </Link>
                  <Link to="/sermons">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/sermons" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-sermons"
                    >
                      GCK Sermons
                    </div>
                  </Link>
                  <Link to="/gallery">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/gallery" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-gallery"
                    >
                      Gallery
                    </div>
                  </Link>
                  <Link to="/programme-booklets">
                    <div
                      className={`block py-2 px-2 text-sm transition-colors hover:text-blue-400 cursor-pointer ${
                        currentPath === "/programme-booklets" ? "text-blue-400" : "text-slate-400"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="link-mobile-programme-booklets"
                    >
                      Programme Booklets
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Devotional */}
            <Link to="/devotional" data-testid="link-mobile-devotional">
              <div
                className={`block py-2 px-2 text-sm font-medium transition-colors hover:text-blue-400 cursor-pointer ${
                  currentPath === "/devotional" ? "text-blue-400" : "text-slate-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Devotional
              </div>
            </Link>

            {/* Donate */}
            <Link to="/donate" data-testid="link-mobile-donate">
              <div
                className={`block py-2 px-2 text-sm font-medium transition-colors hover:text-blue-400 cursor-pointer ${
                  currentPath === "/donate" ? "text-blue-400" : "text-slate-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate
              </div>
            </Link>

            <Link to="/watch-live">
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-watch-live-mobile">
                Watch Live
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
