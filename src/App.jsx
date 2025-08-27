import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import SEO from "@/components/SEO"

function App() {
  return (
    <>
      <SEO />
      <Pages />
      <Toaster />
    </>
  )
}

export default App 