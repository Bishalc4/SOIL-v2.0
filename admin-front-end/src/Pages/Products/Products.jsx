import ProductTable from "../../Components/ProductTable/ProductTable";
import "./Products.scss";

function Products() {
    return(
        <div className="products-container">
            <h1>Browse Products</h1>
            <ProductTable />
        </div>
    );
}

export default Products