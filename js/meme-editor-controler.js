'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function init() {
  gElCanvas = document.querySelector('.canvas')
  gCtx = gElCanvas.getContext('2d')

  resizeCanvas()
  addListeners()

  renderMeme()

  onSetSection('Gallery')

  const currSection = document.querySelector(`.Meme-Editor`)

  currSection.classList.add('hidden')
}

function renderMeme() {
  // const gCurrShape = getCurrShape()

  const meme = getMeme()
  const { selectedImgId, selectedLineIdx, lines } = getMeme()
  let gCurrShape = meme.lines[meme.selectedLineIdx]

  // IMAGE
  const elImg = document.querySelector(`.img${selectedImgId}`)
  drawImg(elImg, selectedImgId)

  // LINE SELECTED
  // IF IT'S LINE 1:
  gCurrShape.offsetX = 10
  gCurrShape.offsetY = 10
  gCurrShape.dX = gElCanvas.offsetWidth - 30
  gCurrShape.dY = 110 - 30

  drawRect(gCurrShape)

  // IF IT'S LINE 2:
  gCurrShape.offsetX = 10
  gCurrShape.offsetY = 420
  gCurrShape.dX = gElCanvas.offsetWidth - 30
  gCurrShape.dY = 110 - 30

  drawRect(gCurrShape)

  // IF IT'S LINE 3:
  gCurrShape.offsetX = 10
  gCurrShape.offsetY = 200
  gCurrShape.dX = gElCanvas.offsetWidth - 30
  gCurrShape.dY = 110 - 30

  // drawRect(gCurrShape)

  // LINE 1
  gCurrShape = lines[0]
  gCurrShape.offsetX = gElCanvas.width / 2
  gCurrShape.offsetY = 50

  drawText(gCurrShape)

  // LINE 2
  gCurrShape = lines[1]
  gCurrShape.offsetX = gElCanvas.width / 2
  gCurrShape.offsetY = gElCanvas.height - 50

  drawText(gCurrShape)
}

function onSetSection(innerText) {
  const sections = document.querySelectorAll(`.page-container`)
  console.log('innerText', innerText)

  sections.forEach((page) => page.classList.add('hidden'))
  const currSection = document.querySelector(`.${innerText}`)
  currSection.classList.remove('hidden')
}

function onSetTextLine(textLine) {
  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  setTextLine(textLine)

  drawText(gCurrShape)
}

function onAddTextLine(textLine) {
  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  addTextLine(textLine)

  drawText(gCurrShape)
}

function setFontSize(fontSz) {
  // const gCurrShape = getCurrShape()

  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  gCurrShape.fontSize = fontSz
}

function setFillColor(fillClr) {
  // const gCurrShape = getCurrShape()

  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  gCurrShape.fillColor = fillClr
}

function setStrokeColor(strokeClr) {
  // const gCurrShape = getCurrShape()

  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  gCurrShape.strokeColor = strokeClr
}

function setShape(shp) {
  // const gCurrShape = getCurrShape()

  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  gCurrShape.shape = shp
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
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
  // const gCurrShape = getCurrShape()

  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  const { offsetX, offsetY } = gCurrShape

  gCurrShape.isDrag = true
  // Get the ev pos from mouse or touch
  getEvPos(ev)
  //Save the pos we start from
  gCurrShape.startPosX = offsetX
  gCurrShape.startPosY = offsetY
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  // const gCurrShape = getCurrShape()

  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  const { isDrag, offsetX, offsetY, startPosX, startPosY } = gCurrShape

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
  // const gCurrShape = getCurrShape()

  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  gCurrShape.isDrag = false
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  // const gCurrShape = getCurrShape()

  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

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

function draw() {
  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  const { shape } = gCurrShape

  switch (shape) {
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

function drawRect({
  lineWidth,
  offsetX,
  offsetY,
  dX,
  dY,
  strokeColor,
  fillColor,
}) {
  gCtx.lineWidth = lineWidth
  gCtx.strokeStyle = strokeColor
  gCtx.strokeRect(offsetX, offsetY, dX, dY)

  // gCtx.fillStyle = fillColor
  // gCtx.fillRect(offsetX, offsetY, dX, dY)
}

function drawArc({
  lineWidth,
  offsetX,
  offsetY,
  dX,
  dY,
  strokeColor,
  fillColor,
}) {
  gCtx.beginPath()
  gCtx.lineWidth = lineWidth
  // The x,y cords of the center , The radius, The starting angle, The ending angle, in radians
  gCtx.arc(offsetX, offsetY, dX + dY, 0, 2 * Math.PI) // Used to create a circle
  gCtx.strokeStyle = strokeColor
  gCtx.stroke()
  gCtx.fillStyle = fillColor
  gCtx.fill()
}

function drawPencil({ lineWidth, offsetX, offsetY, strokeColor, fillColor }) {
  gCtx.beginPath()
  gCtx.lineWidth = lineWidth
  // The x,y cords of the center , The radius, The starting angle, The ending angle, in radians
  gCtx.arc(offsetX, offsetY, 5, 0, 2 * Math.PI) // Used to create a circle
  gCtx.strokeStyle = strokeColor
  // gCtx.stroke()
  gCtx.fillStyle = fillColor
  gCtx.fill()
}

function drawText({
  lineWidth,
  font,
  fontSize,
  textAlign,
  textBaseline,
  offsetX,
  offsetY,
  strokeColor,
  fillColor,
  text,
}) {
  gCtx.lineWidth = lineWidth
  gCtx.strokeStyle = strokeColor
  gCtx.fillStyle = fillColor
  gCtx.font = fontSize + 'px ' + font
  gCtx.textAlign = textAlign
  gCtx.textBaseline = textBaseline

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
  onSetSection('Meme-Editor')
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}
