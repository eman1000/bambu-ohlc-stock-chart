import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, DropdownToggle, DropdownItem, UncontrolledDropdown, DropdownMenu } from 'reactstrap';
import classnames from 'classnames';

//import logo from '../../assets/logo.svg';

const links = [
  {
    to: '/nothing-here',
    text: 'Some Dead Page'
  }
  /*{
    to: '/this-is-broken',
    text: 'Broken Page'
  }*/
];


const HeaderLink = ({ to, text}) => (
  <NavItem>
    <NavLink href={to}>{text}</NavLink>
  </NavItem>
);

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
//export default ({ isAuthenticated, current }) => (

  render(){
    const { isAuthenticated, current } = this.props;
    return (
      <Navbar color="faded" dark expand="md">
        <NavbarBrand href="/">
          <span className="logo">
            {/**<img src={logo} alt="Homepage"/>**/}
            <span>Bambu Test</span>
          </span>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              {links.map((link, index) => {
                const TheLink = <HeaderLink key={index} current={current} {...link} />;

                if (link.hasOwnProperty('auth')) {
                  if (link.auth && isAuthenticated) {
                    return TheLink;
                  } else if (!link.auth && !isAuthenticated) {
                    return TheLink;
                  }

                  return null;
                }

                return TheLink;
              })}
            </Nav>
          </Collapse>
      </Navbar>
    );
  }
}
