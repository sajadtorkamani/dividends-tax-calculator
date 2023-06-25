const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
})

export function formatMoney(amount: number) {
  return formatter.format(amount)
}

export function isDev() {
  return import.meta.env.DEV
}
