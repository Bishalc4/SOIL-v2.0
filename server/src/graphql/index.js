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
    special: Special
  }

  type Special {
    special_id: Int!
    special_price: Float!
    product_id: Int!
    product: Product
  }

  type Review {
    review_id: Int!
    text: String!
    rating: Int!
    username: String!
    product_id: Int!
  }

  type BlockedUser {
    blocked_id: Int!
    username: String!
  }

  type DeletedReview {
    deleted_id: Int!
    review_id: Int!
  }

  type Query {
    user(username: String!): User
    product(product_id: Int!): Product
    special(special_id: Int!): Special
    allReviews: [Review]
    allUsers: [User]
    allProducts: [Product] 
    allSpecials: [Special]   
    allBlockedUsers: [BlockedUser]
    allDeletedReviews: [DeletedReview]
  }

  type Mutation {
    addProduct(product_name: String!, price: Float!, category: String!, imageUrl: String!): Product
    editProduct(product_id: Int!, product_name: String, price: Float, category: String, imageUrl: String): Product
    deleteProduct(product_id: Int!): String
    addSpecialProduct(product_name: String!, price: Float!, category: String!, imageUrl: String!, special_price: Float!): Product
    editSpecialProduct(product_id: Int!, product_name: String, price: Float, category: String, imageUrl: String, special_price: Float): Product
    deleteSpecialProduct(product_id: Int!): String
    addBlockedUser(username: String!): BlockedUser
    deleteBlockedUser(blocked_id: Int!): String
    addDeletedReview(review_id: Int!): DeletedReview
  }
`);

const root = {
  user: async (args) => {
    return await db.user.findByPk(args.username);
  },

  product: async (args) => {
    const product = await db.product.findByPk(args.product_id);
    if (!product) {
      throw new Error('Product not found');
    }
    const special = await db.special.findOne({ where: { product_id: product.product_id } });
    return { ...product.dataValues, special };
  },

  allUsers: async () => {
    return await db.user.findAll();
  },

  allProducts: async () => {
  const products = await db.product.findAll();
  const productsWithSpecials = [];

  for (const product of products) {
    const special = await db.special.findOne({ where: { product_id: product.product_id } });
    productsWithSpecials.push({ ...product.dataValues, special });
  }

  return productsWithSpecials;
  },

  allSpecials: async () => {
  const specials = await db.special.findAll();
  const specialsWithProducts = [];

  for (const special of specials) {
    const product = await db.product.findByPk(special.product_id);
    specialsWithProducts.push({ ...special.dataValues, product });
  }

  return specialsWithProducts;
  },

  allReviews: async () => {
    return await db.review.findAll();
  },

  allBlockedUsers: async () => {
    return await db.blocked_user.findAll();
  },

  allDeletedReviews: async () => {
    return await db.deleted_review.findAll();
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
  }, 

  addSpecialProduct: async (args) => {
    const product = await db.product.create({
      product_name: args.product_name,
      price: args.price,
      category: args.category,
      imageUrl: args.imageUrl,
    });

    await db.special.create({
      special_price: args.special_price,
      product_id: product.product_id,
    });

    const special = await db.special.findOne({ where: { product_id: product.product_id } });

    return { ...product.dataValues, special };
  },

  editSpecialProduct: async (args) => {
    const product = await db.product.findByPk(args.product_id);
    if (!product) {
      throw new Error('Product not found');
    }

    await product.update({
      product_name: args.product_name !== undefined ? args.product_name : product.product_name,
      price: args.price !== undefined ? args.price : product.price,
      category: args.category !== undefined ? args.category : product.category,
      imageUrl: args.imageUrl !== undefined ? args.imageUrl : product.imageUrl,
    });

    const special = await db.special.findOne({ where: { product_id: args.product_id } });
    if (!special) {
      throw new Error('Special price not found for the product');
    }

    await special.update({ special_price: args.special_price });

    return { ...product.dataValues, special };
  },

  deleteSpecialProduct: async (args) => {
    const product = await db.product.findByPk(args.product_id);
    if (!product) {
      throw new Error('Product not found');
    }
    
    const special = await db.special.findOne({ where: { product_id: args.product_id } });
    if (!special) {
      throw new Error('Special price not found for the product');
    }

    await special.destroy();
    await product.destroy();

    return `Product ${args.product_id} with special price deleted`;
  },

  addBlockedUser: async (args) => {
    const blockedUser = await db.blocked_user.create({
      username: args.username
    });
    return blockedUser;
  },

  deleteBlockedUser: async (args) => {
    console.log("reached here");
    const blockedUser = await db.blocked_user.findByPk(args.blocked_id);
    console.log(blockedUser);
    if (!blockedUser) {
      throw new Error('Blocked user not found');
    }

    await blockedUser.destroy();

    return `Blocked user ${args.blocked_id} deleted`;
  },
  
  addDeletedReview: async (args) => {
    const deletedReview = await db.deleted_review.create({
      review_id: args.review_id
    });
    return deletedReview;
  }
};

module.exports = { schema, root };
