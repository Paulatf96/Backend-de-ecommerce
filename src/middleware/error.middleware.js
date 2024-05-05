const { EErrors } = require("../services/errors/enum.js");

const handleError = (error, req, res, next) => {
    console.log(error.cause);
    switch(error.code) {
        case EErrors.INVALID_TYPE: 
        res.send({status: "error", error: error.name});
        break;
        default: 
        res.send({status: "error", error: "Error desconocido"}); 
    }
}

module.exports = handleError;