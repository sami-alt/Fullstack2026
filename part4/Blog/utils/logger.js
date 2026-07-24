

const info = (...params) => {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'local') { 
      console.log(...params)
  }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'local') { 
      console.log(...params)
  }
}


module.exports = { info, error }