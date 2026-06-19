
import {Auth, apiPost} from "./auth.js";
import { showPanel, openAuthModal, closeAuthModal,
    setCardHeader, activateTab, refreshAvatarState,
    populateUserPanel, showMessage, clearMessage,
    setLoading, startResendTimer,
 } from "./authUI.js";


 function bindEvents(){
    let signupRoll = "";
    let signupToken = "";

    //open modal 
    document.addEventListener("click", e =>{
        if(e.target.closest("#user-avatar-btn")) openAuthModal();
    });


    document.addEventListener("click", e => {
        if(e.target.id === "auth-close-btn" || e.target.id == "auth-overlay") closeAuthModal();
    });

    document.addEventListener("keydown", e => {
        if( e.key === "Escape") closeAuthModal();
    });

    document.addEventListener("click", e => {
        if(e.target.id === "tab-login") activateTab("login");
        if(e.target.id === "tab-signup") activateTab("signup");

    });

    document.addEventListener("click", e =>{
        const toggle = e.target.closest(".auth-field__pw-toggle");
        if(!toggle) return;

        const targetId = toggle.dataset.target;

        const input = document.getElementById(targetId);

        if(!input) return;

        input.type = input.type === "password" ? "text" : "password";
    })

    // ---- LOGIN ___

    document.addEventListener("click" , async e =>{
        if(!e.target.closest("#login-btn")) return;

        const roll = document.getElementById("login-roll")?.value.trim().toUpperCase();
        const password = document.getElementById("login-password")?.value;
        clearMessage("login-message");

        if(!roll || !password){
            showMessage("login-message", "Please enter your roll number and password.", "error");
            return;
        }

        setLoading("login-btn", true);

        try{
            const data = await apiPost("/auth/login", {roll_num: roll, password});
            Auth.save(data.token, data.user);
            refreshAvatarState();
            populateUserPanel();
            showPanel("panel-user");
            setCardHeader("Your Account", "");
        } catch(err){
            showMessage("login-message", err.message, "error");
        } finally {
            setLoading("login-btn", false);
        }
    });

    document.addEventListener("keydown", e=> {
        if(e.key === "Enter" && (e.target.id === "login-roll" || e.target.id === "login-password")){
            document.getElementById("login-btn")?.click();
        }
    });
    document.addEventListener("keydown", e=> {
        if(e.key === "Enter" && e.target.id === "signup-roll"){
            document.getElementById("signup-verify-btn")?.click();
        }
    });

    // Signup set up 1: send otp - 
    document.addEventListener("click", async e=>{
        if(!e.target.closest("#signup-verify-btn")) return;
        const roll = document.getElementById("signup-roll")?.value.trim().toUpperCase();
        clearMessage("signup-verify-message");
        if(!roll){
            showMessage("signup-verify-message", "Please enter your roll number.", "error");
            return;
        }

        setLoading("signup-verify-btn", true);

        try{
            const data = await apiPost("/auth/signup/verify", {roll_num: roll});
            signupRoll = roll;
            document.getElementById("otp-info-msg").textContent = data.message;
            clearMessage("otp-message");
            document.getElementById("otp-input").value = "";
            showPanel("panel-otp");
            setCardHeader("Verify Email", "Enter the OTP we sent you");
            startResendTimer(60);
        } catch (err){
            showMessage("signup-verify-message", err.message, "error");
        } finally{
            setLoading("signup-verify-btn", false);
        }
    });

    // -- signup step 2: verify otp
    document.addEventListener("click", async e => {
        if(!e.target.closest("#otp-verify-btn")) return;
        const otp = document.getElementById("otp-input")?.value.trim();
        clearMessage("otp-message");

        if(!otp || otp.length != 6){
            showMessage("otp-message", "Please enter the 6-digit OTP.", "error");
            return;
        }

        setLoading("otp-verify-btn", true);

        try{
            const data = await apiPost("/auth/signup/confirm-otp", {roll_num: signupRoll, otp});
            signupToken = data.signup_token;
            clearMessage("profile-message");
            ["profile-name", "profile-phone", "profile-password", "profile-confirm"].forEach(id =>{
                const el = document.getElementById(id);
                if(el) el.value = "";
            });
            showPanel("panel-profile");
            setCardHeader("Create Profile", "Almost there - one last step");
        } catch(err){
            showMessage("otp-message", err.message, "error");
        } finally {
            setLoading("otp-verify-btn", false);
        }
    });

    // --- signup step 2 resend otp---
    document.addEventListener("click", async e =>{
        if(!e.target.closest("#otp-resend-btn") || e.target.closest("#otp-resend-btn").disabled) return;
        try{
            const data = await apiPost("/auth/signup/verify", {roll_num: signupRoll});
            document.getElementById("otp-info-msg").textContent = data.message;
            clearMessage("otp-message");
            startResendTimer(60);
        } catch(err){
            showMessage("otp-message", err.message, "error");
        }
    });


    /// step 3 : complete profile --- 
    document.addEventListener("click", async e => {
        if(!e.target.closest("#profile-submit-btn")) return;
        const name = document.getElementById("profile-name")?.value.trim();
        const phone = document.getElementById("profile-phone")?.value.trim();
        const password = document.getElementById("profile-password")?.value;
        const confirm = document.getElementById("profile-confirm")?.value;
        clearMessage("profile-message");

        if(!name || !phone || !password || !confirm){
            showMessage("profile-message", "Please fill in all fields.", "error");
            return;
        }
        
        if(password.length < 8){
            showMessage("profile-message", "Password must be at least 8 characters.","error");
            return;
        }

        if(password != confirm){
            showMessage("profile-message", "Passwords do not match", "error");
            return;
        }

        setLoading("profile-submit-btn", true);
        try{
            const data = await apiPost("/auth/signup/complete", {
                signup_token : signupToken,
                name,
                phone_number: phone,
                password,
            });
            Auth.save(data.token, data.user);
            refreshAvatarState();
            populateUserPanel();
            showPanel("panel-user");
            setCardHeader("Your Account", "");
            signupToken = "";
        } catch(err){
            showMessage("profile-message", err.message, "error");
        } finally {
            setLoading("profile-submit-btn", false);
        }
    });

    // back from otp panel 

    document.addEventListener("click", e => {
        if(!e.target.closest("#otp-back-btn")) return;
        showPanel("panel-auth");
        activateTab("signup");
        setCardHeader("Hall 3 Canteen", "Sign in to place orders.");
    });

    document.addEventListener("click", e =>{
        if(!e.target.closest("#logout-btn")) return;

        Auth.clear();
        refreshAvatarState();
        closeAuthModal();
    });
    
 }

 export {bindEvents as initAuthEvents};