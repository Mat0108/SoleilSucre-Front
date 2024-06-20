
import { getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props)=>{
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const [ cookies, setCookies ] = useCookies(["user"]);
      
    const navigate = useNavigate()
    const FirebaseApp = getApp();
    const auth = getAuth(FirebaseApp);
    function onClick(){
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            toast.success("Votre compte a bien été trouvée !")
            const docRef = doc(getFirestore(FirebaseApp), "users", userCredential.user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setCookies("user", docSnap.data(), { path: "/" });
                navigate("/")
            }
        })
        .catch((error) => { 
            console.log(error)
        });
    }
    return <div className="w-full flex flex-col center ">
        <div className="relative w-full">
            <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
            <div className="absolute top-0 left-0 z-10 w-full h-full flex center font-c-bold text-black text-[36px]"> LOGIN </div>
        </div>
        <div className="w-[80%] flex flex-col center gap-4 mt-4"> 

            <div className="w-full flex flex-col">
                <p className="text-gray text-left">Email</p>
                <input className="border-2 border-belge rounded-lg w-full text-[16px] " type={"text"} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="w-full flex flex-col">
                <p className="text-gray text-left">Password</p>
                <input className="border-2 border-belge rounded-lg w-full text-[16px] " type={"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="font-c-bold bg-belge p-2 rounded-lg" onClick={()=>onClick()}>VALIDER</div>
            <Link to="/Forgotpassword"><div className="font-c-bold bg-belge p-2 rounded-lg" >MOT DE PASSE OUBLIÉ</div></Link>
        </div>
    </div>
}
export default Login;