const {Movie} = require('../models/movie'); 
const {createMovieConsumer} = require('../queue/kafka-queue-subscriber');
const {Genre} = require('../models/genre');


const createMovie = async (newMovie) => {
	const genre = await Genre.findById(newMovie.genreId);
	  if (!genre) return null;
	  
	const movie = new Movie({ 
		title: newMovie.title,
		genre: {
		  _id: genre._id,
		  name: `${genre.name} from kafka`
		},
		numberInStock: newMovie.numberInStock,
		dailyRentalRate: newMovie.dailyRentalRate
	  });
	await movie.save();
}

const subscribeCreateMOvie = () => {	
	createMovieConsumer.on('message', async (message) => {
		console.log('the new movie to create ', message);
		await createMovie(JSON.parse(message.value));
	})
}

module.exports = {
	subscribeCreateMOvie
}
