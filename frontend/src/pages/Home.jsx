import { memo, useCallback, useEffect, useState } from "react";
import Category from "../components/Category";
import Loading from "../components/Loading";
import { BackendUrl } from "../helper";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/ListingCard";


function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const AllListing = useCallback(async () => {
    try {
      const response = await axios.get(`${BackendUrl}/listings`);
      const result = response.data;
      console.log(result)
      setLoading(true);
      if (response) {
        setLoading(false);
        setData(result.listings);
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
      <Category />

      {loading ? <h1>Loading...</h1> : ""}
      <div className="flex flex-wrap w-full gap-5 px-10 lg:px-32 ">
        {data.map((item) => (
          <ListingCard key={item._id} item={{...item}}  />
        ))}
      </div>
    </>
  );
}
export default memo(Home);
