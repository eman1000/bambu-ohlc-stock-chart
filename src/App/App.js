// The basics
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes';

// import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {

  }

  render() {
    return (
      <div id="app" className="contaier">
        <Header/>
        <div id="content">
          <Routes />
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({  }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
