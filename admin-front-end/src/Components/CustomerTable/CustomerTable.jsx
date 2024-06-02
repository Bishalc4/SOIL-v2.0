import "./CustomerTable.scss";

function CustomerTable() {
    const data = [
        {username: "mbolger", email: "mbolger@email.com", first_name: "Matt", last_name: "Smith", joinDate: "27/3/24"},
        {username: "trehanpanny70", email: "trehanpannya70@email.com", first_name: "Pannya", last_name: "", joinDate: "27/1/24"},
        {username: "messi", email: "messi@email.com", first_name: "", last_name: "", joinDate: "27/5/23"},
      ];

    function handleDelete() {
    console.log("delete button was clicked");
    }

    return(
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
                    {data.map((user, index) => (
                        <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name || "-"}</td>
                        <td>{user.last_name || "-"}</td>
                        <td>{user.joinDate}</td>
                        <td className='action-icon'>
                            <button onClick={handleDelete}>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerTable