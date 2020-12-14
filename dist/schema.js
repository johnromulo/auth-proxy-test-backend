"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _graphqltools = require('graphql-tools');
var _typesgraphql = require('../data/types.graphql'); var _typesgraphql2 = _interopRequireDefault(_typesgraphql);
var _users = require('../data/users'); var _users2 = _interopRequireDefault(_users);

const resolvers = {
  Query: {
    user: (_, args) => _users2.default.find((user) => user.id === args.id),
    totalUsers: () => _users2.default.length,
    allUsers: () => _users2.default,
  },
};

exports. default = _graphqltools.makeExecutableSchema.call(void 0, { typeDefs: _typesgraphql2.default, resolvers });
