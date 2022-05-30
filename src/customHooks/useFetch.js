import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [response, setResponse] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
          const res = await fetch(url);
          const json = await res.json();
          setResponse(json);
      };
      fetchData();
    }, [url]);
  
    return response ;
  };

export default useFetch;