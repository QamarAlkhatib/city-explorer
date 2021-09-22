import React from 'react'
import {Card} from 'react-bootstrap/';

class WeathInfo extends React.Component {
    render() {
        return (
            <div>
                <Card style={{ width: '250px', marginLeft:'50px', backgroundColor:'#39C0ED', marginBottom:'50px', border:'2px solid black'}}>
                    <Card.Header>Weather Data in {this.props.city}</Card.Header>
                    <Card.Body>
                        <Card.Title> </Card.Title>
                        <Card.Text>

                            Description: {this.props.description}
                            <br></br>
                            Date: {this.props.date}
                        </Card.Text>
                    </Card.Body>
                </Card>
                
            </div>
        )
    }
}

export default WeathInfo;
