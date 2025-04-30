const express = require("express");
const router = express.Router();
const employeeController = require("../Service/Employee.service");

router.post("/register", employeeController.registerEmployee);
router.get("/", employeeController.getAllEmployees);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
