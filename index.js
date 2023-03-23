function fromLE(arr, bits = 8) {
  let val = BigInt(0)
  let base = BigInt(1)
  for (const byte of arr) {
    val = val + base * BigInt(byte)
    base = base * (2n ** BigInt(bits))
  }
  return val
}

function random(F, allowInsecure = true) {
  if (typeof F !== 'bigint') {
    throw new Error('randomf: F argument must be bigint type')
  }
  if (F > 2n ** 512n) {
    throw new Error('randomf: F too large, max 2**512')
  }
  if (typeof window !== 'undefined') {
    // in browser
    if (
      typeof window.crypto !== 'undefined' &&
      typeof window.crypto.getRandomValues === 'function'
    ) {
      // webcrypto support
      const arr = new Uint32Array(16)
      window.crypto.getRandomValues(arr)
      return fromLE(arr, 32) % F
    } else {
      // no webcrypto support, fallback to math.random
      if (!allowInsecure) {
        throw new Error('randomf: No webcrypto detected')
      }
      console.warn(
        'No webcrypto support, using insecure random number generator'
      )
      const faux = Array(16)
        .fill(0)
        .map(() => Math.floor(Math.random() * 2 ** 32))
      return fromLE(faux, 32) % F
    }
  } else {
    const crypto = require('crypto')
    return BigInt(`0x${crypto.randomBytes(64).toString('hex')}`) % F
  }
}

exports.random = random
module.exports = random
