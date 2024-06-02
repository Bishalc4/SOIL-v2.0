import { useState, useEffect } from "react";
import CustomerTable from "../../Components/CustomerTable/CustomerTable";
import { getUsers, getBlockedUsers } from "../../Queries";
import "./Customers.scss";

function Customers() {
    const [users, setUsers] = useState([]);

    // Load Customers
    useEffect(() => {
        async function loadUsers() {
            const owners = await getUsers();
            setUsers(owners);
        }
    loadUsers();
    }, []);

    return(
        <div className="customers-container">
            <CustomerTable users={users} />
        </div>
    );
}

export default Customers