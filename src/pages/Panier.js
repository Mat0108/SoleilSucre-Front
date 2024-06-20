import { useCookies } from "react-cookie";

const Panier = ()=> {

    const [ cookies ] = useCookies(["panier"]);
    function Element(item,nb,taille,couleur){
        return <div className="flex flex-row p-2">
            <div className="w-[20%]"> <img src={item.Image1} alt={`${item.uid}-image`}/></div>
            <div className="w-[80%] flex flex-col p-2 gap-2"> 
                <div className="flex flex-row">
                    <div className="w-[75%] flex-row ">
                        <div className="">{item.Title}</div> 
                        <div className="flex flex-row gap-4 ml-4">
                            <div className={`bg-black text-white border-2 border-black p-2 rounded-lg w-fit`} >{taille}</div>
                            <div className={`bg-black text-white border-2 border-black p-2 rounded-lg w-fit`} >{couleur}</div>
                        </div>
                    </div>
                    <div className="w-[25%] flex flex-col gap-4 font-c-bold text-[16px]">
                        <div> {item.Prix} € </div>
                        <div className="text-[28px]">{nb}</div>
                    </div>
                </div>
                <div className="flex flex-col center">
                    <img src={"/images/del.png"} alt={"del"} className="w-10 h-10 p-2 border-2 border-belge rounded-lg"/>
                </div>
 
            </div>
     
        </div>
    }
    let total = 0
    cookies.panier.map(item=>{total += parseFloat(item.produit.Prix)*item.nb })

    return <div className="w-full h-full flex flex-col">
        <div className="font-c-bold text-[60px] text-Center">Panier</div>
        {cookies.panier && cookies.panier.map((item)=>Element(item.produit,item.nb,item.taille,item.color))}
        <div className="flex center justify-around p-4">
            <div className="text-[16px] font-c-bold"> Total : { total } €</div>
            <div className="border-2 border-belge font-c-bold rounded-lg p-2">Commander</div>
        </div>
    </div>
}
export default Panier;