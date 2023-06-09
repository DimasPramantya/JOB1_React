import { Link } from "react-router-dom"

const FormMessage = ()=>{
    return(
        <>
            <main className="flex flex-col items-center mt-20">
                <div className="w-3/5 text-center break-words text-3xl font-semibold mt-14">
                    Terimakasih atas kunjungan anda,
                    kami akan mempertimbangkan permintaan yang telah anda kirimkan,
                    kami akan menghubungi anda kembali melalui email yang telah anda cantumkan
                </div>
                <Link to="/form-permohonan">
                    <button className="mt-7 px-4 py-2 bg-blue-500 text-white rounded-lg">Selesai</button>
                </Link>
            </main>
        </>
    )
}

export default FormMessage
