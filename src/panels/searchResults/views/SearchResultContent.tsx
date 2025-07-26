import { usePanel } from "@/hooks/usePanel";
import { Button } from "@mui/material";


interface Props {
  filters: { status: string; keyword: string };
}

export const SearchResultContent = ({ filters }: Props) => {
  const { closePanel } = usePanel();
  return (
    <div>
      <Button variant="outlined" size="small" color="primary" onClick={closePanel}>
        Close
      </Button>
    </div>
  );
};