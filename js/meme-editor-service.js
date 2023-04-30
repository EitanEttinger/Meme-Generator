'use strict'

const GALLERY_STORAGE_KEY = 'ImgsDB'
const KEYWORD_SEARCH_STORAGE_KEY = 'KeywordSearchDB'
const EDITOR_STORAGE_KEY = 'CurrMemeDB'
const MEMES_STORAGE_KEY = 'MemesDB'

const gCurrShape = {
  shape: 'text',
  text: 'Enter Text Line',
  font: 'Impact',
  fontSize: 50,
  textAlign: 'center',
  textBaseline: 'middle',
  lineWidth: 3,
  fillColor: '#ffffff',
  strokeColor: '#000000',
  startPosX: 0,
  startPosY: 0,
  offsetX: 250,
  offsetY: 40,
  dX: 0,
  dY: 0,
  isDrag: false,
  isStroke: true,
}

const gKeywordSearchCountMap = { funny: 25, man: 17, kid: 5 }

const gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump', 'man'] },
  {
    id: 2,
    url: 'img/2.jpg',
    keywords: ['funny', 'dog', 'puppy', 'puppies', 'animal'],
  },
  {
    id: 3,
    url: 'img/3.jpg',
    keywords: ['funny', 'baby', 'dog', 'puppy', 'puppies', 'animal'],
  },
  {
    id: 4,
    url: 'img/4.jpg',
    keywords: ['funny', 'cat', 'animal', 'computer', 'sleep'],
  },
  { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby', 'kid', 'win'] },
  { id: 6, url: 'img/6.jpg', keywords: ['funny', 'man'] },
  { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby', 'kid'] },
  { id: 8, url: 'img/8.jpg', keywords: ['funny', 'man'] },
  { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby', 'kid'] },
  { id: 10, url: 'img/10.jpg', keywords: ['funny', 'man'] },
  { id: 11, url: 'img/11.jpg', keywords: ['funny', 'man', 'men', 'kiss'] },
  { id: 12, url: 'img/12.jpg', keywords: ['funny', 'man'] },
  { id: 13, url: 'img/13.jpg', keywords: ['funny', 'man'] },
  { id: 14, url: 'img/14.jpg', keywords: ['funny', 'man'] },
  { id: 15, url: 'img/15.jpg', keywords: ['funny', 'man'] },
  { id: 16, url: 'img/16.jpg', keywords: ['funny', 'man'] },
  { id: 17, url: 'img/17.jpg', keywords: ['funny', 'man'] },
  { id: 18, url: 'img/18.jpg', keywords: ['funny', 'baby', 'kid'] },
  { id: 19, url: 'img/19.jpg', keywords: ['funny', 'hadar', 'kid', 'cool'] },
  { id: 20, url: 'img/20.jpg', keywords: ['funny', 'man', 'men', 'what'] },
  { id: 21, url: 'img/21.jpg', keywords: ['funny', 'woman', 'beautiful'] },
  { id: 22, url: 'img/22.jpg', keywords: ['funny', 'man'] },
  { id: 23, url: 'img/23.jpg', keywords: ['funny', 'man'] },
  { id: 24, url: 'img/24.jpg', keywords: ['funny', 'man', 'men'] },
  { id: 25, url: 'img/25.jpg', keywords: ['funny', 'man', 'men', 'woman'] },
]

const gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  canvasWidth: 500,
  canvasHeight: 500,
  isUpload: false,
  elUploadImg: '',
  lines: [
    {
      shape: 'text',
      text: 'Enter Text Line',
      font: 'Impact',
      fontSize: 50,
      textAlign: 'center',
      textBaseline: 'middle',
      lineWidth: 3,
      fillColor: '#ffffff',
      strokeColor: '#000000',
      startPosX: 0,
      startPosY: 0,
      offsetX: 250,
      offsetY: 40,
      dX: 0,
      dY: 0,
      isDrag: false,
      isStroke: true,
    },
    {
      shape: 'text',
      text: 'Enter Text Line',
      font: 'Impact',
      fontSize: 50,
      textAlign: 'center',
      textBaseline: 'middle',
      lineWidth: 3,
      fillColor: '#ffffff',
      strokeColor: '#000000',
      startPosX: 0,
      startPosY: 0,
      offsetX: 250,
      offsetY: 470,
      dX: 0,
      dY: 0,
      isDrag: false,
      isStroke: true,
    },
    {
      shape: 'text',
      text: 'Enter Text Line',
      font: 'Impact',
      fontSize: 50,
      textAlign: 'center',
      textBaseline: 'middle',
      lineWidth: 3,
      fillColor: '#ffffff',
      strokeColor: '#000000',
      startPosX: 0,
      startPosY: 0,
      offsetX: 250,
      offsetY: 255,
      dX: 0,
      dY: 0,
      isDrag: false,
      isStroke: true,
    },
  ],
}

const gMemes = []

function getMeme() {
  return gMeme
}

function getCurrShape() {
  return gCurrShape
}

function getMemes() {
  return gMemes
}

function getImgs() {
  return gImgs
}

function searchImg(searchValue) {
  const imgs = getImgs()

  imgs.forEach((img) => {
    const elImg = document.querySelector(`.img${img.id}`)
    elImg.classList.remove('hidden')
  })

  if (!searchValue) return

  imgs.forEach((img) => {
    if (!img.keywords.includes(searchValue.toLowerCase())) {
      const elImg = document.querySelector(`.img${img.id}`)
      elImg.classList.add('hidden')
    }
  })
}

function setTextLine(textLine) {
  const { lines, selectedLineIdx } = gMeme

  lines[selectedLineIdx].text = textLine

  _saveToStorage()
}

function addTextLine() {
  const meme = gMeme
  const CurrLines = meme.lines

  CurrLines.push(_createLine('Enter Text Line'))

  meme.selectedLineIdx = CurrLines.length - 1

  _saveToStorage()
}

function deleteLine() {
  const meme = gMeme
  const { lines, selectedLineIdx } = gMeme

  lines.splice(selectedLineIdx, 1)

  meme.selectedLineIdx = 0

  _saveToStorage()
}

function moveLine() {
  const meme = getMeme()
  const gCurrShape = meme.lines[meme.selectedLineIdx]

  meme.selectedLineIdx++
  if (!meme.lines[meme.selectedLineIdx]) meme.selectedLineIdx = 0

  _saveToStorage()
}

function alignLine(AlignType) {
  const { lines, selectedLineIdx, canvasWidth } = getMeme()

  lines[selectedLineIdx].textAlign = AlignType

  switch (AlignType) {
    case 'start':
      lines[selectedLineIdx].offsetX = 10
      break

    case 'center':
      const centerCanvas = canvasWidth / 2
      lines[selectedLineIdx].offsetX = centerCanvas
      break

    case 'end':
      lines[selectedLineIdx].offsetX = canvasWidth - 10
      break
  }

  _saveToStorage()
}

function setFontSizeButton(deltaSize) {
  const { lines, selectedLineIdx } = getMeme()
  lines[selectedLineIdx].fontSize = parseInt(lines[selectedLineIdx].fontSize)
  lines[selectedLineIdx].fontSize += deltaSize

  const elInput = document.querySelector(`.font-size`)
  elInput.value = lines[selectedLineIdx].fontSize

  _saveToStorage()
}

function setFontSizeInput(fontSz) {
  const { lines, selectedLineIdx } = getMeme()

  lines[selectedLineIdx].fontSize = fontSz

  _saveToStorage()
}

function setFillColor(fillClr) {
  const { lines, selectedLineIdx } = getMeme()
  lines[selectedLineIdx].fillColor = fillClr

  _saveToStorage()
}

function setStrokeColor(strokeClr) {
  const { lines, selectedLineIdx } = getMeme()
  lines[selectedLineIdx].strokeColor = strokeClr

  _saveToStorage()
}

function setShape(shp) {
  const { lines, selectedLineIdx } = getMeme()
  lines[selectedLineIdx].shape = shp

  _saveToStorage()
}

function setCanvasSize() {
  const meme = getMeme()
  meme.canvasWidth = gElCanvas.width
  meme.canvasHeight = gElCanvas.height

  _saveToStorage()
}

function posLine(directionPos) {
  const { lines, selectedLineIdx } = getMeme()

  switch (directionPos) {
    case 'up':
      lines[selectedLineIdx].offsetY -= 20
      break
    case 'down':
      lines[selectedLineIdx].offsetY += 20
      break
    case 'right':
      lines[selectedLineIdx].offsetX += 20
      break
    case 'left':
      lines[selectedLineIdx].offsetX -= 20
      break
  }

  _saveToStorage()
}

function strokeLine() {
  const { lines, selectedLineIdx } = getMeme()

  lines[selectedLineIdx].isStroke = !lines[selectedLineIdx].isStroke

  _saveToStorage()
}

function selectImg(elImg, idImg) {
  const meme = getMeme()
  meme.isUpload = false
  meme.selectedImgId = idImg

  _saveToStorage()
}

function uploadImg(elImg) {
  const newImgUpload = _createImg()
  const meme = getMeme()
  const imgs = getImgs()

  meme.isUpload = true
  imgs[imgs.length - 1].url = elImg.src

  elImg.classList.add(`img${newImgUpload.id}`)
  elImg.alt = ''
  elImg.onClick = `onSelectImg(this, ${newImgUpload.id})`

  meme.elUploadImg = elImg
  meme.selectedImgId = newImgUpload.id

  // _saveToStorage()

  return elImg
}

function _createImg(keywords = ['funny']) {
  const imgs = gImgs
  const newImg = {
    id: imgs.length,
    url: `img/${imgs.length}.jpg`,
    keywords: keywords,
  }
  imgs.push(newImg)

  return newImg
}

function _createLine(textLine = 'Enter Text Line') {
  return {
    shape: 'text',
    text: textLine,
    font: 'Impact',
    fontSize: 50,
    textAlign: 'center',
    textBaseline: 'middle',
    lineWidth: 3,
    fillColor: '#ffffff',
    strokeColor: '#000000',
    startPosX: 0,
    startPosY: 0,
    offsetX: 200,
    offsetY: 250,
    dX: 0,
    dY: 0,
    isDrag: false,
    isStroke: true,
  }
}

function createMeme(imgIdx = 3) {
  return {
    selectedImgId: imgIdx,
    selectedLineIdx: 0,
    canvasWidth: 500,
    canvasHeight: 500,
    isUpload: false,
    elUploadImg: '',
    lines: [
      {
        shape: 'text',
        text: 'Enter Text Line',
        font: 'Impact',
        fontSize: 50,
        textAlign: 'center',
        textBaseline: 'middle',
        lineWidth: 3,
        fillColor: '#ffffff',
        strokeColor: '#000000',
        startPosX: 0,
        startPosY: 0,
        offsetX: 250,
        offsetY: 40,
        dX: 0,
        dY: 0,
        isDrag: false,
        isStroke: true,
      },
      {
        shape: 'text',
        text: 'Enter Text Line',
        font: 'Impact',
        fontSize: 50,
        textAlign: 'center',
        textBaseline: 'middle',
        lineWidth: 3,
        fillColor: '#ffffff',
        strokeColor: '#000000',
        startPosX: 0,
        startPosY: 0,
        offsetX: 250,
        offsetY: 460,
        dX: 0,
        dY: 0,
        isDrag: false,
        isStroke: true,
      },
    ],
  }
}

function _saveToStorage() {
  saveToStorage(GALLERY_STORAGE_KEY, gImgs)
  saveToStorage(KEYWORD_SEARCH_STORAGE_KEY, gKeywordSearchCountMap)
  saveToStorage(EDITOR_STORAGE_KEY, gMeme)
  saveToStorage(MEMES_STORAGE_KEY, gMemes)
}
