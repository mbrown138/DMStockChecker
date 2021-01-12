import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {storeReq, searchReq} from './api';
import {Results} from './Results';
import {Flexbox, Input, StyledButton} from './styledElements'


  
/**
  * @desc contains layout and functionality for user-input
  * @return jsx for user-input fields
*/
function Search(){
  const [search, setSearch] = useState('');
  const [postCode, setPostCode] = useState('Mosman');


  return(
    
    <Flexbox id='search-field'>
      <div>
        <label htmlFor='postCode'>Post Code / Suburb:</label>
        <Input id='postCode' onChange={() => setPostCode(document.getElementById('postCode').value)}></Input>
        <label htmlFor='search'>Product:</label>
        <Input id='search' onChange={() => setSearch(document.getElementById('search').value)}></Input>
      </div>  
      <StyledButton variant='primary' onClick={() => handleClick(search,postCode)}>Search</StyledButton>
    </Flexbox>  
  );
}

/**
  * @desc handler for search function, renders Results component
  * @param search search query string
  * @param postCode postcode or suburb string
*/
async function handleClick(search,postCode){

  const nearbyStores = await storeReq(postCode);
  const store = nearbyStores.Stores[0].Id;
  const storeName = nearbyStores.Stores[0].Name;

  const data = await searchReq(search,store);

  const results = <Results data={data} storeName={storeName}/>
  ReactDOM.render(
    results, document.getElementById('results')
  );
}


//Main renderer
ReactDOM.render(
  <React.StrictMode>
    <Search />
  </React.StrictMode>,
  document.getElementById('input-field')
);

