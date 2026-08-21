/* Organizer + Platform dashboards — a separate product from the consumer app.
   Organizer: Create → Publish → Promote → Sell → Manage → Analyse           */

const el = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } }
function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch(e){} }
function toast(m){
  const t = el("toast"); if(!t) return;
  t.textContent = m; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove("show"), 2600);
}
const cancelled = () => load("ev_cancelled", []);
const isCancelled = id => cancelled().includes(id);

function barChart(id, rows, valueOf, l, r){
  const max = Math.max(...rows.map(valueOf));
  const W=560, H=170, pad=6, bw=(W-pad*2)/rows.length;
  const bars = rows.map((row,i)=>{
    const h = Math.max(4,(valueOf(row)/max)*(H-30));
    const x = pad+i*bw+2, y = H-h-20;
    return `<g class="bar" data-i="${i}">
      <rect x="${x}" y="${y}" width="${bw-4}" height="${h}" rx="5" fill="${i===rows.length-1?"var(--d2)":"var(--d1)"}"/>
      <rect x="${x-1}" y="0" width="${bw-2}" height="${H-20}" fill="transparent"/></g>`;
  }).join("");
  return `<div class="chart" id="${id}">
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart, ${l} to ${r}">
      <line x1="${pad}" y1="${H-20}" x2="${W-pad}" y2="${H-20}" stroke="var(--line-2)" stroke-width="1"/>
      ${bars}
      <text x="${pad+2}" y="${H-5}" font-size="10.5" fill="var(--ink-3)">${l}</text>
      <text x="${W-pad-2}" y="${H-5}" font-size="10.5" fill="var(--ink-3)" text-anchor="end">${r}</text>
    </svg><div class="ttip"></div></div>`;
}
function wireChart(id, rows, fmt){
  const c = el(id); if(!c) return;
  const tip = c.querySelector(".ttip");
  c.querySelectorAll(".bar").forEach(g=>{
    g.addEventListener("mousemove", ev=>{
      tip.textContent = fmt(rows[+g.dataset.i]);
      const b = c.getBoundingClientRect();
      tip.style.left = (ev.clientX-b.left)+"px"; tip.style.top = (ev.clientY-b.top)+"px";
      tip.style.opacity = 1;
    });
    g.addEventListener("mouseleave", ()=>tip.style.opacity=0);
  });
}
function switcher(here){
  const base = here==="consumer" ? "" : "../";
  const links = [["Consumer app","consumer",base],["Organizer","organizer",base+"organizer/"],
                 ["Door check-in","checkin",base+"checkin/"],["Platform owner","platform",base+"platform/"]];
  return `<div class="demobar" style="margin-bottom:40px">
    <div class="dl">Demo — four products, one ecosystem</div>
    <div class="dls">${links.map(([l,k,h])=>k===here?`<span class="demolink here">${l}</span>`:`<a class="demolink" href="${h}">${l}</a>`).join("")}</div>
    <p style="font-size:11.5px;color:var(--ink-3);margin-top:9px;line-height:1.45">Every figure here is simulated for demo purposes.</p>
  </div>`;
}

/* ============ organizer ============ */
const SALES = [
  {d:"Aug 3",v:410},{d:"Aug 4",v:265},{d:"Aug 5",v:190},{d:"Aug 6",v:340},
  {d:"Aug 7",v:520},{d:"Aug 8",v:780},{d:"Aug 9",v:615},{d:"Aug 10",v:445},
  {d:"Aug 11",v:380},{d:"Aug 12",v:565},{d:"Aug 13",v:840},{d:"Aug 14",v:1120},
  {d:"Aug 15",v:1370},{d:"Aug 16",v:925},
];
const RECENT = [
  ["Ananya R.","2 × General Entry","NB-49004","2 min ago","$55.48"],
  ["Harpreet S.","4 × Family Pack","NB-48997","11 min ago","$89.69"],
  ["Zainab K.","1 × Golden Fork","NB-48996","26 min ago","$84.63"],
  ["Marcus O.","2 × Tasting Pass","NB-48995","41 min ago","$83.02"],
  ["Dilnaz T.","3 × General Entry","NB-48994","1 hr ago","$83.22"],
];
const ORG_REFUNDS = [
  ["NB-48912","Sunrise T.","Cancelled by customer","Aug 16","$19.28","done"],
  ["NB-48876","Ramesh V.","Cancelled by customer","Aug 15","$47.77","done"],
  ["NB-48744","Nadia F.","Cancelled by customer","Aug 14","$33.99","pending"],
];
const ORG_POSTS = [
  ["What actually happens at the door: a check-in guide for hosts","Published","Jul 29","3,410 reads"],
  ["Why our food festival moved to two entrances","Draft","—","—"],
  ["How we picked ninety kitchens out of four hundred","Published","Jul 2","5,880 reads"],
];
const DOOR_EVENT = "food-fest";

