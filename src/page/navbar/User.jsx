import { Link } from "react-router-dom";
import iconPerson from "../../image/personIcon.png"

const UserNavbar = ()=>{
    return(
        <>
            <nav className="w-48 h-full bg-newDarkBlue text-white flex flex-col items-center">
                <img src={iconPerson} className="filter invert brightness-50 w-28 mt-6"/>
                <div className="mt-2 mb-7 text-xl">
                    User
                </div>
                <Link to="/user/jadwal-client" className="mb-1 rounded-md hover:bg-blue-500">
                    Jadwal Meeting Client
                </Link>
                <Link to="/user/jadwal-persidangan" className="mb-1 rounded-md hover:bg-blue-500">
                    Jadwal Persidangan
                </Link>
                <Link to="/user" className="mb-7 rounded-md hover:bg-blue-500">
                    Log Client
                </Link>
                <Link to="/user/login" className="mb-1 text-xl rounded-md hover:bg-blue-500">
                    Log Out
                </Link>
            </nav>
        </>
    )
}

export default UserNavbar;