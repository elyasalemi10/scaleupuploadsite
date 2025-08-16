// API endpoint for sending emails via our backend
const API_BASE_URL = 'http://localhost:3001';

export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending email via backend:', error);
    throw error;
  }
};
