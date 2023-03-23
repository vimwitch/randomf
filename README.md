# randomf

Generate strong random numbers in a finite field.

Uses `node:crypto` in browser, and `webcrypto` in browser (if available). If `webcrypto` is not available in browser optionally falls back to `Math.random`.

## Usage

`npm i randomf`

```js
import random from 'randomf'

// The cardinality of the field
const F = 2n ** 256n

// Returns a strong random value
const v = randomf(F)
```

## License

MIT
