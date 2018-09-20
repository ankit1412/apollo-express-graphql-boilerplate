import 'dotenv/config';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, PubSub } from 'apollo-server-express';
import genSchema from './utils/genSchema';
import getUser from './utils/getUser';
import confirmEmail from './utils/confirmEmail';

const startServer = async () => {
  const port = process.env.PORT || 4000;
  const hostname = process.env.HOSTNAME || 'localhost';

  const app = express();

  app.get('/confirmation/:token', async (req, res) => {
    await confirmEmail(req, res);
  });

  const schema = genSchema();
  const pubsub = new PubSub();

  const server = new ApolloServer({
    schema,
    formatError: (error) => {
      const message = error.message
        .replace('Context creation failed: ', '');
      return {
        ...error,
        message,
      };
    },
    context: async ({ req }) => {
      const token = req.headers.authorization;
      return {
        currentUser: await getUser(token),
        url: `${req.protocol}://${req.hostname}:${port}`,
        pubsub,
      };
    },
  });

  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(async () => {
      console.log('📚  Connected to database');
      await httpServer.listen(({ port, hostname }), () => {
        console.log(`🚀  Server ready at http://${hostname}:${port}/graphql`);
      });
    })
    .catch(err => console.error(err));
};

export default startServer;
