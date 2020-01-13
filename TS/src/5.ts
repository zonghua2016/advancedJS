// 枚举

// 数字枚举
{
    // 属性默认从 0 开始
    enum Direction {
        Up = 1,
        Down,
        Left,
        Right
    }

    enum Response {
        No = 0,
        Yes = 1
    }

    enum E {
        A = getVal(),
        B // 枚举成员必须具有初始化表达式
    }
    function getVal(): E {
        return E.A
    }
}
// 字符串枚举
{
    enum Direction {
        Up = 'UP',
        Down = 'DOWN',
        Left = 'LEFT',
        Right = 'RIGHT'
    }
}

// 异构枚举
{
    enum Ble {
        Yes = 'YES',
        No = 0,
    }
}
// 计算的和常量成员
{
    enum E { x } // x=0
    enum E1 { x, y, z } // x=0,y=1,z=2
    enum E2 { x = 1, y, z } // x=1,y=2,z=3
    enum FileAcess {
        None,
        Read = 1 << 1,
        Write = 1 << 2,
        ReadWrite = Read | Write,
        G = '123'.length
    }
    // None: 0
    // Read: 2
    // Write: 4
    // ReadWrite: 6
    // G: 3
    // console.log(FileAcess);


}
// 联合枚举与枚举成员的类型
{
    enum ShapeKind {
        Circle, Square
    }
    interface Circle {
        kind: ShapeKind.Circle,
        redius: number;
    }
    interface Square {
        kind: ShapeKind.Square,
        sideLen: number
    }
    let c: Circle = {
        kind: ShapeKind.Square, // 不能将类型“ShapeKind.Square”分配给类型“ShapeKind.Circle”
        redius: 10
    }
}
{
    enum E {
        Foo,
        Bar
    }
    function f(x: E) {
        // 报错：This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap
        // 首先 x 属于 E 类型的数据，所以，如果x不等于Foo，那么必定等于Bar，执行if语句体力的内容；
        // 如果x等于Foo，同样会通过判断检查，执行下面的程序
        if (x !== E.Foo || x !== E.Bar) {
        }
    }
}
// const 枚举
{
    // 常量枚举成员初始值设定项只能包含文本值和其他计算的枚举值
    const enum Enum1 {
        A = 1,
        B = A * 2
    }
    let a = Enum1.B
    console.log(a); // 2

}
// 外部枚举
{
    declare enum Enum {
        A = 1,
        B,
        C = 2
    }
}