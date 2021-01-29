
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


exports.validationResult = ({ fieldName, fieldValue, condition, conditionValue }) => {
    //console.log(fieldName, fieldValue, condition, conditionValue, '----------')
    const successMsg = `field ${fieldName} successfully validated`;
    const errorMsg = `field ${fieldName} failed validation`
    //return successMessage(fieldName, fieldValue, condition, conditionValue);

    switch (condition) {
        case 'eq':
            if(fieldValue == conditionValue){
              return successMessage(fieldName, fieldValue, condition, conditionValue, successMsg);
            }
            return failureMessage(fieldName, fieldValue, condition, conditionValue, errorMsg);

        case 'neq':
            if(fieldValue !== conditionValue){
              return successMessage(fieldName, fieldValue, condition, conditionValue, successMsg);
            }
            return failureMessage(fieldName, fieldValue, condition, conditionValue, errorMsg)
    
        default:
            break;
    }
}