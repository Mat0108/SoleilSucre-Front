import { Link } from 'react-router-dom';
import MenuSelector from './MenuSelector';
import { useCookies } from 'react-cookie';
import { useMemo } from 'react';

const Navbar = () =>{
    
    const [ cookies ] = useCookies(["user"]);

    const Menu = useMemo(()=>{
        const options = [
            ...(typeof cookies.user === "object" && cookies.user !== null  ? [
                {to:"/Logout",name:"Logout"},
                {to:"/Account",name:"Votre compte"},
                {to:"/Panier",name:"Votre panier"}
            ]:[
                {to:"/login",name:"Login"},
                {to:"/register",name:"Register"},]),
            {to:"/Collections",name:"Collection"},
            {to:"/Produits",name:"Produits"}, 
            {to:"/Blog",name:"Blog"}
        ]
        return <div className="absolute right-0 top-0"><MenuSelector icon={<img src={"images/menu.png"} alt={"menu"} className={"w-4 h-4"}/>} options={options}/></div>
    
    },[cookies])
    return <div className="flex flex-col center border-b-2 border-belge">
        <div><Link to={"/"}><img src={"/images/logo.png "} alt={"logo"}/></Link></div>
        {Menu}
        </div>
}
export default Navbar;