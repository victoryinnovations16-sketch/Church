import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent } from "../components/UiCard";
import { User, MapPin, Music, DollarSign, Heart, Globe, GraduationCap, Users, Monitor, ClipboardList, Crown } from "lucide-react";
const pastorPeterImage = "/_cdn/static/pastor_peter_1767668593989.jpg";
const pastorVincentImage = "/_cdn/static/pastor_vincent_1767668645688.jpg";
const pastorMosesImage = "/_cdn/static/pastor_moses_1767668685858.jpg";
const pastorNiranImage = "/_cdn/static/pastor_niran_1767668709522.jpg";
const pastorJerryImage = "/_cdn/static/pastor_jerry_1767668751217.jpg";
const pastorNdubuisiImage = "/_cdn/static/pastor_ndubuisi_1767668776644.jpg";
const mummyToniaImage = "/_cdn/static/WhatsApp_Image_2025-12-03_at_19.17.20_1767668807208.jpg";

interface Leader {
  id: number;
  name: string;
  role: string;
  category: 'founder' | 'regional' | 'pastors' | 'coordinators';
  location?: string;
  imageUrl?: string;
}

const leaders: Leader[] = [
  // Founder & Overall Head
  { id: 0, name: "Pastor W.F. Kumuyi", role: "Founder & General Superintendent", category: "founder" },
  
  // Regional Leadership
  { id: 1, name: "Pastor Niran Seriki", role: "Regional Overseer", category: "regional", imageUrl: pastorNiranImage },
  { id: 2, name: "Sister Tonia Seriki", role: "Regional Women Leader", category: "regional", imageUrl: mummyToniaImage },
  
  // Pastors
  { id: 3, name: "Pastor Ndubuisi Njoku", role: "Pastor", category: "pastors", location: "Coventry", imageUrl: pastorNdubuisiImage },
  { id: 4, name: "Pastor Paul Akinwamide", role: "Pastor", category: "pastors", location: "Nottingham" },
  { id: 5, name: "Pastor Peter Adeleke", role: "Pastor", category: "pastors", location: "Leicester", imageUrl: pastorPeterImage },
  { id: 6, name: "Pastor Stephen Jerry Affran", role: "Pastor", category: "pastors", location: "Derby", imageUrl: pastorJerryImage },
  { id: 7, name: "Bro Funminiyi Taiwo", role: "Pastor", category: "pastors", location: "Rugby" },
  { id: 8, name: "Pastor Vincent Owusu", role: "Pastor", category: "pastors", location: "Peterborough", imageUrl: pastorVincentImage },
  { id: 9, name: "Pastor Moses Arilewola", role: "Pastor", category: "pastors", location: "Lincoln", imageUrl: pastorMosesImage },
  { id: 10, name: "Pastor Samuel Olutuase", role: "Pastor", category: "pastors", location: "Loughborough" },
  
  // Key Regional Coordinators
  { id: 19, name: "Bro Silas Duabari", role: "Regional Music Director", category: "coordinators" },
  { id: 21, name: "Bro Nwachukwu Obi", role: "Regional Finance/Account Officer", category: "coordinators" },
  { id: 23, name: "Bro Funminiyi Taiwo", role: "Regional Prayer Coordinator", category: "coordinators" },
  { id: 25, name: "Bro Ezebuihe Nnaedozie", role: "Regional Evangelism Coordinator", category: "coordinators" },
  { id: 27, name: "Sis Victory Olutuase", role: "Regional Children Coordinator", category: "coordinators" },
  { id: 29, name: "Bro Mafel", role: "Regional Campus Coordinator", category: "coordinators" },
  { id: 31, name: "Bro Ayo Owolabi", role: "Regional Youth Coordinator", category: "coordinators" },
  { id: 32, name: "Bro Timothy Akinwale", role: "Regional YPF Coordinator", category: "coordinators" },
  { id: 34, name: "Bro Udeme Umoren", role: "Regional IT/Digital Director", category: "coordinators" },
  { id: 35, name: "Bro David Oluwole", role: "Regional Admin Officer", category: "coordinators" },
];

