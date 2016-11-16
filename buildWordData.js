/* eslint-disable id-length */

import fs from 'fs'
import path from 'path'
import wordArray from 'an-array-of-english-words'
import fp from 'lodash/fp'

const wordData = fp.reduce((next, word) => {

  next.wordDict[word] = 1

  for (let i = 0; i < word.length - 1; i++) {

    const ngram = word.substring(0, i + 1)

    if (!next.wordNGrams[ngram]) {

      next.wordNGrams[ngram] = {
        [word]: 1
      }

    } else {

      next.wordNGrams[ngram][word] = 1

    }

  }

  return next

}, { wordDict: {}, wordNGrams: {} }, wordArray)

fs.writeFile(path.join(__dirname, 'wordData.json'), JSON.stringify(wordData))

