import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url, options) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setTimeout(() => {
			axios
				.get(url, options)
				.then((res) => {
					setData(res?.data);
					setIsPending(false);
					setError(null);
					console.log(res.data);
				})
				.catch((e) => {
					if (e) setError(e);
					setData(null);
					setIsPending(false);
				});
		}, 1500);

		console.log("Getting Request");
	}, [options]);
	return { data, isPending, error };
};

export default useAxios;
