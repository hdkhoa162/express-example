/***
 * Copyright 2019 @Practice
 * Author: Khoa Huynh
 * Date: 2019
 * File: config/datastore.js
 * Description: Datastore configurations.
 ***/

const mongodb = (mongoose) => {

	const options = {		
		useNewUrlParser: true
	};

	return mongoose.connect(
		'', // Database connection goes here
		options, 
		(error) => {			
			if (error) throw error;
		}
	);

};

export default {
	mongodb	
};
