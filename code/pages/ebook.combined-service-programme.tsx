import { useState, useRef, useCallback, useEffect, forwardRef } from "react";
import { Button } from "../components/UiButton";
import { Badge } from "../components/UiBadge";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  BookOpen, ChevronLeft, ChevronRight, ArrowLeft,
  Download, Maximize, Minimize
} from "lucide-react";
import { SiteLink as Link } from "../components/SiteLink";
import HTMLFlipBook from "react-pageflip";
const pdfFile = "/_cdn/static/Combined_Service_8th_Feb_1770490712382.pdf";
const churchLogo = "/_cdn/static/logo_1767634535083.png";
const themeImage = "/_cdn/static/theme_1770491616740.png";
const csWhiteImage = "/_cdn/static/cs_white_1770491634854.png";
const swordImage = "/_cdn/static/Layer_60_1770491639900.png";
const ro1Image = "/_cdn/static/RO1_1770491687239.png";

const FlipPage = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => (
    <div ref={ref} className={`bg-white overflow-hidden ${className}`}>
      {children}
    </div>
  )
);

function CoverPage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex flex-col items-center justify-center p-3 md:p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.4),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.3),transparent_50%)]" />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full h-full justify-center overflow-hidden">
        <img src={churchLogo} alt="DCLM Logo" className="w-10 h-10 md:w-20 md:h-20 object-contain mb-1 md:mb-3 flex-shrink-0" />
        <p className="text-green-200 text-[8px] md:text-xs tracking-[0.15em] uppercase mb-0.5 md:mb-2 flex-shrink-0">Deeper Christian Life Ministry</p>
        <p className="text-green-300/80 text-[7px] md:text-[10px] tracking-wider flex-shrink-0">East Midlands Region, UK</p>
        <div className="w-10 md:w-20 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent my-1 md:my-3 flex-shrink-0" />
        <img src={csWhiteImage} alt="Regional Combined Service" className="w-[60%] md:w-72 max-h-[12%] object-contain mb-1 md:mb-3 flex-shrink-0" />
        <img src={swordImage} alt="Sword and Bible" className="w-[50%] max-h-[35%] md:w-52 object-contain mb-1 md:mb-3 flex-shrink-0" />
        <img src={themeImage} alt="Theme: Established!" className="w-[55%] md:w-64 max-h-[10%] object-contain mb-1 md:mb-3 flex-shrink-0" />
        <div className="w-10 md:w-20 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent my-0.5 md:my-2 flex-shrink-0" />
        <p className="text-green-100 text-[10px] md:text-base font-medium flex-shrink-0">8th February 2025</p>
        <p className="text-green-300/70 text-[7px] md:text-xs mt-0.5 flex-shrink-0">Programme Booklet</p>
      </div>
    </div>
  );
}

function ProgrammePage() {
  const items = [
    { time: "10:30 - 11:00", title: "Pre-Service Prayer" },
    { time: "11:00 - 11:10", title: "Opening Prayer & Congregational Song" },
    { time: "11:10 - 11:40", title: "Search the Scriptures" },
    { time: "11:40 - 11:50", title: "Children Choir" },
    { time: "11:50 - 12:00", title: "Youth Choir" },
    { time: "12:00 - 12:20", title: "Worship Session" },
    { time: "12:20 - 12:30", title: "Prayer / Offering / Announcement" },
    { time: "12:30 - 12:35", title: "Bible Reading" },
    { time: "12:35 - 13:15", title: "Seminar 1" },
    { time: "13:15 - 13:25", title: "Break" },
    { time: "13:25 - 14:05", title: "Seminar 2" },
    { time: "14:05 - 14:20", title: "Q&A Session" },
    { time: "14:20 - 14:25", title: "Choir" },
    { time: "14:25 - 15:25", title: "Regional Overseer" },
    { time: "15:25 - 15:30", title: "Closing & Benediction" },
  ];
  return (
    <div className="w-full h-full bg-white p-3 md:p-8 flex flex-col overflow-hidden">
      <div className="text-center mb-1 md:mb-4 flex-shrink-0">
        <p className="text-blue-600 text-[8px] md:text-xs tracking-widest uppercase">DCLM East Midlands Regional Combined Service</p>
        <h2 className="text-sm md:text-2xl font-bold text-slate-800 mt-0.5 md:mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>Programme</h2>
        <div className="w-10 md:w-16 h-0.5 bg-blue-500 mx-auto mt-0.5 md:mt-2" />
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-0.5 md:space-y-2 min-h-0 overflow-hidden">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1 md:gap-3 group flex-shrink-0">
            <span className="text-[7px] md:text-xs text-blue-600 font-mono w-[58px] md:w-[90px] text-right flex-shrink-0">{item.time}</span>
            <div className="flex-1 border-b border-dotted border-slate-300" />
            <span className="text-[8px] md:text-sm text-slate-700 font-medium text-right flex-shrink-0">{item.title}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-1 md:mt-4 flex-shrink-0">
        <p className="text-slate-400 text-[8px] md:text-xs italic">Page 1</p>
      </div>
    </div>
  );
}

