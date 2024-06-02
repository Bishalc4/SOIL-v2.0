import React from 'react';
import './ProductTable.scss';

function ProductTable({products}) {
  console.log("Products", products);

  function handleEdit() {
    console.log("edit button was clicked");
  }

  function handleDelete() {
    console.log("delete button was clicked");
  }

  return (
    <div className="product-table-container">
      <div className='scrollable-table'>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.product_name}</td>
                <td>${product.price}</td>
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
    </div>
  );
}

export default ProductTable;