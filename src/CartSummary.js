import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

export default class CartSummary extends Component {
  renderSummary = () => {
    const { cart, removeFromCart } = this.props;
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Cart - <Badge color="success">{cart.length}</Badge>
        </DropdownToggle>
        <DropdownMenu right>
          {cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge
                color="danger"
                onClick={() => removeFromCart(cartItem.product)}
              >
                x
              </Badge>
              <span> </span>
              {cartItem.product.productName}
              <span> </span>
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            <Link to="cart">Go To Card</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  renderEmptyCart = () => {
    return (
      <NavItem>
        <NavLink>Empyt Cart</NavLink>
      </NavItem>
    );
  };

  render() {
    const { cart } = this.props;

    return (
      <div>
        {cart.length > 0 ? this.renderSummary() : this.renderEmptyCart()}
      </div>
    );
  }
}
