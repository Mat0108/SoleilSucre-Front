import { getApp } from "firebase/app";import { useEffect, useMemo, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import Carousel2 from '../components/Layout/Carousel2';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Blog = () =>{
    const FirebaseApp = getApp();
    const params = useParams();
    const [margin,setMargin] = useState("my-2 sm:my-8");
    const [listItem,setListItem] = useState({
        titre:[],
        text:[],
        image:[],
        atlimage:[],
        textcolor:[],
        layout:[]});
    const [listItems,setListItems]= useState([])
    
    useEffect(() => {
        const fetchData = async() => {
            const db = getFirestore(FirebaseApp);
            const userDocRef = doc(db, "blogs", 'RqHH4C9mpFTCcd3HVOFF');
            const docUser = await getDoc(userDocRef);
            if(docUser.exists()){
                console.log(docUser.data());
                setListItem(docUser.data());
            }
            };
        if(!Object.keys(listItem.titre).length){fetchData()}
    }, [])
    
    //Layout list : IF -> fullimage, IFT -> fullimage avec un titre, IFD -> image avec du text en dessous, IFTD combine IFT && IFD , TF -> fulltext, TL -> layout avec text à gauche et image à droite, TR -> layout avec image à gauche et text à droite
    function itemCarousel(image,altimage,title,text,url){
        return (<>
            <div className="relative w-full h-fit mt-[10px] flex center" key={url}>
                <Link to={url}>
                    <div className="mt-[20px] w-full flex center h-[100px] sm:h-[250px]"> <img src={image}  alt={altimage} className='h-[100px] sm:h-[250px] w-fit'/></div>  
                    <div className="h-[100px] sm:h-[150px] flex center flex-col">
                        <p className="w-[90%] sm:w-[70%] mt-[6px] sm:mt-[20px] text-[8px] sm:text-[16px] font-mt-extra-bold text-blue">{title}</p>    
                        <p className="w-[90%] sm:w-[70%] text-[8px] sm:text-[16px] mt-[5px] text-justify ">{text}</p>
                    </div>
                </Link>
            </div>
        </>)
    }

    


    function returnTextWithImage(titre,text,image,altimage,pos){
        if(pos === false){
            return <div className={`w-[90%] sm:w-[86%] h-fit ${margin}`}>
                {!!titre &&<div className={`w-full h-fit ${margin}`}><h1 className='text-left text-[20px]  text-blue font-mt-extra-bold'>{titre}</h1></div>}
                {(!!image || !!text) && <div className={`flex center w-full h-fit gap-2 sm:gap-8`}>
                    {!!image && <div className={`${text ? "w-1/3" : "w-full"} h-fit flex center`}><img src={image} alt={altimage} className='w-fit h-full'></img></div>}
                    {!!text && <div className={`${image ? "w-2/3" : "w-full"} h-fit flex `}><div className='text-[8px] sm:text-[22px] text-justify'>{text}</div></div>}
                </div>}</div>
        }else{
            return <div className={`w-[90%] sm:w-[86%] h-fit ${margin}`}>
                {!!titre &&<div className={`w-full h-fit ${margin}`}><h1 className='text-left text-[20px]  text-blue font-mt-extra-bold'>{titre}</h1></div>}
                {(!!image ||!!text ) && <div className={`flex center w-full h-fit gap-2 sm:gap-8`}>
                {!!text && <div className={`${image ? "w-2/3" : "w-full"} h-fit flex`}><div className='text-[14px] sm:text-[20px] text-justify'>{text}</div></div>}
                {!!image && <div className={`${text ? "w-1/3" : "w-full"} h-fit flex center`}><img src={image} alt={altimage} className='w-fit h-full'></img></div>}
            </div>}
            </div>
        }
    }
    function returnFullImageWithTitre(titre,image,altimage,textcolor){
        return <>{!!image && <div className='relative w-full h-fit'>
            <img className='w-full h-fit max-h-[200px] sm:max-h-[600px]' src={image} alt={altimage}></img>
            {!!titre && <div className='absolute top-0 left-0 w-full h-full flex center'><p className={`w-[80%] ${textcolor ? textcolor : "text-white"} mt-2 text-[20px] sm:text-[50px] font-mt-extra-bold`}>{titre}</p></div>}
        </div>}</>
    }
    function returnFullImage(image,altimage){
        return <>{!!image && <div className='relative w-full h-fit '>
            <img className='w-full h-fit max-h-[200px] sm:max-h-[600px] ' src={image} alt={altimage}></img>
        </div>} </>
    }
    function returnImageWithTextDown(text,image,altimage){
        return <div className={`w-full h-fit ${margin}`}>
        {(!!image ||!!text ) && <div className={`flex center flex-col w-full h-full  gap-2 sm:gap-8`}>
            {!!image && <div className={`w-full h-fit flex center`}><img src={image} alt={altimage} className='w-full h-fit max-h-[200px] sm:max-h-[600px]'></img></div>}
            {!!text && <div className={`w-[90%] sm:w-[86%] h-fit flex center`}><div className='mx-auto text-[8px] sm:text-[20px] text-justify'>{text}</div></div>}
        </div>}
        </div>
    }
    function returnFullImageWithTitreAndTextDown(titre,text,image,altimage,textcolor){
        return <div className={`w-full h-fit ${margin}`}>
        {(!!image ||!!text ) && <div className={`flex center flex-col w-full h-full  gap-2 sm:gap-8`}>
            {!!image && <div className='relative w-full h-fit'>
            <img className='w-full h-fit max-h-[200px] sm:max-h-[600px]' src={image} alt={altimage}></img>
            {!!titre && <div className='absolute top-0 left-0 w-full h-full flex center'><p className={`w-[80%] ${textcolor ? textcolor : "text-white"} mt-2 text-[20px] sm:text-[50px] font-mt-extra-bold`}>{titre}</p></div>}
            </div>}
            {!!text && <div className={`w-[90%] sm:w-[86%] h-fit flex center`}><div className='mx-auto text-[8px] sm:text-[20px] text-justify'>{text}</div></div>}
        </div>}
        </div>

    }
    function switchLayout(layout,title,text,image,altimage,textcolor){
        if(title === "null"){ title = ""}
        if(text === "null"){ text = ""}
        if(image === "null"){ image = ""}
        if(altimage === "null"){ altimage = ""}
        if(textcolor === "null"){ textcolor = ""}
        switch(layout){
            case "IF":
                return returnFullImage(image,altimage);
            case "IFT":
                return returnFullImageWithTitre(title,image,altimage,textcolor);
            case "IFD":
                return returnImageWithTextDown(text,image,altimage);
            case "IFTD":
                return returnFullImageWithTitreAndTextDown(title,text,image,altimage,textcolor)
            case "TF":
                return returnTextWithImage(title,text,null,null,false);
            case "TL":
                return returnTextWithImage(title,text,image,altimage,false);
            case "TR":
                return returnTextWithImage(title,text,image,altimage,true);
            default:
                return <></>
        }
    }

    //Layout list : IF -> fullimage, IFT -> fullimage avec un titre, TF -> fulltext, TL -> layout avec text à gauche et image à droite, TR -> layout avec image à gauche et text à droite
    
    const items = useMemo(() => {
        let list = []
        if(!!Object.keys(listItem.layout).length){
            for(let i = 0;i< Object.keys(listItem.layout).length;i++){
                
                list.push(switchLayout(listItem.layout[i],listItem.titre[i],listItem.text[i]))
            }
        }
        return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listItem]);


    const BlogCarousel = useMemo(() =>
    { 
        let list2 = []
        let start = 0;
        if(Object.keys(listItems).length){
            listItems.map((blog,pos)=>{
                
                list2.push(itemCarousel(blog.image,blog.alt,blog.title,blog.text,`/Blog/${blog.altimagepresentation}`))
                if(blog.altimagepresentation === params.BlogId){
                    start = pos
                }
                return ""
            })
        }
        return <Carousel2 props={{items:list2,nbShow:1,ratio:25,showPoint:true,start:start}}/>
    }, [listItems,params])

    return (<div className='w-full h-full flex center flex-col'>
        {items}
        {/* <div className="relative w-full h-0.5 mt-[30px] bg-[#10264C4D]"></div>
        <div><h1 className="mt-[12px] sm:mt-[30px] text-[12px] sm:text-[50px] font-mt-extra-bold text-blue ">Articles connexes :</h1></div>
        {BlogCarousel}
        <div className="relative w-full h-0.5 mt-[30px] bg-[#10264C4D]"></div> */}
        
    </div>)
    
}
export default Blog;