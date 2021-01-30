const { validationResult } = require('./validationResult');
const { throwError } = require('../utils/helper');



//rule validation function
exports.validator = (req) => {
    const reqData = req.body; //get the request data
    
    /****************************** validate rule and its fields  *********************************/
    //check rule field
    if(!reqData.rule){
        return {
            error: true,
            result: {
                message: `rule is required.`,
                statusCode: 400
            }
        }
    }
    if(reqData.rule && (Object.prototype.toString.call(reqData.rule) !== '[object Object]')){
        return {
            error: true,
            result: {
                message: `rule should be an object.`,
                statusCode: 400
            }
        }
    }

   //check for all keys in the rule object if they were passed
  const ruleKeys = ['field', 'condition', 'condition_value'];
    ruleKeys.map(key => {
        if(!reqData.rule[key]){
            throwError({
                message: `${key} is required.`,
                statusCode: 400
            })
        }
   })
  

   //check datatype of rule keys
   ruleKeys.map(key => {
    if(key === 'field'){
        if(typeof(reqData.rule[key]) !== 'string'){
            throwError({
                message: `${key} should be a string.`,
                statusCode: 400
            })
        }
    }
    //check condition
    if(key === 'condition'){
        if(!(reqData.rule[key] === 'eq' 
          || reqData.rule[key] === 'neq'
          || reqData.rule[key] === 'gt'
          || reqData.rule[key] === 'gte'
          || reqData.rule[key] === 'contains'
        )){
            throwError({
                message: `Invalid ${key} value.`,
                statusCode: 400
            })
        }
    }
   })
  
   //check the field key of the rule object and get the value(s)
   let ruleFieldValues = null;
   let ruleFieldValue = null
   if(reqData.rule.field){
       const fieldString = reqData.rule.field;
       const isFieldNested = fieldString.includes('.');
       if(isFieldNested){
           ruleFieldValues = fieldString.split('.');
       }else{
           ruleFieldValue = fieldString;
       }
      // console.log(fieldString)
   }


   /**************************   validate data and its fields     *************************** */
   //check if data key is passed
   if(!reqData.data){
    return {
        error: true,
        result: {
            message: `data is required.`,
            statusCode: 400
        }
    }
  }
  //check datatype of data key: expecting string, array or object
  if( !(Object.prototype.toString.call(reqData.data) === '[object String]'
      || Object.prototype.toString.call(reqData.data) === '[object Object]'
      || Object.prototype.toString.call(reqData.data) === '[object Array]')
    ){
        return {
            error: true,
            result: {
                message: `data should be any of string, array or object.`,
                statusCode: 400
            }
        }
    }
    

    //check if the field specified in the rule object is passed in the data 
    //if data field type is an object
    if(Object.prototype.toString.call(reqData.data) === '[object Object]'){
        const dataKeys = Object.keys(reqData.data);
        //for no nesting
        if(ruleFieldValue){
            //console.log(ruleFieldValue)
            const isRuleFieldInData = dataKeys.includes(ruleFieldValue);
            if(!isRuleFieldInData){
                return {
                    error: true,
                    result: {
                        message: `field ${ruleFieldValue} is missing from data.`,
                        statusCode: 400
                    }
                }
            }
            //call validationResult fxn and send result 
            const { result, success } = validationResult({
                fieldName: ruleFieldValue,
                fieldValue: reqData.data[ruleFieldValue],
                condition: reqData.rule.condition,
                conditionValue: reqData.rule.condition_value
            })
            //console.log(reqData.data[ruleFieldValue], reqData.rule.condition, reqData.rule.condition_value)
            if(success){
                return {
                    error: false,
                    result: result
                }
            }
            return {
                error: true,
                statusCode: 400,
                result: result,  
            }
        }

        //for nested field values
        if(ruleFieldValues){
          const isFirstFieldValueInData = dataKeys.includes(ruleFieldValues[0]);
          const firstNestFieldName = reqData.data[ruleFieldValues[0]];
          //first level nesting
          if(ruleFieldValues.length == 2){
            if(!isFirstFieldValueInData){
               return {
                    error: true,
                        result: {
                            message: `field ${ruleFieldValues[0]} is missing from data.`,
                            statusCode: 400
                        }
                   }
            }           
            //check if firstNestFieldName contains an object
            if(Object.prototype.toString.call(firstNestFieldName) !== '[object Object]'){
                return {
                    error: true,
                    result: {
                        message: `field ${ruleFieldValues[1]} is missing from data.`,
                        statusCode: 400
                    }
                }
            }
            //check if first nesting of field value contains the ruleFieldValue[1]
            const firstNestDataKeys = Object.keys(firstNestFieldName);
            const isSecondFieldNameInData = firstNestDataKeys.includes(ruleFieldValues[1]);
            if(!isSecondFieldNameInData){
                return {
                    error: true,
                    result: {
                        message: `field ${ruleFieldValues[1]} is missing from data.`,
                        statusCode: 400
                    }
                }
            }
             //call validationResult fxn and send result 
             const { result, success } = validationResult({
                fieldName: ruleFieldValues[1],
                fieldValue: reqData.data[ruleFieldValues[0]][ruleFieldValues[1]],
                condition: reqData.rule.condition,
                conditionValue: reqData.rule.condition_value
            })
            //console.log(reqData.data[ruleFieldValue], reqData.rule.condition, reqData.rule.condition_value)
            if(success){
                return {
                    error: false,
                    result: result
                }
            }
            return {
                error: true,
                statusCode: 400,
                result: result,  
            }
          }
          
          //for 2nd level nesting
          if(ruleFieldValues.length >= 3){
              //check if first name in the field string is passed in the data
              if(!isFirstFieldValueInData){
                return {
                    error: true,
                    result: {
                        message: `field ${ruleFieldValues[0]} is missing from data.`,
                        statusCode: 400
                    }
                }
              }
              //check if the field passed contains a valid object
              if(Object.prototype.toString.call(firstNestFieldName) !== '[object Object]'){
                 return {
                    error: true,
                    result: {
                        message: `field ${ruleFieldValues[1]} is missing from data.`,
                        statusCode: 400
                    }
                }
              }
             //check if first nesting of field value contains the ruleFieldValue[1]
             const _firstNestDataKeys = Object.keys(firstNestFieldName);
             const _isSecondFieldNameInData = _firstNestDataKeys.includes(ruleFieldValues[1]);
             if(!_isSecondFieldNameInData){
                return {
                    error: true,
                    result: {
                        message: `field ${ruleFieldValues[1]} is missing from data.`,
                        statusCode: 400
                    }
                }
             }
             const secondNestFieldName = reqData.data[ruleFieldValues[0]][ruleFieldValues[1]];
             //check if second nest field contains an object
             if(Object.prototype.toString.call(secondNestFieldName) !== '[object Object]'){
                return {
                    error: true,
                    result: {
                        message: `field ${ruleFieldValues[2]} is missing from data.`,
                        statusCode: 400
                    }
                }
              }
              //check if first nesting of field value contains the ruleFieldValue[2]
              const secondNestDataKeys = Object.keys(secondNestFieldName);
              const isThirdFieldNameInData = secondNestDataKeys.includes(ruleFieldValues[2]);
              if(!isThirdFieldNameInData){
                return {
                    error: true,
                    result: {
                        message: `field ${ruleFieldValues[2]} is missing from data.`,
                        statusCode: 400
                    }
                }
              }
              //call validationResult fxn and send result 
              const { result, success } = validationResult({
                fieldName: ruleFieldValues[2],
                fieldValue: reqData.data[ruleFieldValues[0]][ruleFieldValues[1]][ruleFieldValues[2]],
                condition: reqData.rule.condition,
                conditionValue: reqData.rule.condition_value
              })
              //console.log(reqData.data[ruleFieldValue], reqData.rule.condition, reqData.rule.condition_value)
              if(success){
                return {
                    error: false,
                    result: result
                }
              }
              return {
                error: true,
                statusCode: 400,
                result: result,  
             }          
           }
       }
    }

    //if data is an array
    if(Object.prototype.toString.call(reqData.data) === '[object Array]' || Object.prototype.toString.call(reqData.data) === '[object String]'){
        //check if the field passed is a number
        if(isNaN(reqData.rule.field)){
            return {
                error: true,
                result: {
                    message: `field ${reqData.rule.field} should be a number.`,
                    statusCode: 400
                }
            }
        }
        // //check if the field exists in the data
        const isFieldInData = reqData.data[reqData.rule.field];
        if(!isFieldInData){
            return {
                error: true,
                result: {
                    message: `field ${ruleFieldValue} is missing from data.`,
                    statusCode: 400
                }
            }
        }
        // call validation result and send result
        const { result, success } = validationResult({
            fieldName: reqData.rule.field,
            fieldValue: reqData.data[reqData.rule.field],
            condition: reqData.rule.condition,
            conditionValue: reqData.rule.condition_value,
        })
        if(success){
            return {
                error: false,
                result: result
            }
        }
        return {
            error: true,
            statusCode: 400,
            result: result,  
        }
    }
}