function organizerView(){
  const off = isCancelled(DOOR_EVENT);
  return `
  <div class="dashtop">
    <h1>Toronto Summer Food Festival
      ${off?`<span class="livechip warn"><span class="pulse"></span>CANCELLED</span>`
           :`<span class="livechip"><span class="pulse"></span>LIVE</span>`}</h1>
    <p class="sub">Organizer dashboard — one host managing their own event. A separate product from the consumer app: <b>Create → Publish → Promote → Sell → Manage → Analyse</b>.</p>
  </div>

  <div class="panel verifypanel">
    <div class="vpleft">
      <div class="vbadge big">✓ Verified &amp; published</div>
      <div class="ps" style="margin:8px 0 0">Reviewed by the platform team on <b>Aug 9</b> · listing, refund terms and venue licence all checked. Only verified events — free or paid — appear to attendees.</div>
    </div>
    <a class="btn ghost" href="../checkin/">Open door scanner</a>
  </div>

  ${off?`<div class="panel dangerpanel">
    <h3>This event is cancelled</h3>
    <div class="ps">1,842 ticket holders were refunded in full — ticket price and all service fees. Your platform fees for this event were waived, and the held remittance was reversed.</div>
    <button class="btn ghost" style="margin-top:12px" onclick="restoreEvent()">Restore event (demo)</button>
  </div>`:""}

  <div class="tiles">
    <div class="tile"><div class="tl">Gross sales</div><div class="tv">$41,400</div><div class="td">↑ 48% this week</div></div>
    <div class="tile"><div class="tl">Tickets sold</div><div class="tv">1,842 <small>/ 3,000</small></div><div class="td">61% of capacity</div></div>
    <div class="tile"><div class="tl">Checked in</div><div class="tv">${Object.values(load("ev_checkins",{})).filter(v=>v.event===DOOR_EVENT).length}</div><div class="td">Live from the door scanner</div></div>
    <div class="tile"><div class="tl">Refund rate</div><div class="tv">1.4%</div><div class="td">Below 3% category avg</div></div>
  </div>

  <div class="prow">
    <div class="panel">
      <h3>Daily sales</h3><div class="ps">Last 14 days · gross · hover a bar for detail</div>
      ${barChart("c1", SALES, s=>s.v, "Aug 3", "Aug 16")}
    </div>
    <div class="panel">
      <h3>Sales by ticket type</h3><div class="ps">1,842 sold</div>
      <div class="bars"><div class="b1"><span>General Entry</span><b>1,204 / 2,000</b></div><div class="track"><div class="fillbar" style="width:60%"></div></div></div>
      <div class="bars"><div class="b1"><span>Entry + Tasting Pass</span><b>488 / 700</b></div><div class="track"><div class="fillbar v" style="width:70%"></div></div></div>
      <div class="bars"><div class="b1"><span>Golden Fork (VIP)</span><b>150 / 300</b></div><div class="track"><div class="fillbar t" style="width:50%"></div></div></div>
      <div class="paycard">
        <div><div class="pv">$37,190</div><div class="pl">Remittance · released Aug 31</div></div>
        <div class="pstripe">Held in <b>Stripe</b> until the event finishes, then paid to your bank</div>
      </div>
    </div>
  </div>

  <div class="prow even">
    <div class="panel">
      <h3>When you get paid</h3><div class="ps">Funds sit in Stripe until the event completes — that's what lets us guarantee refunds</div>
      <div class="timeline">
        <div class="tlrow done"><span class="tldot"></span><div><b>Tickets sold</b><div class="tlm">Money captured into Stripe as each order is placed</div></div></div>
        <div class="tlrow done"><span class="tldot"></span><div><b>Held until the event</b><div class="tlm">$37,190 currently held · refundable at any point</div></div></div>
        <div class="tlrow now"><span class="tldot"></span><div><b>Event runs — Aug 30</b><div class="tlm">Door scanner closes out the guest list</div></div></div>
        <div class="tlrow"><span class="tldot"></span><div><b>Remittance released — Aug 31</b><div class="tlm">Transferred to your bank, minus the platform fee</div></div></div>
        <div class="tlrow"><span class="tldot"></span><div><b>In your account — Sep 2–4</b><div class="tlm">Standard Stripe payout timing</div></div></div>
      </div>
    </div>
    <div class="panel">
      <h3>Refunds on this event</h3><div class="ps">Customers cancel themselves — refunds go back through Stripe automatically, no action from you</div>
      <div class="tablewrap"><table>
        <thead><tr><th>Order</th><th>Guest</th><th>Reason</th><th class="num">Amount</th><th>Status</th></tr></thead>
        <tbody>${ORG_REFUNDS.map(r=>`<tr><td class="nm">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td>
          <td class="num">${r[4]}</td><td><span class="statpill ${r[5]==="done"?"live":"soon"}">${r[5]==="done"?"Refunded":"Processing"}</span></td></tr>`).join("")}</tbody>
      </table></div>
      <div class="ps" style="margin-top:12px">Your policy: <b>refunds up to 7 days before</b>. Ticket price is returned; the service fee is retained. Change this per event when you publish.</div>
    </div>
  </div>

  <div class="panel">
    <h3>Recent orders</h3><div class="ps">Live feed — resend a ticket or refund an order in one click</div>
    <div class="tablewrap"><table>
      <thead><tr><th>Buyer</th><th>Tickets</th><th>Order</th><th>When</th><th class="num">Total</th></tr></thead>
      <tbody>${RECENT.map(r=>`<tr><td class="nm">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td class="num">${r[4]}</td></tr>`).join("")}</tbody>
    </table></div>
  </div>

  <div class="panel">
    <h3>Your stories</h3><div class="ps">Posts you publish appear in the app's Stories feed and on your event pages</div>
    <div class="tablewrap"><table>
      <thead><tr><th>Post</th><th>Status</th><th>Published</th><th class="num">Reads</th></tr></thead>
      <tbody>${ORG_POSTS.map(p=>`<tr><td class="nm">${esc(p[0])}</td>
        <td><span class="statpill ${p[1]==="Published"?"live":"done"}">${p[1]}</span></td>
        <td>${p[2]}</td><td class="num">${p[3]}</td></tr>`).join("")}</tbody>
    </table></div>
    <button class="btn ghost" style="margin-top:14px" onclick="toast('The post editor is the next thing to build here.')">Write a new post</button>
  </div>

  ${!off?`<div class="panel dangerpanel">
    <h3>Cancel this event</h3>
    <div class="ps">Refunds every ticket holder in full — ticket price <b>and</b> service fees — and reverses your held remittance. This is what your attendees see in the consumer app, so try it and then open the app in another tab.</div>
    <button class="btn danger" style="margin-top:12px" onclick="confirmCancel()">Cancel event &amp; refund everyone</button>
  </div>`:""}

  ${switcher("organizer")}`;
}

