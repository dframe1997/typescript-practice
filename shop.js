const myCart = {
    products: [
        {
            name: "Chocolate",
            price: 5,
            category: 'food'
        },
        {
            name: "Irn Bru",
            price: 2,
            category: 'drink'
        },
        {
            name: "Shirt",
            price: 10,
            category: 'clothing'
        },
        {
            name: "Cable",
            price: 3,
            category: 'tech'
        },
    ],
    total: 20
};
const addItem = (product, cart) => {
    cart.products.push(product);
    return cart;
};
const newCart = addItem({
    name: "apple",
    price: 1,
    category: "food"
}, myCart);
