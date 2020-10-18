const calculateTip = (total, tipPercent = 10) => {
  const tip = (total * tipPercent) / 100
  return total + tip
}

module.exports = {
  calculateTip
}
