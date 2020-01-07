
// 普通接口
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
// printLabel(myObj); //Size 10 Object

// 可选属性
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: 'black', width: 20 });
// console.log(mySquare); //{color: "black", area: 400}


// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // Cannot assign to 'x' because it is a read-only property.

// ReadonlyArray 属性定义的元素只能读取，不能操作赋值
let a: number[] = [1, 2, 3, 4, 5];
let ro: ReadonlyArray<number> = a;
ro[1] = 9; // 类型“readonly number[]”中的索引签名仅允许读取。
ro.push(9); // 类型“readonly number[]”上不存在属性“push”。
// ro.length = 0; // Cannot assign to 'length' because it is a read-only property
a = ro; // The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'

// 即使上面报错，用类型断言重写后上面的操作仍然有效
a = ro as number[];
a.push(9)
a.shift()
// console.log(a, ro, a == ro); //  [9, 3, 4, 5, 9, 9] , [9, 3, 4, 5, 9, 9]  true

// 额外的属性检查
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any
}

// let ms = createSquare({ color: 'red', width: 100, height: 100 } as SquareConfig)
let ms = createSquare({ color: 'red', width: 100, height: 100 })
console.log(ms);

// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
// mySearch = function (source: string, subString: string): boolean {
// 也可以不指定返回值类型，由系统自动推断
mySearch = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
}

let res = mySearch('abcdef', 'b'); // true
// console.log(res);

// 可索引的类型
interface StringArray {
    [index: number]: string;
}

let myArr: StringArray;
myArr = ['bob', 'fred'];

let myname: string = myArr[0]; // bob

interface objArray {
    [index: string]: any
}

let myUsers: objArray;
myUsers = {
    name: 'bob',
    age: 18,
    sex: '男'
}
let user: string = myUsers['sex']; // 男

interface NumberDic {
    [index: string]: number;
    length: number;
    name: number; // 必须声明为 number 和字符串索引返回值类型保持一致，否则报错
}
let numObj: NumberDic = { a: 1, b: 2, c: 3, length: 3, name: 99 };

// 只读类型
interface ReadonlyStringArray {
    readonly [indexe: number]: string;
}
let myArray: ReadonlyStringArray = ['alice', 'bob'];
myArray[0] = 'mary'; // 类型“ReadonlyStringArray”中的索引签名仅允许读取, 虽然会报错，但是代码依然执行
console.log(myArray[0]); // mary

// 类类型
