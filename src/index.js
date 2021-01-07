import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';



//Declaring React-Bootstrap elements
const Flexbox = styled.div`
  display:flex;
  flex-wrap:wrap;
  min-width:275px;`

const Input = styled.input`
  margin:1em;`

const StyledButton = styled(Button)`
  margin:1em;`
  
/**
  * @desc contains layout and functionality for user-input
  * @return jsx for user-input fields
*/
function Search(){
  return(
    
    <Flexbox id='search-field'>
      <StoreSelect/>
      <div>
        <label htmlFor='search'>Product:</label>
        <Input id='search'></Input>
        <label htmlFor='availability-check'>Include Out of Stock</label>
        <input type='checkbox' id='stockCheck'></input>
      </div>  
      <StyledButton variant='primary' onClick={handleClick}>Search</StyledButton>
    </Flexbox>  
  );
}

/**
  * @desc post-code entry component
  * @return jsx for postcode entry
*/
function StoreSelect(){
  
  return (
    <div>
      <label htmlFor='postCode'>Post Code:</label>
      <Input id='postCode'></Input>
    </div>
  )

}

/**
  * @desc handler for search function, renders Results component
*/
async function handleClick(){
  const search = document.getElementById('search').value;
  const code = document.getElementById('postCode').value;

  let stockCheck = false;
  if (document.getElementById('stockCheck').checked){
    stockCheck = true;
  }

  const nearbyStores = await storeReq(code);
  const store = nearbyStores.Stores[0].Id;
  const storeName = nearbyStores.Stores[0].Name;

  const data = await searchReq(search,store);

  const results = <Results data={data} stockCheck={stockCheck} storeName={storeName}/>
  ReactDOM.render(
    results, document.getElementById('results')
  );
}


/**
  * @desc requests nearby store data from server
  * @param postCode post-code entered by user in field
  * @return json object with nearby store data
*/
function storeReq(postCode){
  const url = `http://localhost:3001/storeGet?postCode=${postCode}`;
  return fetch(url)
        .then(response => response.json())
        .catch(function(e) {
          console.log(e);
        });
}

/**
  * @desc requests inventory data from server
  * @param search product name to be queried
  * @param store number of store to be queried
  * @return json object with product data
*/
function searchReq(search,store){
  const url = `http://localhost:3001/fetch?search=${search}&store=${store}`;
  return fetch(url)
        .then(response => response.json())
        .catch(function(e) {
          console.log(e);
        });
}

/**
  * @desc Results component, packs relevant objects into array from raw json
  * @param props.data product json object
  * @param props.stockCheck OOS tickbox value
  * @param props.storeName name of store
  * @return jsx of store name and results
*/
function Results(props){
  const data = props.data;
  const stockCheck = props.stockCheck;
  const storeName = props.storeName;

  //Create array of elements for display
  let products = [];
  if (stockCheck) {
    for (const attr in data.Products) {
      products.push(<Product item={data.Products[attr]}/>)
    }
  }else {
    for (const attr in data.Products) {
      if ((data.Products[attr].Products[0].Inventory.availableinventoryqty > 0) && (data.Products[attr].Products[0].IsForCollection === true)){
        products.push(<Product item={data.Products[attr]}/>)  
      }
      
    }
  }
  

  return (
    <div>
      <h2>{storeName}</h2>
      <Flexbox>
        {products}
      </Flexbox>
    </div>
  )
 
}

/**
  * @desc creates individual product cards for display
  * @param item object with data for individual product
  * @return jsx for product card
*/
function Product(props){
  let name = props.item.Name;
  name = name.replace('<br>', ' ');
  const soh = props.item.Products[0].Inventory.availableinventoryqty;
  const stockcode = props.item.Products[0].Stockcode;
  const singlePrice = props.item.Products[0].Prices.singleprice;
  let promoPrice;
  let casePrice;

  if (props.item.Products[0].Prices.hasOwnProperty('promoprice')){
    promoPrice = <ListGroupItem>Promo: {props.item.Products[0].Prices.promoprice.Value} {props.item.Products[0].Prices.promoprice.Message}</ListGroupItem>
  }
  if (props.item.Products[0].Prices.hasOwnProperty('caseprice')){
    casePrice = <ListGroupItem>Case: {props.item.Products[0].Prices.caseprice.Value} {props.item.Products[0].Prices.caseprice.Message}</ListGroupItem>
  }

  return(
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Stockcode: {stockcode}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Stock On Hand: {soh}</Card.Subtitle>
      </Card.Body>
      <ListGroup className="list-group-flush">
          {promoPrice}
          <ListGroupItem>Single: {singlePrice.Value} {singlePrice.Message}</ListGroupItem>
          {casePrice}
        </ListGroup>
    </Card>   
  )
}

//Main renderer
ReactDOM.render(
  <React.StrictMode>
    <Search />
  </React.StrictMode>,
  document.getElementById('input-field')
);

