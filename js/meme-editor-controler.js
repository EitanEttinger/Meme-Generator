'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function init() {
  gElCanvas = document.querySelector('.canvas')
  gCtx = gElCanvas.getContext('2d')

  resizeCanvas()
  addListeners()
}

function renderMeme() {
  const meme = getMeme()
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  // Listen for resize ev
  window.addEventListener('resize', () => {
    init()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const gCurrShape = getCurrShape()
  const { offsetX, offsetY } = getCurrShape()
  gCurrShape.isDrag = true
  // Get the ev pos from mouse or touch
  getEvPos(ev)
  //Save the pos we start from
  gCurrShape.startPosX = offsetX
  gCurrShape.startPosY = offsetY
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const gCurrShape = getCurrShape()
  const { isDrag, offsetX, offsetY, startPosX, startPosY } = getCurrShape()

  if (!isDrag) return

  getEvPos(ev)
  // Calc the delta , the diff we moved
  gCurrShape.dX = Math.abs(offsetX - startPosX) * 3
  gCurrShape.dY = Math.abs(offsetY - startPosY) * 3

  // Save the last pos , we remember where we`ve been and move accordingly
  gCurrShape.startPosX = offsetX
  gCurrShape.startPosY = offsetY

  draw(ev)
}

function onUp() {
  const gCurrShape = getCurrShape()

  gCurrShape.isDrag = false
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  const gCurrShape = getCurrShape()
  // Gets the offset pos , the default pos
  gCurrShape.offsetX = ev.offsetX
  gCurrShape.offsetY = ev.offsetY
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    gCurrShape.offsetX = ev.pageX - ev.target.offsetLeft - ev.target.clientLeft
    gCurrShape.offsetX = ev.pageY - ev.target.offsetTop - ev.target.clientTop
  }
}

function setFillColor(fillClr) {
  const gCurrShape = getCurrShape()

  gCurrShape.fillColor = fillClr
}

function setStrokeColor(strokeClr) {
  const gCurrShape = getCurrShape()

  gCurrShape.strokeColor = strokeClr
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function setShape(shp) {
  const gCurrShape = getCurrShape()

  gCurrShape.shape = shp
}

function draw() {
  const { shape } = getCurrShape()

  switch (shape) {
    case 'line':
      drawLine(gCurrShape)
      break
    case 'triangle':
      drawTriangle(gCurrShape)
      break
    case 'rect':
      drawRect(gCurrShape)
      break
    case 'arc':
      drawArc(gCurrShape)
      break
    case 'pencil':
      drawPencil(gCurrShape)
      break
    case 'text':
      drawText(gCurrShape)
      break
  }
}

function drawLine({
  offsetX,
  offsetY,
  xEnd = offsetX + dX,
  yEnd = offsetY + dY,
  strokeColor,
}) {
  gCtx.beginPath() // Starts a new path -> Call this method when you want to create a new path.
  gCtx.moveTo(offsetX, offsetY) // Moves the starting point of a new path to the (x, y) coordinates.
  gCtx.lineTo(xEnd, yEnd) // Connects the last point in the current path to the specified (x, y) coordinates with a straight line.
  gCtx.lineWidth = 3
  gCtx.strokeStyle = strokeColor // Color or style to use for the lines around shapes. Default #000 (black).
  gCtx.stroke() // Strokes the current paths with the current stroke style.
}

function drawTriangle({ offsetX, offsetY, dX, dY, strokeColor, fillColor }) {
  gCtx.beginPath()
  gCtx.lineWidth = 5
  gCtx.moveTo(offsetX, offsetY)
  gCtx.lineTo(getRandomInt(0, gElCanvas.width), dX)
  gCtx.lineTo(getRandomInt(0, gElCanvas.width), dY)

  gCtx.closePath()
  gCtx.strokeStyle = strokeColor // Color or style to use for the lines around shapes. Default #000 (black).
  gCtx.stroke() // Strokes the current paths with the current stroke style.
  gCtx.fillStyle = fillColor // Color or style to use inside shapes. Default #000 (black).
  gCtx.fill() // Fills the current paths with the current fill style.
}

function drawRect({ offsetX, offsetY, dX, dY, strokeColor, fillColor }) {
  gCtx.lineWidth = 5
  gCtx.strokeStyle = strokeColor
  gCtx.strokeRect(offsetX, offsetY, dX, dY)
  gCtx.fillStyle = fillColor
  gCtx.fillRect(offsetX, offsetY, dX, dY)
}

function drawArc({ offsetX, offsetY, dX, dY, strokeColor, fillColor }) {
  gCtx.beginPath()
  gCtx.lineWidth = 5
  // The x,y cords of the center , The radius, The starting angle, The ending angle, in radians
  gCtx.arc(offsetX, offsetY, dX + dY, 0, 2 * Math.PI) // Used to create a circle
  gCtx.strokeStyle = strokeColor
  gCtx.stroke()
  gCtx.fillStyle = fillColor
  gCtx.fill()
}

function drawPencil({ offsetX, offsetY, strokeColor, fillColor }) {
  gCtx.beginPath()
  gCtx.lineWidth = 5
  // The x,y cords of the center , The radius, The starting angle, The ending angle, in radians
  gCtx.arc(offsetX, offsetY, 5, 0, 2 * Math.PI) // Used to create a circle
  gCtx.strokeStyle = strokeColor
  // gCtx.stroke()
  gCtx.fillStyle = fillColor
  gCtx.fill()
}

function drawText({ offsetX, offsetY, dX, dY, strokeColor, fillColor, text }) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = strokeColor
  gCtx.fillStyle = fillColor
  gCtx.font = `${dX + dY}px Arial`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(text, offsetX, offsetY) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, offsetX, offsetY) // Draws (strokes) a given text at the given (x, y) position.
}

function drawImg(elImg, idImg) {
  // const elImg = new Image() // Create a new html img element
  // elImg.src = 'img/04.jpg' // Send a network req to get that image, define the img src
  // console.log('elImg:', elImg)
  // // When the image ready draw it on the canvas
  // elImg.onload = () => {
  //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  // }

  const meme = getMeme()
  meme.selectedImgId = idImg

  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}
