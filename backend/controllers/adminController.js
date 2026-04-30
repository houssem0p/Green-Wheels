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


// ===============================
// VEHICLE CRUD
// ===============================


// 1. Get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        const query = `
            SELECT v.*, s.name AS station_name
            FROM vehicles v
            JOIN stations s ON v.station_id = s.id
            ORDER BY v.id DESC
        `;

        const [rows] = await db.query(query);
        res.json(rows);

    } catch (err) {
        res.status(500).json(err);
    }
};


// 2. Create vehicle
exports.createVehicle = async (req, res) => {
    try {
        const {
            code,
            type,
            price_hour,
            autonomy,
            station_id,
            bettery_level,
            status,
            latitude,
            longitude
        } = req.body;

        if (
            !code ||
            !type ||
            !price_hour ||
            !autonomy ||
            !station_id ||
            !bettery_level ||
            !status
        ) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const query = `
            INSERT INTO vehicles 
            (code, type, price_hour, autonomy, station_id, bettery_level, status, latitude, longitude)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [
            code,
            type,
            price_hour,
            autonomy,
            station_id,
            bettery_level,
            status,
            latitude || 0,
            longitude || 0
        ]);

        res.json({
            message: "Vehicle created successfully",
            id: result.insertId
        });

    } catch (err) {
        res.status(500).json(err);
    }
};


// 3. Update vehicle
exports.updateVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;

        const {
            code,
            type,
            price_hour,
            autonomy,
            station_id,
            bettery_level,
            status,
            latitude,
            longitude
        } = req.body;

        const query = `
            UPDATE vehicles SET
                code = ?,
                type = ?,
                price_hour = ?,
                autonomy = ?,
                station_id = ?,
                bettery_level = ?,
                status = ?,
                latitude = ?,
                longitude = ?
            WHERE id = ?
        `;

        await db.query(query, [
            code,
            type,
            price_hour,
            autonomy,
            station_id,
            bettery_level,
            status,
            latitude,
            longitude,
            vehicleId
        ]);

        res.json({ message: "Vehicle updated successfully" });

    } catch (err) {
        res.status(500).json(err);
    }
};


// 4. Delete vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;

        const query = "DELETE FROM vehicles WHERE id = ?";
        await db.query(query, [vehicleId]);

        res.json({ message: "Vehicle deleted successfully" });

    } catch (err) {
        res.status(500).json(err);
    }
};


// ===============================
// RESERVATIONS CRUD
// ===============================

// 1. Get all reservations
exports.getAllReservations = async (req, res) => {
    try {
        const query = `
            SELECT 
                r.*,
                u.full_name AS user_name,
                v.code AS vehicle_name,
                s.name AS station_name
            FROM reservations r
            JOIN users u ON r.user_id = u.id
            JOIN vehicles v ON r.vehicle_id = v.id
            JOIN stations s ON r.station_id = s.id
            ORDER BY r.id DESC
        `;

        const [rows] = await db.query(query);
        res.json(rows);

    } catch (err) {
        res.status(500).json(err);
    }
};


// 2. Cancel reservation
exports.cancelReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        const query = `
            UPDATE reservations 
            SET status = 'cancelled'
            WHERE id = ?
        `;

        await db.query(query, [reservationId]);

        res.json({ message: "Reservation cancelled" });

    } catch (err) {
        res.status(500).json(err);
    }
};


// 3. Get reservation details (for modal)
exports.getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.id;

        const query = `
            SELECT 
                r.*,
                u.full_name AS user_name,
                v.code AS vehicle_name,
                s.name AS station_name
            FROM reservations r
            JOIN users u ON r.user_id = u.id
            JOIN vehicles v ON r.vehicle_id = v.id
            JOIN stations s ON r.station_id = s.id
            WHERE r.id = ?
        `;

        const [rows] = await db.query(query, [reservationId]);

        res.json(rows[0]);

    } catch (err) {
        res.status(500).json(err);
    }
};