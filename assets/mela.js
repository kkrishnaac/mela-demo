/* Mela — demo ticketing platform for desi events.
   One codebase, two builds:
     MODE "platform" (index.html)  — attendee + organizer + platform-owner views
     MODE "attendee" (user/)       — attendee experience only
   All events, sales figures and payments here are simulated.            */

const MODE = window.MELA_MODE === "attendee" ? "attendee" : "platform";

/* =============== events =============== */
const CAT = ["Garba & Dandiya","Concerts","Bollywood Nights","Comedy","Arts & Culture","Festivals & Melas","Community"];

const EVENTS = [
  {
    id:"garba-night", title:"Navratri Garba & Dandiya Raas Night 2026",
    cat:"Garba & Dandiya", badge:{t:"Going fast", k:"hot"}, flags:["weekend"],
    date:"Sat, Oct 17", time:"7:00 PM – 1:00 AM", doors:"Doors at 6 PM",
    venue:"Paramount EventSpace", area:"Woodbridge, ON", addr:"222 Rowntree Dairy Rd, Woodbridge, ON L4L 9T2",
    from:25, art:{a:"#C9256B", b:"#F2A93B", pattern:"bandhani", glyph:"ग"},
    org:{name:"Rangeela Events", followers:"2.1k", events:14, years:4, attendees:"9,800"},
    about:[
      "The GTA's biggest Navratri celebration returns. Live dhol, a full garba orchestra flown in from Vadodara, and 40,000 sq ft of dance floor — bring your dandiya and your best chaniya choli.",
      "Traditional garba till midnight, then a Bollywood raas-remix hour to close the night. Food stalls by local vendors: dabeli, vada pav, jalebi-fafda and chai all night."
    ],
    highlights:["6 hours","In person","Live orchestra","Food stalls","Free parking","All ages"],
    refund:"Refunds up to 7 days before the event",
    tiers:[
      {name:"Early Bird", desc:"First 200 tickets", price:18, sold:true},
      {name:"General Admission", desc:"Full evening access, garba + raas hours", price:25},
      {name:"Family Pack (4)", desc:"4 GA tickets — save $20", price:80},
      {name:"VIP", desc:"Front section, lounge seating, chai & snacks included", price:45},
    ]
  },
  {
    id:"diwali-mela", title:"Diwali Mela at Exhibition Place",
    cat:"Festivals & Melas", badge:{t:"Free", k:"free"}, flags:["free"],
    date:"Sun, Nov 8", time:"12:00 PM – 9:00 PM", doors:"Gates at 11:30 AM",
    venue:"Exhibition Place, Hall B", area:"Toronto, ON", addr:"100 Princes' Blvd, Toronto, ON M6K 3C3",
    from:0, art:{a:"#E8862E", b:"#8F1D4E", pattern:"petal", glyph:"द"},
    org:{name:"Desi Collective TO", followers:"5.4k", events:22, years:6, attendees:"31,000"},
    about:[
      "Toronto's largest Diwali bazaar — 120+ stalls of clothes, jewellery, mithai and street food, a fireworks finale over the lake, and performances all day on the main stage.",
      "Free entry. Reserve your spot so we can plan capacity — VIP seating for the evening show is available."
    ],
    highlights:["9 hours","120+ stalls","Fireworks finale","Kids' zone","TTC accessible"],
    refund:"Free event — no refunds needed",
    tiers:[
      {name:"General Entry", desc:"Free — reservation recommended", price:0},
      {name:"Evening Show VIP", desc:"Reserved seating for the 7 PM show + fireworks", price:20},
    ]
  },
  {
    id:"bollywood-night", title:"Bollywood Night: Y2K Edition (19+)",
    cat:"Bollywood Nights", badge:{t:"Almost full", k:"hot"}, flags:["weekend","today"],
    date:"Sat, Aug 22", time:"10:00 PM – 3:00 AM", doors:"19+ · ID required",
    venue:"Nest Toronto", area:"Toronto, ON", addr:"423 College St, Toronto, ON M5T 1T1",
    from:22.9, art:{a:"#7C1E9E", b:"#E23A72", pattern:"jaali", glyph:"♪"},
    org:{name:"Filmi Fridays", followers:"3.8k", events:41, years:5, attendees:"18,500"},
    about:[
      "Every 2000s banger you screamed at your cousin's shaadi — SRK-era classics, item-song hour, and a live dhol set at midnight.",
      "Dress code: Y2K Bollywood. Best dressed wins a bar tab."
    ],
    highlights:["19+","DJ + live dhol","Coat check","Late night"],
    refund:"No refunds",
    tiers:[
      {name:"Early Entry", desc:"Arrive before 11 PM", price:22.9},
      {name:"General Admission", desc:"All night access", price:29.9},
      {name:"Booth for 6", desc:"Reserved booth + bottle service credit", price:240},
    ]
  },
  {
    id:"punjabi-wave", title:"Punjabi Wave: Live in Concert",
    cat:"Concerts", badge:{t:"Just added", k:"gold"}, flags:[],
    date:"Fri, Nov 20", time:"8:00 PM – 11:30 PM", doors:"Doors at 7 PM",
    venue:"Rebel Toronto", area:"Toronto, ON", addr:"11 Polson St, Toronto, ON M5A 1A4",
    from:59, art:{a:"#1E4FA8", b:"#25B0A5", pattern:"bandhani", glyph:"ਪ"},
    org:{name:"NorthSide Live", followers:"12k", events:9, years:3, attendees:"42,000"},
    about:[
      "A full live band, waterfront views, and the loudest bhangra floor in the city. Openers from Toronto's own Punjabi underground scene.",
      "VIP includes a meet & greet and early merch access."
    ],
    highlights:["Live band","In person","19+ bar","Waterfront venue"],
    refund:"Refunds up to 30 days before the event",
    tiers:[
      {name:"General Admission", desc:"Standing floor", price:59},
      {name:"Balcony Reserved", desc:"Seated, best sightlines", price:89},
      {name:"VIP Meet & Greet", desc:"Early entry, meet & greet, merch pack", price:149},
    ]
  },
  {
    id:"desi-standup", title:"Log Kya Kahenge? — A Desi Stand-Up Night",
    cat:"Comedy", badge:{t:"Going fast", k:"hot"}, flags:["weekend"],
    date:"Fri, Sep 11", time:"8:00 PM – 10:30 PM", doors:"Doors at 7:15 PM",
    venue:"Comedy Bar Danforth", area:"Toronto, ON", addr:"2800 Danforth Ave, Toronto, ON M4C 1M1",
    from:30, art:{a:"#B3341F", b:"#E8A33D", pattern:"jaali", glyph:"हा"},
    org:{name:"Brown Noise Comedy", followers:"1.9k", events:28, years:4, attendees:"7,600"},
    about:[
      "Six desi comics on one lineup — aunty gossip, arranged-marriage escape stories, and everything your parents pretend didn't happen.",
      "English / Hindi / Punjabi mix. Two-item minimum applies."
    ],
    highlights:["2.5 hours","19+","Full bar","Front-row heckle risk"],
    refund:"Refunds up to 48 hours before the event",
    tiers:[
      {name:"General Seating", desc:"First come, first seated", price:30},
      {name:"Front Tables (2)", desc:"Reserved table for two up front", price:75},
    ]
  },
  {
    id:"qawwali-night", title:"Sufi Night: Qawwali Under the Stars",
    cat:"Arts & Culture", badge:null, flags:[],
    date:"Sat, Sep 26", time:"7:30 PM – 10:30 PM", doors:"Doors at 6:45 PM",
    venue:"Aga Khan Museum Courtyard", area:"North York, ON", addr:"77 Wynford Dr, North York, ON M3C 1K1",
    from:40, art:{a:"#144B63", b:"#C9903B", pattern:"petal", glyph:"ق"},
    org:{name:"Mehfil Collective", followers:"980", events:11, years:2, attendees:"3,900"},
    about:[
      "An open-air mehfil in the museum courtyard — a seven-piece qawwali ensemble performing Nusrat and Sabri Brothers classics as the sun sets.",
      "Seating on floor cushions and chairs; chai and kebab rolls at intermission."
    ],
    highlights:["Open air","3 hours","Chai included","All ages","Museum access"],
    refund:"Refunds up to 7 days before the event",
    tiers:[
      {name:"Floor Cushion", desc:"Traditional mehfil seating", price:40},
      {name:"Reserved Chair", desc:"Chair seating, rear rows", price:52},
    ]
  },
  {
    id:"chai-verse", title:"Chai & Verse: South Asian Open Mic",
    cat:"Community", badge:{t:"Free", k:"free"}, flags:["free","today"],
    date:"Today", time:"6:30 PM – 9:00 PM", doors:"Sign-up at 6 PM",
    venue:"Bampot Tea House", area:"Toronto, ON", addr:"201 Harbord St, Toronto, ON M5S 1H6",
    from:0, art:{a:"#4E6E2E", b:"#C97B3B", pattern:"jaali", glyph:"श"},
    org:{name:"Kavita Toronto", followers:"640", events:34, years:3, attendees:"2,100"},
    about:[
      "Poetry, storytelling and acoustic sets in Urdu, Hindi, Tamil, Bengali, Punjabi and English. Chai on the house for performers.",
      "Free entry, pay-what-you-can for the space. Sign up to perform when you arrive."
    ],
    highlights:["Free","Open mic","Chai included","All ages"],
    refund:"Free event",
    tiers:[
      {name:"Attend", desc:"Free — just reserve", price:0},
      {name:"Supporter", desc:"Pay-what-you-can to keep the mehfil going", price:12},
    ]
  },
  {
    id:"kathak-tabla", title:"Kathak & Tabla: An Evening of Classics",
    cat:"Arts & Culture", badge:null, flags:[],
    date:"Sun, Oct 4", time:"5:00 PM – 7:30 PM", doors:"Doors at 4:30 PM",
    venue:"Harbourfront Centre Theatre", area:"Toronto, ON", addr:"231 Queens Quay W, Toronto, ON M5J 2G8",
    from:35, art:{a:"#8F1D4E", b:"#3B7BC9", pattern:"petal", glyph:"क"},
    org:{name:"Taal Academy", followers:"1.2k", events:8, years:7, attendees:"5,400"},
    about:[
      "A full-length kathak recital with live tabla, sarangi and vocals — three generations of dancers from the Lucknow gharana on one stage.",
      "Pre-show talk at 4:30 PM on the history of the form."
    ],
    highlights:["2.5 hours","Live musicians","Pre-show talk","All ages"],
    refund:"Refunds up to 14 days before the event",
    tiers:[
      {name:"General", desc:"Open seating", price:35},
      {name:"Premium", desc:"Centre rows, program included", price:55},
    ]
  },
  {
    id:"cricket-final", title:"IND vs PAK Final — Big Screen Watch Party",
    cat:"Community", badge:{t:"Almost full", k:"hot"}, flags:["today"],
    date:"Today", time:"3:30 PM – 8:00 PM", doors:"First ball 4 PM",
    venue:"The Rec Room Roundhouse", area:"Toronto, ON", addr:"255 Bremner Blvd, Toronto, ON M5V 3M9",
    from:10, art:{a:"#1E6E62", b:"#E8A33D", pattern:"bandhani", glyph:"६"},
    org:{name:"GTA Cricket Club", followers:"4.4k", events:19, years:5, attendees:"12,300"},
    about:[
      "The final, on a 40-foot screen, with 600 of the loudest fans in the city. Samosa platters, commentary bingo, and an innings-break dance-off.",
      "Wear your colours. Both sides welcome — barely."
    ],
    highlights:["40-ft screen","Food & bar","4.5 hours","All ages till 8"],
    refund:"No refunds",
    tiers:[
      {name:"Standing", desc:"General access", price:10},
      {name:"Table Seat", desc:"Reserved seat + samosa platter", price:28},
    ]
  },
];

