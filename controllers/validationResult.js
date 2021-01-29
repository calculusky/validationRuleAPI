
//success message
const successMessage = (fieldName, fieldValue, condition, conditionValue, message) => {
    const result = {
        message: message,
        status: 'success',
        data: {
            validation: {
                error: false,
                field: fieldName,
                field_value: fieldValue,
                condition: condition,
                condition_value: conditionValue
            }
        }
    }
    return {
        result: result,
        success: true
    }
}

// failure message
const failureMessage = (fieldName, fieldValue, condition, conditionValue, message) => {
    const result = {
        message: message,
        status: 'error',
        data: {
            validation: {
                error: true,
                field: fieldName,
                field_value: fieldValue,
                condition: condition,
                condition_value: conditionValue
            }
        }
    }
    return {
        result: result,
        success: false
    }
}

//object
exports.validationResult = ({ fieldName, fieldValue, condition, conditionValue }) => {
    //console.log(fieldName, fieldValue, condition, conditionValue, '----------')
    const successMsg = `field ${fieldName} successfully validated.`;
    const errorMsg = `field ${fieldName} failed validation.`;
    //return successMessage(fieldName, fieldValue, condition, conditionValue);

    switch (condition) {
        case 'eq':
            if(fieldValue == conditionValue){
              return successMessage(fieldName, fieldValue, condition, conditionValue, successMsg);
            }
            return failureMessage(fieldName, fieldValue, condition, conditionValue, errorMsg);

        case 'neq':
            if(fieldValue != conditionValue){
              return successMessage(fieldName, fieldValue, condition, conditionValue, successMsg);
            }
            return failureMessage(fieldName, fieldValue, condition, conditionValue, errorMsg);
        
        case 'gt':
            if(fieldValue > conditionValue){
                return successMessage(fieldName, fieldValue, condition, conditionValue, successMsg);
            }
            return failureMessage(fieldName, fieldValue, condition, conditionValue, errorMsg);

        case 'gte':
            if(fieldValue >= conditionValue){
                return successMessage(fieldName, fieldValue, condition, conditionValue, successMsg);
            }
            return failureMessage(fieldName, fieldValue, condition, conditionValue, errorMsg);

        default:
            //'contains' condition
            if(fieldValue == conditionValue){
                return successMessage(fieldName, fieldValue, condition, conditionValue, successMsg);
            }         
            return failureMessage(fieldName, fieldValue, condition, conditionValue, errorMsg);
    }
}

//for array
const arrSuccessMsg = (fieldName, condition, conditionValue, message) => {
    const result = {
        message: message,
        status: 'success',
        data: {
            validation: {
                error: false,
                field: fieldName,
                condition: condition,
                condition_value: conditionValue
            }
        }
    }
    return {
        result: result,
        success: true
    }
}

//fail message
const arrFailMsg = (fieldName, condition, conditionValue, message) => {
    const result = {
        message: message,
        status: 'error',
        data: {
            validation: {
                error: true,
                field: fieldName,
                condition: condition,
                condition_value: conditionValue
            }
        }
    }
    return  {
        result: result,
        success: false
    }
}
exports.validateArray = ({ fieldName, condition, conditionValue }) => {
    const successMsg = `field ${fieldName} successfully validated.`;
    const errorMsg = `field ${fieldName} failed validation.`
    switch (condition) {
        case 'eq':
            if(fieldName == conditionValue){
                return arrSuccessMsg(fieldName, condition, conditionValue, successMsg)
            }
            return arrFailMsg(fieldName, condition, conditionValue, errorMsg)

        case 'neq':
            if(fieldName != conditionValue){
                return arrSuccessMsg(fieldName, condition, conditionValue, successMsg)
            }
            return arrFailMsg(fieldName, condition, conditionValue, errorMsg);

        case 'gt':
            if(fieldName > conditionValue){
                return arrSuccessMsg(fieldName, condition, conditionValue, successMsg)
            }
            return arrFailMsg(fieldName, condition, conditionValue, errorMsg);

        case 'gte':
            if(fieldName !== conditionValue){
                return arrSuccessMsg(fieldName, condition, conditionValue, successMsg)
            }
            return arrFailMsg(fieldName, condition, conditionValue, errorMsg);

        default:
            return arrFailMsg(fieldName, condition, conditionValue, errorMsg);
    }   
    
}