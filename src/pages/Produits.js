import { getApp } from "firebase/app";
import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router";

const Produits = ()=>{
    const FirebaseApp = getApp();
    const [affichage, setAffichage] = useState("2x2")
    const [produits, setProduits] = useState([])
    const params = useParams()
    
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
            const db = getFirestore(FirebaseApp);

            if (Object.keys(params).length) {  
                const q = query(collection(db, "produits"), where("Categorie", "==", params.CollectionName));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {

                    setProduits(querySnapshot.docs.map(doc => doc.data()));
                });
                return () => unsubscribe();
            } else {
                const docs = await getDocs(collection(db, "produits"));
  
                setProduits(docs.docs.map(doc => doc.data()));
            }
        }
        console.log(!produits.length)
        if(!produits.length){LoadData()}
    },[FirebaseApp, params, produits.length])
    const [showOptions, setShowOptions] = useState(false)
    useEffect(()=>{
        console.log(produits)
    },[produits])
    const Element = useMemo(()=>{
        console.log(produits)
        return <div className={`relative ${Display(affichage)} w-full p-4 gap-4`}>
            <div className="absolute top-2 right-2">
            <div className="w-full h-full rounded-full bg-blue p-2 " onClick={()=>setShowOptions(!showOptions)}>
                <img src={`/images/grille${affichage}.png`} alt={"grille"} className="w-4 h-4"/>
            </div>
            </div>
            {showOptions ? <div className="absolute top-10 right-2 bg-dark rounded-xl flex flex-row p-1">
                <div className="w-full h-full rounded-full bg-blue p-2 " onClick={()=>{setAffichage("1x1");setShowOptions(!showOptions)}}>
                    <img src={`/images/grille1x1.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
                <div className="w-full h-full rounded-full bg-blue p-2 " onClick={()=>{setAffichage("2x2");setShowOptions(!showOptions)}}>
                    <img src={`/images/grille2x2.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
                <div className="w-full h-full rounded-full bg-blue p-2 " onClick={()=>{setAffichage("3x3");setShowOptions(!showOptions)}}>
                    <img src={`/images/grille3x3.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
            </div> : ""}
            {produits.map((produit,pos)=>{
                return <Card src={produit.Image1} alt={`produits-${pos}`} title={produit.Title} affichage={affichage} font={"text-[12px]"}/>
            })}
            </div>
        },[affichage, produits, showOptions])
    return <div className="relative w-full flex flex-col">
        
        <div className="relative w-full">
            <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
            <div className="absolute top-0 left-0 z-10 w-full h-full flex center font-c-bold text-white text-[36px]"> Nos Produits </div>
         </div>
        {Element}
    </div>
}

export default Produits