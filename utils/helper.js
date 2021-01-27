

  exports.throwError = ({ message, statusCode }) => {
    const error = new Error(message);
    error.status = 'error';
    error.statusCode = statusCode;
    error.data = null;
    throw error;
}

//rule validation function
exports.validationFunc = (reqData, throwErr) => {
    
    //check rule field
    if(!reqData.rule){
        return throwErr({
            message: 'rule is required',
            statusCode: 400
        })
    }
   //check for all keys in the rule object
  const ruleKeys = ['field', 'condition', 'condition_value'];
  return ruleKeys.map(key => {
       if(!reqData.rule[key]){
           return throwErr({
            message: `${key} is required`,
            statusCode: 400
        })
       }
   })
}