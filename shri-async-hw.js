(() => {

    const _wrap = (fn, cb) => {
        setTimeout(() => { 
            cb(fn());
        }, Math.random() * 20);
    };
    
    const AsyncArray = function(initial) {
        if (initial && !(initial instanceof Array)) {
            throw new Error('initial value is not an array');
        }
    
        const a = initial ? Array.from(initial) : [];
    
        this.set = (index, value, cb) => _wrap(() => { a[index] = value }, cb);
        this.push = (value, cb) => _wrap(() => { a.push(value) }, cb);
    
        this.get = (index, cb) => _wrap(() => a[index], cb);
        this.pop = (cb) => _wrap(() => a.pop(), cb);
        this.length = (cb) => _wrap(() => a.length, cb);

        this.print = () => { console.log(a.toString()); };
    }
    
    const add = (a, b, cb) => _wrap(() => a + b, cb);
    const subtract = (a, b, cb) => _wrap(() => a - b, cb);
    const multiply = (a, b, cb) => _wrap(() => a * b, cb);
    const divide = (a, b, cb) => _wrap(() => a / b, cb);
    const mod = (a, b, cb) => _wrap(() => a % b, cb);

    const less = (a, b, cb) => _wrap(() => a < b, cb);
    const equal = (a, b, cb) => _wrap(() => a == b, cb);
    const lessOrEqual = (a, b, cb) => _wrap(() => a <= b, cb);
    const sqrt = (x, cb) => _wrap(() => Math.sqrt(x), cb);

    window.Homework = {
        AsyncArray,
        add,
        subtract,
        multiply,
        divide,
        mod,
        less,
        equal,
        lessOrEqual,
        sqrt
    };

    Object.freeze(window.Homework);
})();

const promisify = (fn) => {
    return (...args) => new Promise((resolve, reject) => {
        try {
            fn(...args, resolve)
        } catch (error) {
            reject(error)
        }        
    })
}

window.promisify = promisify
async function traingleS (x1, y1, x2, y2, x3, y3){
    const add = promisify(Homework.add);
    const subtract = promisify(Homework.subtract);
    const sqrt = promisify(Homework.sqrt);
    const multiply = promisify(Homework.multiply)
    const divide = promisify(Homework.divide);


    async function getLength(x, y){
        const xSq = await multiply(x, x);
        const ySq = await multiply(y, y);
        return add(xSq, ySq)
        .then(l => sqrt(l))
    }

    const a = await getLength(await subtract(x1, x2), await subtract(y1, y2));
    const b = await getLength(await subtract(x2, x3), await subtract(y2, y3));
    const c = await getLength(await subtract(x1, x3), await subtract(y1, y3));

    

    const p = await divide(await add(await add(a, b), c), 2);
    console.log({p, a, b, c})
    return sqrt(
        await multiply(
            p,
            await multiply(
                await subtract(p, a),
                await multiply(
                    await subtract(p, b),
                    await subtract(p, c)
                )
            )
        )
    )
}

window.traingleS = traingleS;