const getRoleIcon = (role: string) => {
  if (role.includes('Music')) return <Music className="h-5 w-5" />;
  if (role.includes('Finance')) return <DollarSign className="h-5 w-5" />;
  if (role.includes('Prayer')) return <Heart className="h-5 w-5" />;
  if (role.includes('Evangelism')) return <Globe className="h-5 w-5" />;
  if (role.includes('Children')) return <Users className="h-5 w-5" />;
  if (role.includes('Campus')) return <GraduationCap className="h-5 w-5" />;
  if (role.includes('Youth') || role.includes('YPF')) return <Users className="h-5 w-5" />;
  if (role.includes('IT') || role.includes('Digital')) return <Monitor className="h-5 w-5" />;
  if (role.includes('Admin')) return <ClipboardList className="h-5 w-5" />;
  return <User className="h-5 w-5" />;
};

const getInitials = (name: string) => {
  const parts = name.replace(/^(Pastor|Bro|Sis|Mrs\.|Sister|Mummy)\s+/i, '').split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[parts.length - 1][0];
  }
  return parts[0].substring(0, 2).toUpperCase();
};

export default function Leadership() {
  const founder = leaders.filter(l => l.category === 'founder');
  const regionalLeaders = leaders.filter(l => l.category === 'regional');
  const pastors = leaders.filter(l => l.category === 'pastors');
  const coordinators = leaders.filter(l => l.category === 'coordinators');

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-leadership-heading">
              Leadership Team
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Meet the dedicated leaders serving DCLM East Midlands Region
            </p>
          </div>
        </section>

        {/* Founder & Overall Head */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Founder & General Superintendent</h2>
              <p className="text-slate-400">The visionary leader of Deeper Christian Life Ministry worldwide</p>
            </div>
            <div className="max-w-md mx-auto">
              {founder.map((leader) => (
                <Card key={leader.id} className="bg-gradient-to-br from-slate-800 to-slate-700 border-blue-500/30 border-2" data-testid={`card-leader-${leader.id}`}>
                  <CardContent className="pt-8 pb-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-white text-3xl font-bold mb-4 ring-4 ring-yellow-500/30">
                        {leader.imageUrl ? (
                          <img src={leader.imageUrl} alt={leader.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <Crown className="h-12 w-12" />
                        )}
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2">{leader.name}</h3>
                      <p className="text-yellow-400 font-medium text-lg">{leader.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Leadership */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Regional Leadership</h2>
              <p className="text-slate-400">The overseers of DCLM East Midlands Region</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {regionalLeaders.map((leader) => (
                <Card key={leader.id} className="bg-slate-800 border-slate-700" data-testid={`card-leader-${leader.id}`}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold mb-4">
                        {leader.imageUrl ? (
                          <img src={leader.imageUrl} alt={leader.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          getInitials(leader.name)
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-1">{leader.name}</h3>
                      <p className="text-blue-400 font-medium">{leader.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Church Pastors */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Church Pastors</h2>
              <p className="text-slate-400">Our pastors leading each church location</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {pastors.map((leader) => (
                <Card key={leader.id} className="bg-slate-800 border-slate-700" data-testid={`card-leader-${leader.id}`}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-xl font-bold mb-4">
                        {leader.imageUrl ? (
                          <img src={leader.imageUrl} alt={leader.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          getInitials(leader.name)
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{leader.name}</h3>
                      <div className="flex items-center gap-1 text-green-400 text-sm">
                        <MapPin className="h-3 w-3" />
                        {leader.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Regional Coordinators */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Key Regional Coordinators</h2>
              <p className="text-slate-400">Leaders coordinating various regional ministries and departments</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {coordinators.map((leader) => (
                <Card key={leader.id} className="bg-slate-800 border-slate-700" data-testid={`card-leader-${leader.id}`}>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {leader.imageUrl ? (
                          <img src={leader.imageUrl} alt={leader.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          getInitials(leader.name)
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">{leader.name}</h3>
                        <div className="flex items-center gap-1 text-purple-400 text-xs">
                          {getRoleIcon(leader.role)}
                          <span className="truncate">{leader.role}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
