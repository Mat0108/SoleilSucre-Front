
import { getApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore"; 

import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = (props)=>{
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname,setLastname] = useState();
    const [ setCookies ] = useCookies(["user"]);
      
    const navigate = useNavigate()
    const FirebaseApp = getApp();
    const auth = getAuth(FirebaseApp);
    const userCollection = collection(getFirestore(FirebaseApp),"users")
    function onClick(){
        if(password && password2 && email && firstname && lastname && password === password2 ){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setDoc(doc(userCollection,userCredential.user.uid),{
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                }).then(user => {
                    
                    toast.success("Votre compte a bien été enregistrée !")
                    setCookies({email,firstname,lastname})
                    navigate("/")
                }).catch((error) => { 
                    console.log(error)
                });
                })
            .catch((error) => { 
                console.log(error)
            });
        }else{
            toast.info("Mot de passe différent ou champs manquant")
        }
    }
    return <div className="w-full flex flex-col center ">
        <div className="relative w-full">
            <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
            <div className="absolute top-0 left-0 z-10 w-full h-full flex center font-c-bold text-white text-[36px]"> REGISTER </div>
        </div>
        <div className="w-[80%] flex flex-col center gap-4 mt-4"> 
            <div className="w-full flex flex-col">
                <p className="text-gray text-left">Prénom</p>
                <input className="border-2 border-belge rounded-lg w-full text-[16px] " type={"text"} value={firstname} onChange={(e)=>{setFirstname(e.target.value)}}/>
            </div>
            <div className="w-full flex flex-col">
                <p className="text-gray text-left">Nom</p>
                <input className="border-2 border-belge rounded-lg w-full text-[16px] " type={"text"} value={lastname} onChange={(e)=>{setLastname(e.target.value)}}/>
            </div>
            <div className="w-full flex flex-col">
                <p className="text-gray text-left">Email</p>
                <input className="border-2 border-belge rounded-lg w-full text-[16px] " type={"text"} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="w-full flex flex-col">
                <p className="text-gray text-left">Password</p>
                <input className="border-2 border-belge rounded-lg w-full text-[16px] " type={"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="w-full flex flex-col">
                <p className="text-gray text-left">Confirmé votre password</p>
                <input className="border-2 border-belge rounded-lg w-full text-[16px] " type={"password"} value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
            </div>
            <div className="font-c-bold bg-belge p-2 rounded-lg" onClick={()=>onClick()}>VALIDER</div>
        </div>
    </div>
}
export default Register;