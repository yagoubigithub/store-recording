import React, { Component } from 'react'

import  {db} from './fbConfig';
import {storeProducts, detailProduct} from './data';
const ProductContext = React.createContext();
export default class ProductProvider extends Component {
    state= {
        products : [],
        detailProduct :{},
        
      
    }
    componentDidMount() {
     //   this.setAlldata();
        this.watchProducts();
     }
     getItem = (id) =>{
         const product = this.state.products.filter(product=>{
            return product.id === id;
          })[0];
        
         return product;
     }
    handleDetail = (id)=>{
        const detailProduct = this.getItem(id);

        this.setState({detailProduct });

       
    }
    addToCart = (id)=>{

        console.log("add to cart " + id)
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
