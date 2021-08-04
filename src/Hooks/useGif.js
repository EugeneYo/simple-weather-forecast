import { useState, useEffect } from "react";
import axios from "axios";

const GIF_KEY = process.env.REACT_APP_GIF_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${GIF_KEY}`;

const useGif = (tag) => {
	const [gif, setGif] = useState("");
	const [error, setError] = useState("");

	const fetchGif = async (tag) => {
		try {
			const { data } = await axios.get(tag ? `${url}&tag=${tag}` : url);
			console.log(data);

			const imageSrc = data.data.images.downsized_large.url;
			setGif(imageSrc);
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	useEffect(() => {
		fetchGif(tag);
	}, [tag]);
	return { gif, fetchGif };
};

export default useGif;
