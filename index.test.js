import BoggleBoardSolver from './index'

describe('BoggleBoardSolver', () => {

  it('should solve a board of 3x3', () => {
    const board = [
       ['l', 'm', 'e'],
       ['a', 'v', 'c'],
       ['t', 'y', 'i']
    ]
    const words = BoggleBoardSolver(board, 3).solve()
    expect(words).toEqual([
      'alme', 'ame', 'ave', 'cive', 'ice', 'icy', 'ivy', 'lam', 'lame',
      'lat', 'lav', 'lave', 'lay', 'mal', 'mat', 'maty', 'may', 'tam',
      'tame', 'tav', 'tay', 'vat', 'vice', 'yam'
    ])

  })

})
