console.log('hello world');
async function hello() {
    return 'world';
}
let stringVar = 'example';
stringVar = 23;
let numVar = 21;
numVar = 'hello';
let stringExplicitVar;
stringExplicitVar = 21;
let numExplicitVar;
numExplicitVar = 'hello';
let font;
font = 'something';
font = 'bold';
let thing;
thing = 21;
thing = 'string';
thing = 'differentstring';
thing = 22;
const human = {
    first: 21,
    last: "Smith"
};
const human2 = {
    first: "John",
    last: "Smith"
};
const human3 = {
    first: "John",
    last: "Smith",
    age: 21
};
// Technically dont need to explicitly set return type
// as it will be inferred when using the native Math library.
function pow(x, y) {
    return Math.pow(x, y);
}
const arr = [];
arr.push(1);
arr.push('23');
arr.push(false);
const numArr = [];
numArr.push(21);
numArr.push('string');
const tupleArr = []; // Wrong, needs the number, string and boolean
const correctTupleArr = [1, '2', true];
const correctOptionalTupleArr = [1];
const correctOptionalTupleArr2 = [1, '2'];
// Generics
// This example is a RXJS observable: a class with an internal value that we observe
// The 'T' is a variable type
class Observable {
    value;
    constructor(value) {
        this.value = value;
    }
}
let x;
let y;
// No need to set the type as 'number', the provided value implies it since
// the constructor uses that type for the first argument
let z = new Observable(23);
const addNumbers = (a, b) => {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
};
// The above function takes either numbers or strings as an input due to the
// alphanumeric type, but the typeof guard ensures that only numbers are ever
// returned. This means that the return type can be inferred to be number.
addNumbers(1, 2);
// instanceof guards can be used on instances of classes
class Banana {
    isTasty() {
        return true;
    }
}
class Apple {
    isJuicy() {
        return true;
    }
}
function buyFruit(fruit) {
    let price = 0;
    if (fruit instanceof Banana) {
        price = fruit.isTasty() ? 5 : 10; // We know this fruit is instanceof Banana, so we can assume it has the isTasty method. If we changed it to isJuicy from the Apple class, it would complain. If we didn't have the guard at all it would also complain as it cannot be sure that the Fruit will have isTasty.
    }
    return price;
}
const apple = new Apple();
buyFruit(apple);
// in guard - checks if a method or property is in the instance, effectivley type filtering in a different way. This would be better if you want to filter to all instances with that method, which may be multiple different classes. In other words, a subset of the classes has the method, and we filter to those instead of selecting them all individually using instanceof.
function buyFruit2(fruit) {
    let price = 0;
    if ('isTasty' in fruit) {
        price = fruit.isTasty() ? 5 : 10;
    }
    if ('isJuicy' in fruit) {
        price = fruit.isJuicy() ? 5 : 10;
    }
    return price;
}
buyFruit2(apple);
// equality narrowing
// if something of type X === something else Y, then Y is of type X.
function getValues(a, b) {
    if (a === b) {
        // a is a string because b can ONLY be a string, and they are of equal type.
        console.log(a);
    }
    else {
        // a is a number, or a different string to b
        console.log(a);
    }
}
// user guards - the most common approach
// Define a method that will return true or false if a instance is of a particular type. 
// The 'fruit is Banana' bit on the next line is NOT a return type, but a 'predicate'.
// We are expecting that fruit is Banana, which informs the compiler about what type
// fruit will have inside the if blocks that use this function as their condition.
function isBanana(fruit) {
    return fruit instanceof Banana;
}
function buyFruit3(fruit) {
    let price = 0;
    if (isBanana(fruit)) {
        // compiler is happy that isTasty is available because the isBanana function
        // predicate shows that fruit will be Banana if it returns true.
        price = fruit.isTasty() ? 5 : 10;
    }
    else {
        price = fruit.isJuicy() ? 5 : 10;
    }
    return price;
}
buyFruit3(apple);
function createLabel(nameOrId) {
    // do something
    throw "placeholder";
}
// We can use our conditional type to define a function that will change it's output
// type based on input type
function createLabel2(idOrName) {
    // do something
    throw "placeholder";
}
let a = createLabel2("typescript");
// a: NameLabel
let b = createLabel2(2.8);
// b: IdLabel
let c = createLabel2(Math.random() ? "hello" : 42);
// type Config = {
//     square: (event: SquareEvent) => void;
//     circle: (event: CircleEvent) => void;
// }
