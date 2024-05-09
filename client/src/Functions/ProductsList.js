function ProductsList() {
    const products = [
        { productId: 1, productName: "Organic Banana", price: 0.70, specialPrice: null, category: "Fruits", imageUrl: "banana" },
        { productId: 2, productName: "Organic Cucumber", price: 1.20, specialPrice: null, category: "Vegetables", imageUrl: "cucumber" },
        { productId: 3, productName: "Organic Apple", price: 1.00, specialPrice: null, category: "Fruits", imageUrl: "apple" },
        { productId: 4, productName: "Organic Tomato", price: 0.90, specialPrice: null, category: "Vegetables", imageUrl: "tomato" },
        { productId: 5, productName: "Organic Potato", price: 1.00, specialPrice: null, category: "Vegetables", imageUrl: "potato" },
        { productId: 6, productName: "Organic Carrot", price: 1.20, specialPrice: 0.90, category: "Vegetables", imageUrl: "carrot" },
        { productId: 7, productName: "Organic Orange", price: 0.80, specialPrice: null, category: "Fruits", imageUrl: "orange" },
        { productId: 8, productName: "Organic Broccoli", price: 1.80, specialPrice: null, category: "Vegetables", imageUrl: "broccoli" },
        { productId: 9, productName: "Organic Spinach", price: 1.50, specialPrice: 1.30, category: "Vegetables", imageUrl: "spinach" },
        { productId: 10, productName: "Organic Lettuce", price: 1.00, specialPrice: null, category: "Vegetables", imageUrl: "lettuce" },
        { productId: 11, productName: "Organic Strawberry", price: 3.00, specialPrice: null, category: "Fruits", imageUrl: "strawberry" },
        { productId: 12, productName: "Organic Bell Pepper", price: 1.50, specialPrice: null, category: "Vegetables", imageUrl: "bell_pepper" },
        { productId: 13, productName: "Organic Watermelon", price: 4.50, specialPrice: 3.50, category: "Fruits", imageUrl: "watermelon" },
        { productId: 14, productName: "Organic Onion", price: 0.80, specialPrice: null, category: "Vegetables", imageUrl: "onion" },
        { productId: 15, productName: "Organic Pineapple", price: 2.80, specialPrice: null, category: "Fruits", imageUrl: "pineapple" },
        { productId: 16, productName: "Organic Zucchini", price: 1.30, specialPrice: null, category: "Vegetables", imageUrl: "zucchini" },
        { productId: 17, productName: "Organic Kiwi", price: 1.50, specialPrice: null, category: "Fruits", imageUrl: "kiwi" },
        { productId: 18, productName: "Organic Mango", price: 2.00, specialPrice: 1.80, category: "Fruits", imageUrl: "mango" },
        { productId: 19, productName: "Organic Lemon", price: 0.60, specialPrice: null, category: "Fruits", imageUrl: "lemon" },
        { productId: 20, productName: "Organic Milk", price: 3.50, specialPrice: null, category: "Dairy", imageUrl: "milk" },
        { productId: 21, productName: "Organic Eggs", price: 2.00, specialPrice: 1.50, category: "Dairy", imageUrl: "egg" },
        { productId: 22, productName: "Organic Cheese", price: 5.50, specialPrice: 4.00, category: "Dairy", imageUrl: "cheese" },
        { productId: 23, productName: "Organic Yogurt", price: 2.80, specialPrice: null, category: "Dairy", imageUrl: "yogurt" },
        { productId: 24, productName: "Organic Beef", price: 12.00, specialPrice: 9.99, category: "Meat", imageUrl: "beef" },
        { productId: 25, productName: "Organic Chicken", price: 8.50, specialPrice: null, category: "Meat", imageUrl: "chicken" },
        { productId: 26, productName: "Organic Pork", price: 10.50, specialPrice: 9.50, category: "Meat", imageUrl: "pork" },
        { productId: 27, productName: "Organic Turkey", price: 9.00, specialPrice: null, category: "Meat", imageUrl: "turkey" },
        { productId: 28, productName: "Organic Quinoa", price: 4.50, specialPrice: null, category: "Grains", imageUrl: "quinoa" },
        { productId: 29, productName: "Organic Barley", price: 3.00, specialPrice: 2.40, category: "Grains", imageUrl: "barley" },
        { productId: 30, productName: "Organic Lentils", price: 2.50, specialPrice: null, category: "Grains", imageUrl: "lentils" },
        { productId: 31, productName: "Organic Chickpeas", price: 2.80, specialPrice: null, category: "Grains", imageUrl: "chickpeas" },
        { productId: 32, productName: "Organic Peas", price: 2.00, specialPrice: 1.40, category: "Grains", imageUrl: "peas" },
    ];

    return (
    localStorage.setItem("products", JSON.stringify(products))
    );
}
export default ProductsList;
