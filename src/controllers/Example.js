/***
 * Copyright 2019 @Example
 * Author: Khoa Huynh
 * Date: 2019
 * File: controllers/Example.js
 * Description: Provides the base question actions used to handle questions.
 ***/

import _ from 'lodash';

const ExampleModel = global._mongo.Example.default();
const LoggerType = global._utils.Logger.Type;
const Logger = global._utils.Logger;
const Errors = global._constants.Errors.default;
const Success = global._constants.Success.default;
const MessageType = global._constants.MessageTypes;

export default {
  index: (request, response, next) => {		// eslint-disable-line no-unused-vars
    // TODO: Need to implement to handle the index route
  },
    
  createExample: (request, response, next) => {
    try {
      const data = {};
      data.Description = request.body.description;
      data.Name = request.body.name;

      return new Promise((resolve, reject) => {
        ExampleModel.createExample(data).
          then((exampleObj) => {
            if (_.isEmpty(exampleObj)) {
              Logger.showLog(LoggerType.WARNING, Errors.system.HTTP_200);
              resolve(response.status(200).json({
                _status: 200,
                _data: MessageType.DATA_EMPTY,
                _message: Errors.system.HTTP_200,
                _ok: true,
              }));
            } else {
              Logger.showLog(LoggerType.INFO, Success.system.HTTP_200);
              resolve(response.status(200).json({
                _status: 200,
                _data: exampleObj,
                _message: Success.system.HTTP_200,
                _ok: true,
              }));
            }
          }).catch((error) => {
            Logger.showLog(LoggerType.ERROR, Errors.system.HTTP_500);
            reject(response.status(500).json({
              _status: 500,
              _error: error,
              _data: MessageType.DATA_EMPTY,
              _message: Errors.system.HTTP_500,
              _ok: false,
            }));
          });
      });
    } catch (error) {
      Logger.showLog(LoggerType.ERROR, Errors.system.HTTP_500);
      reject(response.status(500).json({
        _status: 500,
        _error: error,
        _data: MessageType.DATA_EMPTY,
        _message: Errors.system.HTTP_500,
        _ok: false,
      }));
    }    
  }
};

