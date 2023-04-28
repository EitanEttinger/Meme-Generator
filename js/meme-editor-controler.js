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
  let meme = getMeme()
  if (!meme.lines.length) meme = createMeme(meme.selectedImgId)

  const gCurrShape = meme.lines[meme.selectedLineIdx]
  const elInputTextLine = document.querySelector(`.Text-line`)
  elInputTextLine.value = `${gCurrShape.text}`

  // IMAGE
  const { selectedImgId } = getMeme()
  const elImg = document.querySelector(`.img${selectedImgId}`)
  drawImg(elImg, selectedImgId)

  // TEXTS
  drawTextLine()

  // FRAME SELECTED
  drawFrameSelected()
}

function onSetSection(innerText) {
  const sections = document.querySelectorAll(`.page-container`)

  sections.forEach((page) => page.classList.add('hidden'))

  const currSection = document.querySelector(`.${innerText}`)
  currSection.classList.remove('hidden')

  const currTitle = document.querySelector(`.page-title`)
  currTitle.innerText = innerText
}

function onSetTextLine(textLine) {
  setTextLine(textLine)

  const elInputTextLine = document.querySelector(`.Text-line`)
  elInputTextLine.value = `${textLine}`

  renderMeme()
}

function onAddTextLine() {
  addTextLine(textLine)

  renderMeme()
}

function onDeleteLine() {
  deleteLine()

  renderMeme()
}

function onMoveLine() {
  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  meme.selectedLineIdx++
  if (!meme.lines[meme.selectedLineIdx]) meme.selectedLineIdx = 0

  const elInputTextLine = document.querySelector(`.Text-line`)
  elInputTextLine.value = `${gCurrShape.text}`

  renderMeme()
}

function onSelectImg(elImg, idImg) {
  const meme = getMeme()
  meme.selectedImgId = idImg

  renderMeme()
}

function drawImg(elImg, idImg) {
  // const elImg = new Image() // Create a new html img element
  // elImg.src = 'img/04.jpg' // Send a network req to get that image, define the img src
  // console.log('elImg:', elImg)
  // // When the image ready draw it on the canvas
  // elImg.onload = () => {
  //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  // }

  onSetSection('Meme-Editor')
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawTextLine() {
  const { lines } = getMeme()

  lines.forEach((line, idx) => {
    if (idx === null) return

    if (line.offsetX && line.offsetY) {
      drawText(line)
      return
    }

    if (idx === 0) {
      // LINE 1
      line.offsetX = gElCanvas.width / 2
      line.offsetY = 50
    } else if (idx === 1) {
      // LINE 2
      line.offsetX = gElCanvas.width / 2
      line.offsetY = gElCanvas.height - 50
    } else {
      line.offsetX = gElCanvas.width / 2
      line.offsetY = gElCanvas.height / 2
    }
    drawText(line)
  })
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

function drawFrameSelected() {
  const { selectedLineIdx } = getMeme()

  if (selectedLineIdx === null) return

  if (selectedLineIdx === 0) {
    // IF IT'S LINE 1:
    gCurrShape.offsetX = 10
    gCurrShape.offsetY = 60
    gCurrShape.dX = 470
    gCurrShape.dY = 80
  } else if (selectedLineIdx === 1) {
    // IF IT'S LINE 2:
    gCurrShape.offsetX = 10
    gCurrShape.offsetY = 360
    gCurrShape.dX = 470
    gCurrShape.dY = 80
  } else {
    // IF IT'S LINE 3+:
    gCurrShape.offsetX = 10
    gCurrShape.offsetY = 210
    gCurrShape.dX = 470
    gCurrShape.dY = 80
  }
  drawRect(gCurrShape)
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

function setFontSize(fontSz) {
  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  gCurrShape.fontSize = fontSz
}

function setFillColor(fillClr) {
  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  gCurrShape.fillColor = fillClr
}

function setStrokeColor(strokeClr) {
  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  gCurrShape.strokeColor = strokeClr
}

function setShape(shp) {
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
  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  gCurrShape.isDrag = false
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
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

function downloadImg(elLink) {
  // CLEAR
  clearCanvas()

  // IMAGE
  const { selectedImgId } = getMeme()
  const elImg = document.querySelector(`.img${selectedImgId}`)
  drawImg(elImg, selectedImgId)

  // TEXTS
  drawTextLine()

  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}
