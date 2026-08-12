import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";
import { clearCollection, clearToast } from "../redux/features/collectionSlice";
const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items)
  const isDark = useSelector((state) => state.theme.isDark)
  const dispatch = useDispatch()

  const clearAll = () => {
    dispatch(clearCollection())
    dispatch(clearToast())
  }

  return (
    <div className="overflow-auto px-10 py-5 scrollbar-none">
          {collection.length>0?<div className="flex justify-between mb-6">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Collections</h2>
          <button onClick={clearAll} className="bg-[#B5B9F0] rounded-3xl px-4 py-2 text-black font-medium cursor-pointer active:scale-95">Clear Collection</button>
        </div>:<h2 className={`text-3xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Collection is Empty</h2>}
        
      <div className="flex justify-start flex-wrap shrink-0 flex-row gap-6 w-full">
        {collection.map((item, idx) => (
            <CollectionCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
