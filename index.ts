Object.defineProperty(Function.prototype, "myBind", {
  value: function (objectContext: Record<string | symbol, any>, ...arg: any[]) {
    let symbol: symbol = Symbol("id");
    objectContext[symbol] = this;

    return function (...args: any[]) {
      let result = objectContext[symbol](...arg.concat(...args));
      delete objectContext[symbol];
      return result;
    };
  },
});

Object.defineProperty(Array.prototype, "myForEach", {
  value: function (
    callback: (elem: any, index?: number, thisArray?: any) => void
  ) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  },
});
Object.defineProperty(Array.prototype, "myMap", {
  value: function (
    callback: (elem: any, index?: number, thisArray?: any) => any[]
  ) {
    const resultArray: any[] = [];
    for (let i = 0; i < this.length; i++) {
      resultArray.push(callback(this[i], i, this));
    }
    return resultArray;
  },
});
Object.defineProperty(Array.prototype, "myFilter", {
  value: function (
    callback: (elem: any, index?: number, thisArray?: any) => any[]
  ) {
    const resultArray: any[] = [];
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this) && resultArray.push(callback(this[i]));
    }
    return resultArray;
  },
});

Object.defineProperty(Array.prototype, "myReduce", {
  value: function (
    callback: (acum: any, elem: any, index?: number, thisArray?: any) => any,
    acum?: any
  ) {
    acum = acum ?? this[0];
    for (let i = acum === this[0] ? 1 : 0; i < this.length; i++) {
      acum = callback(acum, this[i], i, this);
    }
    return acum;
  },
});

Object.defineProperty(Function.prototype, "myCall", {
  value: function (objectContext: Record<string | symbol, any>, ...arg: any) {
    let symbol: symbol = Symbol("id");
    objectContext[symbol] = this;
    let result = objectContext[symbol](...arg);
    delete objectContext[symbol];
    return result;
  },
});

function* generatorFibonacci(number: number): IterableIterator<number> {
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
    let next: number = 1;
    let fibonacci = 0;
    while (++this.step <= this.maxNumber) {
      yield (fibonacci += current);
      current = next;
      next = fibonacci;
    }
  },
};
