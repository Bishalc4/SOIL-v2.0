const { buildSchema } = require('graphql');
const db = require('../database'); 

const schema = buildSchema(`
  type User {
    username: String!
    password_hash: String!
    email: String!
    first_name: String
    last_name: String
    joinDate: String
  }

  type Product {
    product_id: Int!
    product_name: String!
    price: Float!
    category: String!
    imageUrl: String!
  }

  type Special {
    special_id: Int!
    special_price: Float!
    product_id: Int!
  }

  type Query {
    user(username: String!): User
    product(product_id: Int!): Product
  }

  type Mutation {
    addProduct(product_name: String!, price: Float!, category: String!, imageUrl: String!): Product
    editProduct(product_id: Int!, product_name: String, price: Float, category: String, imageUrl: String): Product
    deleteProduct(product_id: Int!): String
  }

`);

const root = {
  user: async (args) => {
    return await db.user.findByPk(args.username);
  },
  product: async (args) => {
    return await db.product.findByPk(args.product_id);
  },
  addProduct: async (args) => {
    const product = await db.product.create({
      product_name: args.product_name,
      price: args.price,
      category: args.category,
      imageUrl: args.imageUrl
    });
    return product;
  },

  editProduct: async (args) => {
    const product = await db.product.findByPk(args.product_id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.update({
      product_name: args.product_name !== undefined ? args.product_name : product.product_name,
      price: args.price !== undefined ? args.price : product.price,
      category: args.category !== undefined ? args.category : product.category,
      imageUrl: args.imageUrl !== undefined ? args.imageUrl : product.imageUrl
    });
    return product;
  },
  
  deleteProduct: async (args) => {
    const product = await db.product.findByPk(args.product_id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
    return `Product ${args.product_id} deleted`;
  }
};
module.exports = { schema, root };
