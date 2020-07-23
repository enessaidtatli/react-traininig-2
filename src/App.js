import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };

  addToCard = (product) => {
    let newCard = this.state.cart;
    console.log("newCard", newCard)
    var addedItem = newCard.find(c => c.product.id === product.id);
    console.log("addedItem", addedItem)
    if(addedItem){
      addedItem.quantity += 1;
      console.log("addedItem.quantity", addedItem.quantity)
    }else{
      newCard.push({ product: product, quantity: 1 });
      console.log("newCard", newCard)
    }
    
    this.setState({
      cart: newCard,
    });

    console.log("this.state.card", this.state.cart.length)
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
          <Navi cart={this.state.cart}/>
          <Row>
            <Col xs="3">
              <CategoryList
                changeCategory={this.changeCategory}
                currentCategory={this.state.currentCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList
                addToCard={this.addToCard}
                products={this.state.products}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
