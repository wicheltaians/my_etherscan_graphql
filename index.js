// Import ApolloServer and importSchema
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import EtherDataSource
const EtherDataSource = require("./datasource/ethDatasource");

// Import schema
const typeDefs = importSchema("./schema.graphql");

// Load environment variables
require("dotenv").config();

// Resolvers
const resolvers = {
  Query: {
    // Resolver to get ether balance for an address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver to get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver to get latest ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver to get block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,

  // Create EtherDataSource instance
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0
server.timeout = 0;

// Start Apollo Server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
