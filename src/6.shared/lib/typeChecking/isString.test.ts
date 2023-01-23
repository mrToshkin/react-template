import { isString } from '.'

describe('isString', () => {
  test('should return true if value is string', () => {
    expect(isString('cat')).toBe(true)
  })

  test.each([
    ['999', true],
    [-999, false],
    [0, false],
    [999, false],
    [0.1, false],
    [[1, 2, 3], false],
    [true, false],
    [null, false],
    [undefined, false],
    [new Date(), false],
    [Number.NaN, false],
    [{ '0': 1 }, false],
    [/0/, false],
    [Symbol(), false],
    [BigInt(999), false],
  ])('with %o should return %p', (value, expected) => {
    expect(isString(value)).toBe(expected)
  })
})
