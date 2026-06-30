import {CONFIG} from "./config.js";
let token = localStorage.getItem('admin_token') || null;
const toast = document.getElementById('toast');

export function initBroadcast(socket) {
    const btn     = document.getElementById("broadcastBtn");
    const titleEl = document.getElementById("broadcastTitle");
    const msgEl   = document.getElementById("broadcastMessage");

    btn.addEventListener("click", async () => {
        const title   = titleEl.value.trim();
        const message = msgEl.value.trim();

        console.log("Sending Announcement");

        if (!message) return;

        await fetch(`${CONFIG.API_URL}/announcements/broadcast`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, message, expiryMinutes: Number(document.getElementById("broadcastExpiry").value) })
        });

        titleEl.value = "";
        msgEl.value   = "";

        // Show a confirmation toast in admin UI
        showToast("Announcement sent!");
    });

    // If admin also has the client page open, dismiss their own announcement
    socket.on("announcement", (data) => {
        // Optional: show it on admin side too for preview
    });
}

let toastTimer = null;
function showToast(msg, type = ''){
    toast.textContent = msg;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
}