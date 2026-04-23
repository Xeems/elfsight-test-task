import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';
const STORAGE_KEY = 'species_cache';
const TTL = 1000 * 60 * 60 * 24;
const MAX_PAGES = 5;

export function useSpecies() {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    const loadFromCache = () => {
      const cached = localStorage.getItem(STORAGE_KEY);

      if (!cached) return null;

      try {
        const parsed = JSON.parse(cached);

        const isExpired = Date.now() - parsed.timestamp > TTL;

        if (isExpired) return null;

        return parsed.data || [];
      } catch {
        return null;
      }
    };

    const saveToCache = (data) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data,
          timestamp: Date.now()
        })
      );
    };

    const fetchSpecies = async () => {
      try {
        const cachedData = loadFromCache() || [];
        const set = new Set(cachedData);

        const requests = Array.from({ length: MAX_PAGES }, (_, i) =>
          axios.get(`${API_URL}?page=${i + 1}`)
        );

        const results = await Promise.all(requests);

        results.forEach(({ data }) => {
          data.results.forEach((char) => {
            if (char.species) {
              set.add(char.species);
            }
          });
        });

        const finalResult = [...set].sort();

        saveToCache(finalResult);
        setSpecies(finalResult);
      } catch (error) {
        console.error('Failed to fetch species:', error);
      }
    };

    fetchSpecies();
  }, []);

  return species;
}
