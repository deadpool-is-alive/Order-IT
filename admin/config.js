export const CONFIG = {
    API_URL: 
        window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://order-it-production.up.railway.app"
};