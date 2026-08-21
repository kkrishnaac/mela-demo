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

/* ---------- camera scanning (real QR, any phone) ---------- */
let camStream = null, camLoop = null, camErr = null, cooldownUntil = 0, scanBusy = false;
const workCv = document.createElement("canvas");
const workCtx = workCv.getContext("2d", {willReadFrequently:true});

async function startCam(){
  camErr = null;
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    camErr = "This browser can't open the camera. Use manual entry below."; render(); return;
  }
  try{
    camStream = await navigator.mediaDevices.getUserMedia({
      video:{facingMode:{ideal:"environment"}, width:{ideal:1280}}, audio:false});
  }catch(err){
    camErr = err && (err.name==="NotAllowedError"||err.name==="SecurityError")
      ? "Camera permission was declined. Allow camera access for this site, or use manual entry."
      : "Couldn't start the camera ("+ (err&&err.name||"error") +"). Use manual entry below.";
    render(); return;
  }
  last = null; render(); attachCam();
  camLoop = requestAnimationFrame(camTick);
}
function attachCam(){
  const v = el("camvid");
  if(v && camStream && v.srcObject !== camStream){ v.srcObject = camStream; v.play().catch(()=>{}) }
}
function stopCam(){
  if(camLoop) cancelAnimationFrame(camLoop);
  if(camStream) camStream.getTracks().forEach(t=>t.stop());
  camStream = null; camLoop = null; render();
}
async function camTick(){
  if(!camStream) return;
  camLoop = requestAnimationFrame(camTick);
  const v = el("camvid");
  if(!v || v.readyState < 2 || scanBusy || performance.now() < cooldownUntil) return;
  const w = 360, h = Math.max(120, Math.round(w * v.videoHeight / (v.videoWidth||1)));
  workCv.width = w; workCv.height = h;
  workCtx.drawImage(v, 0, 0, w, h);
  const img = workCtx.getImageData(0, 0, w, h);
  const hit = jsQR(img.data, w, h, {inversionAttempts:"dontInvert"});
  if(hit && hit.data && hit.data.trim()){
    scanBusy = true;
    const res = await verifyScan(hit.data);
    last = res; scanBusy = false;
    cooldownUntil = performance.now() + 2600;
    render(); attachCam();
    if(navigator.vibrate) navigator.vibrate(res.kind==="ok" ? 40 : [50,70,50]);
  }
}

/* Verify either a signed QR payload (NBY1.event.code.sig — works for tickets
   bought on ANY phone) or a bare ticket code (manual entry / same device). */
