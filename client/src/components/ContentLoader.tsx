import { ThreeDots } from 'react-loader-spinner'

const ContentLoader = () => {
    return (
        <div className='my-2 flex justify-center items-center'>
            <ThreeDots color="#03053a" height={100} width={100} />
        </div>
    )
}

export default ContentLoader