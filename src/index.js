require('@babel/register')({ extensions: ['.js', '.ts'] });
// import all other files after the babel hook
require('./app');
