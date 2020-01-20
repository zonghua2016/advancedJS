// 命名空间
interface StringValidator {
    isAcceptable(s: string): boolean;
}

let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}

class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string): boolean {
        return s.length === 5 && numberRegexp.test(s);
    }
}

let strings = ['Hello', '18923', '101'];

let validators: { [s: string]: StringValidator } = {};
validators['ZIP code'] = new ZipCodeValidator();
validators['Letters only'] = new LettersOnlyValidator();

for (const s of strings) {
    for (const name in validators) {
        let isMatch = validators[name].isAcceptable(s);
        console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
    }
}

namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    let lettersRegexp = /^[A-Za-z]+$/;
    let numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string): boolean {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string): boolean {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

let strings1 = ['Hello', '18923', '101'];

let validators1: { [s: string]: Validation.StringValidator; } = {};
validators1['ZIP code'] = new Validation.ZipCodeValidator();
validators1['Letters only'] = new Validation.LettersOnlyValidator();

for (const s of strings) {
    for (const name in validators) {
        let isMatch = validators[name].isAcceptable(s);
        console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
    }
}
