import { Auth } from "./auth.js";

function injectAuthHTML(){
    const headerActions = document.getElementById("header-actions");
    const headerStatusBtn = document.getElementById("shop-status-btn");

    if(headerStatusBtn) {

        const user = Auth.user();
        const isLoggedIn = Auth.isLoggedIn();

        const initaials = user?.name ? user.name.trim().split(" ").filter(Boolean).map(part => part[0]).slice(0,2).join("").toUpperCase(): "U";
        const avatarBtn = document.createElement("button");
        avatarBtn.className = "user-avatar-btn";
        avatarBtn.id = "user-avatar-btn";
        avatarBtn.setAttribute("aria-label", "Account");
        avatarBtn.innerHTML = isLoggedIn ? 
        `   <svg class="user-avatar-btn__icon"></svg>
            <span class="user-avatar-btn__initials">${initaials}</span>
            <span class="user-avatar-btn__dot"></span>
        `
        : `
         <svg class="user-avatar-btn__icon" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            <span class="user-avatar-btn__initials" style="display:none"></span>
            <span class="user-avatar-btn__dot"></span>
            `;
        headerActions.insertBefore(avatarBtn, headerStatusBtn);
        if(isLoggedIn){
            avatarBtn.classList.add("is-logged-in");
        }
    }

    const overlay = document.createElement("div");
    overlay.className = "auth-overlay";
    overlay.id = "auth-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Account");

    overlay.innerHTML = `
        <div class = "auth-card" id="auth-card">
            
            <div class="auth-card__header">
                <img src="./public/images/logo.png" alt="" class="auth-card__logo" aria-hidden="true">
                <h2 class="auth-card__title" id="auth-card-title">Hall 3 Canteen</h2>
                <p class="auth-card__subtitle" id="auth-card-subtitle">Sign in to place orders </p>
                <button class="auth-card__close" id="auth-close-btn" aria-label="Close">✕</button>
            </div>
            
            <div class="auth-panels" id="auth-panels">
            
                <!----- Panel Login/ Signup --------->
                <div class="auth-panel is-active" id="panel-auth">
                
                    <div class="auth-tabs" role="tablist">
                        <button class="auth-tab is-active" id="tab-login" role="tab" aria-selected="true" aria-controls="subpanel-login">Login</button>
                        <button class="auth-tab" id="tab-signup" role="tab" aria-selected="false" aria-controls="subpanel-signup">Sign up</button>
                    </div>
                    
                    
                    <!------ Login sub-form ---->
                    <div id="subpanel-login">
                        <div class="auth-message" id="login-message"></div>

                        <div class="auth-field">
                            <label class="auth-field__label" for="login-roll">Roll Number</label>
                            <input class="auth-field__input" id="login-roll" type="text" placeholder="e.g. 230158" autocomplete="username" spellcheck="false">
                        </div>

                        <div class="auth-field">
                            <label class="auth-field__label" for="login-password">Password</label>
                            <div class="auth-field__pw-wrapper">
                                <input class="auth-field__input" id="login-password" type="password" placeholder="••••••••" autocomplete="current-password">
                                <button class="auth-field__pw-toggle" type="button" aria-label="Toggle password visibility" data-target = "login-password">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" stroke-width="2" stroke-linecap="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button class="auth-btn" id="login-btn">
                            <span class="auth-btn__text">Login</span>
                            <span class="auth-btn__spinner" aria-hidden="true"></span>
                        </button>
                    </div>

                    <!--- Signup sub-form (roll entry step) ----->
                    <div id="subpanel-signup" style="display:none">
                        <div class="auth-message" id="signup-verify-message"></div>

                        <div class="auth-field">
                            <label class="auth-field__label" for="signup-roll">Roll Number</label>
                            <input class="auth-field__input" id="signup-roll" type="text" placeholder="e.g. 230158" autocomplete="username" spellcheck="false">
                        </div>

                        <button class="auth-btn" id="signup-verify-btn">
                            <span class="auth-btn__text">Send OTP</span>
                            <span class="auth-btn__spinner" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>


                <!---- Panel OTP verification ------>
                <div class="auth-panel" id="panel-otp">
                    <button class="auth-back-link" id="otp-back-btn">
                        ← Back
                    </button>

                    <div class="auth-steps">
                        <div class="auth-step is-done"></div>
                        <div class="auth-step is-active"></div>
                        <div class="auth-step"></div>
                    </div>

                    <div class="auth-message is-info" id="otp-info-msg">OTP sent to your IITK email.</div>
                    <div class="auth-message" id="otp-message"></div>

                    <div class="auth-otp-row">
                        <div class="auth-field">
                            <label class="auth-field__label" for="otp-input">Enter OTP</label>
                            <input class="auth-field__input" id="otp-input" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" autocomplete="one-time-code">
                        </div>
                        <button class="auth-otp-resend" id="otp-resend-btn" disabled>Resend</button>
                    </div>

                    <button class="auth-btn" id="otp-verify-btn">
                        <span class="auth-btn__text">Verify OTP</span>
                        <span class="auth-btn__spinner" aria-hidden="true"></span>
                    </button>
                </div>


                <!---- Panel Profile Creation ------>
                <div class="auth-panel" id="panel-profile">
                    <div class="auth-steps">
                        <div class="auth-step is-done"></div>
                        <div class="auth-step is-done"></div>
                        <div class="auth-step is-active"></div>
                    </div>

                    <div class="auth-message" id="profile-message"></div>

                    <div class="auth-field">
                        <label class="auth-field__label" for="profile-name">Full Name</label>
                        <input class="auth-field__input" id="profile-name" type="text" placeholder="Your name" autocomplete="name">
                    </div>

                    <div class="auth-field">
                        <label class="auth-field__label" for="profile-phone">Phone Number</label>
                        <input class="auth-field__input" id="profile-phone" type="text" placeholder="Your Phone Number" autocomplete="tel">
                    </div>

                    <div class="auth-field">
                        <label class="auth-field__label" for="profile-password">Set Password</label>
                        <div class="auth-field__pw-wrapper">
                            <input class="auth-field__input" id="profile-password" type="password" placeholder="Min. 8 characters" autocomplete="new-password">
                            <button class="auth-field__pw-toggle" type="button" aria-label="Toggle password visibility" data-target="profile-password">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="auth-field">
                        <label class="auth-field__label" for="profile-confirm">Confirm Password</label>
                        <div class="auth-field__pw-wrapper">
                            <input class="auth-field__input" id="profile-confirm" type="password" placeholder="Re-enter password" autocomplete="new-password">
                            <button class="auth-field__pw-toggle" type="button" aria-label="Toggle password visibility" data-target="profile-confirm">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" stroke-width="2" stroke-linecap="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button class="auth-btn" id="profile-submit-btn">
                        <span class="auth-btn__text">Create Account</span>
                        <span class="auth-btn__spinner" aria-hidden="true"></span>
                    </button>
                </div>


                <!-- Panel: Logged in user info --->
                <div class="auth-user-panel" id= "panel-user">
                    <p class="auth-user-greeting" id="user-greeting">Hi, -</p>
                    <p class="auth-user-roll" id="user-roll-display">-</p>
                    <p class="auth-user-phone" id="user-phone-display">-</p>
                    <p class="auth-user-email" id="user-email-display">-</p>
                    <div class="auth-user-divider"></div>
                    <button class="auth-logout-btn" id="logout-btn">Log out</button>
                </div>
            </div>
        </div>
      `;

    document.body.appendChild(overlay);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../../css/auth-ui.css";
    document.head.appendChild(link);

    refreshAvatarState();
}

