const db = require("../config/db");

// #############################
//     USERS CRUD (Admin)
// #############################

// 1. Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const query = "SELECT id, full_name, email, phone, role, is_active, created_at FROM users";
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

// 2. Suspend / Activate user
exports.toggleUserStatus = async (req, res) => {
    try {
        const userId = req.params.id;

        const query = "UPDATE users SET is_active = NOT is_active WHERE id = ?";
        await db.query(query, [userId]);

        res.json({ message: "User status updated" });
    } catch (err) {
        res.status(500).json(err);
    }
};

// 3. Change role
exports.changeUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;

        if (!["admin", "user"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const query = "UPDATE users SET role = ? WHERE id = ?";
        await db.query(query, [role, userId]);

        res.json({ message: "Role updated" });
    } catch (err) {
        res.status(500).json(err);
    }
};

// 4. Delete user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const query = "DELETE FROM users WHERE id = ?";
        await db.query(query, [userId]);

        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
};


// ===============================
// MAINTENANCE CRUD
// ===============================

// 1. Get all maintenance tasks
exports.getAllMaintenance = async (req, res) => {
    try {
        const query = `
            SELECT m.*, v.type AS vehicle_type
            FROM maintenance m
            JOIN vehicles v ON m.vehicle_id = v.id
            ORDER BY m.scheduled_date DESC
        `;

        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};


// 2. Create maintenance task
exports.createMaintenance = async (req, res) => {
    try {
        const {
            vehicle_id,
            description,
            type,
            priorite,
            status,
            scheduled_date
        } = req.body;

        if (!vehicle_id || !description || !type || !priorite || !status || !scheduled_date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const query = `
            INSERT INTO maintenance 
            (vehicle_id, description, type, priorite, status, scheduled_date)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [
            vehicle_id,
            description,
            type,
            priorite,
            status,
            scheduled_date
        ]);

        res.json({
            message: "Maintenance created successfully",
            id: result.insertId
        });

    } catch (err) {
        res.status(500).json(err);
    }
};


// 3. Delete maintenance task
exports.deleteMaintenance = async (req, res) => {
    try {
        const maintenanceId = req.params.id;

        const query = "DELETE FROM maintenance WHERE id = ?";
        await db.query(query, [maintenanceId]);

        res.json({ message: "Maintenance deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};