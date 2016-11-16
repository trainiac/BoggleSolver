/* eslint-disable id-length, no-sync */

import fs from 'fs'
import path from 'path'
import fp from 'lodash/fp'

const { wordNGrams, wordDict } = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, 'wordData.json'),
    'utf8'
  )
)

const BoggleBoardSolver = (board, minWordLength) => {

  const coordinateWithinRange = coordinate =>
    coordinate >= 0 && coordinate < board.length


  const coordinatesWithinRange = coordinates =>
    coordinateWithinRange(coordinates.x) && coordinateWithinRange(coordinates.y)

  const hasVisitedCoordinates = (coordinates, visited) => fp.find(fp.isEqual(coordinates), visited)


  const getAdjacentNodes = (x, y, context) => {

    const nodes = {
      top: {
        x,
        y: y - 1
      },
      topRight: {
        x: x + 1,
        y: y - 1
      },
      right: {
        x: x + 1,
        y
      },
      bottomRight: {
        x: x + 1,
        y: y + 1
      },
      bottom: {
        x,
        y: y + 1
      },
      bottLeft: {
        x: x - 1,
        y: y - 1
      },
      left: {
        x: x - 1,
        y
      },
      topLeft: {
        x: x - 1,
        y: y + 1
      }
    }

    return fp.pickBy(coordinates =>
      coordinatesWithinRange(coordinates) &&
      !hasVisitedCoordinates(coordinates, context.visited)
    , nodes)

  }

  const foundWords = {}

  const solve = (x, y, context) => {

    const char = board[x][y]
    const term = context.term + char

    if (term.length >= minWordLength) {

      if (wordDict[term]) {

        foundWords[term] = 1

      }

    }

    if (!wordNGrams[term]) {

      return

    }

    const nodes = getAdjacentNodes(x, y, context)

    const newContext = {
      term,
      visited: [...context.visited, { x, y }]
    }

    fp.forEach(node => {

      solve(node.x, node.y, newContext)

    }, nodes)

  }


  return {
    solve: () => {

      for (let x = 0; x < board.length; x++) {

        for (let y = 0; y < board[x].length; y++) {

          solve(x, y, { term: '', visited: [] })

        }

      }

      return fp.keys(foundWords).sort()

    }
  }

}

export default BoggleBoardSolver
