interface Props {
  filters: { status: string; keyword: string };
}

export const SearchContent = ({ filters }: Props) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">
        Showing results for: <strong>{filters.status}</strong>, keyword: <strong>{filters.keyword}</strong>
      </p>
      {/* Placeholder for results */}
      <div className="border p-4">[Results would go here]</div>
    </div>
  );
};