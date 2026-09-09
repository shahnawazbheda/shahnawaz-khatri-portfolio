// EmailJS Configuration
// Get these values from your EmailJS dashboard: https://dashboard.emailjs.com/
// 1. Service ID: from "Email Services" tab
// 2. Template ID: from "Email Templates" tab
// 3. Public Key: from "Account" -> "API Keys" -> "Public Key"

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

export const isEmailJSConfigured = (): boolean => {
  return (
    Boolean(EMAILJS_CONFIG.serviceId) &&
    Boolean(EMAILJS_CONFIG.templateId) &&
    Boolean(EMAILJS_CONFIG.publicKey) &&
    EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY'
  );
};