/* =============== fee model ===============
   Buyer pays face + service fee. Platform keeps the service fee and pays Stripe out of it.
   Service fee   : 5.5% of face + $1.29 per ticket   (what the platform charges)
   Stripe cost   : 2.9% of the total charge + $0.30 per order                        */
const FEE_PCT = 0.055, FEE_FLAT = 1.29;
const STRIPE_PCT = 0.029, STRIPE_FLAT = 0.30;
const fee = p => p === 0 ? 0 : p * FEE_PCT + FEE_FLAT;
const $ = n => "CA$" + n.toFixed(2);
const $$ = n => "CA$" + Math.round(n).toLocaleString("en-CA");
const money = n => n === 0 ? "Free" : $(n);

/* =============== platform-owner figures (6 months, simulated) =============== */
const PLATFORM = {
  gmv: 386540,          // ticket face value — flows to organizers
  serviceFees: 37359,   // what the platform charged buyers
  stripeCost: 14263,    // what Stripe took
  net: 23096,           // serviceFees - stripeCost  → the client's profit
  tickets: 12480, orders: 6568, organizers: 34, events: 61, live: 18,
  months: [
    {m:"Mar", gmv:28400,  rev:2744},
    {m:"Apr", gmv:41200,  rev:3980},
    {m:"May", gmv:52800,  rev:5101},
    {m:"Jun", gmv:63500,  rev:6134},
    {m:"Jul", gmv:88300,  rev:8530},
    {m:"Aug", gmv:112340, rev:10870},
  ],
  topOrgs: [
    {name:"Rangeela Events",    events:8,  gmv:71250, fee:6883},
    {name:"Desi Collective TO", events:6,  gmv:68400, fee:6608},
    {name:"NorthSide Live",     events:4,  gmv:64900, fee:6270},
    {name:"Filmi Fridays",      events:11, gmv:52300, fee:5053},
    {name:"Brown Noise Comedy", events:9,  gmv:31800, fee:3072},
  ],
  otherOrgs: {count:29, events:23, gmv:97890, fee:9473},
  allEvents: [
    ["Navratri Garba & Dandiya Raas Night 2026","Rangeela Events","Oct 17","312 / 600",8765,850,"live"],
    ["Punjabi Wave: Live in Concert","NorthSide Live","Nov 20","640 / 2,500",44800,4346,"live"],
    ["Diwali Mela at Exhibition Place","Desi Collective TO","Nov 8","1,230 VIP",24600,2386,"live"],
    ["Bollywood Night: Y2K Edition (19+)","Filmi Fridays","Aug 22","486 / 500",13290,1289,"soon"],
    ["Sufi Night: Qawwali Under the Stars","Mehfil Collective","Sep 26","240 / 300",10080,978,"live"],
    ["IND vs PAK Final — Watch Party","GTA Cricket Club","Aug 16","552 / 600",9660,937,"done"],
    ["Log Kya Kahenge? — Stand-Up Night","Brown Noise Comedy","Sep 11","178 / 220",5340,518,"live"],
    ["Kathak & Tabla: Evening of Classics","Taal Academy","Oct 4","96 / 400",3840,373,"warn"],
  ],
  payouts: [
    ["Rangeela Events","Tue Aug 18",7912],
    ["Filmi Fridays","Tue Aug 18",11984],
    ["GTA Cricket Club","Wed Aug 19",8724],
    ["Mehfil Collective","Thu Aug 20",9072],
  ],
};
PLATFORM.collected = PLATFORM.gmv + PLATFORM.serviceFees;

