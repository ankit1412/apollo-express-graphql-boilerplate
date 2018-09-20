import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';
import fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import glob from 'glob';
import directiveResolvers from './directiveResolvers';

const genSchema = () => {
  const pathToSchema = path.join(__dirname, '../schema');
  const graphqlTypes = glob
    .sync(`${pathToSchema}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: 'utf8' }));

  const resolvers = glob
    .sync(`${pathToSchema}/**/resolvers.js`)
    .map(resolver => require(resolver).default);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
    directiveResolvers,
  });
};

export default genSchema;
