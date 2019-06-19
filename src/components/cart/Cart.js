import React, { Component } from 'react'
import Title from '../Title';

import CartColums from './CartColums';
import EmptyCart from './EmptyCart';
export default class Cart extends Component {
    render() {
        return (
            <section>
            
            <Title name="your" title="cart" />

            <CartColums />
                
            </section>
        )
    }
}
