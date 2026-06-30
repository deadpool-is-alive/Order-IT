const SEEN_KEY = "seen_annoucement";
const ANNOUNCE_KEY = "active_annoucement";

function hasBeenSeen(id){
    const seen = JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
    return seen.includes(id);
}

function markAsSeen(id){
    const seen = JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
    seen.push(id);

    localStorage.setItem(SEEN_KEY, JSON.stringify(seen.slice(-50)));
    localStorage.removeItem(ANNOUNCE_KEY);
}

function showAnnouncementBanner({ id, title, message, expiresAt}) {

    if(expiresAt && Date.now() > expiresAt){
        markAsSeen(id);
        return;
    }

    if (hasBeenSeen(id)) return;  // already dismissed before, skip

    document.getElementById("annoucement-banner")?.remove();

    // CHANGE: inject modal into the page dynamically
    const existing = document.getElementById("announcement-modal");
    if (existing) existing.remove();

    const banner = document.createElement("div");
    banner.dataset.id = id;
    // banner.id = "announcement-banner";
    banner.className = "announcement-banner";
    banner.innerHTML = `
         <div class="announcement-banner__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 11v2"/> <path d="M7 10v4"/> <path d="M7 10l10-4v12l-10-4"/> <path d="M7 14l1.5 5h2L9 13"/> <path d="M19 8a4 4 0 0 1 0 8"/> </svg></div>
        <div class="announcement-banner__body">
            <span class="announcement-banner__title">${title}</span>
            <span class="announcement-banner__message">${message}</span>
        </div>
        <button class="announcement-banner__close" id="announcement-banner__close" 
                aria-label="Dismiss announcement">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5"
                 stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>`;
    const item = document.querySelector(".item");

    item ? item.insertAdjacentElement("beforebegin", banner) : document.body.appendChild(banner);
    

    banner.querySelector(".announcement-banner__close").addEventListener("click", () => {
        markAsSeen(id);  // CHANGE: persist so it won't show again
        banner.classList.add("annoucement-banner--hiding");
        setTimeout(() => banner.remove(), 300);
    });

    if(expiresAt){
        const msLeft = expiresAt - Date.now();
        setTimeout(() => {
            banner.classList.add("annoucement-banner--hiding");
            setTimeout(() => banner.remove(), 300);
        }, msLeft);
    }
}

export function initAnnoucements(socket){

    const stored = localStorage.getItem(ANNOUNCE_KEY);

    if(stored){
        try{
            const data = JSON.parse(stored);
            showAnnouncementBanner(data);
        } catch{
            localStorage.removeItem(ANNOUNCE_KEY);
        }
    }

    socket.on("annoucement", (data) =>{
        localStorage.setItem(ANNOUNCE_KEY, JSON.stringify(data));
        showAnnouncementBanner(data);
    })
}