/* =============== state =============== */
const state = {
  view:"home", eventId:null, cat:"All", tab:"All", q:"",
  orders: load("mela_orders", []),
  saved:  load("mela_saved", []),
};
function load(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } }
function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch(e){} }

/* =============== helpers =============== */
const el = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(msg){
  const t = el("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove("show"), 2600);
}
function artStyle(a){
  const pat = {
    bandhani:`radial-gradient(circle 3px at 12px 12px, rgba(255,255,255,.35) 2.6px, transparent 3px)`,
    jaali:`repeating-linear-gradient(45deg, rgba(255,255,255,.13) 0 2px, transparent 2px 14px), repeating-linear-gradient(-45deg, rgba(255,255,255,.13) 0 2px, transparent 2px 14px)`,
    petal:`radial-gradient(circle 90px at 85% -10%, rgba(255,255,255,.25), transparent 70%), radial-gradient(circle 70px at 10% 110%, rgba(255,255,255,.18), transparent 70%)`,
  }[a.pattern];
  const size = a.pattern === "bandhani" ? "background-size:24px 24px, cover;" : "";
  return `background-image:${pat}, linear-gradient(135deg, ${a.a}, ${a.b}); ${size}`;
}
const HEART = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.5 2.8c0 5.8-8.5 11.3-8.5 11.3Z"/></svg>`;
const isSaved = id => state.saved.includes(id);

function artBlock(ev, cls="art"){
  return `<div class="${cls}" style="${artStyle(ev.art)}" aria-hidden="true"><span class="glyph">${ev.art.glyph}</span>${ev.badge ? `<span class="badge ${ev.badge.k}">${ev.badge.t}</span>`:""}</div>`;
}
function navSet(){
  document.querySelectorAll(".navlink").forEach(b=>{
    b.classList.toggle("active", b.dataset.nav === state.view || (state.view==="event" && b.dataset.nav==="home"));
  });
  const pip = el("savedpip");
  if(pip) pip.style.display = state.saved.length ? "" : "none", pip.textContent = state.saved.length;
}
function go(view, id){
  if(MODE==="attendee" && (view==="organizer" || view==="admin")) view = "home";
  state.view = view; if(id) state.eventId = id;
  render(); window.scrollTo({top:0, behavior:"instant"});
}
function onSearch(v){ state.q = v.toLowerCase(); if(state.view!=="home"){state.view="home"} render(); }

function toggleSave(id, ev){
  if(ev) ev.stopPropagation();
  const i = state.saved.indexOf(id);
  if(i>=0){ state.saved.splice(i,1); toast("Removed from saved") }
  else { state.saved.push(id); toast("Saved — find it under Saved") }
  save("mela_saved", state.saved);
  render();
}

/* =============== views =============== */
function render(){
  navSet();
  const app = el("app");
  if(state.view==="home") app.innerHTML = homeView();
  else if(state.view==="saved") app.innerHTML = savedView();
  else if(state.view==="event") app.innerHTML = eventView();
  else if(state.view==="tickets") app.innerHTML = ticketsView();
  else if(state.view==="organizer"){ app.innerHTML = organizerView(); wireChart("chart", SALES, s=>`${s.d} — CA$${s.v.toLocaleString()}`) }
  else if(state.view==="admin"){ app.innerHTML = adminView(); wireChart("gmvchart", PLATFORM.months, m=>`${m.m} — ${$$(m.gmv)} sales · ${$$(m.rev)} your revenue`) }
  else if(state.view==="confirm") app.innerHTML = confirmView();
  if(state.view==="confirm") drawQRs();
}

function homeView(){
  let list = EVENTS.filter(e =>
    (state.cat==="All" || e.cat===state.cat) &&
    (state.tab==="All" || (state.tab==="Today" && e.flags.includes("today")) || (state.tab==="This weekend" && (e.flags.includes("weekend")||e.flags.includes("today"))) || (state.tab==="Free" && e.flags.includes("free"))) &&
    (!state.q || (e.title+" "+e.cat+" "+e.venue).toLowerCase().includes(state.q))
  );
  return `
  <section class="hero">
    <div class="kicker">Toronto · GTA</div>
    <h1>Every desi event in the city, <em>one place.</em></h1>
    <p>Garba nights, qawwali, comedy, concerts and melas — discover what's happening, grab tickets in a minute, and never miss the function again.</p>
    <div class="chiprow" role="tablist" aria-label="Categories">
      ${["All",...CAT].map(c=>`<button class="chip ${state.cat===c?"on":""}" onclick="state.cat='${c}';render()">${c}</button>`).join("")}
    </div>
  </section>
  <div class="tabsrow">
    ${["All","Today","This weekend","Free"].map(t=>`<button class="tab ${state.tab===t?"on":""}" onclick="state.tab='${t}';render()">${t}</button>`).join("")}
  </div>
  <div class="sectionhead">
    <h2>${state.q ? "Search results" : state.cat==="All" ? "Happening in Toronto" : state.cat}</h2>
    <span class="count">${list.length} event${list.length===1?"":"s"}</span>
  </div>
  ${list.length ? `<div class="grid">${list.map(cardView).join("")}</div>`
    : `<div class="emptybox"><h3>Nothing here yet</h3><p>Try another category, or clear your search.</p><button class="btn ghost" onclick="state.q='';state.cat='All';state.tab='All';el('search').value='';render()">Clear filters</button></div>`}
  `;
}
function savedView(){
  const list = EVENTS.filter(e=>isSaved(e.id));
  return `
  <div class="pagehead"><h1>Saved events</h1><p>Your shortlist. Tap the heart on any event to add it here.</p></div>
  <div style="height:18px"></div>
  ${list.length ? `<div class="grid">${list.map(cardView).join("")}</div>`
    : `<div class="emptybox"><h3>Nothing saved yet</h3><p>Hearts you tap while browsing show up here, so you can decide later.</p><button class="btn" onclick="go('home')">Browse events</button></div>`}`;
}
function cardView(e){
  return `
  <article class="card">
    <button class="cardhit" onclick="go('event','${e.id}')" aria-label="${esc(e.title)}">
      ${artBlock(e)}
      <div class="cardbody">
        <h3>${esc(e.title)}</h3>
        <div class="cdate">${e.date} · ${e.time.split(" – ")[0]}</div>
        <div class="cvenue">${esc(e.venue)} · ${esc(e.area)}</div>
        <div class="cprice">${e.from===0 ? `<span style="color:var(--peacock);font-weight:700">Free</span>` : `From ${$(e.from)}`} <span>· ${e.cat}</span></div>
      </div>
    </button>
    <button class="heart ${isSaved(e.id)?"on":""}" onclick="toggleSave('${e.id}', event)"
      aria-label="${isSaved(e.id)?"Remove from saved":"Save this event"}" aria-pressed="${isSaved(e.id)}">${HEART}</button>
  </article>`;
}

const ICONS = {
  cal:`<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
  pin:`<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
  refund:`<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>`,
  lock:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`,
};

function eventView(){
  const e = EVENTS.find(x=>x.id===state.eventId);
  if(!e) return homeView();
  const sv = isSaved(e.id);
  return `
  <div class="crumb"><button onclick="go('home')">← Back to events</button></div>
  ${artBlock(e,"art tall")}
  <div class="eventgrid">
    <div>
      <h1 class="etitle">${esc(e.title)}</h1>
      <p class="esub">${e.about[0].split(".")[0]}.</p>
      <div class="orgcard">
        <div class="avatar" style="${artStyle(e.art)}">${esc(e.org.name[0])}</div>
        <div>
          <div class="name">${esc(e.org.name)}</div>
          <div class="meta">${e.org.followers} followers · ${e.org.events} events · ${e.org.years} yrs hosting · ${e.org.attendees} attendees</div>
        </div>
        <button class="btn ghost" onclick="toast('Following ${esc(e.org.name)} — you\\'ll hear about their next event first.')">Follow</button>
      </div>
      <div class="factrow">${ICONS.cal}<div><div class="f1">${e.date} · ${e.time}</div><div class="f2">${e.doors}</div></div></div>
      <div class="factrow">${ICONS.pin}<div><div class="f1">${esc(e.venue)}</div><div class="f2">${esc(e.addr)}</div></div></div>
      <div class="factrow">${ICONS.refund}<div><div class="f1">Refund policy</div><div class="f2">${esc(e.refund)}</div></div></div>
      <div class="esec"><h2>About this event</h2>${e.about.map(p=>`<p>${esc(p)}</p>`).join("")}</div>
      <div class="esec"><h2>Good to know</h2><div class="hlrow">${e.highlights.map(h=>`<span class="hl">${esc(h)}</span>`).join("")}</div></div>
      <div class="esec"><h2>Where you're headed</h2>
        <div class="mapbox"><div class="pin"></div></div>
        <p style="margin-top:10px; font-size:13.5px; color:var(--muted)">${esc(e.venue)} · ${esc(e.addr)} <i>(live map in the real build)</i></p>
      </div>
    </div>
    <aside class="rail">
      <div class="from">${e.from===0?"Admission":"From"}</div>
      <div class="price">${money(e.from)}</div>
      <div class="when">${e.date} · ${e.time.split(" – ")[0]}</div>
      <button class="btn big" onclick="openTickets('${e.id}')">${e.from===0?"Reserve a spot":"Get tickets"}</button>
      <button class="railsave ${sv?"on":""}" onclick="toggleSave('${e.id}')" aria-pressed="${sv}">${HEART} ${sv?"Saved":"Save for later"}</button>
      ${e.badge && e.badge.k==="hot" ? `<div class="urgent"><span class="pulse"></span>${e.badge.t === "Almost full" ? "Almost full — only a few tickets left" : "Selling fast — 62 sold in the last day"}</div>`:""}
      <div class="note">Secure checkout · Instant e-tickets with QR entry</div>
    </aside>
  </div>`;
}

function ticketsView(){
  return `
  <div class="pagehead"><h1>My tickets</h1><p>Your upcoming events and receipts, all in one place.</p></div>
  ${state.orders.length ? state.orders.map(o=>{
    const e = EVENTS.find(x=>x.id===o.eventId);
    return `<div class="order">
      <div class="oart" style="${artStyle(e.art)}"></div>
      <div class="oinfo">
        <div class="oname">${esc(e.title)}</div>
        <div class="ometa">${e.date} · ${esc(e.venue)} · Order ${o.num} · ${o.items.reduce((s,i)=>s+i.qty,0)} ticket(s)</div>
      </div>
      <div class="oamt">${o.total===0?"Free":$(o.total)}</div>
      <button class="btn quiet" onclick="state.lastOrder=state.orders.find(x=>x.num==='${o.num}');go('confirm')">View tickets</button>
    </div>`;
  }).join("")
  : `<div class="emptybox"><h3>No tickets yet</h3><p>When you grab tickets, they'll live here — with QR codes ready at the door.</p><button class="btn" onclick="go('home')">Browse events</button></div>`}`;
}

function confirmView(){
  const o = state.lastOrder || state.orders[0];
  if(!o) return homeView();
  const e = EVENTS.find(x=>x.id===o.eventId);
  let ticketNo = 0;
  return `
  <div class="confwrap">
    <div class="checkring"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="m5 12.5 4.5 4.5L19 7"/></svg></div>
    <h1>You're going!</h1>
    <p class="sub">${o.items.reduce((s,i)=>s+i.qty,0)} ticket(s) to <b>${esc(e.title)}</b>. A confirmation email with your tickets is on its way to <b>${esc(o.email)}</b>.</p>
    <div class="ordnum">Order ${o.num} · ${o.total===0 ? "Free order" : "Paid " + $(o.total) + (o.last4 ? " · " + esc(o.cbrand) + " •••• " + esc(o.last4) : "")}</div>
    ${o.items.map(i => Array.from({length:i.qty}, () => {
      ticketNo++;
      return `<div class="ticket">
        <div class="tk-top">
          <div class="qr"><canvas class="qrc" width="84" height="84" data-seed="${o.num}-${ticketNo}"></canvas></div>
          <div>
            <div class="tk-name">${esc(e.title)}</div>
            <div class="tk-tier">${esc(i.name)} — Ticket ${ticketNo}</div>
            <div class="tk-meta">${e.date} · ${e.time} · ${esc(e.venue)}</div>
          </div>
        </div>
        <div class="tk-rip"></div>
        <div class="tk-bot">
          <span>${esc(o.name)}</span>
          <span>${o.num}-${String(ticketNo).padStart(2,"0")} · Scan at entry</span>
        </div>
      </div>`;
    }).join("")).join("")}
    <div class="confbtns">
      <button class="btn quiet" onclick="toast('In the real build this drops the pass into Apple/Google Wallet.')">Add to Wallet</button>
      <button class="btn quiet" onclick="toast('In the real build this downloads an .ics calendar file.')">Add to calendar</button>
      <button class="btn ghost" onclick="go('tickets')">My tickets</button>
      <button class="btn" onclick="go('home')">Keep browsing</button>
    </div>
  </div>`;
}

function drawQRs(){
  document.querySelectorAll(".qrc").forEach(cv=>{
    const ctx = cv.getContext("2d"); const n = 21, s = cv.width/n;
    let h = 2166136261;
    for(const c of cv.dataset.seed){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) }
    const rnd = () => { h ^= h<<13; h ^= h>>>17; h ^= h<<5; return (h>>>0)/4294967296 };
    ctx.fillStyle="#fff"; ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle="#2E1A2B";
    for(let y=0;y<n;y++)for(let x=0;x<n;x++){
      if((x<7&&y<7)||(x>=n-7&&y<7)||(x<7&&y>=n-7)) continue;
      if(rnd()>0.52) ctx.fillRect(x*s,y*s,s,s);
    }
    const eye=(cx,cy)=>{ ctx.fillRect(cx,cy,7*s,7*s); ctx.fillStyle="#fff"; ctx.fillRect(cx+s,cy+s,5*s,5*s); ctx.fillStyle="#2E1A2B"; ctx.fillRect(cx+2*s,cy+2*s,3*s,3*s) };
    eye(0,0); eye((n-7)*s,0); eye(0,(n-7)*s);
  });
}

/* =============== ticket modal & checkout =============== */
let cart = null, timerH = null;

function openTickets(id){
  const e = EVENTS.find(x=>x.id===id);
  cart = { eventId:id, qty:e.tiers.map(()=>0), promo:null, step:1, secs:600 };
  renderModal(); startTimer();
}
function startTimer(){
  clearInterval(timerH);
  timerH = setInterval(()=>{
    if(!cart){ clearInterval(timerH); return }
    cart.secs--;
    const t = el("timer"); if(t) t.textContent = fmtTime(cart.secs);
    if(cart.secs<=0){ closeModal(); toast("Time's up — your held tickets were released. (Just like the real thing.)") }
  },1000);
}
const fmtTime = s => Math.floor(s/60)+":"+String(s%60).padStart(2,"0");

function totals(){
  const e = EVENTS.find(x=>x.id===cart.eventId);
  let sub=0, fees=0, count=0;
  e.tiers.forEach((t,i)=>{ sub += t.price*cart.qty[i]; fees += fee(t.price)*cart.qty[i]; count += cart.qty[i] });
  const disc = cart.promo==="DESI10" ? sub*0.10 : 0;
  return { sub, fees, disc, count, total: Math.max(0, sub - disc) + fees };
}

function renderModal(){
  const e = EVENTS.find(x=>x.id===cart.eventId);
  let ov = el("overlay");
  if(!ov){
    ov = document.createElement("div"); ov.id="overlay"; ov.className="overlay";
    ov.addEventListener("click", ev=>{ if(ev.target===ov) closeModal() });
    document.body.appendChild(ov);
  }
  document.body.style.overflow = "hidden";
  const t = totals();
  ov.innerHTML = `
  <div class="modal" role="dialog" aria-modal="true" aria-label="Checkout">
    <div class="mhead">
      <div><div class="t">${esc(e.title)}</div><div class="d">${e.date} · ${e.time} · ${esc(e.venue)}</div></div>
      <div class="timer" title="Tickets are held while you check out">${ICONS.lock} <span id="timer">${fmtTime(cart.secs)}</span></div>
      <button class="xbtn" onclick="closeModal()" aria-label="Close">✕</button>
    </div>
    <div class="mbody">
      ${cart.step===1 ? tierStep(e) : payStep(t)}
      <div class="summary">
        <div class="thumb" style="${artStyle(e.art)}"></div>
        ${t.count===0 ? `<div class="sempty">Select tickets to see your order</div>` : `
          ${e.tiers.map((tr,i)=>cart.qty[i]?`<div class="sline"><span class="l">${cart.qty[i]} × ${esc(tr.name)}</span><span>${tr.price===0?"Free":$(tr.price*cart.qty[i])}</span></div>`:"").join("")}
          ${t.disc?`<div class="sline"><span class="l">Promo DESI10 (−10%)</span><span class="neg">−${$(t.disc)}</span></div>`:""}
          ${t.fees?`<div class="sline"><span class="l">Service &amp; processing fees</span><span>${$(t.fees)}</span></div>`:""}
          <div class="sline total"><span>Total</span><span>${t.total===0?"Free":$(t.total)}</span></div>`}
        ${cart.step===1
          ? `<button class="btn big" ${t.count===0?"disabled":""} onclick="cart.step=2;renderModal()">${t.total===0?"Register":"Check out"}</button>`
          : `<button class="btn big" id="paybtn" onclick="placeOrder()">${t.total===0?"Complete registration":"Pay "+$(t.total)}</button>`}
        <div class="feenote">${cart.step===1 ? "Fees shown at checkout · Powered by Stripe" : "Simulated payment — no card is charged in this demo"}</div>
      </div>
    </div>
  </div>`;
}

function tierStep(e){
  return `<div class="tiers">
    ${e.tiers.map((tr,i)=>`
      <div class="tier ${tr.sold?"off":""}">
        <div class="info">
          <div class="tn">${esc(tr.name)}</div>
          <div class="td">${esc(tr.desc)}</div>
          <div class="tp">${tr.price===0?"Free":$(tr.price)} ${tr.price&&!tr.sold?`<span>+ ${$(fee(tr.price))} fee</span>`:""}</div>
        </div>
        ${tr.sold ? `<span class="soldtag">Sold out</span>` : `
        <div class="stepper">
          <button onclick="bump(${i},-1)" ${cart.qty[i]===0?"disabled":""} aria-label="Fewer ${esc(tr.name)}">−</button>
          <span class="q">${cart.qty[i]}</span>
          <button onclick="bump(${i},1)" ${cart.qty[i]>=8?"disabled":""} aria-label="More ${esc(tr.name)}">+</button>
        </div>`}
      </div>`).join("")}
    <div class="promo">
      <input id="promoIn" placeholder="Promo code — try DESI10" aria-label="Promo code" onkeydown="if(event.key==='Enter')applyPromo()">
      <button class="btn ghost" onclick="applyPromo()">Apply</button>
    </div>
    <div id="promoMsg">${cart.promo?`<div class="promo-ok">✓ DESI10 applied — 10% off tickets</div>`:""}</div>
  </div>`;
}

function payStep(t){
  const free = t.total===0;
  return `<div class="ckgrid">
    <button class="backlink" style="text-align:left" onclick="cart.step=1;renderModal()">← Back to tickets</button>
    <div class="frow">
      <div class="fgroup"><label for="f_name">Full name</label><input id="f_name" autocomplete="off" placeholder="Priya Sharma"></div>
      <div class="fgroup"><label for="f_email">Email — tickets go here</label><input id="f_email" autocomplete="off" placeholder="priya@example.com"></div>
    </div>
    ${free ? `<p style="font-size:14px;color:var(--muted)">This is a free registration — no payment needed.</p>` : `
    <div class="paybox">
      <div class="paytabs">
        <button class="paytab on">Card</button>
        <button class="paytab" onclick="toast('Apple Pay would appear here via Stripe in the real build.')">&#63743; Pay</button>
        <button class="paytab" onclick="toast('Google Pay would appear here via Stripe in the real build.')">G Pay</button>
      </div>
      <div class="fgroup cardrow" style="margin-bottom:13px">
        <label for="f_card">Card number</label>
        <input id="f_card" inputmode="numeric" autocomplete="off" placeholder="1234 5678 9012 3456" maxlength="19" oninput="fmtCard(this)">
        <span class="brand" id="brand"></span>
      </div>
      <div class="frow">
        <div class="fgroup"><label for="f_exp">Expiry</label><input id="f_exp" inputmode="numeric" autocomplete="off" placeholder="MM / YY" maxlength="7" oninput="fmtExp(this)"></div>
        <div class="fgroup"><label for="f_cvc">CVC</label><input id="f_cvc" inputmode="numeric" autocomplete="off" placeholder="123" maxlength="4" oninput="this.value=this.value.replace(/\\D/g,'')"></div>
        <div class="fgroup"><label for="f_zip">Postal code</label><input id="f_zip" autocomplete="off" placeholder="M5V 2T6"></div>
      </div>
      <div class="testhint"><span>Demo mode — pay with Stripe's test card: <b>4242 4242 4242 4242</b>, any future expiry, any CVC.</span></div>
      <div class="secure">${ICONS.lock} Encrypted &amp; secured — the real build never touches card numbers (Stripe handles them)</div>
    </div>`}
  </div>`;
}

function bump(i,d){ cart.qty[i] = Math.max(0, Math.min(8, cart.qty[i]+d)); renderModal() }
function applyPromo(){
  const v = (el("promoIn")?.value||"").trim().toUpperCase();
  if(v==="DESI10"){ cart.promo="DESI10"; renderModal() }
  else if(v){ el("promoMsg").innerHTML = `<div class="promo-bad">That code isn't valid. (Hint: DESI10)</div>` }
}
function fmtCard(inp){
  const v = inp.value.replace(/\D/g,"").slice(0,16);
  inp.value = v.replace(/(.{4})/g,"$1 ").trim();
  el("brand").textContent = v.startsWith("4") ? "VISA" : v.startsWith("5") ? "MC" : v.startsWith("3") ? "AMEX" : "";
}
function fmtExp(inp){
  const v = inp.value.replace(/\D/g,"").slice(0,4);
  inp.value = v.length>2 ? v.slice(0,2)+" / "+v.slice(2) : v;
}
function placeOrder(){
  const t = totals();
  const name = el("f_name").value.trim(), email = el("f_email").value.trim();
  let bad = false;
  [["f_name",name],["f_email",email && email.includes("@")]].forEach(([id,ok])=>{
    el(id).classList.toggle("err", !ok); if(!ok) bad=true;
  });
  let last4 = "", cbrand = "";
  if(t.total>0){
    const card = el("f_card").value.replace(/\s/g,"");
    [["f_card",card.length===16],["f_exp",el("f_exp").value.length>=6],["f_cvc",el("f_cvc").value.length>=3]].forEach(([id,ok])=>{
      el(id).classList.toggle("err", !ok); if(!ok) bad=true;
    });
    last4 = card.slice(-4);
    cbrand = card.startsWith("4") ? "Visa" : card.startsWith("5") ? "Mastercard" : card.startsWith("3") ? "Amex" : "Card";
  }
  if(bad){ toast("A few details need fixing before we can place the order."); return }

  const btn = el("paybtn");
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> ${t.total===0?"Registering…":"Processing payment…"}`;
  setTimeout(()=>{
    const e = EVENTS.find(x=>x.id===cart.eventId);
    const num = "MELA-" + String(74211 + state.orders.length * 137);
    const order = {
      num, eventId:cart.eventId, name, email, total:t.total, last4, cbrand,
      items: e.tiers.map((tr,i)=>({name:tr.name, qty:cart.qty[i]})).filter(i=>i.qty>0),
    };
    state.orders.unshift(order); state.lastOrder = order; save("mela_orders", state.orders);
    closeModal(); go("confirm");
  }, 1900);
}
function closeModal(){
  clearInterval(timerH);
  el("overlay")?.remove();
  document.body.style.overflow = "";
  cart = null;
}
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeModal() });

/* =============== organizer dashboard (one event, the host's view) =============== */
const SALES = [
  {d:"Aug 3", v:410},{d:"Aug 4", v:265},{d:"Aug 5", v:190},{d:"Aug 6", v:340},
  {d:"Aug 7", v:520},{d:"Aug 8", v:780},{d:"Aug 9", v:615},{d:"Aug 10", v:445},
  {d:"Aug 11", v:380},{d:"Aug 12", v:565},{d:"Aug 13", v:840},{d:"Aug 14", v:1120},
  {d:"Aug 15", v:1370},{d:"Aug 16", v:925},
];
const RECENT = [
  ["Ananya R.","2 × GA","MELA-74998","2 min ago","CA$55.48"],
  ["Harpreet S.","4 × Family Pack","MELA-74997","11 min ago","CA$89.69"],
  ["Zainab K.","1 × VIP","MELA-74996","26 min ago","CA$49.02"],
  ["Rohan & Meera P.","2 × GA","MELA-74995","41 min ago","CA$55.48"],
  ["Dilnaz T.","3 × GA","MELA-74994","1 hr ago","CA$83.22"],
];

function barChart(id, rows, valueOf, labelLeft, labelRight, highlightLast=true){
  const max = Math.max(...rows.map(valueOf));
  const W=560, H=180, pad=6, bw=(W-pad*2)/rows.length;
  const bars = rows.map((r,i)=>{
    const h = Math.max(4,(valueOf(r)/max)*(H-30));
    const x = pad + i*bw + 2, y = H - h - 20;
    return `<g class="bar" data-i="${i}">
      <rect x="${x}" y="${y}" width="${bw-4}" height="${h}" rx="4" fill="${highlightLast&&i===rows.length-1?"var(--marigold)":"var(--d1)"}"/>
      <rect x="${x-1}" y="0" width="${bw-2}" height="${H-20}" fill="transparent"/>
    </g>`;
  }).join("");
  return `<div class="chart" id="${id}">
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart from ${labelLeft} to ${labelRight}">
      <line x1="${pad}" y1="${H-20}" x2="${W-pad}" y2="${H-20}" stroke="var(--line-strong)" stroke-width="1"/>
      ${bars}
      <text x="${pad+2}" y="${H-5}" font-size="10.5" fill="var(--muted)">${labelLeft}</text>
      <text x="${W-pad-2}" y="${H-5}" font-size="10.5" fill="var(--muted)" text-anchor="end">${labelRight}</text>
    </svg>
    <div class="ttip"></div>
  </div>`;
}
function wireChart(id, rows, fmt){
  const chart = el(id); if(!chart) return;
  const tip = chart.querySelector(".ttip");
  chart.querySelectorAll(".bar").forEach(g=>{
    g.addEventListener("mousemove", ev=>{
      tip.textContent = fmt(rows[+g.dataset.i]);
      const r = chart.getBoundingClientRect();
      tip.style.left = (ev.clientX - r.left)+"px";
      tip.style.top = (ev.clientY - r.top)+"px";
      tip.style.opacity = 1;
    });
    g.addEventListener("mouseleave", ()=>tip.style.opacity=0);
  });
}

function organizerView(){
  return `
  <div class="orgtop">
    <h1>Navratri Garba &amp; Dandiya Raas Night</h1>
    <span class="livechip"><span class="pulse"></span>LIVE</span>
  </div>
  <p class="orgsub">Organizer dashboard — what an event host sees for their own event · Rangeela Events · Sales opened Aug 3</p>
  <div class="tiles">
    <div class="tile"><div class="tl">Gross sales</div><div class="tv">CA$8,765</div><div class="td">↑ 48% this week</div></div>
    <div class="tile"><div class="tl">Tickets sold</div><div class="tv">312 <span style="font-size:16px;color:var(--muted)">/ 600</span></div><div class="td">52% of capacity</div></div>
    <div class="tile"><div class="tl">Page views</div><div class="tv">4,982</div><div class="td">↑ 1,204 since Friday</div></div>
    <div class="tile"><div class="tl">Conversion</div><div class="tv">6.3%</div><div class="td">Above 4.1% category avg</div></div>
  </div>
  <div class="panelrow">
    <div class="panel">
      <h3>Daily sales</h3><div class="ps">Last 14 days · gross CAD · hover a bar for detail</div>
      ${barChart("chart", SALES, s=>s.v, "Aug 3", "Aug 16")}
    </div>
    <div class="panel">
      <h3>Sales by ticket type</h3><div class="ps">312 sold</div>
      <div class="tierbar"><div class="tb1"><span>General Admission</span><b>201 / 380</b></div><div class="track"><div class="fill" style="width:53%"></div></div></div>
      <div class="tierbar"><div class="tb1"><span>Family Pack (4)</span><b>68 / 120</b></div><div class="track"><div class="fill gold" style="width:57%"></div></div></div>
      <div class="tierbar"><div class="tb1"><span>VIP</span><b>43 / 100</b></div><div class="track"><div class="fill teal" style="width:43%"></div></div></div>
      <div class="tierbar"><div class="tb1"><span>Early Bird</span><b>Sold out</b></div><div class="track"><div class="fill" style="width:100%; opacity:.35"></div></div></div>
      <div class="paycard" style="margin-top:18px">
        <div><div class="pv">CA$7,912</div><div class="pl">Next payout · Tue Aug 18</div></div>
        <div class="stripe">via <b>Stripe Connect</b> — direct to the organizer's bank, minus platform fee</div>
      </div>
    </div>
  </div>
  <div class="panel">
    <h3>Recent orders</h3><div class="ps">Live feed — refunds and resends are one click in the real build</div>
    <div class="tablewrap"><table>
      <thead><tr><th>Buyer</th><th>Tickets</th><th>Order</th><th>When</th><th class="num">Total</th></tr></thead>
      <tbody>${RECENT.map(r=>`<tr><td class="name">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td class="num">${r[4]}</td></tr>`).join("")}</tbody>
    </table></div>
  </div>`;
}

/* =============== platform dashboard (the platform owner's view) =============== */
function adminView(){
  const P = PLATFORM;
  const pc = n => (n / P.collected * 100);
  const split = [
    {k:"Organizer payouts", v:P.gmv,         c:"var(--d3)", note:"Ticket face value — paid out via Stripe Connect"},
    {k:"Your platform revenue", v:P.net,     c:"var(--d1)", note:"Service fees you charged, after Stripe's cut"},
    {k:"Stripe processing",  v:P.stripeCost, c:"var(--d2)", note:"2.9% + $0.30 per order, paid to Stripe"},
  ];
  const takeRate = (P.serviceFees / P.gmv * 100).toFixed(1);
  const margin = (P.net / P.serviceFees * 100).toFixed(0);

  /* unit economics on one CA$25 ticket */
  const face = 25, svc = face*FEE_PCT + FEE_FLAT, buyer = face + svc;
  const strp = buyer*STRIPE_PCT + STRIPE_FLAT, keep = svc - strp;

  return `
  <div class="orgtop">
    <h1>Platform overview</h1>
    <span class="livechip"><span class="pulse"></span>LIVE</span>
  </div>
  <p class="orgsub">Everything happening on your platform — all organizers, all events, and your cut · Last 6 months (Mar–Aug 2026)</p>

  <div class="tiles">
    <div class="tile"><div class="tl">Gross ticket sales</div><div class="tv">${$$(P.gmv)}</div><div class="td">↑ 27% vs last month</div></div>
    <div class="tile hero"><div class="tl">Your revenue</div><div class="tv">${$$(P.net)}</div><div class="td">${margin}% margin after Stripe</div></div>
    <div class="tile"><div class="tl">Take rate</div><div class="tv">${takeRate}%</div><div class="td">Of every ticket sold</div></div>
    <div class="tile"><div class="tl">Events &amp; organizers</div><div class="tv">${P.events} <span style="font-size:16px;color:var(--muted)">/ ${P.organizers}</span></div><div class="td">${P.live} events live now</div></div>
  </div>

  <div class="panelrow">
    <div class="panel">
      <h3>Monthly ticket sales</h3><div class="ps">Gross value of tickets sold across every organizer · hover a bar for your revenue that month</div>
      ${barChart("gmvchart", P.months, m=>m.gmv, "Mar 2026", "Aug 2026")}
    </div>
    <div class="panel">
      <h3>Where every dollar goes</h3><div class="ps">${$$(P.collected)} collected from buyers, split three ways</div>
      <div class="splitbar" role="img" aria-label="Split of money collected: organizer payouts ${pc(P.gmv).toFixed(1)}%, your revenue ${pc(P.net).toFixed(1)}%, Stripe ${pc(P.stripeCost).toFixed(1)}%">
        ${split.map(s=>`<div class="seg" style="width:${pc(s.v)}%; background:${s.c}">${pc(s.v)>12?pc(s.v).toFixed(0)+"%":""}</div>`).join("")}
      </div>
      <div class="splitlegend">
        ${split.map(s=>`<div class="legrow">
          <span class="sw" style="background:${s.c}"></span>
          <span class="lname">${s.k}<div class="lsub">${s.note}</div></span>
          <b>${$$(s.v)}</b>
          <span class="lsub" style="width:44px; text-align:right">${pc(s.v).toFixed(1)}%</span>
        </div>`).join("")}
      </div>
      <div class="unitbox">
        <div class="uh">Your economics on one CA$25 ticket</div>
        <div class="uline head"><span class="ul">Buyer pays</span><span>${$(buyer)}</span></div>
        <div class="uline"><span class="ul">→ Organizer receives</span><span>${$(face)}</span></div>
        <div class="uline"><span class="ul">→ Stripe takes</span><span>${$(strp)}</span></div>
        <div class="uline keep"><span class="ul">→ You keep</span><span>${$(keep)}</span></div>
      </div>
    </div>
  </div>

  <div class="panelrow even">
    <div class="panel">
      <h3>Top organizers</h3><div class="ps">By ticket sales · ${P.organizers} organizers on the platform</div>
      <div class="tablewrap"><table>
        <thead><tr><th>Organizer</th><th class="num">Events</th><th class="num">Sales</th><th class="num">Your fee</th></tr></thead>
        <tbody>
          ${P.topOrgs.map(o=>`<tr><td class="name">${esc(o.name)}</td><td class="num">${o.events}</td><td class="num">${$$(o.gmv)}</td><td class="num"><b>${$$(o.fee)}</b></td></tr>`).join("")}
          <tr style="color:var(--muted)"><td class="name">+ ${P.otherOrgs.count} other organizers</td><td class="num">${P.otherOrgs.events}</td><td class="num">${$$(P.otherOrgs.gmv)}</td><td class="num">${$$(P.otherOrgs.fee)}</td></tr>
        </tbody>
      </table></div>
    </div>
    <div class="panel">
      <h3>Payouts going out</h3><div class="ps">Organizer earnings released after each event, via Stripe Connect</div>
      <div class="tablewrap"><table>
        <thead><tr><th>Organizer</th><th>Scheduled</th><th class="num">Amount</th></tr></thead>
        <tbody>${P.payouts.map(p=>`<tr><td class="name">${esc(p[0])}</td><td>${p[1]}</td><td class="num">${$$(p[2])}</td></tr>`).join("")}</tbody>
      </table></div>
      <div class="paycard" style="margin-top:16px">
        <div><div class="pv">${$$(P.payouts.reduce((s,p)=>s+p[2],0))}</div><div class="pl">Queued this week</div></div>
        <div class="stripe">Held in <b>Stripe</b> until each event completes — your refund protection</div>
      </div>
    </div>
  </div>

  <div class="panel">
    <h3>Events on your platform</h3><div class="ps">Showing the 8 largest of ${P.events} events · every organizer's listing lands here for review</div>
    <div class="tablewrap"><table>
      <thead><tr><th>Event</th><th>Organizer</th><th>Date</th><th class="num">Sold</th><th class="num">Gross sales</th><th class="num">Your fee</th><th>Status</th></tr></thead>
      <tbody>${P.allEvents.map(r=>`<tr>
        <td class="name">${esc(r[0])}</td><td>${esc(r[1])}</td><td>${r[2]}</td>
        <td class="num">${r[3]}</td><td class="num">${$$(r[4])}</td><td class="num"><b>${$$(r[5])}</b></td>
        <td><span class="pillstat ${r[6]}">${({live:"Live",done:"Completed",soon:"Almost full",warn:"Slow sales"})[r[6]]}</span></td>
      </tr>`).join("")}</tbody>
    </table></div>
  </div>`;
}

/* =============== boot =============== */
function buildHeader(){
  const nav = MODE === "attendee"
    ? [["home","Browse"],["saved","Saved"],["tickets","My tickets"]]
    : [["home","Browse"],["saved","Saved"],["tickets","My tickets"],["organizer","Organizer"],["admin","Platform"]];
  el("nav").innerHTML =
    nav.map(([v,l])=>`<button class="navlink" data-nav="${v}" onclick="go('${v}')">${l}${v==="saved"?`<span class="pip" id="savedpip" style="display:none">0</span>`:""}</button>`).join("")
    + (MODE==="attendee" ? "" : `<button class="btn" onclick="go('organizer')">Create event</button>`);
  const tag = el("logotag");
  if(tag) tag.textContent = MODE === "attendee" ? "" : "Platform";
}
buildHeader();
render();
