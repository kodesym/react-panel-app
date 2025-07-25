import { styled } from "@mui/material";

interface PanelSectionLayoutProps {
  id: string;
  headerNav?: React.ReactNode;
  header?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  footerAction?: React.ReactNode;
}

interface PanelSectionProps {
  id: string;
  className?: string;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
}

const Root = styled('div', { name: 'PanelSectionLayout' })(({ theme }) => ({
  display: 'flex', 
  flexDirection: 'column', 
  height: '100%',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  '& .panel-shell-content': {},
  '& .header-nav': {
    minHeight: '64px',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.background.border}`,
  },
  '& .header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.background.border}`  ,
  },
  '& .content': {
    flexGrow: 1,
    overflowY: 'auto',
    padding: theme.spacing(2),
  },
  '& .footer': {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.background.border}`,
  },
  '& .footer-action': {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.background.border}`,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const sectionName = 'PanelSection';
const sectionType = 'section';

const HeaderNav = styled(sectionType, { name: sectionName, slot: 'headerNav' })({});
const Header = styled(sectionType, { name: sectionName, slot: 'header' })({});
const Content = styled(sectionType, { name: sectionName, slot: 'content' })({});
const Footer = styled(sectionType, { name: sectionName, slot: 'footer' })({});
const FooterAction = styled(sectionType, { name: sectionName, slot: 'footerAction' })({});

const Section = (Comp: React.ComponentType<PanelSectionProps>): React.FC<PanelSectionProps> => (({id, children, className, sx }) => (
  <Comp id={id} className={className} sx={sx}>
    {children}
  </Comp>
));

const HeaderNavSection = Section(HeaderNav);
const HeaderSection = Section(Header);
const ContentSection = Section(Content);
const FooterSection = Section(Footer);
const FooterActionSection = Section(FooterAction);

export const PanelSectionLayout = ({
  id,
  headerNav,
  header,
  content,
  footer,
  footerAction,
}: PanelSectionLayoutProps) => {
  return (
    <Root className="panel-shell-content">
      {headerNav && <HeaderNavSection id={`${id}-headerNav`} className="header-nav">{headerNav}</HeaderNavSection>}
      {header && <HeaderSection id={`${id}-header`} className="header">{header}</HeaderSection>}
      <ContentSection id={`${id}-content`} className="content">{content}</ContentSection>
      {footer && <FooterSection id={`${id}-footer`} className="footer">{footer}</FooterSection>}
      {footerAction && <FooterActionSection id={`${id}-footerAction"`} className="footer-action">{footerAction}</FooterActionSection>}
    </Root>
  );
};