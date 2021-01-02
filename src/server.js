const express = require('express')
const app = express()
const axios =require('axios')

//Security?
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/fetch', function (req, res){
  gethtml(req, res);  

})

app.listen(3001)

//Get and send requested page
async function gethtml(req, res){
  const url = 'https://api.danmurphys.com.au/apis/ui/Search/products';

  let searchParams = {
    Filters: [],
    PageSize: 20,
    PageNumber: 1,
    SortType: 'Relevance',
    Location: 'ListerFacet'
  }

  searchParams.SearchTerm = req.query.search;
  const search = JSON.stringify(searchParams);

  const store = req.query.store;
  const cookie = `w-aqwerhpi=adm-p,i-${store},p-${store},pk-${store},is-dCrSYXpuE58=;`;

  console.log(search);

  const data = await getData(url, search, cookie);
  res.send(data.data);
}

function getData(url, search, cookie){
  return axios({
    url: url,
    method: 'post',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',

      'Content-Type': 'application/json',

      Cookie: cookie
    },
    data: search
    
  }
    )  
    .catch(function(e) {
      console.log(e);
    });
  }
