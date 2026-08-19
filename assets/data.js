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

/* ============================================================
   Canada-wide supply. Free events are auto-sourced from partner
   feeds, then held for human verification before publishing.
   ============================================================ */
const REGIONS = [
  {prov:"ON", name:"Ontario",          cities:["Toronto","Ottawa","Hamilton","London"]},
  {prov:"BC", name:"British Columbia", cities:["Vancouver","Surrey","Victoria"]},
  {prov:"QC", name:"Quebec",           cities:["Montreal","Québec City"]},
  {prov:"AB", name:"Alberta",          cities:["Calgary","Edmonton"]},
  {prov:"MB", name:"Manitoba",         cities:["Winnipeg"]},
  {prov:"NS", name:"Nova Scotia",      cities:["Halifax"]},
];

const CANADA = [
  {
    id:"granville-buskers", title:"Granville Island Buskers Weekend",
    cat:"Festivals", tags:["weekend","free","family","different"], city:"Vancouver", prov:"BC",
    dateShort:"SAT, AUG 29", date:"Sat, Aug 29", time:"11:00 AM", timeRange:"11:00 AM – 8:00 PM", doors:"Pitches open at 11 AM",
    venue:"Granville Island Public Market", area:"False Creek", addr:"1669 Johnston St, Vancouver, BC V6H 3R9", km:3363,
    from:0, interested:4100, video:true, vlen:"0:11",
    art:{a:"#0A9179", b:"#F2A93B", glyph:"✧"},
    org:{name:"Island Arts Society", followers:"8.9k", events:17, years:11, attendees:"210,000"},
    blurb:"Forty street performers, six pitches, one very long weekend.",
    sourced:{feed:"Destination Vancouver", auto:true, checkedOn:"Aug 14"},
    about:[
      "Forty street performers from twelve countries take over six pitches around the market — fire, acrobatics, one-person orchestras and a man who escapes from things.",
      "Completely free. Performers pass the hat, so bring small bills."
    ],
    expect:[
      {e:"🤹",n:"40 performers",d:"Twelve countries represented"},
      {e:"🎪",n:"Six pitches",d:"New show every 30 minutes"},
      {e:"🦐",n:"Market food",d:"Public Market open all day"},
      {e:"👨‍👩‍👧",n:"All ages",d:"Free, no ticket needed"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"Helps the organizers plan crowd flow", price:0}],
  },
  {
    id:"prairie-lights", title:"Prairie Lights Winter Carnival",
    cat:"Festivals", tags:["weekend","free","family"], city:"Winnipeg", prov:"MB",
    dateShort:"SAT, NOV 21", date:"Sat, Nov 21", time:"4:00 PM", timeRange:"4:00 PM – 10:00 PM", doors:"Grounds open 3:30 PM",
    venue:"The Forks", area:"Downtown", addr:"1 Forks Market Rd, Winnipeg, MB R3C 4L9", km:2113,
    from:0, interested:2700,
    art:{a:"#1E4FA8", b:"#6B3FD4", glyph:"❉"},
    org:{name:"Forks Winter Council", followers:"6.2k", events:9, years:14, attendees:"180,000"},
    blurb:"Ice sculptures, fire pits and 60,000 lights along the river trail.",
    sourced:{feed:"Tourism Winnipeg", auto:true, checkedOn:"Aug 12"},
    about:[
      "Sixty thousand lights along the river walk, twenty ice sculptures carved live through the evening, and fire pits every hundred metres.",
      "Free to walk through. Skate rental and hot chocolate on site."
    ],
    expect:[
      {e:"🧊",n:"Live ice carving",d:"Twenty sculptures through the night"},
      {e:"🔥",n:"Fire pits",d:"Free, first come first served"},
      {e:"⛸️",n:"River skating",d:"Rentals $8 on site"},
      {e:"☕",n:"Hot chocolate",d:"Six vendors along the trail"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"No ticket needed — RSVP for updates", price:0}],
  },
  {
    id:"old-port-lumiere", title:"Old Port Illuminations",
    cat:"Arts & Culture", tags:["weekend","free","family","different"], city:"Montreal", prov:"QC",
    dateShort:"FRI, OCT 2", date:"Fri, Oct 2", time:"7:00 PM", timeRange:"7:00 PM – 12:00 AM", doors:"Projections start at dusk",
    venue:"Vieux-Port de Montréal", area:"Old Montreal", addr:"333 Rue de la Commune O, Montréal, QC H2Y 2E2", km:504,
    from:0, interested:6300, video:true, vlen:"0:13",
    art:{a:"#6B3FD4", b:"#0A9179", glyph:"◈"},
    org:{name:"Lumière Collectif", followers:"14k", events:21, years:7, attendees:"420,000"},
    blurb:"Twelve buildings turned into projection screens for one night.",
    sourced:{feed:"Tourisme Montréal", auto:true, checkedOn:"Aug 15"},
    about:[
      "Twelve heritage buildings across the Old Port become projection surfaces for work by Québécois digital artists, synced to a score played through the whole quarter.",
      "Free and outdoors. The route takes about ninety minutes to walk end to end."
    ],
    expect:[
      {e:"🏛️",n:"12 buildings",d:"Projection-mapped facades"},
      {e:"🎼",n:"Synced score",d:"Across the whole quarter"},
      {e:"🚶",n:"90-minute route",d:"Walk it in any direction"},
      {e:"📷",n:"Very photogenic",d:"Peak light after 8:30 PM"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"Get the route map by email", price:0}],
  },
  {
    id:"chuckwagon-breakfast", title:"Chuckwagon Kickoff Pancake Breakfast",
    cat:"Festivals", tags:["free","family","food"], city:"Calgary", prov:"AB",
    dateShort:"SAT, SEP 12", date:"Sat, Sep 12", time:"7:00 AM", timeRange:"7:00 AM – 11:00 AM", doors:"Griddles on at 7 AM",
    venue:"Olympic Plaza", area:"Downtown", addr:"228 8 Ave SE, Calgary, AB T2G 0K9", km:2704,
    from:0, interested:3400,
    art:{a:"#F0561A", b:"#F2A93B", glyph:"◓"},
    org:{name:"Calgary Community Table", followers:"5.1k", events:13, years:18, attendees:"260,000"},
    blurb:"Free pancakes for eight thousand people, cooked by volunteers.",
    sourced:{feed:"Tourism Calgary", auto:true, checkedOn:"Aug 11"},
    about:[
      "Eight thousand plates of pancakes served free by two hundred volunteers, with live country on the plaza stage and a working chuckwagon on display.",
      "Genuinely free — donations go to the Calgary Food Bank."
    ],
    expect:[
      {e:"🥞",n:"Free pancakes",d:"Served till they run out"},
      {e:"🎸",n:"Live country",d:"From 8 AM on the plaza"},
      {e:"🐎",n:"Chuckwagon",d:"On display, open to walk through"},
      {e:"❤️",n:"Food bank drive",d:"Donations welcome, not required"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"Helps volunteers plan batter volume", price:0}],
  },
  {
    id:"halifax-waterfront", title:"Halifax Waterfront Buskers",
    cat:"Festivals", tags:["weekend","free","family"], city:"Halifax", prov:"NS",
    dateShort:"SUN, AUG 30", date:"Sun, Aug 30", time:"12:00 PM", timeRange:"12:00 PM – 9:00 PM", doors:"First show at noon",
    venue:"Halifax Waterfront Boardwalk", area:"Downtown", addr:"1655 Lower Water St, Halifax, NS B3J 1S3", km:1256,
    from:0, interested:1900,
    art:{a:"#1E4FA8", b:"#0A9179", glyph:"◑"},
    org:{name:"Waterfront Arts", followers:"3.4k", events:11, years:9, attendees:"88,000"},
    blurb:"Nine hours of street theatre along the longest boardwalk in the country.",
    sourced:{feed:"Discover Halifax", auto:true, checkedOn:"Aug 13"},
    about:[
      "Street theatre, circus and music along four kilometres of boardwalk, with the harbour behind every stage.",
      "Free. Shows run continuously from noon — just walk until something starts."
    ],
    expect:[
      {e:"🎭",n:"Street theatre",d:"Continuous from noon"},
      {e:"⚓",n:"Harbour setting",d:"4 km of boardwalk"},
      {e:"🦞",n:"Waterfront food",d:"Twenty vendors on the strip"},
      {e:"👪",n:"All ages",d:"Free, no ticket needed"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"Get the show schedule by email", price:0}],
  },
  {
    id:"nuit-lumiere-ott", title:"Nuit Lumière All-Night Art Walk",
    cat:"Arts & Culture", tags:["weekend","free","different"], city:"Ottawa", prov:"ON",
    dateShort:"SAT, SEP 19", date:"Sat, Sep 19", time:"7:00 PM", timeRange:"7:00 PM – 3:00 AM", doors:"Runs all night",
    venue:"ByWard Market & Rideau Canal", area:"Downtown", addr:"55 ByWard Market Sq, Ottawa, ON K1N 9C3", km:352,
    from:0, interested:2200,
    art:{a:"#6B3FD4", b:"#F0561A", glyph:"✵"},
    org:{name:"Capital Arts Night", followers:"4.8k", events:7, years:6, attendees:"140,000"},
    blurb:"Eighty installations, open till three in the morning.",
    sourced:{feed:"Ottawa Tourism", auto:true, checkedOn:"Aug 14"},
    about:[
      "Eighty temporary installations across downtown Ottawa, open from dusk until 3 AM. Galleries, parking garages and the canal locks all get used as venues.",
      "Free. Shuttle buses loop the four zones every fifteen minutes."
    ],
    expect:[
      {e:"🌃",n:"Open till 3 AM",d:"Peak crowd around midnight"},
      {e:"🖼️",n:"80 installations",d:"Across four walkable zones"},
      {e:"🚌",n:"Free shuttles",d:"Every 15 min between zones"},
      {e:"🍜",n:"Late food",d:"Market kitchens open till 2 AM"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"Get the zone map and shuttle times", price:0}],
  },
  {
    id:"bhangra-park", title:"Bhangra in the Park",
    cat:"Festivals", tags:["weekend","free","family","music"], city:"Surrey", prov:"BC",
    dateShort:"SUN, SEP 6", date:"Sun, Sep 6", time:"1:00 PM", timeRange:"1:00 PM – 8:00 PM", doors:"Gates at 12:30 PM",
    venue:"Holland Park", area:"Surrey Central", addr:"13428 Old Yale Rd, Surrey, BC V3T 0J3", km:3341,
    from:0, interested:5200, video:true, vlen:"0:12",
    art:{a:"#F0561A", b:"#0A9179", glyph:"◆"},
    org:{name:"Punjabi Arts BC", followers:"16k", events:26, years:12, attendees:"310,000"},
    blurb:"Thirty dance teams, four dhol circles, and langar for everyone.",
    sourced:{feed:"Tourism Surrey", auto:true, checkedOn:"Aug 12"},
    about:[
      "Thirty bhangra and gidha teams compete across two stages, with open dhol circles running between sets and free langar served all afternoon.",
      "One of the largest Punjabi cultural events in North America, and completely free to attend."
    ],
    expect:[
      {e:"🥁",n:"30 dance teams",d:"Competing across two stages"},
      {e:"🍛",n:"Free langar",d:"Served all afternoon"},
      {e:"🎪",n:"Open dhol circles",d:"Anyone can join in"},
      {e:"🎟️",n:"Free entry",d:"No ticket required"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"Helps organizers plan langar volume", price:0}],
  },
  {
    id:"diwali-drive", title:"Diwali on the Drive",
    cat:"Festivals", tags:["free","family","food"], city:"Vancouver", prov:"BC",
    dateShort:"SAT, NOV 7", date:"Sat, Nov 7", time:"3:00 PM", timeRange:"3:00 PM – 10:00 PM", doors:"Street closes at 2 PM",
    venue:"Commercial Drive", area:"East Vancouver", addr:"Commercial Dr at E 1st Ave, Vancouver, BC V5L 3W9", km:3363,
    from:0, interested:3100,
    art:{a:"#F2A93B", b:"#D6206B", glyph:"✺"},
    org:{name:"Vancouver Desi Arts", followers:"7.3k", events:18, years:8, attendees:"96,000"},
    blurb:"Ten blocks of diyas, dance and mithai on the Drive.",
    sourced:{feed:"Destination Vancouver", auto:true, checkedOn:"Aug 15"},
    about:[
      "Ten blocks of Commercial Drive close for a street-length Diwali celebration — 5,000 diyas lit at sunset, three stages, and mithai from every corner shop.",
      "Free to attend. Rangoli workshops run from 3 PM for kids."
    ],
    expect:[
      {e:"🪔",n:"5,000 diyas",d:"Lit together at sunset"},
      {e:"🎭",n:"Three stages",d:"Dance and live music"},
      {e:"🍬",n:"Mithai everywhere",d:"Every shop on the strip"},
      {e:"🎨",n:"Rangoli workshops",d:"Free for kids from 3 PM"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"Get the stage schedule by email", price:0}],
  },
  {
    id:"island-carnival", title:"Island Carnival Grand Parade",
    cat:"Festivals", tags:["weekend","free","family","music"], city:"Toronto", prov:"ON", km:6.2,
    dateShort:"SAT, AUG 29", date:"Sat, Aug 29", time:"10:00 AM", timeRange:"10:00 AM – 7:00 PM", doors:"Route opens 9 AM",
    venue:"Lake Shore Blvd W", area:"Exhibition", addr:"Lake Shore Blvd W, Toronto, ON M6K 3C3",
    from:0, interested:8900, video:true, vlen:"0:15",
    art:{a:"#0A9179", b:"#F2A93B", glyph:"◕"},
    org:{name:"Island Carnival Association", followers:"22k", events:6, years:20, attendees:"1.2M"},
    blurb:"Twenty mas bands, six sound trucks, and the whole lakeshore closed.",
    sourced:{feed:"Destination Toronto", auto:true, checkedOn:"Aug 10"},
    about:[
      "Twenty masquerade bands and six sound trucks move down the lakeshore over nine hours, in the largest Caribbean carnival parade in North America.",
      "Free to watch from the route. Grandstand seating is ticketed separately."
    ],
    expect:[
      {e:"🎺",n:"20 mas bands",d:"Costume bands on the route"},
      {e:"🔊",n:"Six sound trucks",d:"Soca all day"},
      {e:"🍗",n:"Food village",d:"At the west end of the route"},
      {e:"🪑",n:"Grandstand option",d:"Reserved seats, $32"},
    ],
    refund:"Refunds up to 7 days before (grandstand only)",
    tiers:[
      {name:"Free Route Access", desc:"Watch from anywhere on the route", price:0},
      {name:"Grandstand Seat", desc:"Reserved seat at the judging point", price:32},
    ],
  },
  {
    id:"warehouse-techno", title:"Warehouse: Techno All-Nighter",
    cat:"Nightlife", tags:["weekend","music","different"], city:"Vancouver", prov:"BC",
    dateShort:"SAT, SEP 26", date:"Sat, Sep 26", time:"10:00 PM", timeRange:"10:00 PM – 6:00 AM", doors:"19+ · ID required",
    venue:"Red Truck Warehouse", area:"Strathcona", addr:"295 E 1st Ave, Vancouver, BC V5T 1A7", km:3363,
    from:30, interested:1450, video:true, vlen:"0:10",
    art:{a:"#141110", b:"#6B3FD4", glyph:"◤"},
    org:{name:"Concrete Sound", followers:"9.6k", events:47, years:6, attendees:"64,000"},
    blurb:"Eight hours, three rooms, no phones on the floor.",
    about:[
      "Eight hours across three rooms in a working warehouse — Berlin-style techno in the main, breaks in the annex, ambient in the loft.",
      "Camera stickers at the door. No photos on the floor, no exceptions."
    ],
    expect:[
      {e:"🔊",n:"Three rooms",d:"Techno, breaks, ambient"},
      {e:"🌅",n:"Till 6 AM",d:"Full all-night licence"},
      {e:"📵",n:"No phones",d:"Camera stickers at the door"},
      {e:"💧",n:"Free water",d:"All night, harm-reduction on site"},
    ],
    refund:"Refunds up to 48 hours before the event",
    tiers:[
      {name:"Phase 1", desc:"Limited early release", price:30},
      {name:"Phase 2", desc:"General release", price:45},
    ],
  },
  {
    id:"mtl-afterhours", title:"Afterhours: Basement Sessions",
    cat:"Nightlife", tags:["weekend","music"], city:"Montreal", prov:"QC",
    dateShort:"SAT, SEP 12", date:"Sat, Sep 12", time:"11:00 PM", timeRange:"11:00 PM – 8:00 AM", doors:"18+ · ID required",
    venue:"Salle Sous-Sol", area:"Mile End", addr:"5445 Av de Gaspé, Montréal, QC H2T 3B2", km:504,
    from:28, interested:980,
    art:{a:"#6B3FD4", b:"#D6206B", glyph:"◣"},
    org:{name:"Sous-Sol", followers:"11k", events:63, years:8, attendees:"120,000"},
    blurb:"Montreal's after-hours institution — nine hours, one room, one system.",
    about:[
      "One room, one custom sound system, and nine hours of house and disco that does not stop until the sun is fully up.",
      "Montreal's after-hours licence means the bar closes at 3 but the music does not."
    ],
    expect:[
      {e:"🌄",n:"Till 8 AM",d:"After-hours licence"},
      {e:"🎚️",n:"Custom system",d:"Built for the room"},
      {e:"🚭",n:"One room",d:"No VIP, no sections"},
      {e:"☕",n:"Morning coffee",d:"Served from 6 AM"},
    ],
    refund:"Refunds up to 48 hours before the event",
    tiers:[
      {name:"Advance", desc:"Limited advance release", price:28},
      {name:"Door", desc:"General release", price:40},
    ],
  },
  {
    id:"edmonton-folk", title:"River Valley Folk Nights",
    cat:"Music", tags:["weekend","music","family"], city:"Edmonton", prov:"AB",
    dateShort:"FRI, SEP 4", date:"Fri, Sep 4", time:"6:00 PM", timeRange:"6:00 PM – 11:00 PM", doors:"Hill opens at 5 PM",
    venue:"Gallagher Park", area:"River Valley", addr:"9200 100 St NW, Edmonton, AB T6E 6E4", km:2698,
    from:38, interested:2400,
    art:{a:"#0A9179", b:"#F2A93B", glyph:"◠"},
    org:{name:"River Valley Music", followers:"13k", events:15, years:16, attendees:"340,000"},
    blurb:"Bring a tarp, sit on the hill, watch the sun go down behind the stage.",
    about:[
      "Six acts across two stages on the side of the river valley, with the downtown skyline behind the main stage as the light goes.",
      "Tarp seating — bring your own, or rent a chair at the gate."
    ],
    expect:[
      {e:"🪕",n:"Six acts",d:"Folk, roots and bluegrass"},
      {e:"🌄",n:"Hillside seating",d:"Bring a tarp or blanket"},
      {e:"🍺",n:"Beer garden",d:"Local breweries, 18+ section"},
      {e:"👨‍👩‍👧",n:"Kids free",d:"Under 12 free with an adult"},
    ],
    refund:"Refunds up to 14 days before the event",
    tiers:[
      {name:"Hill Admission", desc:"General tarp seating", price:38},
      {name:"Family (2+2)", desc:"Two adults, two kids", price:82},
    ],
  },
  {
    id:"mtl-comedy", title:"Montreal Comedy Marathon",
    cat:"Comedy", tags:["weekend","comedy"], city:"Montreal", prov:"QC",
    dateShort:"SAT, OCT 10", date:"Sat, Oct 10", time:"7:00 PM", timeRange:"7:00 PM – 1:00 AM", doors:"18+ · Doors at 6:30 PM",
    venue:"Théâtre Sainte-Catherine", area:"Quartier Latin", addr:"264 Rue Sainte-Catherine E, Montréal, QC H2X 1L4", km:504,
    from:26, interested:870,
    art:{a:"#F0561A", b:"#6B3FD4", glyph:"◔"},
    org:{name:"Rire Collectif", followers:"6.7k", events:38, years:9, attendees:"52,000"},
    blurb:"Six hours, twenty-four comics, two languages, one room.",
    about:[
      "Twenty-four comics in six hours, alternating English and French sets, with a bilingual host holding the whole thing together.",
      "In and out privileges all night — the bar next door is part of the deal."
    ],
    expect:[
      {e:"🎤",n:"24 comics",d:"Six-hour marathon"},
      {e:"🇨🇦",n:"Bilingual",d:"English and French sets"},
      {e:"🔁",n:"In & out",d:"Re-entry all night"},
      {e:"🍻",n:"Bar next door",d:"Included in the pass"},
    ],
    refund:"Refunds up to 48 hours before the event",
    tiers:[
      {name:"Marathon Pass", desc:"All six hours, in and out", price:26},
      {name:"Front Section", desc:"Reserved seat, first four rows", price:44},
    ],
  },
  {
    id:"punjabi-mela-yyc", title:"Punjabi Mela Calgary",
    cat:"Festivals", tags:["free","family","food","music"], city:"Calgary", prov:"AB",
    dateShort:"SUN, SEP 20", date:"Sun, Sep 20", time:"12:00 PM", timeRange:"12:00 PM – 9:00 PM", doors:"Gates at 11:30 AM",
    venue:"Genesis Centre", area:"Saddle Ridge", addr:"7555 Falconridge Blvd NE, Calgary, AB T3J 0C9", km:2704,
    from:0, interested:4600,
    art:{a:"#D6206B", b:"#F2A93B", glyph:"◇"},
    org:{name:"Alberta Punjabi Society", followers:"10k", events:20, years:10, attendees:"175,000"},
    blurb:"A full mela — kabaddi, folk stages, and a hundred food stalls.",
    sourced:{feed:"Tourism Calgary", auto:true, checkedOn:"Aug 13"},
    about:[
      "A full-scale mela with a kabaddi tournament, two folk stages, a hundred food and clothing stalls, and a giant joota-chhupai game for the kids.",
      "Free entry all day. Kabaddi final at 6 PM."
    ],
    expect:[
      {e:"🤼",n:"Kabaddi tournament",d:"Final at 6 PM"},
      {e:"🎪",n:"100 stalls",d:"Food, clothes and jewellery"},
      {e:"🎶",n:"Two folk stages",d:"Live from noon"},
      {e:"🎟️",n:"Free entry",d:"All day, no ticket needed"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"Get the stage and kabaddi schedule", price:0}],
  },
  {
    id:"victoria-fireworks", title:"Inner Harbour Fireworks Nights",
    cat:"Festivals", tags:["weekend","free","family","different"], city:"Victoria", prov:"BC",
    dateShort:"SAT, SEP 5", date:"Sat, Sep 5", time:"8:00 PM", timeRange:"8:00 PM – 10:30 PM", doors:"Harbour fills from 7 PM",
    venue:"Inner Harbour Causeway", area:"Downtown", addr:"812 Wharf St, Victoria, BC V8W 1T3", km:3327,
    from:0, interested:1600,
    art:{a:"#1E4FA8", b:"#F0561A", glyph:"✸"},
    org:{name:"Harbour Nights Victoria", followers:"4.1k", events:14, years:5, attendees:"72,000"},
    blurb:"Fireworks off the water with the Legislature lit behind them.",
    sourced:{feed:"Destination Greater Victoria", auto:true, checkedOn:"Aug 15"},
    about:[
      "A twenty-minute fireworks show fired from a barge in the Inner Harbour, with buskers and food carts along the causeway from 7 PM.",
      "Free. Best viewing is from the causeway steps or the Legislature lawn."
    ],
    expect:[
      {e:"🎆",n:"20-min show",d:"Fired from the harbour"},
      {e:"🏛️",n:"Legislature lit",d:"Backdrop to the whole show"},
      {e:"🎻",n:"Buskers from 7",d:"Along the causeway"},
      {e:"🍟",n:"Food carts",d:"Twelve on the waterfront"},
    ],
    refund:"Free event",
    tiers:[{name:"Free RSVP", desc:"Get reminders and the best viewing spots", price:0}],
  },
];
CANADA.forEach(e => EVENTS.push(e));