async function verifyScan(text){
  const t = String(text||"").trim();
  if(t.startsWith(TICKET_PROTO + ".")){
    const p = await ticketParse(t);
    if(!p) return {kind:"invalid", code:t.slice(0,28), msg:"Unreadable ticket.",
      detail:"The QR is in the ticket format but malformed. Do not admit."};
    if(!p.sigOk) return {kind:"invalid", code:p.code, msg:"Forged or altered ticket.",
      detail:"The security signature does not match. Do not admit."};
    const local = lookup(p.code);
    if(local && local.refunded) return {kind:"void", code:p.code, t:local, msg:"Ticket was refunded.",
      detail:"This order was cancelled and the money returned. Do not admit."};
    if(cancelled().includes(p.eventId)) return {kind:"void", code:p.code, msg:"Event was cancelled.",
      detail:"All ticket holders were refunded in full."};
    if(p.eventId !== doorEvent){
      const other = EVENTS.find(e=>e.id===p.eventId), here = EVENTS.find(e=>e.id===doorEvent);
      return {kind:"wrong", code:p.code, msg:"Valid ticket — wrong event.",
        detail:`Genuine pass, but for ${other?other.title:"a different event"}. This scanner is assigned to ${here?here.title:"another event"}.`};
    }
    const prior = scans[p.code];
    if(prior) return {kind:"dupe", code:p.code, t:local, msg:"Already checked in.",
      detail:`First scanned at ${prior.at}. Someone has used this pass already — likely a screenshot.`};
    scans[p.code] = {at:nowTime(), event:p.eventId};
    save("ev_checkins", scans);
    return {kind:"ok", code:p.code, t:local, msg:"Checked in.",
      detail:"Signature verified for this event — pass is genuine and now used. Admit."};
  }
  if(t.toUpperCase().includes("NBY1")) return {kind:"invalid", code:t.slice(0,28),
    msg:"Unreadable ticket.", detail:"Partial payload — rescan the QR. Do not admit."};
  return verify(t);
}

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
  setTimeout(async ()=>{ last = await verifyScan(code); busy = false; render();
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
function setDoor(id){ doorEvent = id; save("ev_door", id); last = null; render(); }
function doorSearch(q, commit){
  const box = el("doorres"); if(!box) return;
  q = (q||"").trim();
  if(!q){ box.innerHTML = ""; return }
  const Q = q.toUpperCase();
  const exact = EVENTS.find(e=>e.door === Q);
  if(exact){
    setDoor(exact.id);
    toast("Scanner assigned via code " + exact.door + " — " + exact.title);
    return;
  }
  const ql = q.toLowerCase();
  const hits = EVENTS.filter(e=>e.verified &&
    (e.door.startsWith(Q) || e.title.toLowerCase().includes(ql) ||
     e.city.toLowerCase().includes(ql) || e.venue.toLowerCase().includes(ql))).slice(0,6);
  if(!hits.length){
    box.innerHTML = `<div class="doorempty">No event matches “${esc(q)}”. Check the door code with the organizer.</div>`;
    return;
  }
  if(commit && hits.length === 1){
    setDoor(hits[0].id);
    toast("Scanner assigned — " + hits[0].title);
    return;
  }
  box.innerHTML = hits.map(e=>`
    <button class="doorrow" onclick="setDoor('${e.id}'); toast('Scanner assigned — ${esc(e.title).replace(/'/g,"\\'")}')">
      <span class="doorcode sm">${esc(e.door)}</span>
      <span class="drname">${esc(e.title)}<span class="drmeta">${e.date} · ${esc(e.city)}</span></span>
    </button>`).join("");
}
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
  const SOLD = {"food-fest":1842, "garba-night":312};
  const sold = SOLD[doorEvent] || Math.max(ticketsFor(doorEvent).length + inDoor, Math.round((ev.interested||500)*0.35));
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
      <div class="rslabel" style="margin:0 0 8px">Scanner assigned to</div>
      <div class="doorcard">
        <div style="min-width:0">
          <div class="dcname">${esc(ev.title)}</div>
          <div class="dcmeta">${ev.date} · ${esc(ev.venue)}, ${esc(ev.city)}</div>
        </div>
        <span class="doorcode" title="This event's door code">${esc(ev.door)}</span>
      </div>
      <div class="doorfind">
        <input id="doorq" class="doorsearch" placeholder="Switch event — enter door code (e.g. GARBA) or name"
          autocapitalize="characters" autocomplete="off" aria-label="Find event by door code or name"
          oninput="doorSearch(this.value)" onkeydown="if(event.key==='Enter')doorSearch(this.value,true)">
      </div>
      <div id="doorres" class="doorres"></div>
      <div class="ps" style="margin:8px 0 0">Every event has a short <b>door code</b> — the organizer finds it on their dashboard and gives it to door staff. Only a QR issued for <b>this</b> event turns the light green.</div>
    </div>

    <div class="scanner ${K||""} ${busy?"busy":""}">
      <div class="viewfinder${camStream?" camon":""}">
        ${camStream?`<video id="camvid" playsinline muted autoplay></video>`:""}
        <span class="corner tl"></span><span class="corner tr"></span>
        <span class="corner bl"></span><span class="corner br"></span>
        ${camStream
          ? (last ? `<div class="camverdict ${K}">
                <b>${K==="ok"?"✓ ADMIT":"✕ DO NOT ADMIT"}</b>
                <span>${esc(last.msg)}${last.t&&last.t.name?" · "+esc(last.t.name):""} · ${esc(last.code)}</span>
              </div>`
            : `<div class="camhint">Point at a ticket QR</div>`)
          : busy?`<div class="scanline"></div><div class="scantext">Reading QR…</div>`
          : last ? `<div class="verdict">
              <div class="vicon">${K==="ok"?"✓":K==="dupe"?"!":K==="wrong"?"⇄":"✕"}</div>
              <div class="vmsg">${esc(last.msg)}</div>
              ${last.t&&last.t.name?`<div class="vname">${esc(last.t.name)} · ${esc(last.t.tier)}</div>`:""}
              <div class="vcode">${esc(last.code)}</div>
            </div>`
          : `<div class="scanidle"><div class="scanico">▣</div>
              <div>Scan a real ticket QR with the camera</div>
              <div class="scanhint">Tap “Scan with camera” below — works on any phone</div></div>`}
      </div>
      ${last && !camStream?`<div class="verdictbar"><b>${K==="ok"?"ADMIT":"DO NOT ADMIT"}</b> — ${esc(last.detail)}</div>`:""}
      ${last && camStream?`<div class="verdictbar">${esc(last.detail)}</div>`:""}
    </div>

    <div class="ckactions">
      ${camStream
        ? `<button class="btn block lg dark" onclick="stopCam()">Stop camera</button>`
        : `<button class="btn block lg" onclick="startCam()">📷 Scan with camera</button>`}
      ${camErr?`<div class="warnbox" style="margin-top:10px">${esc(camErr)}</div>`:""}
      <button class="btn block quiet" style="margin-top:10px" onclick="simulate()" ${busy?"disabled":""}>Simulate next guest</button>
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
const _render0 = render;
render = function(){ _render0(); attachCam() };
if(!Object.keys(scans).length){ scans = {...SEED}; save("ev_checkins", scans) }
render();
