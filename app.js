const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 3001
const path = require('path'); 
const axios = require('axios');

const app = express();

app.get('/proxy', async (request, response) => {

  let searchData = await axios.get('https://www.google.com/search?tbm=isch&q=casa', {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
    }
  })
  .then(function (response) {
    
    // console.log(response.data);
    // response.header = "Access-Control-Allow-Origin", "*"
    // console.log(response.data)
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  console.log('hit')
  console.log(typeof await searchData)  
  response.header("Access-Control-Allow-Origin", "*");
  response.send(await searchData)

  
  // console.log(request.query)
  // const GSR = require('google-search-results-nodejs')
  // const client = new GSR.GoogleSearchResults("537ff1f6bbd0441800874a6c8d5db51d0809a944a6e1442231ea8368147555ed")
  // client.json({
  // engine: request.query.engine,
  // q: request.query.q,
  // tbm: request.query.tbm
  // }, (result) => {
  //   console.log(result)
  //   response.header("Access-Control-Allow-Origin", "*");
  //   response.json(result)
  // })

})

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use('/proxy', createProxyMiddleware({
//     target: 'https://serpapi.com/search',
//     changeOrigin: true
// }));



// app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, 'index.html'));
// });

app.listen(port, () => console.log(`Listening on PORT ${port}!`))
