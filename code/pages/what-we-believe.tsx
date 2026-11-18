import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent } from "../components/UiCard";
import { BookOpen, Heart, Cross, Flame, Users, Globe, Crown, Shield } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/UiPopover";
const doctrinesImage = "/_cdn/static/WhatsApp_Image_2026-01-20_at_21.13.58_1768948070096.jpg";

interface DoctrineHotspot {
  name: string;
  description: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

const doctrineHotspots: DoctrineHotspot[] = [
  { name: "Christ's Millennial Reign", description: "Christ will reign on earth for a thousand years, bringing peace and righteousness.", top: "1%", left: "33%", width: "20%", height: "5%" },
  { name: "The Great White Throne Judgement", description: "The final judgment where all unbelievers will stand before God and be judged according to their works.", top: "5%", left: "55%", width: "24%", height: "5%" },
  { name: "The New Heaven and the New Earth", description: "God will create a new heaven and new earth where righteousness dwells eternally.", top: "9%", left: "20%", width: "26%", height: "5%" },
  { name: "Total Depravity, Sinfulness, and Guilt of Men", description: "All humanity has sinned and fallen short of God's glory, totally depraved and unable to save themselves.", top: "14%", left: "40%", width: "28%", height: "5%" },
  { name: "The Resurrection of the Dead", description: "All the dead will be raised—believers to eternal life and unbelievers to eternal condemnation.", top: "20%", left: "30%", width: "22%", height: "5%" },
  { name: "The Second Coming of Christ", description: "The visible, bodily return of Christ to earth to establish His millennial kingdom.", top: "20%", left: "52%", width: "20%", height: "5%" },
  { name: "Holy Ghost Baptism", description: "The baptism of the Holy Spirit is a definite experience subsequent to salvation, empowering believers for service.", top: "26%", left: "6%", width: "16%", height: "5%" },
  { name: "Entire Sanctification", description: "A second definite work of grace where believers are cleansed from inbred sin and empowered to live holy lives.", top: "27%", left: "38%", width: "18%", height: "5%" },
  { name: "Hell", description: "A place of eternal punishment and separation from God for those who reject Christ.", top: "27%", left: "61%", width: "8%", height: "4%" },
  { name: "The Rapture", description: "The imminent return of Christ to catch away His Church, both the living and the dead in Christ.", top: "33%", left: "1%", width: "14%", height: "5%" },
  { name: "The Great Tribulation", description: "A period of unprecedented trouble and God's judgment upon the earth after the rapture of the Church.", top: "31%", left: "79%", width: "18%", height: "5%" },
  { name: "Repentance", description: "A complete turning from sin to God, involving godly sorrow and a change of heart, mind, and direction.", top: "40%", left: "10%", width: "14%", height: "5%" },
  { name: "The God Head", description: "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit, co-equal and co-eternal.", top: "40%", left: "42%", width: "16%", height: "5%" },
  { name: "Marriage", description: "Marriage is a sacred covenant between one man and one woman, instituted by God.", top: "40%", left: "75%", width: "14%", height: "5%" },
  { name: "The Holy Bible", description: "The Bible is the inspired, infallible, and authoritative Word of God, our final authority in all matters of faith and practice.", top: "48%", left: "14%", width: "14%", height: "5%" },
  { name: "The Virgin Birth of Jesus", description: "Jesus Christ was conceived by the Holy Spirit and born of the Virgin Mary, both fully God and fully man.", top: "46%", left: "60%", width: "20%", height: "5%" },
  { name: "Restitution", description: "Making amends for past wrongs where possible, restoring what was taken or damaged.", top: "54%", left: "22%", width: "14%", height: "5%" },
  { name: "Justification", description: "Being declared righteous before God through faith in Jesus Christ, apart from works of the law.", top: "52%", left: "66%", width: "14%", height: "5%" },
  { name: "Redemption, Healing and Health", description: "Christ's atoning work provides for the healing of our bodies as well as our souls.", top: "60%", left: "0%", width: "20%", height: "5%" },
  { name: "Water Baptism", description: "Believer's baptism by immersion in water, symbolizing death to sin and resurrection to new life in Christ.", top: "60%", left: "80%", width: "16%", height: "5%" },
  { name: "The Lord's Supper", description: "A memorial ordinance where believers partake of bread and wine in remembrance of Christ's sacrifice.", top: "68%", left: "12%", width: "16%", height: "5%" },
  { name: "Personal Evangelism", description: "Every believer is called to share the Gospel and win souls to Christ through personal witness.", top: "68%", left: "64%", width: "18%", height: "5%" },
];

export default function WhatWeBelieve() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-beliefs-heading">
              What We Believe
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Our Statement of Faith - The foundational truths that guide our church and ministry.
            </p>
          </div>
        </section>

