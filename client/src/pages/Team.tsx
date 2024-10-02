import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Linkedin, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

const teamMembers = [
    {
        name: "Emily Thompson",
        designation: "Senior Real Estate Agent",
        intro: "With over 15 years of experience in the luxury real estate market, Emily has a keen eye for property valuation and negotiation.",
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        stats: "Closed $50M+ in sales",
        whatsapp: "https://wa.me/1234567890",
        linkedin: "https://www.linkedin.com/",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Michael Chen",
        designation: "Commercial Property Specialist",
        intro: "Michael specializes in commercial real estate, helping businesses find the perfect locations for their operations.",
        image: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        stats: "Managed 100+ commercial leases",
        whatsapp: "https://wa.me/2345678901",
        linkedin: "https://www.linkedin.com/in/michael-chen",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Sarah Rodriguez",
        designation: "First-Time Homebuyer Expert",
        intro: "Sarah is passionate about helping first-time homebuyers navigate the complex process of purchasing their dream home.",
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        stats: "Assisted 200+ first-time buyers",
        whatsapp: "https://wa.me/3456789012",
        linkedin: "https://www.linkedin.com/in/sarah-rodriguez",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "David Patel",
        designation: "Investment Property Advisor",
        intro: "David's expertise lies in identifying lucrative investment opportunities in the real estate market.",
        image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600',
        stats: "Managed $30M+ in property investments",
        whatsapp: "https://wa.me/4567890123",
        linkedin: "https://www.linkedin.com/in/david-patel",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Jessica Lee",
        designation: "Luxury Home Specialist",
        intro: "Jessica caters to high-net-worth individuals, providing white-glove service in the luxury real estate market.",
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
        stats: "Sold 20+ multi-million dollar properties",
        whatsapp: "https://wa.me/5678901234",
        linkedin: "https://www.linkedin.com/in/jessica-lee",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Robert Johnson",
        designation: "Property Management Expert",
        intro: "Robert oversees our property management division, ensuring smooth operations for landlords and tenants alike.",
        image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600',
        stats: "Managed 500+ rental units",
        whatsapp: "https://wa.me/6789012345",
        linkedin: "https://www.linkedin.com/in/robert-johnson",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Olivia Martinez",
        designation: "Relocation Specialist",
        intro: "Olivia helps families and professionals relocate to new cities, providing comprehensive support throughout the process.",
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        stats: "Assisted 150+ relocations",
        whatsapp: "https://wa.me/7890123456",
        linkedin: "https://www.linkedin.com/in/olivia-martinez",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Thomas Wilson",
        designation: "Real Estate Attorney",
        intro: "Thomas provides legal expertise to our team and clients, ensuring all transactions are smooth and compliant.",
        image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600',
        stats: "Handled 300+ real estate legal cases",
        whatsapp: "https://wa.me/8901234567",
        linkedin: "https://www.linkedin.com/in/thomas-wilson",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Sophia Kim",
        designation: "Marketing Director",
        intro: "Sophia leads our marketing efforts, creating innovative strategies to showcase our properties and reach potential buyers.",
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
        stats: "Increased lead generation by 200%",
        whatsapp: "https://wa.me/9012345678",
        linkedin: "https://www.linkedin.com/in/sophia-kim",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Daniel Brown",
        designation: "Mortgage Specialist",
        intro: "Daniel works closely with our clients to secure the best mortgage rates and terms for their property purchases.",
        stats: "Facilitated $100M+ in mortgages",
        image: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        whatsapp: "https://wa.me/0123456789",
        linkedin: "https://www.linkedin.com/in/daniel-brown",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Emma Taylor",
        designation: "Interior Design Consultant",
        intro: "Emma provides expert advice on interior design and staging, helping our properties stand out in the market.",
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
        stats: "Staged 100+ homes for sale",
        whatsapp: "https://wa.me/1234567890",
        linkedin: "https://www.linkedin.com/in/emma-taylor",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Alexander Wright",
        designation: "Real Estate Analyst",
        intro: "Alexander provides in-depth market analysis and forecasting to inform our investment strategies and client advice.",
        image: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        stats: "Produced 50+ market reports",
        whatsapp: "https://wa.me/2345678901",
        linkedin: "https://www.linkedin.com/in/alexander-wright",
        facebook: "https://www.facebook.com/"
    },
    {
        name: "Isabella Garcia",
        designation: "Client Relations Manager",
        intro: "Isabella ensures our clients receive top-notch service throughout their real estate journey with our team.",
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        stats: "Maintained 98% client satisfaction rate",
        whatsapp: "https://wa.me/3456789012",
        linkedin: "https://www.linkedin.com/in/isabella-garcia",
        facebook: "https://www.facebook.com/"
    }
]

export default function Team() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">Our Real Estate Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    teamMembers.map((member, index) => (
                        <Card key={index} className={`overflow-hidden ${index === teamMembers.length - 1 && 'lg:col-span-1 lg:col-start-2'}`}>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="rounded-full mb-4 h-[200px] w-[200px]"
                                    />
                                    <h2 className="text-2xl font-semibold">{member.name}</h2>
                                    <p className="text-muted-foreground mb-2">{member.designation}</p>
                                    <p className="text-sm mb-4">{member.intro}</p>
                                    <p className="text-sm font-semibold mb-4">{member.stats}</p>
                                    <div className="flex space-x-4">
                                        <Link to={member.whatsapp} target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="h-6 w-6 text-green-600 hover:text-green-700" />
                                            <span className="sr-only">WhatsApp</span>
                                        </Link>
                                        <Link to={member.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="h-6 w-6 text-blue-600 hover:text-blue-700" />
                                            <span className="sr-only">LinkedIn</span>
                                        </Link>
                                        <Link to={member.facebook} target="_blank" rel="noopener noreferrer">
                                            <Facebook className="h-6 w-6 text-blue-800 hover:text-blue-900" />
                                            <span className="sr-only">Facebook</span>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}