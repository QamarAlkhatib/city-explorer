import React from 'react'
import Card from 'react-bootstrap/Card'

class LocationInfo extends React.Component {
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }} className="cardOutput">
                    <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=f5de8e48adbdc6&center=${this.props.lat},${this.props.lon}&zoom=10`} alt="city" />
                    <Card.Body>
                        <Card.Title>City Name: {this.props.searchQuery} 🗺️</Card.Title>
                        <Card.Text>
                            Display Name: {this.props.displayName}
                            <br></br>
                            latitude: {this.props.lat}
                            <br></br>
                            longitude: {this.props.lon}
                            <br></br>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default LocationInfo
