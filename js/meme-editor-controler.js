'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function init() {
  gElCanvas = document.querySelector('.canvas')
  gCtx = gElCanvas.getContext('2d')

  resizeCanvas()
  onSetCanvasSize()
  addListeners()

  renderMeme()

  onSetSection('Gallery')

  const currSection = document.querySelector(`.Meme-Editor`)

  currSection.classList.add('hidden')
}

function onSearchImg(searchValue) {
  searchImg(searchValue)
}

function renderMeme() {
  const meme = getMeme()
  const { lines, selectedLineIdx } = getMeme()
  if (!lines.length) meme = createMeme(meme.selectedImgId)

  const gCurrShape = lines[selectedLineIdx]
  const elInputTextLine = document.querySelector(`.Text-line`)
  elInputTextLine.value = `${gCurrShape.text}`

  // IMAGE
  const { selectedImgId } = getMeme()
  let elImg
  if (meme.isUpload) {
    elImg = meme.elUploadImg
  } else {
    elImg = document.querySelector(`.img${selectedImgId}`)
  }
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

function onAddTextLine(textLine) {
  addTextLine(textLine)

  renderMeme()
}

function onDeleteLine() {
  deleteLine()

  renderMeme()
}

function onMoveLine() {
  moveLine()

  const elInputTextLine = document.querySelector(`.Text-line`)
  elInputTextLine.value = `${gCurrShape.text}`

  renderMeme()
}

function onAlignLine(AlignType) {
  alignLine(AlignType)

  renderMeme()
}

function onSetFontSizeButton(deltaSize) {
  setFontSizeButton(deltaSize)

  renderMeme()
}

function onSetFontSizeInput(fontSz) {
  setFontSizeInput(fontSz)

  renderMeme()
}

function onPosLine(directionPos) {
  posLine(directionPos)

  renderMeme()
}

function onStrokeLine() {
  strokeLine()

  renderMeme()
}

function onSelectImg(elImg, idImg) {
  clearCanvas()

  selectImg(elImg, idImg)

  renderMeme()
}

function onSetFillColor(fillClr) {
  setFillColor(fillClr)

  renderMeme()
}

function onSetStrokeColor(strokeClr) {
  setStrokeColor(strokeClr)

  renderMeme()
}

function onSetShape(shp) {
  setShape(shp)

  renderMeme()
}

function onSetCanvasSize() {
  setCanvasSize()
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onUploadImg(elImg) {
  const elNewImg = uploadImg(elImg)

  clearCanvas()

  let elImgsContainer = document.querySelector(`.imgs-container`)
  elImgsContainer.innerHtml += elNewImg

  renderMeme()
}

function drawImg(elImg, idImg) {
  onSetSection('Meme-Editor')
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawTextLine() {
  const { lines, canvasWidth, canvasHeight } = getMeme()

  lines.forEach((line, idx) => {
    if (idx === null) return

    if (line.offsetX && line.offsetY) {
      drawText(line)
      return
    }

    if (idx === 0) {
      // LINE 1
      line.offsetX = canvasWidth / 2
      line.offsetY = 40
    } else if (idx === 1) {
      // LINE 2
      line.offsetX = canvasWidth / 2
      line.offsetY = canvasHeight - 40
    } else {
      // LINE 3+
      line.offsetX = canvasWidth / 2
      line.offsetY = canvasHeight / 2
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
  isStroke,
}) {
  gCtx.lineWidth = lineWidth
  gCtx.strokeStyle = strokeColor
  gCtx.fillStyle = fillColor
  gCtx.font = `${fontSize}px ${font}`
  gCtx.textAlign = `${textAlign}`
  gCtx.textBaseline = textBaseline

  gCtx.fillText(text, offsetX, offsetY) // Draws (fills) a given text at the given (x, y) position.

  if (!isStroke) return
  gCtx.strokeText(text, offsetX, offsetY) // Draws (strokes) a given text at the given (x, y) position.
}

function drawFrameSelected() {
  const { lines, selectedLineIdx, canvasWidth, canvasHeight } = getMeme()
  const fontSize = lines[selectedLineIdx].fontSize
  if (selectedLineIdx === null) return

  if (selectedLineIdx === 0) {
    // IF IT'S LINE 1:
    gCurrShape.offsetX = 5
    gCurrShape.offsetY = fontSize / 2 / 2
    gCurrShape.dX = canvasWidth - 10
    gCurrShape.dY = fontSize + 10
  } else if (selectedLineIdx === 1) {
    // IF IT'S LINE 2:
    gCurrShape.offsetX = 5
    gCurrShape.offsetY = canvasHeight - fontSize - 20
    gCurrShape.dX = canvasWidth - 10
    gCurrShape.dY = fontSize + 10
  } else {
    // IF IT'S LINE 3+:
    gCurrShape.offsetX = 5
    gCurrShape.offsetY = canvasHeight / 2 - fontSize / 2 - 5
    gCurrShape.dX = canvasWidth - 10
    gCurrShape.dY = fontSize + 10
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

// NOT WORX NOW --------------------------------------------------------------------------------------------------------------------------------
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
  // NOT WORX NOW --------------------------------------------------------------------------------------------------------------------------------
  // draw(ev)
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
  const meme = getMeme()
  const { selectedImgId } = getMeme()

  let elImg
  if (meme.isUpload) {
    elImg = meme.elUploadImg
  } else {
    elImg = document.querySelector(`.img${selectedImgId}`)
  }
  drawImg(elImg, selectedImgId)

  // TEXTS
  drawTextLine()

  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}
