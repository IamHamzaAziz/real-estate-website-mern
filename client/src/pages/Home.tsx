import Hero from '@/components/home_components/Hero'
import CounterSection from '@/components/home_components/CounterSection'
import TestimonialCarousel from '@/components/home_components/Testimonial'

const Home = () => {
    document.title = 'SkyEstate'

    return (
        <>
            <Hero />
            <CounterSection />
            <TestimonialCarousel />
        </>
    )
}

export default Home