import React, { Component } from 'react';

module.exports = {
  convert: (query) => {
    const components = []; //the components that we will return
    const compNames = {}; //the cache for the components we know exist
    const data = query.data;
    for(let comp in data) {
      compNames[comp] = true;
    }

    for(let comp in data) {
      const props = []; //each component's props
      const children = []; //each component's children
      for(let field in comp) {
        if(Array.isArray(field)) {
          for(let i = 0; i < field.length; i++) {
            (compNames[field]) ? children.push(field[i]) : props.push(field[i]);
          }
        } else {
          (compNames[field]) ? children.push(field) : props.push(field);
        }
      }
      //might have to do [props] and [children] in next line
      const componentName = React.createElement('div', props, children);
      components.push(componentName);
    }
    return components;
  },
}