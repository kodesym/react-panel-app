import { TextField } from "@mui/material";

interface Props {
  filters: { status: string; keyword: string };
}

export const SearchContent = ({ filters }: Props) => {
  return (
    <div>
      <TextField variant="outlined" color="secondary" />
    </div>
  );
};