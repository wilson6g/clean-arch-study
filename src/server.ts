import dotenv from 'dotenv';
import { ExpressAdapter } from './infra/framework-drivers/HttpClient/ExpressAdapter/ExpressAdapter';

dotenv.config();

const httpServer = new ExpressAdapter();

httpServer.listen(3000);