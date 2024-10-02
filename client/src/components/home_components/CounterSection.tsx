import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CounterSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="bg-white py-20">
            <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-16">
                Trusted by Thousands
            </h1>
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {/* Counter Item */}
                <div className="counter-item text-center bg-white p-10 rounded-lg shadow-xl border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    {
                        inView && (
                            <div>
                                <CountUp start={0} end={1000} duration={3} suffix="+" className="text-5xl font-bold text-blue-600" />
                                <span className="block text-lg mt-4 font-semibold text-gray-600">Happy Clients</span>
                            </div>
                        )
                    }
                </div>

                {/* Counter Item */}
                <div className="counter-item text-center bg-white p-10 rounded-lg shadow-xl border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    {
                        inView && (
                            <div>
                                <CountUp start={0} end={10} duration={5} suffix="+" className="text-5xl font-bold text-green-600" />
                                <span className="block text-lg mt-4 font-semibold text-gray-600">Team Members</span>
                            </div>
                        )
                    }
                </div>

                {/* Counter Item */}
                <div className="counter-item text-center bg-white p-10 rounded-lg shadow-xl border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    {
                        inView && (
                            <div>
                                <CountUp start={0} end={20} duration={5} suffix="+" className="text-5xl font-bold text-red-600" />
                                <span className="block text-lg mt-4 font-semibold text-gray-600">Total Cities</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CounterSection;
