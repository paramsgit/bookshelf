import React, { useEffect, useState } from "react";
import Card from "./card";
import { dummyData } from "./data";
import { SkeltonCard } from "./skeltonCard";

const Container = (props) => {
  const { query } = props
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (!query || query == localStorage.getItem('query')) {
      const olddata = localStorage.getItem('BooksData')
      if(olddata)
      {const oldy = JSON.parse(olddata)
      setdata(oldy.docs)}
      else{
        setdata(dummyData.docs)
      }
    }
    else {
      if (query)
        getNewData()
    }

  }, [query])

  const getNewData = async () => {
    setloading(true)
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
    const BooksData = await response.json()
    setdata(BooksData?.docs)
    localStorage.setItem('BooksData', JSON.stringify(BooksData))
    localStorage.setItem('query', query)
    setloading(false)
  }

  function generateId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const loader = [];
  for (let i = 0; i < 10; i++) {
    loader.push(<SkeltonCard key={i} />);
  }


  return (
    <div
      className={`pt-20 transition-all duration-500 ease-in-out bg-slate-100 min-h-screen dark:bg-[#232323] pb-20`}
    >
      {loading ?
        <div className="flex flex-wrap item-centre justify-evenly">
          {loader}
        </div>
        :
        <div className="flex flex-wrap item-centre justify-evenly">

          {data?.map((m) => {
            return <Card name={m?.title} key={m?.key} uid={m.key ? m.key : generateId()} author={m?.author_name[0]} imageId={m?.cover_i} />
          })}
          {data.length == 0 && <div className="w-screen pt-8 item-center flex justify-center text-xl text-gray-800 dark:text-gray-100">
            No items found
          </div>}

        </div>
      }
    </div>
  );
};

export default Container;
