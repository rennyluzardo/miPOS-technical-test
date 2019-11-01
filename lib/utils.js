export const centsToDollar = cents => {
    let dollars = cents / 100
    return dollars
}

export const dollarsToCents = dollars => {
    if (typeof dollars !== 'string' && typeof dollars !== 'number') {
      throw new Error('Amount passed must be of type String or Number.')
    }
  
    return Math.round(100 * parseFloat(typeof dollars === 'string' ? dollars.replace(/[$,]/g, '') : dollars))
  }