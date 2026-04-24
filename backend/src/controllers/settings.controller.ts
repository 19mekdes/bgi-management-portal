// src/controllers/settings.controller.js
const { SettingsService } = require('../services/settings.service');

const settingsService = new SettingsService();

// Phone number validation helper
const validatePhoneNumber = (phone: string) => {
  if (!phone) return true;
  // International phone number pattern
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
  return phoneRegex.test(phone);
};

// Format phone number for display
const formatPhoneNumber = (phone: string) => {
  if (!phone) return '';
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Format as +XXX XXX XXX XXX
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  return phone;
};

const updateProfile = async (req: { user: { id: any; }; body: { name: any; email: any; phone: any; address: any; position: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; }): void; new(): any; }; }; json: (arg0: { success: boolean; message: string; user: any; }) => void; }) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, address, position } = req.body;
    
    // Validate phone number if provided
    if (phone && !validatePhoneNumber(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number'
      });
    }
    
    const user = await settingsService.updateProfile(userId, {
      name,
      email,
      phone: phone ? formatPhoneNumber(phone) : null,
      address,
      position
    });
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const changePassword = async (req: { user: { id: any; }; body: { currentPassword: any; newPassword: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; }): void; new(): any; }; }; json: (arg0: { success: boolean; message: string; }) => void; }) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }
    
    const success = await settingsService.changePassword(
      userId,
      currentPassword,
      newPassword
    );
    
    if (!success) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const updateUserRole = async (req: { params: { id: any; }; body: { role: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; }): void; new(): any; }; }; json: (arg0: { success: boolean; message: string; user: any; }) => void; }) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    
    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'Role is required'
      });
    }
    
    const user = await settingsService.updateUserRole(userId, role);
    
    res.json({
      success: true,
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getPreferences = async (req: { user: { id: any; }; }, res: { json: (arg0: { success: boolean; preferences: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; }): void; new(): any; }; }; }) => {
  try {
    const userId = req.user.id;
    const preferences = await settingsService.getPreferences(userId);
    
    res.json({
      success: true,
      preferences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updatePreferences = async (req: { user: { id: any; }; body: { theme: any; language: any; notifications: any; }; }, res: { json: (arg0: { success: boolean; message: string; preferences: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; }): void; new(): any; }; }; }) => {
  try {
    const userId = req.user.id;
    const { theme, language, notifications } = req.body;
    
    const preferences = await settingsService.updatePreferences(userId, {
      theme,
      language,
      notifications
    });
    
    res.json({
      success: true,
      message: 'Preferences updated successfully',
      preferences
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  updateProfile,
  changePassword,
  updateUserRole,
  getPreferences,
  updatePreferences,
  validatePhoneNumber,
  formatPhoneNumber
};