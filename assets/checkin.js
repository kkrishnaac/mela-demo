/* Door check-in — the host's scanner.
   Validates a ticket against three things: does it exist, is it for THIS
   event, and has it already walked through the door.
   Reads the same localStorage the consumer app writes, so a ticket bought
   on this device can be scanned here for real.                          */

const el = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } }
function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch(e){} }

const orders = () => load("ev_orders", []);
const cancelled = () => load("ev_cancelled", []);
let scans = load("ev_checkins", {});          // code -> {at, event}
let doorEvent = load("ev_door", "food-fest");
let last = null, busy = false;

/* A handful of pre-scanned guests so the door counter isn't empty on arrival. */
const SEED = {
  "DEMO-77001-01":{at:"7:12 PM", event:"food-fest", name:"Priya Raman",   tier:"General Entry"},
  "DEMO-77002-01":{at:"7:19 PM", event:"food-fest", name:"Marcus Osei",   tier:"Entry + Tasting Pass"},
  "DEMO-77003-01":{at:"7:24 PM", event:"food-fest", name:"Chloé Tremblay",tier:"Golden Fork (VIP)"},
  "DEMO-77004-01":{at:"7:31 PM", event:"food-fest", name:"Aisha Khan",    tier:"General Entry"},
};
/* Valid-but-not-yet-scanned guests, so "Simulate next guest" has something to do. */
const QUEUE = [
  {code:"DEMO-77010-01", name:"Jordan Blake",  tier:"General Entry",        event:"food-fest"},
  {code:"DEMO-77011-01", name:"Sana Qureshi",  tier:"Entry + Tasting Pass", event:"food-fest"},
  {code:"DEMO-77003-01", name:"Chloé Tremblay",tier:"Golden Fork (VIP)",    event:"food-fest"},  // duplicate
  {code:"DEMO-77012-01", name:"Wei Zhang",     tier:"General Admission",    event:"garba-night"}, // wrong event
  {code:"DEMO-88888-04", name:null,            tier:null,                   event:null},          // forged
  {code:"DEMO-77013-01", name:"Rohan Patel",   tier:"General Entry",        event:"food-fest"},
];
let qi = 0;

function ticketsFor(evId){
  /* real orders bought on this device */
  const rows = [];
  orders().forEach(o=>{
    if(o.eventId !== evId) return;
    let n = 0;
    o.items.forEach(it=>{ for(let k=0;k<it.qty;k++){ n++;
      rows.push({code:`${o.num}-${String(n).padStart(2,"0")}`, name:o.name, tier:it.name,
                 event:o.eventId, refunded:o.status==="refunded"}); } });
  });
  return rows;
}
function lookup(code){
  code = code.trim().toUpperCase();
  if(!code) return null;
  const real = orders().flatMap(o=>{
    let n=0; const out=[];
    o.items.forEach(it=>{ for(let k=0;k<it.qty;k++){ n++;
      out.push({code:`${o.num}-${String(n).padStart(2,"0")}`, name:o.name, tier:it.name,
                event:o.eventId, refunded:o.status==="refunded"}); } });
    return out;
  }).find(t=>t.code===code);
  if(real) return real;
  const seeded = SEED[code];
  if(seeded) return {code, name:seeded.name, tier:seeded.tier, event:seeded.event};
  const queued = QUEUE.find(q=>q.code===code && q.event);
  if(queued) return {code, name:queued.name, tier:queued.tier, event:queued.event};
  return null;
}
function nowTime(){
  const d = new Date();
  let h = d.getHours(), m = String(d.getMinutes()).padStart(2,"0");
  const ap = h>=12?"PM":"AM"; h = h%12 || 12;
  return `${h}:${m} ${ap}`;
}

function verify(code){
  const t = lookup(code);
  if(!t) return {kind:"invalid", code, msg:"No ticket with this code exists.",
    detail:"Nothing on the platform matches it. Do not admit."};
  if(t.refunded) return {kind:"void", code, t, msg:"Ticket was refunded.",
    detail:"This order was cancelled and the money returned. Do not admit."};
  if(cancelled().includes(t.event)) return {kind:"void", code, t, msg:"Event was cancelled.",
    detail:"All ticket holders were refunded in full."};
  if(t.event !== doorEvent){
    const other = EVENTS.find(e=>e.id===t.event);
    return {kind:"wrong", code, t, msg:"Valid ticket — wrong event.",
      detail:`This pass is for ${other?other.title:"another event"}. It will not open this door.`};
  }
  const prior = scans[code];
  if(prior) return {kind:"dupe", code, t, msg:"Already checked in.",
    detail:`First scanned at ${prior.at}. Someone has used this pass already — likely a screenshot.`};
  scans[code] = {at:nowTime(), event:t.event};
  save("ev_checkins", scans);
  return {kind:"ok", code, t, msg:"Checked in.", detail:"Admit — pass is valid and now used."};
}

function scan(code){
  if(busy) return;
  busy = true; render();
  setTimeout(()=>{ last = verify(code); busy = false; render();
    if(navigator.vibrate) navigator.vibrate(last.kind==="ok"?30:[40,60,40]);
  }, 620);
}
function simulate(){
  const q = QUEUE[qi % QUEUE.length]; qi++;
  scan(q.code);
}
function manual(){
  const v = el("mcode").value; if(!v.trim()) return;
  scan(v); el("mcode").value = "";
}
function setDoor(id){ doorEvent = id; save("ev_door", id); last = null; render() }
function resetDoor(){
  scans = {...SEED}; save("ev_checkins", scans); last = null; qi = 0; render();
  toast("Door reset — seeded guests restored");
}
function toast(m){
  const t = el("toast"); t.textContent = m; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove("show"), 2400);
}

