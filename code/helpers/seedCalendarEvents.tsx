// The 2026 regional calendar, inserted by Admin → Calendar Events → "Seed calendar".
export const seedCalendarEvents: {
  title: string;
  date: Date;
  endDate?: Date;
  type: string;
  location: string;
  description: string;
}[] = [
        { title: "7-Day Morning Prayer: Command Your Morning", date: new Date("2026-01-02"), endDate: new Date("2026-01-08"), type: "regional", location: "Zoom", description: "Start the year with powerful morning prayers based on Job 38:12-13. Join us daily from 6:00 - 6:30 AM on Zoom. Meeting ID: 83486339797 | Passcode: EMR2025" },
        { title: "Covenant Services", date: new Date("2026-01-04"), type: "global", location: "All Locations", description: "Special covenant service to dedicate the new year to God." },
        { title: "Covenant Services", date: new Date("2026-01-11"), type: "global", location: "All Locations", description: "Continue our covenant commitment with God." },
        { title: "Parents Forum: Purposeful Parenting - Preserving Posterity", date: new Date("2026-01-17"), type: "national", location: "Zoom", description: "Virtual gathering for parents at 10:00 AM. Zoom ID: 396569886 | Passcode: 252166. Please invite your friends and family." },
        { title: "Combined Service", date: new Date("2026-01-18"), type: "regional", location: "East Midlands", description: "All East Midlands churches gather together for united worship." },
        { title: "YPF: Foundational Programme", date: new Date("2026-01-18"), type: "ypf", location: "East Midlands", description: "Young People's Fellowship foundational training programme." },
        { title: "YPF: JABBOK - From Encounter to Territorial Takeover", date: new Date("2026-01-24"), type: "ypf", location: "2-3 St Peter's Churchyard, Derby DE1 1NN", description: "A day of Dynamic Transformation. Come and be empowered to take over territories for Christ. Time: 12 noon prompt." },
        { title: "Monthly Prayer Vigil: There Shall Be A Performance", date: new Date("2026-02-06"), type: "regional", location: "Zoom", description: "Theme: There Shall Be A Performance (Luke 1:45). Time: 11:00 PM. Zoom ID: 83486339797 | Passcode: EMR2025. Live streaming on YouTube @dclmeastmidlandsuk" },
        { title: "Parent Support Forum: Parents with Children in the Choir", date: new Date("2026-02-07"), type: "regional", location: "Via Zoom", description: "Come and be empowered to provide better home rehearsal culture. Time: 11:00 AM - 1:00 PM. Zoom ID: 83486339797 | Passcode: EMR2025." },
        { title: "Regional Combined Service: ESTABLISHED!", date: new Date("2026-02-08"), type: "regional", location: "50 Walsgrave Rd, Coventry, CV2 4EB", description: "Theme: ESTABLISHED! All East Midlands churches gather together for united worship. Time: 11:00 AM. Ministering: Pastor Niran Seriki (Regional Overseer). Everyone welcome." },
        { title: "Mini Strategy Congress", date: new Date("2026-02-20"), endDate: new Date("2026-02-22"), type: "regional", location: "East Midlands", description: "Regional Mini Strategy Congress for planning and strategic development." },
        { title: "RO & Wives' Prayer Retreat", date: new Date("2026-03-06"), endDate: new Date("2026-03-08"), type: "national", location: "Northampton", description: "Prayer retreat for Regional Overseers and their wives." },
        { title: "Couples' Fellowship", date: new Date("2026-03-14"), type: "regional", location: "East Midlands", description: "Monthly gathering for married couples for fellowship and spiritual growth." },
        { title: "Mature Singles Conference", date: new Date("2026-03-20"), endDate: new Date("2026-03-22"), type: "national", location: "TBC", description: "Conference for mature singles addressing faith, relationships, and purpose." },
        { title: "Children Teachers' Training", date: new Date("2026-03-27"), endDate: new Date("2026-03-28"), type: "regional", location: "East Midlands", description: "Training programme for children's ministry teachers and workers." },
        { title: "Easter Retreat", date: new Date("2026-04-03"), endDate: new Date("2026-04-06"), type: "global", location: "All Locations", description: "Annual Easter retreat celebrating the death and resurrection of our Lord Jesus Christ." },
        { title: "Combined Service", date: new Date("2026-04-19"), type: "regional", location: "East Midlands", description: "Regional combined worship service for all East Midlands churches." },
        { title: "National Breakthrough Summit", date: new Date("2026-05-06"), endDate: new Date("2026-05-08"), type: "national", location: "TBC", description: "National summit focused on spiritual breakthroughs and revival." },
        { title: "Children's Day", date: new Date("2026-05-31"), type: "regional", location: "East Midlands", description: "Special celebration for children with activities, games, and worship." },
        { title: "Marriage Committee Training", date: new Date("2026-06-12"), endDate: new Date("2026-06-13"), type: "national", location: "TBC", description: "Training for marriage committee members across the nation." },
        { title: "YPF Barbecue", date: new Date("2026-06-20"), type: "ypf", location: "East Midlands", description: "Annual YPF summer barbecue for fellowship and fun." },
        { title: "Men's Conference", date: new Date("2026-06-20"), type: "regional", location: "East Midlands", description: "Regional men's conference focusing on godly manhood and leadership." },
        { title: "Women's Conference", date: new Date("2026-07-11"), type: "regional", location: "East Midlands", description: "Annual regional women's conference for spiritual growth and empowerment." },
        { title: "Combined Service", date: new Date("2026-07-19"), type: "regional", location: "East Midlands", description: "Regional combined worship service bringing all churches together." },
        { title: "Youth Conference", date: new Date("2026-08-01"), endDate: new Date("2026-08-09"), type: "national", location: "TBC", description: "Annual national youth conference for young people across the UK." },
        { title: "Safeguarding / Marshal Training", date: new Date("2026-09-11"), endDate: new Date("2026-09-12"), type: "national", location: "TBC", description: "Essential training for safeguarding officers and church marshals." },
        { title: "National Couples' Conference", date: new Date("2026-10-16"), endDate: new Date("2026-10-18"), type: "national", location: "TBC", description: "National conference for married couples focusing on building godly homes." },
        { title: "Combined Service", date: new Date("2026-10-18"), type: "regional", location: "East Midlands", description: "Regional combined worship service." },
        { title: "YPF: Career & Prof Growth Seminar", date: new Date("2026-11-07"), type: "ypf", location: "East Midlands", description: "Seminar on career development and professional growth for young professionals." },
        { title: "RO's & Wives Planning Meeting", date: new Date("2026-11-29"), endDate: new Date("2026-12-01"), type: "national", location: "TBC", description: "Annual planning meeting for Regional Overseers and wives." },
        { title: "YPF: Praise, Pray & Paint Fellowship", date: new Date("2026-12-05"), type: "ypf", location: "East Midlands", description: "Creative fellowship combining praise, prayer, and artistic expression." },
      ];
