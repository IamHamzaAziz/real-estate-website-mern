import Slider from 'react-slick';

const testimonials = [
    {
        name: "Arshad Nadeem",
        designation: "Gold Medalist",
        testimonial: "SkyEstate have the best dealers and the locations are the best.",
    },
    {
        name: "Jane Smith",
        designation: "Marketing Head, Don Inc.",
        testimonial: "The staff I saw at SkyEstate is really highly qualified for this field.",
    },
    {
        name: "Diljit Singh",
        designation: "Famous Singer",
        testimonial: "I had the best experience of buying property from SkyEstate.",
    },
];

export default function TestimonialCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
    };

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 tracking-tight">
                    What Our Clients Are Saying
                </h2>
                <Slider {...settings}>
                    {
                        testimonials.map((item, index) => (
                            <div key={index} className="p-8 bg-white border border-gray-200 rounded-lg text-center transform transition-all duration-500 hover:shadow-lg">
                                <p className="text-xl text-gray-700 mb-6 leading-relaxed">"{item.testimonial}"</p>
                                <h3 className="text-2xl font-semibold text-gray-900">{item.name}</h3>
                                <p className="text-gray-500 text-sm">{item.designation}</p>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
}
