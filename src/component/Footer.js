import React from 'react'
import Card from 'react-bootstrap/Card'
import './css/Footer.css'


class Footer extends React.Component {
    render() {
        return (
            <div>
                <Card className="footer">
                   
                        <Card.Footer>&copy; City Explorer Project</Card.Footer>
                        
                </Card>

            </div>
        )
    }
}
export default Footer;