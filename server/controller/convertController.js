import React, { Component } from 'react';

module.exports = {
  convert: (query) => {
    const components = {}; //the components that we will return
    const typeNames = {}; //the cache for the components we know exist
    const data = query.data;
  
    //cache from the schema the components we know exist
    for(let i = 0; i < data.__schema.types.length; i++) {
      typeNames[data.__schema.types[i].name.toLowerCase()] = true;
    }
  
    const createComponent = (root, name, typeNames) => {
      const props = {};
      const children = [];
      children.push(React.createElement('h1',null,name));
      for(let field in root) {
        if(typeNames[field]) {
          if(Array.isArray(root[field])) {
            for(let i = 0; i < root[field].length; i++) {
              children.push(createComponent(root[field][i],field,typeNames));
            }
          } else {
            children.push(createComponent(root[field],field,typeNames));
          }
        } else {
          if(Array.isArray(root[field])) {
            for(let i = 0; i < root[field].length; i++) {
              props[field[i]] = root[field[i]];
            }
          } else {
            props[field] = root[field];
          }
        }
      }
      const componentName = React.createElement('div', props, children);
      return componentName;
    }
  
    for(let comp in data) {
      if(comp !== "__schema") {
        const componentName = createComponent(data[comp],comp,typeNames);
        components[comp] = componentName;
      }
    }
    return components;
  }
}