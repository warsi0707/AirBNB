import { memo, useCallback, useEffect, useState } from "react";
import Category from "../components/Category";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { BackendUrl } from "../helper";
import axios from "axios";
import toast from "react-hot-toast";


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
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {data.map((item) => (
          <div
            key={item._id}
            className="h-auto w-auto px-5 sm:w-72 md:w-[400px] lg:w-96 xl:w-80 sm:mx-auto rounded-xl"
          >
            <Link to={`/detail/${item._id}`}>
              <img
                src={item.image}
                alt=""
                className="object-cover w-full h-60 rounded-xl"
              />
              <div className="py-3">
                <div className="flex justify-between space-y-2 ">
                  <h1 className="mt-1 text-xl">{item.title}</h1>
                  <h1 className="text-gray-600">
                    <i className="fa-solid fa-dollar-sign "></i> {item.price}
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-600"></h1>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
export default memo(Home);
