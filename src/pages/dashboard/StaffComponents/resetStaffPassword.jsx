// Add this function to your staffController.js

// Admin reset staff password
export const resetStaffPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    // Validate input
    if (!newPassword) {
      return res.status(400).json({
        message: "New password is required",
        isSuccess: false,
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        isSuccess: false,
      });
    }

    // Find staff
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
        isSuccess: false,
      });
    }

    // ✅ Set new password - pre-save hook will hash it automatically
    staff.password = newPassword;
    await staff.save();

    res.status(200).json({
      message: "Staff password reset successfully",
      isSuccess: true,
      staff: {
        id: staff._id,
        username: staff.username,
        email: staff.email,
      },
    });
  } catch (error) {
    console.error("❌ Reset staff password error:", error);
    res.status(500).json({
      message: "Internal server error",
      isSuccess: false,
      error: error.message,
    });
  }
};