import React from 'react'
import Card from 'react-bootstrap/Card'
import './css/header.css'

class Header extends React.Component {
    render() {
        return (
            <div>
                <Card className="card">
                    <Card.Body className="body">
                        <Card.Title>City Explorer Project</Card.Title>
                        <Card.Text>
                            Search for you favourite city or country to see the result.🔍🌍
                        </Card.Text>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}
export default Header;