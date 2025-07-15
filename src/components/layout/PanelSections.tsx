import { styled, type Theme } from "@mui/material";

const componentName = 'PanelSection';
const componentType = 'section';

const HeaderNav = styled(componentType, { name: componentName, slot: 'headerNav' })({});

const Header = styled(componentType, { name: componentName, slot: 'header' })({});

const Content = styled(componentType, { name: componentName, slot: 'content' })({});

const Footer = styled(componentType, { name: componentName, slot: 'footer' })({});

const FooterAction = styled(componentType, { name: componentName, slot: 'footerAction' })({});

interface PanelSectionProps {
  id: string;
  className?: string;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
}

export const HeaderNavSection: React.FC<PanelSectionProps> = ({id, children, className, sx }) => (
  <HeaderNav id={id} className={className} sx={sx}>
    {children}
  </HeaderNav>
);

export const HeaderSection: React.FC<PanelSectionProps> = ({id, children, className, sx }) => (
  <Header id={id} className={className} sx={sx}>
    {children}
  </Header>
);

export const ContentSection: React.FC<PanelSectionProps> = ({id, children, className, sx }) => (
  <Content id={id} className={className} sx={sx}>
    {children}
  </Content>
);

export const FooterSection: React.FC<PanelSectionProps> = ({id, children, className, sx }) => (
  <Footer id={id} className={className} sx={sx}>
    {children}
  </Footer>
);

export const FooterActionSection: React.FC<PanelSectionProps> = ({id, children, className, sx }) => (
  <FooterAction id={id} className={className} sx={sx}>
    {children}
  </FooterAction>
);