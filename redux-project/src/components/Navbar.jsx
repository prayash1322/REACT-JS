import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/features/themeSlice";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch()
  const isDark = useSelector((state) => state.theme.isDark)
  const collectionCount = useSelector((state) => state.collection.items.length)

  return (
    <div className={`flex justify-between items-center ${isDark ? 'bg-[#0B0909]' : 'bg-white shadow-md'} py-5 px-8 text-2xl`}>
      <Link to='/' className="font-bold text-2xl">Glimpse</Link>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="text-lg font-medium active:scale-95 transition-all bg-[#B5B9F0] text-[#0B0909] p-3 rounded-full cursor-pointer flex items-center gap-2"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link
          className="text-lg font-medium active:scale-95 transition-all bg-[#B5B9F0] text-[#0B0909] px-4 py-2 rounded-2xl"
          to="/"
        >
          Search
        </Link>
        <Link
          className="relative text-lg font-medium active:scale-95 transition-all bg-[#B5B9F0] text-[#0B0909] px-4 py-2 rounded-2xl"
          to="/collection"
        >
          Collection
          {collectionCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {collectionCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
