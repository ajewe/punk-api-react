import React from 'react';
import logo from './logo.svg';
import './App.css';

class Beer extends React.Component {
  constructor(props) {
    super(props) 
      this.state = {
        isLiked: false,
        showMoreInfo: false,
      };
    }

    render() {
      let moreInfo = null;
      
      if(this.state.showMoreInfo) {
        moreInfo = (
          <>
            <div>"{this.props.tagline}"</div>
            <div>First Brewed: {this.props.firstBrew}</div>
            <div>Description: {this.props.description}</div>
            <div>{this.state.isLiked? 'Liked' : 'Not Liked'}</div>
            <img src={this.props.img} style={{width:"200px", height: "auto"}}></img>
          </>
        )
      }
        let checkImg = <img src="http://www.clker.com/cliparts/2/k/n/l/C/Q/transparent-green-checkmark-md.png" style={{width:"20px"}}></img>

      return (
        <div>
          {this.props.name}
          <button onClick={() => { 
            this.setState({showMoreInfo: !this.state.showMoreInfo})
          }}>
            {this.state.showMoreInfo? 'Hide Info' : 'More Info'}
          </button>
          <button onClick={() => {
            this.setState({isLiked: !this.state.isLiked})
          }}>
            {this.state.isLiked? 'Unlike' : 'Like'}
          </button>
          {this.state.isLiked? checkImg : null}
          <div>
            {moreInfo}
          </div>
        </div>
      )
    }

}

class App extends React.Component {
  constructor(props) {
    super(props) 
      this.state = {
        beers: [],
        clicked: 0,
      };
    }
  
  componentDidMount() {
    fetch('https://api.punkapi.com/v2/beers')
    .then(response => response.json())
    // .then(parsedJSON => console.log(parsedJSON))
    .then((json) => {this.setState({beers: json})})
    .catch(error => console.log('parsing failed', error))
  }

  render() {

    return (
      <div style={{padding:"12px 10px"}}>
        {this.state.beers.map( beer => 
          <Beer 
            name={beer.name} 
            tagline={beer.tagline} 
            firstBrew={beer.first_brewed} 
            description={beer.description} 
            img={beer.image_url}/>
          )}
      </div>
    );
    }
}

export default App;
