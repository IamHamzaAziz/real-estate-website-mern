import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CounterSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true, // Ensures the counting happens only once when the user scrolls
        threshold: 0.1,    // Start the animation when 10% of the component is in view
    });

    return (
        <div className='py-10'>
            <h1 className='text-center text-5xl'>We have</h1>
            <div ref={ref} className='flex justify-center items-center py-5 space-x-10'>
                <div className="counter-item">
                    {
                        inView && (
                            <div className='grid grid-cols-1'>
                                <CountUp start={0} end={1000} duration={3} suffix="+" className='text-5xl' />
                                <span className='text-3xl'>Happy Clients</span>
                            </div>
                        )
                    }
                </div>
                <div className="counter-item">
                    {
                        inView && (
                            <div className='grid grid-cols-1'>
                                <CountUp start={0} end={10} duration={5} suffix="+" className='text-5xl' />
                                <span className='text-3xl'>Team Members</span>
                            </div>
                        )
                    }
                </div>
                <div className="counter-item">
                    {
                        inView && (
                            <div className='grid grid-cols-1'>
                                <CountUp start={0} end={20} duration={5} suffix="+" className='text-5xl' />
                                <span className='text-3xl'>Cities</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CounterSection;
