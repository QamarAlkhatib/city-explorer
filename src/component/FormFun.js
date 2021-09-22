import React from 'react'
import { Form, Row, Col, Button, Alert, Card } from 'react-bootstrap/'
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


        // console.log(this.state.searchQuery);
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
        // console.log(this.state.wethDataInfo);
    }

    getMovieData = async () => {
        console.log("movieData");
        let movieURL = `https://city-explorer-class07.herokuapp.com/getMovie?query=${this.state.searchQuery}`;
        console.log(movieURL);

        let movieDataResult = await axios.get(movieURL);
        this.setState({
            showMovieData: true,
            movieData: movieDataResult.data
        });
        console.log(this.state.movieData);

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

                {this.state.showMovieData &&
                    <>
                        {this.state.movieData.map((value, key) => {
                            return (

                                <MovieInfo key={key.imgUrl} city={this.state.searchQuery} title={value.title} overview={value.overview}
                                    avgvotes={value.avgvotes} votecount={value.votecount} imgUrl={value.imgUrl} popularity={value.popularity} released={value.released} />
                                // <>
                                //     <Card style={{ width: '250px', marginLeft: '50px', backgroundColor: '#39C0ED', marginBottom: '50px', border: '2px solid black', float: 'right' }}>
                                //         <Card.Header>Movie with same as city Name: {this.props.city}</Card.Header>
                                //         <Card.Body>
                                //             <Card.Title> </Card.Title>
                                //             <Card.Text>

                                //                 Title: {value.title}
                                //                 <br></br>
                                //                 Overview: {value.overview}
                                //                 {/* <br></br>
                                // Avarage Votes: {this.props.avgvotes}

                                // <br></br>
                                // Vote Count: {this.props.votecount}

                                // <br></br>
                                // <img src={this.props.imgUrl} alt={this.props.title} />

                                // <br></br>
                                // Popularity: {this.props.popularity}
                                // <br></br>

                                // Released: {this.props.Released} */}
                                //             </Card.Text>
                                //         </Card.Body>
                                //     </Card>
                                // </>
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