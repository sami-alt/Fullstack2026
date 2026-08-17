

const info = (...params) => {
  console.log(...params)
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'test-local') {
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'test-local') {
    console.log(...params)
  }
}


module.exports = { info, error }