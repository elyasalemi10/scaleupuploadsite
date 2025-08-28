import { lazy, Suspense } from 'react';
import Layout from "./Layout.jsx";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Lazy load non-critical pages for better initial load performance
const Solutions = lazy(() => import("./Solutions"));
const Expertise = lazy(() => import("./Expertise"));
const Contact = lazy(() => import("./Contact"));
const AIVoiceAgent = lazy(() => import("./AIVoiceAgent"));
const AISalesAssistant = lazy(() => import("./AISalesAssistant"));
const CustomLLM = lazy(() => import("./CustomLLM"));
const StaffTrainingProgram = lazy(() => import("./StaffTrainingProgram"));
const ComputerVisionTools = lazy(() => import("./ComputerVisionTools"));
const NotFound = lazy(() => import("./NotFound"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
);

const PAGES = {
    
    Home: Home,
    
    Services: Solutions,
    
    Expertise: Expertise,
    
    Contact: Contact,
    
    AIVoiceAgent: AIVoiceAgent,
    
    AISalesAssistant: AISalesAssistant,
    
    CustomLLM: CustomLLM,
    
    StaffTrainingProgram: StaffTrainingProgram,
    
    ComputerVisionTools: ComputerVisionTools,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Suspense fallback={<PageLoader />}>
                <Routes>            
                    
                        <Route path="/" element={<Home />} />
                    
                    
                    <Route path="/Home" element={<Home />} />
                    
                    <Route path="/Services" element={<Solutions />} />
                    
                    {/* Redirect old Solutions URL to Services */}
                    <Route path="/Solutions" element={<Solutions />} />
                    
                    <Route path="/Expertise" element={<Expertise />} />
                    
                    <Route path="/Contact" element={<Contact />} />
                    
                    <Route path="/AIVoiceAgent" element={<AIVoiceAgent />} />
                    
                    <Route path="/AISalesAssistant" element={<AISalesAssistant />} />
                    
                    <Route path="/CustomLLM" element={<CustomLLM />} />
                    
                    <Route path="/StaffTrainingProgram" element={<StaffTrainingProgram />} />
                    
                    <Route path="/ComputerVisionTools" element={<ComputerVisionTools />} />
                    
                    {/* Catch-all route for 404 */}
                    <Route path="*" element={<NotFound />} />
                    
                </Routes>
            </Suspense>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}