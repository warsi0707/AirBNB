import { memo, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { BackendUrl } from "../helper";
import toast from "react-hot-toast";
import ListingCard from "../components/ListingCard";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Home() {
  const { listingData, setListingData, loading, setLoading } =
    useContext(AuthContext);
  const [saved, setSaved] = useState([]);

  const allListing = async () => {
    try {
      const response = await fetch(`${BackendUrl}/listings`);
      const result = await response.json();
      setLoading(true);
      if (response.status == 200) {
        setLoading(false);
        setListingData(result.listings);
      } else {
        setListingData([]);
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const GetSavedListing = () => {
    const listing = JSON.parse(localStorage.getItem("saved-listing")) || [];
    setSaved(listing);
    allListing();
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
    GetSavedListing();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      {loading ? <h1>Loading...</h1> : ""}
      <div className="flex flex-wrap w-full gap-5 px-10 pt-10 lg:px-32 ">
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
      </div>
    </>
  );
}
export default memo(Home);
