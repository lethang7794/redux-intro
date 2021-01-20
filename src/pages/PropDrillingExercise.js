import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import productOne from "../images/product1.gif";
import productTwo from "../images/product2.gif";
import ReactJson from "react-json-view";

const RootComponent = (props) => {
  // eslint-disable-next-line
  const [products, setProducts] = useState([
    { id: "p1", title: "Product 1", price: 1999 },
    { id: "p2", title: "Product 2", price: 999 },
  ]);
  // eslint-disable-next-line
  const [cart, setCart] = useState({
    lineItems: [
      { id: "p1", title: "Product 1", price: 0, qty: 0, totalPrice: 0 },
      { id: "p2", title: "Product 2", price: 0, qty: 0, totalPrice: 0 },
    ],
    totalPrice: 0,
  });

  // Step 0 Read and understand the structure of the app

  // Step 1
  // Write a function called addProductToCart() that takes a product object as an argument
  // Example newProduct = { id: "p1", title: "Product 1", price: 1999 }
  // The function will add one new product into the cart
  const addProductToCart = (addedProduct) => {
    const newLineItems = cart.lineItems.map((lineItem) => {
      if (lineItem.id === addedProduct.id) {
        lineItem.qty += 1;
        lineItem.price = addedProduct.price;
        lineItem.totalPrice = lineItem.qty * lineItem.price;
      }
      return lineItem;
    });

    const newCartTotalPrice = cart.lineItems.reduce((cartTotalPrice, lineItem) => cartTotalPrice + lineItem.totalPrice, 0)
    
    setCart({
      lineItems: newLineItems,
      totalPrice: newCartTotalPrice,
    })
  };

  // Step 2
  // Write a function called removeProductFromCart() that takes a product object as an argument
  // Example removedProduct = { id: "p1", title: "Product 1", price: 1999 }
  // The function will remove one product from the cart. The min value of quantity is 0
  const removeProductFromCart = (removedProduct) => {
    const newLineItems = cart.lineItems.map((lineItem) => {
      if (lineItem.id === removedProduct.id && lineItem.qty > 0) {
        lineItem.qty -= 1;
        if (lineItem.qty === 0) {
          lineItem.price = 0;
        }

        lineItem.totalPrice = lineItem.qty * lineItem.price;
      }
      return lineItem
    });

    const newCartTotalPrice = newLineItems.reduce((cartTotalPrice, lineItem) => cartTotalPrice + lineItem.price * lineItem.qty, 0)

    setCart({
      lineItems: newLineItems,
      totalPrice: newCartTotalPrice,
    })
  }

  // Step 3
  // Pass the functions to the product components to handle the click event of the Add/Remove buttons

  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        RootComponent {`({`}
        <span className="Props text-dark">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <Row>
          <Col lg={3} className="text-left">
            <ReactJson
              name="state"
              src={{ products, cart }}
              collapsed={false}
              theme="monokai"
              displayDataTypes={false}
              displayObjectSize={false}
            />
          </Col>
          <Col>
            <ProductPage products={products} addProductToCart={addProductToCart} removeProductFromCart={removeProductFromCart} />
          </Col>
          <Col>
            <CartPage cart={cart} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const ProductPage = (props) => {
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        Product Page {`({`}
        <span className="Props text-dark">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <ProductOne product={props.products[0]} addProductToCart={props.addProductToCart} removeProductFromCart={props.removeProductFromCart} />
          </Col>
          <Col>
            <ProductTwo product={props.products[1]} addProductToCart={props.addProductToCart} removeProductFromCart={props.removeProductFromCart} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const CartPage = (props) => {
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        Cart Page {`({`}
        <span className="Props text-dark">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <CartProductOne product={props.cart.lineItems[0]} />
          </Col> 
          <Col>
            <CartProductTwo product={props.cart.lineItems[1]} />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <h4>Total Price: 💵 {props.cart.totalPrice}</h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const ProductOne = (props) => {
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        {props.product.title} {`({`}
        <span className="Props text-dark">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <img className="product__image" src={productOne} alt="Product One" width="100%" />
            <h5 className="Props text-dark">💵 {props.product.price}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" size="sm" style={{ width: "5rem" }} onClick={() => props.addProductToCart(props.product)}>
              Add
            </Button>
          </Col>
          <Col>
            <Button variant="danger" size="sm" style={{ width: "5rem" }} onClick={() => props.removeProductFromCart(props.product)}>
              Remove
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const ProductTwo = (props) => {
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        {props.product.title} {`({`}
        <span className="Props text-dark">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <img className="product__image" src={productTwo} alt="Product Two" width="100%" />
            <h5 className="Props text-dark">💵 {props.product.price}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" size="sm" style={{ width: "5rem" }} onClick={() => props.addProductToCart(props.product)}>
              Add
            </Button>
          </Col>
          <Col>
            <Button variant="danger" size="sm" style={{ width: "5rem" }} onClick={() => props.removeProductFromCart(props.product)}>
              Remove
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const CartProductOne = (props) => {
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        CartProduct 1 {`({`}
        <span className="Props text-dark">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <h4>Quantity: {props.product.qty}</h4>
        <h4>Price: 💵 {props.product.price}</h4>
      </Container>
    </div>
  );
};

const CartProductTwo = (props) => {
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        CartProduct 2 {`({`}
        <span className="Props text-dark">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <h4>Quantity: {props.product.qty}</h4>
        <h4>Price: 💵 {props.product.price}</h4>
      </Container>
    </div>
  );
};

const PropDrillingExercise = () => {
  return (
    <Container fluid>
      <br />
      <h5>How to add products to the cart?</h5>
      <br />
      <RootComponent />
    </Container>
  );
};

export default PropDrillingExercise;
