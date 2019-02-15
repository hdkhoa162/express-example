/***
 * Copyright 2019 @Practice
 * Author: Khoa Huynh
 * Date: 2019
 * File:
 * Description: App setup file.
 ***/

/* Load dependent plugins */
import express from 'express';
import path from 'path';
import chalk from 'chalk';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import _ from 'lodash';
import mongoose from 'mongoose';
import load from 'consign';

/* Database Connection*/
import datastore from './config/datastore';

/* Routes */
import routers from './routes';

/* Create App */
const App = express();
global.App = App;

App.use(cors());

/* Database Connection */
datastore.mongodb(mongoose);


App.use(express.static(path.join(__dirname, 'public')));

/* View engine setup */
App.set('views', path.join(__dirname, 'views'));
App.set('view engine', 'ejs');

App.use(cookieParser());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
    console.log(chalk.green('\n-=-=-=-=-=-=-=-=-=-=- Development Environment -=-=-=-=-=-=-=-=-=-=-'));

    load().include('/src/models')
        .then('/src/config')
        .then('/src/constants')
        .then('/src/utils')        
        .into(App);

        if (!_.isEmpty(App.src)) {
            
            global._mongo = App.src.models;
            console.log(chalk.green('\n\u2713 Models Loaded'));

            global._config = App.src.config;
            console.log(chalk.green('\n\u2713 Models Loaded'));

            global._constants = App.src.constants;
            console.log(chalk.green('\u2713 Contants Loaded'));

            global._utils = App.src.utils;
            console.log(chalk.green('\u2713 Utils Loaded'));

            load().include('/src/controllers').into(App);
            global._controllers = App.src.controllers;

            const ExpressRouter = express.Router();
            const router = routers(ExpressRouter, global._controllers);
            App.use('/', router);
            console.log(chalk.green('\u2713 Routes Loaded'));

            App.listen(process.env.APP_PORT);
            console.log(chalk.blue(`\The API listening on port:${process.env.APP_PORT}`));
        }
        
} else if (process.env.NODE_ENV === 'production') {
    console.log(chalk.green('\n-=-=-=-=-=-=-=-=-=-=- Production Environment -=-=-=-=-=-=-=-=-=-=-'));
}

export default App;
