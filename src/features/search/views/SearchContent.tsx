import { TextField } from "@mui/material";

interface Props {
  filters: { status: string; keyword: string };
}

export const SearchContent = ({ filters }: Props) => {
  return (
    <div>
      <div>{filters.keyword}</div>
      <TextField variant="outlined" color="secondary" />
    </div>
  );
};