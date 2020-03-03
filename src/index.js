function eval() {
    // Do not use eval!!!
    return;
}
  function expressionCalculator(expr) {
    const openBreksts = expr.match(/\p{Ps}/gu) || '';
    const closeBrekets = expr.match(/\p{Pe}/gu) || ''
    if(openBreksts.length != closeBrekets.length) throw new ('ExpressionError: Brackets must be paired')
    const arrExpr = expr.replace(/\s+/g, '').match(/[^-+*/()]+|[^]/g)
    const priority = {
      '+' : 0,
      '-' : 0,
      '/' : 1,
      '*' : 1
    }
    const calculation = (a, b, sign) => {
      if(sign === '+') return +a + +b;
      if(sign === '-') return +a - +b;
      if(sign === '/') return +a / +b;
      if(sign === '*') return +a * +b;
    }
    let arrNumber = [];
    let arrSign = [];
    for(let i = 0; i < arrExpr.length; i++){
      if(arrExpr[i] === '0' && arrSign[arrSign.length - 1] === '/') throw new('TypeError: Division by zero.')
      if(+arrExpr[i] >= 0){
        arrNumber.push(arrExpr[i])
      }else if(arrSign.length === 0){
        arrSign.push(arrExpr[i])
      }else if(arrExpr[i] === '('){
        arrSign.push(arrExpr[i])
      }else if(arrSign[arrSign.length - 1] === '('){
        if(arrExpr[i] === ')'){
          arrSign.pop()
        }else{
          arrSign.push(arrExpr[i])
        }
      }else{
        if(priority[arrExpr[i]] > priority[arrSign[arrSign.length - 1]]){
          arrSign.push(arrExpr[i])
        }else{
          let secondNumber = arrNumber.pop()
          let firstNumber = arrNumber.pop()
          let s = arrSign.pop()
          i--;
          arrNumber.push(calculation(firstNumber, secondNumber, s))
        }
      }
    }
    if(arrNumber.length > 1) {
      for(let i = 0; i< arrNumber.length; i++){
        let secondNumber = arrNumber.pop()
        let firstNumber = arrNumber.pop()
        let s = arrSign.pop();
        arrNumber.push(calculation(firstNumber, secondNumber, s))
      }
    }
    return parseFloat(arrNumber[0])
}


module.exports = {
    expressionCalculator
}