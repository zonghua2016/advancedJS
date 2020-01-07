
// 布尔值
let isDone: boolean = false;

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
let username: string = 'mary'
// 模板字符串
let sentence: string = `hello, my name is ${username}`

// 数组
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let list3: string[] = ['1', '2', '3'];

// 元组 Tuple
let x: [string, number];
x = ['hello', 2];
// x = [1, 2];
// x[3] = 'world';
// console.log('tuple==', x[5].toString(0));

// 枚举
// enum Color { Red, Green, Blue };
// 手动指定元素编号
// enum Color { Red = 1, Green, Blue };
enum Color { Red = 1, Green = 3, Blue = 6 };
let c: Color = Color.Green;
// console.log(c); //3

// 枚举出接口地址
enum Host {
    dev = 'https://dev.xxx.com/api',
    test = 'https://test.xxx.com/api',
    build = 'https://www.xxx.com/api'
}

const address: Host = Host.test;
// console.log(`地址为：${address}`);

// Any
// 对于 any 类型标记的变量，可以赋予任何值，因为它不通过编译阶段的类型检查
let notSure: any = 4;
notSure = 'string';
notSure = true;
notSure = {}
notSure = [1, 2, 3, { a: 'a' }]

// notSure.ifItExists(); // 代码运行时可能存在 ifItExists 方法
// notSure.toFixed();

let prettySure: Object = 4;
// prettySure.toFixed(); //Object 类型可以赋予任意值，但不允许调用任意的方法

let list: any[] = [1, true, 'str']

// void
function warnUser(): void {
    console.log('no return value');
}
let unusable: void; // 报错
unusable = 1;
unusable = 's';
unusable = undefined;
unusable = null;

// Null Undefined
let u: undefined = undefined;
let n: null = null;
let arr: number[] = [1, undefined, null];

// never
function error(msg: string): never {
    throw new Error(msg);
}

function fail() {
    return error('something failed');
}

function infiniteLoop(): never {
    while (true) {
    }
}

// object

declare function create(o: object | null): void;
// create({ prop: 0 })
// create(null)
// create(undefined)

// create(1)
// create('str')

// 类型断言

// let someVal: any = 'this is a string'; // 16
// // let someVal: any = 123456; //undefined
// let strLen: number = (<string>someVal).length;

let someVal: any = 'this is a string';
let strLen: number = (someVal as string).length;

console.log(strLen);


let aa:number;
let bb:any = 1;
aa = bb;
console.log(aa);
