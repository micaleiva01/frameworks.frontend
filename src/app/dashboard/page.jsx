import { getUserRole } from "../../utils/auth";

export default function Dashboard() {
    const role = getUserRole();

    return (
        <div>
            <h1>Dashboard</h1>
            {role === "ADMIN" ? (
                <p>Welcome, Admin! You can manage everything here.</p>
            ) : (
                <p>Welcome, User! You can write movie reviews here.</p>
            )}
        </div>
    );
}
