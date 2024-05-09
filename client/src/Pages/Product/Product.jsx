import { useLocation } from 'react-router-dom';
import "./Product.scss"
import AddCartButton from '../../Components/Layout/AddCartButton/AddCartButton';

function Product() {
    const location = useLocation();
    console.log(location.state);
    const productImage = location.state.productImage;
    const productName = location.state.product.productName;
    const productPrice = parseFloat(location.state.product.price).toFixed(2);
    var productSpecialPrice = location.state.product.specialPrice;
    if (productSpecialPrice !== null) {
        productSpecialPrice = parseFloat(productSpecialPrice).toFixed(2);
    }
    const productSavedPrice = parseFloat(productPrice - productSpecialPrice).toFixed(2);

    return(
        <div className="product-container">
            <div className="row">
                <img src={productImage} alt="Product Image" className="product-image"></img>
                <div className="product-details-container">
                    {productSpecialPrice !== null ? (
                        <div className="special-save-container">
                            <h1>SAVE ${productSavedPrice}</h1>
                        </div>
                    ): (
                        <>
                        </>
                    )}
                    <div className={`product-information-container ${productSpecialPrice !== null ? 'special' : 'original'}`}>
                        <h1>{productName}</h1>
                        {productSpecialPrice !== null ? (
                            <>
                                <h1>${productSpecialPrice}</h1>
                                <h2 className="product-special-price">Was ${productPrice}</h2>
                            </>
                        ): (
                            <>
                                <h1>${productPrice}</h1>
                            </>
                        )}
                        <AddCartButton productId={location.state.product.productId} className={`add-to-cart-btn ${productSpecialPrice !== null ? 'special' : 'original'}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Product