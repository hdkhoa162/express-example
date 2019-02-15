
/***
 * Copyright 2018 @Practice
 * Author: Khoa Huynh
 * Date: 
 * File: routes/index.js
 * Description: Route: index. Routes declaration is setup in here.
 ***/

import _ from 'lodash';

const routers = ((ExpressRouter, controllers) => {    
    const exampleController = controllers.Example.default;

    ExpressRouter.get('/', (resquest, response, next) => {
        response.send('Welcome to my API');
    });

    ExpressRouter.post('/createexample', exampleController.createExample);

	return ExpressRouter;
});

export default routers;
