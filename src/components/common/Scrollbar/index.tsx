import { FC, ReactNode } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Box, useTheme } from "@mui/material";

interface ScrollbarProps {
  className?: string;
  children?: ReactNode;
}

const Scrollbar: FC<ScrollbarProps> = ({ children, ...rest }) => {
  const theme = useTheme();

  return (
    <Scrollbars
      data-testid="scrollBar"
      autoHide
      universal
      renderThumbVertical={() => {
        return (
          <Box
            sx={{
              width: 5,
              background: `${theme.palette.secondary.main}`,
              borderRadius: "10px",
              transition: `${theme.transitions.create(["background"])}`,
              "&:hover": {
                background: `${theme.palette.secondary.main}`,
              },
            }}
          />
        );
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
