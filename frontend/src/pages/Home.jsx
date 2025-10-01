import { memo, useCallback, useEffect } from "react";
import Loading from "../components/Loading";
import { BackendUrl } from "../helper";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/ListingCard";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


function Home() {
  const {listingData, setListingData,loading, setLoading} = useContext(AuthContext)

  const AllListing = useCallback(async () => {
    try {
      const response = await axios.get(`${BackendUrl}/listings`);
      const result = response.data;
      setLoading(true);
      if (response) {
        setLoading(false);
        setListingData(result.listings);
      }
    } catch (err) {
      toast.err(err.message);
    }
  }, []);
  
  
  useEffect(() => {
    AllListing();
  }, [AllListing]);

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
        {listingData && listingData.map((item) => (
          <ListingCard key={item._id} item={{...item}}  />
        ))}
      </div>
    </>
  );
}
export default memo(Home);
