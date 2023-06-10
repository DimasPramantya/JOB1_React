import { useEffect, useState } from "react";
import SuperUserNavbar from "../navbar/SuperUser";
import axios from "axios";

const AdminJadwalKantor = () => {
    const [refresh, setRefresh] = useState(false);
    const [jadwal, setJadwal] = useState({});
    const [jadwalBaru, setJadwalBaru] = useState({
        tanggal: "",
    })
    const handleChange = (event) => {
        setJadwalBaru({
            ...jadwalBaru,
            [event.target.name]: event.target.value
        })
    };
    const handleSubmitAdd = async (event) => {
        event.preventDefault();
        try {
            const { tanggal } = jadwalBaru;
            const response = await axios.post("http://localhost:5000/super-user/post-meeting-kantor", { tanggal });
            alert("Tambah Meeting Kantor Success");
        } catch (error) {
            console.log(error);
        } finally {
            setRefresh(!refresh);
        }
    };
    const handleSubmitDel = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const idMeetingKantor = formData.get('idMeetingKantor').toString();
            await axios.post(`http://localhost:5000/super-user/delete-meeting-kantor/${idMeetingKantor}`);
            alert("Delete Meeting Success")
        } catch (error) {
            console.log(error);
        } finally {
            setRefresh(!refresh)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/super-user/meeting");
            console.log(response.data);
            await setJadwal([...response.data.meetingKantor])
        }
        fetchData();
    }, [refresh])
    return (
        <>
            <main className="flex h-full">
                <SuperUserNavbar />
                <div className="px-16 mt-8 w-10/12">
                    <div className="w-full flex justify-center">
                        <h1 className="text-2xl font-bold">Jadwal Meeting Kantor</h1>
                    </div>
                    <div className="flex justify-between w-1/2 mx-auto">
                        <div className="mt-10 flex flex-col h-96 overflow-auto p-3 rounded-xl bg-slate-200">
                            <div className="p-2 flex  flex-col border-b-2 border-slate-400">
                                <div className="">
                                    Tanggal
                                </div>
                            </div>
                            {jadwal.length > 0 ? (
                                jadwal.map(item => (
                                    <div className="p-2 flex items-center border-b-2 border-slate-400">
                                        <div className="mr-4">
                                            {item.tanggal}
                                        </div>
                                        <form onSubmit={handleSubmitDel}>
                                            <input type="hidden" name="idMeetingKantor" value={item.id}/>
                                            <button type="submit" className="px-4 py-2 bg-red-600 text-sm text-white rounded-lg hover:bg-red-800">
                                                Hapus
                                            </button>
                                        </form>
                                    </div>
                                ))
                            ) : (<div className="p-2 flex items-center">
                                <div className="mr-4 w-44">
                                    
                                </div>
                            </div>)}

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

                                <button type="submit" className="rounded-lg text-xs bg-blue-500 text-white p-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminJadwalKantor;