import React, { Component } from 'react';
import { convert } from'./../server/controller/test.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: null
    };
  }

  showOnPage(comp) {
    if(!comp.props) return;
    const children = comp.props.children;
    let newChildren = [];
    let limit = children.length;
    newChildren.push(React.createElement('h1',null,comp.props.name));
    for(let x in comp.props) {
      if(x !== 'children') {
        newChildren.push(React.createElement('h4',null,`${x} = ${comp.props[x]}`));
      }
    }
    for(let i = 0; i < limit; i++) {
      this.showOnPage(children[i]);
    }
    newChildren = newChildren.concat(children);
    comp.props.children = newChildren;
    return comp;
  }

  componentDidMount() {
    fetch('/api/')
      .then(res => res.json())
      .then(data => {
        const converted = convert(data);
        const comp = [];
        for(let x in converted) {
          comp.push(converted[x]);
        }
        const newComp = [];
        for(let i = 0; i < comp.length; i++) {
          newComp.push(this.showOnPage(comp[i]));
        }
        return this.setState({components: newComp});
      })
      .catch(err => console.log('App.componentDidMount ERROR: ', err));
    }


  render() {
    return (this.state.components);
  }
}
  
  export default App;
  