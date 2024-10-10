import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2Icon } from "lucide-react"
import axios from "axios"
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentLoader from "@/components/ContentLoader";
import { Bounce, toast, ToastContainer } from "react-toastify"

interface Message {
    _id: string,
    name: string,
    email: string,
    message: string,
    createdAt: string
}

const ContactMessages = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        fetchMessages()
    }, [])

    const failure = (message: String) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })
    }

    const success = (message: String = 'Failed to sign up') => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })
    }

    const fetchMessages = async () => {
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/contact?page=${page}&limit=8`)
            .then(response => {
                setMessages([...messages, ...response.data])
                setHasMore(response.data.length > 0)
                setPage(page + 1)
            })
            .catch(error => console.error(error))
    }

    const fetchMoreMessages = () => {
        fetchMessages()
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const deleteMessage = (id: string) => {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/contact/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    success('Message deleted successfully')
                    setMessages(messages.filter(message => message._id !== id))
                }
            })
            .catch(error => {
                failure('Failed to delete message')
                console.error(error)
            })
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
            <div className="border rounded-lg overflow-hidden">
                <InfiniteScroll
                    dataLength={messages.length}
                    next={fetchMoreMessages}
                    hasMore={hasMore}
                    loader={<ContentLoader />}
                >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Name</TableHead>
                                <TableHead className="w-[200px]">Email</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead className="w-[200px]">Created At</TableHead>
                                <TableHead className="w-[75px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {messages.map((message) => (
                                <TableRow key={message._id}>
                                    <TableCell className="font-medium">{message.name}</TableCell>
                                    <TableCell>{message.email}</TableCell>
                                    <TableCell className="max-w-md truncate">{message.message}</TableCell>
                                    <TableCell>{formatDate(message.createdAt)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteMessage(message._id)}
                                            aria-label={`Delete message from ${message.name}`}
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </InfiniteScroll>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ContactMessages