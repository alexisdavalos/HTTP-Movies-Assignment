import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isAdding: false,
      movie: {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
      }
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  render() {
    return (
     <div>
      {(this.state.isAdding) ? 
      <div className='form-wrapper'>
      <form onSubmit={this.handleSubmit}>
        <h3>Add New Film</h3>
        <label>Title</label>
        <input 
          type='text'
          name='title'
          value={this.state.movie.title}
          onChange={this.handleChanges}
        />
        <label>Director</label>
        <input 
          type='text'
          name='director'
          value={this.state.movie.director}
          onChange={this.handleChanges}
        />
        <label>Metascore</label>
        <input 
          type='text'
          name='metascore'
          value={this.state.movie.metascore}
          onChange={this.handleChanges}
        />
        <label>Stars</label>
        <input 
          type='text'
          name='stars'
          value={this.state.movie.stars}
          onChange={this.handleChanges}
        />
        <button>Add Movie</button>
      </form>
      </div> :
      <>   
      <div className='newMovie'>
      <button onClick={() => this.setState({...this.state, isAdding: true})}>Add New Movie</button>
      </div>
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
      </>
      }
     </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
