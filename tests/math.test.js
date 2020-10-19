const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

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

test('Async test demo', (done) => {
  setTimeout(() => {
    expect(1).toBe(1)
    done()
  }, 2000)
})

test('Should add two numbers', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5)
    done()
  })
})

test('Should add two numbers async/await', async () => {
  const sum = await add(10, 22)
  expect(sum).toBe(32)
})
