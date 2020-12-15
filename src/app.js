import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import schema from "./schema";

const app = express();

const port = process.env.PORT || 3400;

app.use(cors());
app.use(bodyParser.json());

app.use(
  "/api/graphiql",
  graphiqlExpress({
    endpointURL: "/api/graphql",
  })
);

const routes = express.Router();

routes.post(
  "/api/graphql",
  bodyParser.json(),
  (req, res, next) => {
    console.log('graphql req.headers["auth-token"]', req.headers["auth-token"]);
    next();
  },
  graphqlExpress({ schema })
);

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
