const get = (id) => document.getElementById(id)

const grid = get('grid');
const scoreBoard = document.getElementById('score');
const squares = document.getElementsByClassName('square');
const dotsArr = document.getElementsByClassName('pac-dot')
const modalOvelay =   document.getElementById('modal-overlay')
const squareArr = [];
const circleArr = [];
const circleArr2 = []
const triangleArr = [];
const triangleArr2 = []
let score = 0;
let pacManIndex = 0;
let ghostOldDifference = 0;
let ghostNewDifference = 0;
let currentDifference = 0;
let previousDifference = 0;
let interval = setInterval(movePacMan, 300)

//28 * 29 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]


createGrid()
createBoard()
createWall()
createPacDot()
createPacMan()


// creating grid
// the circleElement is used to create the pac man and also in conjunction with
// element2 on the eyes of ghosts.

// the triangle1 element is used for the mouth and in conjuctin with tringle2 for
// the pupil
function createGrid(){
  for(let i=0; i<layout.length; i++){
    let squareElement = document.createElement('div')
    let circleElement1 = document.createElement('div')
    let circleElement2 = document.createElement('div')
    let triangleElement1 = document.createElement('div')
    let triangleElement2 = document.createElement('div')

    squareElement.classList = 'square'
    squareArr.push(squareElement)
    circleArr.push(circleElement1)
    circleArr2.push(circleElement2)
    triangleArr.push(triangleElement1)
    triangleArr2.push(triangleElement2)
    circleElement1.appendChild(triangleElement1)
    circleElement2.appendChild(triangleElement2)
    squareElement.appendChild(circleElement1)
    squareElement.appendChild(circleElement2)
    grid.appendChild(squareElement)
  }
}

function createBoard(){
  for (const i in layout){
    if (layout[i] === 0){
      squareArr[i].classList.add('road')
    }else if (layout[i]===1){
      squareArr[i].classList.add('walls')
    }
    else if (layout[i] === 3){
      circleArr[i].classList.add('power-pellet')
    }
  }
}

function createWall(){
  for (let i = 0; i<layout.length; i++){
    if(layout[i] === 1 && layout[i+1] !== 1){
      squareArr[i].style.borderRight = 'solid blue 2px'
    }
    if(layout[i] === 1 && layout[i-1] !== 1){
      squareArr[i].style.borderLeft = 'solid blue 2px'
    }
    if(layout[i] === 1 && layout[i+29] !== 1){
      squareArr[i].style.borderBottom = 'solid blue 2px'
    }
    if(layout[i] === 1 && layout[i-29] !== 1){
      squareArr[i].style.borderTop = 'solid blue 2px'
    }
  }
}

function createPacDot(){
  for (const i in layout){
    if(layout[i]===0){
      circleArr[i].classList.add('pac-dot')
    }
  }
}


function createPacMan(){
  pacManIndex = 594
  circleArr[pacManIndex].classList.remove('pac-dot')
  circleArr[pacManIndex].classList.add('circle')
}


function controls(e){
  switch (e.key) {
    case 'ArrowLeft':
      currentDifference = -1;
      break;
    case 'ArrowUp':
      currentDifference = -29;
      break;
    case 'ArrowRight':
      currentDifference = 1;
      break;
    case 'ArrowDown':
      currentDifference = 29;
      break;
  }
}

document.addEventListener('keyup', controls)

function pacManDirection(){
  for(const i in layout){
    if(layout[i] !== 1){
      triangleArr[i].classList.remove('triangle-left')
      triangleArr[i].classList.remove('triangle-right')
      triangleArr[i].classList.remove('triangle-up')
      triangleArr[i].classList.remove('triangle-bottom')
    }
  }
  if(currentDifference === 1){
    triangleArr[pacManIndex].classList.add('triangle-right')
  }else if(currentDifference === -29){
    triangleArr[pacManIndex].classList.add('triangle-up')
  }else if(currentDifference === -1){
    triangleArr[pacManIndex].classList.add('triangle-left')
  }else if(currentDifference === 29){
    triangleArr[pacManIndex].classList.add('triangle-bottom')
  }
}


function movePacMan(){
  let oldIndex = pacManIndex + previousDifference
  let newIndex = pacManIndex + currentDifference

  if(layout[newIndex] !== 1){
    circleArr[pacManIndex].classList.remove('circle')
    circleArr[newIndex].classList.add('circle')
    pacManIndex += currentDifference;
    previousDifference = currentDifference;
  }else if(layout[oldIndex] !== 1){
    circleArr[pacManIndex].classList.remove('circle')
    circleArr[oldIndex].classList.add('circle')
    pacManIndex += previousDifference;
    currentDifference = previousDifference
  }
  pacManDirection()
  eatPacDot()
  eatsGhost()
}

