import { usePanel } from "@/hooks/usePanel";
import { IconButton, styled } from "@mui/material";
import BackIcon from '@mui/icons-material/ArrowBack';
import ForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/CloseOutlined'

const Root = styled('div',{name:'PanelNavHeader'})(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: `1fr 1fr 1fr 1fr`,
  '& .btns': {
    borderRadius: '50%',
    height: '42px',
    width: '42px',
  }
}));

export const PanelNavHeader = () => {
  const { closePanel, goBack, goForward, canGoBack, canGoForward } = usePanel();

  return (
    <Root>
      <IconButton className="btns" color="primary" title="Back" onClick={goBack} disabled={!canGoBack}>
        <BackIcon />
      </IconButton>
      <IconButton className="btns" color="primary" title="Forward" onClick={goForward} disabled={!canGoForward}>
        <ForwardIcon />
      </IconButton>
      <IconButton className="btns" color="primary" title="Close" onClick={closePanel}>
        <CloseIcon />
      </IconButton>
    </Root>
  );
};