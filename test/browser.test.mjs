import test from 'ava'
import crypto from 'node:crypto'
import random from '../index.js'
import randomTest from './random.mjs'

global.window = {
  crypto: crypto.webcrypto
}

randomTest(test, random)
