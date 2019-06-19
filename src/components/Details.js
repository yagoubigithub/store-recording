import React, { Component } from "react";

import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button'
import { ProductConsumer } from "../context";
export default class Details extends Component {
  
  
 
  render() {
   
    return (
     
         <ProductConsumer>
         {value=>{
           const product = value.detailProduct;
           if(product !== undefined){
             const {id,company,title,info,img,price,inCart} = product;
             console.log(img)
             return(

               <div className="container py-5">
               {/* product title */}
               <div className="row">
               <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
               <h1>{title}</h1>
               </div>
               </div>

               {/** product info */}
               <div className="row">
                 <div className="col-10 mx-auto col-md-6 my-3">
                 <img src={"../../"+img} alt="product" className="img-fluid" />

                 </div>

                 <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                 <h2>model : {title}</h2>
                 <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                   made by : {company}
                 </h4>
                 <h4 className="text-blue">
                 <strong>
                   price : <span>$</span>
                   {price}
                 </strong>
                 </h4>
                 <p className="text-capitalize font-weight-bold mt-3 mb-0">

                   some info about the product :
                 </p>
                 <p className="text-muted lead">{info}</p>

                 {/** buttons */}
                 <Link to="/"> 
                 <ButtonContainer>
                   Back to products
                 </ButtonContainer>
                 </Link>
                 <ButtonContainer
                 cart
                 disabled={inCart}

                 onClick={()=>value.addToCart(id)}
                 >{inCart ? "in cart" : "add to cart"}</ButtonContainer>


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
