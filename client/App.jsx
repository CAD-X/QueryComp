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
    let limit = children.length;
    for(let i = 0; i < limit; i++) {
      children.push(React.createElement('h1',null,children[i].props.name));
      this.showOnPage(children[i]);
    }
    for(let x in comp.props) {
      if(x !== 'children') {
        children.push(React.createElement('h4',null,`${x} = ${comp.props[x]}`));
      }
    }
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
        console.log(newComp);
        return this.setState({components: newComp});
      })
      .catch(err => console.log('App.componentDidMount ERROR: ', err));
    }


  render() {
    return (this.state.components);
  }
}
  
  export default App;
  