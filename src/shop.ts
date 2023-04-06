type ProductCategories = 'food' | 'drink' | 'clothing' | 'tech'

interface Product {
    name: string
    price: number
    category: ProductCategories
}

interface Cart {
    products: Product[];
    total: number;
}

const myCart: Cart = {
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
}

const addItem = (product: Product, cart: Cart): Cart => {
    cart.products.push(product);
    return cart;
}

const newCart: Cart = addItem({
    name: "apple",
    price: 1,
    category: "food"
}, myCart);