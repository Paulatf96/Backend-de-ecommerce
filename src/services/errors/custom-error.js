class CustomError {
    static crearError({name = "Error", cause = "Desconocido", message, code = 1}){
        const error = new Error(message); 
        error.name = name;
        error.cause = cause;
        error.code = code;
        throw error; 
    }

}

module.exports = CustomError; 