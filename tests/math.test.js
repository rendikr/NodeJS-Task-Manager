const { calculateTip } = require('../src/math')

test('Should calculate total with tip', () => {
  const total = calculateTip(10, 30)

  expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10)

  expect(total).toBe(11)
})
