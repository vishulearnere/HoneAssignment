// it is async wrapper

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
            // if everything is fine then it will return this 

        } catch (error) {
            next(error)
            // if everything is not fine then it will return error for next when error is found on next then in task.js(controller)

        }

    }

}
module.exports = asyncWrapper