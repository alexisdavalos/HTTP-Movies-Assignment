import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import {Link} from 'react-router-dom';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
      },
      editing: false,
    };
  }
  
  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {this.setState({ movie: res.data }); console.log(res)})
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  //handle Changes
    handleChanges = e => {
    e.preventDefault();
    this.setState({
      ...this.state.movie,
      [e.target.name]: e.target.value,
    });
    console.log(`${e.target.name} is:`, e.target.value);
  };
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <>
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className='movie-control'>
        <Link to={`/update-movie/${this.state.movie.id}`}>
          <button>Configure Movie</button>
        </Link>
        </div>
      </div>
      </>
    );
  }
}
