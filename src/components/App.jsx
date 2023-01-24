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

    // Zerowanie stanu images tylko przy wyszukiwaniu nowych zdjęć i ustawieniu strony na 1. W przeciwnym razie dodaje nowe obrazy do listy..
    if (page === 1) {
      setImages([]);
    } else {
      setImages([...images]);
    }

    const response = await fetch(
      `https://pixabay.com/api/?key=${'32295934-1722a349e231221c1d2235015'}&q=${searchTerm}&page=${page}`
    );

    const data = await response.json();

    // Dodawanie nowych zdjęć do listy lub ustawienie pustej tablicy jeśli wyszukiwanie jest wykonywane po raz pierwszy.

    if (page === 1) {
      setImages([...data.hits]);
    } else {
      setImages([...images, ...data.hits]);
    }

    setIsLoading(false);
  };

  // Obsługa formularza wyszukiwania - zresetuj images na pustą tablicę i uruchom funkcję fetchImages() aby pobrać nowe obrazy.

  const handleSearch = event => {
    event.preventDefault();
    setImages([]);
    fetchImages();
  };

  // Obsługa zmiany wartości w polu wyszukiwania - ustaw searchTerm na wartość pola inputu.

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  // Obsługa przycisku "Pokaż więcej" - inkrementuj page o 1 aby pobrać kolejną stronę obrazów z API Pixabay.

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // Obsługa otwarcia modala - ustaw selectedImage i isModalOpen na odpowiednie wartości aby otworzyć modal z odpowiednim obrazem.

  const handleModalOpen = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Obsługa zamknięcia modala - ustaw isModalOpen na false aby zamknąć modal

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {' '}
      <Searchbar
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        onSubmit={handleSearch}
      />{' '}
      {isModalOpen && (
        <Modal image={selectedImage} onModalClose={handleModalClose} />
      )}{' '}
      {isLoading && <Loader />}{' '}
      {images.length > 0 && !isLoading && (
        <ImageGallery images={images} onModalOpen={handleModalOpen} />
      )}{' '}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}{' '}
    </div>
  );
};
