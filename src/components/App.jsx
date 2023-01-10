import React, { useState, useEffect } from 'react';
import Searchbar from './SearchBar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Funkcja pobierająca obrazy z API
  const fetchImages = async () => {
    setIsLoading(true);
    if (page === 1) {
      // Zerowanie stanu images tylko przy wyszukiwaniu nowych zdjęć
      setImages([]);
    }
    const response = await fetch(
      `https://pixabay.com/api/?key=${'32295934-1722a349e231221c1d2235015'}&q=${searchTerm}&page=${page}`
    );
    const data = await response.json();
    setImages([...images, ...data.hits]); // Dodawanie nowych zdjęć do listy
    setIsLoading(false);
  };

  // Obsługa formularza wyszukiwania
  const handleSearch = event => {
    event.preventDefault();
    setImages([]); // Ustaw początkową wartość stanu `images` na pustą tablicę
    setPage(1);
    fetchImages();
  };

  // Obsługa zmiany wartości w polu wyszukiwania
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  // Obsługa przycisku "Pokaż więcej"
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // Obsługa otwarcia modala
  const handleModalOpen = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Obsługa zamknięcia modala
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchImages();
    }
  }, [page]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        onSubmit={handleSearch}
      />
      {isModalOpen && (
        <Modal image={selectedImage} onModalClose={handleModalClose} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <ImageGallery images={images} onModalOpen={handleModalOpen} />
      )}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
    </div>
  );
};
