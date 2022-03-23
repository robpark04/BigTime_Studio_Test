# Problem 4
4) In Javascript, Without using built-in functions or imported libraries/modules, write a function with the following signature that, given a matrix of integers, returns a string with the entries of that matrix appended in clockwise order. For instance, the 3x4 matrix below:
Hint: Keep in mind there could be many different dimensions of a matrix passed in!
const Matrix = [2, 3, 4, 8,
    5, 7, 9, 12,
1, 0, 6, 10]

would make the string “2, 3, 4, 8, 12, 10, 6, 0, 1, 5, 7, 9”.
function BuildStringFromMatrix(inMatrixElements, NumRows, NumColumns)
{
// Your code goes here
}
# Solution
### Time
20 mins
### Answer
source code: matrix.js
### How to test
Step1:
```
yarn install
```
Step2:
```
node matrix.js
```