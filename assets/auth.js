/* Shared demo auth for the three staff surfaces:
     organizer dashboard, platform owner portal, door check-in.
   Loaded AFTER dash.js / checkin.js so it can reuse their el/load/save/toast.

   Demo-grade and deliberately so: the gate is client-side and therefore
   bypassable (see security/golive/2026-08-22-NOGO.md, finding T4/T9/T15).
   Production replaces this with server sessions + MFA. It exists to model
   the access boundary, not to enforce it.                                  */

async function pwHash(salt, pw){
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + "|" + pw));
  return [...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

const ROLES = {
  owner: {key:"ev_owner", sess:"ev_owner_session", mount:"mount",
    setup:"Set up owner access", signin:"Owner sign in",
    blurb:"Choose the username and password you'll use to open the platform dashboard. This is the demo of your locked owner portal.",
    restricted:"This portal is restricted to the platform owner."},
  organizer: {key:"ev_org", sess:"ev_org_session", mount:"mountOrg",
    setup:"Set up organizer access", signin:"Organizer sign in",
    blurb:"Choose the username and password for your organizer account. From here you offer events for approval and manage the ones you're running.",
    restricted:"Sign in to your organizer account."},
};

/* mountName lets one role serve several pages — the door scanner signs in
   with the same organizer account but mounts its own view. */
function gate(role, mountName){
  const R = ROLES[role];
  if(mountName) R.mount = mountName;
  if(sessionStorage.getItem(R.sess) === "1"){ window[R.mount](); return }
  el("app").innerHTML = authView(role, load(R.key, null));
  setTimeout(()=>{ el("au")?.focus() }, 50);
}
function authView(role, creds){
  const R = ROLES[role];
  return `
  <div class="authwrap">
    <div class="authcard">
      <div class="brandmark" style="margin:0 auto 18px; justify-content:center"><span class="ring"></span>Nearby</div>
      ${creds ? `
        <h1>${R.signin}</h1>
        <p class="authsub">${R.restricted}</p>
        <div class="field"><label for="au">Username</label><input id="au" autocomplete="username" autocapitalize="none"></div>
        <div class="field"><label for="ap">Password</label><input id="ap" type="password" autocomplete="current-password" onkeydown="if(event.key==='Enter')authLogin('${role}')"></div>
        <div id="autherr" class="autherr"></div>
        <button class="btn block lg" id="authbtn" onclick="authLogin('${role}')">Sign in</button>
        <button class="authreset" onclick="authReset('${role}')">Forgot it? Reset access (demo)</button>`
      : `
        <h1>${R.setup}</h1>
        <p class="authsub">${R.blurb}</p>
        <div class="field"><label for="au">Choose a username</label><input id="au" autocomplete="username" autocapitalize="none" placeholder="e.g. ${role}"></div>
        <div class="field"><label for="ap">Choose a password</label><input id="ap" type="password" autocomplete="new-password" placeholder="6+ characters"></div>
        <div class="field"><label for="ap2">Confirm password</label><input id="ap2" type="password" autocomplete="new-password" onkeydown="if(event.key==='Enter')authCreate('${role}')"></div>
        <div id="autherr" class="autherr"></div>
        <button class="btn block lg" id="authbtn" onclick="authCreate('${role}')">Create &amp; continue</button>`}
      <div class="authnote">Demo authentication — stored only in this browser. The real build uses server-side accounts.</div>
    </div>
  </div>`;
}
function authFail(msg){
  const e = el("autherr"); if(e) e.textContent = msg;
  ["au","ap","ap2"].forEach(id=>el(id)?.classList.add("bad"));
  setTimeout(()=>["au","ap","ap2"].forEach(id=>el(id)?.classList.remove("bad")), 1200);
}
async function authCreate(role){
  const R = ROLES[role];
  const u = el("au").value.trim(), p = el("ap").value, p2 = el("ap2").value;
  if(u.length < 3) return authFail("Username needs at least 3 characters.");
  if(p.length < 6) return authFail("Password needs at least 6 characters.");
  if(p !== p2)     return authFail("Passwords don't match.");
  const salt = [...crypto.getRandomValues(new Uint8Array(8))].map(b=>b.toString(16).padStart(2,"0")).join("");
  save(R.key, {u, salt, hash: await pwHash(salt, p)});
  sessionStorage.setItem(R.sess,"1");
  window[R.mount](); toast("Access created — you're in");
}
async function authLogin(role){
  const R = ROLES[role];
  const creds = load(R.key, null);
  if(!creds){ gate(role); return }
  const u = el("au").value.trim(), p = el("ap").value;
  const btn = el("authbtn"); btn.disabled = true; btn.textContent = "Checking…";
  const ok = u === creds.u && (await pwHash(creds.salt, p)) === creds.hash;
  if(!ok){ btn.disabled = false; btn.textContent = "Sign in"; return authFail("Wrong username or password.") }
  sessionStorage.setItem(R.sess,"1");
  window[R.mount](); toast("Welcome back");
}
function authLogout(role){
  if(typeof stopCam === "function" && typeof camStream !== "undefined" && camStream) stopCam();
  sessionStorage.removeItem(ROLES[role].sess); gate(role); toast("Signed out");
}
function authReset(role){
  localStorage.removeItem(ROLES[role].key);
  sessionStorage.removeItem(ROLES[role].sess);
  gate(role); toast("Access reset — choose new credentials");
}
