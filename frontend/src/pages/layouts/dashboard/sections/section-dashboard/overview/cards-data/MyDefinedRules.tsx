import { useTheme } from '@mui/material/styles';
import { Card, List, ListItem, Typography, ListItemText } from '@mui/material';

import type { TradingRule } from './MyAccountsDetails';

interface MyDefinedRulesProps {
  tradingRules: TradingRule[];
}

const CardWrapper = ({ theme }: { theme: any }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
});

export default function MyDefinedRules({ tradingRules }: MyDefinedRulesProps) {
  const theme = useTheme();

  return (
    <Card sx={{ ...CardWrapper({ theme }), height: '100%', padding: '16px' }}>
      {tradingRules.length > 0 ? (
        <div style={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Trading Rules
          </Typography>
          <List>
            {tradingRules.map((rule, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={rule.key}
                  secondary={rule.value}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No trading rules available. Please select a trading type.
        </Typography>
      )}
    </Card>
  );
}