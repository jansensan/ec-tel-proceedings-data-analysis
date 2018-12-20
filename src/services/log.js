// public api
let Log = {
  error: error,
  warn: warn,
};
export default Log;

function error(object, methodName, message) {
  throw new Error(
    'Error at '
      + object
      + '.'
      + methodName
      + ': '
      + message
  );
}

function warn(object, methodName, message) {
  console.warn(
    'Error at '
      + object
      + '.'
      + methodName
      + ': '
      + message
  );
}