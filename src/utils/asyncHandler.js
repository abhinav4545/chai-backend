//promise vala tarika
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err))
    }
}


export {asyncHandler}



//1st: try-catch tareeka
//higher order functions: jo func , func ko as a 
//parametre accept krte hain ya return bhi kr skte hain

// const asyncHandler = () => {}
// const asyncHandler = (func) => {() => {}}

const asyncHandler = (fn) => async(req, res, next) =>  {
    try{
        await fn(req, res, next)

    }
    catch (error){
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })

    }

}