import React from 'react'
import Card from 'react-bootstrap/Card'
class MovieInfo extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Card style={{ width: '250px', marginLeft: '50px', backgroundColor: '#E8EAF6', marginBottom: '50px', border: '2px solid black', float: 'right' }}>
                        <Card.Header>Movie same as Name of {this.props.city}</Card.Header>
                        <Card.Img variant="top" src={this.props.imgUrl} />
                        <Card.Body>
                            <Card.Title> </Card.Title>
                            <Card.Text>

                                Title: {this.props.title}
                                <br></br>
                                Overview: {this.props.overview}
                                <br></br>
                                Avarage Votes: {this.props.avgvotes}

                                <br></br>
                                Vote Count: {this.props.votecount}

                                <br></br>
                                s
                                {/* <img src={this.props.imgUrl} alt={this.props.title} /> */}

                                <br></br>
                                Popularity: {this.props.popularity}
                                <br></br>

                                Released: {this.props.Released}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </div>
            </div>
        )
    }
}
export default MovieInfo;