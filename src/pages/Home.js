import { useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";


const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [ cookies,removeCookie ] = useCookies(["user"]);
    useEffect(()=>{
        
        const auth = getAuth();

        if (location.pathname === "/Logout" ) {
            signOut(auth).then(() => {
                toast.success("vous étes deconnecté")
                removeCookie("user", null);
                navigate("/")
            }).catch((error) => {
                console.log(error)
            });
        }
    },[location,navigate,removeCookie])
    return <div className="flex flex-col">
        <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
        <div className="w-full flex flex-col center  mt-4 mb-4 gap-4">
            <p className="w-[50%] font-c-demi text-white text-[12px]">SUR TOUTE LA LINGERIE, LES BIJOUX ET LES ACCESSOIRES </p>
            <Link to="/Collections" className="w-fit p-2 font-c-bold bg-belge">{"Je découvre".toUpperCase()}</Link>
        </div>
        <img  src={"https://soleilsucre.com/cdn/shop/files/DSC_6933.jpg?v=1716202289&width=3840"} alt={"home"} />
        <div className="w-full flex flex-col center  mt-4 mb-4 gap-4">
            <p className="w-[50%] font-c-demi text-white text-[12px]">CRÉÉ TON PROPRE LOOK ACTIVEWEAR LIFESTYLE </p>
        </div>
        
        <img  src={"https://soleilsucre.com/cdn/shop/files/DSC_6219_6fbb5943-c588-483e-a007-faddb1aadb8c.webp?v=1718198068&width=3200"} alt={"home"} />
        <div className="w-full flex flex-col center  mt-4 mb-4 gap-4">
            <p className="w-[50%] font-c-demi text-white text-[12px]">2 articles achetés, le 3ème à -50% </p>
        </div>
        <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
        
    </div>
}
export default Home;