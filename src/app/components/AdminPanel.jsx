import { getUserRole } from "../utils/auth";

export default function AdminPanel() {
    const role = getUserRole();

    if (role !== "ADMIN") {
        return <h2>Access Denied</h2>;
    }

    return (
        <div>
            <h2>Admin Panel</h2>
            <p>Welcome, Admin! You can manage movies and actors here.</p>
        </div>
    );
}
