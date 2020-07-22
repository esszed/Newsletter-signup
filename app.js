const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/signup.html`)
})

app.post('/', (req, res) => {
  let firstName = req.body.fName
  let lastName = req.body.lName
  let email = req.body.mail
  let data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
  let jsonData = JSON.stringify(data)
  const options = {
    url: '',
    method: 'POST',
    headers: {
      Authorization: ''
    },
    body: jsonData
  }

  request(options, (error, response, body) => {
    if (error) {
      console.log(error)
      res.sendFile(`${__dirname}/failure.html`)
    } else {
      if (response.statusCode == 200) {
        res.sendFile(`${__dirname}/success.html`)
      } else {
        res.sendFile(`${__dirname}/failure.html`)
      }
    }
  })
})

app.post('/failure', (req, res) => {
  res.redirect(`/`)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000')
})

// 36804bdb7e2a951c50e95126fc00b95a-

// dc8d4559fd
