const express = require('express');
const router = express.Router();
const questionController = require("./../../app/controllers/questionController");
const appConfig = require("../../config/appConfig")

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/question`;

    app.post(`${baseUrl}/create`, questionController.questionCreator);

    app.get(`${baseUrl}/view/all`, questionController.getAllQuestion);

}