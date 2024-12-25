import React, {useEffect, useState} from 'react';

export default function Catalog() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `http://localhost:3333/books?page=${currentPage}&limit=4`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZmlyc3ROYW1lIjoiU2FzZGFzIiwibGFzdE5hbWUiOiJhc2Rhc2Rhc2QiLCJsb2dpbiI6ImFzZGFzZGFzZCIsImVtYWlsIjoiYWl0ZW1peDlAZ21haWwuY29tIiwicm9sbGUiOiJ1c2VyIiwiaWF0IjoxNzM1MTMyNjkzLCJleHAiOjE3MzUxMzM1OTN9.9xdYB-VNy-ySO3Pnr6kKvE1IPeeSnM_z53TOTZWvMVo',
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!data || !Array.isArray(data.results)) {
                    throw new Error('Неправильний формат даних від сервера');
                }

                // Розраховуємо загальну кількість сторінок
                const totalItems = data.total || data.results.length;
                const itemsPerPage = 4;
                const calculatedTotalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);

                setBooks(data.results);
                // Прибрано встановлення currentPage з відповіді сервера
                setTotalPages(calculatedTotalPages);

            } catch (error) {
                console.error("Помилка завантаження книг:", error);
                setError('Не вдалося завантажити книги. Спробуйте пізніше.');
                setBooks([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="catalog-container">
            <h1>Каталог</h1>
            {isLoading ? (
                <div className="loading">Завантаження...</div>
            ) : (
                <div>
                    {books.length > 0 ? (
                        <>
                            <ul className="books-list">
                                {books.map((book) => (
                                    <li key={book.id} className="book-item">
                                        <h2>{book.Name}</h2>
                                        <p>Автор: {book.Author}</p>
                                        <p>Сторінок: {book.Pages}</p>
                                        <p>Рік: {new Date(book.Year).toLocaleDateString()}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="pagination">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1 || isLoading}
                                >
                                    Попередня сторінка
                                </button>

                                <span className="page-info">
                                    Сторінка {currentPage}
                                </span>

                                <button
                                    onClick={handleNextPage}
                                    disabled={books.length === 0 || isLoading}
                                >
                                    Наступна сторінка
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1 || isLoading}
                            >
                                Попередня сторінка
                            </button>
                            <p>Книг не знайдено</p></>
                    )}
                </div>
            )}
        </div>
    );
}