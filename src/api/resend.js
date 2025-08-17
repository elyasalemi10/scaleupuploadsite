// API endpoint for sending emails via backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const sendContactEmail = async (formData) => {
  try {
    console.log('Sending email with API_BASE_URL:', API_BASE_URL);
    console.log('Full URL:', `${API_BASE_URL}/api/send-email`);
    
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      throw new Error(errorData.error || 'Failed to send email');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending email via backend:', error);
    throw error;
  }
};
