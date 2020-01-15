// 接口
{
    // printLabel 有个参数，并要求该对象参数有一个名为 label 类型的为 string 的属性
    function printLabel(labelledObj: { label: string }) {
        console.log(labelledObj.label);
    }
    let myObj = { size: 10, label: 'Size 10 Object' };
    printLabel(myObj); // Size 10 Object
}
{
    // 使用接口来描述参数类型: 必须包含一个 label 属性且类型为 string
    interface LabelledVal {
        label: string;
    }
    function printLabel1(labelledObj: LabelledVal) {
        console.log(labelledObj.label);
    }
    let myObj = { size: 10, label: 'Size 10 Object' };
    printLabel(myObj); // Size 10 Object
}

// 可选属性，常应用于 option bags 模式
{
    interface SquareConfig {
        color?: string;
        width?: number;
    }
    function createSquare(config: SquareConfig): { color: string, area: number } {
        let newSquare = { color: 'red', area: 0 };
        if (config.color) {
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width ** 2;
        }
        return newSquare;
    }
    let mySqu = createSquare({ color: 'blue', width: 10 });
}

// 只读属性: 只能在对象刚创建时修改其值
{
    interface Point {
        readonly x: number;
        readonly y: number;
    }
    let p1: Point = { x: 10, y: 20 };
    // p1.x = 99; // error
}

// 额外属性检查
{
    interface SquareConfig {
        color?: string;
        width?: number;
        [prop: string]: any;
    }

    function createSquare1(config: SquareConfig): { color: string, area: number } {
        let newSquare = { color: 'red', area: 0 };
        if (config.color) {
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width ** 2;
        }
        return newSquare;
    }
    let mySquare = createSquare1({ colour: "red", width: 100 });
}
// 函数类型
{
    // 调用签名，就像是一个只有参数列表和返回值类型的函数定义，参数列表里每个参数都需要名字和类型
    // 对于函数类型检查来说，函数的参数名不需要与接口定义的名字相匹配
    // TS 类型系统会推断出参数类型
    // 函数返回值类型是通过返回值推断出来的
    interface SearchFunc {
        (source: string, subStr: string): boolean;
    }
    let mySearh: SearchFunc;
    mySearh = (source: string, subString: string) => !!~source.search(subString);
    mySearh('abced', 'e')
}
{
    interface Func {
        (add1: number, add2: string, addFunc: (add1: number, add2: string) => boolean): void;
    }
    let mult: Func;
    // 参数名字可以不一样，但是对应类型必须一直
    mult = function (add1: number, add2: string, cb) {
        console.log(cb(add1, add2));
    }

    mult(1, '2', function (a, b) {
        return a + Number(b) > 1;
    })
}

// 可索引的类型
{
    // 索引签名，描述了对象索引的类型和返回值类型
    interface StrArray {
        [index: number]: string;
    }
    // myArr 具有索引签名，这个签名表示当用 number 去索引 StrArray 时会得到 string 类型的返回值
    let myArr: StrArray;
    myArr = ['1', '2', '3'];
}
// 索引类型：字符串和数字
{
    // 可以同时使用
    class Animal {
        name: string;
    }
    class Dog extends Animal {
        breed: string;
    }
    interface NotOk {
        // 数字索引类型的返回值必须是字符串索引返回值的子类型
        [x: number]: Animal;
        [x: string]: Dog;
    }
}

{
    // 设置索引签名为只读，防止给索引赋值
    interface ReadonlyStrArr {
        readonly [index: number]: string;
    }
    let myArr: ReadonlyStrArr = ['alice', 'bob'];
    // myArr[1] = 'hello'; // error
}

//类类型
{
    // 强制一个类符合某种规则
    // 只描述公共部分，不会检查类是否具有某些私有成员
    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date): void;
    }
    class Clock implements ClockInterface {
        currentTime: Date;
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) { }
    }
}

// 类静态部分与实例部分类型的区别
{
    interface ClockConstructor {
        new(hour: number, minute: number): void;
    }
    // constructor 存在于类的静态部分，所以不再检查的范围内
    class Clock implements ClockConstructor {
        currentTime: Date;
        constructor(h: number, m: number) { }
    }
}
{
    // 我们应该直接操作类的静态部分
    interface ClockConstructor {
        new(hour: number, minute: number): ClockInterface;
    }
    interface ClockInterface {
        tick(): void;
    }

    class DigitalClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick(): void {
            console.log('beep beep');
        }
    }

    class AnalogClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick(): void {
            console.log('tick tick');
        }
    }

    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);
    }

    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);
    digital.tick()
    analog.tick()
}

// 继承接口
{
    interface Shape {
        color: string;
    }
    interface PenStroke {
        penWidth: number;
    }
    // 可继承多个接口
    interface Square extends Shape, PenStroke {
        sideLen: number;
    }
    let square = <Square>{};
    square.color = 'blue';
    square.sideLen = 10;
    // square.penWidth = 9;
    console.log(square);
}

// 混合类型
{
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }

    function getCounter(): Counter {
        let counter = <Counter>function (start: number) { };
        counter.interval = 123;
        counter.reset = function () { }
        return counter;
    }
}
// 接口继承类
{
    // 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。
    // 接口同样会继承到类的 private 和 protected 成员。
    // 这意味着当你创建了一个接口，继承了一个拥有私有或受保护的成员类时，这个接口类型只能被这个类或其子类所有实现

    class Control {
        private state: any;
    }
    interface SelectableControl extends Control {
        select(): void;
    }
    class Button extends Control implements SelectableControl{
        select(): void {
            throw new Error("Method not implemented.");
        }
    }
    class TextBox extends Control{

    }
    // SelectableControl 这个类型接口只能被 Control 这个类或其子类所实现
    class Image implements SelectableControl{
        select(): void {
            throw new Error("Method not implemented.");
        }
    }
}