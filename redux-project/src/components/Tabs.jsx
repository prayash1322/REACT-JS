import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs } from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = ["all", "photos", "videos", "GIF"];
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab)
  const isDark = useSelector((state) => state.theme.isDark)
  return (
    <div className="flex gap-5 px-10 py-5">
      {tabs.map((elem, idx) => (
        <button
          className={`${activeTab == elem ? 'bg-[#B5B9F0] text-gray-900' : isDark ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'} transition-all px-5 py-2 uppercase rounded-3xl cursor-pointer active:scale-90`}
          key={idx}
          onClick={() => dispatch(setActiveTabs(elem))}
        >
          {elem}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
