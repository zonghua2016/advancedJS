// 高级类型

// 交叉类型
{
    function extend<T, U>(first: T, second: U): T & U {
        let result = <T & U>{};
        for (const id in first) {
            (<any>result)[id] = (<any>first)[id];
        }
        for (const id in second) {
            if (!result.hasOwnProperty(id)) {
                (<any>result)[id] = (<any>second)[id];
            }
        }
        return result;
    }

    class Person {
        constructor(public name: string) { }
    }

    interface Loggable {
        log(): void;
    }

    class ConsoleLogger implements Loggable {
        constructor(public msg: string) {
        }
        log() {
            console.log(`consoleLogger: ${this.msg}`)
        }
    }

    const jim = extend(new Person('Jim'), new ConsoleLogger('hello csl'));
    const n = jim.name;
    // jim.log();
}

// 联合类型

{
    // padding 可以传入任何类型，如果传入非 number 或 string 类型编译会通过，但运行时报错
    function padLeft(val: string, padding: any) {
        if (typeof padding === 'number') {
            return Array(padding + 1).join(' ') + val;
        }
        if (typeof padding === 'string') {
            return padding + val;
        }
        throw new Error(`Expected string or number, got '${padding}`);
    }

    console.log(padLeft('hello world!', 4));
    console.log(padLeft('hello world!', '1234'));
    // console.log(padLeft('hello world!', []));  // 编译会通过，但运行时报错
}
{
    function padLeft2(val: string, padding: string | number | boolean) {
        if (typeof padding === 'number') {
            return Array(padding + 1).join(' ') + val;
        }
        if (typeof padding === 'string') {
            return padding + val;
        }
        throw new Error(`Expected string or number, got '${padding}`);
    }
    // console.log(padLeft2('hello world!', true));
    // console.log(padLeft2('hello world!', [])); // 编译报错：类型“undefined[]”的参数不能赋给类型“string | number”的参数。不能将类型“undefined[]”分配给类型“string”
}
{
    interface Bird {
        fly(): any;
        layEggs(): any;
    }

    interface Fish {
        swim(): void;
        layEggs(): void;
    }

    function getSmallPet(): Bird | Fish {
        return;
    }

    let pet = getSmallPet();
    // pet.layEggs(); // 只有访问联合类型的共有属性才能保证编译通过
    // pet.fly(); // 类型“Bird | Fish”上不存在属性“fly”。类型“Fish”上不存在属性“fly”
    // pet.swim(); // 类型“Bird | Fish”上不存在属性“fly”。类型“Fish”上不存在属性“fly
}

// 类型保护与区分类型

// 用于自定义的类型保护
{
    interface Bird {
        fly(): any;
        layEggs(): any;
    }

    interface Fish {
        swim(): void;
        layEggs(): void;
    }
    function isFish(pet: Fish | Bird): pet is Fish {
        return (<Fish>pet).swim !== undefined;
    }

    let pet: Fish | Bird = {
        fly() {
            console.log('flying');
        },
        layEggs() {
            console.log('layEggs');
        }
    }
    if (isFish(pet)) {
        pet.swim()
    } else {
        pet.fly()
    }
}

// typeof 类型保护

{
    // 使用联合类型写 padLeft 函数代码
    function isNumber(x: any): x is number {
        return typeof x === 'number';
    }
    function isString(x: any): x is string {
        return typeof x === 'string';
    }
    function padLeft3(val: string, padding: string | number) {
        if (isNumber(padding)) {
            return Array(padding + 1).join(' ') + val;
        }
        if (isString(padding)) {
            return padding + val;
        }
        throw new Error(`Expected string or number, got '${padding}`);
    }
    function padLeft4(val: string, padding: string | number) {
        if (typeof padding === 'number') {
            return Array(padding + 1).join(' ') + val;
        }
        if (typeof padding === 'string') {
            return padding + val;
        }
        throw new Error(`Expected string or number, got '${padding}`);
    }
}

// instanceof 类型保护

{
    interface Padder {
        getPaddingString(): string
    }

    class SpaceRepeatingPadder implements Padder {
        constructor(private numSpaces: number) { }
        getPaddingString(): string {
            return Array(this.numSpaces + 1).join(' ');
        }
    }

    class StringPadder implements Padder {
        constructor(private value: string) { }
        getPaddingString(): string {
            return this.value;
        }
    }

    function getRandomPadder() {
        return Math.random() < .5 ?
            new SpaceRepeatingPadder(4) :
            new StringPadder(' ')
    }

    let padder: Padder = getRandomPadder();

    if (padder instanceof SpaceRepeatingPadder) {
        padder; // 类型细化为 SpaceRepeatingPadder
    }

    if (padder instanceof StringPadder) {
        padder; // 类型细化为 StringPadder
    }

}

// 可以为 null 的类型

{
    let s: string | null = 'foo';
    s = null;
    let ne: any = null;
}
{
    // 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined
    // 可选参数
    function f(x: number, y?: number) {
        return x + (y || 0);
    }
    // console.log(f(1, 2)); // 3
    // console.log(f(1)); // 1
    // console.log(f(1, undefined)); // 1
    // console.log(f(1, null)); // error, 'null' is not assignable to 'number | undefined'
}
{
    // 可选属性
    class C {
        a: number;
        b?: number
    }

    let c = new C();
    c.a = 12;
    c.a = undefined;
    c.b = 13;
    c.b = undefined;
    c.b = null;
}

