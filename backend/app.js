const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Router = require("./routes/route");
const EmployeeRouter = require("./routes/employees_route");
const path = require("path");

const fileUpload = require("express-fileupload");

const app = express();
const uploadsDir = path.join(__dirname, "uploads");
// Serve static files from the uploads directory
app.use("/uploads", express.static(uploadsDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "uploads/",
  })
);

// dotenv.config();

const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT" , "GET","DELETE"],
    allowedHeaders: ["Content-Type" ,"Authorization"],
  })
);

app.use("/", Router);
app.use("/employee", EmployeeRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server started running at http://localhost:" + port);
  } else {
    console.log("Error:" + error);
  }
});

module.exports = { app };
