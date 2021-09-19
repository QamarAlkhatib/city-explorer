import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header.js';
// import FormFun from './component/FormFun.js';
import Footer from './component/Footer.js';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap/'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        searchQuery: '',
        locationResult: {},
        showLocInfo: false,
        lon: "",
        lat: ""
    }
}

LocData = async (event) => {
    event.preventDefault();

    await this.setState({
        searchQuery: event.target.city.value
    });
    console.log(this.state.searchQuery);

    let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

    let locResult = await axios.get(reqUrl);
    console.log("data", locResult);
    console.log("datssa", locResult.data);
    console.log("datssa", locResult.data[0]);



    this.setState({
        locationResult: locResult.data[0],
        showLocInfo: true
    })
}
onClick = async () => {
    await this.setState({
        showLocInfo: true,
        searchQuery: this.state.searchQuery,
        lat: this.state.locationResult.lat,
        lon: this.state.locationResult.lon

    });
    console.log("lat", this.state.lat);

}
  render() {
    return (
      <div>
        <Header/>
        {/* <FormFun/> */}
        <Form className="form" onSubmit={this.LocData}>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                                City Name
                            </Form.Label>
                            <Form.Control
                                name="city"
                                className="mb-2"
                                id="inlineFormInput"
                                placeholder="Enter City Name"
                            />
                        </Col>
                        <Col xs="auto">
                            
                            <Button type="click" onClick={this.onClick} className="mb-2" variant="success">
                                Explore!
                            </Button>
                        </Col>
                    </Row>
                    
                </Form>
        <Footer/>
      </div>
    )
  }
}
export default App;