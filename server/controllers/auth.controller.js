import * as authService from "../services/auth.service.js";

export const signUp = async (req, res) => {
  try {
    await authService.signUp(req.body);
    res.status(200).json({ message: "Now verify OTP" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Server Error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const result = await authService.verifyOTP(req.body);
    if (result?.passwordReset) {
      return res.status(200).json("Head to reset password now");
    }
    res.cookie("token", result.token).json(result.user);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Server Error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const result = await authService.signIn(req.body);
    res.status(200).cookie("token", result.token).json(result.user);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Server Error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No token found" });
    const info = await authService.getProfile(token);
    res.json(info);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "").json("ok");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendOTPPasswordReset = async (req, res) => {
  try {
    await authService.sendOTPPasswordReset(req.body.email);
    res.status(200).json({ message: "Now verify OTP" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body);
    res.status(200).json("Password reset successfully");
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Server Error" });
  }
};