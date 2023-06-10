import axios from "axios";
import { useEffect, useState } from "react";
import UserNavbar from "../navbar/User";

const UserMeetingClient = ()=>{
    const [jadwal, setJadwal] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/super-user/meeting");
            console.log(response.data);
            await setJadwal([...response.data.meetingClient])
        }
        fetchData();
    }, [])
    return(
        <>
             <main className="flex h-full">
                <UserNavbar />
                <div className="px-16 mt-8 w-10/12">
                    <div className="w-full flex justify-center">
                        <h1 className="text-2xl font-bold">Jadwal Meeting Client</h1>
                    </div>
                    <div className="flex justify-center w-3/5 mx-auto">
                        <div className="mt-10 w-3/4 flex flex-col h-96 overflow-auto p-3 rounded-xl bg-slate-200">
                            <div className="p-2 grid grid-cols-4 border-b-2 border-slate-400">
                                <div className="col-span-2">
                                    Tanggal
                                </div>
                                <div className="col-span-2">
                                    Nama Client
                                </div>
                            </div>
                            {jadwal.length > 0 ? (
                                jadwal.map(item => (
                                    <div className="p-2 grid grid-cols-4 border-b-2 border-slate-400">
                                        <div className="col-span-2 flex items-center">
                                            {item.tanggal}
                                        </div>
                                        <div className="col-span-2 flex items-center">
                                            {item.nama_client}
                                        </div>
                                    </div>
                                ))
                            ) : (<div></div>)}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default UserMeetingClient;