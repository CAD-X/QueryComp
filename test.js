import * as React from 'react';
import { render } from 'react-dom';

const test = {
  "data": {
    "__schema" : {
      "types": [
        {
          "name": "Hero"
        },
        {
          "name": "Friends"
        }
      ]
    },
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}

const convert = (query) => {
  const components = []; //the components that we will return
  const typeNames = {}; //the cache for the components we know exist
  const data = query.data;
  for(let i = 0; i < data.__schema.types.length; i++) {
    typeNames[data.__schema.types[i].name.toLowerCase()] = true;
  }
  for(let comp in data) {
    if(comp !== "__schema") {
      const props = []; //each component's props
      const children = []; //each component's children
      for(let field in data[comp]) {
        if(Array.isArray(comp[field])) {
          for(let i = 0; i < field.length; i++) {
            (typeNames[field]) ? children.push(field[i]) : props.push(field[i]);
          }
        } else {
          (typeNames[field]) ? children.push(field) : props.push(field);
        }
      }
      const componentName = React.createElement('div', props, children);
      components.push(componentName);
    }
  }
  return components;
}

const converted = convert(test);
//console.log(converted)
//console.log(converted[0].props.children);

render(converted, document.getElementById('root'))