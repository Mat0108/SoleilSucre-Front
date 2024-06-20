import { getApp } from "firebase/app";
import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router";

const Produits = ()=>{
    const FirebaseApp = getApp();
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

                    setProduits(querySnapshot.docs.map(doc => {
                        return { id: doc.id, ...doc.data() };
                    }));
                });
                return () => unsubscribe();
            } else {
                const docs = await getDocs(collection(db, "produits"));
  
                setProduits(docs.docs.map(doc => {return { id: doc.id, ...doc.data() }}));
            }
        }
        if(!produits.length){LoadData()}
    },[FirebaseApp, params, produits.length])
    

    function getSortBy(produits,sortBy){
        switch(sortBy){
            case 'A-Z':
                return produits.sort((a, b) => a.Title.localeCompare(b.Title));
            case 'Z-A':
                return produits.sort((a, b) => b.Title.localeCompare(a.Title));
            case 'prix+':
                return produits.sort((a, b) => a.Prix - b.Prix);
            case 'prix-':
                return produits.sort((a, b) => b.Prix - a.Prix);
            default:
                return produits; // retourne les produits sans les trier si le critère de tri n'est pas reconnu
        }
    }
    const [affichage, setAffichage] = useState("2x2")
    const [showAffichage, setShowAffichage] = useState(false) 
    const [sortBy, setSortBy] = useState("A-Z")
    const [showSortBy, setShowSortBy] = useState(false)

    function Reset(){
        setShowAffichage(false);
        setShowSortBy(false)
    }
    const Element = useMemo(()=>{
        let sortProduits = getSortBy(produits,sortBy)
        return <div className={`relative ${Display(affichage)} w-full p-4 gap-4`}>
            {/* mode d'affichage */}
            <div className="absolute top-2 right-2">
                <div className="w-full h-full z-[10]  rounded-full bg-belge p-2 " onClick={()=>{Reset();setShowAffichage(!showAffichage)}}>
                    <img src={`/images/grille${affichage}.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
            </div>
            {showAffichage ? <div className="absolute z-[10] top-10 right-2 bg-belge rounded-xl flex flex-row p-1" onClick={()=>setShowAffichage(!showAffichage)}>
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setAffichage("1x1")}}>
                    <img src={`/images/grille1x1.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setAffichage("2x2")}}>
                    <img src={`/images/grille2x2.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setAffichage("3x3");}}>
                    <img src={`/images/grille3x3.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
            </div> : ""}

            {/* sortBy */}
            <div className="absolute z-[10] top-2 right-12">
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{Reset();setShowSortBy(!showSortBy)}}>
                    <img src={`/images/${sortBy}.png`} alt={"grille"} className="h-4"/>
                </div>
            </div>
            {showSortBy ? <div className="absolute z-[10]  top-10 right-12 bg-belge rounded-xl flex flex-row p-1" onClick={()=>setShowSortBy(!showSortBy)}>
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setSortBy("A-Z")}}>
                    <img src={`/images/a-z.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setSortBy("Z-A")}}>
                    <img src={`/images/z-a.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setSortBy("prix+");}}>
                    <img src={`/images/prix+.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
                <div className="w-full h-full rounded-full bg-belge p-2 " onClick={()=>{setSortBy("prix-");}}>
                    <img src={`/images/prix-.png`} alt={"grille"} className="w-4 h-4"/>
                </div>
            </div> : ""}
            {sortProduits.map((produit,pos)=>{
                return <Card src={produit.Image1} alt={`produits-${pos}`} title={produit.Title} prix={produit.Prix} affichage={affichage} fontTitle={"text-[12px]"} fontPrix={"text-[18px] font-c-bold"} to={`/Produit/${produit.id}`}/>
            })}
            </div>
        },[produits, showAffichage, affichage, showSortBy, sortBy])
    return <div className="relative w-full flex flex-col">
        
        <div className="relative w-full">
            <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
            <div className="absolute top-0 left-0 z-10 w-full h-full flex center font-c-bold text-black text-[36px]"> Nos Produits </div>
         </div>
        {Element}
    </div>
}

export default Produits