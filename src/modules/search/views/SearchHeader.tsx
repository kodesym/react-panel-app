interface Props {
  filters: { status: string; keyword: string };
  setFilters: (filters: { status: string; keyword: string }) => void;
}

export const SearchHeader = ({ filters, setFilters }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border px-2 py-1"
      >
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
      <input
        type="text"
        value={filters.keyword}
        onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        placeholder="Search keyword"
        className="border px-2 py-1 flex-1"
      />
    </div>
  );
};