function confirmCancel(){
  let ov = el("sheet");
  if(!ov){ ov = document.createElement("div"); ov.id="sheet"; ov.className="scrim-full";
    ov.addEventListener("click", e=>{ if(e.target===ov) closeSheet() }); document.body.appendChild(ov) }
  document.body.style.overflow="hidden";
  ov.innerHTML = `
  <div class="sheet" role="dialog" aria-modal="true" aria-label="Cancel event">
    <div class="shead"><div class="grabber"></div>
      <div class="sheadrow"><div style="flex:1">
        <div class="st">Cancel Toronto Summer Food Festival?</div>
        <div class="sd">This cannot be undone outside of this demo</div></div>
        <button class="iconbtn" style="width:32px;height:32px" onclick="closeSheet()" aria-label="Close">✕</button></div>
    </div>
    <div class="sbody">
      <div class="warnbox big"><b>1,842 ticket holders will be refunded in full.</b><br>
      Ticket price and every service fee goes back to the original card through Stripe.</div>
      <div class="sumline" style="margin-top:16px"><span class="sl">Refunded to attendees</span><span>$41,400</span></div>
      <div class="sumline"><span class="sl">Service fees returned to attendees</span><span>$4,000</span></div>
      <div class="sumline"><span class="sl">Platform fee charged to you</span><span class="off">$0.00 — waived</span></div>
      <div class="sumline tot"><span>Your held remittance</span><span>$0.00</span></div>
      <div class="guestnote" style="margin-top:14px"><span>↩︎</span><div>
        Because the money was still <b>held in Stripe</b> and not yet paid out, every refund clears without you owing anything back.</div></div>
    </div>
    <div class="sfoot">
      <button class="btn block lg danger" id="cxbtn" onclick="doCancel()">Yes, cancel and refund 1,842 tickets</button>
      <button class="btn block ghost" style="margin-top:9px" onclick="closeSheet()">Keep the event running</button>
    </div>
  </div>`;
}
function doCancel(){
  const b = el("cxbtn"); b.disabled = true;
  b.innerHTML = `<span class="spin"></span> Issuing 1,842 refunds…`;
  setTimeout(()=>{
    const list = cancelled(); if(!list.includes(DOOR_EVENT)) list.push(DOOR_EVENT);
    save("ev_cancelled", list);
    closeSheet(); mount();
    toast("Event cancelled — all ticket holders refunded in full");
  }, 2000);
}
function restoreEvent(){
  save("ev_cancelled", cancelled().filter(x=>x!==DOOR_EVENT));
  mount(); toast("Event restored");
}
function closeSheet(){ el("sheet")?.remove(); document.body.style.overflow="" }

