const { EErrors } = require("../services/errors/enums.js");

const handleError = (error, req, res, next) => {
    console.log(error.cause);
    switch(error.code) {
        case EErrors.TIPO_INVALIDO: 
        res.send({status: "error", error: error.name});
        break;
        default: 
        res.send({status: "error", error: "Error desconocido"}); 
    }
}

module.exports = handleError;