import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };

  addToCard = (product) => {
    let newCard = this.state.cart;
    var addedItem = newCard.find((c) => c.product.id === product.id);

    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCard.push({ product: product, quantity: 1 });
    }

    this.setState({
      cart: newCard,
    });

    alertify.success(product.productName + " " + "Added to Cart", 3);
  };

  removeFromCart = (product) => {
    const { cart } = this.state;
    let newCart = cart.filter((cartItem) => cartItem.product.id !== product.id);
    this.setState({
      cart: newCart,
    });
    alertify.error(product.productName + " " + "Removed From Cart", 3);
  };

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({
      currentCategory: category.categoryName,
    });
    this.getProducts(category.id);
  };

  getProducts = (id) => {
    let url = "http://localhost:3004/products";
    if (id) {
      url += "?categoryId=" + id;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          products: data,
        })
      );
  };

  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                changeCategory={this.changeCategory}
                currentCategory={this.state.currentCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      {...props}
                      addToCard={this.addToCard}
                      products={this.state.products}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  )}
                />
                <Route
                  exact
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  )}
                />
                <Route exact path="/form1" component={FormDemo1}/>
                <Route exact path="/form2" component={FormDemo2}/>
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
