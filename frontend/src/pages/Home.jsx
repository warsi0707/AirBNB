import { memo, useEffect, useState } from "react";
import Loading from "../components/Loading";
import ListingCard from "../components/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../redux/sclice/listingSlice";

function Home() {
  const dispatch = useDispatch();
  const listings = useSelector(state => state.listing.listing)
  const loading = useSelector(state => state.listing.listingLoading)


  useEffect(() => {
    dispatch(fetchListing())
  }, [dispatch]);

  // if (loading) {
  //   return (
  //     <div className="w-full min-h-screen">
  //     <Loading/>
  //     </div>
  //   );
  // }
  return (
    <>

      <div className="flex flex-wrap w-full min-h-screen gap-5 p-5 pt-10 md:px-10 ">
        {listings &&
          listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
            />
          ))}
          {listings &&listings.length <=0 && 
          <div className="mx-auto">
            <p className="mt-20 text-xl">No matched listing</p>
          </div>
          }
      </div>
    </>
  );
}
export default memo(Home);
