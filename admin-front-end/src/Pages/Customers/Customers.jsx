import CustomerTable from "../../Components/CustomerTable/CustomerTable";
import "./Customers.scss";

function Customers() {
    return(
        <div className="customers-container">
            <CustomerTable />
        </div>
    );
}

export default Customers