/* ============ platform owner ============ */
function platformView(){
  const P = PLATFORM, pc = n => n/P.collected*100;
  const split = [
    {k:"Organizer payouts", v:P.gmv, c:"var(--d3)", note:"Ticket face value — remitted after each event completes"},
    {k:"Your platform revenue", v:P.net, c:"var(--d1)", note:"Service fees you charged, after Stripe's cut"},
    {k:"Stripe processing", v:P.stripeCost, c:"var(--d2)", note:"2.9% + $0.30 per order, paid to Stripe"},
  ];
  const take = (P.serviceFees/P.gmv*100).toFixed(1);
  const margin = (P.net/P.serviceFees*100).toFixed(0);
  const face=25, svc=face*FEE_PCT+FEE_FLAT, buyer=face+svc, strp=buyer*STRIPE_PCT+STRIPE_FLAT, keep=svc-strp;
  const S = P.sourcing;
  return `
  <div class="dashtop">
    <h1>Platform overview <span class="livechip"><span class="pulse"></span>LIVE</span>
      <button class="btn quiet ownerout" onclick="ownerLogout()">Log out</button></h1>
    <p class="sub">Everything across your platform — every organizer, every event, and your cut. Last 6 months (Mar–Aug 2026).</p>
  </div>
  <div class="tiles">
    <div class="tile"><div class="tl">Gross ticket sales</div><div class="tv">${$$(P.gmv)}</div><div class="td">↑ 27% vs last month</div></div>
    <div class="tile spot"><div class="tl">Your revenue</div><div class="tv">${$$(P.net)}</div><div class="td">${margin}% margin after Stripe</div></div>
    <div class="tile"><div class="tl">Take rate</div><div class="tv">${take}%</div><div class="td">Of every ticket sold</div></div>
    <div class="tile"><div class="tl">Events / organizers</div><div class="tv">${P.events} <small>/ ${P.organizers}</small></div><div class="td">${P.live} events live now</div></div>
  </div>

  <div id="monitor">${monitorPanel()}</div>

  <div class="panel">
    <div class="qhead">
      <div><h3>Verification queue</h3>
        <div class="ps">Nothing publishes — free or paid — until a person approves it. ${P.verifyStats.approved} approved this week · median review ${P.verifyStats.medianMins} min</div>
      </div>
      <div class="qcount"><b>${P.review.length}</b> waiting</div>
    </div>
    <div class="qlist">
      ${P.review.map((r,i)=>`
        <div class="qrow" id="q${i}">
          <div class="qmain">
            <div class="qt">${esc(r.title)}</div>
            <div class="qm">${esc(r.org)} · ${esc(r.city)} · ${r.kind} · submitted ${r.submitted}</div>
            <div class="qflag ${r.risk}">${r.risk==="hold"?"⚑":r.risk==="dupe"?"⧉":"✓"} ${esc(r.flag)}</div>
          </div>
          <div class="qacts">
            <button class="btn quiet" onclick="decide(${i},'hold')">Hold</button>
            <button class="btn" onclick="decide(${i},'approve')">Approve</button>
          </div>
        </div>`).join("")}
    </div>
  </div>

  <div class="prow">
    <div class="panel">
      <h3>Monthly ticket sales</h3><div class="ps">Across every organizer · hover for your revenue that month</div>
      ${barChart("c2", P.months, m=>m.gmv, "Mar 2026", "Aug 2026")}
    </div>
    <div class="panel">
      <h3>Where every dollar goes</h3><div class="ps">${$$(P.collected)} collected from buyers, split three ways</div>
      <div class="splitbar" role="img" aria-label="Organizer payouts ${pc(P.gmv).toFixed(1)}%, your revenue ${pc(P.net).toFixed(1)}%, Stripe ${pc(P.stripeCost).toFixed(1)}%">
        ${split.map(s=>`<div class="seg" style="width:${pc(s.v)}%;background:${s.c}">${pc(s.v)>12?pc(s.v).toFixed(0)+"%":""}</div>`).join("")}
      </div>
      ${split.map(s=>`<div class="legrow"><span class="sw" style="background:${s.c}"></span>
        <span class="ln">${s.k}<div class="lsub">${s.note}</div></span>
        <b>${$$(s.v)}</b><span class="lsub" style="width:42px;text-align:right">${pc(s.v).toFixed(1)}%</span></div>`).join("")}
      <div class="unitbox">
        <div class="uh">Your economics on one $25 ticket</div>
        <div class="uline h"><span class="ul">Buyer pays</span><span>${$(buyer)}</span></div>
        <div class="uline"><span class="ul">→ Organizer receives</span><span>${$(face)}</span></div>
        <div class="uline"><span class="ul">→ Stripe takes</span><span>${$(strp)}</span></div>
        <div class="uline k"><span class="ul">→ You keep</span><span>${$(keep)}</span></div>
      </div>
    </div>
  </div>

  <div class="panel">
    <div class="qhead"><div><h3>Free event sourcing across Canada</h3>
      <div class="ps">Free events are pulled automatically from tourism and municipal feeds, then held for the same human review as everything else</div></div>
    </div>
    <div class="tiles" style="padding:0; margin-bottom:16px">
      <div class="tile"><div class="tl">Found this week</div><div class="tv">${S.importedWeek}</div><div class="td">${S.cities} cities</div></div>
      <div class="tile"><div class="tl">Published</div><div class="tv">${S.published}</div><div class="td">After review</div></div>
      <div class="tile"><div class="tl">Held back</div><div class="tv">${S.held}</div><div class="td">Duplicates, bad dates, not free</div></div>
      <div class="tile"><div class="tl">Feeds connected</div><div class="tv">${S.feeds.length}</div><div class="td">${S.feeds.filter(f=>f.status==="ok").length} healthy</div></div>
    </div>
    <div class="tablewrap"><table>
      <thead><tr><th>Feed</th><th>City</th><th class="num">Found</th><th class="num">Published</th><th>Status</th></tr></thead>
      <tbody>${S.feeds.map(f=>`<tr><td class="nm">${esc(f.name)}</td><td>${esc(f.city)}</td>
        <td class="num">${f.found}</td><td class="num">${f.live}</td>
        <td><span class="statpill ${f.status==="ok"?"live":f.status==="slow"?"soon":"warn"}">${f.status==="ok"?"Healthy":f.status==="slow"?"Lagging":"Down"}</span></td></tr>`).join("")}</tbody>
    </table></div>
  </div>

  <div class="prow even">
    <div class="panel">
      <h3>Remittance to organizers</h3><div class="ps">Money is held in Stripe until each event completes — that is what makes refunds guaranteeable</div>
      <div class="tiles" style="padding:0;grid-template-columns:1fr 1fr;margin-bottom:14px">
        <div class="tile"><div class="tl">Held right now</div><div class="tv">${$$(P.remittance.held)}</div><div class="td">Across ${P.live} live events</div></div>
        <div class="tile"><div class="tl">Released this month</div><div class="tv">${$$(P.remittance.releasedMonth)}</div><div class="td">Paid out after completion</div></div>
      </div>
      <div class="tablewrap"><table>
        <thead><tr><th>Organizer</th><th>Event ends</th><th class="num">Amount</th><th>State</th></tr></thead>
        <tbody>${P.remittance.rows.map(r=>`<tr><td class="nm">${esc(r[0])}<div class="lsub">${esc(r[1])}</div></td>
          <td>${r[2]}</td><td class="num">${r[3]}</td>
          <td><span class="statpill ${r[4]==="paid"?"done":r[4]==="releasing"?"soon":"live"}">${r[4]==="paid"?"Paid":r[4]==="releasing"?"Releasing":"Held"}</span></td></tr>`).join("")}</tbody>
      </table></div>
    </div>
    <div class="panel">
      <h3>Refunds &amp; cancellations</h3><div class="ps">Every refund goes back through Stripe to the original card — no manual transfers</div>
      <div class="tiles" style="padding:0;grid-template-columns:1fr 1fr 1fr;margin-bottom:14px">
        <div class="tile"><div class="tl">Refunds</div><div class="tv">${P.refunds.count}</div><div class="td">${P.refunds.rate}% of orders</div></div>
        <div class="tile"><div class="tl">Value</div><div class="tv">${$$(P.refunds.amount)}</div><div class="td">Last 6 months</div></div>
        <div class="tile"><div class="tl">Disputes</div><div class="tv">2</div><div class="td">Both won</div></div>
      </div>
      <div class="tablewrap"><table>
        <thead><tr><th>Order</th><th>Reason</th><th>Date</th><th class="num">Amount</th><th>Status</th></tr></thead>
        <tbody>${P.refunds.recent.map(r=>`<tr><td class="nm">${esc(r[0])}<div class="lsub">${esc(r[1])}</div></td>
          <td>${esc(r[2])}</td><td>${r[3]}</td><td class="num">${r[4]}</td>
          <td><span class="statpill ${r[5]==="done"?"live":"soon"}">${r[5]==="done"?"Refunded":"Processing"}</span></td></tr>`).join("")}</tbody>
      </table></div>
      <div class="ps" style="margin-top:12px"><b>Policy:</b> customer cancels → ticket price back, service fee retained. Event cancelled by host → <b>everything</b> back including fees, and the host's platform fee is waived.</div>
    </div>
  </div>

  <div class="panel">
    <h3>Events on your platform</h3><div class="ps">The 8 largest of ${P.events} · every listing passes review before it goes live</div>
    <div class="tablewrap"><table>
      <thead><tr><th>Event</th><th>Organizer</th><th>Date</th><th class="num">Sold</th><th class="num">Gross</th><th class="num">Your fee</th><th>Status</th></tr></thead>
      <tbody>${P.allEvents.map(r=>`<tr><td class="nm">${esc(r[0])}</td><td>${esc(r[1])}</td><td>${r[2]}</td>
        <td class="num">${r[3]}</td><td class="num">${$$(r[4])}</td><td class="num"><b>${$$(r[5])}</b></td>
        <td><span class="statpill ${r[6]}">${({live:"Live",done:"Completed",soon:"Almost full",warn:"Slow sales"})[r[6]]}</span></td></tr>`).join("")}</tbody>
    </table></div>
  </div>
  ${switcher("platform")}`;
}
function decide(i, action){
  const row = el("q"+i); if(!row) return;
  row.classList.add("resolved");
  row.querySelector(".qacts").innerHTML = action==="approve"
    ? `<span class="statpill live">Approved &amp; published</span>`
    : `<span class="statpill soon">Held — organizer notified</span>`;
  toast(action==="approve" ? "Event approved — now visible to attendees" : "Held for more information");
}

