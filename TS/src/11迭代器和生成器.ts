// 可迭代：当一个对象实现了 Symbol.iterator 属性时，就认为他是可迭代的

// for..of 会遍历可迭代的对象，调用对象上的 Symbol.iterator 方法
// for..of 返回的是键对应的值
// for..in 返回的是对象的键列表，可以操作任何对象；它提供了查看对象属性的一种方法
{
    let arr = [1, 'str', false];
    for (const i of arr) {
        console.log(i);
    }
}
{
    let pets = new Set(["Cat", "Dog", "Hamster"]);
    pets["species"] = "mammals";

    for (let pet in pets) {
        console.log(pet); // "species"
    }

    for (let pet of pets) {
        console.log(pet); // "Cat", "Dog", "Hamster"
    }
}