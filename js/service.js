'use strict'

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    { txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'red' },
  ],
}

// let gCircle

// function createCircle(pos) {
//   gCircle = {
//     pos,
//     size: 60,
//     color: 'blue',
//     isDrag: false,
//   }
// }

// function getCircle() {
//   return gCircle
// }

// //Check if the click is inside the circle
// function isCircleClicked(clickedPos) {
//   const { pos } = gCircle
//   // Calc the distance between two dots
//   const distance = Math.sqrt(
//     (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
//   )
//   // console.log('distance', distance)
//   //If its smaller then the radius of the circle we are inside
//   return distance <= gCircle.size
// }

// function setCircleDrag(isDrag) {
//   gCircle.isDrag = isDrag
// }

// // Move the circle in a delta, diff from the pervious pos
// function moveCircle(dx, dy) {
//   gCircle.pos.x += dx
//   gCircle.pos.y += dy
// }
