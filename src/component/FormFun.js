import React from 'react'
import { Form, Row, Col, Button, Alert } from 'react-bootstrap/'
import './css/header.css'
import './css/FormFun.css'
import axios from 'axios';
import WeatherInfo from './WeathInfo.js'
import LocationInfo from './LocationInfo.js';
import MovieInfo from './MovieInfo.js'

class FormFun extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            locationResult: {},
            showLocInfo: false,
            errorMess: false,
            wethDataInfo: {},
            showWethData: false,
            movieData: {},
            showMovieData: false
        }
    }

    LocData = async (event) => {
        event.preventDefault();

        await this.setState({
            searchQuery: event.target.city.value
        });

        try {
            let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
            let locResult = await axios.get(reqUrl);
            this.setState({
                locationResult: locResult.data[0],
                showLocInfo: true,
                errorMess: false,

            })
            console.log(this.state.wethDataInfo);
            this.getData();
            this.getMovieData();
        } catch {
            if (this.state.searchQuery === ' ' || this.state.searchQuery === ',' || this.state.searchQuery === '.') {
                console.log("something went wrong");
                this.setState({
                    showLocInfo: false,
                    errorMess: true,

                });
            }
        }

    }


    getData = async () => {
        console.log("weather data");
        let newReqUrl = `https://city-explorer-class07.herokuapp.com/weather?city=${this.state.searchQuery}`;
        let weathData = await axios.get(newReqUrl);
        console.log(newReqUrl);
        console.log(weathData);

        this.setState({
            showWethData: true,
            wethDataInfo: weathData.data
        });
    }

    getMovieData = async () => {
        console.log("movieData");
        let movieURL = `https://city-explorer-class07.herokuapp.com/getMovie?query=${this.state.searchQuery}`;
        console.log("movie link", movieURL);

        let movieDataResult = await axios.get(movieURL);

        console.log(movieDataResult);
        this.setState({
            showMovieData: true,
            movieData: movieDataResult.data
        });
        console.log("this is the movie data", this.state.movieData);

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
                            <Button type="submit" className="mb-2" variant="success">  Explore! </Button>
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
                        {this.state.wethDataInfo.map((value, index) => {
                            return (
                                <>
                                    <WeatherInfo key={index} city={this.state.searchQuery} description={value.description} date={value.date} />
                                </>
                            )
                        })
                        }
                    </>
                }

                {this.state.showMovieData &&
                    <>
                        {this.state.movieData.map((value, index) => {
                            return (
                                <MovieInfo key={index} city={this.state.searchQuery} title={value.title} overview={value.overview}
                                    avgvotes={value.avgvotes} votecount={value.votecount} imgUrl={value.imgUrl} popularity={value.popularity} released={value.released} />
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