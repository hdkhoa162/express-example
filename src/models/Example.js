/***
 * Copyright 2019 @Practice
 * Author: Khoa Huynh
 * Date: 2019
 * File: model/mongodb/Example.js
 * Description: This is the base example
 ***/

import mongoose from 'mongoose';

const ExampleModel = function () {

	const schema = mongoose.Schema;

	/* Create a schema */
	const ExampleSchema = new schema({
		Name: { type: String, maxLength: 30, required: true },
		Description: { type: String, maxLength: 250, required: true },				
		CreatedAt: { type: Number, default: Date.now },
		UpdatedAt: { type: Number, default: Date.now }
	});	

	/* Create Example */
	ExampleSchema.methods.createExample = function (data) {

		return new Promise((resolve, reject) => {

			ExampleModel.create(data).
				then((exampleObj) => {
					if (exampleObj) {
						return exampleObj;
					} else {
						return false;
					}
				}).then((up) => { resolve(up); }).
				catch((error) => {
					reject(error);
				});
		});

	};


	/* Create a table with the predefined schema */
	return mongoose.model('Example', ExampleSchema);

}();

/* Create a table with the predefined schema */
export default ExampleModel;