function render(){
  const ev = EVENTS.find(e=>e.id===doorEvent) || EVENTS[0];
  const inDoor = Object.entries(scans).filter(([,v])=>v.event===doorEvent).length;
  const sold = doorEvent==="food-fest" ? 1842 : 312;
  const mine = ticketsFor(doorEvent).filter(t=>!t.refunded);
  const K = last ? last.kind : null;
  el("app").innerHTML = `
  <div class="ckwrap">
    <div class="ckhead">
      <div>
        <div class="eyebrow" style="color:var(--ink-3)">Door check-in</div>
        <h1>${esc(ev.title)}</h1>
        <div class="cksub">${ev.date} · ${esc(ev.venue)}, ${esc(ev.city)}</div>
      </div>
      <div class="ckcount"><div class="ckn">${inDoor}</div><div class="ckl">checked in</div></div>
    </div>

    <div class="ckdoorsel">
      <span class="rslabel" style="margin:0 8px 0 0">Scanning door for</span>
      ${["food-fest","garba-night"].map(id=>{
        const e = EVENTS.find(x=>x.id===id);
        return `<button class="chip${doorEvent===id?" on":""}" onclick="setDoor('${id}')">${esc(e.title.split(":")[0])}</button>`;
      }).join("")}
    </div>

    <div class="scanner ${K||""} ${busy?"busy":""}">
      <div class="viewfinder">
        <span class="corner tl"></span><span class="corner tr"></span>
        <span class="corner bl"></span><span class="corner br"></span>
        ${busy?`<div class="scanline"></div><div class="scantext">Reading QR…</div>`
          : last ? `<div class="verdict">
              <div class="vicon">${K==="ok"?"✓":K==="dupe"?"!":K==="wrong"?"⇄":"✕"}</div>
              <div class="vmsg">${esc(last.msg)}</div>
              ${last.t&&last.t.name?`<div class="vname">${esc(last.t.name)} · ${esc(last.t.tier)}</div>`:""}
              <div class="vcode">${esc(last.code)}</div>
            </div>`
          : `<div class="scanidle"><div class="scanico">▣</div>
              <div>Point the camera at a ticket QR</div>
              <div class="scanhint">Camera feed appears here in the real app</div></div>`}
      </div>
      ${last?`<div class="verdictbar"><b>${K==="ok"?"ADMIT":"DO NOT ADMIT"}</b> — ${esc(last.detail)}</div>`:""}
    </div>

    <div class="ckactions">
      <button class="btn block lg" onclick="simulate()" ${busy?"disabled":""}>Simulate next guest</button>
      <div class="manualrow">
        <input id="mcode" placeholder="Or type a ticket code — e.g. NB-48210-01"
          aria-label="Ticket code" onkeydown="if(event.key==='Enter')manual()">
        <button class="btn quiet" onclick="manual()">Check</button>
      </div>
    </div>

    ${mine.length?`<div class="ckpanel">
      <h3>Tickets bought on this device</h3>
      <div class="ps">Buy a ticket in the consumer app, then scan its code here — it validates for real.</div>
      ${mine.map(t=>`<button class="ckrow" onclick="scan('${t.code}')">
        <span class="ckcode">${esc(t.code)}</span>
        <span class="ckname">${esc(t.name)} · ${esc(t.tier)}</span>
        <span class="ckstate">${scans[t.code]?`<span class="statpill done">Used ${scans[t.code].at}</span>`:`<span class="statpill live">Not scanned</span>`}</span>
      </button>`).join("")}
    </div>`:`<div class="ckpanel empty2">
      <h3>No tickets bought on this device yet</h3>
      <div class="ps">Buy one in the consumer app and its code becomes scannable here.</div>
      <a class="btn ghost" href="../" style="margin-top:12px">Open consumer app</a>
    </div>`}

    <div class="ckpanel">
      <h3>Door log</h3>
      <div class="ps">${inDoor} of ${sold.toLocaleString()} sold · ${Math.round(inDoor/sold*100)}% through the gate</div>
      <div class="track" style="margin-bottom:14px"><div class="fillbar" style="width:${Math.min(100,inDoor/sold*100)}%"></div></div>
      <div class="tablewrap"><table>
        <thead><tr><th>Ticket</th><th>Guest</th><th class="num">Scanned</th></tr></thead>
        <tbody>${Object.entries(scans).filter(([,v])=>v.event===doorEvent).reverse().slice(0,8).map(([code,v])=>{
          const t = lookup(code);
          return `<tr><td class="nm">${esc(code)}</td><td>${t&&t.name?esc(t.name):"—"}</td><td class="num">${esc(v.at)}</td></tr>`;
        }).join("") || `<tr><td colspan="3" style="color:var(--ink-3)">Nobody through the door yet.</td></tr>`}</tbody>
      </table></div>
      <button class="btn ghost block" style="margin-top:14px" onclick="resetDoor()">Reset door for a fresh demo</button>
    </div>

    <div class="demobar">
      <div class="dl">Demo — four products, one ecosystem</div>
      <div class="dls">
        <a class="demolink" href="../">Consumer app</a>
        <a class="demolink" href="../organizer/">Organizer</a>
        <span class="demolink here">Door check-in</span>
        <a class="demolink" href="../platform/">Platform owner</a>
      </div>
    </div>
  </div>`;
}
if(!Object.keys(scans).length){ scans = {...SEED}; save("ev_checkins", scans) }
render();
