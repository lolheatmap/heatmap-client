import React, { Component } from 'react';

export default class Entry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        champions: []
      };
    }
  
    componentDidMount() {
      fetch("http://localhost:3001")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
              isLoaded: true,
              champions: result.champions
            });
          },
          (error) => {
            console.log(error.message)
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, champions } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            {champions.map(champ => (
              <li key={champ.name}>
                {champ.name}
              </li>
            ))}
          </ul>
        );
      }
    }
  }