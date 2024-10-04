import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Building, UserCheck, UserX, MessageSquare } from "lucide-react"

const Dashboard = () => {
    const stats = {
        totalBlogs: 150,
        totalProperties: 75,
        verifiedUsers: 500,
        unverifiedUsers: 50,
        contactMessages: 25,
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-center">Dashboard</h1>
            <div className="grid gap-4">
                <Card className="bg-blue-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                        <FileText className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{stats.totalBlogs}</div>
                    </CardContent>
                </Card>
                <Card className="bg-green-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                        <Building className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.totalProperties}</div>
                    </CardContent>
                </Card>
                <Card className="bg-purple-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">{stats.verifiedUsers}</div>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unverified Users</CardTitle>
                        <UserX className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{stats.unverifiedUsers}</div>
                    </CardContent>
                </Card>
                <Card className="bg-red-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                        <MessageSquare className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.contactMessages}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard