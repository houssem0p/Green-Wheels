const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  try {
    const { subscription_id, ride_id, amount, method, status } = req.body;
    
    // Use session user.id for security (don't trust request body)
    const user_id = req.session.user.id;

    const payment = await Payment.create({
      user_id,
      subscription_id,
      ride_id,
      amount,
      method,
      status
    });

    return res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      payment
    });
  } catch (err) {
    console.error('Create payment error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const user_id = req.session.user.id;
    const payments = await Payment.getUserPayments(user_id);
    
    return res.status(200).json({
      success: true,
      payments
    });
  } catch (err) {
    console.error('Get payments error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};