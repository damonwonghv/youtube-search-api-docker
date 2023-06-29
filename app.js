const express = require("express");
const http = require("http");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const logger = require("./src/utils/logger.util");
const apiRoutes = require("./src/api.router");
const loggerMiddleware = require("./src/middlewares/logger.middleware");


logger.info("youtube-search-api server starting...");

const httpPort = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


const server=http.createServer(app);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Youtube-search-api",
      version: "1.0.0"
    }
  },
  apis: ["./src/*router.js"] // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api/v1",loggerMiddleware, apiRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/docs", (req, res) => {
  res.status(200).send(openapiSpecification);
});

app.get("/", (req, res) => {
    res.status(200).json({ success: true, status: "online" });
});

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
  logger.error(err)
}

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

server.listen(httpPort, () => {
  const msg = `youtube-search-api server started, listen port: ${httpPort}`;
  logger.info(msg);
});

module.exports = app;