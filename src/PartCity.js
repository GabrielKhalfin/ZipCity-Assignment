import React, { Component } from 'react';


class ParticularZip extends Component {

    render() {
        let zip   = this.props.data;
        return (
            <li>
                <p>{zip}</p>
                
            </li>
        );
    }
  }

  export default ParticularZip