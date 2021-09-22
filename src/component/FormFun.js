import React from 'react'
import { Form, Row, Col, Button, Alert } from 'react-bootstrap/'
import './css/header.css'
import './css/FormFun.css'
import axios from 'axios';
import WeatherInfo from './WeathInfo.js'
import LocationInfo from './LocationInfo';

class FormFun extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            locationResult: {},
            showLocInfo: false,
            errorMess: false,
            wethDataInfo: {},
            showWethData: false
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

            console.log(this.state.wethDataInfo);
        } catch {
            if (this.state.searchQuery === ' ' || this.state.searchQuery === ',' || this.state.searchQuery === '.') {
                console.log("something went wrong");
                this.setState({
                    showLocInfo: false,
                    errorMess: true,

                });
            }
        }

        this.getData();
    }


    getData = async () => {
        console.log("dhjsklhd");
        let newReqUrl = `https://city-explorer-class07.herokuapp.com/weather?city=${this.state.searchQuery}`;
        let weathData = await axios.get(newReqUrl);
        console.log(newReqUrl);
        console.log(weathData);

        this.setState({
            showWethData: true,
            wethDataInfo: weathData.data
        });
        console.log(this.state.wethDataInfo);
    }

    handleClose = () => {
        this.setState({
            errorMess: false
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


                {this.state.showLocInfo &&
                    <>

                        <LocationInfo searchQuery={this.state.searchQuery} displayName={this.state.locationResult.display_name} lat={this.state.locationResult.lat} lon={this.state.locationResult.lon} />


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

                {this.state.showWethData &&
                    <>
                        {this.state.wethDataInfo.map((value, key) => {
                            return (
                                <>
                                    <WeatherInfo key={key.date} city={this.state.searchQuery} description={value.description} date={value.date} />
                                </>
                            )
                        })
                        }


                    </>
                }

            </div>
        )
    }
}
export default FormFun;