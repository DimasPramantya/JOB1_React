import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TambahClient = ()=>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: "",
        alamat_email: "",
        file: "",
        namaKasus: ""
    });
    const handleChange = (event)=>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            const {nama, alamat_email, file, namaKasus} = formData;
            const response = await axios.post('http://localhost:5000/form-permohonan',{nama, alamat_email, file, namaKasus});
            console.log(response.data.message);
            navigate("/super-user")
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
            <main className="w-2/5 mx-auto mt-16">
                <form onSubmit={handleSubmit}>
                        <div className="mb-5 w-full flex justify-center">
                            <div className="text-2xl font-bold">Tambah Client</div>
                        </div>
                        <div className="mb-8">
                            <label className="block" for="username">
                                Nama Lengkap
                            </label>
                            <input
                                className="appearance-none border-none rounded w-full p-3 leading-tight focus:outline-none focus:shadow-outline"
                                 type="text" name="nama" onChange={handleChange}/>
                        </div>
                        <div className="mb-8">
                            <label className="block" for="username">
                                Nama Kasus
                            </label>
                            <input
                                className="appearance-none border-none rounded w-full p-3 leading-tight focus:outline-none focus:shadow-outline"
                                 type="text" name="namaKasus" onChange={handleChange}/>
                        </div>
                        <div className="mb-8">
                            <label className="block" for="username">
                                Alamat Email
                            </label>
                            <input
                                className="appearance-none border-none rounded w-full p-3 leading-tight focus:outline-none focus:shadow-outline"
                                 type="text" name="alamat_email" onChange={handleChange}/>
                        </div>
                        <div className="mb-8">
                            <label className="block" for="username">
                                File Kasus
                            </label>
                            <input
                                className="appearance-none border-none rounded w-full p-3 leading-tight focus:outline-none focus:shadow-outline"
                                 type="text" name="file" placeholder="Link File" onChange={handleChange}/>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-xl">
                            Ajukan
                        </button>
                </form>
            </main>
        </>
    )
}

export default TambahClient;