export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  type: 'regional' | 'national' | 'global' | 'ypf';
  location?: string;
  description?: string;
}

export const calendarEvents: CalendarEvent[] = [
  // January 2026
  { 
    id: 1, 
    title: "7-Day Morning Prayer: Command Your Morning", 
    date: "2026-01-02", 
    endDate: "2026-01-08", 
    type: "regional",
    description: "Start the year with powerful morning prayers based on Job 38:12-13. Join us daily from 6:00 - 6:30 AM on Zoom. Meeting ID: 83486339797 | Passcode: EMR2025"
  },
  { 
    id: 2, 
    title: "Covenant Services", 
    date: "2026-01-04", 
    type: "global",
    description: "Special covenant service to dedicate the new year to God."
  },
  { 
    id: 3, 
    title: "Covenant Services", 
    date: "2026-01-11", 
    type: "global",
    description: "Continue our covenant commitment with God."
  },
  { 
    id: 4, 
    title: "Parents Forum: Purposeful Parenting - Preserving Posterity", 
    date: "2026-01-17", 
    type: "national",
    description: "Virtual gathering for parents at 10:00 AM. Zoom ID: 396569886 | Passcode: 252166. Please invite your friends and family."
  },
  { 
    id: 5, 
    title: "Combined Service", 
    date: "2026-01-18", 
    type: "regional",
    description: "All East Midlands churches gather together for united worship."
  },
  { 
    id: 6, 
    title: "YPF: Foundational Programme", 
    date: "2026-01-18", 
    type: "ypf",
    description: "Young People's Fellowship foundational training programme."
  },
  { 
    id: 43, 
    title: "YPF: JABBOK - From Encounter to Territorial Takeover", 
    date: "2026-01-24", 
    type: "ypf",
    location: "2-3 St Peter's Churchyard, Derby DE1 1NN",
    description: "A day of Dynamic Transformation. Come and be empowered to take over territories for Christ. Time: 12 noon prompt."
  },
  
  // February 2026
  { 
    id: 42, 
    title: "Monthly Prayer Vigil: There Shall Be A Performance", 
    date: "2026-02-06", 
    type: "regional",
    description: "Theme: There Shall Be A Performance (Luke 1:45). Time: 11:00 PM. Zoom ID: 83486339797 | Passcode: EMR2025. Live streaming on YouTube @dclmeastmidlandsuk"
  },
  { 
    id: 40, 
    title: "Parent Support Forum: Parents with Children in the Choir", 
    date: "2026-02-07", 
    type: "regional",
    location: "Via Zoom",
    description: "Come and be empowered to provide better home rehearsal culture. Time: 11:00 AM - 1:00 PM. Zoom ID: 83486339797 | Passcode: EMR2025. Topics include: supporting children during rehearsals, helping with home practice, teaching independence, and encouraging discipline."
  },
  { 
    id: 41, 
    title: "Regional Combined Service: ESTABLISHED!", 
    date: "2026-02-08", 
    type: "regional",
    location: "50 Walsgrave Rd, Coventry, CV2 4EB",
    description: "Theme: ESTABLISHED! All East Midlands churches gather together for united worship. Time: 11:00 AM. Ministering: Pastor Niran Seriki (Regional Overseer). Everyone welcome, please invite your friends and family."
  },
  { 
    id: 44, 
    title: "Mini Strategy Congress", 
    date: "2026-02-20", 
    endDate: "2026-02-22",
    type: "regional",
    description: "Regional Mini Strategy Congress for planning and strategic development."
  },
  
  // March 2026
  { 
    id: 7, 
    title: "RO & Wives' Prayer Retreat", 
    date: "2026-03-06", 
    endDate: "2026-03-08", 
    type: "national", 
    location: "Northampton",
    description: "Prayer retreat for Regional Overseers and their wives."
  },
  { 
    id: 8, 
    title: "Couples' Fellowship", 
    date: "2026-03-14", 
    type: "regional",
    description: "Monthly gathering for married couples for fellowship and spiritual growth."
  },
  { 
    id: 9, 
    title: "Mature Singles Conference", 
    date: "2026-03-20", 
    endDate: "2026-03-22", 
    type: "national",
    description: "Conference for mature singles addressing faith, relationships, and purpose."
  },
  { 
    id: 10, 
    title: "Children Teachers' Training", 
    date: "2026-03-27", 
    endDate: "2026-03-28", 
    type: "regional",
    description: "Training programme for children's ministry teachers and workers."
  },
  
  // April 2026
  { 
    id: 11, 
    title: "Easter Retreat", 
    date: "2026-04-03", 
    endDate: "2026-04-06", 
    type: "global",
    description: "Annual Easter retreat celebrating the death and resurrection of our Lord Jesus Christ."
  },
  { 
    id: 12, 
    title: "Combined Service", 
    date: "2026-04-19", 
    type: "regional",
    description: "Regional combined worship service for all East Midlands churches."
  },
  
  // May 2026
  { 
    id: 13, 
    title: "National Breakthrough Summit", 
    date: "2026-05-06", 
    endDate: "2026-05-08", 
    type: "national",
    description: "National summit focused on spiritual breakthroughs and revival."
  },
  { 
    id: 14, 
    title: "Children's Day", 
    date: "2026-05-31", 
    type: "regional",
    description: "Special celebration for children with activities, games, and worship."
  },
  
  // June 2026
  { 
    id: 15, 
    title: "Marriage Committee Training", 
    date: "2026-06-12", 
    endDate: "2026-06-13", 
    type: "national",
    description: "Training for marriage committee members across the nation."
  },
  { 
    id: 16, 
    title: "YPF Barbecue", 
    date: "2026-06-20", 
    type: "ypf",
    description: "Annual YPF summer barbecue for fellowship and fun."
  },
  { 
    id: 17, 
    title: "Men's Conference", 
    date: "2026-06-20", 
    type: "regional",
    description: "Regional men's conference focusing on godly manhood and leadership."
  },
  
  // July 2026
  { 
    id: 18, 
    title: "Women's Conference", 
    date: "2026-07-11", 
    type: "regional",
    description: "Annual regional women's conference for spiritual growth and empowerment."
  },
  { 
    id: 19, 
    title: "Combined Service", 
    date: "2026-07-19", 
    type: "regional",
    description: "Regional combined worship service bringing all churches together."
  },
  
  // August 2026
  { 
    id: 20, 
    title: "Youth Conference", 
    date: "2026-08-01", 
    endDate: "2026-08-09", 
    type: "national",
    description: "Annual national youth conference for young people across the UK."
  },
  
  // September 2026
  { 
    id: 21, 
    title: "Safeguarding / Marshal Training", 
    date: "2026-09-11", 
    endDate: "2026-09-12", 
    type: "national",
    description: "Essential training for safeguarding officers and church marshals."
  },
  
  // October 2026
  { 
    id: 22, 
    title: "National Couples' Conference", 
    date: "2026-10-16", 
    endDate: "2026-10-18", 
    type: "national",
    description: "National conference for married couples focusing on building godly homes."
  },
  { 
    id: 23, 
    title: "Combined Service", 
    date: "2026-10-18", 
    type: "regional",
    description: "Regional combined worship service."
  },
  
  // November 2026
  { 
    id: 24, 
    title: "YPF: Career & Prof Growth Seminar", 
    date: "2026-11-07", 
    type: "ypf",
    description: "Seminar on career development and professional growth for young professionals."
  },
  { 
    id: 25, 
    title: "RO's & Wives Planning Meeting", 
    date: "2026-11-29", 
    endDate: "2026-12-01", 
    type: "national",
    description: "Annual planning meeting for Regional Overseers and wives."
  },
  
  // December 2026
  { 
    id: 26, 
    title: "YPF: Praise, Pray & Paint Fellowship", 
    date: "2026-12-05", 
    type: "ypf",
    description: "Creative fellowship combining praise, prayer, and artistic expression."
  },
];

export const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'regional':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'national':
      return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'global':
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    case 'ypf':
      return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    default:
      return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

export const getEventTypeLabel = (type: string) => {
  switch (type) {
    case 'regional':
      return 'Regional';
    case 'national':
      return 'National';
    case 'global':
      return 'Global';
    case 'ypf':
      return 'YPF';
    default:
      return type;
  }
};

export const getUpcomingEvents = (limit?: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcoming = calendarEvents
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return limit ? upcoming.slice(0, limit) : upcoming;
};

export const getEventsForMonth = (year: number, month: number) => {
  return calendarEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getCurrentMonthEvents = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  return calendarEvents
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && 
             eventDate.getMonth() === month &&
             eventDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getEventsForDate = (date: Date) => {
  const dateStr = date.toISOString().split('T')[0];
  return calendarEvents.filter(event => {
    const eventDate = event.date;
    const eventEndDate = event.endDate;
    
    if (eventDate === dateStr) return true;
    
    if (eventEndDate) {
      const start = new Date(eventDate);
      const end = new Date(eventEndDate);
      const check = new Date(dateStr);
      return check >= start && check <= end;
    }
    
    return false;
  });
};
