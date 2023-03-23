export default (test, random) => {
  test('should generate random values in random fields', t => {
    let F = 1n
    for (let x = 0; x < 256; x++) {
      F = F * 2n
      for (let y = 0; y < 500; y++) {
        const v = random(F)
        t.true(v < F, 'Out of range')
        t.true(v >= 0, 'Out of range')
      }
    }
  })

  test('should check average is in middle of field', t => {
    const F = 2n ** 32n
    let sum = 0n
    const count = 10000
    for (let x = 0; x < count; x++) {
      sum += random(F)
    }
    const avg = Number(sum / BigInt(count)) / Number(F)
    // check that the average is in the middle
    t.true(avg > 0.45 && avg < 0.55, 'bad avg')
  })

  test('should check that all bits are equally like to be 1 or 0', t => {
    for (let z = 1; z < 512; z++) {
      const F = 2n ** BigInt(z)
      const bits = Array(z).fill(0)
      const count = 1000
      for (let x = 0; x < count; x++) {
        const _bits = random(F).toString(2).padStart(z, '0')
        for (let y = 0; y < z; y++) {
          bits[y] += +_bits[y]
        }
      }
      // all bits should have ~50% odd of being 1
      for (let x = 0; x < z; x++) {
        // how far from 50% each bit appeared
        // e.g. if a bit appeared 55% of the time, deltaPercent is 0.05
        const deltaPercent = Math.abs(bits[x] - count / 2) / (count / 2)
        // no bit should appear significantly more frequently than others
        t.true(deltaPercent < 0.2)
      }
    }
  })

  test('should fail to generate number for field too large', t => {
    try {
      random(2n ** 512n + 1n)
    } catch (err) {
      t.pass()
    }
  })

  test('should generate number in large field', t => {
    const v = random(2n ** 381n)
    t.true(typeof v === 'bigint')
  })

  test('should generate number in small field', t => {
    const v = random(13)
    t.true(typeof v === 'bigint')
  })
}
