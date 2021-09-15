var http = require("http");
var async = require("async");
var request = require("request");

console.log("node.js application starting...");
var options = {
  uri: "http://localhost:8090/assignServer",
  method: "POST",
  json: {
    userId: "1",
    capacity: "50",
  },
};
var options2 = {
  uri: "http://localhost:8090/assignServer",
  method: "POST",
  json: {
    userId: "2",
    capacity: "50",
  },
};
var options3 = {
  uri: "http://localhost:8090/assignServer",
  method: "POST",
  json: {
    userId: "3",
    capacity: "50",
  },
};
var options4 = {
  uri: "http://localhost:8090/assignServer",
  method: "POST",
  json: {
    userId: "4",
    capacity: "50",
  },
};

var svr = http.createServer(function (req, resp) {
  // an example using an object instead of an array
  setInterval(() => {
    async.parallel(
      {
        one: function (callback) {
          request.post(options);
        },
        two: function (callback) {
          request.post(options2);
        },
        three: function (callback) {
          request.post(options3);
        },
        four: function (callback) {
          request.post(options4);
        },
      },
      function (err, results) {
        // results is now equals to: {one: 1, two: 2}
        resp.writeHead(200, { "Content-Type": "application/json" });
        console.log(results);
        resp.end(JSON.stringify(results));
      }
    );
  }, 1000);
});

svr.listen(9000, function () {
  console.log("Node HTTP server is listening");
});

// var svr = http.createServer(function (req, resp) {
//   // an example using an object instead of an array
//   async.parallel(
//     {
//       one: function (callback) {
//         request.post(options, function (error, response, body) {
//           if (!error && response.statusCode == 200) {
//             callback(null, body);
//             console.log("hi");
//           } else {
//             callback(true, {});
//             console.log("hi2");
//           }
//         });
//       },
//       two: function (callback) {
//         request.post(options2, function (error, response, body) {
//           if (!error && response.statusCode == 200) {
//             callback(null, body);
//           } else {
//             callback(true, {});
//           }
//         });
//       },
//     },
//     function (err, results) {
//       // results is now equals to: {one: 1, two: 2}
//       resp.writeHead(200, { "Content-Type": "application/json" });
//       console.log(results);
//       resp.end(JSON.stringify(results));
//     }
//   );
// });
