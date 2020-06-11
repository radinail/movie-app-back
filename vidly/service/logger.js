const winston = require('winston');
require('winston-elasticsearch');
 
const esTransportOpts = {
  level: 'info',
  index: 'log-movie',
  clientOpts: { node: "http://localhost:9200" }
};
const  logger = winston.createLogger({
  transports: [
    new  winston.transports.Elasticsearch(esTransportOpts)
  ]
});

module.exports = logger;