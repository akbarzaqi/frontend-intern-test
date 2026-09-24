function SearchBar({keyword, onKeywordChange}: {keyword: string, onKeywordChange: (value: string) => void}) {
    console.log("[components/SearchBar.tsx] keyword:", keyword);
    return (
        <div className="flex justify-end">
            <input
                type="text"
                placeholder="Search users..."
                className="w-64 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;