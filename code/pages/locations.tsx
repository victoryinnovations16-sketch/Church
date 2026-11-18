import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Badge } from "../components/UiBadge";
import { Clock, MapPin, Users, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Location as ChurchLocation } from "../helpers/siteSchema";
import { Skeleton } from "../components/UiSkeleton";
import { useState } from "react";

export default function Locations() {
  const [filter, setFilter] = useState<string>("all");
  
  const { data: locations = [], isLoading } = useQuery<ChurchLocation[]>({
    queryKey: ["/api/locations"],
  });

  const serviceTimeFilters = [
    { label: "All Locations", value: "all" },
    { label: "9:30 AM", value: "9:30" },
    { label: "10:00 AM", value: "10:00" },
    { label: "10:30 AM", value: "10:30" },
    { label: "11:00 AM", value: "11:00" },
    { label: "11:30 AM", value: "11:30" },
  ];

  const filteredLocations = filter === "all" 
    ? locations 
    : locations.filter(loc => loc.serviceTime?.includes(filter));

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-locations-page-heading">
              Our Church Locations
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              We gather small so we can experience God personally. Find a location near you across the East Midlands.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-slate-900 border-b border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {serviceTimeFilters.map((item) => (
                <Button
                  key={item.value}
                  variant={filter === item.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(item.value)}
                  className={filter === item.value 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }
                  data-testid={`filter-${item.value}`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">
              Showing {filteredLocations.length} of {locations.length} locations
            </p>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="bg-slate-800 border-slate-700">
                    <Skeleton className="h-48 w-full rounded-t-lg bg-slate-700" />
                    <CardHeader>
                      <Skeleton className="h-6 w-2/3 bg-slate-700" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-16 w-full bg-slate-700" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredLocations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredLocations.map((location) => (
                  <Card 
                    key={location.id} 
                    className="bg-slate-800 border-slate-700 hover-elevate overflow-hidden flex flex-col" 
                    data-testid={`card-location-${location.id}`}
                  >
                    {/* Image or Placeholder */}
                    <div className="h-48 overflow-hidden relative">
                      {location.imageUrl ? (
                        <img 
                          src={location.imageUrl} 
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                          <MapPin className="h-16 w-16 text-white/50" />
                        </div>
                      )}
                      <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                        in-person
                      </Badge>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-white" data-testid={`text-location-name-${location.id}`}>
                        {location.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-3">
                      <p className="text-slate-300 text-sm">
                        {location.description}
                      </p>
                      
                      <div className="pt-2 space-y-2">
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300 bg-blue-500/10">
                          Sunday Service
                        </Badge>
                        
                        <div className="flex items-center text-slate-400">
                          <Clock className="h-4 w-4 mr-2 text-blue-400 flex-shrink-0" />
                          <span className="text-sm font-medium" data-testid={`text-location-time-${location.id}`}>
                            {location.serviceTime}
                          </span>
                        </div>
                        
                        <div className="flex items-start text-slate-400">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-400 flex-shrink-0" />
                          <span className="text-sm" data-testid={`text-location-address-${location.id}`}>
                            {location.address}
                          </span>
                        </div>
                        
                        {location.capacity && (
                          <div className="flex items-center text-slate-400">
                            <Users className="h-4 w-4 mr-2 text-blue-400 flex-shrink-0" />
                            <span className="text-sm" data-testid={`text-location-capacity-${location.id}`}>
                              Up to {location.capacity} people
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0 gap-2 flex-wrap">
                      {location.mapUrl && (
                        <Button 
                          size="sm" 
                          asChild 
                          className="bg-blue-600 hover:bg-blue-700 text-white flex-1" 
                          data-testid={`button-directions-${location.id}`}
                        >
                          <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                            <MapPin className="mr-1 h-4 w-4" />
                            Get Directions
                          </a>
                        </Button>
                      )}
                      {location.contactEmail && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild 
                          className="border-slate-600 text-slate-200 hover:bg-slate-700" 
                          data-testid={`button-contact-${location.id}`}
                        >
                          <a href={`mailto:${location.contactEmail}`}>
                            <Mail className="mr-1 h-4 w-4" />
                            Contact
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <MapPin className="h-16 w-16 mx-auto text-slate-600 mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2" data-testid="text-no-locations-heading">
                    No Locations Found
                  </h3>
                  <p className="text-slate-400" data-testid="text-no-locations-message">
                    {filter !== "all" 
                      ? "No locations match this service time. Try a different filter."
                      : "Location information will be available soon. Check back later!"
                    }
                  </p>
                  {filter !== "all" && (
                    <Button 
                      variant="outline" 
                      className="mt-4 border-slate-600 text-slate-200"
                      onClick={() => setFilter("all")}
                    >
                      View All Locations
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
