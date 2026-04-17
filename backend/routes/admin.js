const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// All routes protected
router.get("/users", isAuthenticated, isAdmin, adminController.getAllUsers);

router.patch("/users/:id/status", isAuthenticated, isAdmin, adminController.toggleUserStatus);

router.patch("/users/:id/role", isAuthenticated, isAdmin, adminController.changeUserRole);

router.delete("/users/:id", isAuthenticated, isAdmin, adminController.deleteUser);

module.exports = router;