import { styled } from "@mui/material";
import { ContentSection, FooterActionSection, FooterSection, HeaderNavSection, HeaderSection } from "./PanelSections";

interface PanelSectionLayoutProps {
  id: string;
  headerNav?: React.ReactNode;
  header?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  footerAction?: React.ReactNode;
}

export interface PanelSectionProps {
  id: string;
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
    padding: theme.spacing(1),
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