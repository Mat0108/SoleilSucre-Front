import { getApp } from "firebase/app";
import { collection, doc, getDoc, getFirestore, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Carousel2 from "../components/Layout/Carousel2";
import Card from "../components/Card";
import { useCookies } from "react-cookie";
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';

const Produit = () => {
    const FirebaseApp = getApp();
    const [produit, setProduit] = useState({});
    const [produits, setProduits] = useState([]);
    const [showOptions,setShowOptions] = useState(true)
    const [taille,setTaille] = useState()
    const [color,setColor] = useState()
    const [nb, setNB] = useState(1)
    const [favori, setFavori] = useState(false);
    const [ cookies, setCookies] = useCookies(["panier"]);

    const params = useParams();
    const navigate = useNavigate();
    const auth = getAuth();
    
    function Image(src,pos){
        return <img src={src} alt={pos} className="w-full" key={pos}/>
    }
    const db = getFirestore(FirebaseApp);
    useEffect(()=>{
        async function LoadData() {
            const docRef = doc(db, 'produits', params.ProduitId);        
            const docSnap = await getDoc(docRef);
            if(auth.currentUser){
                
                const userDocRef = doc(db, "users", auth.currentUser.uid);
                const docUser = await getDoc(userDocRef);
            
                const produitIndex = (docUser.data().favori || []).indexOf(produit);
                console.log(produitIndex)
                setFavori(produitIndex !== -1)
            }
            if (docSnap.exists()) {
                setProduit({ id: docSnap.id, ...docSnap.data()});
                setTaille(docSnap.data().Taille ? docSnap.data().Taille.split(',')[0] :'  ')
                setColor(docSnap.data().Couleur ? docSnap.data().Couleur.split(',')[0] : '')
                const q = query(collection(db, "produits"), where("Categorie", "==", docSnap.data().Categorie));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let local = querySnapshot.docs.map(doc => {
                    return { id: doc.id, ...doc.data() };
                }).filter(product => product.id !== docSnap.id);
                let local2 = []
                local.map(item=>{
                    local2.push(item)
                })
                local.map(item=>{
                    local2.push(item)
                })
                setProduits(local2.slice(0, 3))
                return () => unsubscribe();
        
            
            });
           }
        }
        if(!Object.keys(produit).length){LoadData()}
    },[FirebaseApp, params, produit,produits,db,auth])
    

    function Button(text,set,selected){
        return <div className={`${selected ? "bg-black text-white":"bg-white text-black"} border-2 border-black p-2 rounded-lg w-full`} onClick={set}>{text}</div>
    }


    const element = useMemo(()=>{
        const updateFavoriList = async () => {
            setFavori(!favori)
            const user = auth.currentUser;
            if (!user) {toast.info("merci de se connecter pour mettre en favori");navigate("/Login");return;}
        
            
            const userDocRef = doc(db, "users", auth.currentUser.uid);
        
            try {
                const userDoc = await getDoc(userDocRef);
                if (!userDoc.exists()) return;
        
                let favoriList = userDoc.data().favori || [];
                
                const produitIndex = favoriList.filter(item => produit.id !== item.id);
                
                console.log(produitIndex,favoriList)
        
                if (Object.keys(produitIndex).length !== 0) {
                    favoriList.splice(produitIndex, 1);
                } else {
                    favoriList.push(produit);
                }
        
                await updateDoc(userDocRef, { favori: favoriList });
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        };
        function AddPanier(){
            const actualPanier = cookies.panier || [];
            const index = actualPanier.findIndex(item => item.produit.id === produit.id);
            if (index !== -1) {
                actualPanier[index].nb += nb;
            } else {
                actualPanier.push({ produit, nb });
            }
            setCookies("panier", actualPanier, { path: "/" });        
        }
        return <div className="w-full h-full relative">
        <div className="absolute top-2 left-2 p-2 bg-red rounded-full" onClick={()=>{updateFavoriList()}}><img src={favori ? "/images/savefill.png":"/images/save.png"} alt={"save"} className="w-4 h-4"/></div>
        <Carousel2  props={{items:[Image(produit.Image1,1),Image(produit.Image2,2),Image(produit.Image3,3)],nbShow:1,ratio:5,showPoint:true}}  />
        <div className="w-full flex flex-row p-2"> 
            <div className="w-[calc(100%-128px)] text-center text-[16px] font-c-bold">{produit.Title}</div>
            <div className="w-[70px] flex center mr-2"><p className="font-c-bold text-[20px] ">{produit.Prix} € </p></div>
            <div className="w-[50px] h-fit relative">
                <img src={"/images/panier.png"} alt={"panier"} className="border-red border-2 rounded-full p-2 " onClick={()=>setShowOptions(!showOptions)}/> 
                {showOptions && <div className="absolute top-full mt-2 right-0 w-fit h-fit bg-white flex flex-col gap-4 p-2 border-2 border-belge rounded-lg">
                    <div className="flex flex-row gap-4">
                        {produit.Taille?.split(',').map(item=>Button(item,()=>setTaille(item),item === taille))}
                    </div>
                    <div className="flex flex-row gap-4">
                        {produit.Couleur?.split(',').map(item=>Button(item,()=>setColor(item),item === color))}
                    </div>
                    <div className="border-2 w-fit border-black flex flex-row center font-c-bold gap-4 p-2">
                        <div className="font-sans text-[20px]" onClick={nb === 1 ? null:()=>setNB(nb-1)}>-</div>
                        <div className="text-[18px]">{nb}</div>
                        <div  className="font-sans text-[20px]"  onClick={()=>setNB(nb+1)}>+</div>
                    </div>
                    <div className={`bg-white text-black w-[150px] border-2 border-red p-2 rounded-lg`} onClick={()=>AddPanier()}>Ajouter au panier</div>
                    
                    </div>}
            </div>
        </div>
        <div className="w-full p-2 text-justify ">
            {produit.Text}
        </div>
        <div className="border-t-2 border-belge grid grid-cols-3 grid-rows-1 p-2 gap-4">
            {produits.map((item,pos)=>{
                return <Card src={item.Image1} alt={`produits-${pos}`} title={item.Title} prix={item.Prix} affichage={'3x3'} fontTitle={"text-[12px]"} fontPrix={"text-[18px] font-c-bold"} to={`/Produit/${item.id}`}/>
            })}
            
        </div>
    </div>},[produit,produits,showOptions,taille,color,nb,cookies,favori])

    return element
}
export default Produit;