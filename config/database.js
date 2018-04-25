/**
 * 使用mongoose来连接Monggodb
 * @param url url是传过来的参数，代表连接的字符串
 * @param mongoose mongoose是传过来的参数，代表mongoose对象
 */
module.exports = function (url, mongoose) {

  var connect = function () {
    var options = {
      server: {
        socketOptions: {keepAlive: 1200000},
        poolSize: 10
      },
      auto_reconnect: true,
      useMongoClient:true
    };

    mongoose.Promise = global.Promise;
    mongoose.connect(url, options);
    console.log('Mongoose connection open to ' + url);
  };
  connect();

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err)
  });

  // Reconnect when closed
  mongoose.connection.on('disconnected', function () {
    console.error('✗ MongoDB Connection Error, reconnecting ... ');
    connect();
  });

};
