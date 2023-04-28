'use strict'

const GALLERY_STORAGE_KEY = 'ImgsDB'
const KEYWORD_SEARCH_STORAGE_KEY = 'KeywordSearchDB'
const EDITOR_STORAGE_KEY = 'CurrMemeDB'
const MEMES_STORAGE_KEY = 'MemesDB'

let gCurrShape = {
  shape: 'text',
  text: '',
  font: 'Impact',
  fontSize: '50',
  textAlign: 'center',
  textBaseline: 'middle',
  lineWidth: 3,
  fillColor: '#ffffff',
  strokeColor: '#000000',
  startPosX: 0,
  startPosY: 0,
  offsetX: 200,
  offsetY: 100,
  dX: 0,
  dY: 0,
  isDrag: false,
}

let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

let gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
  { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
  { id: 3, url: 'img/3.jpg', keywords: ['funny', 'baby'] },
  { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
  { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
  { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
  { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
  { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
  { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
  { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
  { id: 11, url: 'img/11.jpg', keywords: ['funny', 'baby'] },
  { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
  { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
  { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
  { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
  { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
  { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
  { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
]

let gMeme = {
  selectedImgId: 3,
  selectedLineIdx: 0,
  lines: [
    {
      shape: 'text',
      text: '',
      font: 'Impact',
      fontSize: '50',
      textAlign: 'center',
      textBaseline: 'middle',
      lineWidth: 3,
      fillColor: '#ffffff',
      strokeColor: '#000000',
      startPosX: 0,
      startPosY: 0,
      offsetX: 200,
      offsetY: 100,
      dX: 0,
      dY: 0,
      isDrag: false,
    },
    {
      shape: 'text',
      text: '',
      font: 'Impact',
      fontSize: '50',
      textAlign: 'center',
      textBaseline: 'middle',
      lineWidth: 3,
      fillColor: '#ffffff',
      strokeColor: '#000000',
      startPosX: 0,
      startPosY: 0,
      offsetX: 200,
      offsetY: 400,
      dX: 0,
      dY: 0,
      isDrag: false,
    },
  ],
}

let gMemes = []

function getMeme() {
  return gMeme
}

function getCurrShape() {
  return gCurrShape
}

function getMemes() {
  return gMemes
}

function setImg() {}

function setTextLine(textLine) {
  const { lines, selectedLineIdx } = gMeme

  lines[selectedLineIdx].text = textLine

  _saveToStorage()
}

function addTextLine() {
  const meme = gMeme
  const CurrLines = meme.lines

  CurrLines.push(_createLine(''))

  meme.selectedLineIdx = CurrLines.length - 2

  _saveToStorage()
}

function deleteLine() {
  const meme = gMeme
  const { lines, selectedLineIdx } = gMeme

  lines.splice(selectedLineIdx, 1)

  meme.selectedLineIdx = 0

  _saveToStorage()
}

function _createLine(textLine = '333333333') {
  return {
    shape: 'text',
    text: textLine,
    font: 'Impact',
    fontSize: '50',
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
  }
}

function createMeme(imgIdx = 3) {
  return {
    selectedImgId: imgIdx,
    selectedLineIdx: 0,
    lines: [
      {
        shape: 'text',
        text: '',
        font: 'Impact',
        fontSize: '50',
        textAlign: 'center',
        textBaseline: 'middle',
        lineWidth: 3,
        fillColor: '#ffffff',
        strokeColor: '#000000',
        startPosX: 0,
        startPosY: 0,
        offsetX: 200,
        offsetY: 100,
        dX: 0,
        dY: 0,
        isDrag: false,
      },
      {
        shape: 'text',
        text: '',
        font: 'Impact',
        fontSize: '50',
        textAlign: 'center',
        textBaseline: 'middle',
        lineWidth: 3,
        fillColor: '#ffffff',
        strokeColor: '#000000',
        startPosX: 0,
        startPosY: 0,
        offsetX: 200,
        offsetY: 400,
        dX: 0,
        dY: 0,
        isDrag: false,
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
