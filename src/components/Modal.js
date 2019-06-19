import React, { Component } from "react";

import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { modalOpen, closeModal } = value;
          const { img, title, price } = value.modalProduct;
          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                    <div className="row">
                        <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize">
                        <h5>item added to the cart</h5>

                        </div>
                    </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}
const ModalContainer = styled.div`
  position: fixed;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
  background-color :  rgba(0,0,0,0.2);
  display : flex;
  align-items : center;
  justify-content : center;
  #modal{
      background : var(--mainWhite);

  }
`
