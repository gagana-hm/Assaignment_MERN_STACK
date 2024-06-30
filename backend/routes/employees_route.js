const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { employeeSchema } = require("../validators/employeeValidator");
const uploadMiddleware = require("../helpers/helper");

router.post(
  "/",
  // uploadMiddleware.single("image"),
  employeeSchema,
  employeeController.create_employee
);

router.put("/:f_id", employeeController.update_employee); // image upload mechanism
router.get("/", employeeController.fetch_employee);
router.delete("/:f_id", employeeController.delete_employee);

module.exports = router;
