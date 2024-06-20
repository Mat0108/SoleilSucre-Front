import { getApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";

const Collections = ()=>{
    const FirebaseApp = getApp();
    const [affichage, setAffichage] = useState("2x2")
    const [collections, setCollections] = useState([])
   
    
    function Display(affichage){
        if(affichage === "1x1"){
            return "grid grid-cols-1"
        }else if(affichage === "2x2"){
            return "grid grid-cols-2"
        }else if(affichage === "3x3"){
            return "grid grid-cols-3"
        }
    }


    useEffect(()=>{
        async function LoadData() {
            let collections2 = []
            const docs = await getDocs(collection(getFirestore(FirebaseApp), "collections"))
            docs.forEach((doc) => {
                collections2.push(doc.data());
            });
            setCollections(collections2)
        }
        console.log(!collections.length)
        if(!collections.length){LoadData()}
    })
    const [showOptions, setShowOptions] = useState(false)
    const Element = useMemo(()=>{

        return <div className={`relative ${Display(affichage)} w-full p-4 gap-4`}>
            <div className="absolute top-2 right-2">
            <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>setShowOptions(!showOptions)}>
                <img src={`/images/grille${affichage}.png`} alt={"grille"} className="w-4 h-4"/>
            </div>
            </div>
            {showOptions ? <div className="absolute top-10 right-2 bg-belge rounded-xl flex flex-row p-1">
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setAffichage("1x1");setShowOptions(!showOptions)}}>
                    <img src={`/images/grille1x1.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setAffichage("2x2");setShowOptions(!showOptions)}}>
                    <img src={`/images/grille2x2.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setAffichage("3x3");setShowOptions(!showOptions)}}>
                    <img src={`/images/grille3x3.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
            </div> : ""}
            {collections.map((collection,pos)=>{
                return <Card src={collection.image} alt={`collection-${pos}`} title={collection.title} affichage={affichage} to={`/Produits/${collection.key}`}/>
            })}
            {collections.map((collection,pos)=>{
                return <Card src={collection.image} alt={`collection-${pos}`} title={collection.title} affichage={affichage} to={`/Produits/${collection.key}`}/>
            })}
            </div>
        },[FirebaseApp, affichage,collections,showOptions,affichage])
    return <div className="relative w-full flex flex-col">
        
        <div className="relative w-full">
            <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
            <div className="absolute top-0 left-0 z-10 w-full h-full flex center font-c-bold text-black text-[36px]"> Nos collections </div>
         </div>
        {Element}
    </div>
}

export default Collections