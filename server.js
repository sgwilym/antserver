var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    # A list of competing ants
    ants: [Ant]!
  }

  enum AntColor {
    BLACK
    RED
    SILVER
  }

  type Ant {
    # The name of the ant
    name: String!
    # The length of the ant in millimetres
    length: Int!
    # The color of the ant
    color: AntColor!
    # The weigt of the ant in milligrams
    weight: Int!
  }
`);

var root = {
  ants: () => [
    {
      name: () => "Marie ‘Ant’oinette",
      length: () => 12,
      color: () => "BLACK",
      weight: () => 2
    },
    {
      name: () => "Flamin’ Pincers",
      length: () => 11,
      color: () => "RED",
      weight: () => 2
    },
    {
      name: () => "Big Susan",
      length: () => 20,
      color: () => "BLACK",
      weight: () => 5
    },
    {
      name: () => "The Unbeareable Lightness of Being",
      length: () => 5,
      color: () => "SILVER",
      weight: () => 1
    },
    {
      name: () => "‘The Duke’",
      length: () => 17,
      color: () => "RED",
      weight: () => 3
    }
  ]
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
