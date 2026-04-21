const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// All routes protected

// ===============================
// USER MANAGEMENT ROUTES
// ===============================  

router.get("/users", isAuthenticated, isAdmin, adminController.getAllUsers);

router.patch("/users/:id/status", isAuthenticated, isAdmin, adminController.toggleUserStatus);

router.patch("/users/:id/role", isAuthenticated, isAdmin, adminController.changeUserRole);

router.delete("/users/:id", isAuthenticated, isAdmin, adminController.deleteUser);


// ===============================
// MAINTENANCE ROUTES
// ===============================

// Get all maintenance
router.get("/maintenance", isAuthenticated, isAdmin, adminController.getAllMaintenance);

// Create maintenance
router.post("/maintenance", isAuthenticated, isAdmin, adminController.createMaintenance);

// Delete maintenance
router.delete( "/maintenance/:id", isAuthenticated, isAdmin, adminController.deleteMaintenance);

module.exports = router;