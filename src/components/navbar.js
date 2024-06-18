import { Link } from 'react-router-dom';
import MenuSelector from './MenuSelector';

const Navbar = () =>{
    const options = [
        {to:"/login",name:"login"},
        {to:"/register",name:"register"},
        {to:"/produits",name:"produits"}
    ]
    return <div className="flex flex-col center border-b-2 border-belge">
        <div><Link to={"/"}><img src={"/images/logo.png "} alt={"logo"}/></Link></div>
        <div className="absolute right-0 top-0"><MenuSelector icon={<img src={"images/menu.png"} alt={"menu"} className={"w-4 h-4"}/>} options={options}/></div>
    </div>
}
export default Navbar;