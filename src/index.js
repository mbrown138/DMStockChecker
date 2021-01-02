import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';


/*document.cookie ='w-rsjhf=PGcgdD0iY2RiMzJhNmE1ODY1NDFkMzlkZTVmYTZiM2FlNGZlNDdtcndtbWJieXViIiAvPg==; ARRAffinity=329e4c44eb196c5c60ae7386067c7a1d9b57a752c10d3445a00453019855ab9e; ARRAffinitySameSite=329e4c44eb196c5c60ae7386067c7a1d9b57a752c10d3445a00453019855ab9e; bm_sz=2AE4F270D42C968272B852E58E446BEB~YAAQUwUgF7ZneK11AQAAzpaevAn1D//pbmjHgXDYTZSEos4/j0bZjwEeIKflvkWwk9cM4+L72LmjD9tXYjvIe7DZ3BZcr9t55xcVWwIhs+W8oUi7XW+9q2Rajk6D4J6enttWzcdXuc5vRtbGWDzBMyNiMT6rajlZJfenoi79Fwe7ALyiDvO3iP/8uPkmR95I1LrNZZ2mEw==; _abck=BF55C6C3487EFB4774FB43C64BA8E277~-1~YAAQUwUgF7dneK11AQAAzpaevATNkLpxBa+2Ac4gBoaSkqJLMLBjZjhFfG0IfSd4Vn/DMwoAw8k5S69vZ5EVJ+T8TaQLn0oELJKUEiLuiwWNgFVexASgDqc8pD66Wl5bxuHwSggr8htZV57/kFynOZt1KKKU7/AQ6pmFOY7ATYQX/PPo1JzIyxNsH/aBCg/kduHmke0cZdvGXJprDy4szUALfoGXGPeSX5aNBcGCu+se8mML4VepSVFmw1Vc/U4eLL3QKZhpmrxguStYyXNlABjvCSs0q87bJ9eIRW4Wdmn12EWWzGW1NMfUInW8LAHXXg==~-1~-1~-1; bm_sv=B2A2449640F9094F889614C1A514D33B~khxO7C2z6YlCFlsVECAls/ALnp74H1P2UO8dWvB1xjL2IhDQrm6+qoOVZa09JUP3CxMMwWeBr0zsN1vdqPW0WJ/OLVoC/N/hJobWT6J1m9NFkqrQ03E73vgXgottnzAkLcPuyWbXa2vS3bo79DeZ8T3n9O1hRKKH9q3jI0cD9a4=; ak_bmsc=E6951C978FB0305A759753CA368147EE17200553B2460000EF36AD5FEB488017~ploGxzwY93dZIs0nMdSUzmJipmYNQHrVToTqzeqeD7qYR7bKi8PWJIBwYny9j2wNlJu9ER9PqMrKBM35HJB7G4rO+clHD/WH+/pWGC92XJ/SNH5fWmxmULVS8gXq6324mgnPZR3hsHfZ4WKnuRgHFzBP/6Y0t8WZstZIwhENn7UQNSElfM3kbdbIhEUOR0DD74BYg9bk06y47QVf9NLrjPQoAvMHC0wWqypNrATdA8dApinUCKUJx9kywobZJguNO4; w-aqwerhpi=adm-p,i-1568,p-1568,pk-1568,is-dCrSYXpuE58=; w-arjshtsw=xe5c772af6337483886ff5428ae3ff2d2xpunpaele';*/

const stores = require('./stores.json');

const Flexbox = styled.div`
  display:flex;
  flex-wrap:wrap;
  min-width:275px;`

const Input = styled.input`
  margin:1em;`

const StyledButton = styled(Button)`
  margin:1em;`
  
//Search field
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

function StoreSelect(){
  
  return (
    <div>
      <label htmlFor='store'>Store:</label>
      <Input id='store'></Input>
    </div>
  )

}
//Search handler
async function handleClick(){
  const search = document.getElementById('search').value;
  const store = document.getElementById('store').value;

  let stockCheck = false;
  if (document.getElementById('stockCheck').checked){
    stockCheck = true;
  }

  const data = await searchReq(search,store);

  const results = <Results data={data} stockCheck={stockCheck}/>
  ReactDOM.render(
    results, document.getElementById('results')
  );
}

//Query request
function searchReq(search,store){
  const url = `http://localhost:3001/fetch?search=${search}&store=${store}`;
  return fetch(url)
        .then(response => response.json())
        .catch(function(e) {
          console.log(e);
        });
}

//Results display
function Results(props){
  const data = props.data;
  const stockCheck = props.stockCheck;

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
  

  console.log(data);
  return (
    <Flexbox>
      {products}
    </Flexbox>
  )
 
}

//Creates individual product results
function Product(props){
  let name = props.item.Name;
  name = name.replace('<br>', ' ');
  const soh = props.item.Products[0].Inventory.availableinventoryqty;
  const stockcode = props.item.Products[0].Stockcode;
  const singlePrice = props.item.Products[0].Prices.singleprice;
  let promoPrice;
  let casePrice;
  //let limitedStock;

  if (props.item.Products[0].Prices.hasOwnProperty('promoprice')){
    promoPrice = <ListGroupItem>Promo: {props.item.Products[0].Prices.promoprice.Value} {props.item.Products[0].Prices.promoprice.Message}</ListGroupItem>
  }
  if (props.item.Products[0].Prices.hasOwnProperty('caseprice')){
    casePrice = <ListGroupItem>Case: {props.item.Products[0].Prices.caseprice.Value} {props.item.Products[0].Prices.caseprice.Message}</ListGroupItem>
  }

  //if (props.item.Products[0]){}

  //const image = `https://media.danmurphys.com.au/dmo/product/${stockcode}-1.png`;

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

ReactDOM.render(
  <React.StrictMode>
    <Search />
  </React.StrictMode>,
  document.getElementById('input-field')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
