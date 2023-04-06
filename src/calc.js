const add = (x, y) => {
    return x + y;
};
const power = (x, y) => {
    return Math.pow(x, y);
};
const addFourNumbers = (input) => {
    const { a, b, c, d } = input;
    return a + b + c + d;
};
const addOddNumbers = (a, b) => {
    return a + b;
};
addOddNumbers(1, 3);
const drawScreen = (td) => td.reduce((total, digit) => total.toString() + digit.toString(), '');
const numbersOnScreen = drawScreen([1, 5, 8]);
console.log(numbersOnScreen);
const addTwoThings = (a, b) => {
    return a + b;
};
addTwoThings(1, 2);
addTwoThings('hello ', 'world');
addTwoThings(true, false);
addTwoThings(2, true);
