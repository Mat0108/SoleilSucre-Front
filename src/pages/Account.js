
import { getApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
import {  doc, getDoc, getFirestore, updateDoc} from "firebase/firestore"; 
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const Account = (props)=>{
    const [email, setEmail] = useState()
    const [firstname, setFirstname] = useState();
    const [lastname,setLastname] = useState();
    const [ cookies, setCookies ] = useCookies(["user"]);
      
    const [loadData, setLoadData] = useState(0)
    const FirebaseApp = getApp();
    const auth = getAuth(FirebaseApp);
    function onClick(){
        const docRef = doc(getFirestore(FirebaseApp),"users",auth.currentUser.uid)
        updateDoc(docRef,{
            email: email,
            firstname: firstname,
            lastname: lastname,
        }).then(userData=>{setLoadData(0); toast.info("Vos informations ont bien été modifiée !")}).catch(error=>console.log(error))

    }
    
    useEffect(()=>{
        async function LoadData() {
            const docRef = doc(getFirestore(FirebaseApp), "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                const userData = docSnap.data();
                setEmail(userData?.email ?? '')
                setFirstname(userData?.firstname ?? '')
                setLastname(userData?.lastname ?? '')
                setCookies("user", userData, { path: "/" });
            
            }
        }
        if((loadData === 0 && auth.currentUser ) || (email === undefined && auth.currentUser)){
            LoadData()
            setLoadData(1)
        }
        },[loadData, auth, email, FirebaseApp])
    return <div className="w-full flex flex-col center ">
    <div className="relative w-full">
        <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
        <div className="absolute top-0 left-0 z-10 w-full h-full flex center font-c-bold text-black text-[36px]"> Votre compte </div>
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
       
        <div className="font-c-bold bg-belge p-2 rounded-lg" onClick={()=>onClick()}>Modifier les informations</div>
    </div></div>

}
export default Account;