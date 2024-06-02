import "./Dashboard.scss"

function Dashboard() {

    //product sales container will have the graph that real time updates and shows the number of products purchased
    //last row will simply contain the latest cutomers reviews

    return(
        <div className="dashboard-container">
            <div className="row" id="sales-container">
                <div className="total-sales-container">

                </div>
                <div className="total-orders-container">

                </div>
                <div className="total-products-container">

                </div>
            </div>
            <div className="row" id="charts-container">
                <div className="product-sales-container">

                </div>
                <div className="ratings-chart-container">
                    
                </div>
            </div>
            <div className="row" id="latest-reviews-container">
                <div className="latest-customer-reviews">

                </div>
            </div>
        </div>
    );
}

export default Dashboard