function HymnsPage() {
  return (
    <div className="w-full h-full bg-white p-4 md:p-8 flex flex-col">
      <div className="text-center mb-2 md:mb-4">
        <p className="text-blue-600 text-[10px] md:text-xs tracking-widest uppercase">DCLM East Midlands Regional Combined Service</p>
        <h2 className="text-lg md:text-2xl font-bold text-slate-800 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>Hymns</h2>
        <div className="w-12 md:w-16 h-0.5 bg-blue-500 mx-auto mt-1 md:mt-2" />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-3 md:gap-6">
        <div>
          <h3 className="text-xs md:text-base font-bold text-slate-800 mb-1 md:mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>I Surrender All</h3>
          {[
            { v: "1", lines: ["All to Jesus I surrender,", "All to Him I freely give;", "I will ever love and trust Him,", "In His presence daily live."] },
            { v: "Chorus", lines: ["I surrender all, I surrender all;", "All to Thee, my blessed Saviour,", "I surrender all."] },
            { v: "2", lines: ["All to Jesus I surrender,", "Humbly at His feet I bow;", "Worldly pleasures all forsaken,", "Take me, Jesus, Take me now."] },
            { v: "3", lines: ["All to Jesus I surrender,", "Lord, I give myself to Thee;", "Fill me with Thy love and power,", "Let Thy blessing fall on me."] },
            { v: "4", lines: ["All to Jesus I surrender,", "Now I feel the sacred flame;", "O the joy of full salvation!", "Glory, glory to His Name!"] },
          ].map((verse, i) => (
            <div key={i} className="mb-1 md:mb-2">
              <p className="text-[8px] md:text-xs text-blue-500 font-semibold">{verse.v === "Chorus" ? "Chorus:" : `${verse.v}.`}</p>
              {verse.lines.map((line, j) => (
                <p key={j} className="text-[8px] md:text-xs text-slate-600 leading-tight md:leading-relaxed italic">{line}</p>
              ))}
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xs md:text-base font-bold text-slate-800 mb-1 md:mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Take My Life</h3>
          {[
            { v: "1", lines: ["Take my life, and let it be", "Consecrated, Lord, to Thee;", "Take my moments and my days,", "Let them flow in ceaseless praise."] },
            { v: "2", lines: ["Take my hands, and let them move", "At the impulse of Thy love;", "Take my feet, and let them be", "Swift and beautiful for Thee."] },
            { v: "3", lines: ["Take my voice and let me sing", "Always, only, for my King;", "Take my lips and let them be", "Filled with messages from Thee."] },
            { v: "4", lines: ["Take my silver and my gold;", "Not a mite would I withhold;", "Take my intellect, and use", "Every power as Thou shalt choose."] },
            { v: "5", lines: ["Take my will and make it Thine,", "It shall be no longer mine;", "Take my heart, it is Thine own;", "It shall be Thy royal throne."] },
            { v: "6", lines: ["Take my love; my Lord, I pour", "At Thy feet its treasure-store;", "Take myself, and I will be", "Ever, only, all for Thee."] },
          ].map((verse, i) => (
            <div key={i} className="mb-1 md:mb-2">
              <p className="text-[8px] md:text-xs text-blue-500 font-semibold">{verse.v}.</p>
              {verse.lines.map((line, j) => (
                <p key={j} className="text-[8px] md:text-xs text-slate-600 leading-tight md:leading-relaxed italic">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 2</p>
      </div>
    </div>
  );
}

function ScripturePage1() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-2 md:mb-3">
        <p className="text-blue-600 text-[10px] md:text-xs tracking-widest uppercase">Search the Scriptures - Lesson 173</p>
        <h2 className="text-sm md:text-xl font-bold text-slate-800 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>The Call and Ministry of Gideon</h2>
        <div className="w-12 md:w-16 h-0.5 bg-blue-500 mx-auto mt-1" />
      </div>
      <div className="bg-blue-50 rounded-md p-2 md:p-3 mb-2 md:mb-3">
        <p className="text-[8px] md:text-xs text-blue-800 font-semibold mb-0.5">Memory Verse:</p>
        <p className="text-[8px] md:text-xs text-blue-700 italic leading-relaxed">"And the LORD looked upon him, and said, Go in this thy might, and thou shalt save Israel from the hand of the Midianites: have not I sent thee?" (Judges 6:14).</p>
      </div>
      <p className="text-[8px] md:text-xs text-slate-500 mb-1 md:mb-2"><span className="font-semibold text-slate-700">TEXT:</span> Judges chapters 6 to 8</p>
      <div className="flex-1 overflow-hidden">
        <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed mb-1 md:mb-2">
          The inconsistent walk of the children of Israel with God led to repeated defeats and captivity in the hands of their enemies at the time of the judges. The text records another instance of Israel's backsliding and oppression by the Midianites for seven years. "And the children of Israel did evil in the sight of the LORD: and the LORD delivered them into the hand of Midian seven years" (Judges 6:1). Sin is destructive and brings oppression. Thus, God calls sinners to repentance and faith in Christ's atoning sacrifice for salvation.
        </p>
        <h3 className="text-[9px] md:text-sm font-bold text-slate-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Gideon's Call and Commission</h3>
        <p className="text-[7px] md:text-[10px] text-slate-500 mb-1">(Judges 6:1-24; Psalm 130:4; Romans 2:4; Proverbs 22:29; Mark 16:15,16)</p>
        <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed mb-1 md:mb-2">
          The Midianites and allied nations continually made incursions into the land of Israel, especially at harvest, wasting the nation's resources. At the height of their distress, Israel remembered God and cried to Him for deliverance. Though it is awful that the sinful only remember God when things go wrong, He is always ready to forgive if they repent sincerely (Psalm 130:4).
        </p>
        <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed mb-1 md:mb-2">
          After Israel was reproved by the prophet, an angel appeared to Gideon to call and commission him. Gideon was threshing wheat by the wine press to hide the crop from the Midianites. The angel said to him, "The LORD is with thee, thou mighty man of valour" (Judges 6:12). Such indefatigable spirit always receives divine favour and approval (Proverbs 22:29).
        </p>
        <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed">
          God's charge to Gideon was: "Go in this thy might, and thou shalt save Israel from the hand of the Midianites: have not I sent thee?" (Judges 6:14). God assured him of His presence: "Surely I will be with thee, and thou shalt smite the Midianites as one man" (Judges 6:16). God's presence and power transform weak instruments into fruitful vessels.
        </p>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 3</p>
      </div>
    </div>
  );
}

function ScripturePage2() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-2 md:mb-3">
        <h2 className="text-sm md:text-lg font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>The Call and Ministry of Gideon (cont.)</h2>
        <div className="w-12 md:w-16 h-0.5 bg-blue-500 mx-auto mt-1" />
      </div>
      <div className="flex-1 overflow-hidden">
        <h3 className="text-[9px] md:text-sm font-bold text-slate-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Gideon's Courage and Conquest</h3>
        <p className="text-[7px] md:text-[10px] text-slate-500 mb-1">(Judges 6:25-40; 7:1-25; 8:1-21; 2 Timothy 2:21)</p>
        <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed mb-1 md:mb-2">
          Gideon's readiness to obey God made him receive more instructions on how to initiate spiritual revival and restore true worship. He was commanded to throw down the altar of Baal and offer sacrifices to the Lord. God will not use unclean vessels except they are first purged (2 Timothy 2:21).
        </p>
        <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed mb-1 md:mb-2">
          Empowered by the Holy Spirit, Gideon mobilised Israel for battle. God instructed that Gideon downsize the army from 32,000 to just 300 men through tests. The Lord can achieve anything with many or with few (Luke 1:37). By faith, Gideon divided his army into three camps and routed the enemy with trumpets and lamps, shouting "The sword of the LORD, and of Gideon."
        </p>
        <h3 className="text-[9px] md:text-sm font-bold text-slate-800 mb-1 mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>Gideon's Corruptive Ephod and Israel's Descent</h3>
        <p className="text-[7px] md:text-[10px] text-slate-500 mb-1">(Judges 8:22-35; 1 Corinthians 10:7; Psalm 101:2,3)</p>
        <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed mb-1 md:mb-2">
          The men of Israel offered Gideon the royal throne. He rightly rejected the offer, but then requested golden earrings from the spoils and made an ephod, which became an object of temptation as all Israel went a whoring after it. This presumptuous action became a snare to him and after his death, Israel went back into deep idol worship.
        </p>
        <div className="bg-amber-50 rounded-md p-2 md:p-3 mt-1 md:mt-2">
          <p className="text-[8px] md:text-xs font-semibold text-amber-800 mb-1">Questions for Review:</p>
          <ol className="text-[7px] md:text-[11px] text-amber-700 space-y-0.5 list-decimal list-inside">
            <li>What does Israel's inability to stand before Midian teach us about the danger of backsliding?</li>
            <li>Explain God's assurance of His presence to present-day believers.</li>
            <li>Mention some qualities that God wants in His servants.</li>
            <li>Why is it very important to depend solely on God in life's battles?</li>
            <li>List some godly qualities of Gideon.</li>
            <li>Why must believers who have records of victory beware?</li>
            <li>Cite a reference in the New Testament that forbids idolatry.</li>
          </ol>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 4</p>
      </div>
    </div>
  );
}

function GoalSettingTitlePage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-900 flex flex-col items-center justify-center p-6 md:p-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.4),transparent_60%)]" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-indigo-300 text-[10px] md:text-sm tracking-[0.15em] uppercase mb-3 md:mb-6">Empowerment Series</p>
        <h2 className="text-lg md:text-3xl font-bold text-white mb-2 md:mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Goal-Setting &<br />Financial Management
        </h2>
        <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent my-3 md:my-6" />
        <p className="text-indigo-200 text-xs md:text-sm max-w-xs">Deeper Christian Life Ministry<br />East Midlands Region, UK</p>
      </div>
    </div>
  );
}