function showPanel(panelId){
    document.querySelectorAll(".auth-panel, .auth-user-panel").forEach(p => p.classList.remove("is-active"));
    const target = document.getElementById(panelId);
    if(target) target.classList.add("is-active");
}

function openAuthModal(){
    const overlay = document.getElementById("auth-overlay");
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";

    if(Auth.isLoggedIn()){
        populateUserPanel();
        showPanel("panel-user");
        setCardHeader("Your Account", "");
    } else {
        showPanel("panel-auth");
        setCardHeader("Hall 3 Canteen", "Sign in to place orders");
        activateTab("login");
    }
}

function closeAuthModal(){
    document.getElementById("auth-overlay").classList.remove("is-open");
    document.body.style.overflow = "";
}

function setCardHeader(title, subtitle){
    document.getElementById("auth-card-title").textContent = title;
    document.getElementById("auth-card-subtitle").textContent = subtitle;
}

function activateTab(tab){
    document.getElementById("tab-login").classList.toggle("is-active", tab === "login");
    document.getElementById("tab-signup").classList.toggle("is-active", tab === "signup");
    document.getElementById("tab-login").setAttribute("aria-selected", tab === "login");
    document.getElementById("tab-signup").setAttribute("aria-selected", tab === "signup");
    document.getElementById("subpanel-login").style.display = tab === "login" ? "" : "none";
    document.getElementById("subpanel-signup").style.display = tab === "signup" ? "" : "none";
}

