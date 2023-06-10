import UserNavbar from "../navbar/User"
import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = ()=>{
    const [daftarPermohonan, setDaftarPermohonan] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/get-log-client-data");
            await setDaftarPermohonan([...response.data.dataClient]);
        }
        fetchData();
    }, [])
    return(
        <>
             <main className="flex h-full">
                <UserNavbar />
                <div className="px-16 mt-8 w-4/5">
                    <div className="w-full flex justify-center">
                        <h1 className="text-2xl font-bold">Log Client</h1>
                    </div>
                    <div className="w-4/5 mt-8 flex flex-col max-h-96 overflow-auto mx-auto">
                        <div className="p-3 grid grid-cols-11 border-b-2">
                            <div className="col-span-1">
                                ID Client
                            </div>
                            <div className="col-span-2">
                                Nama Client
                            </div>
                            <div className="col-span-2">
                                Kasus
                            </div>
                            <div className="col-span-2">
                                Status
                            </div>
                            <div className="col-span-3">
                                Penganggung Jawab
                            </div>
                        </div>
                        {daftarPermohonan.length > 0 ? (daftarPermohonan.map(item => (
                            item.logClient.status !== "PROSES" ? (
                                <div className="p-3 grid grid-cols-11 border-b-2">
                                    <div className="col-span-1">
                                        {item.logClient.id}
                                    </div>
                                    <div className="col-span-2">
                                        {item.logClient.namaClient}
                                    </div>
                                    <div className="col-span-2">
                                        {item.logClient.namaKasus}
                                    </div>
                                    <div className="col-span-2">
                                        {item.logClient.status === "DITERIMA" && (
                                            <span className="text-blue-600">{item.logClient.status}</span>
                                        )}
                                        {item.logClient.status === "DITOLAK" && (
                                            <span className="text-red-600">{item.logClient.status}</span>
                                        )}
                                    </div>
                                    <div className="col-span-3">
                                        {item.logClient.status === "DITERIMA" && (
                                            <span className="">{item.logClient.namaPegawai}</span>
                                        )}
                                        {item.logClient.status === "DITOLAK" && (
                                            <span className="">-</span>
                                        )}
                                    </div>
                                </div>
                            ) : (<div></div>)
                        ))
                        ) : (<div></div>)}
                    </div>
                </div>
            </main>
        </>
    )
}

export default UserDashboard;