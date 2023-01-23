import { shuffleArray } from '.'

const array = [1, '2', 30, '40', 25]

describe('shuffleArray', () => {
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('should return the same array if Math.random less than 0.5', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)

    expect(shuffleArray([...array])).toEqual([...array])
  })

  test('should return reverse array if Math.random more than 0.5', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.623456789)

    expect(shuffleArray(array)).toEqual([25, '40', 30, '2', 1])
  })
})
