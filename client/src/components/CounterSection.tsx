import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CounterSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="bg-gray-100 py-16">
            <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-12">
                Our Stats
            </h1>
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Counter Item */}
                <div className="counter-item text-center bg-white p-10 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                    {
                        inView && (
                            <div>
                                <CountUp start={0} end={1000} duration={3} suffix="+" className="text-6xl font-bold text-blue-600" />
                                <span className="block text-xl mt-4 font-semibold text-gray-700">Happy Clients</span>
                            </div>
                        )
                    }
                </div>

                {/* Counter Item */}
                <div className="counter-item text-center bg-white p-10 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                    {
                        inView && (
                            <div>
                                <CountUp start={0} end={10} duration={5} suffix="+" className="text-6xl font-bold text-green-600" />
                                <span className="block text-xl mt-4 font-semibold text-gray-700">Team Members</span>
                            </div>
                        )
                    }
                </div>

                {/* Counter Item */}
                <div className="counter-item text-center bg-white p-10 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                    {
                        inView && (
                            <div>
                                <CountUp start={0} end={20} duration={5} suffix="+" className="text-6xl font-bold text-red-600" />
                                <span className="block text-xl mt-4 font-semibold text-gray-700">Total Cities</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CounterSection;
