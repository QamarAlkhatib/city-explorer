import React from 'react'
import { Form, Row, Col, Button, Card, Alert } from 'react-bootstrap/'
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
            errorMess: false,
            wethDataInfo: {}
        }
    }

    LocData = async (event) => {
        event.preventDefault();

        await this.setState({
            searchQuery: event.target.city.value
        });


        // console.log(this.state.searchQuery);
        try {
            let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

            let locResult = await axios.get(reqUrl);
            // console.log("data", locResult);
            // console.log("datssa", locResult.data);
            // console.log("datssa", locResult.data[0]);

            this.setState({
                locationResult: locResult.data[0],
                showLocInfo: true,
                errorMess: false,


            })
        } catch {
            if (this.state.searchQuery === ' ') {


                console.log("something went wrong");
                this.setState({
                    showLocInfo: false,
                    errorMess: true,

                });
            }

        }
    }


    handleClose = () => {
        this.setState({
            errorMess: false
        })
    }

    getData = async () => {
        let reqUrl = `${process.env.REACT_APP_SERVER_LINK}/weather?cityname=Seattle&timezone=America/Los_Angeles&description=Light rain&date=2021-03-25`;
        let weathData = await axios.get(reqUrl);

        this.setState({
            wethDataInfo: weathData.data
        })
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
                                required

                            />
                        </Col>
                        <Col xs="auto">

                            <Button type="submit" className="mb-2" variant="success">
                                Explore!
                            </Button>
                        </Col>
                    </Row>

                </Form>
                <p>City name: {this.state.wethDataInfo.city_name}</p>
                <p>TimeZone: {this.state.wethDataInfo.timezone}</p>
                {/* <p>description: {this.state.wethDataInfo.description}</p>
                <p>date: {this.state.wethDataInfo.date}</p> */}

                <Button onClick={this.getData} variant="success">
                    Click me
                </Button>



                {this.state.showLocInfo &&
                    <>
                        <Card style={{ width: '18rem' }} className="cardOutput">
                            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=f5de8e48adbdc6&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" />
                            <Card.Body>
                                <Card.Title>City Name: {this.state.searchQuery} 🗺️</Card.Title>
                                <Card.Text>
                                    Display Name: {this.state.locationResult.display_name}
                                    <br></br>

                                    latitude: {this.state.locationResult.lat}
                                    <br></br>
                                    longitude: {this.state.locationResult.lon}

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </>
                }

                {this.state.errorMess &&

                    <Alert variant="danger" onClose={this.handleClose} dismissible style={{ width: 'auto' }}>
                        <Alert.Heading>Oh snap! You got an error! 😨</Alert.Heading>
                        <p>
                            You probably Misspelling the city name, What about London?
                        </p>
                    </Alert>
                }






            </div>
        )
    }
}
export default FormFun;