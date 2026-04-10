import {
  Box,
  IconButton,
  Slide,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import HistoryToggleOffRoundedIcon from '@mui/icons-material/HistoryToggleOffRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { dismissSessionExpiredNotice } from '@/redux/auth/auth.slice';

export const SessionExpiredBanner = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector((state) => state.auth.sessionExpiredNotice);
  const isDark = theme.palette.mode === 'dark';

  return (
    <Slide direction="down" in={isVisible} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: (currentTheme) => currentTheme.zIndex.snackbar + 1,
          px: { xs: 1.5, sm: 2 },
          pt: { xs: 1.5, sm: 2 },
        }}
      >
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 960,
            borderRadius: '18px',
            border: `1px solid ${alpha(theme.palette.warning.main, isDark ? 0.32 : 0.22)}`,
            background: isDark
              ? `linear-gradient(135deg, ${alpha('#0f172a', 0.96)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.12)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
            boxShadow: isDark
              ? '0 18px 48px rgba(0, 0, 0, 0.35)'
              : '0 18px 42px rgba(15, 23, 42, 0.12)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              px: { xs: 2, sm: 2.5 },
              py: { xs: 1.5, sm: 1.75 },
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                color: theme.palette.warning.main,
                backgroundColor: alpha(theme.palette.warning.main, isDark ? 0.14 : 0.16),
                border: `1px solid ${alpha(theme.palette.warning.main, isDark ? 0.2 : 0.18)}`,
              }}
            >
              <HistoryToggleOffRoundedIcon fontSize="small" />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: '0.92rem', sm: '0.98rem' },
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  lineHeight: 1.35,
                }}
              >
                Your session has expired. Please sign in again.
              </Typography>
              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: { xs: '0.78rem', sm: '0.86rem' },
                  color: theme.palette.text.secondary,
                }}
              >
                For security, we signed you out and redirected you to login.
              </Typography>
            </Box>

            <IconButton
              aria-label="Dismiss session expired banner"
              onClick={() => dispatch(dismissSessionExpiredNotice())}
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                flexShrink: 0,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.text.primary, isDark ? 0.08 : 0.06),
                  color: theme.palette.text.primary,
                },
              }}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Slide>
  );
};