function GoalSettingPage1() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-2 md:mb-3">
        <p className="text-blue-600 text-[10px] md:text-xs tracking-widest uppercase">Goal-Setting & Financial Management</p>
        <h2 className="text-sm md:text-xl font-bold text-slate-800 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>Understanding Goals: The Starting Point</h2>
        <div className="w-12 md:w-16 h-0.5 bg-blue-500 mx-auto mt-1" />
      </div>
      <div className="flex-1 overflow-hidden space-y-2 md:space-y-3">
        <div className="bg-blue-50 rounded-md p-2 md:p-3">
          <p className="text-[8px] md:text-xs font-semibold text-blue-800 mb-1">What Is a Goal?</p>
          <p className="text-[7px] md:text-[11px] text-blue-700 leading-relaxed">A goal is a clear, intentional direction for growth, aligned with God's will. It's not merely about personal ambition, but about discovering and fulfilling the purpose God has ordained for your life.</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-50 rounded-md p-2">
            <p className="text-[8px] md:text-xs font-semibold text-red-700">Don't:</p>
            <p className="text-[7px] md:text-[11px] text-red-600">Start with what you want to achieve</p>
          </div>
          <div className="bg-green-50 rounded-md p-2">
            <p className="text-[8px] md:text-xs font-semibold text-green-700">Do:</p>
            <p className="text-[7px] md:text-[11px] text-green-600">Start by seeking God's will and direction for your life</p>
          </div>
        </div>
        <div>
          <h3 className="text-[9px] md:text-sm font-bold text-slate-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Like an Athlete: Running with Purpose</h3>
          <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed mb-1">The Apostle Paul uses the metaphor of an athlete in 1 Corinthians 9:26 to illustrate purposeful living.</p>
          <div className="space-y-1">
            {[
              { num: "01", title: "Preparation", desc: "Understanding the nature of your calling determines how you prepare." },
              { num: "02", title: "Discipline", desc: "Knowing your specific assignment prevents distraction and helps you focus." },
              { num: "03", title: "Winning", desc: "Clear boundaries and objectives ensure you're running towards a defined destination." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[10px] md:text-sm font-bold text-blue-500">{item.num}</span>
                <div>
                  <p className="text-[8px] md:text-xs font-semibold text-slate-700">{item.title}</p>
                  <p className="text-[7px] md:text-[11px] text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[9px] md:text-sm font-bold text-slate-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Vision: The Essential Framework</h3>
          <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed mb-1">Paul asked: "What wilt thou have me to do?" (Acts 9:6). God responded with a clear vision: "To bear my name before the Gentiles" (Acts 9:15b). This enabled Paul to declare: "This one thing I do" (Philippians 3:13).</p>
          <div className="grid grid-cols-5 gap-1">
            {["Structure", "Timeline", "Responsibility", "Motivation", "Cost"].map((item, i) => (
              <div key={i} className="bg-indigo-50 rounded p-1 text-center">
                <p className="text-[7px] md:text-[10px] text-indigo-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 6</p>
      </div>
    </div>
  );
}

function GoalSettingPage2() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-2 md:mb-3">
        <h2 className="text-sm md:text-xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Breaking Down Your Vision</h2>
        <div className="w-12 md:w-16 h-0.5 bg-blue-500 mx-auto mt-1" />
      </div>
      <p className="text-[7px] md:text-[11px] text-slate-600 mb-2 md:mb-4 text-center">Once you've received vision from God, break it down into manageable categories for comprehensive growth across all areas of life.</p>
      <div className="flex-1 grid grid-cols-2 gap-2 md:gap-3">
        {[
          { title: "Spiritual", desc: "God's Word, prayer life, and character development form the foundation of everything else.", color: "bg-blue-50 text-blue-800 border-blue-200" },
          { title: "Family", desc: "Marriage, parenting, health, and relationships require deliberate attention to flourish.", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
          { title: "Ministry", desc: "Spiritual gifts, giving, outreach, and soul-winning require intentional cultivation and stewardship.", color: "bg-purple-50 text-purple-800 border-purple-200" },
          { title: "Professional", desc: "Business, skills, experience, and productivity. Your professional life is a platform for Kingdom impact.", color: "bg-amber-50 text-amber-800 border-amber-200" },
        ].map((cat, i) => (
          <div key={i} className={`rounded-md p-2 md:p-3 border ${cat.color}`}>
            <p className="text-[9px] md:text-sm font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{cat.title}</p>
            <p className="text-[7px] md:text-[11px] leading-relaxed opacity-80">{cat.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 rounded-md p-2 md:p-3 mt-2 md:mt-3 text-center">
        <p className="text-[7px] md:text-[11px] text-slate-600 italic">This balance between spiritual dependence and practical action characterises biblical goal-setting. We plan diligently whilst trusting completely in God's sovereignty and provision.</p>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 7</p>
      </div>
    </div>
  );
}

function FinancialPage1() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-2 md:mb-3">
        <p className="text-blue-600 text-[10px] md:text-xs tracking-widest uppercase">Financial Management</p>
        <h2 className="text-sm md:text-xl font-bold text-slate-800 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>Core Principle: Money is a Tool, Not a Master</h2>
        <div className="w-12 md:w-16 h-0.5 bg-blue-500 mx-auto mt-1" />
      </div>
      <div className="flex-1 overflow-hidden space-y-2 md:space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { title: "Planning (Budgeting)", ref: "Proverbs 21:5", desc: "The plans of the diligent lead surely to abundance." },
            { title: "Prioritisation", ref: "Matthew 6:33", desc: "Seek first the kingdom of God. Align with Kingdom priorities." },
            { title: "Prudence", ref: "Luke 16:10-11", desc: "Faithful in little, faithful in much. Handle small amounts wisely." },
            { title: "Contentment", ref: "1 Timothy 6:6-10", desc: "Godliness with contentment is great gain. True wealth comes from satisfaction in God." },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 rounded-md p-2 border border-slate-100">
              <p className="text-[8px] md:text-xs font-semibold text-slate-800">{item.title}</p>
              <p className="text-[7px] md:text-[10px] text-blue-600 italic">{item.ref}</p>
              <p className="text-[7px] md:text-[11px] text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <h3 className="text-[9px] md:text-sm font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>The Five-Part Financial Structure</h3>
        <div className="space-y-1">
          {[
            { num: "01", title: "Giving", desc: "God first - tithes, offerings, charity. Honouring God with first fruits." },
            { num: "02", title: "Saving", desc: "Future needs and emergencies. Wise preparation prevents crisis." },
            { num: "03", title: "Living", desc: "Daily expenses. Meeting legitimate needs with wisdom and moderation." },
            { num: "04", title: "Growth", desc: "Skills, education, business. Investing in capacity increases future impact." },
            { num: "05", title: "Enjoying", desc: "Rest and family within limits. God gives us richly all things to enjoy." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[10px] md:text-sm font-bold text-blue-500 w-5 flex-shrink-0">{item.num}</span>
              <div>
                <p className="text-[8px] md:text-xs font-semibold text-slate-700">{item.title}</p>
                <p className="text-[7px] md:text-[11px] text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-red-50 rounded-md p-2">
          <p className="text-[8px] md:text-xs font-semibold text-red-800 mb-1">Critical Warnings</p>
          <ul className="text-[7px] md:text-[11px] text-red-700 space-y-0.5">
            <li><span className="font-semibold">No Budget = Loss of Control</span> - Without a plan, money disappears without purpose.</li>
            <li><span className="font-semibold">Debt Without Plan = Pressure</span> - Unmanaged debt creates stress and limits options.</li>
            <li><span className="font-semibold">Lifestyle Inflation = Silent Bondage</span> - Increasing spending with income growth traps you.</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 8</p>
      </div>
    </div>
  );
}

function FinancialPage2() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-2 md:mb-3">
        <h2 className="text-sm md:text-xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Closing Principles</h2>
        <div className="w-12 md:w-16 h-0.5 bg-blue-500 mx-auto mt-1" />
      </div>
      <div className="flex-1 overflow-hidden space-y-2 md:space-y-4">
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className="bg-blue-50 rounded-md p-2 md:p-4 border border-blue-100">
            <h3 className="text-[9px] md:text-sm font-bold text-blue-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Faith & Figures</h3>
            <p className="text-[7px] md:text-[11px] text-blue-700 leading-relaxed">Faith does not mean ignoring figures. Biblical faith operates with eyes wide open, acknowledging reality whilst trusting God's provision and guidance.</p>
          </div>
          <div className="bg-indigo-50 rounded-md p-2 md:p-4 border border-indigo-100">
            <h3 className="text-[9px] md:text-sm font-bold text-indigo-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Planning & Trust</h3>
            <p className="text-[7px] md:text-[11px] text-indigo-700 leading-relaxed">Planning does not mean trusting money. We plan diligently as an act of stewardship, but our ultimate confidence rests in God, not our strategies.</p>
          </div>
        </div>
        <div className="bg-slate-50 rounded-md p-2 md:p-4 text-center border border-slate-200">
          <p className="text-[7px] md:text-[11px] text-slate-700 italic leading-relaxed">These twin truths hold together the tension between spiritual dependence and practical responsibility. We neither presume upon God by failing to plan, nor trust in our plans by excluding God. Instead, we walk the balanced path of faithful stewardship.</p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md p-2 md:p-4 border border-blue-100">
          <p className="text-[7px] md:text-[11px] text-slate-700 leading-relaxed">As you leave today, remember that both goal-setting and financial management are <span className="font-semibold">spiritual disciplines</span>. They require prayer, wisdom, accountability, and consistent action. Start with God's vision, break it into practical steps, manage resources wisely, and trust Him for the outcome.</p>
        </div>
      </div>
      <div className="text-center mt-auto pt-4">
        <p className="text-slate-500 text-[8px] md:text-xs">Deeper Christian Life Ministry</p>
        <p className="text-slate-400 text-[8px] md:text-xs">East Midlands Region, UK</p>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 9</p>
      </div>
    </div>
  );
}

function RealEstateTitlePage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 flex flex-col items-center justify-center p-6 md:p-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.4),transparent_60%)]" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-lg md:text-3xl font-bold text-white mb-2 md:mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Real Estate Investment:<br />From Zero to Hero
        </h2>
        <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent my-3 md:my-6" />
        <p className="text-emerald-200 text-xs md:text-sm max-w-xs leading-relaxed">A faith-centered guide to building wealth through property investment while honoring God's calling and serving others.</p>
        <p className="text-slate-400 text-[10px] md:text-xs mt-4 md:mt-8">Deeper Christian Life Ministry<br />East Midlands Region, UK</p>
      </div>
    </div>
  );
}

function RealEstatePage1() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-2 md:mb-3">
        <h2 className="text-sm md:text-xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>The God Factor: Foundation for Success</h2>
        <div className="w-12 md:w-16 h-0.5 bg-emerald-500 mx-auto mt-1" />
      </div>
      <div className="flex-1 overflow-hidden space-y-2 md:space-y-3">
        <div className="bg-emerald-50 rounded-md p-2 md:p-3 border border-emerald-100">
          <p className="text-[8px] md:text-xs font-semibold text-emerald-800 mb-1">Rely on God's Leading</p>
          <p className="text-[7px] md:text-[11px] text-emerald-700 leading-relaxed">Begin your real estate journey with prayer and dependence on the Holy Spirit. Isaiah 48:17 reminds us that God teaches us to profit. Don't wait for perfect conditions -- Ecclesiastes 11:4 warns that those who observe the wind will never sow.</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 md:p-3 border border-blue-100">
          <p className="text-[8px] md:text-xs font-semibold text-blue-800 mb-1">Start With What You Have</p>
          <p className="text-[7px] md:text-[11px] text-blue-700 leading-relaxed">Like Moses when God asked "What is in your hand?" (Exodus 4:2), you may be unaware of the power of what you already possess. God has a wonderful habit of using whatever a person possesses if they simply yield it to Him.</p>
        </div>
        <h3 className="text-[9px] md:text-sm font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Weighing the Pros and Cons</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-green-50 rounded-md p-2 border border-green-100">
            <p className="text-[8px] md:text-xs font-semibold text-green-800 mb-1">Advantages</p>
            <ul className="text-[7px] md:text-[10px] text-green-700 space-y-0.5">
              <li>Independence -- be your own boss</li>
              <li>Free up time for God and family</li>
              <li>Become a kingdom financier</li>
              <li>Help the poor and needy</li>
              <li>Achieve financial freedom</li>
              <li>Build toward early retirement</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-md p-2 border border-orange-100">
            <p className="text-[8px] md:text-xs font-semibold text-orange-800 mb-1">Disadvantages</p>
            <ul className="text-[7px] md:text-[10px] text-orange-700 space-y-0.5">
              <li>Self-reliance required</li>
              <li>No fixed or guaranteed income</li>
              <li>Limited holidays initially</li>
              <li>Lots of overtime work</li>
              <li>Personal responsibility for all decisions</li>
            </ul>
          </div>
        </div>
        <div className="bg-slate-50 rounded-md p-2 border border-slate-200">
          <p className="text-[8px] md:text-xs font-bold text-slate-800 mb-1">UK Property Market Overview</p>
          <p className="text-[7px] md:text-[11px] text-slate-600 leading-relaxed">The Midlands and Scotland offer especially favorable conditions. With projected 2.5% house price growth and average UK property price at {"\u00A3"}293,000 (2.8% annual increase), these regions present viable opportunities.</p>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 11</p>
      </div>
    </div>
  );
}

