"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _apolloserverexpress = require('apollo-server-express');
var _schema = require('./schema'); var _schema2 = _interopRequireDefault(_schema);

const app = _express2.default.call(void 0, );

const port = 3400;
app.use(_cors2.default.call(void 0, ));
app.use(_bodyparser2.default.json());
app.use(
  "/api/graphql",
  _bodyparser2.default.json(),
  (req, res, next) => {
    console.log('graphql req.headers["auth-token"]', req.headers["auth-token"]);
    next();
  },
  _apolloserverexpress.graphqlExpress.call(void 0, { schema: _schema2.default })
);
app.use(
  "/api/graphiql",
  _apolloserverexpress.graphiqlExpress.call(void 0, {
    endpointURL: "/api/graphql",
  })
);

const routes = _express2.default.Router();

routes.post("/api/login", (req, res) => {
  console.log('api/login req.headers["auth-token"]', req.headers["auth-token"]);

  if (req.body.email === "admin@example.com") {
    res.status(200).json({ authToken: "123" });
  } else {
    res.status(400).json({ error: "Invalid credentials" });
  }
});

routes.get("/api/me", (req, res) => {
  console.log('/api/me req.headers["auth-token"]', req.headers["auth-token"]);

  const authToken = req.headers["auth-token"];

  if (authToken === "123") {
    res.status(200).json({ email: "admin@example.com" });
  } else if (!req.headers.authToken) {
    res.status(401).json({ error: "Authentication required" });
  } else {
    res.status(403).json({ error: "Not permitted" });
  }
});

routes.get("/api/teste", (req, res) => {
  console.log(
    '/api/teste req.headers["auth-token"]',
    req.headers["auth-token"]
  );

  const authToken = req.headers["auth-token"];

  if (authToken === "123") {
    res.status(200).json({ email: "admin@example.com" });
  } else if (!req.headers.authToken) {
    res.status(401).json({ error: "Authentication required" });
  } else {
    res.status(403).json({ error: "Not permitted" });
  }
});

app.use(routes);
app.listen(port, () => console.log(`Server on ${port}`));
