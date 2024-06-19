import { useMemo } from "react";
import { getW } from "./TailwindUtils";
import { Link } from "react-router-dom";

const Card = (props) => {
    function Display(){
        if(props.affichage === "1x1"){
            return 6
        }else if(props.affichage === "2x2"){
            return 5
        }else if(props.affichage === "3x3"){
            return 6
        }
    }
    let Card = useMemo(()=>{
        let display = Display()
        return <Link className={`flex flex-col`} to={props.to}>
            <div className={`${getW(Math.round(display-1/display)*100)}`}>
                <img src={props.src} alt={props.alt} className=" border-t-4 border-l-4 border-r-4 border-belge rounded-t-xl "/>
            </div>
            <div className={`${getW(Math.round(1/display)*100)} flex flex-col center text-white ${props.font ?? "text-[20px]"} font-c-bold bg-dark border-4 border-t-2 border-belge rounded-b-xl`}>
                <p>{props.title}</p>
                <p>{props.prix}</p>
            </div>

        </Link>
    },[props])
    return Card;  
}
export default Card;