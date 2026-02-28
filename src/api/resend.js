// n8n webhook for contact form submissions
const WEBHOOK_URL = 'https://n8n.auseats.xyz/webhook-test/588e2cc3-c7b4-4e17-9861-d7e486834734';

export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        message: formData.message,
        source: 'contact_form',
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error;
  }
};
