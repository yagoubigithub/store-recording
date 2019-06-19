import React, { Component } from "react";

import { ProductConsumer } from "../context";
export default class Details extends Component {
  
  
 
  render() {
   
    return (
     
         <ProductConsumer>
         {value=>{
           const product = value.products.filter(product=>{
             return product.id === this.props.match.params.id;
           })[0];
           if(product !== undefined){
             const {id,company,title,info,img,price,inCart} = product;
             return(

               <div className="container py-5">
               <div className="row">
               <div className="col-10 max-auto text-center text-slanted text-blue my-5">
               <h1>{title}</h1>

               </div>

               </div>

               </div>
             )
           }
         }}
     
      
      </ProductConsumer>
     
     
     
    );
  }
}
