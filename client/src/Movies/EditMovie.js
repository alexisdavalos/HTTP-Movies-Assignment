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

  updateMovie = id => {
    axios
    .put(`http://localhost:5000/api/movies/${id}`, this.state.movie)
    .then(res => {this.setState({ movie: res.data }); console.log('update response',res)})
    .catch(err => console.log(err.response));
  }

  deleteMovie = id => {
    axios
    .delete((`http://localhost:5000/api/movies/${id}`))
    .then(res => {this.setState({ movie: res.data }); console.log('delete response',res)})
    .catch(err => console.log(err.response));

  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  
  //handle Changes
    handleChanges = e => {
    e.preventDefault();
    if(e.target.name !== 'stars'){
      this.setState({
        movie: {...this.state.movie, [e.target.name]: e.target.value},
      });
      console.log(`${e.target.name} is:`, e.target.value);
    }else{
      this.setState({
        movie: {...this.state.movie, stars: e.target.value.split(",")},
      });
      console.log(`${e.target.name} is:`, e.target.value);
    }
  };
  //handle Submit
  handleSubmit = e =>{
    e.preventDefault()
    this.updateMovie(this.state.movie.id)
    this.setState({
      ...this.state,
      editing: false
    })
  }

  handleDelete = e => {
    e.preventDefault()
    this.deleteMovie(this.state.movie.id)
    this.props.history.push('/');

  }
  render() {
    console.log(this.state);
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <>
      {(this.state.editing) ? 
      <div className='form-wrapper'>
        <form onSubmit={this.handleSubmit}>
          <h3>Edit Film</h3>
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
          <button>Save Movie</button>
        </form>
        </div> :   
        
        <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className='movie-control'>
        <h3>Edit Mode On: Select Commands</h3>
        <Link onClick={() => this.setState({editing: true})} to={`/update-movie/${this.state.movie.id}`}>
          <button>Edit</button>
        </Link>
          <button onClick={this.handleDelete}>Delete</button>
        <Link onClick={() => this.setState({editing: false})} to={`/movies/${this.state.movie.id}`}>
        <button>Exit</button>
        </Link>
        </div>
      </div> }
      </>
    );
  }
}
