import "./CustomerTable.scss";
import { addBlockedUser } from "../../Queries";

function CustomerTable({ users }) {

    const handleSubmit = async (username) => {
        try {
            await addBlockedUser(username);
            console.log(`User ${username} has been blocked`);
        } catch (error) {
            console.error("Failed to block user:", error);
        }
    };

    return (
        <div className="customer-table-container">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Join Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.first_name || "-"}</td>
                            <td>{user.last_name || "-"}</td>
                            <td>{user.joinDate}</td>
                            <td className='action-icon'>
                                <button onClick={() => handleSubmit(user.username)}>Block</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerTable;
