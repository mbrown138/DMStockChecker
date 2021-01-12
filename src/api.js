/**
  * @desc requests nearby store data from server
  * @param postCode postcode or name entered by user in field
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
  
  export {storeReq, searchReq};