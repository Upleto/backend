require('@babel/register')({ extensions: ['.js', '.ts'] });
// import all other files after the babel hook

const app = require('./app').default;

app.listen(3000, () => {
  console.log('koa started on http://localhost:3000/');
});
