/* Consumer product: DISCOVER → EVENT → BUY → QR TICKET → MY TICKETS
   Organizer tooling deliberately lives in a separate product.
   Only verified events are ever rendered here.                          */

const state = {
  view:"discover", eventId:null, blogId:null,
  chip:null, q:"", locOpen:false, expanded:false,
  scope:{mode:"city", city:"Toronto", radius:null},
  orders: load("ev_orders", []),
  saved:  load("ev_saved", []),
};
function load(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } }
function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch(e){} }
/* written by the organizer dashboard when a host cancels an event */
const cancelledEvents = () => load("ev_cancelled", []);
const isCancelled = id => cancelledEvents().includes(id);

const el = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId = id => EVENTS.find(e=>e.id===id);
const blogById = id => BLOGS.find(b=>b.id===id);
const isSaved = id => state.saved.includes(id);
const LIVE = () => EVENTS.filter(e=>e.verified);

function toast(msg){
  const t = el("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove("show"), 2600);
}

/* ---------- icons ---------- */
const I = {
  pin:`<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  search:`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>`,
  heart:`<svg viewBox="0 0 24 24"><path d="M12 20.6S3.4 15 3.4 9.1A4.75 4.75 0 0 1 12 6.3a4.75 4.75 0 0 1 8.6 2.8c0 5.9-8.6 11.5-8.6 11.5Z"/></svg>`,
  compass:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.2-5.2 2 2-5.2Z"/></svg>`,
  ticket:`<svg viewBox="0 0 24 24"><path d="M4 8.5V7a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 20 7v1.5a2.2 2.2 0 0 0 0 4.4V17a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17v-4.1a2.2 2.2 0 0 0 0-4.4Z"/></svg>`,
  user:`<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.6"/><path d="M4.8 20a7.4 7.4 0 0 1 14.4 0"/></svg>`,
  back:`<svg viewBox="0 0 24 24"><path d="M15 19 8 12l7-7"/></svg>`,
  share:`<svg viewBox="0 0 24 24"><path d="M12 15V4"/><path d="m8 7.5 4-3.5 4 3.5"/><path d="M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13"/></svg>`,
  play:`<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5Z"/></svg>`,
  chev:`<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m9 5 7 7-7 7"/></svg>`,
  lock:`<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`,
  check:`<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7"/></svg>`,
};

function art(e){
  return `background-image:
    radial-gradient(circle 120px at 82% -12%, rgba(255,255,255,.30), transparent 70%),
    radial-gradient(circle 90px at 8% 112%, rgba(0,0,0,.20), transparent 70%),
    linear-gradient(140deg, ${e.art.a}, ${e.art.b});`;
}

/* ---------- scope (region / city / radius) ---------- */
function inScope(e){
  const s = state.scope;
  if(s.mode === "all") return true;
  if(e.city !== s.city) return false;
  if(s.radius !== null && e.km > s.radius) return false;
  return true;
}
function scopeLabel(){
  const s = state.scope;
  if(s.mode === "all") return "All of Canada";
  return s.radius !== null ? `Within ${s.radius} km` : `All of ${s.city}`;
}
function scopeCity(){ return state.scope.mode==="all" ? "Canada" : state.scope.city }
function setScope(mode, city, radius){
  state.scope = {mode, city: city || state.scope.city, radius: radius === undefined ? null : radius};
  state.locOpen = false; render();
}

/* ---------- search ---------- */
function parseQuery(q){
  const s = q.toLowerCase();
  const f = {tags:[], maxPrice:null, text:s, city:null};
  if(/weekend/.test(s)) f.tags.push("weekend");
  if(/free|no cost/.test(s)) f.tags.push("free");
  if(/today|tonight|right now/.test(s)) f.tags.push("today");
  if(/kid|child|family/.test(s)) f.tags.push("family");
  if(/food|eat|restaurant/.test(s)) f.tags.push("food");
  if(/music|concert|dj|dance|party|club/.test(s)) f.tags.push("music");
  if(/comedy|funny|stand.?up/.test(s)) f.tags.push("comedy");
  if(/cheap|budget|affordable/.test(s)) f.maxPrice = 25;
  const m = s.match(/under \$?(\d+)/); if(m) f.maxPrice = +m[1];
  for(const c of CITIES){ if(s.includes(c.toLowerCase())) f.city = c }
  return f;
}
const STOP = new Set(["under","over","near","this","that","events","event","things","activities",
  "activity","stuff","something","the","for","and","with","what","where","when","around","here",
  "cheap","budget","free","today","tonight","weekend","kids","kid","family","all","canada"]);

function searchResults(){
  if(!state.q.trim()) return [];
  const f = parseQuery(state.q);
  const structured = f.tags.length>0 || f.maxPrice!==null || f.city;
  const words = f.text.replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(w=>w.length>2 && !STOP.has(w));
  /* a named city in the query searches nationally, overriding the current scope */
  const pool = f.city ? LIVE().filter(e=>e.city===f.city) : LIVE().filter(inScope);
  return pool.filter(e=>{
    if(f.maxPrice!==null && e.from>f.maxPrice) return false;
    if(f.tags.length && !f.tags.some(t=>e.tags.includes(t))) return false;
    if(structured) return true;
    const hay = (e.title+" "+e.cat+" "+e.venue+" "+e.area+" "+e.city+" "+e.blurb).toLowerCase();
    return words.length ? words.some(w=>hay.includes(w)) : false;
  });
}

const SECTIONS = [
  {k:"🔥", t:"Trending near you",  f:e=>e.trending},
  {k:"",  t:"This weekend",        f:e=>e.tags.includes("weekend")},
  {k:"",  t:"Under $25",           f:e=>e.from>0 && e.from<25},
  {k:"",  t:"Free to attend",      f:e=>e.tags.includes("free")},
  {k:"",  t:"Food & festivals",    f:e=>e.tags.includes("food")},
  {k:"",  t:"Music & nightlife",   f:e=>e.tags.includes("music")},
  {k:"",  t:"Family & kids",       f:e=>e.tags.includes("family")},
  {k:"",  t:"Something different", f:e=>e.tags.includes("different")},
];
const CHIPS = [
  {id:"trending", label:"🔥 Trending", hot:true},
  {id:"today", label:"Today"}, {id:"weekend", label:"This Weekend"},
  {id:"free", label:"Free"},   {id:"food", label:"Food"},
  {id:"music", label:"Music"}, {id:"comedy", label:"Comedy"}, {id:"family", label:"Family"},
];

/* ---------- navigation ---------- */
function go(view, id){
  state.view = view;
  if(view==="event" && id){ state.eventId = id; state.expanded = false }
  if(view==="blog" && id) state.blogId = id;
  render(); window.scrollTo({top:0, behavior:"instant"});
}
function toggleSave(id, ev){
  if(ev){ ev.stopPropagation(); ev.preventDefault() }
  const i = state.saved.indexOf(id);
  if(i>=0){ state.saved.splice(i,1); toast("Removed from saved") }
  else { state.saved.push(id); toast("Saved") }
  save("ev_saved", state.saved); render();
}
function shareEvent(e){
  const url = location.origin + location.pathname + "#" + e.id;
  if(navigator.share) navigator.share({title:e.title, text:e.blurb, url}).catch(()=>{});
  else toast("Link copied — share it on Instagram or WhatsApp");
}

/* ---------- cards ---------- */
function card(e, wide){
  const sv = isSaved(e.id), off = isCancelled(e.id);
  const tag = off ? `<span class="tagpill flame">Cancelled</span>`
    : e.trending ? `<span class="tagpill flame">🔥 Trending</span>`
    : e.from===0 ? `<span class="tagpill teal">Free</span>` : "";
  return `
  <article class="ecard${wide?" wide":""}">
    <button class="ehit" onclick="go('event','${e.id}')" aria-label="${esc(e.title)}">
      <div class="eart" style="${art(e)}">
        <span class="glyph" aria-hidden="true">${e.art.glyph}</span>
        <div class="vibe">${tag}${e.video?`<span class="tagpill solid">▶ Clip</span>`:""}</div>
      </div>
      <div class="ebody">
        <div class="when">${e.dateShort} · ${e.time}</div>
        <h3>${esc(e.title)}</h3>
        <div class="eplace">${I.pin} ${esc(e.venue)}${state.scope.mode==="all"?` · ${esc(e.city)}`:""}</div>
        <div class="efoot">
          <span class="eprice${e.from===0?" free":""}">${e.from===0?"Free":"From "+$(e.from)}</span>
          <span class="esocial">${kInterested(e.interested)} interested</span>
        </div>
      </div>
    </button>
    <button class="savebtn${sv?" on":""}" onclick="toggleSave('${e.id}', event)"
      aria-pressed="${sv}" aria-label="${sv?"Remove from saved":"Save event"}">${I.heart}</button>
  </article>`;
}
function reel(e){
  return `
  <button class="reel" onclick="go('event','${e.id}')" aria-label="${esc(e.title)} — watch clip">
    <div class="reelmedia" style="${art(e)}"></div><div class="scrim"></div>
    <span class="reelplay">${I.play}</span><span class="reellen">${e.vlen}</span>
    <div class="reelinfo">
      <div class="rt">${esc(e.title)}</div>
      <div class="rd">${e.dateShort} · ${esc(e.city)}</div>
      <span class="rp">${e.from===0?"Free":"From "+$(e.from)} →</span>
    </div>
  </button>`;
}
function blogCard(b){
  return `
  <button class="bcard" onclick="go('blog','${b.id}')">
    <div class="bart" style="${art(b)}"><span class="glyph" aria-hidden="true">${b.art.glyph}</span></div>
    <div class="bbody">
      <div class="btag">${esc(b.tag)}</div>
      <h3>${esc(b.title)}</h3>
      <div class="bmeta">${esc(b.org)} · ${b.read} min read</div>
    </div>
  </button>`;
}

/* ---------- header ---------- */
function header(){
  return `
  <div class="tbwrap">
    <div class="brandmark"><span class="ring"></span>Nearby<span class="wn">Working name</span></div>
    <div class="locrow">
      <button class="locpick" onclick="state.locOpen=!state.locOpen; render()" aria-expanded="${state.locOpen}">
        <span class="pinico">${I.pin}</span>${scopeCity()}<span class="caret">▾</span>
      </button>
      <span style="font-size:12.5px;color:var(--ink-3);font-weight:600">${scopeLabel()}</span>
    </div>
    <nav class="desknav">
      ${[["discover","Discover"],["search","Search"],["saved","Saved"],["tickets","Tickets"],["profile","Profile"]]
        .map(([v,l])=>`<button class="dnav${state.view===v?" on":""}" onclick="go('${v}')">${l}${
          v==="saved"&&state.saved.length?`<span class="dpip">${state.saved.length}</span>`:""}${
          v==="tickets"&&state.orders.length?`<span class="dpip">${state.orders.length}</span>`:""}</button>`).join("")}
    </nav>
    <h1 class="askline">What's happening around you?</h1>
    <button class="searchbtn" onclick="go('search')">
      <span class="searchico">${I.search}</span> Search events, experiences or places…
    </button>
  </div>
  ${state.locOpen ? regionSheet() : ""}`;
}
function regionSheet(){
  const s = state.scope;
  return `<div class="regionsheet">
    <div class="rsgroup">
      <div class="rslabel">Distance from you</div>
      <div class="rschips">
        ${[5,10,25,50].map(r=>`<button class="chip${s.mode==="city"&&s.city==="Toronto"&&s.radius===r?" on":""}"
          onclick="setScope('city','Toronto',${r})">${r} km</button>`).join("")}
      </div>
    </div>
    <div class="rsgroup">
      <div class="rslabel">Region</div>
      <div class="rschips">
        <button class="chip${s.mode==="all"?" on":""}" onclick="setScope('all')">🇨🇦 All of Canada</button>
      </div>
    </div>
    ${REGIONS.map(r=>`
      <div class="rsgroup">
        <div class="rslabel">${r.name}</div>
        <div class="rschips">
          ${r.cities.filter(c=>CITIES.includes(c)).map(c=>{
            const n = LIVE().filter(e=>e.city===c).length;
            return `<button class="chip${s.mode==="city"&&s.city===c&&s.radius===null?" on":""}"
              onclick="setScope('city','${c}',null)">${c} <span class="cn">${n}</span></button>`;
          }).join("")}
        </div>
      </div>`).join("")}
  </div>`;
}

/* ---------- render ---------- */
function render(){
  const showBar = state.view==="discover" || state.view==="search";
  el("topbar").innerHTML = showBar ? header() : "";
  el("topbar").style.display = showBar ? "" : "none";
  const v = {discover:discoverView, search:searchView, saved:savedView, tickets:ticketsView,
             profile:profileView, event:eventView, confirm:confirmView,
             blogs:blogsView, blog:blogView}[state.view];
  el("app").innerHTML = v();
  el("tabbar").innerHTML = tabbar();
  if(state.view==="confirm") drawQRs();
  if(state.view==="search"){ const i=el("qin"); if(i && !state._nf) i.focus(); state._nf=false }
}

function discoverView(){
  const pool = LIVE().filter(inScope);
  if(state.chip){
    const list = pool.filter(e=>e.tags.includes(state.chip) || (state.chip==="trending"&&e.trending));
    return `${chipRail()}
      <div class="phead" style="padding-top:14px"><h1>${CHIPS.find(c=>c.id===state.chip).label.replace("🔥 ","")}</h1>
      <p>${list.length} event${list.length===1?"":"s"} · ${scopeLabel()}</p></div>
      ${list.length?`<div class="grid2">${list.map(e=>card(e,true)).join("")}</div>`
        :emptyBox("Nothing here right now","Try a wider region or a different vibe.")}
      ${demoBar()}`;
  }
  const reels = pool.filter(e=>e.video);
  const freeElsewhere = LIVE().filter(e=>e.from===0 && !inScope(e));
  return `
    ${chipRail()}
    ${reels.length?`<section class="sec">
      <div class="sechead"><h2>Watch the vibe</h2><span class="sn">${reels.length} clips</span></div>
      <div class="rail">${reels.map(reel).join("")}</div></section>`:""}
    ${SECTIONS.map(s=>{
      const list = pool.filter(s.f);
      if(list.length < 2) return "";
      return `<section class="sec">
        <div class="sechead"><h2>${s.k} ${s.t}</h2><span class="sn">${list.length}</span></div>
        <div class="rail">${list.map(e=>card(e)).join("")}</div></section>`;
    }).join("")}
    ${freeElsewhere.length?`<section class="sec">
      <div class="sechead"><h2>🇨🇦 Free across Canada</h2><span class="sn">${freeElsewhere.length}</span></div>
      <div class="secnote">Pulled automatically from ${PLATFORM.sourcing.feeds.length} tourism feeds in ${PLATFORM.sourcing.cities} cities — every one checked by a person before it goes live.</div>
      <div class="rail">${freeElsewhere.map(e=>card(e)).join("")}</div></section>`:""}
    <section class="sec">
      <div class="sechead"><h2>Stories from organizers</h2>
        <button class="sn" onclick="go('blogs')" style="color:var(--flame);font-weight:750">See all</button></div>
      <div class="rail">${BLOGS.slice(0,4).map(blogCard).join("")}</div>
    </section>
    ${demoBar()}`;
}
function chipRail(){
  return `<div class="chiprail">
    <button class="chip${!state.chip?" on":""}" onclick="state.chip=null; render()">For you</button>
    ${CHIPS.map(c=>`<button class="chip${c.hot?" hot":""}${state.chip===c.id?" on":""}"
      onclick="state.chip='${c.id}'; render()">${c.label}</button>`).join("")}
  </div>`;
}

const SUGGESTIONS = [
  {q:"Free events this weekend", e:"🎈"},
  {q:"Things to do in Vancouver", e:"🌲"},
  {q:"Food festivals near me", e:"🍜"},
  {q:"Kids activities Sunday", e:"🧒"},
  {q:"Club night under $30", e:"🎧"},
];
const FILTERS = [["Date","🗓️",1],["Price","💰",1],["Category","🎭",1],["Distance","📍",0],["Age","🔞",0],["Indoor / Outdoor","⛅",0]];

function searchView(){
  const res = searchResults();
  return `
  <div class="pad" style="padding-top:4px">
    <div class="searchfield">
      <span class="searchico">${I.search}</span>
      <input id="qin" value="${esc(state.q)}" placeholder="Try “free events in Calgary”"
        oninput="state.q=this.value; state._nf=true; render()" aria-label="Search">
      ${state.q?`<button onclick="state.q=''; render()" aria-label="Clear" style="color:var(--ink-3);font-size:18px">✕</button>`:""}
    </div>
  </div>
  <div class="filterrow">
    ${FILTERS.map(([l,e,on])=>`<span class="fpill${on?"":" soon"}">${e} ${l} <span class="fc">▾</span></span>`).join("")}
  </div>
  ${!state.q.trim() ? `
    <div class="phead" style="padding-top:10px"><h1>Try searching</h1><p>Ask for what you feel like doing — naming a city searches the whole country.</p></div>
    <div class="suggest">${SUGGESTIONS.map(s=>`<button class="sugg" onclick="state.q='${s.q}'; render()">
      <span class="sq">${s.e}</span>${s.q}<span class="sarr">${I.chev}</span></button>`).join("")}</div>`
  : res.length ? `
    <div class="phead" style="padding-top:10px"><h1>${res.length} result${res.length===1?"":"s"}</h1><p>for “${esc(state.q)}”</p></div>
    <div class="grid2">${res.map(e=>card(e,true)).join("")}</div>`
  : emptyBox("No matches","Try “free”, “this weekend”, a city name, or “under $30”.")}`;
}

function savedView(){
  const list = LIVE().filter(e=>isSaved(e.id));
  return `<div class="phead" style="padding-top:22px"><h1>Saved</h1><p>Your shortlist. Decide later.</p></div>
  ${list.length?`<div class="grid2">${list.map(e=>card(e,true)).join("")}</div>`
    :emptyBox("Nothing saved yet","Tap the heart on anything that looks good and it lands here.","Start discovering","discover","♡")}`;
}

/* ---------- blogs ---------- */
function blogsView(){
  return `
  <div class="backbar"><button class="iconbtn" onclick="go('discover')" aria-label="Back">${I.back}</button></div>
  <div class="phead"><h1>Stories</h1><p>Guides, city picks and behind-the-scenes, written by the people running the events.</p></div>
  <div class="grid2">${BLOGS.map(blogCard).join("")}</div>
  <div style="height:20px"></div>`;
}
function blogView(){
  const b = blogById(state.blogId); if(!b) return blogsView();
  const ev = b.eventId ? byId(b.eventId) : null;
  const more = BLOGS.filter(x=>x.id!==b.id).slice(0,4);
  return `
  <div class="backbar"><button class="iconbtn" onclick="go('blogs')" aria-label="Back">${I.back}</button></div>
  <article class="article">
    <div class="atag">${esc(b.tag)}</div>
    <h1>${esc(b.title)}</h1>
    <div class="ameta">
      <span class="aav" style="${art(b)}">${esc(b.org[0])}</span>
      <div><b>${esc(b.org)}</b><div class="asub">${b.date} · ${b.read} min read</div></div>
    </div>
    <div class="ahero" style="${art(b)}"><span class="glyph" aria-hidden="true">${b.art.glyph}</span></div>
    <p class="alead">${esc(b.excerpt)}</p>
    ${b.body.map(p=>`<p>${esc(p)}</p>`).join("")}
    ${ev?`<div class="acta">
      <div><div class="when">${ev.dateShort} · ${ev.time}</div>
      <div class="actat">${esc(ev.title)}</div>
      <div class="actam">${esc(ev.venue)} · ${ev.from===0?"Free":"From "+$(ev.from)}</div></div>
      <button class="btn" onclick="go('event','${ev.id}')">View event</button>
    </div>`:""}
  </article>
  <section class="sec"><div class="sechead"><h2>More stories</h2></div>
    <div class="rail">${more.map(blogCard).join("")}</div></section>
  <div style="height:20px"></div>`;
}

/* ---------- tickets, cancellation & refunds ---------- */
function orderStatus(o){
  if(isCancelled(o.eventId) && o.status!=="refunded") return "event_cancelled";
  return o.status || "confirmed";
}
function ticketsView(){
  return `
  <div class="phead" style="padding-top:22px"><h1>My tickets</h1><p>Show the QR at the door.</p></div>
  <div style="height:14px"></div>
  ${state.orders.length ? state.orders.map(o=>{
    const e = byId(o.eventId), st = orderStatus(o);
    const pill = st==="refunded" ? `<span class="statpill done">Refunded</span>`
      : st==="event_cancelled" ? `<span class="statpill warn">Event cancelled</span>`
      : `<span class="statpill live">Valid</span>`;
    return `<button class="orderrow" style="width:calc(100% - 32px)"
        onclick="state.lastOrder=state.orders.find(x=>x.num==='${o.num}'); go('confirm')">
      <div class="oa" style="${art(e)}"></div>
      <div class="oi">
        <div class="when">${e.dateShort} · ${e.time}</div>
        <div class="onm">${esc(e.title)}</div>
        <div class="omt">${o.items.reduce((s,i)=>s+i.qty,0)} ticket(s) · ${esc(e.city)}</div>
        <div style="margin-top:6px">${pill}</div>
      </div>
      <span class="oq">${I.chev}</span>
    </button>`;
  }).join("")
  : emptyBox("No tickets yet","When you book something, your QR passes live here.","Find something to do","discover","🎟️")}`;
}

/* customer-initiated cancellation: ticket price back, service fee retained.
   event cancelled by host: everything back, including fees. */
function refundQuote(o){
  const e = byId(o.eventId);
  if(orderStatus(o)==="event_cancelled") return {amount:o.total, fees:true, reason:"event"};
  const allowed = !/no refunds/i.test(e.refund);
  return {amount:o.face, fees:false, allowed, policy:e.refund, reason:"customer"};
}
function openRefund(num){
  const o = state.orders.find(x=>x.num===num); if(!o) return;
  const q = refundQuote(o), e = byId(o.eventId);
  let ov = el("sheet");
  if(!ov){ ov = document.createElement("div"); ov.id="sheet"; ov.className="scrim-full";
    ov.addEventListener("click", ev=>{ if(ev.target===ov) closeSheet() }); document.body.appendChild(ov) }
  document.body.style.overflow="hidden";
  ov.innerHTML = `
  <div class="sheet" role="dialog" aria-modal="true" aria-label="Cancel and refund">
    <div class="shead"><div class="grabber"></div>
      <div class="sheadrow"><div style="flex:1;min-width:0">
        <div class="st">Cancel your tickets</div><div class="sd">${esc(e.title)}</div></div>
        <button class="iconbtn" style="width:32px;height:32px" onclick="closeSheet()" aria-label="Close">✕</button>
      </div>
    </div>
    <div class="sbody">
      ${q.allowed===false ? `
        <div class="warnbox"><b>These tickets are non-refundable.</b><br>${esc(q.policy)}. If the organizer cancels the event, you are refunded in full automatically — no action needed.</div>
        <p style="font-size:13.5px;color:var(--ink-2);margin-top:12px">You can still transfer your ticket to someone else by forwarding the confirmation email.</p>`
      : `
        <div class="sumline"><span class="sl">Ticket price</span><span>${$(o.face)}</span></div>
        <div class="sumline"><span class="sl">Service fees${q.fees?"":" (non-refundable)"}</span>
          <span>${q.fees?$(o.fees):"—"}</span></div>
        <div class="sumline tot"><span>Refund to your ${o.last4?esc(o.brand)+" ••••"+esc(o.last4):"payment method"}</span>
          <span>${$(q.amount)}</span></div>
        <div class="guestnote" style="margin-top:14px"><span>↩︎</span><div>
          Sent back through <b>Stripe</b> to the original card. Most banks post it in <b>5–10 business days</b>.</div></div>
        ${q.reason==="event"?`<div class="warnbox" style="margin-top:12px"><b>This event was cancelled by the organizer.</b> You're being refunded in full, including all fees.</div>`:
          `<p style="font-size:12.5px;color:var(--ink-3);margin-top:12px">${esc(q.policy)}. Your seats go back on sale immediately.</p>`}`}
    </div>
    <div class="sfoot">
      ${q.allowed===false ? `<button class="btn block lg quiet" onclick="closeSheet()">Close</button>`
        : `<button class="btn block lg" id="refbtn" onclick="doRefund('${o.num}')">Cancel and refund ${$(q.amount)}</button>
           <button class="btn block ghost" style="margin-top:9px" onclick="closeSheet()">Keep my tickets</button>`}
    </div>
  </div>`;
}
function doRefund(num){
  const b = el("refbtn"); b.disabled = true;
  b.innerHTML = `<span class="spin"></span> Refunding through Stripe…`;
  setTimeout(()=>{
    const o = state.orders.find(x=>x.num===num);
    const q = refundQuote(o);
    o.status = "refunded"; o.refundAmount = q.amount;
    o.refundReason = q.reason==="event" ? "Event cancelled by organizer" : "Cancelled by you";
    save("ev_orders", state.orders);
    closeSheet(); state.lastOrder = o; go("confirm");
    toast("Refund issued — 5–10 business days");
  }, 1800);
}

/* ---------- profile ---------- */
function profileView(){
  return `
  <div class="phead" style="padding-top:22px"><h1>Profile</h1></div>
  <div class="profcard">
    <div class="profav">👋</div>
    <h3>You're browsing as a guest</h3>
    <p>Create a free account to keep your tickets and saved events across devices.</p>
    <button class="btn block" onclick="toast('Account creation comes after V1 — tickets already work without it.')">Create free account</button>
    <button class="btn ghost block" style="margin-top:9px" onclick="toast('Sign-in is optional by design — you never need it to buy.')">I already have one</button>
  </div>
  <div class="statrow">
    <div class="statbox"><div class="sv">${state.saved.length}</div><div class="sl">Saved</div></div>
    <div class="statbox"><div class="sv">${state.orders.length}</div><div class="sl">Orders</div></div>
    <div class="statbox"><div class="sv">${state.orders.reduce((s,o)=>s+o.items.reduce((a,i)=>a+i.qty,0),0)}</div><div class="sl">Tickets</div></div>
  </div>
  <div style="margin-top:18px; background:var(--surface); border-top:1px solid var(--line); border-bottom:1px solid var(--line)">
    ${[["📰","Stories","blogs"],["📍","Region & distance",""],["🔔","Notifications",""],["💳","Payment & refunds",""],["❓","Help & contact",""]]
      .map(([q,l,v])=>`<button class="listrow" onclick="${v?`go('${v}')`:`toast('Kept out of V1 deliberately.')`}">
        <span class="lq">${q}</span>${l}<span class="larr">${I.chev}</span></button>`).join("")}
  </div>
  ${demoBar()}`;
}

function emptyBox(h,p,cta,view,ico){
  return `<div class="empty"><div class="eico">${ico||"🔍"}</div><h3>${h}</h3><p>${p}</p>
    ${cta?`<button class="btn" onclick="go('${view}')">${cta}</button>`:""}</div>`;
}
function demoBar(){
  return `<div class="demobar">
    <div class="dl">Demo — four products, one ecosystem</div>
    <div class="dls">
      <span class="demolink here">Consumer app</span>
      <a class="demolink" href="organizer/">Organizer</a>
      <a class="demolink" href="checkin/">Door check-in</a>
      <a class="demolink" href="platform/">Platform owner</a>
    </div>
    <p style="font-size:11.5px;color:var(--ink-3);margin-top:9px;line-height:1.45">Every event, figure and payment here is simulated for demo purposes.</p>
  </div>`;
}

/* ---------- event detail ---------- */
function eventView(){
  const e = byId(state.eventId); if(!e) return discoverView();
  const sv = isSaved(e.id), off = isCancelled(e.id);
  const similar = LIVE().filter(x=>x.id!==e.id && (x.cat===e.cat || x.tags.some(t=>e.tags.includes(t)))).slice(0,6);
  return `
  <div class="backbar">
    <button class="iconbtn" onclick="go('discover')" aria-label="Back">${I.back}</button>
    <button class="iconbtn spaced" onclick="shareEvent(byId('${e.id}'))" aria-label="Share">${I.share}</button>
    <button class="iconbtn${sv?" on":""}" onclick="toggleSave('${e.id}')" aria-pressed="${sv}" aria-label="Save">${I.heart}</button>
  </div>
  <div class="dhero" style="${art(e)}">
    <span class="glyph" aria-hidden="true">${e.art.glyph}</span>
    ${e.video?`<span class="heroplay">${I.play}</span>`:""}
    <div class="vibe">
      ${e.trending?`<span class="tagpill flame">🔥 Trending</span>`:""}
      ${e.video?`<span class="tagpill solid">▶ ${e.vlen} clip</span>`:""}
    </div>
  </div>
  <div class="detailgrid">
    <div>
      ${off?`<div class="warnbox big"><b>This event has been cancelled by the organizer.</b><br>
        Everyone who bought a ticket has been refunded in full, including fees. Nothing to do.</div>`:""}
      <h1 class="dtitle">${esc(e.title)}</h1>
      <div class="verifyrow">
        <span class="vbadge">${I.check} Verified event</span>
        <span class="vtext">Reviewed by our team on ${esc(e.verifiedOn)}${e.sourced?` · sourced from ${esc(e.sourced.feed)}`:""}</span>
      </div>
      <div class="factlist">
        <div class="fact"><span class="factico">📅</span><div>
          <div class="f1">${e.date} · ${e.timeRange}</div><div class="f2">${esc(e.doors)}</div></div></div>
        <div class="fact"><span class="factico">📍</span><div>
          <div class="f1">${esc(e.venue)}, ${esc(e.city)}</div>
          <div class="f2">${esc(e.addr)}${state.scope.city===e.city?` · <b>${e.km} km away</b>`:""}</div></div></div>
        <div class="fact"><span class="factico">💰</span><div>
          <div class="f1">${e.from===0?"Free entry":"From "+$(e.from)}</div><div class="f2">${esc(e.refund)}</div></div></div>
        <div class="fact"><span class="factico">🎟️</span><div>
          <div class="f1">QR ticket, scanned at the door</div>
          <div class="f2">Each pass is unique to you and this event — it can only be used once</div></div></div>
      </div>
      <div class="dsec"><h2>About this event</h2>
        <div class="${state.expanded?"":"clamp"}">${e.about.map(p=>`<p>${esc(p)}</p>`).join("")}</div>
        <button class="readmore" onclick="state.expanded=!state.expanded; render()">${state.expanded?"Show less":"Read more"}</button>
      </div>
      <div class="dsec"><h2>What to expect</h2>
        <div class="expectgrid">${e.expect.map(x=>`<div class="expect"><span class="ex">${x.e}</span>
          <div class="en">${esc(x.n)}</div><div class="ed">${esc(x.d)}</div></div>`).join("")}</div>
      </div>
      <div class="dsec"><h2>Where it is</h2>
        <div class="mapbox"><div class="pin"></div></div>
        <p style="font-size:13px;color:var(--ink-3);margin-top:9px">${esc(e.venue)} · ${esc(e.area)}, ${esc(e.city)}</p>
      </div>
      <div class="dsec"><h2>Organised by</h2>
        <div class="orgrow">
          <div class="oav" style="${art(e)}">${esc(e.org.name[0])}</div>
          <div style="min-width:0"><div class="on">${esc(e.org.name)}</div>
            <div class="om">${e.org.followers} followers · ${e.org.events} events · ${e.org.years} yrs</div></div>
          <button class="btn ghost" onclick="toast('Following ${esc(e.org.name)}')">Follow</button>
        </div>
      </div>
    </div>
    <aside class="buybar">
      <div class="bp"><div class="bpl">${e.from===0?"Entry":"From"}</div>
        <div class="bpv">${e.from===0?"Free":$(e.from)}</div></div>
      ${off?`<button class="btn lg" disabled>Event cancelled</button>`
        :`<button class="btn lg" onclick="openSheet('${e.id}')">${e.from===0?"Reserve a spot":"Get tickets"}</button>`}
      <div class="buysub">No account needed · QR ticket by email</div>
    </aside>
  </div>
  ${similar.length?`<section class="sec" style="margin-top:30px">
    <div class="sechead"><h2>You might also like</h2></div>
    <div class="rail">${similar.map(x=>card(x)).join("")}</div></section>`:""}
  <div style="height:26px"></div>`;
}

/* ---------- tab bar ---------- */
function tabbar(){
  if(state.view==="event") return "";
  const tabs = [["discover","Discover",I.compass],["search","Search",I.search],
                ["saved","Saved",I.heart],["tickets","Tickets",I.ticket],["profile","Profile",I.user]];
  return tabs.map(([v,l,ico])=>{
    const n = v==="saved"?state.saved.length : v==="tickets"?state.orders.length : 0;
    const on = state.view===v || (v==="discover"&&(state.view==="blogs"||state.view==="blog"));
    return `<button class="tabbtn${on?" on":""}" onclick="go('${v}')" aria-label="${l}">
      ${ico.replace('<svg viewBox="0 0 24 24"','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"')}
      <span>${l}</span>${n?`<span class="tabdot">${n}</span>`:""}</button>`;
  }).join("");
}

/* ---------- checkout ---------- */
let cart = null, timerH = null;
function openSheet(id){
  const e = byId(id);
  cart = {id, qty:e.tiers.map(()=>0), promo:null, step:1, secs:600};
  drawSheet(); startTimer();
}
function startTimer(){
  clearInterval(timerH);
  timerH = setInterval(()=>{
    if(!cart){ clearInterval(timerH); return }
    cart.secs--;
    const t = el("hold"); if(t) t.textContent = fmt(cart.secs);
    if(cart.secs<=0){ closeSheet(); toast("Your held tickets were released") }
  },1000);
}
const fmt = s => Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
function totals(){
  const e = byId(cart.id);
  let sub=0, fees=0, count=0;
  e.tiers.forEach((t,i)=>{ sub+=t.price*cart.qty[i]; fees+=fee(t.price)*cart.qty[i]; count+=cart.qty[i] });
  const disc = cart.promo ? sub*0.10 : 0;
  const face = Math.max(0, sub-disc);
  return {sub, fees, disc, count, face, total: face+fees};
}
function drawSheet(){
  const e = byId(cart.id), t = totals();
  let ov = el("sheet");
  if(!ov){ ov = document.createElement("div"); ov.id="sheet"; ov.className="scrim-full";
    ov.addEventListener("click", ev=>{ if(ev.target===ov) closeSheet() }); document.body.appendChild(ov) }
  document.body.style.overflow="hidden";
  ov.innerHTML = `
  <div class="sheet" role="dialog" aria-modal="true" aria-label="Get tickets">
    <div class="shead"><div class="grabber"></div>
      <div class="sheadrow">
        <div style="flex:1;min-width:0"><div class="st">${esc(e.title)}</div>
          <div class="sd">${e.date} · ${e.time} · ${esc(e.venue)}</div></div>
        <span class="hold">${I.lock} <span id="hold">${fmt(cart.secs)}</span></span>
        <button class="iconbtn" style="width:32px;height:32px" onclick="closeSheet()" aria-label="Close">✕</button>
      </div>
    </div>
    <div class="sbody">
      <div class="steps"><span class="sdot on"></span> Tickets
        <span class="sdot${cart.step===2?" on":""}" style="margin-left:6px"></span> Checkout
        <span class="sdot" style="margin-left:6px"></span> QR pass</div>
      ${cart.step===1 ? stepTickets(e) : stepPay(t)}
    </div>
    <div class="sfoot">
      ${t.count?`<div class="sumline"><span class="sl">${t.count} ticket${t.count===1?"":"s"}${t.disc?" · promo applied":""}</span>
        <span><b>${t.total===0?"Free":$(t.total)}</b></span></div>`:""}
      ${cart.step===1
        ? `<button class="btn block lg" ${t.count?"":"disabled"} onclick="cart.step=2; drawSheet()">${t.total===0?"Reserve":"Continue"}</button>`
        : `<button class="btn block lg" id="pay" onclick="placeOrder()">${t.total===0?"Confirm reservation":"Pay "+$(t.total)}</button>`}
      <div style="font-size:11.5px;color:var(--ink-3);text-align:center;margin-top:9px">
        ${cart.step===1?"Fees shown before you pay":"Simulated payment — no card is charged"}</div>
    </div>
  </div>`;
}
function stepTickets(e){
  return `
  ${e.tiers.map((tr,i)=>`
    <div class="tierbox${cart.qty[i]?" picked":""}${tr.gone?" gone":""}">
      <div class="ti"><div class="tn">${esc(tr.name)}</div><div class="td">${esc(tr.desc)}</div>
        <div class="tp">${tr.price===0?"Free":$(tr.price)}${tr.price&&!tr.gone?` <span class="fee">+ ${$(fee(tr.price))} fees</span>`:""}</div></div>
      ${tr.gone?`<span class="gonepill">Sold out</span>`:`
      <div class="step"><button onclick="bump(${i},-1)" ${cart.qty[i]?"":"disabled"} aria-label="Fewer">−</button>
        <span class="q">${cart.qty[i]}</span>
        <button onclick="bump(${i},1)" ${cart.qty[i]>=8?"disabled":""} aria-label="More">+</button></div>`}
    </div>`).join("")}
  <div class="promorow">
    <input id="promo" placeholder="Promo code — try SAVE10" aria-label="Promo code" onkeydown="if(event.key==='Enter')applyPromo()">
    <button class="btn quiet" onclick="applyPromo()">Apply</button>
  </div>
  <div id="pmsg">${cart.promo?`<div class="pmsg ok">✓ SAVE10 applied — 10% off</div>`:""}</div>
  <div class="testnote">${esc(byId(cart.id).refund)}. Cancel any time from <b>My tickets</b> and the refund goes back through Stripe.</div>
  <div style="height:8px"></div>`;
}
function stepPay(t){
  return `
  <button class="readmore" onclick="cart.step=1; drawSheet()" style="margin-bottom:12px">← Back to tickets</button>
  <div class="guestnote"><span>👤</span><div><b>Checking out as a guest.</b> No account needed — your QR ticket goes straight to your email.</div></div>
  ${t.total>0?`
  <div class="walletrow">
    <button class="wbtn" onclick="toast('Apple Pay opens here via Stripe in the real build')"> Pay</button>
    <button class="wbtn g" onclick="toast('Google Pay opens here via Stripe in the real build')">G Pay</button>
  </div>
  <div class="ordiv">or pay with card</div>`:""}
  <div class="frow">
    <div class="field"><label for="n">Full name</label><input id="n" autocomplete="off" placeholder="Alex Mensah"></div>
    <div class="field"><label for="em">Email</label><input id="em" autocomplete="off" inputmode="email" placeholder="alex@example.com"></div>
  </div>
  ${t.total>0?`
  <div class="field cardwrap"><label for="cn">Card number</label>
    <input id="cn" inputmode="numeric" autocomplete="off" placeholder="1234 5678 9012 3456" maxlength="19" oninput="fmtCard(this)">
    <span class="cbrand" id="cb"></span></div>
  <div class="frow">
    <div class="field"><label for="ex">Expiry</label><input id="ex" inputmode="numeric" placeholder="MM / YY" maxlength="7" oninput="fmtExp(this)"></div>
    <div class="field"><label for="cv">CVC</label><input id="cv" inputmode="numeric" placeholder="123" maxlength="4" oninput="this.value=this.value.replace(/\D/g,'')"></div>
  </div>
  <div class="testnote">Demo mode — use Stripe's test card <b>4242 4242 4242 4242</b>, any future expiry, any CVC. Real cards are never touched: Stripe handles them directly.</div>`:""}
  <div style="height:8px"></div>`;
}
function bump(i,d){ cart.qty[i] = Math.max(0, Math.min(8, cart.qty[i]+d)); drawSheet() }
function applyPromo(){
  const v = (el("promo")?.value||"").trim().toUpperCase();
  if(v==="SAVE10"){ cart.promo=true; drawSheet() }
  else if(v) el("pmsg").innerHTML = `<div class="pmsg no">That code isn't valid. (Hint: SAVE10)</div>`;
}
function fmtCard(inp){
  const v = inp.value.replace(/\D/g,"").slice(0,16);
  inp.value = v.replace(/(.{4})/g,"$1 ").trim();
  el("cb").textContent = v[0]==="4"?"VISA":v[0]==="5"?"MC":v[0]==="3"?"AMEX":"";
}
function fmtExp(inp){
  const v = inp.value.replace(/\D/g,"").slice(0,4);
  inp.value = v.length>2 ? v.slice(0,2)+" / "+v.slice(2) : v;
}
function placeOrder(){
  const t = totals();
  const name = el("n").value.trim(), email = el("em").value.trim();
  let bad = false;
  [["n",!!name],["em",email.includes("@")&&email.includes(".")]].forEach(([id,ok])=>{
    el(id).classList.toggle("bad",!ok); if(!ok) bad=true });
  let last4="", brand="";
  if(t.total>0){
    const c = el("cn").value.replace(/\s/g,"");
    [["cn",c.length===16],["ex",el("ex").value.length>=6],["cv",el("cv").value.length>=3]].forEach(([id,ok])=>{
      el(id).classList.toggle("bad",!ok); if(!ok) bad=true });
    last4 = c.slice(-4);
    brand = c[0]==="4"?"Visa":c[0]==="5"?"Mastercard":c[0]==="3"?"Amex":"Card";
  }
  if(bad){ toast("Check the highlighted fields"); return }
  const b = el("pay"); b.disabled = true;
  b.innerHTML = `<span class="spin"></span> ${t.total===0?"Reserving…":"Paying…"}`;
  setTimeout(()=>{
    const e = byId(cart.id);
    const num = "NB-" + String(48210 + state.orders.length*173);
    const order = {num, eventId:cart.id, name, email, total:t.total, face:t.face, fees:t.fees,
      last4, brand, status:"confirmed",
      items: e.tiers.map((tr,i)=>({name:tr.name, qty:cart.qty[i]})).filter(x=>x.qty>0)};
    state.orders.unshift(order); state.lastOrder = order; save("ev_orders", state.orders);
    closeSheet(); go("confirm");
  }, 1700);
}
function closeSheet(){
  clearInterval(timerH); el("sheet")?.remove();
  document.body.style.overflow=""; cart = null;
}
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeSheet() });

