require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3001
const path = require('path'); 
const axios = require('axios');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

// the SerpAPI version
app.get('/images', async (req, res) => {

  const word = req.query.word

  let searchData = await axios.get(`https://serpapi.com/search?engine=google&q=${word}&tbm=isch&ijn=0&api_key=${process.env.API_KEY}`)
  .then(function (res) {
    return res.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  res.json(searchData)
})

// the scraper in progress
// app.get('/proxy', async (req, response) => {

//   let searchData = await axios.get('https://www.google.com/search?tbm=isch&q=casa', {
//     headers: {
//       "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
//     }
//   })
//   .then(function (response) {
//     // response.header = "Access-Control-Allow-Origin", "*"
//     // console.log(response.data)
//     return response.data
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })

//   console.log('hit')
//   console.log(typeof await searchData)  
//   response.header("Access-Control-Allow-Origin", "*");
//   response.send(await searchData)

  
//   // console.log(req.query)
//   // const GSR = require('google-search-results-nodejs')
//   // const client = new GSR.GoogleSearchResults("537ff1f6bbd0441800874a6c8d5db51d0809a944a6e1442231ea8368147555ed")
//   // client.json({
//   // engine: req.query.engine,
//   // q: req.query.q,
//   // tbm: req.query.tbm
//   // }, (result) => {
//   //   console.log(result)
//   //   response.header("Access-Control-Allow-Origin", "*");
//   //   response.json(result)
//   // })

// })

// app.get('/', (req, res) => {
//   console.log('hi')
//   app.use(express.static('front-end-react/build'));
//   const path = require('path');
//   res.sendFile(path.resolve(__dirname, 'front-end-react', 'build', 'index.html'));
// });

// required for proper deployment to Heroku, along with adding the heroku-postbuild that goes into client, runs npm install and npm build, and adding config keys in Heroku project settings
if (process.env.NODE_ENV) {
  app.use(express.static('front-end-react/build'));
  const path = require('path');
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front-end-react', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on PORT ${port}!`))
