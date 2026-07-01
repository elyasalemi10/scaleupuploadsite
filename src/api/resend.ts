// API endpoint for sending emails. Same-origin in Next.js (dev and prod);
// override with NEXT_PUBLIC_API_BASE_URL only if the API lives elsewhere.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

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
