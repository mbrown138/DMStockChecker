const express = require('express')
const app = express()
const axios =require('axios')

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Product search path
app.get('/fetch', function (req, res){
  getProduct(req, res);  

})

//Store search path
app.get('/storeGet', function (req, res){
  getStore(req, res);  

})

app.listen(3001)

//Get and send product query response
async function getProduct(req, res){
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

  const data = await postData(url, search, cookie);
  res.send(data.data);
}

//Posts product query
function postData(url, search, cookie){
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

//Gets store data by postcode 
async function getStore(req, res){
  const postCode = req.query.postCode;
  let url = `https://api.danmurphys.com.au/apis/ui/StoreLocator/Stores/danmurphys?PostCode=${postCode}`;

  const data = await getData(url);
  res.send(data.data);
}

//Gets store data
function getData(url, cookie) {
  return axios({
    url: url,
    method: 'get',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',

      'Content-Type': 'application/json',
    }
  }
    )  
    .catch(function(e) {
      console.log(e);
    });
}
