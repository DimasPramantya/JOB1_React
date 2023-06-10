import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = ()=>{
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            const {username, password} = formLogin;
            const response = await axios.post("http://localhost:5000/user/login", {username,password});
            const {status} = response.data;
            if(status==="error"){
                const {err} = response.data;
                return alert(err)
            }
            else{
                navigate("/user");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: ""
    })
    const handleChange = (event)=>{
        setFormLogin({
            ...formLogin,
            [event.target.name] : event.target.value
        })
    }
    return(
        <>
            <main className="w-1/3 mx-auto mt-16 flex flex-col">
                <form onSubmit={handleSubmit}>
                        <div className="mb-5 w-full flex justify-center">
                            <div className="text-2xl font-bold">Login</div>
                        </div>
                        <div className="mb-6">
                            <label className="block" for="username">
                                Username
                            </label>
                            <input
                                className="appearance-none border-none rounded w-full p-3 leading-tight focus:outline-none focus:shadow-outline"
                                 type="text" name="username" onChange={handleChange}/>
                        </div>
                        <div className="mb-8">
                            <label className="block" for="username">
                                Password
                            </label>
                            <input
                                className="appearance-none border-none rounded w-full p-3 leading-tight focus:outline-none focus:shadow-outline"
                                 type="password" name="password" onChange={handleChange}/>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800">
                            Login
                        </button>
                </form>
            </main>
        </>
    )
}

export default UserLogin;