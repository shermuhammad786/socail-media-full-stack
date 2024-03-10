
// import Link from "@mui/material/Link"
import CardTitle from "@mui/material/Card"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LeftSideBar from "../../../Components/LeftSideBar";
import LeftBarFriends from "../../../Components/LeftBarFriends";
import { usersDummyData } from "../../../Components/dummyPost/Dummy";


export default function Sidebar() {
    return (
        <div className="flex flex-col min-h-screen">
            <LeftSideBar />

            <div className="mt-auto p-4">
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle>Active Users</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">

                        {usersDummyData.map((singleUser , index) => <LeftBarFriends key={index} singleUser={singleUser} />)}

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