function refreshAvatarState(){
    const btn = document.getElementById("user-avatar-btn");

    if(!btn) return;

    const icon = btn.querySelector(".user-avatar-btn__icon");
    const initials = btn.querySelector(".user-avatar-btn__initials");

    if(Auth.isLoggedIn()){
        const user = Auth.user();
        const name = user?.name || "";
        const parts = name.trim().split(" ").filter(Boolean);

        const ini = parts.length >= 2 ? parts[0][0] + parts[parts.length-1][0] : (parts[0]?.[0] || "U");
        icon.style.display = "none";
        initials.textContent = ini;
        initials.style.display = "";
        btn.classList.add("is-logged-in");
    } else{
        icon.style.display = "";
        initials.style.display = "none";
        btn.classList.remove("is-logged-in");
    }

    btn.classList.add("is-ready");
}

function populateUserPanel(){
    const user = Auth.user();
    if(!user) return;

    document.getElementById("user-greeting").textContent = `Hi, ${user.name?.split(" ")[0] || "there"} 👋`;
    document.getElementById("user-roll-display").textContent = user.roll_num || "";
    document.getElementById("user-phone-display").textContent = user.phone_number || "";
    document.getElementById("user-email-display").textContent = user.email || "";
}

function showMessage(elId, text, type){
    const el = document.getElementById(elId);
    if(!el) return;
    el.className = `auth-message is-${type}`;
    el.textContent = text;
}

function clearMessage(elId){
    const el = document.getElementById(elId);
    if(el) {el.className = "auth-message"; el.textContent = "";}
}


function setLoading(btnId, loading){
    const btn = document.getElementById(btnId);
    if(!btn) return;
    btn.disabled = loading;
    btn.classList.toggle("is-loading", loading);
}

let resendTimer = null;

function startResendTimer(seconds = 60){
    const btn = document.getElementById("otp-resend-btn");
    if(!btn) return;

    btn.disabled = true;

    let remaining = seconds;

    btn.textContent = `${remaining}s`;
    clearInterval(resendTimer);
    resendTimer = setInterval(() =>{
        remaining--;
        btn.textContent = `${remaining}s`;
        if(remaining <= 0){
            clearInterval(resendTimer);
            btn.textContent = "Resend";
            btn.disabled = false;
        }
    }, 1000);
}



export { injectAuthHTML as injectAuthUI,
    showPanel,
    openAuthModal,
    closeAuthModal,
    setCardHeader,
    activateTab,
    refreshAvatarState,
    populateUserPanel,
    showMessage,
    clearMessage,
    setLoading,
    startResendTimer,
};