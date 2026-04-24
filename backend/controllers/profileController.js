const db = require('../config/db');

exports.getProfile = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM profiles WHERE user_id = ?', [req.session.userId]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: "Profile not found" });
    res.json({ success: true, profile: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { user_type, date_of_birth, address, city } = req.body;
  const userId = req.session.userId;

  // Get file paths if uploaded
  const student_id_url = req.files?.student_id_url?.[0]?.filename || null;
  const employment_doc_url = req.files?.employment_doc_url?.[0]?.filename || null;

  // Calculate completion percentage (based on 6 main fields)
  const fields = [user_type, date_of_birth, address, city, student_id_url, employment_doc_url];
  const filled = fields.filter(f => f && f !== '').length;
  const completion_pct = Math.round((filled / 6) * 100);
  const is_eligible = completion_pct >= 75 ? 1 : 0;

  try {
    // UPSERT logic: Update if exists, otherwise Insert
    const sql = `
      INSERT INTO profiles (user_id, user_type, date_of_birth, address, city, student_id_url, employment_doc_url, completion_pct, is_eligible_for_ai_pricing)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        user_type=VALUES(user_type), date_of_birth=VALUES(date_of_birth),
        address=VALUES(address), city=VALUES(city),
        student_id_url=COALESCE(VALUES(student_id_url), student_id_url),
        employment_doc_url=COALESCE(VALUES(employment_doc_url), employment_doc_url),
        completion_pct=VALUES(completion_pct), is_eligible_for_ai_pricing=VALUES(is_eligible_for_ai_pricing)
    `;

    await db.execute(sql, [userId, user_type, date_of_birth, address, city, student_id_url, employment_doc_url, completion_pct, is_eligible]);

    res.json({ success: true, completion_pct, is_eligible_for_ai_pricing: !!is_eligible });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};