import jwtDecode from "jwt-decode";

export function getUserRole() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    
    try {
        const decoded = jwtDecode(token);
        return decoded.role;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}