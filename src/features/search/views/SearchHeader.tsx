interface Props {
  filters: { status: string; keyword: string };
  setFilters: (filters: { status: string; keyword: string }) => void;
}

export const SearchHeader = ({ filters, setFilters }: Props) => {
  return (
    <div>
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
      <input
        type="text"
        value={filters.keyword}
        onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        placeholder="Search keyword"
      />
    </div>
  );
};