const kafka = require('kafka-node'),

Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);


producer.on('ready', function () {
	console.log('Producer ready');
});
	 
producer.on('error', function (err) {
	console.log('Producer error');
});

	
const publish = (topic, messages) => {

	payloads = [
        { topic, messages},  
	];
	
	producer.send(payloads, function (err, data) {
		console.log('message published', data);
		console.log('error when publishing message ', err);
    });
}

Consumer = kafka.Consumer;
const createMovieConsumer = new Consumer(client,[{ topic: 'Movie'}]);


module.exports = {
	publish,
	createMovieConsumer
}