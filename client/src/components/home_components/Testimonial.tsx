import Slider from 'react-slick';

const testimonials = [
    {
        name: "Arshad Nadeem",
        designation: "Gold Medalist",
        testimonial: "SkyEstate offers unparalleled expertise in the real estate market. The dealers were extremely professional and helped me find the perfect property. From the initial consultation to the final paperwork, they were transparent, reliable, and available at every step. I am beyond satisfied with the service, and the location of the property is simply perfect. SkyEstate will be my first choice for future investments.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr7g3v6UOFNc4GeyyQ6aw2yGiekzJKjLuwuw&s"
    },
    {
        name: "Elon Musk",
        designation: "CEO Tesla",
        testimonial: "SkyEstate made my property search and buying process effortless. Their staff is truly exceptional and highly qualified. The entire team demonstrated a deep understanding of the market and took time to listen to my needs. They presented me with several excellent options and helped me close on the perfect deal. I highly recommend SkyEstate for anyone looking for professional, efficient, and honest service.",
        image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
    },
    {
        name: "Diljit Singh",
        designation: "Famous Singer",
        testimonial: "My experience with SkyEstate has been remarkable. I was nervous about purchasing a property, but their team made everything seamless and stress-free. From property visits to negotiations, they were there every step of the way. The level of detail and customer service I received is unmatched. I will definitely be recommending SkyEstate to friends and family for all their real estate needs.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlzIRr2KC5Pd-lu5e3iMA6zE_RLvzB9V_myw&s"
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
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="mx-auto mb-6 h-24 w-24 rounded-full object-cover border-4 border-gray-200"
                                />
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
