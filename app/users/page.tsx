"use client";
import React, { useState } from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import { liteClient as algoliasearch } from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

function SearchUsers() {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchStateChange = (searchState) => {
    setIsSearching(searchState.query.length > 0);
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="appwrite"
      onSearchStateChange={handleSearchStateChange}
    >
      <div className="container mx-auto p-8 bg-white rounded-2xl shadow-lg max-w-3xl border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Algolia Search
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Start typing to search for users in real-time.
          </p>
        </div>

        <div className="space-y-6">
          {/* Custom Styled SearchBox */}
          <SearchBox
            className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            translations={{
              placeholder: "Search users...",
            }}
            submit={<></>} // Removes the search icon
            reset={<></>} // Removes the reset (clear) button
          />

          {isSearching ? (
            <Hits hitComponent={Hit} />
          ) : (
            <div className="text-center text-gray-500">
              <p>Start typing to see results...</p>
            </div>
          )}
        </div>
      </div>
    </InstantSearch>
  );
}

function Hit({ hit }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4 transition-all duration-200 hover:shadow-lg">
      <p className="text-lg font-semibold text-gray-800">{hit.name}</p>
      <p className="text-gray-600 text-sm">User ID: {hit.user_id}</p>
    </div>
  );
}

export default SearchUsers;