function eatPacDot(){
  if(circleArr[pacManIndex].classList.contains('pac-dot')){
    circleArr[pacManIndex].classList.remove('pac-dot')
    score += 1
    scoreBoard.textContent = score
  }else if(circleArr[pacManIndex].classList.contains('power-pellet')){
    circleArr[pacManIndex].classList.remove('power-pellet')
    score += 10
    scoreBoard.textContent = score
    for (const ghost of ghostArr){
      ghost.isScared = true;
      setTimeout(function unscare(){
        ghost.isScared = false;
        squareArr[ghost.currentIndex].classList.remove('scared-ghost')
      }, 10000)
    }
  }
}





class Ghosts {
  constructor(className, startIndex, speed, color){
    this.className = className
    this.startIndex = startIndex
    this.currentIndex = startIndex
    this.speed = speed
    this.color = color
    this.isScared = false;
    this.timerId = ""
  }
}

let ghostArr = [
  new Ghosts ('dinky', 392, 300 ),
  new Ghosts ('blinky', 420, 400),
  new Ghosts ('inky', 418, 500 ),
  new Ghosts ('pinky', 422, 600)
]


function createGhost(ghost){
    squareArr[ghost.currentIndex].classList.add(ghost.className)
    squareArr[ghost.currentIndex].classList.add('ghost')
    squareArr[ghost.currentIndex].style.flexDirection ='row'
    squareArr[ghost.currentIndex].style.justifyContent ='space-evenly'
    circleArr[ghost.currentIndex].classList.add('eye')
    circleArr2[ghost.currentIndex].classList.add('eye')
    triangleArr[ghost.currentIndex].classList.add('pupil')
    triangleArr2[ghost.currentIndex].classList.add('pupil')
    if(ghost.isScared){
      squareArr[ghost.currentIndex].classList.add('scared-ghost')
  }
}
for (const ghost of ghostArr){
  createGhost(ghost)
}

function deleteGhost(ghost){
    squareArr[ghost.currentIndex].classList.remove(ghost.className)
    squareArr[ghost.currentIndex].classList.remove('ghost')
    squareArr[ghost.currentIndex].style.flexDirection ='column'
    squareArr[ghost.currentIndex].style.justifyContent ='center'
    circleArr[ghost.currentIndex].classList.remove('eye')
    circleArr2[ghost.currentIndex].classList.remove('eye')
    triangleArr[ghost.currentIndex].classList.remove('pupil')
    triangleArr2[ghost.currentIndex].classList.remove('pupil')
    if(ghost.isScared){
      squareArr[ghost.currentIndex].classList.remove('scared-ghost')
  }
}


function moveGhost(){
  for(const ghost of ghostArr){
    ghost.timerId = setInterval (function(){
      let topLeftQuadrant = [-1, -1, -29, -29, 1, 29]
      let topRightQuadrant = [1, 1, -29, -29, -1, 29]
      let bottomLeftQuadrant = [-1, -1, 29, 29, 1, -29]
      let bottomRightQuadrant = [1, 1, 29, 29, -1, -29]
      let wholeGrid = [-1, 1, -29, 29]
      let random = Math.floor(Math.random()*topLeftQuadrant.length)
      ghostNewDifference = topLeftQuadrant[random]
      let oldDirection = ghost.currentIndex + ghostOldDifference
      let newDirection = ghost.currentIndex + ghostNewDifference
      // delete old ghost
        if(
          !squareArr[newDirection].classList.contains('walls') &&
          !squareArr[newDirection].classList.contains('ghost')
          ){
            deleteGhost(ghost)
            ghost.currentIndex = newDirection
            createGhost(ghost)
            ghostOldDifference = ghostNewDifference
          }else {
            // the repitition is necessary so that isScared function can work
            // on ghosts that are not moving too.
            deleteGhost(ghost)
            ghost.currentIndex = ghost.currentIndex
            createGhost(ghost)
          }
    }, ghost.speed)
  }
}

moveGhost()

function gameOver(ghost){
  clearInterval(interval)
  modalOvelay.style.display = "block"
}

function stopGhost(ghost){
  clearInterval(ghost.timerId)
}

function eatsGhost(){
  for (const ghost of ghostArr){
    if(
      squareArr[pacManIndex].classList.contains('ghost')   &&
      !squareArr[pacManIndex].classList.contains('scared-ghost')
      ){
        triangleArr[ghost.currentIndex].classList.remove('triangle-left')
        triangleArr[ghost.currentIndex].classList.remove('triangle-right')
        triangleArr[ghost.currentIndex].classList.remove('triangle-top')
        triangleArr[ghost.currentIndex].classList.remove('triangle-bottom')
        circleArr[ghost.currentIndex].classList.remove('circle')
        console.log('this line here')
        gameOver()
        stopGhost(ghost)
      }
      if(
      pacManIndex === ghost.currentIndex &&
      squareArr[ghost.currentIndex].classList.contains('scared-ghost')
        ){
        console.log('this hits')
        deleteGhost(ghost)
        ghost.currentIndex = ghost.startIndex
        createGhost(ghost)
        score += 200;
        scoreBoard.textContent = score
    }
  }
}
