
import { useState,useEffect, useMemo, useRef } from "react";
import { getW } from "../TailwindUtils";
const Carousel2 =({props})=>{
    // props : {{items,nbShow}}
    const [show,setShow]= useState(0)
    const [pos,setPos]= useState(0)
    const [items,setItems] = useState()
    const [ratio,setRatio] = useState(15)
    
    const [Mratio,setMRatio] = useState(10)
    useEffect(()=>{if(props.start){setShow(props.start);setPos(props.start%3)}},[props.start])
    useEffect(() => {
        if(props.items){
            let i;
            let list = [];
            if(typeof props.setShow === "function"){
                props.setShow(show);
            }
            
            for (i=show;i<props.nbShow+show;i++){
                if(Object.keys(props.items).length === 2){
                    list.push(props.items[i])
                }else{
                    if(i>=Object.keys(props.items).length){
                        list.push(props.items[i-Object.keys(props.items).length])
                    }else{
                        list.push(props.items[i])
                    }
                }
                
            }
            setItems(list)
        }
        if(props.ratio) {setMRatio(props.ratio);setRatio(props.ratio)}
        }, [props,show])

    function Back(){
        setShow(show === 0 ? Object.keys(props.items).length-1 : show-1);
        setPos(pos === 0 ? 2:pos-1);
    }
    function Next(){
        setShow(show>=Object.keys(props.items).length-1 ? 0:show+1);
        setPos(pos >= 2 ? 0:pos+1);
    }

    const carouselRef = useRef(null);
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        carouselRef.current.startX = touch.clientX;
    };

    const handleTouchMove = (e) => {
        if (!carouselRef.current.startX) return;

        const touch = e.touches[0];
        const diffX = carouselRef.current.startX - touch.clientX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                Next();
            } else {
                Back();
            }
            carouselRef.current.startX = null;
        }
    };
    return (
        <div className="w-full flex flex-col"  ref={carouselRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>       
            <div className="flex flex-col w-full">
                
                <div className={`flex flex-row w-full h-full ${props.nbShow === 1 ? "center":"justify-between space-x-4"}`}>
                    {items}
                </div>
          
                <div className="flex flex-row w-full center">
                    <div className={`${getW(Mratio,true)} sm:${getW(ratio,true)} flex center`}>
                    {!props.disableClic && <p className="text-5xl" onClick={()=>{Back()}}>{"<"}</p>}
                    </div>
                    <div className="m-1 mt-2 font-c-bold text-[14px]">{`${pos+1} / ${Object.keys(props.items).length}`}</div>
                    <div className={`${getW(Mratio,true)} sm:${getW(ratio,true)} flex center`}>
                        {!props.disableClic &&<p className="text-5xl" onClick={()=>{Next()}}>{">"}</p>}
                    </div>
                </div>
            </div>
          
        </div>
    )
}
export default Carousel2