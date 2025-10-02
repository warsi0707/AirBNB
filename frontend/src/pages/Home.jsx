import { memo, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";
import ListingCard from "../components/ListingCard";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Home() {
  const { listingData, setListingData, loading, setLoading,saved, setSaved } =
    useContext(AuthContext);
  // const [saved, setSaved] = useState([]);

  const allListing = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BackendUrl}/listings`);
      const result = await response.json();
      
      if (response.status == 200) {
        setLoading(false);
        setListingData(result.listings);
      } else {
        setLoading(false)
        setListingData([]);
      }
    } catch (error) {
      toast.error("Failed");
    }
  };


  const postSavedListing = (item) => {
    let listing = JSON.parse(localStorage.getItem("saved-listing")) || [];
    if (!Array.isArray(listing)) {
      listing = [];
    }
    if (!listing.find((b) => b._id === item._id)) {
      listing.push(item);
      toast.success("Saved");
      setSaved([...saved, item]);
    } else {
      toast.error("Aleady saved");
    }
    localStorage.setItem("saved-listing", JSON.stringify(listing));
  };

  useEffect(() => {
    allListing();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {loading ? <h1>Loading...</h1> : ""}
      <div className="flex flex-wrap w-full min-h-screen gap-5 p-5 pt-10 md:px-10 ">
        {listingData &&
          listingData.map((item) => (
            <ListingCard
              key={item._id}
              item={item}
              saved={saved}
              setSaved={setSaved}
              postSavedListing={postSavedListing}
            />
          ))}
          {listingData.length ==0 && 
          <div className="mx-auto">
            <p className="mt-20 text-xl">No matched listing</p>
          </div>
          }
      </div>
    </>
  );
}
export default memo(Home);
