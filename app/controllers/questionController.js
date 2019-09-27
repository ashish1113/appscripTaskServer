const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');
const QuestionModel = mongoose.model('Question');

let questionCreator = (req,res) =>{
    // to validate Quetion input
    validateQuestionInput = () =>{
        return new Promise((resolve,reject) =>{
            console.log("reqbody is",req.body)
            if(check.isEmpty(req.body.name) || check.isEmpty(req.body.bestCricketer) || check.isEmpty(req.body.colorSelected) || check.isEmpty(req.body.colorString)){
                logger.info('Some Inputs are empty', 'questionController: createQuestion')
                let apiResponse = response.generate(true, 'Some Inputs are empty', 404, null)
                reject(apiResponse);
            } else{
                resolve(req);
            }
        })
    } // end of validateQuestionInput function.

    let createQuestion = (resolvedReq) =>{
        return new Promise((resolve,reject) =>{
            let newQuestion = new QuestionModel({
                questionId: shortid.generate(),
                name: resolvedReq.body.name,
                bestCricketer: resolvedReq.body.bestCricketer,
                colorSelected: resolvedReq.body.colorSelected,
                colorString: resolvedReq.body.colorString,
                date: time.now()
            })


            newQuestion.save((err,result) =>{
                if(err){
                    console.log("error while saving quetion",err);
                    logger.error(err.message,'questionController: createQuestion ->save',10);
                    let apiResponse = response.generate(true,'failed to create&save new question',500,null);
                    reject(apiResponse)
                } else {
                    let newQuestObj = result.toObject();
                    
                    console.log("new question created",newQuestObj);
                    resolve(newQuestObj)
                }
            })

        })
    }


    validateQuestionInput(req,res)
        .then(createQuestion)
        .then((resolve) =>{
            let apiResponse = response.generate(false,'new question&answer created',200,resolve);
            res.send(apiResponse);
        })
        .catch((err)=>{
            console.log(err);
            res.send(err)
        })


}


let getAllQuestion = (req,res) =>{
    QuestionModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err,result) =>{
            if(err) {
                console.log(err);
                logger.error(err.message, 'questionController: getAllQuestion', 10)
                let apiResponse = response.generate(true, 'Failed To Find Question Details', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)){
                logger.info('No Question found', 'questionController: getAllQuestion')
                let apiResponse = response.generate(true, 'No Question found', 404, null)
                res.send(apiResponse)
            } else{
                logger.info('Questions found', 'questionController: getAllQuestion');
                let apiResponse = response.generate(false, 'All question found', 200, result)
                res.send(apiResponse)
            }
        })
} // end of get all list function.



module.exports = {
    questionCreator: questionCreator,
    getAllQuestion: getAllQuestion
}