import React, { Component } from 'react'

import  {db} from './fbConfig';
import {storeProducts, detailProduct} from './data';
const ProductContext = React.createContext();
export default class ProductProvider extends Component {
    state= {
        products : [],
        detailProduct :{},
        cart : [],
        modalOpen : false,
        modalProduct : detailProduct,
        cartSubTotal : 0,
        cartTax : 0,
        cartTotal : 0,

        
      
    }
    componentDidMount() {
       // this.setAlldata();
        this.watchProducts();
     }

     increment = id =>{
         console.log("this is increment method", id);
     }
     decrement = id =>{
        console.log("this is decrement method", id);
     }
     removeItem = id =>{
        db.collection("cart").doc(id).delete().catch((error)=>{
  
            console.log(error);
        })
     }
     clearCart = () =>{
        console.log("this clearCart method ");
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

        const tempProducts = [...this.state.products];
        const index= tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];

        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;


        db.collection("storeProducts").doc(id).set({...product});

        db.collection("cart").doc(id).set({...product},{merge: true})
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

/*
        const tempProducts = [...this.state.products];
        const index= tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        const total = price;
        this.setState({
            products:tempProducts,
            cart : [...this.state.cart,product]
        })*/
    }
   
 /*  setAlldata = ()  =>{
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
      setCart = (cart) => {
        let tempCart = [];

        cart.forEach(item => {
           
            tempCart = [...tempCart,item];
            
        });
        this.setState({cart : tempCart});
      
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

// get cart 
db.collection("cart").onSnapshot((querySnapshot)=>{
    const cart = querySnapshot.docs.map((doc,index) => {
        return {
            id :  querySnapshot.docs[index].id,
            ...doc.data(),

        }
  });
  this.setCart(cart);
})
db.collection("cart")
.get()
.then(querySnapshot => {
  const cart = querySnapshot.docs.map((doc,index) => {
      return {
          id :  querySnapshot.docs[index].id,
          ...doc.data(),

      }
});
this.setCart(cart);
  
});


      }
 
   openModal = id =>{
       const product = this.getItem(id);
       this.setState(()=>{
           return {
               modalProduct : product,
               modalOpen : true
           }
       })
   }   
   closeModal = () =>{
       this.setState({modalOpen : false})

   }
    render() {
        return (
            <ProductContext.Provider value={
                {...this.state,
            handleDetail :this.handleDetail,
            addToCart :this.addToCart,
            getProduct : this.getProduct,
            openModal : this.openModal,
            closeModal : this.closeModal,
            decrement :this.decrement,
            increment :this.increment,
            removeItem : this.removeItem,
            clearCart :this.clearCart
           
           }
            }>
            {this.props.children}
                
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}
