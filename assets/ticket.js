/* Signed ticket payloads — shared by the consumer app (QR generation)
   and the door scanner (verification).
   Payload: NBY1.<eventId>.<ticketCode>.<sig>
   The signature proves the ticket was issued by the platform, so a scan
   works on ANY phone — no shared database needed for the demo.
   Demo-grade: the secret lives in client JS. The real build signs
   server-side (or uses Stripe metadata) and the scanner calls an API.  */

const TICKET_PROTO = "NBY1";
const TICKET_SECRET = "nearby-demo-2026-k7";

async function ticketSign(eventId, code){
  const data = new TextEncoder().encode(TICKET_SECRET + "|" + eventId + "|" + code);
  const h = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(h)].slice(0,6).map(b=>b.toString(16).padStart(2,"0")).join("");
}
async function ticketPayload(eventId, code){
  return `${TICKET_PROTO}.${eventId}.${code}.${await ticketSign(eventId, code)}`;
}
/* Returns {eventId, code, sigOk} or null when it isn't a Nearby ticket at all. */
async function ticketParse(text){
  const p = String(text||"").trim().split(".");
  if(p.length !== 4 || p[0] !== TICKET_PROTO) return null;
  const [, eventId, code, sig] = p;
  const sigOk = (await ticketSign(eventId, code)) === sig.toLowerCase();
  return {eventId, code: code.toUpperCase(), sigOk};
}
