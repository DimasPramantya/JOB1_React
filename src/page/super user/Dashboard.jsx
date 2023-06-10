import { Link } from "react-router-dom";
import SuperUserNavbar from "../navbar/SuperUser";
import { useEffect, useState } from "react";
import axios from "axios";

const SuperUserDashboard = () => {
    const [daftarPermohonan, setDaftarPermohonan] = useState({});
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get("http://localhost:5000/get-log-client-data");
            await setDaftarPermohonan([...response.data.dataClient]);
        }
        fetchData();
    },[])
    return (
        <>
            <main className="flex h-full">
                <SuperUserNavbar />
                <div className="px-16 mt-8 w-4/5">
                    <div className="w-full flex justify-center">
                        <h1 className="text-2xl font-bold">Daftar Permohonan</h1>
                    </div>
                    <div className="w-4/5 mt-8 flex flex-col h-96 overflow-auto mx-auto">
                        <div className="p-3 grid grid-cols-9 border-b-2">
                            <div className="col-span-1">
                                ID
                            </div>
                            <div className="col-span-3">
                                Nama Pemohon
                            </div>
                            <div className="col-span-3">
                                File
                            </div>
                            <div className="col-span-2">
                                Proses
                            </div>
                        </div>
                        {daftarPermohonan.length > 0 ? (daftarPermohonan.map(item=>(
                            item.logClient.status == "PROSES" ? (
                            <div className="p-3 grid grid-cols-9 border-b-2 ">
                            <div className="col-span-1 flex items-center">
                                {item.logClient.id}
                            </div>
                            <div className="col-span-3 flex items-center">
                                {item.logClient.namaClient}
                            </div>
                            <div className="col-span-3 flex items-center">
                                <Link to={item.file} className="text-blue-700 underline hover:text-blue-400">
                                    File Kasus
                                </Link>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <Link to={`/super-user/proses-terima/${item.logClient.id}`}>
                                    <button type="button" className="mr-4 px-4 py-2 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-800">
                                        Terima
                                    </button>
                                </Link>
                                <Link to={`/super-user/proses-tolak/${item.logClient.id}`}>
                                    <button type="button" className="px-4 py-2 bg-red-600 text-sm text-white rounded-lg hover:bg-red-800">
                                        Tolak
                                    </button>
                                </Link>
                            </div>
                        </div>
                        ): (<div></div>)))):(<div></div>)}
                    </div>
                </div>
            </main>
        </>
    )
}

export default SuperUserDashboard;