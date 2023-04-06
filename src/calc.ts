const add = (x: number, y: number): number => {
    return x + y;
}

const power = (x: number, y: number) => {
    return Math.pow(x, y);
}

interface quadInput {
    a: number;
    b: number;
    c: number;
    d: number;
}

type Odd = 1 | 3 | 5;

const addFourNumbers = (input: quadInput): number => {
    const { a, b, c, d } = input;
    return a + b + c + d;
}

const addOddNumbers = (a: Odd, b: Odd): number => {
    return a + b;
}

addOddNumbers(1, 3);

// It's not currently possible to make a type with a dynamic set of possible values
// eg an odd number type. Types can only be a combination of primatives and specific
// values.

// Types and interfaces are really similar, but interfaces are typically used to
// define object shapes like OOP, wheras types are used to define what type a
// single value can be.

type SingleDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

type typedDigits = SingleDigit[];

const drawScreen = (td: typedDigits): string => 
    td.reduce((total, digit) => 
        total.toString() + digit.toString(), ''
    );

const numbersOnScreen: string = drawScreen([1, 5, 8]);

console.log(numbersOnScreen)

const addTwoThings = <T>(a: T, b: T): T => {
    return (a as any) + b;
}

addTwoThings(1,2);
addTwoThings('hello ', 'world');
addTwoThings(true, false);
addTwoThings(2, true);