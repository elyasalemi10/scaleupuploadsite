# Scale Up AI Website

A modern, responsive website for Scale Up AI featuring real-time face detection, AI consulting services, and professional contact forms.

## 🚀 Features

- **Real-time Face Detection**: Live camera feed with age, gender, emotion analysis using face-api.js
- **Responsive Design**: Modern UI with dark themes and smooth animations
- **Contact Forms**: Professional email integration with Resend API
- **Multiple Pages**: Home, Solutions, AI Voice Agent, AI Sales Assistant, Custom LLM, Computer Vision Tools, Staff Training Program
- **Team Showcase**: Expert profiles and expertise areas
- **Professional Branding**: Consistent design language throughout

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Animations**: Framer Motion
- **Face Detection**: face-api.js
- **Backend**: Express.js
- **Email**: Resend API
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/elyasalemi10/scaleupai.git
   cd scaleupai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Download face detection models**:
   ```bash
   npm run download-models
   ```

## 🏃‍♂️ Running the Application

### Development Mode

**Run both frontend and backend together** (recommended):
```bash
npm run dev:full
```

**Or run separately**:

Frontend only:
```bash
npm run dev
```

Backend only:
```bash
npm run server
```

### Production Build

```bash
npm run build
npm run preview
```

## 📧 Email Configuration

The contact form uses Resend API for email delivery. The current setup sends emails to `iscaleupwithai@gmail.com`.

### Backend Email Server

The Express.js backend (`server.js`) handles email sending via Resend API:
- **Endpoint**: `POST /api/send-email`
- **Port**: 3001
- **CORS**: Configured for local development

## 🤖 Face Detection

The Computer Vision Tools page features a live face detection demo that:
- Detects faces in real-time
- Shows age, gender, and emotion analysis
- Displays facial landmarks
- Uses optimized detection intervals for performance

### Model Files

Face detection models are downloaded separately to keep the repository size manageable:
- Run `npm run download-models` to download required model files
- Models are stored in `public/models/` (ignored by git)

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme
- **Gold Animations**: Premium success animations
- **Responsive Layout**: Mobile-first design
- **Professional Typography**: Modern font stack
- **Smooth Animations**: Framer Motion transitions

## 📱 Pages

1. **Home**: Hero section, solutions overview, team, contact
2. **Solutions**: AI services overview
3. **AI Voice Agent**: Voice AI solutions
4. **AI Sales Assistant**: Sales automation
5. **Custom LLM**: Large language model services
6. **Computer Vision Tools**: Live face detection demo
7. **Staff Training Program**: Training services
8. **Expertise**: Team member profiles

## 🔧 Configuration

### Environment Variables

No environment variables needed for basic setup. API keys are configured in the backend code.

### Customization

- **Colors**: Update `tailwind.config.js` for theme changes
- **Content**: Edit page components in `src/pages/`
- **Images**: Replace images in `public/` folder
- **Contact Info**: Update phone/email in ContactSection.jsx

## 📞 Contact Information

- **Phone**: (03) 84004145
- **Email**: iscaleupwithai@gmail.com
- **Website**: Scale Up AI

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- AWS
- Digital Ocean

For production deployment:
1. Update API endpoints in `src/api/resend.js`
2. Configure environment variables
3. Set up domain verification for Resend
4. Deploy both frontend and backend

## 📄 License

This project is private and proprietary to Scale Up AI.

## 🤝 Contributing

This is a private repository. Contact the team for contribution guidelines.

---

Built with ❤️ by Scale Up AI team