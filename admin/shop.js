import {CONFIG} from "./config.js";
let token = localStorage.getItem('admin_token') || null;
export async function initShopToggle(socket){

    const toggle       = document.getElementById("shopToggle");
    const toggleMobile = document.getElementById("shopToggleMobile");
    const statusText   = document.getElementById("shopStatusText");
    const statusDot    = document.getElementById("shopStatusDot");
    const banner       = document.getElementById("shopClosedBanner");

    function applyStatus(isOpen) {
        toggle.checked        = isOpen;
        toggleMobile.checked  = isOpen;
        statusText.textContent = isOpen ? "Shop Open" : "Shop Closed";
        statusDot.className   = `status-dot ${isOpen ? "green" : "red"}`;
        banner.classList.toggle("hidden", isOpen);
    }

    fetch(`${CONFIG.API_URL}/shop/status`)
        .then(r => r.json())
        .then(data => applyStatus(data.isOpen));

    async function handleToggle(isOpen) {
        // Still do the REST call so your DB stays in sync
        fetch(`${CONFIG.API_URL}/shop/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({ isOpen })
        });

        // Emit so all clients get it immediately
        socket.emit("shop:status", { isOpen });
    }


    toggle.addEventListener("change", () => handleToggle(toggle.checked));
    toggleMobile.addEventListener("change", () => handleToggle(toggleMobile.checked));

    socket.on("shop:status", (data) => applyStatus(data.isOpen));
}