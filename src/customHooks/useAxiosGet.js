import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosGet = (url) => {
    const [response, setResponse] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
          const res = await axios.get(url);
        //   const json = await res.json();
          setResponse(res);
      };
      fetchData();
    }, [url]);
  
    return response ;
  };

export default useAxiosGet;