// 类型推论
{
    let x = [1, 2, null];
    console.log(typeof x[2]);
}
// 最佳通用类型
{
    let zoo = [new Rhino(), new Elephant(), new Snake()];
    // 如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)[]
}

// 上下文类型
{
    function createZoo(): Animal[] {
        return [new Rhino(), new Elephant(), new Snake()];
    }
}