import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SearchIcon, ShieldIcon, ShieldOffIcon } from "lucide-react"
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentLoader from "@/components/ContentLoader";
import axios from "axios"

interface User {
    _id: string,
    name: string,
    email: string,
    isAdmin: boolean,
}


const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleSearch = async () => {
        if (!searchTerm) {
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/search`, { email: searchTerm });
            setUsers(response.data); // Update users with search results
            setHasMore(false); // Disable infinite scroll since it's not paginated
        } catch (error) {
            console.error("Error fetching searched users:", error);
        }
    };

    const toggleAdminStatus = async (userId: string) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/user/toggle-admin/${userId}`);
            const updatedUsers = users.map(user =>
                user._id === userId ? { ...user, isAdmin: response.data.isAdmin } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error toggling admin status:", error);
        }
    };

    const fetchUsers = async () => {
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user?page=${page}&limit=8`)
            .then(response => {
                setUsers([...users, ...response.data])
                setHasMore(response.data.length > 0)
                setPage(page + 1)
            })
            .catch(error => console.error(error))
    }

    const fetchMoreUsers = () => {
        fetchUsers()
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
            <div className="flex items-center mb-6">
                <div className="relative flex-grow mr-2">
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <Button onClick={handleSearch}>
                    Search
                </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <InfiniteScroll
                    dataLength={users.length}
                    next={fetchMoreUsers}
                    hasMore={hasMore}
                    loader={<ContentLoader />}
                >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Name</TableHead>
                                <TableHead className="w-[200px]">Email</TableHead>
                                <TableHead className="w-[150px]">Admin Status</TableHead>
                                <TableHead className="w-[150px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.isAdmin ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                User
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleAdminStatus(user._id)}
                                            className="flex items-center"
                                        >
                                            {user.isAdmin ? (
                                                <>
                                                    <ShieldOffIcon className="h-4 w-4 mr-2" />
                                                    Remove Admin
                                                </>
                                            ) : (
                                                <>
                                                    <ShieldIcon className="h-4 w-4 mr-2" />
                                                    Make Admin
                                                </>
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default ManageUsers