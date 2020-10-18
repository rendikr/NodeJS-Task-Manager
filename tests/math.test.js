const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('Should calculate total with tip', () => {
  const total = calculateTip(10, 30)

  expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10)

  expect(total).toBe(11)
})

test('Should convert 32 Fahrenheit to 0 Celcius', () => {
  const celciusTemp = fahrenheitToCelsius(32)

  expect(celciusTemp).toBe(0)
})

test('Should convert 0 Celcius to 32 Fahrenheit', () => {
  const fahrenheitTemp = celsiusToFahrenheit(0)

  expect(fahrenheitTemp).toBe(32)
})
