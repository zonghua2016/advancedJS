
// 类
class Greeter {
    // 属性
    greeting: string;
    // 构造函数
    constructor(msg: string) {
        this.greeting = msg;
    }
    // 方法
    greet() {
        return `hello, ${this.greeting}`;
    }
}

// console.log(new Greeter('world').greet()); // hello, world

// 继承
// // 基类
// class Animal {
//     move(distanceInMeters: number = 0) {
//         console.log(`Animal moved ${distanceInMeters}m.`);
//     }
// }
// // 子类/超类
// class Dog extends Animal {
//     bark() {
//         console.log('woof!woof!');
//     }
// }

// const dog = new Dog();
// dog.move(); //Animal moved 0m.
// dog.bark(); //woof!woof!

// class Animal {
//     name: string;
//     constructor(theName: string) { this.name = theName; }
//     move(distanceInMeters: number = 0) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`);
//     }
// }

// class Snake extends Animal {
//     constructor(name: string) { super(name); }
//     move(distanceInMeters = 5) {
//         console.log("Slithering...");
//         super.move(distanceInMeters);
//     }
// }

// class Horse extends Animal {
//     constructor(name: string) { super(name); }
//     move(distanceInMeters = 45) {
//         console.log("Galloping...");
//         super.move(distanceInMeters);
//     }
// }

// let sam = new Snake('sammy the python');
// let tom: Animal = new Horse('tommy the palomino');

// sam.move(); // sammy the python moved 5m.
// tom.move(); // tommy the palomino moved 45m.
// tom.move(34); // tommy the palomino moved 34m.

// 修饰符
// public
// 默认值为public
// class Animal {
//     public name: string;
//     public constructor(theName: string) { this.name = theName; }
//     public move(dis:number){
//         // todo
//     }
// }

// private
{
    class Animal {
        private name: string;
        constructor(theName: string) {
            this.name = theName;
        }
    }
    // new Animal('Cat').name; // 报错
    // console.log(Animal.name); // Animal

    class Rhino extends Animal {
        constructor() { super('Rhino'); }
    }

    class Employee {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }
    let animal = new Animal('Goat');
    let rhion = new Rhino();
    let employee = new Employee('Bob');

    console.log(rhion.name); // 属性“name”为私有属性，只能在类“Animal”中访问

    animal = rhion;
    // animal 和 employee 类型不一样，因为 employee 里的私有成员 name 不是 animal 里的 
    animal = employee;
}


// protected

{
    // protected成员在派生类中仍然可以访问
    class Person {
        protected name: string;
        constructor(name: string) { this.name = name; }
    }

    class Employee extends Person {
        private department: string;
        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }
        public getElevatorPitch() {
            return `hello my name is ${this.name} and i work in ${this.department}`
        }
    }
    let howard = new Employee('Howard', 'Sales');
    console.log(howard.getElevatorPitch());
    console.log(howard.department); // 属性“department”为私有属性，只能在类“Employee”中访问
    console.log(howard.name); // 属性“name”受保护，只能在类“Person”及其子类中访问
}
{
    // 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
    class Person {
        protected name: string;
        protected constructor(name: string) { this.name = name; }
    }

    class Employee extends Person {
        private department: string;
        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }
        public getElevatorPitch() {
            return `hello my name is ${this.name} and i work in ${this.department}`
        }
    }
    let howard = new Employee('Howard', 'Sales');
    console.log(howard);
    let john = new Person('John'); // 类“Person”的构造函数是受保护的，仅可在类声明中访问
}

// 只读属性 readonly
{
    class Octopus {
        readonly name: string;
        readonly numOfLegs: number = 8;
        constructor(name: string) {
            this.name = name;
        }
    }
    let dad = new Octopus('Man with the 8 strong legs');
    console.log(dad.name);
    dad.name = 'ssss'; // Cannot assign to 'name' because it is a read-only property
}
// 参数属性
{
    class Octopus {
        readonly numOfLegs: number = 8;
        constructor(readonly name: string) {
        }
    }
}
// 存取器
{
    let passcode = 'secret passcode';
    class Employee {
        private _fullName: string;
        get fullName(): string {
            return this._fullName;
        }
        // 在设置名字前通过 setter 来检测密码是否正确
        set fullName(newName: string) {
            if (passcode && passcode === 'secret passcode') {
                this._fullName = newName;
            } else {
                console.log("Error: Unauthorized update of employee!");
            }
        }
    }
    let ep = new Employee();
    ep.fullName = 'bob smith';
    if (ep.fullName) {
        console.log(ep.fullName); // bob smith
    }
}
// 静态属性
{
    class Grid {
        static origin = { x: 0, y: 0 };
        constructor(public scale: number) { }
        calcDistanceFormOrigin(point: { x: number; y: number }) {
            let xDist = point.x - Grid.origin.x;
            let yDist = point.y - Grid.origin.y;
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
    }

    let grid1 = new Grid(1.0);
    let grid2 = new Grid(5.0);
    // console.log(grid1.calcDistanceFormOrigin({ x: 10, y: 10 }));
    // console.log(grid2.calcDistanceFormOrigin({ x: 10, y: 10 }));
}
// 抽象类
{
    // 定义抽象类和在抽象类内部定义抽象方法
    abstract class Animal {
        abstract makeSound(): void;
        move(): void {
            console.log('somthing');
        }
    }
}
{
    abstract class Department {
        constructor(public name: string) { }
        printName(): void {
            console.log('Department name: ' + this.name);
        }
        abstract printMeeting(): void; // 必须在子类中实现
    }

    class AccountDepartment extends Department {
        // constructor() {
        //     super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
        // }
        printMeeting(): void {
            console.log('print meeting account');
        }

        generateReports(): void {
            console.log('Generating accounting reports...');
        }
    }

    let department: Department; //运行创建一个对抽象类型的引用
    // department = new Department(); // 错误：❌无法创建抽象类的实例
    department = new AccountDepartment('name'); // 允许对抽象子类进行实例化和赋值
    department.printMeeting(); //print meeting account
    // department.generateReports(); // 错误：❌方法再声明的抽象类中不存在
}

// 构造函数

{
    class Greeter {
        greeting: string;
        constructor(msg: string) {
            this.greeting = msg;
        }
        greet() {
            return `Hello, ${this.greeting}`;
        }
    }

    let greeter: Greeter;
    greeter = new Greeter('world');
    console.log(greeter.greet());

}
// 把类当做接口使用
{
    class Point {
        x: number;
        y: number;
    }
    interface Point3d extends Point {
        z: number;
    }
    let p3d: Point3d = { x: 1, y: 2, z: 3 };
}