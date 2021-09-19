import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap/'
import './css/header.css'
import './css/FormFun.css'
import axios from 'axios';


class FormFun extends React.Component {

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
               
                {/* 
               {this.state.showLocInfo &&
          <>
            <p>City name: {this.state.searchQuery}</p>
            <p>latitude: {this.state.locationResult.lat}</p>
            <p>longitude: {this.state.locationResult.lon} </p>

            <img src={`https://maps.locationiq.com/v3/staticmap?key=f5de8e48adbdc6&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" />

          </>
        } */}

            </div>
        )
    }
}
export default FormFun;