"use strict";
Object.defineProperty(Function.prototype, "myBind", {
    value: function (objectContext, ...arg) {
        let symbol = Symbol("id");
        objectContext[symbol] = this;
        return function (...args) {
            let result = objectContext[symbol](...arg.concat(...args));
            delete objectContext[symbol];
            return result;
        };
    },
});
Object.defineProperty(Array.prototype, "myForEach", {
    value: function (callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i, this);
        }
    },
});
Object.defineProperty(Array.prototype, "myMap", {
    value: function (callback) {
        const resultArray = [];
        for (let i = 0; i < this.length; i++) {
            resultArray.push(callback(this[i], i, this));
        }
        return resultArray;
    },
});
Object.defineProperty(Array.prototype, "myFilter", {
    value: function (callback) {
        const resultArray = [];
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i, this) && resultArray.push(callback(this[i]));
        }
        return resultArray;
    },
});
Object.defineProperty(Array.prototype, "myReduce", {
    value: function (callback, acum) {
        acum = acum ?? this[0];
        for (let i = acum === this[0] ? 1 : 0; i < this.length; i++) {
            acum = callback(acum, this[i], i, this);
        }
        return acum;
    },
});
Object.defineProperty(Function.prototype, "myCall", {
    value: function (objectContext, ...arg) {
        let symbol = Symbol("id");
        objectContext[symbol] = this;
        let result = objectContext[symbol](...arg);
        delete objectContext[symbol];
        return result;
    },
});
function* generatorFibonacci(number) {
    let fibonacci = 0;
    let current = 0;
    let next = 1;
    let i = 0;
    while (++i <= number) {
        yield (fibonacci += current);
        current = next;
        next = fibonacci;
    }
}
let objectFibonacci = {
    step: 0,
    maxNumber: 30,
    *[Symbol.iterator]() {
        let current = 0;
        let next = 1;
        let fibonacci = 0;
        while (++this.step <= this.maxNumber) {
            yield (fibonacci += current);
            current = next;
            next = fibonacci;
        }
    },
};
