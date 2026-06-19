import { CONFIG } from "../config.js";

const API = CONFIG.API_URL;

const Auth = {
    save(token, user) {
        localStorage.setItem("h3_token", token);
        localStorage.setItem("h3_user", JSON.stringify(user));
    },
    token() {return localStorage.getItem("h3_token");},
    user() {
        try {return JSON.parse(localStorage.getItem("h3_user")); }  catch {return null;}
    },
    clear(){
        localStorage.removeItem("h3_token");
        localStorage.removeItem("h3_user");
    },
    isLoggedIn(){ return !!this.token(); },
};

async function apiPost(path, body){
    const res = await fetch(`${API}${path}`, {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });

    const data = await res.json();

    if(!res.ok) throw new Error(data.message || "Something went wrong.");

    return data;
}

export {Auth , apiPost};