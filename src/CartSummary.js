import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink
} from "reactstrap";

export default class CartSummary extends Component {
  renderSummary = () => {
    const { cart } = this.props;
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Cart - <Badge color="success">{cart.length}</Badge>
        </DropdownToggle>
        <DropdownMenu right>
          {cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              {cartItem.product.productName}
              <span> </span>
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>Reset</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  renderEmptyCart = () => {
    return (
      <NavItem>
        <NavLink>EmpyCard</NavLink>
      </NavItem>
    );
  };

  render() {
    const { cart } = this.props;

    return <div>{cart.length > 0 ? this.renderSummary() : this.renderEmptyCart()}</div>;
  }
}
