import "./CustomerTable.scss";
import { addBlockedUser, getBlockedUsers, deleteBlockedUser } from "../../Queries";
import { useState, useEffect } from "react";


function CustomerTable({ users }) {
    const [blockedUsers, setBlockedUsers] = useState([]);

    console.log(blockedUsers);

    useEffect(() => {
        async function loadUsers() {
            const blocked_users = await getBlockedUsers();
            setBlockedUsers(blocked_users);
        }
    loadUsers();
    }, []);

    //checks if the user is blocked
    const isBlocked = (username) => blockedUsers.some(user => user.username === username);

    const handleUnblock = async (username) => {
        const id = blockedUsers.find(user => user.username === username);
        console.log("ID", id.blocked_id);

        try {
            await deleteBlockedUser(id.blocked_id);
        } catch (error) {
            console.error("Failed to block ", error);
        }
    };

    const handleBlock = async (username) => {
        try {
            await addBlockedUser(username);
        } catch (error) {
            console.error("Failed to block ", error);
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
                                {isBlocked(user.username) === true ? (
                                    <button onClick={() => handleUnblock(user.username)} >Unblock</button>
                                ): (
                                    <button onClick={() => handleBlock(user.username)}>Block</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerTable;