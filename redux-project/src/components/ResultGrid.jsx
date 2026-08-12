import React, { useEffect } from "react";
import { fetchPhotos, fetchVideos, fetchGifs } from "../api/mediaApi";
import {
  setQuery,
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import ResultCard from "./ResultCard";
import SkeletonCard from "./SkeletonCard";

const ResultGrid = () => {
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        dispatch(setLoading());
        let data = [];
        if (activeTab === "all") {
          const [photoRes, videoRes, gifRes] = await Promise.all([
            fetchPhotos(query),
            fetchVideos(query),
            fetchGifs(query),
          ]);
          const photos = photoRes.results.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt_description,
            thumbnail: item.urls.small,
            src: item.urls.full,
            url: item.links.html,
          }));
          const videos = videoRes.videos.map((item) => ({
            id: item.id,
            type: "video",
            title: item.user.name || "video",
            thumbnail: item.image,
            src: item.video_files[0].link,
            url: item.url,
          }));
          const gifs = gifRes.data.map((item) => ({
            id: item.id,
            type: "gif",
            title: item.title || "GIF",
            thumbnail: item.images.fixed_height.url,
            src: item.images.original.url,
            url: item.url,
          }));
          data = [...photos, ...videos, ...gifs].sort(
            () => Math.random() - 0.5,
          );
        } else if (activeTab === "photos") {
          const response = await fetchPhotos(query);
          data = response.results.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt_description,
            thumbnail: item.urls.small,
            src: item.urls.full,
            url: item.links.html,
          }));
        } else if (activeTab === "videos") {
          let response = await fetchVideos(query);
          data = response.videos.map((item) => ({
            id: item.id,
            type: "video",
            title: item.user.name || "video",
            thumbnail: item.image,
            src: item.video_files[0].link,
            url: item.url,
          }));
        } else {
          let response = await fetchGifs(query);
          data = response.data.map((item) => ({
            id: item.id,
            type: "gif",
            title: item.title || "GIF",
            thumbnail: item.images.fixed_height.url,
            src: item.images.original.url,
            url: item.url,
          }));
        }
        dispatch(setResults(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };
    getData();
  }, [query, activeTab, dispatch]);

  if (error) return <h1>Something went wrong...</h1>;

  return (
    <div className="flex justify-center flex-wrap shrink-0 gap-6 w-full overflow-auto px-10 scrollbar-none">
      {loading
        ? Array(8).fill(0).map((_, idx) => <SkeletonCard key={idx} />)
        : results.map((item, idx) => <ResultCard key={idx} item={item} />)
      }
    </div>
  );
};

export default ResultGrid;
