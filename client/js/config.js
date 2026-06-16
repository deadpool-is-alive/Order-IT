export const CONFIG = {
    API_URL:
        window.location.hostname === "localhost"
            ? "http://172.23.22.136:5000"
            : "https://order-it-production.up.railway.app"
};