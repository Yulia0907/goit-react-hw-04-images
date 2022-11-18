import axios from 'axios';

const API_KEY = '30158154-b75a98e868b38445873354c76';

export const fetchImages = async (inputValue, page) => {
  const URL = `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  try {
    const responce = await axios(URL);
    return responce.data.hits;
  } catch (error) {
    console.log(error.message);
  }
};
