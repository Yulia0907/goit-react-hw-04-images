import { useState, useEffect } from 'react';
import { fetchImages } from '../services/fetchImages';
import { helpers } from '../helper/helper';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    setIsLoading(true);

    fetchImages(searchName, page)
      .then(resp => {
        setImages(prevState => {
          return [...prevState, ...helpers(resp)];
        });
      })
      .catch(error => console.log(error.message))
      .finally(() => setIsLoading(false));
  }, [page, searchName]);

  const handleFormSubmit = searchNewName => {
    if (searchNewName !== searchName) {
      setImages([]);
      setPage(1);
    }

    setSearchName(searchNewName);
  };

  const onClickButtonLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onOpenModal = data => {
    setCurrentItem(data);
  };

  const onCloseModal = () => {
    setCurrentItem(null);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length !== 0 && (
        <>
          <ImageGallery images={images} onClickGallery={onOpenModal} />
          {!isLoading && <Button onClick={onClickButtonLoadMore} />}
        </>
      )}
      {isLoading && <Loader />}
      {currentItem && (
        <Modal onCloseModal={onCloseModal} currentItem={currentItem} />
      )}
    </>
  );
}
