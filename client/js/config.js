export const CONFIG = {
    API_URL:
        window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://orderit-production.up.railway.app"
};