import { memo, useCallback, useEffect, useState } from "react";
import Category from "../components/Category";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { BackendUrl } from "../helper";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/ListingCard";


function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = BackendUrl;

  const AllListing = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/listings`);
      const result = response.data;
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
      <Category />

      {loading ? <h1>Loading...</h1> : ""}
      <div className="grid w-[100vw] grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {data.map((item) => (
          <ListingCard key={item._id} id={item._id} image={item.image} title={item.title} price={item.price} />
        ))}
      </div>
    </>
  );
}
export default memo(Home);
