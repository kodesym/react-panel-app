import { Box, styled, type BoxProps } from '@mui/material';
import PanelRenderer from './PanelRenderer';
import Sidebar from './Sidebar';
import type { Anchor } from '@/types/panels';
import { SidebarWidth } from '@/utils/panelUtils';

const Root = styled(Box, {name: 'MainLayout'})(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative',
  height: '100dvh',
}));

interface MainLayoutProps extends  BoxProps {
  anchors: Anchor[];
}

const MainLayoutContent = styled('div', {
  name: 'MainLayout', 
  slot: 'content', 
  shouldForwardProp: (prop: string) => !['anchors'].includes(prop) 
})<MainLayoutProps>(({theme, anchors}) => ({
  flex: 1, 
  position: 'relative', 
  overflow: 'hidden',
  ...(anchors.includes('top') && { marginTop: `${SidebarWidth}px` }),
  ...(anchors.includes('bottom') && { marginBottom: `${SidebarWidth}px` }),
  ...(anchors.includes('left') && { marginLeft: `${SidebarWidth}px` }),
  ...(anchors.includes('right') && { marginRight: `${SidebarWidth}px` }),
}));

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Root>
      <Sidebar anchor="left" />
      <MainLayoutContent anchors={["left", "right"]}>
        <PanelRenderer /> {/* Panels slide over this */}
        {children} {/* <-- main content */}
      </MainLayoutContent>
      <Sidebar anchor="right" />
    </Root>
  );
};

export default MainLayout;