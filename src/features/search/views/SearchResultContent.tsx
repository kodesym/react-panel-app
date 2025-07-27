import { usePanel } from "@/hooks/usePanel";
import { AppPanels } from "@/features";
import { Button } from "@mui/material";

interface Props {
  filters: { status: string; keyword: string };
}

export const SearchResultContent = ({ filters }: Props) => {
  const { closePanel } = usePanel(AppPanels.searchResults);
  return (
    <div className="flex gap-2 items-center">
      <div>{filters.keyword}</div>
      <Button variant="outlined" size="small" color="primary" onClick={closePanel}>
        Close
      </Button>
    </div>
  );
};