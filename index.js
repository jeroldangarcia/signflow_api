var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

const users = {
  p_lopez: {
    "_id":"58505fc215d14cd1de5cc03c",
    "email":"p_lopez@eci.es",
    "name":"Pedro",
    "family_name":"López",
    "login":"p_lopez",
    "roles":["compras"]
  },
  d_echebarria: {
    "_id":"58505fc215d14cd1de5cc03c",
    "email":"d_echebarria@eci.es",
    "name":"David",
    "family_name":"Echebarria",
    "login":"d_echebarria",
    "roles":["marketing"]
  },
  j_huete: {
    "_id":"58505fc215d14cd1de5cc03c",
    "email":"j_huete@eci.es",
    "name":"Julio",
    "family_name":"Huete",
    "login":"j_huete",
    "roles":["ppv"]
  },
  j_rayon: {
    "_id":"58505fc215d14cd1de5cc03c",
    "email":"j_rayon@eci.es",
    "name":"Javier",
    "family_name":"Rayon",
    "login":"j_rayon",
    "roles":["realizacion"]
  },
}

server.post('/authenticate', function (req, res) {
  console.log(req.body)
  res.jsonp({
    success: true,
    token: req.body.login,
  })
})

server.get('/api/me', function (req, res) {
  res.jsonp(users[req.headers['x-access-token']]);
})

server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(5000, function () {
  console.log('JSON Server is running')
})
