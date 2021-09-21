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
            let newReqUrl = `${process.env.REACT_APP_SERVER_LINK}/weather?cityname=${this.state.searchQuery}`;
            let weathData = await axios.get(newReqUrl);
            console.log(weathData);
            this.setState({
                locationResult: locResult.data[0],
                showLocInfo: true,
                errorMess: false,
                wethDataInfo: weathData.data
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

    // getData = async () => {
    //     let reqUrl = `${process.env.REACT_APP_SERVER_LINK}/weather?cityname=${this.state.searchQuery}`;
    //     let weathData = await axios.get(reqUrl);

    //     this.setState({
    //         wethDataInfo: weathData.data
    //     })
    //     console.log(this.state.wethDataInfo);
    // }

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


                {this.state.showLocInfo &&
                    <>
                        <Card style={{ width: '18rem' }} className="cardOutput">
                            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" />
                            <Card.Body>
                                <Card.Title>City Name: {this.state.searchQuery} 🗺️</Card.Title>
                                <Card.Text>
                                    Display Name: {this.state.locationResult.display_name}
                                    <br></br>

                                    latitude: {this.state.locationResult.lat}
                                    <br></br>
                                    longitude: {this.state.locationResult.lon}
                                    <br></br>
                                    
                                    Description: {this.state.wethDataInfo[0].desc}
                                    <br></br>
                                    Date: {this.state.wethDataInfo[0].date}

                                    <br></br>
                                    high_temp: {this.state.wethDataInfo[0].highTemp}
                                    <br></br>
                                    low_temp: {this.state.wethDataInfo[0].lowTemp}


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

                {/* 
                <p>City name: {this.state.searchQuery}</p>
                <p>Description: {this.state.wethDataInfo.description}</p>
                <p>high_temp: {this.state.wethDataInfo.high_temp}</p>
                <p>low_temp: {this.state.wethDataInfo.low_temp}</p>

                <Button onClick={this.getData} variant="success">
                    Click me
                </Button> */}

            </div>
        )
    }
}
export default FormFun;
