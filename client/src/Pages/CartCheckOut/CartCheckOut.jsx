import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import validate from '../../Functions/CreditCardValidation';
import validateAddress from '../../Functions/AdressValidation'
import "./CartCheckOut.scss";

function CartCheckOut() {
    const location = useLocation();
    const navigate = useNavigate();
    const { price , cartData } = location.state;

    const [values, setValues] = useState({
        cardNumber: '',
        expMM: '',
        expYY: '',
        cvv: '',
    });
    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        addressLine: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
    });

    const [errors, setError] = useState({});
    function handleSubmit(e) {
        e.preventDefault();
        const cardErrors = validate(values);
        const addressErrors = validateAddress(shippingAddress);
        setError({ ...cardErrors, ...addressErrors });
    
        if (Object.keys(cardErrors).length === 0 && Object.keys(addressErrors).length === 0) {
            navigate("/receipt", { state: { price, cartData, shippingAddress } });
        }
    }
    
    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleAddressChange(e) {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    }


    return (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-column">
                <div className='deliveryAddress'>
                    <h3>SHIPPING ADDRESS</h3>
                    <div className="address-input-group">
                        <div className="address-input">
                            <label>First name: <input className="address-input-control" name="firstName" value={shippingAddress.firstName} onChange={handleAddressChange} />
                            {errors.firstName && <p>{errors.firstName}</p>}</label>
                        </div>
                        <div className="address-input">
                            <label>Last name: <input className="address-input-control" name="lastName" value={shippingAddress.lastName} onChange={handleAddressChange} />
                            {errors.lastName && <p>{errors.lastName}</p>}</label>
                        </div>
                    </div>
                    <div className="address-input-group">
                        <div className="address-input">
                            <label>Address line: <input className="address-input-control" name="addressLine" value={shippingAddress.addressLine} onChange={handleAddressChange} />
                            {errors.addressLine && <p>{errors.addressLine}</p>}</label>
                        </div>
                    </div>
                    <div className="address-input-group">
                        <div className="address-input">
                            <label>City: <input className="address-input-control" name="city" value={shippingAddress.city} onChange={handleAddressChange} />
                            {errors.city && <p>{errors.city}</p>}</label>
                        </div>
                        <div className="address-input">
                            <label>State: <input className="address-input-control" name="state" value={shippingAddress.state} onChange={handleAddressChange} />
                            {errors.state && <p>{errors.state}</p>}</label>
                        </div>
                    </div>
                    <div className="address-input-group">
                        <div className="address-input">
                            <label>Postcode: <input className="address-input-control" name="postcode" value={shippingAddress.postcode} onChange={handleAddressChange} />
                            {errors.postcode && <p>{errors.postcode}</p>}</label>
                        </div>
                        <div className="address-input">
                            <label>Country: <input className="address-input-control" name="country" value={shippingAddress.country} onChange={handleAddressChange} />
                            {errors.country && <p>{errors.country}</p>}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-column">
                <header className='header'>
                    <div className="title">
                        <h3>Payment Details </h3>
                    </div>
                    <div className="amount">
                        <h4> Amount: </h4>
                        <label className="price">${price.toFixed(2)}</label>
                    </div>
                </header>
                <main> 
                    <div className="card-Number">
                        <label> Card Number </label>
                        <input type='text' placeholder='1234 1234 1234 1234' className="card-input-control" value={values.cardNumber} name='cardNumber' onChange={handleChange} />
                        {errors.cardNumber && <p>{errors.cardNumber}</p>}
                    </div>
                    <div className="Expiry-and-cvv">
                        <div>
                            <label> Expiration Month </label>
                            <input type='number' placeholder='MM' className="card-input-control" value={values.expMM} name='expMM' onChange={handleChange} />
                            {errors.expMM && <p>{errors.expMM}</p>}
                        </div>
                        <div>
                            <label> Expiration Year </label>
                            <input type='number' placeholder='YYYY' className="card-input-control" value={values.expYY} name='expYY' onChange={handleChange} />
                            {errors.expYY && <p>{errors.expYY}</p>}
                        </div>
                    </div>
                    <div className="cvv">
                        <label> CVV: </label>
                        <input type='number' placeholder='CVV' className="card-input-control" value={values.cvv} name='cvv' onChange={handleChange} />
                        {errors.cvv && <p>{errors.cvv}</p>}
                    </div>
                    <div className="checkout-button">
                        <button type="submit">Purchase</button>
                    </div> 
                </main>
            </div>
        </form>
    );
}

export default CartCheckOut;
