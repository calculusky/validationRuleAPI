
//success message
const successMessage = (fieldName, fieldValue, condition, conditionValue) => {
    const result = {
        message: `field ${fieldName} successfully validated`,
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
const failureMessage = (fieldName, fieldValue, condition, conditionValue) => {
    const result = {
        message: `field ${fieldName} failed validation`,
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
    console.log(fieldName, fieldValue, condition, condition_value)
    switch (condition) {
        case 'eq':
            if(fieldValue == conditionValue){
              return successMessage(fieldName, fieldValue, condition, conditionValue);
            }
            return failureMessage(fieldName, fieldValue, condition, conditionValue);

        case 'neq':
            if(fieldValue == conditionValue){
            return successMessage(fieldName, fieldValue, condition, conditionValue);
            }
            return failureMessage(fieldName, fieldValue, condition, conditionValue)
    
        default:
            break;
    }
}