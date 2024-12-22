const {ZodError} = require("zod")
const {z} = require("zod")


const InputValidation =(schema)=>(req, res, next)=>{
    try{
        schema.parse(req.body);
        next()
    }catch(error){
        return res.status(404).json({
            message: error
        })
    }

}

module.exports = InputValidation