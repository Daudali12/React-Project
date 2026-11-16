import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        const timeoutId = setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Could not fetch the data for that resource');
                    }
                    return response.json();
                })
                .then((result) => {
                    setData(result);
                    setError(null);
                })
                .catch(err  => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');

                        } else {
                            setIsPending(false);
                            setError(err.message);
                        }
                        
                    })
                    
                .finally(() => {
                    if (!abortCont.signal.aborted) {
                        setIsPending(false);
                    }
                });
        }, 1000); 

        return () => {
            clearTimeout(timeoutId);
            abortCont.abort();
        };
    }, [url]);

    return { data, setData, isPending, error };
};

export default useFetch;
