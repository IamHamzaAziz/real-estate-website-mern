import './App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CounterSection from './components/CounterSection'
import TestimonialCarousel from './components/Testimonial'

function App() {
  return (
    <div className='text-center'>
      <Navbar />
      <Hero />
      <CounterSection />
      <TestimonialCarousel />
    </div>
  )
}

export default App
