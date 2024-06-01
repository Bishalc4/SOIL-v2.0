import PropTypes from 'prop-types'
import "./ProductCard.scss"
import { Link } from "react-router-dom"
import AddCartButton from '../AddCartButton/AddCartButton';

function ProductCard(props) {
    const productPrice = parseFloat(props.product.price).toFixed(2);

    var productSpecialPrice = null;
    if (props.product.special !== null) {
        productSpecialPrice = parseFloat(props.product.special.special_price).toFixed(2)
    }

    const productName = props.product.product_name;
    const image = props.image;
    

    return(
        <div className="product-card-container">
            <Link to="/product" state={{ product: props.product, productImage: image}}>
                <img src={image} alt="Product Image"/>
            </Link>
            {productSpecialPrice !== null ? (
                <>
                    <h1>${productSpecialPrice}</h1>
                </>
            ): (
                <h1>${productPrice}</h1>
            )}
            <Link to="/product" state={{ product: props.product, productImage: image}}>
                <p>{productName}</p>
            </Link>
            <div className="cartButton-container" >
                <AddCartButton productId={props.product.product_id} />
            </div>
        </div>
    );
}
ProductCard.propTypes = {
    product: PropTypes.object,
    image: PropTypes.string,
}

export default ProductCard