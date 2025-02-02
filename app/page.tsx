"use client";
import ComboBox from "@/components/ui/combobox";
import { useState } from "react";

type Book = {
  key: string;
  title: string;
  first_publish_year: number;
  author_name: string[];
};

async function getBooks(query: string): Promise<Book[]> {
  return fetch(
    `http://openlibrary.org/search.json?title=${query === "" ? "the" : query}`
  )
    .then((res) => res.json())
    .then((data) => data.docs);
}

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book>();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Open Library</h1>
        <ComboBox<Book>
          title="Book"
          valueKey="key"
          value={selectedBook}
          searchFn={getBooks}
          renderText={(book) => `${book.title}`}
          onChange={setSelectedBook}
        />
      </main>
    </div>
  );
}
