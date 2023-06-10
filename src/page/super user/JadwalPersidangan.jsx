import { useEffect, useState } from "react";
import SuperUserNavbar from "../navbar/SuperUser";
import axios from "axios";

const AdminJadwalPersidangan = () => {
    const [refresh, setRefresh] = useState(false);
    const [jadwal, setJadwal] = useState({});
    const [jadwalBaru, setJadwalBaru] = useState({
        tanggal: "",
        nama_client: ""
    })
    const handleChange = (event)=>{
        setJadwalBaru({
            ...jadwalBaru,
            [event.target.name]: event.target.value
        })
    };
    const handleSubmitAdd = async(event)=>{
        event.preventDefault();
        try {
            const{tanggal, nama_client} = jadwalBaru;
            const response = await axios.post("http://localhost:5000/super-user/post-persidangan",{tanggal,nama_client});
            alert("Tambah Persidangan Success");
        } catch (error) {
            console.log(error);
        }finally{
            setRefresh(!refresh);
        }
    }
    const handleSubmitDel = async(event)=>{
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const idPersidangan = formData.get('idPersidangan').toString();
            await axios.post(`http://localhost:5000/super-user/delete-persidangan/${idPersidangan}`);
            alert("Delete Persidangan Success")
        } catch (error) {
            console.log(error);
        }finally{
            setRefresh(!refresh)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/super-user/meeting");
            console.log(response.data);
            await setJadwal([...response.data.persidangan])
        }
        fetchData();
    }, [refresh])
    return (
        <>
            <main className="flex h-full">
                <SuperUserNavbar />
                <div className="px-16 mt-8 w-10/12">
                    <div className="w-full flex justify-center">
                        <h1 className="text-2xl font-bold">Jadwal Persidangan</h1>
                    </div>
                    <div className="flex justify-between w-3/5 mx-auto">
                        <div className="mt-10 flex flex-col h-96 overflow-auto p-3 rounded-xl bg-slate-200">
                            <div className="p-2 grid grid-cols-5 border-b-2 border-slate-400">
                                <div className="col-span-2">
                                    Tanggal
                                </div>
                                <div className="col-span-2">
                                    Nama Client
                                </div>
                            </div>
                            {jadwal.length > 0 ? (
                                jadwal.map(item => (
                                    <div className="p-2 grid grid-cols-5 border-b-2 border-slate-400">
                                        <div className="col-span-2 flex items-center">
                                            {item.tanggal}
                                        </div>
                                        <div className="col-span-2 flex items-center">
                                            {item.nama_client}
                                        </div>
                                        <div className="col-span-1">
                                            <form onSubmit={handleSubmitDel}>
                                                <input type="hidden" name="idPersidangan" value={item.id} />
                                                <button type="submit" className="px-4 py-2 bg-red-600 text-sm text-white rounded-lg hover:bg-red-800">
                                                    Hapus
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                ))
                            ) : (<div></div>)}
                        </div>
                        <div className="rounded-lg mt-10 h-fit bg-slate-200 flex flex-col p-5">
                            <h1 className="font-semibold text-lg">Tambah Jadwal</h1>
                            <form onSubmit={handleSubmitAdd}>
                                <div className="flex flex-col my-3">
                                    <label className="text-sm">Tanggal</label>
                                    <input
                                        className="appearance-none border-none rounded p-1 text-sm  leading-tight focus:outline-none focus:shadow-outline"
                                        type="text" name="tanggal" onChange={handleChange}/>
                                </div>
                                <div className="flex flex-col my-3">
                                    <label className="text-sm">Nama Client</label>
                                    <input
                                        className="appearance-none border-none rounded p-1 text-sm  leading-tight focus:outline-none focus:shadow-outline"
                                        type="text" name="nama_client" onChange={handleChange}/>
                                </div>
                                <button type="submit" className="rounded-lg text-xs bg-blue-500 text-white p-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminJadwalPersidangan;