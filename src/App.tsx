import './App.css';
import { useEffect, useState } from 'react';
import apiServices from './services/ApiService';
import { Comic } from './utils/interfaces';
import { getDateStandard } from './utils/helpers';

export default function App() {
    const [comics, setComics] = useState<Array<Comic>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getData = async () => {
        setLoading(true);
        try {
            const response = await apiServices.getComics();
            const filtered = response.data.results.filter((r) => r.characters.items.length);
            setComics(filtered);
        } catch (error: any) {
            setError(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return (
            <div id='loader'>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className='App'>
            <button id='btn-refresh' onClick={getData}>
                Refresh
            </button>
            <div id='list-container'>
                {error && (
                    <div>
                        <span id='error-msg'>{error}</span>
                    </div>
                )}
                {comics.map((comic) => (
                    <div key={comic.id} className='comic'>
                        <h3>{comic.title}</h3>
                        <h4>Released on: {getDateStandard(comic.dates.find((d) => d.type === 'onsaleDate')?.date)}</h4>
                        <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                        <div>
                            <h4>Characters</h4>
                            <div className='characters-container'>
                                {comic.characters.items.map((character) => (
                                    <div key={character.name}>
                                        <p className='character'>{character.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