function RealEstatePage2() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-2 md:mb-3">
        <h2 className="text-sm md:text-xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Regional Performance & Getting Started</h2>
        <div className="w-12 md:w-16 h-0.5 bg-emerald-500 mx-auto mt-1" />
      </div>
      <div className="flex-1 overflow-hidden space-y-2 md:space-y-3">
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          <div className="bg-emerald-50 rounded-md p-2 text-center border border-emerald-100">
            <p className="text-sm md:text-lg font-bold text-emerald-700">600K</p>
            <p className="text-[7px] md:text-[10px] text-emerald-600">Annual Homes Needed</p>
          </div>
          <div className="bg-blue-50 rounded-md p-2 text-center border border-blue-100">
            <p className="text-sm md:text-lg font-bold text-blue-700">2.5%</p>
            <p className="text-[7px] md:text-[10px] text-blue-600">Projected Growth</p>
          </div>
          <div className="bg-indigo-50 rounded-md p-2 text-center border border-indigo-100">
            <p className="text-sm md:text-lg font-bold text-indigo-700">{"\u00A3"}293K</p>
            <p className="text-[7px] md:text-[10px] text-indigo-600">Avg UK Price</p>
          </div>
        </div>
        <h3 className="text-[9px] md:text-sm font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Getting Started: Open Market vs. Auction</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 rounded-md p-2 border border-slate-200">
            <p className="text-[8px] md:text-xs font-semibold text-slate-800 mb-1">Open Market</p>
            <ol className="text-[6px] md:text-[10px] text-slate-600 space-y-0.5 list-decimal list-inside">
              <li>Secure finance with mortgage in principle</li>
              <li>Research via estate agents</li>
              <li>Make an offer after due diligence</li>
              <li>Submit full mortgage application</li>
              <li>Complete survey and valuation</li>
              <li>Receive mortgage offer</li>
              <li>Complete transaction</li>
            </ol>
          </div>
          <div className="bg-slate-50 rounded-md p-2 border border-slate-200">
            <p className="text-[8px] md:text-xs font-semibold text-slate-800 mb-1">Auction</p>
            <ol className="text-[6px] md:text-[10px] text-slate-600 space-y-0.5 list-decimal list-inside">
              <li>Research values via Zoopla/Rightmove</li>
              <li>Review title deed and legal pack</li>
              <li>Inspect property thoroughly</li>
              <li>Take photos, estimate repairs</li>
              <li>Arrange finance</li>
              <li>Notify solicitors</li>
              <li>Register on auction day</li>
              <li>Know your budget limit</li>
            </ol>
          </div>
        </div>
        <h3 className="text-[9px] md:text-sm font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Investment Strategies</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 rounded-md p-2 border border-blue-100">
            <p className="text-[8px] md:text-xs font-semibold text-blue-800 mb-0.5">Residential</p>
            <p className="text-[6px] md:text-[10px] text-blue-700">Buy-to-let, Airbnb, Service apartments, Holiday lets, HMOs, Property flipping, Sourcing, Development</p>
          </div>
          <div className="bg-purple-50 rounded-md p-2 border border-purple-100">
            <p className="text-[8px] md:text-xs font-semibold text-purple-800 mb-0.5">Commercial</p>
            <p className="text-[6px] md:text-[10px] text-purple-700">Commercial property, Mixed-use, FRI leases, Conversions, Development projects</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 12</p>
      </div>
    </div>
  );
}

