import { useContext, useEffect, useState } from "react";
import SuperUserNavbar from "../navbar/SuperUser";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LogClient = () => {
    const navigate = useNavigate();
    const [daftarPermohonan, setDaftarPermohonan] = useState({});
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/get-log-client-data");
            await setDaftarPermohonan([...response.data.dataClient]);
        }
        fetchData();
    }, [refresh])
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const idLogClient = formData.get('idLogClient').toString();
            console.log(idLogClient);
            const response = await axios.post("http://localhost:5000/super-user/delete-log-client",{ idLogClient });
            alert("Delete Data Success");
            setRefresh(!refresh);
        } catch (error) {
            console.log(error);
        }finally{
            navigate("/super-user/log-client")
        }
    }
    return (
        <>
            <main className="flex h-full">
                <SuperUserNavbar />
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
                                    <form className="col-span-1" onSubmit={handleSubmit}>
                                        <input type="hidden" name="idLogClient" value={item.logClient.id}/>
                                        <button type="submit" className="px-4 py-2 bg-red-600 text-sm text-white rounded-lg hover:bg-red-800">
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                            ) : (<div></div>)
                        ))
                        ) : (<div></div>)}
                    </div>
                    <div className="mt-8 w-4/5 mx-auto">
                        <Link to="/super-user/tambah-client">
                        <button type="button" className="mr-4 px-4 py-2 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-800">
                            Tambah Data
                        </button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default LogClient;

