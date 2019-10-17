const React = require('react');

const test = {
  "data": {
    "__schema" : {
      "types": [
        {
          "name": "Student"
        },
        {
          "name": "Project"
        },
        {
          "name": "Fellow"
        },
        {
          "name": "Instructor"
        },
        {
          "name": "School"
        },
      ]
    },
    "school": {
      "name": "Codesmith",
      "address": "1600 Main St. Venice, CA",
      "rating": 5,
      "student": [
        {
          "name": "Benjamin Morrison",
          "cohort": "31",
          "project": [
            {
              "name": "Scratch"
            },
            {
              "name": "Iteration"
            },
            {
              "name": "Production"
            }
          ]
        },
        {
          "name": "Eric Natividad",
          "cohort": "31",
          "project": [
            {
              "name": "Scratch"
            },
            {
              "name": "Iteration"
            },
            {
              "name": "Production"
            }
          ]
        },
        {
          "name": "Jason Lee",
          "cohort": "31",
          "project": [
            {
              "name": "Scratch"
            },
            {
              "name": "Iteration"
            },
            {
              "name": "Production"
            }
          ]
        },
        {
          "name": "Kassandra Meyers",
          "cohort": "31",
          "project": [
            {
              "name": "Scratch"
            },
            {
              "name": "Iteration"
            },
            {
              "name": "Production"
            }
          ]
        },
        {
          "name": "Suramiya Sekhri",
          "cohort": "31",
          "project": [
            {
              "name": "Scratch"
            },
            {
              "name": "Iteration"
            },
            {
              "name": "Production"
            }
          ]
        }
      ],
      "fellow": [
        {
          "name": "Max Gonzalez",
          "cohort": "29"
        },
        {
          "name": "Rachel Kim",
          "cohort": "29"
        },
        {
          "name": "Victoria Adnet",
          "cohort": "29"
        },
        {
          "name": "Eric Stallings",
          "cohort": "30"
        },
        {
          "name": "Juan Espinoza",
          "cohort": "30"
        },
        {
          "name": "Michelle Moody",
          "cohort": "30"
        }
      ],
      "instructor": [
        {
          "name": "Augustine Kim",
        },
        {
          "name": "Samantha Salley",
        },
        {
          "name": "Schno Mozingo",
        },
      ]
    }
  }
}

const test2 = {
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
  const components = {}; //the components that we will return
  const typeNames = {}; //the cache for the components we know exist
  const data = query.data;

  //cache from the schema the components we know exist
  for(let i = 0; i < data.__schema.types.length; i++) {
    typeNames[data.__schema.types[i].name.toLowerCase()] = true;
  }

  const createComponent = (root,typeNames) => {
    const props = {};
    const children = [];
    //children.push(React.createElement('h1',null,root.name));
    for(let field in root) {
      if(typeNames[field]) {
        if(Array.isArray(root[field])) {
          for(let i = 0; i < root[field].length; i++) {
            children.push(createComponent(root[field][i],typeNames));
          }
        } else {
          children.push(createComponent(root[field],typeNames));
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
      const componentName = createComponent(data[comp],typeNames);
      components[comp] = componentName;
    }
  }
  return components;
}

const converted = convert(test);
//console.log(converted)
//console.log(converted['hero'].props.children);
//console.log(converted['hero'].props.children[2].props.children)

module.exports = {convert : convert, test : test};