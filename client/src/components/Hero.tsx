

const Hero = () => {
    return (
        <div className='bg-cover bg-center h-screen flex justify-center items-center relative' style={{ backgroundImage: "url('https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='z-10'>
                <h1 className='text-5xl font-bold text-white relative text-center'>Get Your Dream <br />Property</h1>
                <button className='block mt-5 bg-p1 py-3 px-10 text-xl text-white rounded-full md:w-full mx-auto '>Discover Now</button>
            </div>
        </div>
    )
}

export default Hero