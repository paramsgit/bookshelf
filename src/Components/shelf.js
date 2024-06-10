import React, { useEffect, useState } from "react";
import Card from "./card";
const Shelf = (props) => {
    const [data, setdata] = useState([])
    const [refresh, setrefresh] = useState(0)
    useEffect(() => {
        const books = localStorage.getItem('bookshelf')
        console.log(typeof (books))
        if (!books) { }
        else {
            setdata(JSON.parse(books))

        }
    }, [refresh])

    return (
        <div
            className={`pt-20 transition-all duration-500 ease-in-out bg-slate-100 min-h-screen dark:bg-[#232323] pb-20`}
        >
            <div className="flex flex-wrap item-centre justify-evenly">

                {data?.map((m) => {
                    return <Card setrefresh={setrefresh} refresh={refresh} name={m?.name} key={m?.uid} uid={m.uid} author={m?.author} imageId={m?.imgLink} showDltBtn={true} />
                })}
                {data.length == 0 && <div className="w-screen pt-8 item-center flex justify-center text-xl text-gray-800 dark:text-gray-100">
                    No items found
                </div>}

            </div>
        </div>

    );
};

export default Shelf;