/* ---------- confirmation / pass ---------- */
function confirmView(){
  const o = state.lastOrder || state.orders[0];
  if(!o) return discoverView();
  const e = byId(o.eventId), st = orderStatus(o);
  let n = 0;
  const refunded = st==="refunded";
  return `
  <div class="backbar"><button class="iconbtn" onclick="go('tickets')" aria-label="Back">${I.back}</button></div>
  <div class="confwrap">
    ${refunded ? `
      <div class="tick grey">↩︎</div>
      <h1>Refunded</h1>
      <p class="csub"><b>${$(o.refundAmount)}</b> is on its way back to your ${o.last4?esc(o.brand)+" ••••"+esc(o.last4):"payment method"}. ${esc(o.refundReason)}.</p>
      <div class="cord">Order ${o.num} · Refunded through Stripe · 5–10 business days</div>`
    : st==="event_cancelled" ? `
      <div class="tick warn">!</div>
      <h1>Event cancelled</h1>
      <p class="csub"><b>${esc(e.title)}</b> was cancelled by the organizer. You're due a full refund of <b>${$(o.total)}</b>, fees included.</p>
      <div class="cord">Order ${o.num} · No action needed — but you can trigger it now</div>
      <div style="margin:0 0 22px"><button class="btn lg" onclick="openRefund('${o.num}')">Issue my full refund</button></div>`
    : `
      <div class="tick"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7"/></svg></div>
      <h1>You're in!</h1>
      <p class="csub">${o.items.reduce((s,i)=>s+i.qty,0)} ticket(s) to <b>${esc(e.title)}</b>. We've emailed your QR pass to <b>${esc(o.email)}</b>.</p>
      <div class="cord">Order ${o.num}${o.total===0?" · Free":" · Paid "+$(o.total)+(o.last4?" · "+esc(o.brand)+" •••• "+esc(o.last4):"")}</div>`}

    ${o.items.map(i=>Array.from({length:i.qty},()=>{
      n++;
      const code = `${o.num}-${String(n).padStart(2,"0")}`;
      return `<div class="pass${refunded?" void":""}">
        <div class="passtop">
          <div class="qr"><canvas class="qrc" width="78" height="78" data-seed="${code}"></canvas></div>
          <div style="min-width:0">
            <div class="pn">${esc(e.title)}</div>
            <div class="pt">${esc(i.name)} · Ticket ${n}</div>
            <div class="pm">${e.date} · ${e.time} · ${esc(e.venue)}</div>
          </div>
        </div>
        <div class="rip"></div>
        <div class="passbot"><span>${esc(o.name)}</span><span class="tcode">${code}</span></div>
        ${refunded?`<div class="voidstamp">Void — refunded</div>`:""}
      </div>`;
    }).join("")).join("")}

    ${!refunded?`
    <div class="acctprompt"><span class="ai">🔐</span>
      <div style="flex:1"><h4>Keep this ticket safe</h4>
        <p>Create a free account so your pass survives a lost phone or cleared browser.</p></div>
      <button class="btn quiet" onclick="toast('Post-purchase account creation — exactly where it belongs.')">Create</button>
    </div>
    <div class="acctprompt"><span class="ai">🚪</span>
      <div style="flex:1"><h4>Try the door scanner</h4>
        <p>Open the check-in product and scan code <b>${o.num}-01</b> to see the host's side.</p></div>
      <a class="btn quiet" href="checkin/">Open</a>
    </div>`:""}

    <div class="confbtns">
      ${!refunded?`<button class="btn ghost" onclick="toast('Adds the pass to Apple/Google Wallet in the real build')">Add to Wallet</button>
      <button class="btn ghost" onclick="openRefund('${o.num}')">Cancel &amp; refund</button>`:""}
      <button class="btn" onclick="go('discover')">Keep discovering</button>
    </div>
    <div style="height:20px"></div>
  </div>`;
}
function drawQRs(){
  document.querySelectorAll(".qrc").forEach(cv=>{
    const ctx = cv.getContext("2d"), n=21, s=cv.width/n;
    let h = 2166136261;
    for(const c of cv.dataset.seed){ h^=c.charCodeAt(0); h=Math.imul(h,16777619) }
    const rnd=()=>{ h^=h<<13; h^=h>>>17; h^=h<<5; return (h>>>0)/4294967296 };
    ctx.fillStyle="#fff"; ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle="#141110";
    for(let y=0;y<n;y++)for(let x=0;x<n;x++){
      if((x<7&&y<7)||(x>=n-7&&y<7)||(x<7&&y>=n-7)) continue;
      if(rnd()>0.52) ctx.fillRect(x*s,y*s,s,s);
    }
    const eye=(cx,cy)=>{ ctx.fillRect(cx,cy,7*s,7*s); ctx.fillStyle="#fff"; ctx.fillRect(cx+s,cy+s,5*s,5*s); ctx.fillStyle="#141110"; ctx.fillRect(cx+2*s,cy+2*s,3*s,3*s) };
    eye(0,0); eye((n-7)*s,0); eye(0,(n-7)*s);
  });
}

/* ---------- boot ---------- */
addEventListener("scroll", ()=>{ el("topbar")?.classList.toggle("stuck", scrollY>6) }, {passive:true});
if(location.hash){ const id = location.hash.slice(1); if(byId(id)){ state.view="event"; state.eventId=id } }
render();