/* ============ live buyer monitor (platform owner) ============
   Who bought what, across every organizer, as it happens.
   Real orders placed in the consumer app on this device appear at the top. */
const MON = {live:true, q:"", filter:"all", feed:null, fresh:new Set(), tick:null, qi:0, seq:0};

function seedFeed(){
  MON.feed = PLATFORM.buyers.map(b=>({...b, source:"demo"}));
}
/* orders actually bought in the consumer app on this device */
function deviceOrders(){
  const cxl = cancelled();
  return load("ev_orders", []).map((o,i)=>{
    const ev = EVENTS.find(e=>e.id===o.eventId) || {};
    const qty = o.items.reduce((s,it)=>s+it.qty,0);
    const checked = load("ev_checkins",{});
    const anyScanned = Object.keys(checked).some(c=>c.startsWith(o.num+"-"));
    return {
      num:o.num, name:o.name || "Guest", email:o.email || "—", phone:"—",
      eventId:o.eventId, org:(ev.org&&ev.org.name)||"—", city:ev.city||"—",
      qty, tier:o.items.map(it=>it.name).join(", "),
      face:o.face ?? 0, fees:o.fees ?? 0,
      method:o.last4 ? `${o.brand} •••• ${o.last4}` : "Free — no payment",
      mins:i, source:"device",
      status: o.status==="refunded" ? "refunded"
            : cxl.includes(o.eventId) ? "refunded"
            : anyScanned ? "checkedin" : "paid",
    };
  });
}
function feedRows(){
  if(!MON.feed) seedFeed();
  const rows = [...deviceOrders(), ...MON.feed];
  const q = MON.q.trim().toLowerCase();
  return rows.filter(r=>{
    if(MON.filter!=="all" && r.status!==MON.filter) return false;
    if(!q) return true;
    const ev = EVENTS.find(e=>e.id===r.eventId);
    return (r.name+" "+r.email+" "+r.num+" "+r.org+" "+r.city+" "+(ev?ev.title:"")).toLowerCase().includes(q);
  });
}
const ago = m => m<1 ? "just now" : m<60 ? m+" min ago" : Math.floor(m/60)+" hr ago";
const total = r => r.face + r.fees;

