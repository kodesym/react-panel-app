import { usePanel } from "@/hooks/usePanel";
import { AppPanels } from "@/modules/common";
import { Button } from "@mui/material";


export const SearchFooter = () => {

  const { closePanel } = usePanel();
  const { openPanel } = usePanel(AppPanels.searchResults);

  const handleSearch = () => {
    openPanel();
  };

  return (
    <div className="text-sm text-gray-400">
      <Button variant="contained" size="small" onClick={handleSearch} color="primary">
        Search
      </Button>
      <Button variant="outlined" size="small" className="ml-2" onClick={closePanel} color="secondary">
        Close
      </Button>
    </div>
  );
};