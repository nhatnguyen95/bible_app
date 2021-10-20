import axios from "axios";
import books from "../json/books.json";

const instance = axios.create({
  baseURL: "https://bible-api.com/",
});

export const getBooks = () => {
  return Object.keys(books).map((key) => ({
    title: key,
    data: Array.from({ length: books[key] }, (_, k) => k + 1),
  }));
};

export const getVersesApi = (bookName, chapter, numberOfVerse) => {
  return instance.get(
    `/${bookName.toLowerCase()}+${chapter}:1-${numberOfVerse}`
  );
};
