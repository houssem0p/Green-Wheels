const db = require('../config/db'); // MySQL connection

// CREATE
exports.createStation = (req, res) => {
    const { name, address, latitude, longitude, total_slots, is_active } = req.body;

    // Validation
    if (!name || !address) {
        return res.status(400).json({ message: "Name and address are required" });
    }

    if (total_slots <= 0) {
        return res.status(400).json({ message: "Total slots must be > 0" });
    }

    const sql = `
        INSERT INTO stations (name, address, latitude, longitude, total_slots, is_active)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, address, latitude, longitude, total_slots, is_active], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Station created successfully", id: result.insertId });
    });
};

// READ ALL
exports.getStations = (req, res) => {
    db.query(
        "SELECT * FROM stations WHERE is_active = true",
        (err, results) => {
            if (err) return res.status(500).json(err);

            res.json(results);
        }
    );
};

// READ ONE
exports.getStationById = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM stations WHERE id = ? AND is_active = true", [id], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0)
            return res.status(404).json({ message: "Station not found" });

        res.json(results[0]);
    });
};

// UPDATE
exports.updateStation = (req, res) => {
    const { id } = req.params;
    const { name, address, latitude, longitude, total_slots, is_active } = req.body;

    const sql = `
        UPDATE stations 
        SET name = ?, address = ?, latitude = ?, longitude = ?, total_slots = ?, is_active = ?
        WHERE id = ?
    `;

    db.query(sql, [name, address, latitude, longitude, total_slots, is_active, id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Station updated successfully" });
    });
};

// DELETE
exports.deleteStation = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM stations WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Station deleted successfully" });
    });
};

// DEACTIVATE (soft delete)
exports.deactivateStation = (req, res) => {
    const { id } = req.params;

    db.query(
        "UPDATE stations SET is_active = false WHERE id = ?",
        [id],
        (err) => {
            if (err) return res.status(500).json(err);

            res.json({ message: "Station deactivated" });
        }
    );
};