function monitorPanel(){
  const rows = feedRows();
  const all = (MON.feed||[]).concat(deviceOrders());
  const paid = all.filter(r=>r.status!=="refunded");
  const revenue = paid.reduce((s,r)=>s+total(r),0);
  const tickets = paid.reduce((s,r)=>s+r.qty,0);
  const avg = paid.length ? revenue/paid.length : 0;
  const FILTERS = [["all","All"],["paid","Paid"],["checkedin","Checked in"],["refunded","Refunded"]];
  return `
  <div class="panel monitor">
    <div class="qhead">
      <div>
        <h3>Ticket sales monitor ${MON.live?`<span class="livedot"><span class="pulse"></span>LIVE</span>`:`<span class="statpill done">Paused</span>`}</h3>
        <div class="ps">Every ticket bought across your platform, as it happens — who bought it, what they paid, and whether they've walked through the door.</div>
      </div>
      <button class="btn quiet" onclick="toggleLive()">${MON.live?"Pause feed":"Resume feed"}</button>
    </div>

    <div class="monstats">
      <div class="mstat"><div class="msv">${all.length}</div><div class="msl">Orders</div></div>
      <div class="mstat"><div class="msv">${tickets}</div><div class="msl">Tickets</div></div>
      <div class="mstat"><div class="msv">${$$(revenue)}</div><div class="msl">Collected</div></div>
      <div class="mstat"><div class="msv">${$(avg)}</div><div class="msl">Avg order</div></div>
    </div>

    <div class="monbar">
      <input class="monsearch" id="monq" value="${esc(MON.q)}" placeholder="Search buyer, email, order or event…"
        aria-label="Search buyers" oninput="MON.q=this.value; paintMonitor(true)">
      <div class="monfilters">
        ${FILTERS.map(([k,l])=>`<button class="fpill${MON.filter===k?" on":""}" onclick="MON.filter='${k}'; paintMonitor()">${l}</button>`).join("")}
      </div>
    </div>

    <div class="tablewrap">
      <table class="montable">
        <thead><tr><th>Buyer</th><th>Event</th><th>Organizer</th><th class="num">Tickets</th><th class="num">Paid</th><th>Method</th><th>Status</th><th class="num">When</th></tr></thead>
        <tbody>
          ${rows.length ? rows.map(r=>{
            const ev = EVENTS.find(e=>e.id===r.eventId) || {title:"—"};
            const st = r.status==="checkedin" ? `<span class="statpill live">Checked in</span>`
                     : r.status==="refunded"  ? `<span class="statpill warn">Refunded</span>`
                     : `<span class="statpill soon">Paid</span>`;
            return `<tr class="monrow${MON.fresh.has(r.num)?" fresh":""}" onclick="openBuyer('${r.num}')" tabindex="0"
              onkeydown="if(event.key==='Enter')openBuyer('${r.num}')">
              <td class="nm">${esc(r.name)}${r.source==="device"?`<span class="devtag">this device</span>`:""}
                <div class="lsub">${esc(r.email)}</div></td>
              <td class="nm" style="min-width:170px">${esc(ev.title)}<div class="lsub">${esc(r.city)}</div></td>
              <td>${esc(r.org)}</td>
              <td class="num">${r.qty}</td>
              <td class="num">${total(r)===0?"Free":$(total(r))}</td>
              <td>${esc(r.method)}</td>
              <td>${st}</td>
              <td class="num">${ago(r.mins)}</td>
            </tr>`;
          }).join("")
          : `<tr><td colspan="8" style="color:var(--ink-3);padding:22px 9px">No orders match that search.</td></tr>`}
        </tbody>
      </table>
    </div>
    <div class="ps" style="margin-top:12px">Showing ${rows.length} of ${all.length} orders · click any row for the full order.
      <b>Buyer contact details are personal information</b> — under PIPEDA the real build should log every access here and restrict it to staff who need it.</div>
  </div>`;
}