/* Defaults for the original Toronto catalogue + verification state.
   Everything visible to attendees has passed review — that is the rule. */
EVENTS.forEach(e => {
  if(e.city === undefined) e.city = "Toronto";
  if(e.prov === undefined) e.prov = "ON";
  if(e.verified === undefined) e.verified = true;
  if(e.verifiedOn === undefined) e.verifiedOn = e.sourced ? e.sourced.checkedOn : "Aug 9";
});
const CITIES = [...new Set(EVENTS.map(e=>e.city))].sort();

/* ---------- organizer-authored blog posts ---------- */
const BLOGS = [
  {
    id:"garba-first-timer", title:"Your first garba night: what to wear, and when to actually arrive",
    org:"Rangeela Events", eventId:"garba-night", date:"Aug 12, 2026", read:4, tag:"Guides",
    art:{a:"#D6206B", b:"#F2A93B", glyph:"◆"},
    excerpt:"Nobody tells you the first hour is the easy one. Here's how to pace a six-hour garba night if you've never done one.",
    body:[
      "The single most common mistake at a garba night is arriving on time. Doors at 6 means the floor fills around 8, and the live orchestra doesn't hit its stride until closer to nine. If you turn up at six sharp you will spend two hours watching a very well-lit empty room.",
      "Wear something you can move in for six hours. Chaniya choli and kurta both work, but the thing people underestimate is footwear — you are going to be spinning on a hard floor for hours. Flat, closed, broken-in. Leave the new juttis at home.",
      "If you have never done garba before, stand in the outer circle. The outer ring moves slowest and has the simplest step. Everyone in there is either a beginner or a parent conserving energy, and both groups are very forgiving. Work your way in as you pick it up.",
      "Eat before the raas hour. Around eleven the music switches from garba to dandiya raas, which is faster, involves sticks, and burns through anyone who skipped the food stalls. The line for dabeli at 10:45 is not a coincidence.",
      "And drink water between sets. Six hours is a workout that doesn't feel like one until it does."
    ]
  },
  {
    id:"sold-out-playbook", title:"How we sold out a 600-person event with a $0 ad budget",
    org:"Rangeela Events", date:"Aug 5, 2026", read:6, tag:"For organizers",
    art:{a:"#F0561A", b:"#6B3FD4", glyph:"◗"},
    excerpt:"We spent nothing on ads and sold out in eleven days. Most of it came down to who we gave the first fifty tickets to.",
    body:[
      "We had no ad budget for our first Navratri night, which turned out to be the best constraint we ever worked under. It forced us to think about distribution instead of reach.",
      "The first fifty tickets went out at a steep early-bird price to people who run dance groups, not to people with big followings. A dance teacher with 400 followers brings twelve people. An influencer with 40,000 brings, on average, nobody. Group organizers are the actual distribution network for cultural events.",
      "We made the event page do the selling. Every question someone asked us in a DM went into the listing that same day — parking, dress code, whether there was food, whether kids could come. By week two the DMs mostly stopped, which is how we knew the page was working.",
      "Then we let the community post. We never gated the hashtag or asked for approval on anyone's photos. Sixty per cent of ticket sales in week two came through links people shared in WhatsApp family groups. You cannot buy that and you certainly cannot fake it.",
      "The last thing: we published the real capacity. When 480 of 600 were gone we said so on the page. Scarcity only works when people believe you, and the only way to be believed is to have been accurate the previous time."
    ]
  },
  {
    id:"free-events-canada", title:"The free festival circuit: how we find events worth your Saturday",
    org:"Editorial", date:"Aug 15, 2026", read:5, tag:"Behind the scenes",
    art:{a:"#0A9179", b:"#F2A93B", glyph:"✧"},
    excerpt:"We pull free events from a dozen tourism feeds across Canada. A human still reads every single one before it goes live.",
    body:[
      "Free events are the hardest to find and the easiest to get wrong. They rarely have a ticketing page, they're often announced on a city website three weeks out, and the details change without warning.",
      "So we connected to tourism and municipal feeds across the country — Destination Vancouver, Tourisme Montréal, Ottawa Tourism, Tourism Calgary, Discover Halifax and others. Anything free gets pulled automatically, with its source recorded on the listing so you can see where it came from.",
      "Automation gets it about eighty per cent right. The other twenty per cent is why nothing publishes without a person reading it: duplicate listings for the same parade, dates in the wrong year, a 'free' event that turns out to charge at the gate, and occasionally something that isn't a public event at all.",
      "Every listing you see carries a verified badge and the date a human checked it. If a free event on this platform turns out to charge admission, that is a mistake on our side and we want to hear about it.",
      "The goal is simple: if it's free, public and happening in Canada this weekend, it should be findable in one place — and it should be true."
    ]
  },
  {
    id:"door-checkin", title:"What actually happens at the door: a check-in guide for hosts",
    org:"Toronto Eats Collective", date:"Jul 29, 2026", read:4, tag:"For organizers",
    art:{a:"#6B3FD4", b:"#0A9179", glyph:"▣"},
    excerpt:"Two thousand people through one entrance in ninety minutes. Here's the setup that made it work.",
    body:[
      "At our last festival we put 1,842 people through a single entrance in about ninety minutes. Door flow is almost entirely a function of how you arrange the humans, not the software.",
      "Two scanning lanes minimum, and never fewer than three staff per lane: one scanning, one handling problems, one moving the line. The moment your scanner has to solve a problem, the lane stops. Give problems their own person and a physical step to the side.",
      "Scan the code, don't read the name. Every ticket carries a unique code tied to that one ticket for that one event — a scan tells you instantly whether it's valid, whether it's for tonight, and whether someone already used it. Reading names off phones is how duplicates get in.",
      "Expect duplicates. Someone always screenshots a friend's ticket, usually innocently. The system flags the second scan with the time of the first, which turns an argument into a fact. Train your door staff on that screen specifically — it's the one they'll see under pressure.",
      "Finally, have an offline plan. Venues eat signal. Download the guest list before doors open so a dead connection is an inconvenience and not a closure."
    ]
  },
  {
    id:"refund-policy", title:"Why we made our refund policy more generous, and sold more tickets",
    org:"Golden Hour", date:"Jul 22, 2026", read:3, tag:"For organizers",
    art:{a:"#F0561A", b:"#F2A93B", glyph:"○"},
    excerpt:"We were terrified of refunds. Turning them on increased sales by nineteen per cent.",
    body:[
      "For two years we ran a strict no-refund policy, because we assumed refunds were pure loss. We were wrong in a way that cost us money.",
      "When we moved to full refunds up to 48 hours before the event, our refund rate landed around three per cent — roughly where it had always been informally, except now people didn't have to argue with us to get one. Sales went up nineteen per cent over the next three events.",
      "The reason is straightforward. Most of our tickets sell six weeks out, and six weeks is long enough that people genuinely don't know their plans. A refund policy is not a cost centre, it is the thing that lets someone commit early.",
      "The operational side matters too. Refunds go back through the original payment automatically, to the same card, without us touching anything. Before, every refund was a conversation and a manual transfer, which is why we avoided them.",
      "If you are running events and still on no-refunds, try 48 hours on one event and watch what happens to your early sales curve."
    ]
  },
  {
    id:"weekend-vancouver", title:"A free weekend in Vancouver: buskers, diyas and a fireworks barge",
    org:"Island Arts Society", eventId:"granville-buskers", date:"Aug 14, 2026", read:4, tag:"City guides",
    art:{a:"#1E4FA8", b:"#0A9179", glyph:"◑"},
    excerpt:"Three days on the west coast without spending anything on admission. The ferry is the only thing you'll pay for.",
    body:[
      "Vancouver in late summer is unreasonably good at free events, and the density on Granville Island alone can carry a whole Saturday.",
      "Start Saturday at the buskers weekend on the island. Forty performers across six pitches, shows rotating every half hour, and the Public Market open behind you the entire time. Go early for parking or, better, take the little ferry across False Creek — it costs less than parking and is more fun.",
      "Saturday evening, head east. Commercial Drive closes for Diwali on the Drive in November, but through the late summer the Drive runs smaller street events most weekends, and the food is worth the trip regardless.",
      "Sunday, cross to Surrey for Bhangra in the Park if the timing lines up. Thirty dance teams, open dhol circles anyone can step into, and free langar served all afternoon. It is one of the largest events of its kind anywhere and it costs nothing.",
      "Total admission for the weekend: zero. Budget for food, transit and one impulse purchase at the market, which is unavoidable."
    ]
  },
];

