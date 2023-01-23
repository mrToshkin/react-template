import { isNumber } from '.'

describe('isNumber', () => {
  test('should return true if value is number', () => {
    expect(isNumber(777)).toBe(true)
  })

  test.each([
    [-999, true],
    [0, true],
    [999, true],
    [0.1, true],
    [[1, 2, 3], false],
    ['999', false],
    [true, false],
    [null, false],
    [undefined, false],
    [new Date(), false],
    [Number.NaN, false],
    [{ '0': 1 }, false],
    [/7/, false],
    [Symbol(), false],
    [BigInt(999), false],
  ])('with %o should return %p', (value, expected) => {
    expect(isNumber(value)).toBe(expected)
  })
})
