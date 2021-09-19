import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header.js';
import FormFun from './component/FormFun.js';
import Footer from './component/Footer.js';
class App extends React.Component {


  render() {
    return (
      <div>
        <Header/>
        <FormFun/>
        <Footer/>
      </div>
    )
  }
}
export default App;