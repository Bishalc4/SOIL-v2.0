import React from 'react';
import './ProductTable.scss';

function ProductTable() {
  const data = [
    { product_name: 'Organic Banana', price: 0.7, special_price: 0.5, category: 'Fruits' },
    { product_name: 'Organic Apple', price: 0.5, special_price: null, category: 'Fruits' },
    { product_name: 'Organic Carrot', price: 1.2, special_price: null, category: 'Vegetable' },
    { product_name: 'Organic Meat', price: 10.7, special_price: 10.6, category: 'Fruits' },
  ];

  function handleEdit() {
    console.log("edit button was clicked");
  }

  function handleDelete() {
    console.log("delete button was clicked");
  }

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Special Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index}>
              <td>{product.product_name}</td>
              <td>${product.price}</td>
              <td>{product.special_price !== null ? `$${product.special_price.toFixed(2)}` : '-'}</td>
              <td>{product.category}</td>
              <td className='action-icon'>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
