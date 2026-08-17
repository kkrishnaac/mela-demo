/* Organizer + Platform dashboards.
   Deliberately a separate product from the consumer app:
   Organizer = Create → Publish → Promote → Sell → Manage → Analyse       */

const el = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

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
      tip.style.left = (ev.clientX-b.left)+"px";
      tip.style.top = (ev.clientY-b.top)+"px";
      tip.style.opacity = 1;
    });
    g.addEventListener("mouseleave", ()=>tip.style.opacity=0);
  });
}
function switcher(here){
  const links = [["Consumer app", here==="consumer" ? "" : "../"],
                 ["Organizer dashboard", here==="organizer" ? "" : (here==="consumer"?"organizer/":"../organizer/")],
                 ["Platform owner", here==="platform" ? "" : (here==="consumer"?"platform/":"../platform/")]];
  return `<div class="demobar" style="margin-bottom:40px">
    <div class="dl">Demo — three products, one ecosystem</div>
    <div class="dls">${links.map(([l,h])=>h?`<a class="demolink" href="${h}">${l}</a>`:`<span class="demolink here">${l}</span>`).join("")}</div>
    <p style="font-size:11.5px;color:var(--ink-3);margin-top:9px;line-height:1.45">Every figure here is simulated for demo purposes.</p>
  </div>`;
}

/* ---------- organizer ---------- */
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

function organizerView(){
  return `
  <div class="dashtop">
    <h1>Toronto Summer Food Festival <span class="livechip"><span class="pulse"></span>LIVE</span></h1>
    <p class="sub">Organizer dashboard — one event host managing their own event. Separate product from the consumer app: <b>Create → Publish → Promote → Sell → Manage → Analyse</b>.</p>
  </div>
  <div class="tiles">
    <div class="tile"><div class="tl">Gross sales</div><div class="tv">$41,400</div><div class="td">↑ 48% this week</div></div>
    <div class="tile"><div class="tl">Tickets sold</div><div class="tv">1,842 <small>/ 3,000</small></div><div class="td">61% of capacity</div></div>
    <div class="tile"><div class="tl">Page views</div><div class="tv">28,410</div><div class="td">↑ 6,204 since Friday</div></div>
    <div class="tile"><div class="tl">Conversion</div><div class="tv">6.5%</div><div class="td">Above 4.1% category avg</div></div>
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
        <div><div class="pv">$37,190</div><div class="pl">Next payout · Tue Aug 18</div></div>
        <div class="pstripe">via <b>Stripe Connect</b> — straight to your bank, minus the platform fee</div>
      </div>
    </div>
  </div>
  <div class="panel">
    <h3>Recent orders</h3><div class="ps">Live feed — refund or resend a ticket in one click in the real build</div>
    <div class="tablewrap"><table>
      <thead><tr><th>Buyer</th><th>Tickets</th><th>Order</th><th>When</th><th class="num">Total</th></tr></thead>
      <tbody>${RECENT.map(r=>`<tr><td class="nm">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td class="num">${r[4]}</td></tr>`).join("")}</tbody>
    </table></div>
  </div>
  ${switcher("organizer")}`;
}

