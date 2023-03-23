import test from 'ava'
import crypto from 'node:crypto'
import random from '../index.js'
import randomTest from './random.mjs'

global.window = {}
global.console = {
  warn: () => {}
}

randomTest(test, random)

test('should generate insecure random number', t => {
  const v = random(12512412412n)
  t.true(typeof v === 'bigint')
  t.pass()
})

test('should refuse to generate insecure random number', t => {
  try {
    random(1n, false)
    t.fail()
  } catch (err) {
    t.pass()
  }
})
