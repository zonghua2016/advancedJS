// symbol 值通过 Symbol 构造函数创建
let sym1 = Symbol();
let sym2 = Symbol('key'); // 可选的字符串 key

// Symbols 不可以改变且唯一
let sym3 = Symbol('key')
let sym4 = Symbol('key')
console.log(sym3===sym4); // false

// 与字符串类似，可以被用作对象属性的键
let sym5 = Symbol();
let obj = {
    [sym5]: 'value'
}
console.log(obj[sym5]); // but  error: 类型“symbol”不能作为索引类型使用

// 与计算出的属性名声明相结合来声明对象的属性和类成员
{
    const getClassNameSymbol = Symbol();

    class C {
        [getClassNameSymbol](){
            return 'C';
        }
    }

    let c = new C();
    let classname = c[getClassNameSymbol]();
    console.log(classname); // C
    
}
{
    
}