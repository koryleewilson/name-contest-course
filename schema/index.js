//import type halpers from graphql-js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const UserType = require('./types/user');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        me: {
            type: UserType,
            description: 'the current user identified by an api key',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (obj, args, {loaders}) => {
                return loaders.usersByApiKeys.load(args.key);
            }
        }
    }
});

const AddContestMutation = require('./mutations/add-contest');
const AddNameMutation = require('./mutations/add-name');

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',

    fields: () => ({
        AddContest: AddContestMutation,
        AddName: AddNameMutation
    })
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = ncSchema;