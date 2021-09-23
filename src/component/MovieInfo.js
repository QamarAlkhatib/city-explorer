import React from 'react'


class MovieInfo extends React.Component {
    render() {
        return (
            <div>
                <div class="card mb-3" style={{ maxWidth: "340px", backgroundColor: '#9E9E9E', marginLeft: "350px", marginRright: '600px', float: 'right', border: '2px solid black' }}>
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src={this.props.imgUrl} class="card-img" alt='' />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"> Title: {this.props.title}</h5>
                                <p class="card-text">Overview: {this.props.overview}</p>
                                <p class="card-text"><small>Avarage Votes: <span style={{ color: "#BF360C", fontWeight: "bold" }}> {this.props.avgvotes}</span></small></p>
                                <p class="card-text"><small >Vote Count: <span style={{ color: "#BF360C", fontWeight: "bold" }}> {this.props.votecount}</span>
                                </small></p>
                                <p class="card-text"><small >Popularity: <span style={{ color: "#388E3C", fontWeight: "bold" }}> {this.props.popularity}</span></small></p>
                                <p class="card-text"><small >Released: {this.props.released}</small></p>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MovieInfo;