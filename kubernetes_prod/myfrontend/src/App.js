import React, { useState, useEffect } from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import ProductsWrapper from './components/ProductsWrapper/ProductsWrapper';
import ProductModal from './components/ProductModal/ProductModal';
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

  const addNewTelescope = ({producer, model, price,type,type_of_build,weight,focal_length,aperture,aperture_ratio}) => {
    fetch('/api/telescopes', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        producer,
        model,
        price,
        type,
        type_of_build,
        weight,
        focal_length,
        aperture,
        aperture_ratio 
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

  const fetchDatafromDB = () => {
    console.log('[ProductWrapper] Fetching data...');
    fetch('/api/telescopes')
    .then( response => response.json())
    .then( data => {
        console.log('Success: ', data);
        setData(data.data);
    })
    .catch((error) => {
        console.error('Error', error);
    });
  }

  const deleteProductInState = (id) => {
    if (Array.isArray(data)) {
      setData(data.filter( product => product.id !== +id ));
    }
  }

  const editProductInState = ({id, producer, model, price,type,type_of_build,weight,focal_length,aperture,aperture_ratio}) => {
    const editedData = {
      id: +id,
      producer,
      model,
      price,
      type,
      type_of_build,
      weight,
      focal_length,
      aperture,
      aperture_ratio
    } 

    setData(prevData => prevData.map( product => {
      if ( product.id === +id) {
        return editedData;
      }
      return product;
    }))
  }

  useEffect(()=>{
      fetchDatafromDB();
  }, []);

  return (
    <div className={classes.App}>
      <Header title={'Telescopes'}/>
      <Navigation openModalHandler={openModalHandler}/>

      <Switch>
        <Route path='/telescope/:id' render={() => <ProductCard deleteProductInState={deleteProductInState} editProductInState={editProductInState}/>}/>
        <Route path='/' render={() => <ProductsWrapper data={data}/>}/>
      </Switch>

      <ProductModal 
        showModal={showModal} 
        modalOFF={closeModalHandler}
        saveSettingsHandler={addNewTelescope}/>

    </div>
  );
}

export default App;
