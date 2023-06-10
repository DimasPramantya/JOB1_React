import { useEffect, useState } from "react";
import SuperUserNavbar from "../navbar/SuperUser";
import axios from "axios";

const Pegawai = () => {
    const [pegawai, setPegawai] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [pegawaiBaru, setPegawaiBaru] = useState({
        nama: "",
        alamat: "",
        posisi: "",
        no_hp: ""
    })
    const handleChange = (event)=>{
        setPegawaiBaru({
            ...pegawaiBaru,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmitAdd = async(event)=>{
        event.preventDefault();
        try {
            const {nama,alamat,posisi,no_hp} = pegawaiBaru;
            const response = await axios.post("http://localhost:5000/super-user/upload-pegawai",{nama,alamat,posisi,no_hp});
            alert("Tambah Pegawai Success");
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
            const idPegawai = formData.get('idPegawai').toString();
            const response = await axios.post(`http://localhost:5000/super-user/delete-pegawai/${idPegawai}`);
            alert("Delete Pegawai Success")
        } catch (error) {
            console.log(error);
        }
        finally{
            setRefresh(!refresh)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/super-user/pegawai");
            await setPegawai([...response.data.pegawai]);
        }
        fetchData();
    }, [refresh])
    return (
        <>
            <main className="flex h-full">
                <SuperUserNavbar />
                <div className="px-16 mt-8 w-4/5">
                    <div className="w-full flex justify-center">
                        <h1 className="text-2xl font-bold">Daftar Pegawai</h1>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="flex flex-col items-center mt-12 h-96 rounded-lg bg-slate-200 p-3">
                            <div className="grid grid-cols-10 w-full border-b-2 border-slate-400 py-3 items-center">
                                <div className="col-span-1">
                                    Id
                                </div>
                                <div className="col-span-2">
                                    Nama
                                </div>
                                <div className="col-span-2">
                                    Posisi
                                </div>
                                <div className="col-span-2">
                                    Alamat
                                </div>
                                <div className="col-span-3">
                                    No Hp
                                </div>
                            </div>
                            {pegawai.length > 0 ? (
                                pegawai.map(item => (
                                    <div className="grid grid-cols-10 w-full border-b-2 border-slate-400 items-center py-3">
                                        <div className="col-span-1">
                                            {item.id}
                                        </div>
                                        <div className="col-span-2">
                                            {item.nama}
                                        </div>
                                        <div className="col-span-2">
                                            {item.posisi}
                                        </div>
                                        <div className="col-span-2">
                                            {item.alamat}
                                        </div>
                                        <div className="col-span-3 flex items-center">
                                            <div className="mr-5">
                                                {item.no_hp}
                                            </div>
                                            <form onSubmit={handleSubmitDel}>
                                                <input type="hidden" name="idPegawai" value={item.id}/>
                                                <button type="submit" className="px-4 py-2 bg-red-600 text-sm text-white rounded-lg hover:bg-red-800">
                                                    Hapus
                                                </button>
                                        </form>
                                        </div>
                                    </div>
                                ))
                            ) : (<div></div>)}
                        </div>
                        <div className="rounded-lg mt-12 ml-10 w-80 h-fit bg-slate-200 flex flex-col p-5">
                            <h1 className="font-semibold text-lg">Tambah Pegawai</h1>
                            <form onSubmit={handleSubmitAdd}>
                                <div className="flex flex-col my-3">
                                    <label className="text-sm">Nama Pegawai</label>
                                    <input
                                        className="appearance-none border-none rounded p-1 text-sm  leading-tight focus:outline-none focus:shadow-outline"
                                        type="text" name="nama" onChange={handleChange}/>
                                </div>
                                <div className="flex flex-col my-3">
                                    <label className="text-sm">Posisi</label>
                                    <input
                                        className="appearance-none border-none rounded p-1 text-sm  leading-tight focus:outline-none focus:shadow-outline"
                                        type="text" name="posisi" onChange={handleChange}/>
                                </div>
                                <div className="flex flex-col my-3">
                                    <label className="text-sm">Alamat</label>
                                    <input
                                        className="appearance-none border-none rounded p-1 text-sm  leading-tight focus:outline-none focus:shadow-outline"
                                        type="text" name="alamat" onChange={handleChange}/>
                                </div>
                                <div className="flex flex-col my-3">
                                    <label className="text-sm">No Hp</label>
                                    <input
                                        className="appearance-none border-none rounded p-1 text-sm  leading-tight focus:outline-none focus:shadow-outline"
                                        type="text" name="no_hp" onChange={handleChange}/>
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

export default Pegawai;