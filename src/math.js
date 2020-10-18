const calculateTip = (total, tipPercent = 10) => {
  const tip = (total * tipPercent) / 100
  return total + tip
}

const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
  return (temp * 1.8) + 32
}

module.exports = {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit
}
