// 接口
{
    function identity(arg: number): number {
        return arg;
    }
    // 使用 any 的弊端：传入的类型和返回的类型不能保证统一
    function identity1(arg: any): any {
        return arg;
    }
    // 泛型可以保证传入类型与返回值类型一致
    function identity2<T>(arg: T): T {
        return arg;
    }
    // 明确指定 T 是 string 类型
    let output1 = identity2<string>('str1');
    // 利用类型推论
    let output2 = identity2('str2');
    // console.log(output1, output2); // str1 str2
}
// 使用泛型变量
{
    // T[] / Array<T>
    function logInentity<T>(arg: T[]): T[] {
        console.log(arg.length);
        return arg;
    }
}

// 泛型类型
{
    function identity3<T>(arg: T): T {
        return arg;
    }
    let myId: <T>(arg: T) => T = identity3;

    // 使用不同的泛型参数名
    function identity4<T>(arg: T): T {
        return arg;
    }
    // let myId4 = <U>(arg: U) => U = identity4;

    // 使用带有调用签名的对象字面量定义泛型函数
    function identity5<T>(arg: T): T {
        return arg;
    }
    let myId5: { <T>(arg: T): T } = identity5;

    // 泛型接口
    interface GenIdentity {
        <T>(arg: T): T;
    }
    function identityGen<T>(arg: T): T {
        return arg;
    }
    let myIdGen: GenIdentity = identityGen;

    // 还可以把泛型参数当做整个接口的一个参数，这样就能清晰知道使用的具体是哪个泛型类型
    interface GenIdentity6<T> {
        (arg: T): T;
    }
    function identity6<T>(arg: T): T {
        return arg;
    }
    let myId6: GenIdentity6<number> = identity6;
}

// 泛型类
{
    // 与泛型接口类似
    class GenericNumber<T>{
        zeroVal: T;
        add: (x: T, y: T) => T;
    }
    let myGenNum = new GenericNumber<number>();
    myGenNum.zeroVal = 1;
    myGenNum.add = (x, y) => x + y;
}
// 泛型约束
{
    // 保证传入的数据肯定包含 length 属性，否则报错
    interface LenWise {
        length: number;
    }
    function logIdentity<T extends LenWise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }
}

// 在泛型约束中使用类型参数
{
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }
    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a"); // okay
    getProperty(x, "m"); // error: 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数
}

// 在泛型里使用类类型
{
    function create<T>(c: { new(): T }): T {
        return new c();
    }
    // --------
    class Beekeeper {
        hasMask: boolean;
    }
    class Zookeeper {
        nametag: string;
    }
    class Animal {
        numLegs: number;
    }
    class Bee extends Animal {
        keeper: Beekeeper;
    }
    class Lion extends Animal {
        keeper: Zookeeper;
    }
    function createInstance<A extends Animal>(c: new () => A): A {
        return new c();
    }

    createInstance(Lion).keeper.nametag;
    createInstance(Bee).keeper.hasMask;
}

// 其他教程总结理解

// 函数中使用泛型
{
    // 声明一个泛型变量
    function identity<T> { }

    // 在参数中使用泛型变量
    function identity<T>(arg: T) { }

    // 在返回值中使用泛型变量
    function identity<T>(arg: T): T { }

    // 变量声明函数的写法
    let myIdentity: <T>(arg: T) => T = identity;
}

// 接口中使用泛型
{
    // 使用接口约束一部分数据类型，使用泛型变量让剩余部分变得灵活
    interface Parseer<T> {
        success: boolean,
        result: T,
        code: number,
        desc: string
    }

    // 接口泛型与函数泛型结合
    interface Array<T> {
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[]
    }
}
// class中使用泛型
{
    // 注意总结相似性
    declare namespace demo02 {
        class GenericNumber<T> {
            private value: T;
            public add: (x: T, y: T) => T
        }
    }

    // 多个泛型变量传入
    declare namespace demo02 {
        class Component<P, S> {
            privateconstructor(props: P);
            public state: S;
        }
    }
}


// 描述数组
{
    interface Array<T> {
        length: number,
        toString(): string,
        pop(): T | undefined,
        // 注意此处的含义
        push(...items: T[]): number,
        concat(...items: T[]): T[],
        join(separator?: string): string,
        reverse(): T[],
        shift(): T | undefined;
        slice(start?: number, end?: number): T[],
        sort(compareFn?: (a: T, b: T) => number): this,
        splice(start: number, deleteCount?: number): T[],
        // 注意此处的重载写法
        splice(start: number, deleteCount: number, ...items: T[]): T[],
        unshift(...items: T[]): number,
        indexOf(searchElement: T, fromIndex?: number): number,
        lastIndexOf(searchElement: T, fromIndex?: number): number,
        every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean,
        some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean,
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void,
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[],
        filter<S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[],
        filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[],
        reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T,
        reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T,
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U,
        // reduceRight 略
        // 索引调用
        [n: number]: T,
    }
}
// 描述数据返回结果
{
    // 返回数字结果
    interface Result<T> {
        success: true,
        code: number,
        descript: string,
        result: T
    }
    // ex
    function fetchData(): Promise<Result<number>> {
        return http.get('/api/demo/number');
    }

    // 犯规对象结果
    interface Person {
        name: string
        age: number
    }
    function fetchData(): Promise<Result<Person>> {
        return http.get('/api/demo/person');
    }

    // 返回数组结果
    function fetchData(): Promise<Result<Person[]>> {
        return http.get('/api/demo/person');
    }
    // 返回分页对象结果
    interface Page<T> {
        current: number,
        pageSize: number,
        total: number,
        data: T[]
    }
    function fetchData(): Promise<Result<Page<Person>>> {
        return http.get('/api/demo/person');
    }
}