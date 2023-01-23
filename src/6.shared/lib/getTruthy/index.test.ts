import { getTruthy } from '.'

describe('getTruthy should return true if value is truthy', () => {
  test.each([
    [-999, true],
    [0, false],
    [999, true],
    [0.1, true],
    ['', false],
    [[1, 2, 3], true],
    ['999', true],
    [true, true],
    [false, false],
    [null, false],
    [undefined, false],
    [new Date(), true],
    [Number.NaN, false],
    [{ '0': 1 }, true],
    [/7/, true],
    [Symbol(), true],
    [BigInt(999), true],
  ])('with %o should return %p', (value, expected) => {
    expect(getTruthy(value)).toBe(expected)
  })
})