function paintMonitor(keepFocus){
  const host = el("monitor"); if(!host) return;
  const sel = keepFocus ? document.activeElement === el("monq") : false;
  const pos = sel ? el("monq").selectionStart : null;
  host.innerHTML = monitorPanel();
  if(sel){ const i = el("monq"); i.focus(); if(pos!==null) i.setSelectionRange(pos,pos) }
}
function toggleLive(){
  MON.live = !MON.live;
  if(MON.live) startMonitor(); else clearInterval(MON.tick);
  paintMonitor();
}
function startMonitor(){
  if(!MON.feed) seedFeed();
  clearInterval(MON.tick);
  MON.tick = setInterval(()=>{
    const src = PLATFORM.incoming[MON.qi % PLATFORM.incoming.length]; MON.qi++;
    MON.seq++;
    const order = {...src, num:"NB-"+(49100+MON.seq*7), mins:0, status:"paid", source:"demo"};
    MON.feed.forEach(r=>r.mins += 1);
    MON.feed.unshift(order);
    MON.fresh.add(order.num);
    setTimeout(()=>{ MON.fresh.delete(order.num) }, 4000);
    paintMonitor(true);
  }, 6000);
}

function openBuyer(num){
  const r = feedRows().find(x=>x.num===num) || deviceOrders().find(x=>x.num===num); if(!r) return;
  const ev = EVENTS.find(e=>e.id===r.eventId) || {};
  const checked = load("ev_checkins",{});
  const codes = Array.from({length:r.qty},(_,i)=>{
    const code = `${r.num}-${String(i+1).padStart(2,"0")}`;
    const used = checked[code] ? checked[code].at : (r.status==="checkedin" ? "at the door" : null);
    return {code, used};
  });
  let ov = el("sheet");
  if(!ov){ ov = document.createElement("div"); ov.id="sheet"; ov.className="scrim-full";
    ov.addEventListener("click", e=>{ if(e.target===ov) closeSheet() }); document.body.appendChild(ov) }
  document.body.style.overflow="hidden";
  ov.innerHTML = `
  <div class="sheet" role="dialog" aria-modal="true" aria-label="Order detail">
    <div class="shead"><div class="grabber"></div>
      <div class="sheadrow"><div style="flex:1;min-width:0">
        <div class="st">${esc(r.name)}</div>
        <div class="sd">Order ${esc(r.num)} · ${ago(r.mins)}</div></div>
        <button class="iconbtn" style="width:32px;height:32px" onclick="closeSheet()" aria-label="Close">✕</button>
      </div>
    </div>
    <div class="sbody">
      <div class="bsec">
        <div class="bsl">Buyer</div>
        <div class="brow"><span>Name</span><b>${esc(r.name)}</b></div>
        <div class="brow"><span>Email</span><b>${esc(r.email)}</b></div>
        <div class="brow"><span>Phone</span><b>${esc(r.phone)}</b></div>
        <div class="brow"><span>Account</span><b>Guest checkout</b></div>
      </div>
      <div class="bsec">
        <div class="bsl">What they bought</div>
        <div class="brow"><span>Event</span><b>${esc(ev.title||"—")}</b></div>
        <div class="brow"><span>Organizer</span><b>${esc(r.org)}</b></div>
        <div class="brow"><span>When &amp; where</span><b>${esc(ev.date||"—")} · ${esc(ev.city||r.city)}</b></div>
        <div class="brow"><span>Tickets</span><b>${r.qty} × ${esc(r.tier)}</b></div>
      </div>
      <div class="bsec">
        <div class="bsl">Payment</div>
        <div class="brow"><span>Ticket price</span><b>${r.face===0?"Free":$(r.face)}</b></div>
        <div class="brow"><span>Service fees</span><b>${r.fees===0?"—":$(r.fees)}</b></div>
        <div class="brow tot"><span>Total charged</span><b>${total(r)===0?"Free":$(total(r))}</b></div>
        <div class="brow"><span>Method</span><b>${esc(r.method)}</b></div>
        <div class="brow"><span>Status</span><b>${r.status==="refunded"?"Refunded":r.status==="checkedin"?"Paid · checked in":"Paid"}</b></div>
      </div>
      <div class="bsec">
        <div class="bsl">Tickets issued</div>
        ${codes.map(c=>`<div class="brow"><span class="mono">${esc(c.code)}</span>
          ${c.used?`<span class="statpill live">Scanned ${esc(c.used)}</span>`:`<span class="statpill done">Not scanned</span>`}</div>`).join("")}
      </div>
      <div class="testnote">Actions here are simulated. In the real build these call Stripe and your mail provider directly.</div>
    </div>
    <div class="sfoot">
      <div class="bactions">
        <button class="btn quiet" onclick="toast('Tickets re-sent to ${esc(r.email)}')">Resend tickets</button>
        <button class="btn quiet" onclick="toast('Opens your mail client in the real build')">Contact buyer</button>
        ${r.status!=="refunded"?`<button class="btn danger" onclick="toast('Refund of ${total(r)===0?"$0.00":$(total(r))} would be issued through Stripe')">Refund order</button>`:""}
      </div>
    </div>
  </div>`;
}

