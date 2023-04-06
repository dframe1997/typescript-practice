console.log('hello world')

async function hello() {
    return 'world'
}

let stringVar = 'example';
stringVar = 23;

let numVar = 21;
numVar = 'hello';

let stringExplicitVar: string;
stringExplicitVar = 21;

let numExplicitVar: number;
numExplicitVar = 'hello';

type FontStyle = 'bold' | 'italic';

let font: FontStyle;
font = 'something';
font = 'bold';

type MixedType = 'string' | 21;

let thing: MixedType;
thing = 21;
thing = 'string';
thing = 'differentstring';
thing = 22;

interface Person {
    first: string;
    last: string;
    
    // The first and last name is required, but any additional properties
    // of any type can also be added as needed.
    [key: string]: any; 
}

const human: Person = {
    first: 21,
    last: "Smith"
}

const human2: Person = {
    first: "John",
    last: "Smith"
}

const human3: Person = {
    first: "John",
    last: "Smith",
    age: 21
}

 // Technically dont need to explicitly set return type
 // as it will be inferred when using the native Math library.
function pow(x: number, y: number): number {
    return Math.pow(x, y);
}

const arr = [];

arr.push(1);
arr.push('23');
arr.push(false);

const numArr: number[] = [];

numArr.push(21);
numArr.push('string');

type CustomTuple = [number, string, boolean]

const tupleArr: CustomTuple = []; // Wrong, needs the number, string and boolean

const correctTupleArr: CustomTuple = [1, '2', true];

type OptionalCustomTuple = [number, string?, boolean?];

const correctOptionalTupleArr: OptionalCustomTuple = [1];
const correctOptionalTupleArr2: OptionalCustomTuple = [1, '2'];

// Generics

// This example is a RXJS observable: a class with an internal value that we observe
// The 'T' is a variable type
class Observable<T> { 
    constructor(public value: T) {}
}

let x: Observable<number>;
let y: Observable<Person>;

// No need to set the type as 'number', the provided value implies it since
// the constructor uses that type for the first argument
let z = new Observable(23);

// Guards are type checks before a code block, which the TS compiler will use
// to infer the type of a variable within the block:
type alphanumeric = string | number;

const addNumbers = (a: alphanumeric, b: alphanumeric) => {
    if(typeof a === "number" && typeof b === "number") {
        return a + b;
    }
}

// The above function takes either numbers or strings as an input due to the
// alphanumeric type, but the typeof guard ensures that only numbers are ever
// returned. This means that the return type can be inferred to be number.

addNumbers(1, 2);

// instanceof guards can be used on instances of classes

class Banana {
    isTasty(): boolean {
        return true;
    }
}

class Apple {
    isJuicy(): boolean {
        return true;
    }
}

type Fruit = Banana | Apple;

function buyFruit(fruit: Fruit): number {
    let price = 0;

    if (fruit instanceof Banana) {
        price = fruit.isTasty() ? 5 : 10; // We know this fruit is instanceof Banana, so we can assume it has the isTasty method. If we changed it to isJuicy from the Apple class, it would complain. If we didn't have the guard at all it would also complain as it cannot be sure that the Fruit will have isTasty.
    }

    return price;
}

const apple = new Apple();
buyFruit(apple);

// in guard - checks if a method or property is in the instance, effectivley type filtering in a different way. This would be better if you want to filter to all instances with that method, which may be multiple different classes. In other words, a subset of the classes has the method, and we filter to those instead of selecting them all individually using instanceof.

function buyFruit2(fruit: Fruit): number {
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

function getValues(a: number | string, b: string) {
    if (a === b) {
        // a is a string because b can ONLY be a string, and they are of equal type.
        console.log(a);
    } else {
        // a is a number, or a different string to b
        console.log(a);
    }
}

// user guards - the most common approach
// Define a method that will return true or false if a instance is of a particular type. 

// The 'fruit is Banana' bit on the next line is NOT a return type, but a 'predicate'.
// We are expecting that fruit is Banana, which informs the compiler about what type
// fruit will have inside the if blocks that use this function as their condition.

function isBanana(fruit: Fruit): fruit is Banana {
    return fruit instanceof Banana;
}

function buyFruit3(fruit: Fruit): number {
    let price = 0;

    if (isBanana(fruit)) {
        // compiler is happy that isTasty is available because the isBanana function
        // predicate shows that fruit will be Banana if it returns true.
        price = fruit.isTasty() ? 5 : 10; 
    } else {
        price = fruit.isJuicy() ? 5 : 10;
    }

    return price;
}

buyFruit3(apple);

interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}

// conditional types

// say we have a function with multiple definitions due to typing:
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  // do something
  throw "placeholder"
}

// We can define a conditional type using generic types as input:
// EG: If the generic type (T) extends number, NameOrId will use IdLabel type
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

// We can use our conditional type to define a function that will change it's output
// type based on input type
function createLabel2<T extends number | string>(idOrName: T): NameOrId<T> {
    // do something
    throw "placeholder"
}

let a = createLabel2("typescript");
    
// a: NameLabel

let b = createLabel2(2.8);
    
// b: IdLabel

let c = createLabel2(Math.random() ? "hello" : 42);
// c: NameLabel | IdLabel

// Type mapping

// This example will iterate over the prpoerties of the supplied
// value's type and change their type to boolean
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
  };
   
type FeatureOptions = OptionsFlags<FeatureFlags>;

// type FeatureOptions = {
//     darkMode: boolean;
//     newUserProfile: boolean;
// }

// Modifiers can be used with mapping to further manipulate types
// Modifiers are placed relative to the property name (aka [])
// for example the readonly property goes before the property name,
// so to remove it, the -readonly goes before the [].
// A ? goes after a property if the property is optional,
// so to remove the optionality, use this: []-?. 
// These features can be used to add or remove a modifier from an object property.
// Modifiers are added by default unless minus(-) is used.

// This one removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
    readonly id: string;
    readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

// Therefore:
// type UnlockedAccount = {
//     id: string;
//     name: string;
// }

// This one removes 'optional' attributes from a type's properties
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
id: string;
name?: string;
age?: number;
};

type User = Concrete<MaybeUser>;
    
// Name and age are now required:
// type User = {
//     id: string;
//     name: string;
//     age: number;
// }

// The as keyword can be used to change a type's property names:
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = Getters<Person>;
         
// type LazyPerson = {
//     getName: () => string;
//     getAge: () => number;
//     getLocation: () => string;
// }

// You can use 'as' to remove properties matching a string name:
// Remove the 'kind' property
type RemoveShapeField<Type> = {
    [Property in keyof Type as Exclude<Property, "shape">]: Type[Property]
};
 
interface Circle {
    shape: "circle";
    radius: number;
}
 
type ShapelessCircle = RemoveShapeField<Circle>;
           
// type ShapelessCircle = {
//     radius: number;
// }

// Finally, you can map over a union of types eg 'string | number'

// For example:
// Events is a generic type, so could be T, Events is more semantic.
// Here we're getting the shape property from each event E,
// and adding it as a property to the EventConfig type.
// This results in a circle and a square property on the
// EventConfig type. We set the type for each of these properties
// to be a function taking the corresponding event as an argument:
type EventConfig<Events extends { shape: string }> = {
    [E in Events as E["shape"]]: (event: E) => void;
}
 
type SquareEvent = { shape: "square", x: number, y: number };
type CircleEvent = { shape: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>
       
// type Config = {
//     square: (event: SquareEvent) => void;
//     circle: (event: CircleEvent) => void;
// }
