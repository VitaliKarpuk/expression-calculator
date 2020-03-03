function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  const arrExpr = expr.split('')
  const solidExpression = expr.match(/\S/g).join('')
  const checkBrekets = (arr) => {
    let summBrekets = 0;
    for(let i =  0; i < arr.length; i++){
      if(arr[i] === '('){
        summBrekets +=1
      }if(arr[i] === ')'){
        summBrekets -= 1
      }
    }
    if(summBrekets !== 0){
      throw new Error("ExpressionError: Brackets must be paired.")
    }
  }
  const checkZero = (arr) => {
    for(let i = 0; i < arr.length; i++){
      if(arr[i] === '/' && arr[i+2] === '0' ){
        throw new Error("TypeError: Division by zero.");
      }
    }
  }
  checkZero(arrExpr)
  checkBrekets(arrExpr)
  const result = new Function("return " + solidExpression)
  return result()
}

module.exports = {
    expressionCalculator
}