/* ============ platform owner access (demo auth) ============
   The owner chooses a username + password on first visit; after that the
   portal requires login. Client-side only — demo-grade. The real build
   uses proper server-side auth with sessions and 2FA.                  */
async function pwHash(salt, pw){
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + "|" + pw));
  return [...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
function ownerGate(){
  if(sessionStorage.getItem("ev_owner_session") === "1"){ mount(); return }
  const creds = load("ev_owner", null);
  el("app").innerHTML = ownerAuthView(creds);
  setTimeout(()=>{ el("au")?.focus() }, 50);
}
function ownerAuthView(creds){
  return `
  <div class="authwrap">
    <div class="authcard">
      <div class="brandmark" style="margin:0 auto 18px; justify-content:center"><span class="ring"></span>Nearby</div>
      ${creds ? `
        <h1>Owner sign in</h1>
        <p class="authsub">This portal is restricted to the platform owner.</p>
        <div class="field"><label for="au">Username</label><input id="au" autocomplete="username" autocapitalize="none"></div>
        <div class="field"><label for="ap">Password</label><input id="ap" type="password" autocomplete="current-password" onkeydown="if(event.key==='Enter')ownerLogin()"></div>
        <div id="autherr" class="autherr"></div>
        <button class="btn block lg" id="authbtn" onclick="ownerLogin()">Sign in</button>
        <button class="authreset" onclick="ownerReset()">Forgot it? Reset owner access (demo)</button>`
      : `
        <h1>Set up owner access</h1>
        <p class="authsub">Choose the username and password you'll use to open the platform dashboard. This is the demo of your locked owner portal.</p>
        <div class="field"><label for="au">Choose a username</label><input id="au" autocomplete="username" autocapitalize="none" placeholder="e.g. owner"></div>
        <div class="field"><label for="ap">Choose a password</label><input id="ap" type="password" autocomplete="new-password" placeholder="6+ characters"></div>
        <div class="field"><label for="ap2">Confirm password</label><input id="ap2" type="password" autocomplete="new-password" onkeydown="if(event.key==='Enter')ownerCreate()"></div>
        <div id="autherr" class="autherr"></div>
        <button class="btn block lg" id="authbtn" onclick="ownerCreate()">Create &amp; open dashboard</button>`}
      <div class="authnote">Demo authentication — stored only in this browser. The real build uses server-side accounts.</div>
    </div>
  </div>`;
}
function authFail(msg){
  const e = el("autherr"); e.textContent = msg;
  ["au","ap","ap2"].forEach(id=>el(id)?.classList.add("bad"));
  setTimeout(()=>["au","ap","ap2"].forEach(id=>el(id)?.classList.remove("bad")), 1200);
}
async function ownerCreate(){
  const u = el("au").value.trim(), p = el("ap").value, p2 = el("ap2").value;
  if(u.length < 3) return authFail("Username needs at least 3 characters.");
  if(p.length < 6) return authFail("Password needs at least 6 characters.");
  if(p !== p2)     return authFail("Passwords don't match.");
  const salt = [...crypto.getRandomValues(new Uint8Array(8))].map(b=>b.toString(16).padStart(2,"0")).join("");
  save("ev_owner", {u, salt, hash: await pwHash(salt, p)});
  sessionStorage.setItem("ev_owner_session","1");
  mount(); toast("Owner access created — you're in");
}
async function ownerLogin(){
  const creds = load("ev_owner", null);
  if(!creds){ ownerGate(); return }
  const u = el("au").value.trim(), p = el("ap").value;
  const btn = el("authbtn"); btn.disabled = true; btn.textContent = "Checking…";
  const ok = u === creds.u && (await pwHash(creds.salt, p)) === creds.hash;
  if(!ok){ btn.disabled = false; btn.textContent = "Sign in"; return authFail("Wrong username or password.") }
  sessionStorage.setItem("ev_owner_session","1");
  mount(); toast("Welcome back");
}
function ownerLogout(){
  sessionStorage.removeItem("ev_owner_session");
  ownerGate(); toast("Signed out");
}
function ownerReset(){
  localStorage.removeItem("ev_owner");
  sessionStorage.removeItem("ev_owner_session");
  ownerGate(); toast("Owner access reset — choose new credentials");
}
