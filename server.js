const express = require('express')
const app = express()

const { quotes } = require('./data')
const { getRandomElement } = require('./utils')

const PORT = process.env.PORT || 4001

app.use(express.static('public'))

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes)
  res.send({ quote: randomQuote })
})

app.get('/api/quotes', (req, res, next) => {
  const person = req.query.person
  if (person) {
    const returnArr = quotes.filter(el => {
      return el.person === person
    })
    res.send({ quotes: returnArr })
  } else {
    res.send({ quotes: quotes })
  }
})

app.post('/api/quotes', (req, res, next) => {
  const quoteQuery = req.query.quote
  const personQuery = req.query.person
  if (quoteQuery && personQuery) {
    const toPush = { quote: quoteQuery, person: personQuery }
    quotes.push(toPush)
    res.send({ quote: toPush })
  } else {
    res.status(400).send()
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})
