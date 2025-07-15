import { Box, styled } from '@mui/material';
import PanelRenderer from './PanelRenderer';
import Sidebar from './Sidebar';

const Root = styled(Box, {name: 'MainLayout'})(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative',
  height: '100vh',
}));

const MainLayoutContent = styled('div', {name: 'MainLayout', slot: 'content' })({
  flex: 1, 
  position: 'relative', 
  overflow: 'hidden',
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Root>
      <Sidebar anchor="left" />
      <MainLayoutContent>
        {children} {/* <-- main content */}
        <PanelRenderer /> {/* Panels slide over this */}
      </MainLayoutContent>
      <Sidebar anchor="right" />
    </Root>
  );
};

export default MainLayout;