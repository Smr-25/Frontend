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