export const CONSTANTS = {
  ANNUAL_DIVIDENDS_ALLOWANCE: 1000,
  TAX_RATES: {
    basic: 0.0875,
    higher: 0.3375,
    additional: 0.3935,
  },
}

export class Calculator {
  dividends: number

  constructor(dividends: number) {
    this.dividends = dividends
  }

  getTaxRate() {
    if (this.dividends > 125140) {
      return CONSTANTS.TAX_RATES.additional
    }

    return this.dividends > 50271
      ? CONSTANTS.TAX_RATES.higher
      : CONSTANTS.TAX_RATES.basic
  }

  getTaxableAmount() {
    return Math.max(this.dividends - CONSTANTS.ANNUAL_DIVIDENDS_ALLOWANCE, 0)
  }

  getTaxPayable() {
    return this.getTaxableAmount() * this.getTaxRate()
  }

  getGrossDividends() {
    return this.dividends - this.getTaxPayable()
  }
}