function RealEstatePage3() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-2 md:mb-3">
        <h2 className="text-sm md:text-xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Costs, Legal & Principles of Success</h2>
        <div className="w-12 md:w-16 h-0.5 bg-emerald-500 mx-auto mt-1" />
      </div>
      <div className="flex-1 overflow-hidden space-y-2 md:space-y-3">
        <h3 className="text-[9px] md:text-sm font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Understanding Costs</h3>
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          <div className="bg-slate-50 rounded-md p-2 border border-slate-200">
            <p className="text-[8px] md:text-xs font-semibold text-slate-800 mb-0.5">Acquisition</p>
            <ul className="text-[6px] md:text-[10px] text-slate-600 space-y-0.5">
              <li>Deposit (15-25%)</li>
              <li>Stamp Duty</li>
              <li>Survey fees</li>
              <li>Mortgage fees</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-md p-2 border border-slate-200">
            <p className="text-[8px] md:text-xs font-semibold text-slate-800 mb-0.5">Professional</p>
            <ul className="text-[6px] md:text-[10px] text-slate-600 space-y-0.5">
              <li>Solicitors</li>
              <li>Accountancy</li>
              <li>Property mgmt</li>
              <li>Insurance</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-md p-2 border border-slate-200">
            <p className="text-[8px] md:text-xs font-semibold text-slate-800 mb-0.5">Ongoing</p>
            <ul className="text-[6px] md:text-[10px] text-slate-600 space-y-0.5">
              <li>Mortgage payments</li>
              <li>Maintenance</li>
              <li>Void periods</li>
              <li>Taxes & utilities</li>
            </ul>
          </div>
        </div>
        <div className="bg-amber-50 rounded-md p-2 md:p-3 border border-amber-100">
          <p className="text-[7px] md:text-[11px] text-amber-800 italic leading-relaxed">"Proper budgeting for all costs -- not just the purchase price -- is essential for success. Work with experienced solicitors who understand property investment."</p>
        </div>
        <h3 className="text-[9px] md:text-sm font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Principles of Success: The 100% Solution</h3>
        <div className="flex items-center justify-center gap-2 md:gap-3 my-1 md:my-2">
          {[
            { label: "Knowledge", pct: "34%", color: "bg-blue-500" },
            { label: "Hard Work", pct: "33%", color: "bg-emerald-500" },
            { label: "Attitude", pct: "33%", color: "bg-amber-500" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full ${item.color} flex items-center justify-center mx-auto mb-1`}>
                <span className="text-[8px] md:text-xs text-white font-bold">{item.pct}</span>
              </div>
              <p className="text-[7px] md:text-[10px] text-slate-700 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-emerald-50 rounded-md p-2 md:p-3 border border-emerald-100">
          <p className="text-[8px] md:text-xs font-semibold text-emerald-800 mb-1">There Must Be a Problem to Solve</p>
          <p className="text-[7px] md:text-[11px] text-emerald-700 leading-relaxed">Every successful venture addresses a real need. Your real estate business exists to serve -- providing quality housing, helping families build wealth, and stewarding resources for kingdom purposes.</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 md:p-3 border border-blue-100">
          <p className="text-[7px] md:text-[11px] text-blue-700 italic leading-relaxed">"I will prosper the works of your hands -- it means there is something in your hands. Work on it. Develop it."</p>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 13</p>
      </div>
    </div>
  );
}

function SermonOutlinePage() {
  return (
    <div className="w-full h-full bg-white p-3 md:p-6 flex flex-col">
      <div className="text-center mb-1 md:mb-3">
        <p className="text-blue-600 text-[10px] md:text-xs tracking-widest uppercase">Regional Overseer's Message</p>
        <h2 className="text-sm md:text-xl font-bold text-slate-800 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>Remaining to Be Established!</h2>
        <p className="text-[8px] md:text-xs text-slate-500 mt-0.5">Genesis 26:1-22</p>
        <div className="w-12 md:w-16 h-0.5 bg-blue-500 mx-auto mt-1" />
      </div>
      <div className="flex items-center justify-center mb-1 md:mb-3">
        <div className="flex items-center gap-2 md:gap-3 bg-slate-50 rounded-md p-1.5 md:p-2 border border-slate-200">
          <img src={ro1Image} alt="Pst Niran Seriki" className="w-12 h-12 md:w-16 md:h-16 rounded-md object-cover" />
          <div>
            <p className="text-[9px] md:text-sm font-bold text-slate-800">Pst Niran Seriki</p>
            <p className="text-[7px] md:text-xs text-slate-500">Regional Overseer</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden space-y-1.5 md:space-y-3">
        <div className="bg-blue-50 rounded-md p-1.5 md:p-3 border border-blue-100">
          <h3 className="text-[9px] md:text-sm font-bold text-blue-800 mb-0.5 md:mb-1">1. Remaining at the Centre of God's Purpose</h3>
          <p className="text-[8px] md:text-xs text-blue-600 italic mb-0.5">Genesis 26:1-6</p>
          <ol className="text-[7px] md:text-[11px] text-blue-700 space-y-0.5 list-decimal list-inside">
            <li>The art of hearing from God -- Genesis 26:2</li>
            <li>The attitude when God speaks to us -- Genesis 26:6</li>
            <li>The awesome result of obeying God's voice -- Genesis 26:13,14</li>
          </ol>
        </div>
        <div className="bg-indigo-50 rounded-md p-1.5 md:p-3 border border-indigo-100">
          <h3 className="text-[9px] md:text-sm font-bold text-indigo-800 mb-0.5 md:mb-1">2. Retrying Attempts with Commitment to God's Purpose</h3>
          <p className="text-[8px] md:text-xs text-indigo-600 italic mb-0.5">Genesis 26:12-20</p>
          <ol className="text-[7px] md:text-[11px] text-indigo-700 space-y-0.5 list-decimal list-inside">
            <li>The art of resilience -- Genesis 26:12,15</li>
            <li>The art of remaining righteous -- Genesis 26:16,17,22a</li>
            <li>The attitude when faced with resistance -- Genesis 26:17,18,21,22a</li>
          </ol>
        </div>
        <div className="bg-purple-50 rounded-md p-1.5 md:p-3 border border-purple-100">
          <h3 className="text-[9px] md:text-sm font-bold text-purple-800 mb-0.5 md:mb-1">3. Remaining Firm on God's Promises for Establishment</h3>
          <p className="text-[8px] md:text-xs text-purple-600 italic mb-0.5">Genesis 26:2-6</p>
          <ol className="text-[7px] md:text-[11px] text-purple-700 space-y-0.5 list-decimal list-inside">
            <li>Remembering God's past promises and performance -- Genesis 26:5,11</li>
            <li>Retaining the faith to persist -- Genesis 26:6,12</li>
            <li>Rejoicing in the Divine Power manifestation -- Genesis 26:13-14,16,21-22</li>
          </ol>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page 14</p>
      </div>
    </div>
  );
}

function NotesPage({ pageNum }: { pageNum: number }) {
  return (
    <div className="w-full h-full bg-white p-4 md:p-8 flex flex-col">
      <div className="text-center mb-3 md:mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Notes</h2>
        <div className="w-12 md:w-16 h-0.5 bg-blue-500 mx-auto mt-1 md:mt-2" />
      </div>
      <div className="flex-1 flex flex-col gap-2 md:gap-3">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="border-b border-dotted border-slate-300 pb-1 md:pb-2 flex-1 min-h-[12px]" />
        ))}
      </div>
      <div className="text-center mt-2">
        <p className="text-slate-400 text-[9px] md:text-xs italic">Page {pageNum}</p>
      </div>
    </div>
  );
}

function BackCoverPage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex flex-col items-center justify-center p-6 md:p-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(34,197,94,0.4),transparent_60%)]" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <img src={churchLogo} alt="DCLM Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4 md:mb-6" />
        <p className="text-green-200 text-xs md:text-sm tracking-[0.2em] uppercase mb-2 md:mb-3">Deeper Christian Life Ministry</p>
        <h2 className="text-lg md:text-2xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          East Midlands Region, UK
        </h2>
        <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent my-3 md:my-6" />
        <p className="text-green-300/80 text-xs md:text-sm">Combined Service Programme Booklet</p>
        <p className="text-green-400/60 text-xs mt-1">8th February 2025</p>
      </div>
    </div>
  );
}

const allPages = [
  CoverPage,
  ProgrammePage,
  HymnsPage,
  ScripturePage1,
  ScripturePage2,
  GoalSettingTitlePage,
  GoalSettingPage1,
  GoalSettingPage2,
  FinancialPage1,
  FinancialPage2,
  RealEstateTitlePage,
  RealEstatePage1,
  RealEstatePage2,
  RealEstatePage3,
  SermonOutlinePage,
  () => <NotesPage pageNum={15} />,
  () => <NotesPage pageNum={16} />,
  BackCoverPage,
];

export default function CombinedServiceBookletHTML() {
  const bookRef = useRef<{ pageFlip(): { flipNext(): void; flipPrev(): void; getCurrentPageIndex(): number; getPageCount(): number } }>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) setIsFullscreen(true);
  }, [isMobile]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isFullscreen]);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const totalPages = allPages.length;

  const flipbookProps = {
    width: 520,
    height: 733,
    size: "stretch" as const,
    minWidth: isMobile ? 280 : 200,
    maxWidth: 900,
    minHeight: isMobile ? 400 : 280,
    maxHeight: 1200,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: true,
    onFlip,
    className: "flipbook-shadow",
    ref: bookRef,
    drawShadow: true,
    flippingTime: 800,
    usePortrait: true,
    autoSize: true,
    clickEventForward: true,
    useMouseEvents: true,
    showPageCorners: true,
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col" data-testid="fullscreen-html-flipbook">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-800/90 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(false)} className="text-slate-300" data-testid="button-exit-fullscreen-html">
              <Minimize className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Exit</span>
            </Button>
          </div>
          <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs px-3" data-testid="badge-fullscreen-page-html">
            {currentPage + 1} / {totalPages}
          </Badge>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild className="text-slate-300" data-testid="button-download-pdf-fullscreen-html">
              <a href={pdfFile} download="DCLM_Combined_Service_8th_Feb_2025.pdf">
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center relative min-h-0 overflow-hidden">
          <button onClick={() => bookRef.current?.pageFlip().flipPrev()} disabled={currentPage <= 0} className="absolute left-0 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/30 text-white disabled:opacity-20 active:bg-black/50" data-testid="button-prev-fullscreen-html">
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <div className="flipbook-container-fullscreen w-full h-full flex items-center justify-center px-8 md:px-12">
            {/* @ts-expect-error react-pageflip types don't fully align with React 18 */}
            <HTMLFlipBook {...flipbookProps} startPage={currentPage}>
              {allPages.map((PageComponent, index) => (
                <FlipPage key={index}>
                  <PageComponent />
                </FlipPage>
              ))}
            </HTMLFlipBook>
          </div>
          <button onClick={() => bookRef.current?.pageFlip().flipNext()} disabled={currentPage >= totalPages - 1} className="absolute right-0 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/30 text-white disabled:opacity-20 active:bg-black/50" data-testid="button-next-fullscreen-html">
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/programme-booklets">
            <Button variant="ghost" size="sm" className="text-slate-300 mb-4" data-testid="button-back-booklets-html">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programme Booklets
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 mb-4 text-sm px-4 py-1">
                <BookOpen className="h-4 w-4 mr-2" />
                Interactive E-Book
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                DCLM East Midlands Regional Combined Service
              </h1>
              <p className="text-slate-300 text-lg">8th February 2025 Programme Booklet</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button asChild variant="outline" className="bg-white/10 border-white/30 text-white" data-testid="button-download-pdf-html">
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
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => bookRef.current?.pageFlip().flipPrev()} disabled={currentPage <= 0} data-testid="button-prev-page-html" className="bg-white dark:bg-slate-800">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <Badge variant="outline" className="bg-white dark:bg-slate-800 px-4 py-1.5 text-sm" data-testid="badge-page-number-html">
              Page {currentPage + 1} of {totalPages}
            </Badge>
            <Button variant="outline" size="sm" onClick={() => bookRef.current?.pageFlip().flipNext()} disabled={currentPage >= totalPages - 1} data-testid="button-next-page-html" className="bg-white dark:bg-slate-800">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(true)} className="bg-white dark:bg-slate-800" data-testid="button-enter-fullscreen-html">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center flipbook-container">
            {/* @ts-expect-error react-pageflip types don't fully align with React 18 */}
            <HTMLFlipBook {...flipbookProps} startPage={0}>
              {allPages.map((PageComponent, index) => (
                <FlipPage key={index}>
                  <PageComponent />
                </FlipPage>
              ))}
            </HTMLFlipBook>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <p className="text-slate-500 dark:text-slate-400 text-sm">Click and drag or swipe to turn pages</p>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        .flipbook-container { perspective: 2000px; }
        .flipbook-container-fullscreen { perspective: 2000px; }
        .flipbook-shadow { box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); }
      `}</style>
    </div>
  );
}
