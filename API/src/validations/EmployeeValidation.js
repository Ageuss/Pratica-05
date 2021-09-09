module.exports = class validade{
  validateEmployee(validate){
    if(validate.name != '' && validate.office != '' && validate.birth_date != '' && validate.initial_date != ''){
      return validate
    } 
      validate = false;
      return validate;
  }

  validadeId(id){
    if(id > 0){
      return id;
    }
    return false;
  }
}
