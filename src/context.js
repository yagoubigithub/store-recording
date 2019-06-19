import React, { Component } from 'react'

import  {db} from './fbConfig';
import {storeProducts, detailProduct} from './data';
const ProductContext = React.createContext();
export default class ProductProvider extends Component {
    state= {
        products : [],
        detailProduct :detailProduct,
        
      
    }
    componentDidMount() {
     //   this.setAlldata();
        this.watchProducts();
     }
    handleDetail = ()=>{

    }
    addToCart = (id)=>{

        console.log("add to cart " + id)
    }
    getProduct = (id)=>{
       return  db.collection("storeProducts")
        .doc(id)
        .get()
        .then(doc => {
          const product = doc.data();
          this.setState({product});
          console.log(product);
         
        }).catch(error =>{
            console.log("Error in database",error);
            
        });
    }
   /*setAlldata = ()  =>{
    storeProducts.map(item=>{
        db.collection("storeProducts").doc().set({...item});
    })
   }*/
      setProducts = (products) => {
          let tempProducts = [];

          products.forEach(item => {
              const product = {...item};
              tempProducts = [...tempProducts,product];
              
          });
          this.setState({products});
        
      }
      watchProducts = () =>{

        db.collection("storeProducts").onSnapshot((querySnapshot)=>{
            const products = querySnapshot.docs.map((doc,index) => {
                return {
                    id :  querySnapshot.docs[index].id,
                    ...doc.data(),
  
                }
          });
          this.setProducts(products);
        })
        db.collection("storeProducts")
        .get()
        .then(querySnapshot => {
          const products = querySnapshot.docs.map((doc,index) => {
              return {
                  id :  querySnapshot.docs[index].id,
                  ...doc.data(),

              }
        });
        this.setProducts(products);
          
        });
      }
 
      
    render() {
        return (
            <ProductContext.Provider value={
                {...this.state,
            handleDetail :this.handleDetail,
            addToCart :this.addToCart,
            getProduct : this.getProduct,
           
           }
            }>
            {this.props.children}
                
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}
