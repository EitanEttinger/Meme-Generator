'use strict'

let gCurrShape = {
  shape: 'rect',
  text: `Hello Baby`,
  fontSize: 50,
  fillColor: '#ffffff',
  strokeColor: '#000000',
  startPosX: 0,
  startPosY: 0,
  offsetX: 0,
  offsetY: 0,
  dX: 10,
  dY: 10,
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
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      fontSize: 20,
      width: 333,
      height: 33,
      align: 'center',
      fillColor: '#ffffff',
      strokeColor: '#000000',
      startPosX: 0,
      startPosY: 0,
      offsetX: 0,
      offsetY: 0,
      isDrag: false,
    },
    {
      txt: 'I sometimes sleep',
      fontSize: 20,
      width: 333,
      height: 33,
      align: 'center',
      fillColor: '#ffffff',
      strokeColor: '#000000',
      startPosX: 0,
      startPosY: 0,
      offsetX: 0,
      offsetY: 0,
      isDrag: false,
    },
  ],
}

function getMeme() {
  return gMeme
}

function getCurrShape() {
  return gCurrShape
}

function setLineTxt() {}

function setImg() {}
