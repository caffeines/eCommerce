const mongoose = require( 'mongoose' );
const {
  mongoURL
} = require( './database' );

// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect( mongoURL, {
  useNewUrlParser: true
} );
mongoose.connection
  // @ts-ignore
  .once( 'open', () => consola.info( {
    message: `mongoDB connected successfully...`,
    badge: true
  } ) )
  .on( 'error', err => {
    throw err;
  } );

module.exports = {
  conn: mongoose.connection
}
