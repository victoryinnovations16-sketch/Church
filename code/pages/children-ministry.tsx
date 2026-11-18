import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Badge } from "../components/UiBadge";
import { Baby, BookOpen, Heart, Star, Music, Gamepad2, Users, Calendar, Clock, Video, Sparkles, Palette, Trophy, Sun, BookMarked, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/UiCollapsible";
const childrenLogo = "/_cdn/static/Screenshot_2026-01-21_at_00.35.57_1768956083591.jpg";
const bibleStudyImage = "/_cdn/static/WhatsApp_Image_2026-01-20_at_12.47.08_1768956014853.jpg";
const heroImage1 = "/_cdn/static/WhatsApp_Image_2026-01-18_at_18.28.48_1768956744255.jpg";
const heroImage2 = "/_cdn/static/WhatsApp_Image_2026-01-18_at_18.35.40_1768956774751.jpg";
const goingPlacesImage = "/_cdn/static/kids_spreading_gospel_cartoon.jpg";
const faithfulTomImage = "/_cdn/static/faithful_tom_story_illustration.jpg";
const davidGoliathImage = "/_cdn/static/david_and_goliath_cartoon.jpg";
const noahArkImage = "/_cdn/static/noahs_ark_cartoon.jpg";
const danielLionsImage = "/_cdn/static/daniel_in_lions_den_cartoon.jpg";
const jonahWhaleImage = "/_cdn/static/jonah_and_whale_cartoon.jpg";
const goodSamaritanImage = "/_cdn/static/good_samaritan_cartoon.jpg";
const charadesImage = "/_cdn/static/bible_charades_game_cartoon.jpg";
const scavengerImage = "/_cdn/static/scavenger_hunt_cartoon.jpg";
const bingoImage = "/_cdn/static/bible_bingo_cartoon.jpg";
const sortingImage = "/_cdn/static/noah_ark_sorting_game.jpg";
const puzzleImage = "/_cdn/static/bible_verse_puzzle_cartoon.jpg";
const rainbowCraftImage = "/_cdn/static/rainbow_craft_cartoon.jpg";
const prayerHandsImage = "/_cdn/static/prayer_hands_craft_cartoon.jpg";
const sheepBookmarkImage = "/_cdn/static/sheep_bookmark_craft_cartoon.jpg";
const creationCollageImage = "/_cdn/static/creation_collage_craft_cartoon.jpg";
const mustardSeedImage = "/_cdn/static/mustard_seed_jar_craft.jpg";

const activities = [
  { icon: BookOpen, title: "Bible Stories", description: "Exciting stories from the Bible brought to life", color: "from-blue-500 to-blue-600" },
  { icon: Music, title: "Sing Along", description: "Fun worship songs and hymns for children", color: "from-pink-500 to-pink-600" },
  { icon: Gamepad2, title: "Bible Games", description: "Interactive games that teach God's word", color: "from-green-500 to-green-600" },
  { icon: Trophy, title: "Bible Quizzes", description: "Test your knowledge and win prizes", color: "from-yellow-500 to-yellow-600" },
  { icon: Palette, title: "Arts & Crafts", description: "Creative activities to express faith", color: "from-purple-500 to-purple-600" },
  { icon: Sparkles, title: "Memory Verses", description: "Learn and memorize scripture together", color: "from-red-500 to-red-600" },
];

const bibleStoriesImages = [davidGoliathImage, noahArkImage, danielLionsImage, jonahWhaleImage, goodSamaritanImage];
const bibleGamesImages = [charadesImage, scavengerImage, bingoImage, sortingImage, puzzleImage];
const artsCraftsImages = [rainbowCraftImage, prayerHandsImage, sheepBookmarkImage, creationCollageImage, mustardSeedImage];

const bibleStories = [
  {
    title: "David and Goliath",
    summary: "A young shepherd boy defeats a giant with faith in God",
    scripture: "1 Samuel 17",
    lesson: "With God on our side, we can overcome any challenge no matter how big!",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Noah's Ark",
    summary: "God saves Noah and the animals from the great flood",
    scripture: "Genesis 6-9",
    lesson: "When we obey God, He protects us and keeps His promises.",
    color: "from-cyan-400 to-teal-600",
  },
  {
    title: "Daniel in the Lion's Den",
    summary: "Daniel's faith saves him from hungry lions",
    scripture: "Daniel 6",
    lesson: "God rewards those who stay faithful to Him, even in scary situations.",
    color: "from-orange-400 to-red-600",
  },
  {
    title: "Jonah and the Whale",
    summary: "Jonah learns to obey God after being swallowed by a big fish",
    scripture: "Jonah 1-4",
    lesson: "It's always better to obey God the first time!",
    color: "from-indigo-400 to-purple-600",
  },
  {
    title: "The Good Samaritan",
    summary: "Jesus teaches us to love and help everyone",
    scripture: "Luke 10:25-37",
    lesson: "We should show kindness to everyone, even strangers.",
    color: "from-green-400 to-emerald-600",
  },
];

const bibleGames = [
  {
    title: "Bible Character Charades",
    description: "Act out Bible characters while others guess who you are!",
    howToPlay: "One person acts out a Bible character (like Moses, David, or Mary) without speaking, while others try to guess. Take turns and have fun!",
    icon: Users,
  },
  {
    title: "Scripture Scavenger Hunt",
    description: "Find objects around the house that relate to Bible verses!",
    howToPlay: "Parents give clues from Bible verses, and children search for items. For example: 'Find something that gives light' (Matthew 5:14 - You are the light of the world).",
    icon: Sparkles,
  },
  {
    title: "Bible Bingo",
    description: "Match Bible words and pictures on your bingo card!",
    howToPlay: "Create bingo cards with Bible-related pictures or words. As someone calls out items, mark them on your card. First to get 5 in a row wins!",
    icon: Trophy,
  },
  {
    title: "Noah's Ark Sorting",
    description: "Sort animals into pairs just like Noah did!",
    howToPlay: "Use toy animals or picture cards. Sort them into pairs and pretend to load them onto the ark. Count how many pairs you have!",
    icon: Heart,
  },
  {
    title: "Bible Verse Puzzle Race",
    description: "Put Bible verse words in the correct order!",
    howToPlay: "Write a verse on paper, cut it into words, mix them up. Race to arrange the words in the right order. First to complete wins!",
    icon: BookOpen,
  },
];

const bibleQuizzes = [
  {
    question: "Who built the ark?",
    options: ["Abraham", "Noah", "Moses", "David"],
    answer: 1,
    explanation: "Noah built the ark to save his family and the animals from the flood (Genesis 6).",
  },
  {
    question: "How many days was Jonah inside the big fish?",
    options: ["1 day", "2 days", "3 days", "7 days"],
    answer: 2,
    explanation: "Jonah was in the belly of the fish for three days and three nights (Jonah 1:17).",
  },
  {
    question: "What did David use to defeat Goliath?",
    options: ["A sword", "A spear", "A sling and stone", "A bow and arrow"],
    answer: 2,
    explanation: "David used a sling and a stone to defeat the giant Goliath (1 Samuel 17:49).",
  },
  {
    question: "Who was the first man God created?",
    options: ["Noah", "Abraham", "Adam", "Moses"],
    answer: 2,
    explanation: "God created Adam from the dust of the ground (Genesis 2:7).",
  },
  {
    question: "What did Jesus turn into wine at the wedding?",
    options: ["Milk", "Water", "Juice", "Tea"],
    answer: 1,
    explanation: "Jesus performed His first miracle by turning water into wine at a wedding in Cana (John 2:1-11).",
  },
];

const artsCrafts = [
  {
    title: "Rainbow Promise Craft",
    materials: "Paper plates, paint, cotton balls",
    instructions: "Paint a rainbow on a paper plate. Add cotton cloud at the end. Write 'God keeps His promises' on it!",
    bibleConnection: "Genesis 9:13 - God's rainbow promise to Noah",
  },
  {
    title: "Prayer Hands",
    materials: "Construction paper, scissors, crayons",
    instructions: "Trace your hands on paper, cut them out, and glue them together in a praying position. Decorate with your favorite prayer!",
    bibleConnection: "1 Thessalonians 5:17 - Pray without ceasing",
  },
  {
    title: "Good Shepherd Bookmark",
    materials: "Cardstock, markers, wool/yarn",
    instructions: "Cut out a sheep shape, decorate it, add wool for fluffy texture. Write 'The Lord is my Shepherd' on the back!",
    bibleConnection: "Psalm 23:1 - The Lord is my shepherd",
  },
  {
    title: "Creation Collage",
    materials: "Magazine cutouts, glue, large paper",
    instructions: "Cut out pictures of things God created (sun, animals, plants, water). Arrange them on paper to show the 7 days of creation!",
    bibleConnection: "Genesis 1 - God's creation story",
  },
  {
    title: "Mustard Seed Faith Jar",
    materials: "Small jar, mustard seeds, ribbon",
    instructions: "Put mustard seeds in a small jar. Decorate with ribbon. Keep it as a reminder that even small faith can do big things!",
    bibleConnection: "Matthew 17:20 - Faith as small as a mustard seed",
  },
];

const memoryVerses = [
  {
    verse: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    reference: "John 3:16",
    theme: "God's Love",
    color: "from-red-400 to-pink-500",
  },
  {
    verse: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
    theme: "Strength",
    color: "from-blue-400 to-indigo-500",
  },
  {
    verse: "Trust in the Lord with all your heart, and lean not on your own understanding.",
    reference: "Proverbs 3:5",
    theme: "Trust",
    color: "from-green-400 to-teal-500",
  },
  {
    verse: "Be kind to one another, tenderhearted, forgiving one another, even as God in Christ forgave you.",
    reference: "Ephesians 4:32",
    theme: "Kindness",
    color: "from-yellow-400 to-orange-500",
  },
  {
    verse: "Children, obey your parents in the Lord, for this is right.",
    reference: "Ephesians 6:1",
    theme: "Obedience",
    color: "from-purple-400 to-violet-500",
  },
];

const programs = [
  {
    title: "Children's Bible Study",
    schedule: "Every Tuesday @ 4:30 PM",
    venue: "Zoom Meeting",
    zoomId: "83486339797",
    passcode: "EMR2025",
    description: "Bible Games, Quizzes, Films, Sing Along & lots more!",
    ageGroup: "Ages 4-12",
  },
  {
    title: "Sunday Children's Church",
    schedule: "Every Sunday during service",
    venue: "In-person at all locations",
    description: "Full worship experience designed for children with age-appropriate teaching.",
    ageGroup: "Ages 3-12",
  },
];

export default function ChildrenMinistry() {
  const [story1Open, setStory1Open] = useState(false);
  const [story2Open, setStory2Open] = useState(false);
  const [openStories, setOpenStories] = useState<number[]>([]);
  const [openGames, setOpenGames] = useState<number[]>([]);
  const [openCrafts, setOpenCrafts] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number | null}>({});
  const [showQuizResults, setShowQuizResults] = useState<{[key: number]: boolean}>({});

  const toggleStory = (index: number) => {
    setOpenStories(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };
  const toggleGame = (index: number) => {
    setOpenGames(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };
  const toggleCraft = (index: number) => {
    setOpenCrafts(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };
  const handleQuizAnswer = (quizIndex: number, optionIndex: number) => {
    setQuizAnswers(prev => ({...prev, [quizIndex]: optionIndex}));
    setShowQuizResults(prev => ({...prev, [quizIndex]: true}));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Colorful and Fun with Images */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="relative overflow-hidden">
                <img src={heroImage1} alt="Children at church" className="w-full h-full object-cover" />
              </div>
              <div className="relative overflow-hidden">
                <img src={heroImage2} alt="Children Bible study" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-blue-500/80"></div>
          </div>
          <div className="absolute inset-0 opacity-30 bg-[#00000087]">
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-green-300 rounded-full animate-bounce"></div>
            <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-pink-300 rounded-full animate-bounce"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
              <div className="w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center p-4 flex-shrink-0">
                <img 
                  src={childrenLogo} 
                  alt="Children's Ministry Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg" data-testid="text-children-heading">
                  Children's Church
                </h1>
                <p className="text-2xl text-white/90 font-semibold mb-2 drop-shadow">
                  DCLM East Midlands
                </p>
                <p className="text-xl text-yellow-200 font-bold italic drop-shadow">
                  "Raising A Godly Generation"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-500/50 mb-4 text-lg px-4 py-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Our Mission
                </Badge>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Training Up Children in God's Way</h2>
              </div>
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 border-none shadow-xl">
                <CardContent className="pt-6">
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
                    The Children's Church is an integral part of the adult church. It is established to expose children to 
                    all the provisions of grace, enable them to have basic Christian experiences, and assist them to live 
                    a victorious Christian life in readiness for the coming of the Lord Jesus Christ.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our programmes and activities are aimed at <strong className="text-pink-600 dark:text-pink-400">evangelising, teaching, and discipling</strong> children 
                    for Jesus; training them up in the way of the Lord and equipping them to win their world for Christ.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Activities Grid - Fun and Colorful */}
        <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">What We Do</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Fun activities that help children learn about God's love!
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {activities.map((activity, index) => (
                <Card 
                  key={index} 
                  className="bg-white dark:bg-slate-800 border-none shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer overflow-hidden"
                  data-testid={`card-activity-${index}`}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-14 h-14 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <activity.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">{activity.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bible Stories Section */}
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/50 mb-4 text-lg px-4 py-1">
                <BookOpen className="h-4 w-4 mr-2" />
                Bible Stories
              </Badge>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Amazing Stories from the Bible</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Click on each story to learn more!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {bibleStories.map((story, index) => (
                <Collapsible key={index} open={openStories.includes(index)} onOpenChange={() => toggleStory(index)}>
                  <Card className="bg-white dark:bg-slate-700 border-none shadow-lg overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <CardContent className="pt-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600/50 transition-colors">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg">
                          <img 
                            src={bibleStoriesImages[index]} 
                            alt={story.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-2">{story.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-2">{story.summary}</p>
                        <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
                          {openStories.includes(index) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          <span>Tap to {openStories.includes(index) ? 'close' : 'read'}</span>
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6">
                        <div className={`bg-gradient-to-r ${story.color} bg-opacity-10 rounded-lg p-4 space-y-3`}>
                          <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg p-3">
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Scripture Reference</p>
                            <p className="text-slate-800 dark:text-white font-medium">{story.scripture}</p>
                          </div>
                          <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg p-3">
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">What We Learn</p>
                            <p className="text-slate-700 dark:text-slate-300">{story.lesson}</p>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* Bible Games Section */}
        <section className="py-16 bg-gradient-to-r from-green-50 to-teal-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/50 mb-4 text-lg px-4 py-1">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Bible Games
              </Badge>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Fun Games to Play!</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Learn God's word while having fun with family and friends!</p>
            </div>
            <div className="space-y-4 max-w-3xl mx-auto">
              {bibleGames.map((game, index) => (
                <Collapsible key={index} open={openGames.includes(index)} onOpenChange={() => toggleGame(index)}>
                  <Card className="bg-white dark:bg-slate-700 border-none shadow-lg overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <CardContent className="py-4 cursor-pointer hover:bg-green-50 dark:hover:bg-slate-600/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                            <img src={bibleGamesImages[index]} alt={game.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{game.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{game.description}</p>
                          </div>
                          {openGames.includes(index) ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6">
                        <img src={bibleGamesImages[index]} alt={game.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <div className="bg-green-100 dark:bg-slate-600 rounded-lg p-4">
                          <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">HOW TO PLAY</p>
                          <p className="text-slate-700 dark:text-slate-300">{game.howToPlay}</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* Bible Quiz Section */}
        <section className="py-16 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-slate-800 dark:to-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/50 mb-4 text-lg px-4 py-1">
                <Trophy className="h-4 w-4 mr-2" />
                Bible Quizzes
              </Badge>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Test Your Knowledge!</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Click on an answer to see if you're right!</p>
            </div>
            <div className="space-y-6 max-w-2xl mx-auto">
              {bibleQuizzes.map((quiz, qIndex) => (
                <Card key={qIndex} className="bg-white dark:bg-slate-700 border-none shadow-lg overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {qIndex + 1}
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">{quiz.question}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {quiz.options.map((option, oIndex) => (
                        <Button
                          key={oIndex}
                          variant="outline"
                          className={`justify-start h-auto py-3 px-4 text-left ${
                            showQuizResults[qIndex]
                              ? oIndex === quiz.answer
                                ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                                : quizAnswers[qIndex] === oIndex
                                  ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                                  : ''
                              : 'hover:bg-yellow-50 dark:hover:bg-slate-600'
                          }`}
                          onClick={() => handleQuizAnswer(qIndex, oIndex)}
                          disabled={showQuizResults[qIndex]}
                        >
                          <span className="font-medium mr-2">{String.fromCharCode(65 + oIndex)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                    {showQuizResults[qIndex] && (
                      <div className={`rounded-lg p-4 ${quizAnswers[qIndex] === quiz.answer ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                        <p className={`font-semibold mb-1 ${quizAnswers[qIndex] === quiz.answer ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'}`}>
                          {quizAnswers[qIndex] === quiz.answer ? 'Correct! Great job!' : 'Not quite, but keep learning!'}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{quiz.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Arts & Crafts Section */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/50 mb-4 text-lg px-4 py-1">
                <Palette className="h-4 w-4 mr-2" />
                Arts & Crafts
              </Badge>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Creative Activities!</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Fun crafts you can make at home to celebrate your faith!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {artsCrafts.map((craft, index) => (
                <Collapsible key={index} open={openCrafts.includes(index)} onOpenChange={() => toggleCraft(index)}>
                  <Card className="bg-white dark:bg-slate-700 border-none shadow-lg overflow-hidden h-full">
                    <CollapsibleTrigger asChild>
                      <CardContent className="pt-4 cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-600/50 transition-colors">
                        <div className="w-28 h-28 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg">
                          <img src={artsCraftsImages[index]} alt={craft.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white text-center mb-2">{craft.title}</h3>
                        <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
                          {openCrafts.includes(index) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          <span>Tap for instructions</span>
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-3">
                        <div className="bg-purple-100 dark:bg-slate-600 rounded-lg p-3">
                          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">MATERIALS NEEDED</p>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">{craft.materials}</p>
                        </div>
                        <div className="bg-pink-100 dark:bg-slate-600 rounded-lg p-3">
                          <p className="text-xs font-semibold text-pink-700 dark:text-pink-300 mb-1">INSTRUCTIONS</p>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">{craft.instructions}</p>
                        </div>
                        <div className="bg-indigo-100 dark:bg-slate-600 rounded-lg p-3">
                          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1">BIBLE CONNECTION</p>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">{craft.bibleConnection}</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* Memory Verses Section */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/50 mb-4 text-lg px-4 py-1">
                <Sparkles className="h-4 w-4 mr-2" />
                Memory Verses
              </Badge>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Scripture to Remember!</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Learn these important Bible verses by heart!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {memoryVerses.map((item, index) => (
                <Card key={index} className="bg-white dark:bg-slate-700 border-none shadow-lg overflow-hidden">
                  <CardContent className="pt-6">
                    <Badge className={`bg-gradient-to-r ${item.color} text-white mb-4`}>{item.theme}</Badge>
                    <blockquote className="text-slate-700 dark:text-slate-300 italic mb-4 leading-relaxed">
                      "{item.verse}"
                    </blockquote>
                    <p className="text-right font-bold text-slate-800 dark:text-white">— {item.reference}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly Programs */}
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/50 mb-4 text-lg px-4 py-1">
                <Calendar className="h-4 w-4 mr-2" />
                Weekly Programs
              </Badge>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Join Us!</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {programs.map((program, index) => (
                <Card 
                  key={index} 
                  className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-800 border-none shadow-xl overflow-hidden"
                  data-testid={`card-program-${index}`}
                >
                  <CardContent className="pt-6">
                    <Badge className="bg-purple-500 text-white mb-3">{program.ageGroup}</Badge>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{program.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Clock className="h-4 w-4 text-pink-500" />
                        <span className="font-medium">{program.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Video className="h-4 w-4 text-blue-500" />
                        <span>{program.venue}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{program.description}</p>
                    {program.zoomId && (
                      <div className="bg-white/50 dark:bg-slate-600/50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Zoom ID: <span className="font-mono font-bold">{program.zoomId}</span>
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Passcode: <span className="font-mono font-bold">{program.passcode}</span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bible Study Highlight */}
        <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Card className="bg-white dark:bg-slate-800 border-none shadow-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img 
                      src={bibleStudyImage} 
                      alt="Children's Bible Study"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <CardContent className="flex-1 pt-6 flex flex-col justify-center">
                    <Badge className="bg-red-500 text-white w-fit mb-4">Featured Program</Badge>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Children's Bible Study</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Join us every Tuesday at 4:30 PM for an exciting time of Bible games, quizzes, films, sing-along sessions and lots more! 
                      A fun way for children to learn about God's word.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge variant="outline" className="border-pink-400 text-pink-600 dark:text-pink-400">Bible Games</Badge>
                      <Badge variant="outline" className="border-blue-400 text-blue-600 dark:text-blue-400">Quizzes</Badge>
                      <Badge variant="outline" className="border-green-400 text-green-600 dark:text-green-400">Films</Badge>
                      <Badge variant="outline" className="border-purple-400 text-purple-600 dark:text-purple-400">Sing Along</Badge>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white" data-testid="button-join-bible-study">
                      <a 
                      href="https://zoom.us/j/83486339797"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        <Video className="h-4 w-4 mr-2" />
                        Join on Zoom
                      </a>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Programs */}
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Special Programs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-slate-700 dark:to-slate-800 border-none shadow-xl">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Sun className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">After School Club & Summer Play Scheme</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Our OFSTED-registered club offers homework support, indoor and outdoor play activities including computer games 
                    and table-top games. During summer holidays, we provide a play scheme with exciting day trips to places like 
                    aquariums and adventure parks!
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-slate-700 dark:to-slate-800 border-none shadow-xl">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Baby className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Parents & Toddler Day Care</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Informal sessions creating a safe, fun, and friendly environment where tots can develop through play. 
                    Activities include singing, story time, arts and crafts, and free play. For children ages 1-4. 
                    <strong className="text-orange-600 dark:text-orange-400"> Admission is free!</strong>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tender Life Stories */}
        <section className="py-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/50 mb-4 text-lg px-4 py-1">
                <BookMarked className="h-4 w-4 mr-2" />
                Tender Life Magazine
              </Badge>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Stories for Children</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Enriching and interesting stories to help children learn about Jesus and grow in faith.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Story 1 */}
              <Collapsible open={story1Open} onOpenChange={setStory1Open}>
                <Card className="bg-white dark:bg-slate-800 border-none shadow-xl overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <CardContent className="pt-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Going Places for Jesus</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">A message about spreading the gospel</p>
                          </div>
                        </div>
                        {story1Open ? (
                          <ChevronUp className="h-6 w-6 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-6 w-6 text-slate-400" />
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-6 pb-6 pt-2">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                        <img 
                          src={goingPlacesImage} 
                          alt="Children spreading the gospel" 
                          className="w-full rounded-lg shadow-md mb-4"
                        />
                        <p>
                          The command to preach the gospel to all was given by our Lord Jesus Himself to all His friends everywhere. 
                          Maybe you have heard the message before and have not done anything about it. This time you cannot just fold 
                          your hands and be idle.
                        </p>
                        <p>
                          The soul of a child is more precious to Jesus than all the riches of this world. Think of the cost of all the 
                          houses and cars, as well as the money in all the banks and other things you can think of in this world — 
                          <strong className="text-purple-600 dark:text-purple-400"> a child is more valuable and greater than all these things combined.</strong> 
                          That is why Jesus left heaven and came into the world to die for all children, so that they will not perish in hell fire in the end.
                        </p>
                        <p>
                          Many sinners die daily without the hope of heaven. You cannot delay further, so that you will not be blamed for 
                          the loss of their souls. Besides, obedience to the word of God is the only way you can show that you love Him 
                          and are His children.
                        </p>
                        <p>
                          There are many ways of reaching out for Jesus. You can speak personally to people, that is, talking to one person 
                          at a time. You can phone, send or share tracts and magazines or write letters. Whatever the method you use, 
                          Jesus has promised to work with you.
                        </p>
                        <p className="text-center font-semibold text-purple-600 dark:text-purple-400 text-lg pt-2">
                          Now, you are ready to go places for Jesus!
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Story 2 */}
              <Collapsible open={story2Open} onOpenChange={setStory2Open}>
                <Card className="bg-white dark:bg-slate-800 border-none shadow-xl overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <CardContent className="pt-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                            <Heart className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Faithful Tom</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">An inspiring story of a boy who worked for Jesus</p>
                          </div>
                        </div>
                        {story2Open ? (
                          <ChevronUp className="h-6 w-6 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-6 w-6 text-slate-400" />
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-6 pb-6 pt-2">
                      <div className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                        <img 
                          src={faithfulTomImage} 
                          alt="Faithful Tom dropping Bible verses from window" 
                          className="w-full rounded-lg shadow-md mb-4"
                        />
                        <p>
                          There lived a little orphan boy whose name was Tom. He was crippled in both legs. He was taken to live with 
                          a relative whom he called Granny. She never treated him well, but he was thankful for the little he had. 
                          One day, he decided to go out to work as a sweeper in a store so as to help granny with little money.
                        </p>
                        <p>
                          One cold night after Tom had finished work, he became tired and sick. He found his way into a church where 
                          the preacher spoke about knowing Jesus through the Bible. Later, as Tom was trying to get home, he fell down 
                          and collapsed. Granny found him and then took him to his room. From that day, Tom could not leave his bed all alone again.
                        </p>
                        <p>
                          Tom, still wondering on how he could get a Bible to learn more about Jesus, received a gift of a coin from a friend. 
                          He requested the friend to use the coin to buy a Bible for him. Tom read and studied his Bible and soon learned 
                          how to be saved through Jesus.
                        </p>
                        <p>
                          Later, he thought to himself, <em className="text-pink-600 dark:text-pink-400">"I can't keep all this to myself. I must think of some way 
                          to tell others about Jesus. I know that I could drop notes with scripture passages out of the window. Someone who 
                          is in need of Jesus may pick one up."</em>
                        </p>
                        <p>
                          He then begged his granny to give him papers and pencil. With these, he started writing some passages of the Bible 
                          in small sheets addressed to — "The passer-by. Please, read." Then he would hang the paper with a string tied to the window.
                        </p>
                        <p>
                          One day, a well-dressed man passed by Tom's window. The wind blew one of the papers across the man's face. 
                          The man stopped, picked up the paper and read the Bible passage. Then he said, "These Bible passages seem to be 
                          coming from that little window up there. I would like to talk to the person who is doing this good work."
                        </p>
                        <p>
                          This man became a friend of Jesus and continued with Tom's work by preaching the gospel everywhere he went.
                        </p>
                        <p className="text-center font-semibold text-pink-600 dark:text-pink-400 text-lg pt-2 border-t border-pink-200 dark:border-slate-500 mt-4">
                          Children, your hands, eyes and legs are complete. Are you using them to tell others about the love of Jesus? 
                          If a lame boy could work for Jesus, you can do better!
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <div className="text-center pt-4">
                <Button asChild variant="outline" className="border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  <a 
                  href="https://dclm.org/tender-life-magazine/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <BookMarked className="h-4 w-4 mr-2" />
                    Read More Stories
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Star className="h-12 w-12 text-yellow-300 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Bring Your Children!</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let your little ones experience the joy of learning about Jesus in a fun and safe environment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white">
              <Users className="h-5 w-5" />
              <span>Ages 1-12 Welcome</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
