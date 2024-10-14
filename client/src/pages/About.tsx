import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Zap } from "lucide-react"
import { Link } from "react-router-dom"

const About = () => {
    return (
        <div>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-p1 text-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Elevating Real Estate Experiences
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-200">
                                    At SkyEstate, we're redefining the art of finding your perfect home
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link to={'/properties'}>
                                    <Button className="bg-white text-black hover:bg-p2 hover:text-white">Our Properties</Button>
                                </Link>
                                <Link to={'/contact'}>
                                    <Button className="bg-white text-black hover:bg-p2 hover:text-white">Contact Us</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                            <img
                                alt="SkyEstate Office"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg"
                                height="310"
                                src="https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                width="550"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">Our Story</h2>
                                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Founded in 2010, SkyEstate has grown from a small local agency to a leading force in the real estate industry.
                                    Our journey is marked by a commitment to innovation, client satisfaction, and a deep understanding of the
                                    ever-evolving property market.
                                </p>
                                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    We've helped thousands of clients find their dream homes, invest in lucrative properties, and navigate
                                    the complex world of real estate with confidence and ease.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-gray-900">Why Choose SkyEstate</h2>
                        <div className="grid gap-6 lg:grid-cols-3">
                            <Card>
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                    <Building2 className="h-12 w-12 text-blue-600" />
                                    <h3 className="text-xl font-bold">Extensive Portfolio</h3>
                                    <p className="text-gray-600">
                                        Access to a wide range of properties, from cozy apartments to luxury estates,
                                        ensuring we have the perfect match for every client.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                    <Users className="h-12 w-12 text-blue-600" />
                                    <h3 className="text-xl font-bold">Expert Team</h3>
                                    <p className="text-gray-600">
                                        Our seasoned professionals bring years of experience and local market knowledge
                                        to guide you through every step of your real estate journey.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                    <Zap className="h-12 w-12 text-blue-600" />
                                    <h3 className="text-xl font-bold">Innovative Approach</h3>
                                    <p className="text-gray-600">
                                        Leveraging cutting-edge technology and market insights to provide
                                        a seamless, efficient, and rewarding property experience.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                            <div className="flex flex-col justify-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Vision</h2>
                                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    At SkyEstate, we envision a future where finding your ideal property is not just a transaction,
                                    but a transformative experience. We're committed to:
                                </p>
                                <ul className="space-y-2 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    <li>Revolutionizing the real estate industry through technology and personalized service</li>
                                    <li>Creating sustainable and thriving communities through thoughtful property development</li>
                                    <li>Empowering our clients with knowledge and resources for informed decision-making</li>
                                </ul>
                            </div>
                            <img
                                alt="SkyEstate Vision"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg"
                                height="310"
                                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                width="550"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default About