// 导出  代码查看：https://www.tslang.cn/docs/handbook/modules.html
// 导出声明
// Validator.ts
export interface StrValidator {
    isAcceptable(s: string): boolean;
}

// ZipCodeValidator.ts
export const numRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StrValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numRegexp.test(s);
    }
}

// 导出语句
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };

// 重新导出
export class ParseIntBasedZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numRegexp.test(s);
    }
}

export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator";

// or
export * from "./StringValidator"; // exports interface StringValidator
export * from "./LettersOnlyValidator"; // exports class LettersOnlyValidator
export * from "./ZipCodeValidator";  // exports class ZipCodeValidator

// 导入一个模块中的某个导出内容
import { ZipCodeValidator } from "./ZipCodeValidator";

// 可以对导入内容重命名
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();

// 将整个模块导入到一个变量，并通过它来访问模块的导出部分
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();

// 具有副作用的导入模块
// 尽管不推荐这么做，一些模块会设置一些全局状态供其它模块使用。 这些模块可能没有任何的导出或用户根本就不关注它的导出。 使用下面的方法来导入这类模块：
import "./my-module.js";


// 默认导出