/* ---------- platform: verification, sourcing, refunds ---------- */
PLATFORM.review = [
  {title:"Warehouse: Techno All-Nighter — Winter Edition", org:"Concrete Sound", city:"Vancouver", kind:"Paid", submitted:"2 hrs ago", flag:"Age-restricted venue — licence on file", risk:"ok"},
  {title:"Harvest Night Market", org:"Kensington Collective", city:"Toronto", kind:"Free", submitted:"5 hrs ago", flag:"Auto-sourced from Destination Toronto", risk:"ok"},
  {title:"Crypto Wealth Summit 2026", org:"Prime Ventures Intl", city:"Toronto", kind:"Paid", submitted:"6 hrs ago", flag:"New organizer · no payout history · refund terms missing", risk:"hold"},
  {title:"Winter Lights Walk", org:"Forks Winter Council", city:"Winnipeg", kind:"Free", submitted:"1 day ago", flag:"Duplicate of an existing listing — merge suggested", risk:"dupe"},
  {title:"Sunrise Yoga — Autumn Series", org:"Sunrise Collective", city:"Toronto", kind:"Paid", submitted:"1 day ago", flag:"Returning organizer · 41 events, no disputes", risk:"ok"},
];
PLATFORM.verifyStats = {approved:47, held:3, rejected:2, medianMins:38};
PLATFORM.sourcing = {
  importedWeek:214, published:186, held:28, cities:31,
  feeds:[
    {name:"Destination Toronto",  city:"Toronto",   found:44, live:41, status:"ok"},
    {name:"Destination Vancouver",city:"Vancouver", found:38, live:33, status:"ok"},
    {name:"Tourisme Montréal",    city:"Montreal",  found:35, live:31, status:"ok"},
    {name:"Tourism Calgary",      city:"Calgary",   found:27, live:24, status:"ok"},
    {name:"Ottawa Tourism",       city:"Ottawa",    found:22, live:19, status:"ok"},
    {name:"Discover Halifax",     city:"Halifax",   found:18, live:16, status:"ok"},
    {name:"Tourism Winnipeg",     city:"Winnipeg",  found:16, live:12, status:"slow"},
    {name:"Tourism Saskatchewan", city:"Regina",    found:14, live:10, status:"down"},
  ],
};
PLATFORM.refunds = {
  count:184, amount:6820, rate:1.5,
  recent:[
    ["NB-48912","Sunrise Yoga + Chai","Customer cancelled","Aug 16","$19.28","done"],
    ["NB-48876","Ramen & Sake Crawl","Customer cancelled","Aug 15","$47.77","done"],
    ["NB-48810","Harvest Night Market","Event cancelled by host","Aug 15","$0.00","done"],
    ["NB-48744","Rooftop Sunset Sessions","Customer cancelled","Aug 14","$33.99","pending"],
    ["NB-48701","Late Night Laughs","Duplicate charge","Aug 13","$19.28","done"],
  ],
};
PLATFORM.remittance = {
  held:118420, releasedMonth:94310,
  rows:[
    ["Toronto Eats Collective","Toronto Summer Food Festival","Aug 30","$37,190","held"],
    ["Rangeela Events","Navratri Garba & Dandiya Raas","Oct 17","$7,912","held"],
    ["GTA Cricket Club","IND vs PAK Final — Watch Party","Aug 16","$8,724","releasing"],
    ["Filmi Fridays","Bollywood Night: Y2K Edition","Aug 22","$11,984","held"],
    ["Rivoli Live","Late Night Laughs","Aug 14","$6,240","paid"],
  ],
};
