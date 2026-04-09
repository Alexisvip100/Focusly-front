import { Box, type SvgIconProps } from '@mui/material';

interface FocuslyLogoProps extends SvgIconProps {
    size?: number;
}

export const FocuslyLogo = ({ size = 24, sx }: FocuslyLogoProps) => {
    return (
        <Box
            sx={{
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...sx,
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#paint0_linear)" />
                <path
                    d="M7 12L10.5 15.5L17 9"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear"
                        x1="2"
                        y1="2"
                        x2="22"
                        y2="22"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#2563EB" />
                    </linearGradient>
                </defs>
            </svg>
        </Box>
    );
};
