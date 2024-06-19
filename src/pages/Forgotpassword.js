
import { getApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const Forgotpassword = (props)=>{
    const [email, setEmail] = useState()
    const [ setCookies ] = useCookies(["user"]);
      
    const FirebaseApp = getApp();
    const auth = getAuth(FirebaseApp);
    function onClick(){
        sendPasswordResetEmail(auth, email)
        .then((userCredential) => {
            toast.success("Un email de réinitialisation de votre mot de passe a bien été envoyée !")
            setCookies(userCredential.user)
        })
        .catch((error) => { 
            console.log(error)
        });
    }
    return <div className="w-full flex flex-col center ">
        <div className="relative w-full">
            <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
            <div className="absolute top-0 left-0 z-10 w-full h-full flex center font-c-bold text-white text-[36px]"> MOT DE PASSE OUBLIÉ  </div>
        </div>
        <div className="w-[80%] flex flex-col center gap-4 mt-4"> 

            <div className="w-full flex flex-col">
                <p className="text-gray text-left">Email</p>
                <input className="border-2 border-belge rounded-lg w-full text-[16px] " type={"text"} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            
            <div className="font-c-bold bg-belge p-2 rounded-lg" onClick={()=>onClick()}>VALIDER</div>
        </div>
    </div>
}
export default Forgotpassword;