
import { getApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const Register = (props)=>{
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const [ setCookies ] = useCookies(["user"]);
      
    const FirebaseApp = getApp();
    const auth = getAuth(FirebaseApp);
    function onClick(){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            toast.success("Votre compte a bien été enregistrée !")
            setCookies(userCredential.user)
        })
        .catch((error) => { 
            console.log(error)
        });
    }
    return <div className="w-full flex flex-col center ">
        <div className="relative w-full">
            <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
            <div className="absolute top-0 left-0 z-10 w-full h-full flex center font-c-bold text-white text-[36px]"> REGISTER </div>
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
        </div>
    </div>
}
export default Register;