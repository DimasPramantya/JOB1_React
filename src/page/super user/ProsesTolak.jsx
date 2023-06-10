import { useEffect, useState } from "react"
import SuperUserNavbar from "../navbar/SuperUser"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProsesTolak = () => {
    const [statusDeskripsi, setStatusDeskripsi] = useState("");
    const [logClient, setLogClient] = useState({});
    const handleChange = (event) => {
        setStatusDeskripsi(event.target.value);
    }
    const navigate = useNavigate();
    const { IDLogClient } = useParams();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/super-user/log-client/update-status-ditolak/${IDLogClient}`, { setStatusDeskripsi });
            alert("Update Status Success")
        } catch (error) {
            console.log(error);
        }
        finally {
            navigate("/super-user");
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/super-user/log-client/${IDLogClient}`);
            setLogClient(response.data.currLogClient);
        }
        fetchData();
    }, [])
    return (
        <>
            <main className="flex h-full">
                <SuperUserNavbar />
                <div className="px-16 mt-8 w-4/5">
                    <div className="w-full flex justify-center">
                        <h1 className="text-2xl font-bold">Approval</h1>
                    </div>
                    <div className="w-2/5 mt-7 mx-auto flex flex-col">
                        <div className="flex justify-between w-full mb-3">
                            <div>
                                ID
                            </div>
                            <div>
                                {logClient.id}
                            </div>
                        </div>
                        <div className="flex justify-between w-full mb-3">
                            <div>
                                Nama Pemohon
                            </div>
                            <div>
                                {logClient.namaClient}
                            </div>
                        </div>
                        <div className="flex justify-between w-full mb-3">
                            <div>
                                Email
                            </div>
                            <div>
                                {logClient.namaClient}@gmail.com
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col w-full mb-8">
                                <label htmlFor="namaPegawai" className="mb-2">
                                    Alasan Pertimbangan
                                </label>
                                <textarea
                                    className="appearance-none h-20 border-none rounded py-1 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    name="statusDeskripsi"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="flex w-full justify-center">
                                    <button type="submit" className="px-4 py-2 bg-red-600 text-sm text-white rounded-lg hover:bg-red-800">
                                        Tolak
                                    </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProsesTolak