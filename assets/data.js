/* Shared demo data. All events, figures and payments are simulated.
   `video:true` marks events whose short vertical clip appears in the reel rail —
   the media slot is ready for a real <video muted loop playsinline>.        */

const EVENTS = [
  {
    id:"food-fest", title:"Toronto Summer Food Festival",
    cat:"Food & Drink", tags:["trending","weekend","food"], trending:true, video:true, vlen:"0:12",
    dateShort:"SAT, AUG 30", date:"Sat, Aug 30", time:"4:00 PM", timeRange:"4:00 PM – 11:00 PM", doors:"Gates at 3:30 PM",
    venue:"Nathan Phillips Square", area:"Downtown", addr:"100 Queen St W, Toronto, ON M5H 2N2", km:1.8,
    from:15, interested:1240,
    art:{a:"#F0561A", b:"#F2A93B", glyph:"◗"},
    org:{name:"Toronto Eats Collective", followers:"18k", events:24, years:6, attendees:"96,000"},
    blurb:"Ninety kitchens, one square, and a skyline full of smoke.",
    about:[
      "Ninety of the city's best kitchens take over Nathan Phillips Square for one night — street food from every corner of Toronto, cooked in the open, eaten standing up.",
      "Live sets on two stages, a natural wine garden, and a late dessert alley that runs till close. Entry gets you in; dishes are $6–$14 from each vendor."
    ],
    expect:[
      {e:"🍢",n:"90+ kitchens",d:"Filipino BBQ to Punjabi street food"},
      {e:"🎧",n:"Two live stages",d:"DJs and bands till 11 PM"},
      {e:"🍷",n:"Wine garden",d:"Natural wine and local beer"},
      {e:"🌙",n:"Dessert alley",d:"Late-night sweets till close"},
    ],
    refund:"Refunds up to 7 days before the event",
    tiers:[
      {name:"General Entry", desc:"Access to all stages and vendor alleys", price:15},
      {name:"Entry + Tasting Pass", desc:"Entry plus six tasting tokens", price:39},
      {name:"Golden Fork (VIP)", desc:"Early 3 PM entry, lounge, ten tokens, free drink", price:79},
    ]
  },
  {
    id:"garba-night", title:"Navratri Garba & Dandiya Raas Night",
    cat:"Festivals", tags:["trending","weekend","music"], trending:true, video:true, vlen:"0:15",
    dateShort:"SAT, OCT 17", date:"Sat, Oct 17", time:"7:00 PM", timeRange:"7:00 PM – 1:00 AM", doors:"Doors at 6 PM",
    venue:"Paramount EventSpace", area:"Woodbridge", addr:"222 Rowntree Dairy Rd, Woodbridge, ON L4L 9T2", km:24.5,
    from:25, interested:3800,
    art:{a:"#D6206B", b:"#F2A93B", glyph:"◆"},
    org:{name:"Rangeela Events", followers:"2.1k", events:14, years:4, attendees:"9,800"},
    blurb:"Live dhol, a full orchestra, and 40,000 sq ft of dance floor.",
    about:[
      "The GTA's biggest Navratri celebration returns. Live dhol, a full garba orchestra flown in from Vadodara, and 40,000 sq ft of dance floor — bring your dandiya and your best outfit.",
      "Traditional garba till midnight, then a remix hour to close the night. Food stalls all evening."
    ],
    expect:[
      {e:"🥁",n:"Live orchestra",d:"Twelve-piece band from Vadodara"},
      {e:"💃",n:"Six hours of dance",d:"Garba till midnight, raas after"},
      {e:"🍛",n:"Food stalls",d:"Chaat, dabeli and chai all night"},
      {e:"🅿️",n:"Free parking",d:"900 spots on site"},
    ],
    refund:"Refunds up to 7 days before the event",
    tiers:[
      {name:"Early Bird", desc:"First 200 tickets", price:18, gone:true},
      {name:"General Admission", desc:"Full evening access", price:25},
      {name:"Family Pack (4)", desc:"Four tickets — save $20", price:80},
      {name:"VIP", desc:"Front section, lounge seating, chai and snacks", price:45},
    ]
  },
  {
    id:"night-bazaar", title:"Kensington Market Night Bazaar",
    cat:"Markets", tags:["trending","weekend","free","food","different"], trending:true, video:true, vlen:"0:09",
    dateShort:"FRI, AUG 21", date:"Fri, Aug 21", time:"6:00 PM", timeRange:"6:00 PM – 12:00 AM", doors:"Streets close at 5:30 PM",
    venue:"Kensington Market", area:"Downtown", addr:"Augusta Ave, Toronto, ON M5T 2L7", km:2.1,
    from:0, interested:2100,
    art:{a:"#6B3FD4", b:"#F0561A", glyph:"✦"},
    org:{name:"Kensington Collective", followers:"9.2k", events:31, years:8, attendees:"140,000"},
    blurb:"The streets close, the lights go up, and the whole market spills outside.",
    about:[
      "Once a month the cars disappear and Kensington turns into one long open-air night market — 200 vendors, six sound systems, and food from every doorway.",
      "Free to walk in. Bring cash for the small stalls."
    ],
    expect:[
      {e:"🏮",n:"200 vendors",d:"Vintage, art, records, plants"},
      {e:"🎺",n:"Street performers",d:"Six stages across the market"},
      {e:"🌮",n:"Food everywhere",d:"Every kitchen open till midnight"},
      {e:"🚶",n:"Car-free streets",d:"Walk the whole neighbourhood"},
    ],
    refund:"Free event — no ticket needed, RSVP helps us plan",
    tiers:[
      {name:"Free RSVP", desc:"Let us know you're coming", price:0},
      {name:"Market Supporter", desc:"Optional — keeps the bazaar running", price:10},
    ]
  },
  {
    id:"rooftop-sunset", title:"Rooftop Sunset Sessions: House & Disco",
    cat:"Nightlife", tags:["trending","weekend","music","different"], trending:true, video:true, vlen:"0:11",
    dateShort:"SAT, AUG 22", date:"Sat, Aug 22", time:"5:00 PM", timeRange:"5:00 PM – 11:00 PM", doors:"19+ · ID required",
    venue:"Lavelle Rooftop", area:"King West", addr:"627 King St W, Toronto, ON M5V 1M5", km:3.2,
    from:20, interested:940,
    art:{a:"#F0561A", b:"#6B3FD4", glyph:"○"},
    org:{name:"Golden Hour", followers:"7.4k", events:38, years:4, attendees:"31,000"},
    blurb:"Open-air house and disco while the sun goes down over the skyline.",
    about:[
      "Six hours of house and disco on an open rooftop, timed so the best set lands exactly at sunset.",
      "Pool deck open, full bar, and a skyline view worth the ticket on its own."
    ],
    expect:[
      {e:"🌇",n:"Sunset set",d:"Headliner starts at 8:10 PM"},
      {e:"🏊",n:"Pool deck",d:"Open all evening"},
      {e:"🍸",n:"Full bar",d:"Cocktails and frozen drinks"},
      {e:"🎶",n:"House & disco",d:"Four DJs back to back"},
    ],
    refund:"Refunds up to 48 hours before the event",
    tiers:[
      {name:"Early Bird", desc:"Arrive before 6 PM", price:20},
      {name:"General Admission", desc:"All evening access", price:32},
      {name:"Cabana for 6", desc:"Reserved cabana and bottle credit", price:320},
    ]
  },
  {
    id:"diwali-mela", title:"Diwali Mela at Exhibition Place",
    cat:"Festivals", tags:["free","family","food"], video:true, vlen:"0:14",
    dateShort:"SUN, NOV 8", date:"Sun, Nov 8", time:"12:00 PM", timeRange:"12:00 PM – 9:00 PM", doors:"Gates at 11:30 AM",
    venue:"Exhibition Place, Hall B", area:"Liberty Village", addr:"100 Princes' Blvd, Toronto, ON M6K 3C3", km:4.4,
    from:0, interested:5600,
    art:{a:"#F2A93B", b:"#D6206B", glyph:"✺"},
    org:{name:"Desi Collective TO", followers:"5.4k", events:22, years:6, attendees:"31,000"},
    blurb:"120 stalls, a fireworks finale, and performances all day.",
    about:[
      "Toronto's largest Diwali bazaar — 120+ stalls of clothes, jewellery, sweets and street food, a fireworks finale over the lake, and performances all day on the main stage.",
      "Free entry. Reserve a spot so we can plan capacity."
    ],
    expect:[
      {e:"🎆",n:"Fireworks finale",d:"8:30 PM over the lake"},
      {e:"🛍️",n:"120+ stalls",d:"Clothes, jewellery, sweets"},
      {e:"🎭",n:"Main stage",d:"Performances from noon"},
      {e:"🧒",n:"Kids' zone",d:"Rangoli, crafts and games"},
    ],
    refund:"Free event — no refunds needed",
    tiers:[
      {name:"Free Entry", desc:"Reservation recommended", price:0},
      {name:"Evening Show VIP", desc:"Reserved seating for the 7 PM show", price:20},
    ]
  },
  {
    id:"afrobeats", title:"Afrobeats & Amapiano Night",
    cat:"Nightlife", tags:["weekend","music"], video:true, vlen:"0:13",
    dateShort:"SAT, AUG 29", date:"Sat, Aug 29", time:"10:00 PM", timeRange:"10:00 PM – 3:00 AM", doors:"19+ · ID required",
    venue:"Nest Toronto", area:"Little Italy", addr:"423 College St, Toronto, ON M5T 1T1", km:2.6,
    from:25, interested:1560,
    art:{a:"#0A9179", b:"#F2A93B", glyph:"≋"},
    org:{name:"Lagos Nights TO", followers:"11k", events:52, years:5, attendees:"48,000"},
    blurb:"Two rooms, five DJs, and log drums until three in the morning.",
    about:[
      "Two rooms — afrobeats in the front, amapiano in the back — with five DJs trading sets until close.",
      "Toronto's biggest monthly for the sound. Come early, the line gets long by eleven."
    ],
    expect:[
      {e:"🎛️",n:"Five DJs",d:"Two rooms, two sounds"},
      {e:"🕺",n:"Till 3 AM",d:"Late licence"},
      {e:"🧥",n:"Coat check",d:"On site, $4"},
      {e:"🍹",n:"Full bar",d:"Cocktails and shots"},
    ],
    refund:"No refunds",
    tiers:[
      {name:"Early Entry", desc:"Arrive before 11 PM", price:25},
      {name:"General Admission", desc:"All night access", price:35},
      {name:"Table for 6", desc:"Reserved table and bottle credit", price:280},
    ]
  },
  {
    id:"islands-kite", title:"Toronto Islands Kite Festival",
    cat:"Family", tags:["weekend","free","family","different"],
    dateShort:"SUN, AUG 23", date:"Sun, Aug 23", time:"11:00 AM", timeRange:"11:00 AM – 5:00 PM", doors:"Ferries from 10 AM",
    venue:"Centre Island Beach", area:"Toronto Islands", addr:"Centre Island, Toronto, ON M5J 2E9", km:5.6,
    from:0, interested:820,
    art:{a:"#0A9179", b:"#6B3FD4", glyph:"◭"},
    org:{name:"Islands Parks Society", followers:"3.1k", events:12, years:9, attendees:"27,000"},
    blurb:"A thousand kites over the lake, and one very good breeze.",
    about:[
      "Bring a kite or build one on site. Giant show kites from six countries fly all afternoon over Centre Island Beach.",
      "Free to attend — you pay only for the ferry. Kite-building tent runs 11 AM to 3 PM."
    ],
    expect:[
      {e:"🪁",n:"Giant show kites",d:"Six visiting teams"},
      {e:"🛠️",n:"Build your own",d:"Free kids' workshop tent"},
      {e:"🏖️",n:"Beach day",d:"Swim and picnic spots"},
      {e:"⛴️",n:"Ferry ride",d:"12 min from the mainland"},
    ],
    refund:"Free event",
    tiers:[
      {name:"Free RSVP", desc:"Helps us plan the workshop tent", price:0},
      {name:"Kite Kit + RSVP", desc:"Pre-built kite waiting for you", price:14},
    ]
  },
  {
    id:"desi-standup", title:"Log Kya Kahenge? — A Desi Stand-Up Night",
    cat:"Comedy", tags:["weekend","comedy"],
    dateShort:"FRI, SEP 11", date:"Fri, Sep 11", time:"8:00 PM", timeRange:"8:00 PM – 10:30 PM", doors:"Doors at 7:15 PM",
    venue:"Comedy Bar Danforth", area:"Danforth", addr:"2800 Danforth Ave, Toronto, ON M4C 1M1", km:7.8,
    from:30, interested:610,
    art:{a:"#CE2E0F", b:"#F2A93B", glyph:"❋"},
    org:{name:"Brown Noise Comedy", followers:"1.9k", events:28, years:4, attendees:"7,600"},
    blurb:"Six comics, one lineup, everything your parents pretend didn't happen.",
    about:[
      "Six desi comics on one lineup — aunty gossip, arranged-marriage escape stories, and the full immigrant-kid catalogue.",
      "English, Hindi and Punjabi mix. Two-item minimum applies."
    ],
    expect:[
      {e:"🎤",n:"Six comics",d:"Two-hour lineup show"},
      {e:"🍺",n:"Full bar",d:"Two-item minimum"},
      {e:"🔥",n:"Front-row risk",d:"You will be spoken to"},
      {e:"🗣️",n:"Multilingual",d:"English, Hindi, Punjabi"},
    ],
    refund:"Refunds up to 48 hours before the event",
    tiers:[
      {name:"General Seating", desc:"First come, first seated", price:30},
      {name:"Front Table (2)", desc:"Reserved table for two up front", price:75},
    ]
  },
  {
    id:"silent-disco", title:"Silent Disco in Trinity Bellwoods",
    cat:"Nightlife", tags:["weekend","different","music"], video:true, vlen:"0:10",
    dateShort:"SAT, AUG 22", date:"Sat, Aug 22", time:"8:00 PM", timeRange:"8:00 PM – 11:30 PM", doors:"Headphones from 7:45 PM",
    venue:"Trinity Bellwoods Park", area:"West End", addr:"790 Queen St W, Toronto, ON M6J 1G3", km:3.0,
    from:24, interested:1120,
    art:{a:"#6B3FD4", b:"#0A9179", glyph:"◉"},
    org:{name:"Quiet Riot TO", followers:"5.8k", events:44, years:3, attendees:"36,000"},
    blurb:"Three channels, one park, and absolute silence if you take the headphones off.",
    about:[
      "Three DJs, three colour-coded channels, and 600 pairs of headphones under the trees. Switch channels whenever you like.",
      "Headphones included with your ticket and returned at the gate."
    ],
    expect:[
      {e:"🎧",n:"Headphones included",d:"Three switchable channels"},
      {e:"🌳",n:"Outdoors",d:"Under the trees, rain or shine"},
      {e:"📸",n:"Very photogenic",d:"LED headphones after dark"},
      {e:"🤫",n:"Silent to passers-by",d:"Park rules friendly"},
    ],
    refund:"Refunds up to 24 hours before the event",
    tiers:[
      {name:"General Admission", desc:"Includes headphone rental", price:24},
      {name:"Pair Pass (2)", desc:"Two tickets — save $8", price:40},
    ]
  },
  {
    id:"punjabi-wave", title:"Punjabi Wave: Live in Concert",
    cat:"Music", tags:["music"],
    dateShort:"FRI, NOV 20", date:"Fri, Nov 20", time:"8:00 PM", timeRange:"8:00 PM – 11:30 PM", doors:"Doors at 7 PM",
    venue:"Rebel Toronto", area:"Waterfront", addr:"11 Polson St, Toronto, ON M5A 1A4", km:4.9,
    from:59, interested:4200,
    art:{a:"#1E4FA8", b:"#0A9179", glyph:"◈"},
    org:{name:"NorthSide Live", followers:"12k", events:9, years:3, attendees:"42,000"},
    blurb:"A full live band and the loudest bhangra floor in the city.",
    about:[
      "A full live band, waterfront views, and the loudest bhangra floor in the city. Openers from Toronto's own Punjabi underground.",
      "VIP includes a meet and greet plus early merch access."
    ],
    expect:[
      {e:"🎸",n:"Full live band",d:"Not a DJ set"},
      {e:"🌊",n:"Waterfront venue",d:"Views across the harbour"},
      {e:"👕",n:"Tour merch",d:"Early access for VIP"},
      {e:"🍻",n:"19+ bar",d:"ID required at door"},
    ],
    refund:"Refunds up to 30 days before the event",
    tiers:[
      {name:"General Admission", desc:"Standing floor", price:59},
      {name:"Balcony Reserved", desc:"Seated, best sightlines", price:89},
      {name:"VIP Meet & Greet", desc:"Early entry, meet and greet, merch pack", price:149},
    ]
  },
  {
    id:"ramen-crawl", title:"Ramen & Sake Crawl",
    cat:"Food & Drink", tags:["food","different"],
    dateShort:"THU, AUG 27", date:"Thu, Aug 27", time:"6:30 PM", timeRange:"6:30 PM – 10:00 PM", doors:"Meet at first stop 6:15 PM",
    venue:"Starts at Kinton Ramen", area:"Baldwin Village", addr:"51 Baldwin St, Toronto, ON M5T 1L1", km:2.3,
    from:45, interested:380,
    art:{a:"#CE2E0F", b:"#6B3FD4", glyph:"◐"},
    org:{name:"Slurp Society", followers:"2.6k", events:19, years:2, attendees:"4,200"},
    blurb:"Four shops, four bowls, four sakes, one guide.",
    about:[
      "Four ramen shops in one evening, a half bowl at each, paired with a different sake and a short story about the style.",
      "Groups of twelve. Vegetarian route available — pick it at checkout."
    ],
    expect:[
      {e:"🍜",n:"Four bowls",d:"Tonkotsu to shoyu"},
      {e:"🍶",n:"Sake pairings",d:"One at each stop"},
      {e:"🚶",n:"Short walks",d:"All stops within 10 min"},
      {e:"👥",n:"Small group",d:"Capped at twelve people"},
    ],
    refund:"Refunds up to 5 days before the event",
    tiers:[
      {name:"Full Crawl", desc:"Four stops, four pairings", price:45},
      {name:"Vegetarian Route", desc:"Same crawl, veg bowls throughout", price:45},
    ]
  },
  {
    id:"cricket-final", title:"IND vs PAK Final — Big Screen Watch Party",
    cat:"Sports", tags:["today","trending"], trending:true,
    dateShort:"TODAY", date:"Today", time:"3:30 PM", timeRange:"3:30 PM – 8:00 PM", doors:"First ball 4 PM",
    venue:"The Rec Room Roundhouse", area:"Downtown", addr:"255 Bremner Blvd, Toronto, ON M5V 3M9", km:2.9,
    from:10, interested:2900,
    art:{a:"#0A9179", b:"#F2A93B", glyph:"◎"},
    org:{name:"GTA Cricket Club", followers:"4.4k", events:19, years:5, attendees:"12,300"},
    blurb:"The final, a 40-foot screen, and 600 of the loudest fans in the city.",
    about:[
      "The final, on a 40-foot screen, with 600 fans. Samosa platters, commentary bingo, and an innings-break dance-off.",
      "Wear your colours. Both sides welcome — barely."
    ],
    expect:[
      {e:"📺",n:"40-ft screen",d:"Plus twelve side screens"},
      {e:"🥟",n:"Food & bar",d:"Samosa platters all innings"},
      {e:"🎉",n:"Innings break",d:"Dance-off and giveaways"},
      {e:"👨‍👩‍👧",n:"All ages till 8",d:"19+ after the match"},
    ],
    refund:"No refunds",
    tiers:[
      {name:"Standing", desc:"General access", price:10},
      {name:"Table Seat", desc:"Reserved seat and samosa platter", price:28},
    ]
  },
  {
    id:"chai-verse", title:"Chai & Verse: Open Mic Night",
    cat:"Arts & Culture", tags:["today","free","different"],
    dateShort:"TODAY", date:"Today", time:"6:30 PM", timeRange:"6:30 PM – 9:00 PM", doors:"Sign-up at 6 PM",
    venue:"Bampot Tea House", area:"Harbord Village", addr:"201 Harbord St, Toronto, ON M5S 1H6", km:2.7,
    from:0, interested:210,
    art:{a:"#0A9179", b:"#F2A93B", glyph:"❂"},
    org:{name:"Kavita Toronto", followers:"640", events:34, years:3, attendees:"2,100"},
    blurb:"Poetry and acoustic sets in six languages, chai on the house.",
    about:[
      "Poetry, storytelling and acoustic sets in Urdu, Hindi, Tamil, Bengali, Punjabi and English. Chai on the house for performers.",
      "Free entry, pay what you can for the space. Sign up to perform when you arrive."
    ],
    expect:[
      {e:"🎙️",n:"Open mic",d:"Sign up at the door"},
      {e:"🫖",n:"Chai included",d:"Free for performers"},
      {e:"🌍",n:"Six languages",d:"All welcome"},
      {e:"🪑",n:"Floor seating",d:"Cushions and low tables"},
    ],
    refund:"Free event",
    tiers:[
      {name:"Attend", desc:"Free — just reserve a seat", price:0},
      {name:"Supporter", desc:"Pay what you can to keep it running", price:12},
    ]
  },
  {
    id:"kids-science", title:"Kids' Science Carnival",
    cat:"Family", tags:["weekend","family"],
    dateShort:"SUN, AUG 23", date:"Sun, Aug 23", time:"10:00 AM", timeRange:"10:00 AM – 4:00 PM", doors:"Doors at 9:45 AM",
    venue:"Ontario Science Centre", area:"Don Mills", addr:"770 Don Mills Rd, North York, ON M3C 1T3", km:11.2,
    from:14, interested:730,
    art:{a:"#6B3FD4", b:"#0A9179", glyph:"◬"},
    org:{name:"Curious Minds", followers:"6.3k", events:16, years:5, attendees:"22,000"},
    blurb:"Forty hands-on experiments and one very loud rocket launch.",
    about:[
      "Forty hands-on stations built for ages 4–12 — slime labs, circuit benches, a liquid-nitrogen ice cream counter and hourly rocket launches in the courtyard.",
      "One adult free with each child ticket."
    ],
    expect:[
      {e:"🧪",n:"40 stations",d:"All hands-on, ages 4–12"},
      {e:"🚀",n:"Rocket launches",d:"Every hour in the courtyard"},
      {e:"🍦",n:"Nitrogen ice cream",d:"Made in front of you"},
      {e:"🎟️",n:"Adult goes free",d:"One per child ticket"},
    ],
    refund:"Refunds up to 3 days before the event",
    tiers:[
      {name:"Child (4–12)", desc:"Includes one free adult", price:14},
      {name:"Family Pass", desc:"Three children and two adults", price:44},
    ]
  },
  {
    id:"qawwali-night", title:"Sufi Night: Qawwali Under the Stars",
    cat:"Arts & Culture", tags:["music","different"], video:true, vlen:"0:14",
    dateShort:"SAT, SEP 26", date:"Sat, Sep 26", time:"7:30 PM", timeRange:"7:30 PM – 10:30 PM", doors:"Doors at 6:45 PM",
    venue:"Aga Khan Museum Courtyard", area:"North York", addr:"77 Wynford Dr, North York, ON M3C 1K1", km:12.8,
    from:40, interested:1340,
    art:{a:"#144B63", b:"#F2A93B", glyph:"❁"},
    org:{name:"Mehfil Collective", followers:"980", events:11, years:2, attendees:"3,900"},
    blurb:"An open-air mehfil as the sun goes down over the courtyard.",
    about:[
      "An open-air mehfil in the museum courtyard — a seven-piece qawwali ensemble performing classics as the sun sets.",
      "Seating on floor cushions and chairs. Chai and kebab rolls at intermission."
    ],
    expect:[
      {e:"🌌",n:"Open air",d:"In the museum courtyard"},
      {e:"🎼",n:"Seven-piece ensemble",d:"Harmonium, tabla, vocals"},
      {e:"🫖",n:"Chai at interval",d:"Included with entry"},
      {e:"🏛️",n:"Museum access",d:"Galleries open before the show"},
    ],
    refund:"Refunds up to 7 days before the event",
    tiers:[
      {name:"Floor Cushion", desc:"Traditional mehfil seating", price:40},
      {name:"Reserved Chair", desc:"Chair seating, rear rows", price:52},
    ]
  },
  {
    id:"street-feast", title:"Little Italy Street Feast",
    cat:"Food & Drink", tags:["weekend","food","family"],
    dateShort:"SAT, SEP 5", date:"Sat, Sep 5", time:"12:00 PM", timeRange:"12:00 PM – 10:00 PM", doors:"Street closes at 11 AM",
    venue:"College St, Little Italy", area:"Little Italy", addr:"College St at Clinton, Toronto, ON M6G 1B1", km:3.4,
    from:12, interested:1680,
    art:{a:"#CE2E0F", b:"#0A9179", glyph:"◇"},
    org:{name:"College St BIA", followers:"4.9k", events:8, years:12, attendees:"210,000"},
    blurb:"Ten blocks closed, forty kitchens open, one very long table.",
    about:[
      "Ten blocks of College Street close for the day. Forty restaurants cook outside, there's a 200-seat communal table down the centre line, and three stages run till ten.",
      "Entry supports the street's small businesses. Dishes are $5–$12."
    ],
    expect:[
      {e:"🍝",n:"Forty kitchens",d:"Cooking on the street"},
      {e:"🪑",n:"200-seat table",d:"Down the centre of the road"},
      {e:"🎻",n:"Three stages",d:"Live music till 10 PM"},
      {e:"👨‍👩‍👧",n:"Family friendly",d:"Kids' block at Clinton"},
    ],
    refund:"Refunds up to 7 days before the event",
    tiers:[
      {name:"Street Pass", desc:"Entry and a welcome drink", price:12},
      {name:"Feast Pass", desc:"Entry plus five tasting tokens", price:34},
    ]
  },
  {
    id:"late-laughs", title:"Late Night Laughs: Comedy Showcase",
    cat:"Comedy", tags:["weekend","comedy"],
    dateShort:"FRI, AUG 21", date:"Fri, Aug 21", time:"9:30 PM", timeRange:"9:30 PM – 11:30 PM", doors:"19+ · Doors at 9 PM",
    venue:"The Rivoli", area:"Queen West", addr:"334 Queen St W, Toronto, ON M5V 2A2", km:2.8,
    from:18, interested:440,
    art:{a:"#F0561A", b:"#6B3FD4", glyph:"◔"},
    org:{name:"Rivoli Live", followers:"3.3k", events:96, years:11, attendees:"58,000"},
    blurb:"Eight comics, tight sets, and a headliner who doesn't get announced.",
    about:[
      "Eight comics, seven minutes each, and a surprise headliner who never gets announced in advance — often someone testing material before a tour.",
      "Back room, low ceiling, no phones."
    ],
    expect:[
      {e:"🎭",n:"Eight comics",d:"Seven-minute sets"},
      {e:"🕵️",n:"Surprise headliner",d:"Never announced"},
      {e:"📵",n:"Phone-free room",d:"Pouches at the door"},
      {e:"🍸",n:"Full bar",d:"Open till midnight"},
    ],
    refund:"Refunds up to 24 hours before the event",
    tiers:[
      {name:"General Admission", desc:"Open seating", price:18},
      {name:"Reserved Booth (4)", desc:"Booth for four, best sightline", price:88},
    ]
  },
  {
    id:"vinyl-flea", title:"Vintage & Vinyl Flea Market",
    cat:"Markets", tags:["weekend","free","different"],
    dateShort:"SUN, AUG 23", date:"Sun, Aug 23", time:"11:00 AM", timeRange:"11:00 AM – 6:00 PM", doors:"Early bird from 10 AM",
    venue:"The Symes", area:"Stockyards", addr:"150 Symes Rd, Toronto, ON M6N 0A8", km:8.9,
    from:0, interested:560,
    art:{a:"#6B3FD4", b:"#CE2E0F", glyph:"◍"},
    org:{name:"Crate Diggers TO", followers:"7.1k", events:26, years:6, attendees:"41,000"},
    blurb:"Eighty sellers, forty thousand records, one art-deco hall.",
    about:[
      "Eighty sellers of records, vintage clothing, cameras and furniture inside a restored art-deco incinerator building.",
      "Free entry from 11 AM. Early-bird ticket gets you in at 10 AM before the good crates are picked over."
    ],
    expect:[
      {e:"💿",n:"40,000 records",d:"Every genre, every price"},
      {e:"🧥",n:"Vintage clothing",d:"Thirty sellers"},
      {e:"🏛️",n:"Art-deco hall",d:"Worth seeing on its own"},
      {e:"☕",n:"Coffee bar",d:"Open all day"},
    ],
    refund:"Free general entry",
    tiers:[
      {name:"Free Entry (11 AM)", desc:"General admission", price:0},
      {name:"Early Bird (10 AM)", desc:"One hour before the crowd", price:12},
    ]
  },
  {
    id:"sunrise-yoga", title:"Sunrise Yoga + Chai on the Beach",
    cat:"Wellness", tags:["weekend","different","family"],
    dateShort:"SUN, AUG 23", date:"Sun, Aug 23", time:"6:30 AM", timeRange:"6:30 AM – 8:30 AM", doors:"Mats out at 6:15 AM",
    venue:"Woodbine Beach", area:"The Beaches", addr:"1675 Lake Shore Blvd E, Toronto, ON M4L 3W6", km:9.4,
    from:18, interested:290,
    art:{a:"#F2A93B", b:"#0A9179", glyph:"◜"},
    org:{name:"Sunrise Collective", followers:"2.2k", events:41, years:3, attendees:"8,900"},
    blurb:"Ninety minutes on the sand, then masala chai as the city wakes up.",
    about:[
      "A ninety-minute all-levels flow on the sand facing the lake, timed to finish just after sunrise, followed by masala chai and breakfast buns.",
      "Mats provided if you don't bring one."
    ],
    expect:[
      {e:"🌅",n:"Sunrise timed",d:"Ends just after sunrise"},
      {e:"🧘",n:"All levels",d:"Beginners very welcome"},
      {e:"🫖",n:"Chai after",d:"Masala chai and buns"},
      {e:"🧺",n:"Mats provided",d:"Or bring your own"},
    ],
    refund:"Refunds up to 24 hours before the event",
    tiers:[
      {name:"Flow + Chai", desc:"Class, mat and breakfast", price:18},
      {name:"Bring a Friend", desc:"Two spots — save $6", price:30},
    ]
  },
  {
    id:"kathak-tabla", title:"Kathak & Tabla: An Evening of Classics",
    cat:"Arts & Culture", tags:["family","different"],
    dateShort:"SUN, OCT 4", date:"Sun, Oct 4", time:"5:00 PM", timeRange:"5:00 PM – 7:30 PM", doors:"Doors at 4:30 PM",
    venue:"Harbourfront Centre Theatre", area:"Waterfront", addr:"231 Queens Quay W, Toronto, ON M5J 2G8", km:3.7,
    from:35, interested:340,
    art:{a:"#D6206B", b:"#1E4FA8", glyph:"◪"},
    org:{name:"Taal Academy", followers:"1.2k", events:8, years:7, attendees:"5,400"},
    blurb:"Three generations of one gharana on a single stage.",
    about:[
      "A full-length kathak recital with live tabla, sarangi and vocals — three generations of dancers from the Lucknow gharana on one stage.",
      "Pre-show talk at 4:30 PM on the history of the form."
    ],
    expect:[
      {e:"💃",n:"Full recital",d:"Two and a half hours"},
      {e:"🥁",n:"Live musicians",d:"Tabla, sarangi, vocals"},
      {e:"🎓",n:"Pre-show talk",d:"4:30 PM, free with ticket"},
      {e:"👪",n:"All ages",d:"Children welcome"},
    ],
    refund:"Refunds up to 14 days before the event",
    tiers:[
      {name:"General", desc:"Open seating", price:35},
      {name:"Premium", desc:"Centre rows, programme included", price:55},
    ]
  },
  {
    id:"bollywood-y2k", title:"Bollywood Night: Y2K Edition (19+)",
    cat:"Nightlife", tags:["today","weekend","music"],
    dateShort:"SAT, AUG 22", date:"Sat, Aug 22", time:"10:00 PM", timeRange:"10:00 PM – 3:00 AM", doors:"19+ · ID required",
    venue:"Nest Toronto", area:"Little Italy", addr:"423 College St, Toronto, ON M5T 1T1", km:2.6,
    from:22.9, interested:1890,
    art:{a:"#7C1E9E", b:"#F0561A", glyph:"◒"},
    org:{name:"Filmi Fridays", followers:"3.8k", events:41, years:5, attendees:"18,500"},
    blurb:"Every 2000s banger you screamed at your cousin's wedding.",
    about:[
      "Every 2000s banger you screamed at your cousin's wedding — SRK-era classics, an item-song hour, and a live dhol set at midnight.",
      "Dress code: Y2K Bollywood. Best dressed wins a bar tab."
    ],
    expect:[
      {e:"📼",n:"Y2K only",d:"2000–2010 wall to wall"},
      {e:"🥁",n:"Live dhol",d:"Midnight set"},
      {e:"👗",n:"Dress code",d:"Best dressed wins a tab"},
      {e:"🧥",n:"Coat check",d:"On site"},
    ],
    refund:"No refunds",
    tiers:[
      {name:"Early Entry", desc:"Arrive before 11 PM", price:22.9},
      {name:"General Admission", desc:"All night access", price:29.9},
      {name:"Booth for 6", desc:"Reserved booth and bottle credit", price:240},
    ]
  },
  {
    id:"harbour-cruise", title:"Sunset Harbour Cruise & Dinner",
    cat:"Food & Drink", tags:["weekend","food","different"],
    dateShort:"FRI, SEP 4", date:"Fri, Sep 4", time:"6:30 PM", timeRange:"6:30 PM – 9:30 PM", doors:"Boarding from 6 PM",
    venue:"Harbourfront Pier 6", area:"Waterfront", addr:"235 Queens Quay W, Toronto, ON M5J 2G8", km:3.8,
    from:68, interested:520,
    art:{a:"#1E4FA8", b:"#F2A93B", glyph:"◞"},
    org:{name:"Harbour Nights", followers:"3.7k", events:64, years:7, attendees:"29,000"},
    blurb:"Three hours on the water with the skyline going gold behind you.",
    about:[
      "A three-hour cruise around the islands with a three-course dinner, a live jazz trio and an open top deck for the sunset.",
      "Boarding closes at 6:20 PM sharp — the boat does not wait."
    ],
    expect:[
      {e:"🚢",n:"Three hours",d:"Full loop of the islands"},
      {e:"🍽️",n:"Three courses",d:"Veg and halal options"},
      {e:"🎷",n:"Live jazz trio",d:"Through dinner service"},
      {e:"🌇",n:"Open top deck",d:"Best skyline view in the city"},
    ],
    refund:"Refunds up to 14 days before the event",
    tiers:[
      {name:"Dinner Cruise", desc:"Cruise, dinner and deck access", price:68},
      {name:"Window Table for 2", desc:"Reserved window seating", price:158},
    ]
  },
];

