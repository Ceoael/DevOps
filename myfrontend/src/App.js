import React, { useState, useEffect } from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import ProductsWrapper from './components/ProductsWrapper/ProductsWrapper';
import AddProduct from './components/AddProduct/AddProduct';
import ProductCard from './components/ProductCard/ProductCard';

import classes from './App.module.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const openModalHandler = () => {
    setShowModal(true);
  }

  const closeModalHandler = () => {
    setShowModal(false);
  }

  const addNewTelescope = ({producer, model, price}) => {
    console.log('[AddProduct] Add: ' + producer + ' ' + model + ' , ' + price + ' zł');
    //fetch(' firebase URL ')
    fetch('http://localhost:9090/telescopes', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        producer: producer,
        model: model,
        price: price 
      })
    })
    .then( response => response.json())
    .then( data => {
      console.log('Success: ', data);
      fetchDatafromDB();
    })
    .catch((error) => {
      console.error('Error', error);
    });

  }

  // const transformDataFromFirebase = (dataAsObject) => {
  //   let dataInArray = [];

  //   for( let key in dataAsObject ) {
  //       dataInArray.push({
  //           id: key,
  //           ...dataAsObject[key]
  //       })
  //   }

  //   return dataInArray;
  // }
  // 
  // const fetchDatafromDB = () => {
  //   console.log('[ProductWrapper] Fetching data...');
  //   fetch(' firebase URL ')
  //   .then( response => response.json())
  //   .then( data => {
  //       console.log('Success: ', data);
  //       setData(transformDataFromFirebase(data));
  //   })
  //   .catch((error) => {
  //       console.error('Error', error);
  //   });
  // }

  const fetchDatafromDB = () => {
    console.log('[ProductWrapper] Fetching data...');
    fetch('http://localhost:9090/telescopes')
    .then( response => response.json())
    .then( data => {
        console.log('Success: ', data);
        setData(data.data);
    })
    .catch((error) => {
        console.error('Error', error);
    });
  }

  useEffect(()=>{
      fetchDatafromDB();
  }, []);

  return (
    <div className={classes.App}>
      <Header title={'Telescopes'}/>
      <Navigation openModalHandler={openModalHandler}/>

      <Switch>
        <Route path='/telescope/:id' component={ProductCard}/>
        <Route path='/' exact render={() => <ProductsWrapper data={data}/>}/>
      </Switch>

      <AddProduct 
        showModal={showModal} 
        modalOFF={closeModalHandler}
        saveSettingsHandler={addNewTelescope}/>

    </div>
  );
}

export default App;