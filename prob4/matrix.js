const ROWS = 3
const COLS = 4
let arr = [[]];
let visited = [[]];
let dirAry = [];
const matrix = [2, 3, 4, 8,
    5, 7, 9 , 12,
    1, 0, 6, 10
]

function BuildStringFromMatrix(inMatrixElements, numRows, numCols) {
    
    for (let i = 0; i < numRows; i ++) {
        arr[i] = [];
        visited[i] = [];
        for (let j = 0; j < numCols; j ++) {
            arr[i][j] = inMatrixElements[i * numCols + j]
            visited[i][j] = false
        }
    }
    dirAry.push({x:1,y:0})
    dirAry.push({x:0,y:1})
    dirAry.push({x:-1,y:0})
    dirAry.push({x:0,y:-1})

    startCycle(0, 0, 0, 0)    
}

function startCycle(row, col, dirIndex, cnt) {
    console.log(arr[row][col])
    visited[row][col] = true
    
    if (cnt == ROWS * COLS)
        return
    let dir = dirAry[dirIndex]
    
    while (col + dir.x >= COLS || col + dir.x < 0 || row + dir.y >= ROWS || row + dir.y < 0 || visited[row + dir.y][col + dir.x]) {
        dirIndex = (dirIndex + 1) % 4
        dir = dirAry[dirIndex]
    }
    
    startCycle(row + dir.y, col + dir.x, dirIndex, cnt + 1)
}

BuildStringFromMatrix(matrix, 3, 4);