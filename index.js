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
