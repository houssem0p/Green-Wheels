const db = require("../config/db"); // your DB connection

 
// 1. Get all users
exports.getAllUsers = (req, res) => {
    const query = "SELECT id, full_name, email, phone, role, is_active, created_at FROM users";

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// 2. Suspend / Activate user
exports.toggleUserStatus = (req, res) => {
    const userId = req.params.id;

    const query = "UPDATE users SET is_active = NOT is_active WHERE id = ?";

    db.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User status updated" });
    });
};

// 3. Change role
exports.changeUserRole = (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    const query = "UPDATE users SET role = ? WHERE id = ?";

    db.query(query, [role, userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Role updated" });
    });
};

// 4. Delete user (optional)
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    const query = "DELETE FROM users WHERE id = ?";

    db.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User deleted" });
    });
};