const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} = require('graphql');

const ContestStatusType = require('./contest-status');

module.exports = new GraphQLObjectType({
    name: 'Contest',

    fields: () => {
        const NameType = require('./name');
        return {
            id: { type: GraphQLID },
            code: { type: new GraphQLNonNull(GraphQLString) },
            title: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString},
            status: { type: new GraphQLNonNull(ContestStatusType) },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            names: {
                type: new GraphQLList(NameType),
                    resolve(obj, args, {loaders}) {
                    return loaders.namesForContestIds.load(obj.id);
                }
            }
        };
    }
});