/* ---------- platform owner ---------- */
function platformView(){
  const P = PLATFORM, pc = n => n/P.collected*100;
  const split = [
    {k:"Organizer payouts", v:P.gmv, c:"var(--d3)", note:"Ticket face value — paid out via Stripe Connect"},
    {k:"Your platform revenue", v:P.net, c:"var(--d1)", note:"Service fees you charged, after Stripe's cut"},
    {k:"Stripe processing", v:P.stripeCost, c:"var(--d2)", note:"2.9% + $0.30 per order, paid to Stripe"},
  ];
  const take = (P.serviceFees/P.gmv*100).toFixed(1);
  const margin = (P.net/P.serviceFees*100).toFixed(0);
  const face=25, svc=face*FEE_PCT+FEE_FLAT, buyer=face+svc, strp=buyer*STRIPE_PCT+STRIPE_FLAT, keep=svc-strp;
  return `
  <div class="dashtop">
    <h1>Platform overview <span class="livechip"><span class="pulse"></span>LIVE</span></h1>
    <p class="sub">Everything happening across your platform — every organizer, every event, and your cut. Last 6 months (Mar–Aug 2026).</p>
  </div>
  <div class="tiles">
    <div class="tile"><div class="tl">Gross ticket sales</div><div class="tv">${$$(P.gmv)}</div><div class="td">↑ 27% vs last month</div></div>
    <div class="tile spot"><div class="tl">Your revenue</div><div class="tv">${$$(P.net)}</div><div class="td">${margin}% margin after Stripe</div></div>
    <div class="tile"><div class="tl">Take rate</div><div class="tv">${take}%</div><div class="td">Of every ticket sold</div></div>
    <div class="tile"><div class="tl">Events / organizers</div><div class="tv">${P.events} <small>/ ${P.organizers}</small></div><div class="td">${P.live} events live now</div></div>
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
      ${split.map(s=>`<div class="legrow">
        <span class="sw" style="background:${s.c}"></span>
        <span class="ln">${s.k}<div class="lsub">${s.note}</div></span>
        <b>${$$(s.v)}</b><span class="lsub" style="width:42px;text-align:right">${pc(s.v).toFixed(1)}%</span>
      </div>`).join("")}
      <div class="unitbox">
        <div class="uh">Your economics on one $25 ticket</div>
        <div class="uline h"><span class="ul">Buyer pays</span><span>${$(buyer)}</span></div>
        <div class="uline"><span class="ul">→ Organizer receives</span><span>${$(face)}</span></div>
        <div class="uline"><span class="ul">→ Stripe takes</span><span>${$(strp)}</span></div>
        <div class="uline k"><span class="ul">→ You keep</span><span>${$(keep)}</span></div>
      </div>
    </div>
  </div>
  <div class="prow even">
    <div class="panel">
      <h3>Top organizers</h3><div class="ps">By ticket sales · ${P.organizers} organizers on the platform</div>
      <div class="tablewrap"><table>
        <thead><tr><th>Organizer</th><th class="num">Events</th><th class="num">Sales</th><th class="num">Your fee</th></tr></thead>
        <tbody>
        ${P.topOrgs.map(o=>`<tr><td class="nm">${esc(o.name)}</td><td class="num">${o.events}</td><td class="num">${$$(o.gmv)}</td><td class="num"><b>${$$(o.fee)}</b></td></tr>`).join("")}
        <tr style="color:var(--ink-3)"><td class="nm">+ ${P.otherOrgs.count} others</td><td class="num">${P.otherOrgs.events}</td><td class="num">${$$(P.otherOrgs.gmv)}</td><td class="num">${$$(P.otherOrgs.fee)}</td></tr>
        </tbody>
      </table></div>
    </div>
    <div class="panel">
      <h3>Payouts going out</h3><div class="ps">Released after each event, via Stripe Connect</div>
      <div class="tablewrap"><table>
        <thead><tr><th>Organizer</th><th>Scheduled</th><th class="num">Amount</th></tr></thead>
        <tbody>${P.payouts.map(p=>`<tr><td class="nm">${esc(p[0])}</td><td>${p[1]}</td><td class="num">${$$(p[2])}</td></tr>`).join("")}</tbody>
      </table></div>
      <div class="paycard">
        <div><div class="pv">${$$(P.payouts.reduce((s,p)=>s+p[2],0))}</div><div class="pl">Queued this week</div></div>
        <div class="pstripe">Held in <b>Stripe</b> until each event completes — your refund protection</div>
      </div>
    </div>
  </div>
  <div class="panel">
    <h3>Events on your platform</h3><div class="ps">The 8 largest of ${P.events} · every organizer's listing lands here for review</div>
    <div class="tablewrap"><table>
      <thead><tr><th>Event</th><th>Organizer</th><th>Date</th><th class="num">Sold</th><th class="num">Gross</th><th class="num">Your fee</th><th>Status</th></tr></thead>
      <tbody>${P.allEvents.map(r=>`<tr>
        <td class="nm">${esc(r[0])}</td><td>${esc(r[1])}</td><td>${r[2]}</td><td class="num">${r[3]}</td>
        <td class="num">${$$(r[4])}</td><td class="num"><b>${$$(r[5])}</b></td>
        <td><span class="statpill ${r[6]}">${({live:"Live",done:"Completed",soon:"Almost full",warn:"Slow sales"})[r[6]]}</span></td>
      </tr>`).join("")}</tbody>
    </table></div>
  </div>
  ${switcher("platform")}`;
}