// 类型保护和类型断言

{
    function f1(sn: string | null): string {
        return sn || 'default';
    }

    function broken(name: string | null): string {
        function postfix(epithet: string) {
            return `${name.charAt(0)}. the ${epithet}`; // error  name is possibly null
        }
        name = name || 'Bob';
        return postfix('great');
    }
    // console.log(broken('tzh'));
    // console.log(broken(null));

    function fixed(name: string | null): string {
        function postfix(epithet: string) {
            return `${name!.charAt(0)}. the ${epithet}`; // error  name is possibly null
        }
        name = name || 'Bob';
        return postfix('great');
    }
    // console.log(fixed('tzh'));
    // console.log(fixed(null));
}

// 类型别名
{
    type Name = string;
    type NameResolver = () => string;
    type NameOrResolver = Name | NameResolver;
    function getName(n: NameOrResolver): Name {
        if (typeof n === 'string') {
            return n;
        } else {
            return n();
        }
    }
    // 类型别名也可以是泛型
    type Container<T> = { value: T };

    type Tree<T> = {
        value: T;
        left: Tree<T>;
        right: Tree<T>;
    }

    // 与交叉类型一起使用
    type LinkedList<T> = T & { next: LinkedList<T> };

    interface Person {
        name: string;
    }

    var person: LinkedList<Person>;
    // var s = person.name;
    // var s = person.next.name;
    // var s = person.next.next.name;

    // 类型不能出现在声明右侧的任何地方
    type Yikes = Array<Yikes>;
}

// 接口 vs 类型别名
{
    type Alias = { num: number };
    interface Interface {
        num: number;
    }
    // declare function aliased(arg: Alias): Alias;
    // declare function interfaced(arg: Interface): Interface;
}

// 字符串字面量类型
{
    type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
    class UIElement {
        animate(dx: number, dy: number, easing: Easing) {
            if (easing === 'ease-in') {
            } else if (easing === 'ease-out') {
            } else { }
        }
    }
    let button = new UIElement();
    button.animate(0, 0, 'ease-out');
    button.animate(0, 0, 'uneasy');
}

{
    // 字符串字面量类型用于区分函数重载
    function createElement(tagName: 'img'): HTMLImageElement;
    function createElement(tagName: 'input'): HTMLInputElement;
    function createElement(tagName: string): Element {
        return;
    }
}

// 数字字面量类型
// 很少使用
{
    function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
        return;
    }
}
// 枚举成员类型

// 可辨识联合
{
    // 声明将要联合的接口，每个接口都有 kind 属性，kind 属性叫做 可辨识的特征或标签
    interface Square {
        kind: 'square';
        size: number;
    }
    interface Rectangle {
        kind: 'rectangle';
        width: number;
        height: number;
    }
    interface Circle {
        kind: 'circle';
        radius: number;
    }
    interface Triangle {
        kind: 'triangle',
        width: number;
        height: number;
    }
    // 将接口联合到一起
    type Shape = Square | Rectangle | Circle | Triangle;
    // 使用可辨识联合
    function area(s: Shape): number {
        switch (s.kind) {
            case 'square': return s.size ** 2;
            case 'rectangle': return s.width * s.height;
            case 'circle': return Math.PI * s.radius ** 2;
            // case 'triangle': return Math.PI * s.width ** 2;
            // default: return assertNever(s); // 如果没有 case triangle的情况，就会报错
        }
    }
    function assertNever(x: never): never {
        throw new Error(`Unexpected object: ${x}`);
    }
}

// 完整性检查，如上

// 多态的 this 类型
{
    // 每次操作之后都返回 this 类型
    class BasicCalculator {
        public constructor(protected value: number = 0) { }
        public currentValue(): number {
            return this.value;
        }
        public add(operand: number): this {
            this.value += operand;
            return this;
        }
        public multiply(operand: number): this {
            this.value *= operand;
            return this;
        }
    }
    let v = new BasicCalculator(2);
    let res = v.multiply(5)
        .add(1)
        .currentValue();
    // console.log(res);

    class ScientficCalculator extends BasicCalculator {
        public constructor(value = 0) {
            super(value);
        }
        public sin() {
            this.value = Math.sin(this.value);
            return this;
        }
    }
    let sv = new ScientficCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
    // console.log(sv);

}

// 索引类型
{
    const oJson: object[] = [{
        id: 0,
        name: 'zs',
        age: 16,
        sex: 1,
        ads: 'asdasdf'
    }, {
        id: 1,
        name: 'ls',
        age: 15,
        sex: 0,
        ads: 'asdasdf'
    }, {
        id: 2,
        name: 'dzs',
        age: 116,
        sex: 1,
        ads: 'asdasdf'
    }, {
        id: 3,
        name: 'azas',
        age: 6,
        sex: 1,
        ads: 'asdasdf'
    }, {
        id: 4,
        name: 'zss',
        age: 16,
        sex: 1,
        ads: 'asdasdf'
    }];
    let names  = ['zs','ls']
    function pluck(o: Array<object>, names: Array<string>) {
        const res = names.map(n => o[n]);
        console.log(res);
    }
    pluck(oJson, names)
}