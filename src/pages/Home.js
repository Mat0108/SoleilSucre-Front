const Home = () => {
    return <div className="flex flex-col">
        <img src={"/images/home/home.png"} alt={"home"} className="w-full"/>
        <div className="w-full flex flex-col center  mt-4 mb-4 gap-4">
            <p className="w-[50%] font-c-demi text-black text-[12px]">SUR TOUTE LA LINGERIE, LES BIJOUX ET LES ACCESSOIRES </p>
            <div className="w-fit p-2 font-c-bold bg-belge">{"Je découvre".toUpperCase()}</div>
        </div>
        <video autoplay muted>
            <source  type="video/mp4"  src={"https://cdn.shopify.com/videos/c/vp/f96ab2ca4839424093fd6731f50749bd/f96ab2ca4839424093fd6731f50749bd.HD-1080p-7.2Mbps-29567962.mp4"} alt={"video"}></source>
        </video>
        <div className="w-full flex flex-col center  mt-4 mb-4 gap-4">
            <p className="w-[50%] font-c-demi text-black text-[12px]">CRÉÉ TON PROPRE LOOK ACTIVEWEAR LIFESTYLE </p>
           
        </div>
    </div>
}
export default Home;