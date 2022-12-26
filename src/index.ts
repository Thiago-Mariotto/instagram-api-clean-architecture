import dotenv from 'dotenv';
import ExpressAdapter from './infra/http/ExpressAdapter';

dotenv.config();

const PORT = process.env.PORT || 3001;
const httpServer = new ExpressAdapter();

httpServer.listen(PORT as number);