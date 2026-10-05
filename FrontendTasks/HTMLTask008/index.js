// Task 1
number = 21;
if (number % 3 == 0 && number % 7 == 0) {
    console.log("Divisible by both 3 and 7");
}

// Task 2
n = 10;
m = 25;
count = 0;
for (let i = n; i < m; i++) {
    if (i % 2 == 1)
        count++;
}
console.log(count);

// Task 3 
n = 10;
m = 25;
sum = 0;
for (let i = n; i < m; i++) {
    if (i % 2 == 1)
        sum += i;
}
console.log(sum);

// Task 4
number = 13;
isPrime = true;
for (let i = 2; i <= number ** (1 / 2); i++) {
    if (number % i == 0) {
        isPrime = false;
        break;
    }
}
if (isPrime) {
    console.log("Prime number");
} else {
    console.log("Not a prime number");
}

// Task 5
array = [5, 12, 8, 130, 44];
sum = 0;
for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 == 0)
        sum += array[i];
}
console.log(sum);

// Task 6
function sumEvenSquares(arr) {
    return arr.reduce((acc, v) => {
        if (typeof v === 'number' && v % 2 === 0) {
            return acc + v * v;
        }
        return acc;
    }, 0);
}
console.log(sumEvenSquares([1, 2, 3, 4, 5]));

// Task 7
function sumBetween(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        return "Hər iki parametr real rəqəm olmalıdır.";
    }
    var start = Math.min(a, b);
    var end = Math.max(a, b);

    var sum = 0;
    for (var i = start; i <= end; i++) {
        sum += i;
    }

    return sum;
}
console.log(sumBetween(3, 7));

// Task 8
class CustomMatch {
    constructor(value) {
        this.value = value;
    }
    plus(n) {
        this.value += n;
        return this;
    }

    minus(n) {
        this.value -= n;
        return this;
    }

    multiply(n) {
        this.value *= n;
        return this;
    }

    divide(n) {
        this.value /= n;
        return this;
    }
}
const result = new CustomMatch(10).plus(5).minus(3).multiply(4).divide(2);
console.log(result.value);

// Task 9
function addMonthNumbers(arr) {
    // var result = arr.map(function (month) {
    //     switch (month) {
    //         case "January":
    //             return 1;
    //         case "February":
    //             return 2;
    //         case "March":
    //             return 3;
    //         case "April":
    //             return 4;
    //         case "May":
    //             return 5;
    //         case "June":
    //             return 6;
    //         case "July":
    //             return 7;
    //         case "August":
    //             return 8;
    //         case "September":
    //             return 9;
    //         case "October":
    //             return 10;
    //         case "November":
    //             return 11;
    //         case "December":
    //             return 12;
    //         default:
    //             return 0;
    //     }
    // }).reduce(function (acc, val) {
        
    // }, 0);

    // return result;
    
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i] + "-" + (i + 1));
  }

  return result;
}
console.log(addMonthNumbers(["January", "March", "December"]));

// Task 10
function wordLetterCounts(str) {
    var words = str.trim().split(' ');
    var result = [];

    for (var i = 0; i < words.length; i++) {
        result.push(words[i].length);
    }

    return result;
}
console.log(wordLetterCounts("Hello world from JavaScript"));