        {/* Doctrines Diagram Section */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Doctrines</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Click or tap on each doctrine label in the diagram to learn more about what we believe.
              </p>
            </div>
            
            {/* Interactive Doctrines Diagram */}
            <div className="max-w-5xl mx-auto relative">
              <img 
                src={doctrinesImage} 
                alt="DCLM Doctrines" 
                className="w-full rounded-xl shadow-lg"
              />
              
              {/* Hotspot Overlays - Click/tap friendly */}
              {doctrineHotspots.map((hotspot, index) => (
                <Popover key={index}>
                  <PopoverTrigger asChild>
                    <button 
                      className="absolute cursor-pointer hover:bg-white/20 active:bg-white/30 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                      style={{
                        top: hotspot.top,
                        left: hotspot.left,
                        width: hotspot.width,
                        height: hotspot.height,
                      }}
                      data-testid={`hotspot-${index}`}
                      aria-label={hotspot.name}
                    />
                  </PopoverTrigger>
                  <PopoverContent 
                    side="top" 
                    className="max-w-xs bg-slate-800 border-slate-600 text-slate-200 p-4 z-50"
                    sideOffset={5}
                  >
                    <p className="font-semibold text-white mb-2">{hotspot.name}</p>
                    <p className="text-sm">{hotspot.description}</p>
                  </PopoverContent>
                </Popover>
              ))}
            </div>

            <p className="text-center text-slate-500 text-sm mt-4">
              Click or tap on the doctrine labels in the image above to see descriptions
            </p>
          </div>
        </section>

        {/* Core Beliefs */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Core Beliefs Explained</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                These are the essential doctrines we hold dear and teach faithfully.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-slate-800 border-slate-700" data-testid="card-bible">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <BookOpen className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">The Bible</h3>
                      <p className="text-slate-400">
                        We believe the Bible is the inspired, infallible, and authoritative Word of God. 
                        It is our final authority in all matters of faith, doctrine, and practice. 
                        We are committed to systematic, expository teaching of Scripture.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700" data-testid="card-god">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Crown className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">The Trinity</h3>
                      <p className="text-slate-400">
                        We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit. 
                        These three are co-equal and co-eternal, united in purpose and nature.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700" data-testid="card-jesus">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/20 rounded-lg">
                      <Cross className="h-8 w-8 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Jesus Christ</h3>
                      <p className="text-slate-400">
                        We believe in the deity of Jesus Christ, His virgin birth, sinless life, atoning death, 
                        bodily resurrection, ascension, and His coming return in power and glory.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700" data-testid="card-salvation">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <Shield className="h-8 w-8 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Salvation</h3>
                      <p className="text-slate-400">
                        We believe salvation is by grace through faith in Jesus Christ alone. 
                        It is received through repentance and personal acceptance of Christ as Lord and Savior.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700" data-testid="card-holiness">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Heart className="h-8 w-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Holiness</h3>
                      <p className="text-slate-400">
                        We believe in practical holiness—living set apart for God in thought, word, and deed. 
                        Christians are called to live a life of purity and separation from worldliness.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700" data-testid="card-spirit">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-500/20 rounded-lg">
                      <Flame className="h-8 w-8 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">The Holy Spirit</h3>
                      <p className="text-slate-400">
                        We believe in the present ministry of the Holy Spirit, who indwells believers, 
                        empowers them for Christian living and service, and produces spiritual fruit.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700" data-testid="card-church">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-lg">
                      <Users className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">The Church</h3>
                      <p className="text-slate-400">
                        We believe the Church is the body of Christ, composed of all true believers. 
                        The local church is essential for worship, fellowship, teaching, and service.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700" data-testid="card-return">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-lg">
                      <Globe className="h-8 w-8 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">The Second Coming</h3>
                      <p className="text-slate-400">
                        We believe in the personal, visible return of Jesus Christ to establish His Kingdom. 
                        We live with eternity in view, preparing for His imminent return.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Our Commitment</h2>
              <div className="bg-gradient-to-br from-blue-900/50 to-slate-800 rounded-xl p-8 border border-blue-500/30">
                <p className="text-xl text-slate-300 italic mb-6">
                  "Your spiritual welfare is our concern"
                </p>
                <p className="text-slate-400 leading-relaxed">
                  At DCLM East Midlands, we are committed to teaching the whole counsel of God, 
                  maintaining the purity of the gospel, and helping every believer grow to spiritual maturity. 
                  We believe in Bible-centered preaching, fervent prayer, and practical holiness as the 
                  foundation for a vibrant Christian life.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
