const db = require('../config/db');

class Vehicle {
  static async migrate() {
    // No migration needed - vehicles table already exists
  }

  static async findAllAvailable() {
    const [rows] = await db.execute(
      `SELECT
         id,
         code AS title,
         code,
         type,
         price AS base_price,
         station_id,
         battery_level,
         status,
         latitude,
         longitude,
         last_seen_at
       FROM vehicles
       WHERE status = 'available'
       ORDER BY code`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      `SELECT
         id,
         code AS title,
         code,
         type,
         price AS base_price,
         station_id,
         battery_level,
         status,
         latitude,
         longitude,
         last_seen_at
       FROM vehicles
       WHERE id = ?
         AND status = 'available'`,
      [id]
    );
    return rows[0] || null;
  }
}

module.exports = Vehicle;