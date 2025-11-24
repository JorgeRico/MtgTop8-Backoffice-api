export class ErrorController {
    /**
     * Message errors
     * @params message, errors 
     * @returns 
     */
    static getErrorMessage(message, errors) {
        return {
            "message" : message, 
            "errors"  : JSON.parse(errors)
        }
    }

    /**
     * Get Empty error object
     * @returns Empty error
     */
    static emptyError() {
        return {
            "message" : "No values found", 
            "errors"  : [
                {
                    "expected" : "",
                    "code"     : "invalid_type",
                    "received" : "NaN",
                    "path"     : [],
                    "message"  : "Invalid input: result not found"
                }
            ]
        }
    }

    static messageNoErrorsArray(message) {
        return {
            "message" : message, 
            "errors"  : [
                {
                    "expected" : "",
                    "code"     : "invalid_type",
                    "received" : "NaN",
                    "path"     : [],
                    "message"  : "Invalid input: result not found"
                }
            ]
        }
    }
}