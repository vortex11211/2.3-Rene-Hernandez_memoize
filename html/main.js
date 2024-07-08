

function memoize(func) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache[key]) {
            return cache[key];
        }

        const result = func.apply(this, args);
        cache[key] = result;

        return result;
    };
}

function fibonacci(n) {
    if (n <= 2) {
        return 1;
    }
    else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
};


    function main() {
        let withoutMemoized = 0

const startMemoize = performance.now();
        let position = parseInt(document.getElementById("entrada").value);
        if (position >= 0) {
            let  memoized=memoize(fibonacci);
            let  fibomemized=memoized(position)
const endMemoize = performance.now(); 
            console.log("con memoize",fibomemized);
 const startTime = performance.now();           
            withoutMemoized = fibonacci(position);
            const endTime=performance.now();
            console.log("sin memoize",withoutMemoized);
            document.getElementById("resultado2").innerHTML = `: ${fibomemized} tardo en ejecutarse ${endMemoize - startMemoize} ms `;
           document.getElementById("resultado1").innerHTML = `: ${withoutMemoized} tardo en ejecutarse ${endTime - startTime} ms`;


        } else {
            alert("Error, introdue un numero entero");

        }
    };