/* fee model — buyer pays face + service fee; platform pays Stripe out of that fee */
const FEE_PCT = 0.055, FEE_FLAT = 1.29;
const STRIPE_PCT = 0.029, STRIPE_FLAT = 0.30;
const fee = p => p === 0 ? 0 : p * FEE_PCT + FEE_FLAT;
const $ = n => "$" + n.toFixed(2);
const $$ = n => "$" + Math.round(n).toLocaleString("en-CA");
const money = n => n === 0 ? "Free" : $(n);
const kInterested = n => n >= 1000 ? (n/1000).toFixed(1).replace(/\.0$/,"") + "K" : String(n);

/* platform-owner figures (6 months, simulated) */
const PLATFORM = {
  gmv:386540, serviceFees:37359, stripeCost:14263, net:23096,
  tickets:12480, orders:6568, organizers:34, events:61, live:18,
  months:[
    {m:"Mar", gmv:28400, rev:2744},{m:"Apr", gmv:41200, rev:3980},
    {m:"May", gmv:52800, rev:5101},{m:"Jun", gmv:63500, rev:6134},
    {m:"Jul", gmv:88300, rev:8530},{m:"Aug", gmv:112340, rev:10870},
  ],
  topOrgs:[
    {name:"Toronto Eats Collective", events:7, gmv:74300, fee:7178},
    {name:"Rangeela Events", events:8, gmv:71250, fee:6883},
    {name:"Desi Collective TO", events:6, gmv:68400, fee:6608},
    {name:"NorthSide Live", events:4, gmv:64900, fee:6270},
    {name:"Golden Hour", events:11, gmv:52300, fee:5053},
  ],
  otherOrgs:{count:29, events:25, gmv:55390, fee:5367},
  allEvents:[
    ["Toronto Summer Food Festival","Toronto Eats Collective","Aug 30","1,842 / 3,000",41400,4000,"live"],
    ["Punjabi Wave: Live in Concert","NorthSide Live","Nov 20","640 / 2,500",44800,4346,"live"],
    ["Diwali Mela at Exhibition Place","Desi Collective TO","Nov 8","1,230 VIP",24600,2386,"live"],
    ["Bollywood Night: Y2K Edition","Filmi Fridays","Aug 22","486 / 500",13290,1289,"soon"],
    ["Sufi Night: Qawwali Under the Stars","Mehfil Collective","Sep 26","240 / 300",10080,978,"live"],
    ["IND vs PAK Final — Watch Party","GTA Cricket Club","Aug 16","552 / 600",9660,937,"done"],
    ["Navratri Garba & Dandiya Raas Night","Rangeela Events","Oct 17","312 / 600",8765,850,"live"],
    ["Kathak & Tabla: Evening of Classics","Taal Academy","Oct 4","96 / 400",3840,373,"warn"],
  ],
  payouts:[
    ["Toronto Eats Collective","Tue Aug 18",14210],
    ["Rangeela Events","Tue Aug 18",7912],
    ["Filmi Fridays","Wed Aug 19",11984],
    ["GTA Cricket Club","Thu Aug 20",8724],
  ],
};
PLATFORM.collected = PLATFORM.gmv + PLATFORM.serviceFees;
