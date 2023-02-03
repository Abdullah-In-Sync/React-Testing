import { Box } from "@material-ui/core";
import { FC, useState } from "react";
import { useStyles } from "./accordionStyle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  title?: string;
  detail?: any;
  actionButtons?: any;
};

export const Accordion: FC<Props> = ({ title, detail, actionButtons }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box className={classes.wrapper} data-testid={`list-tile`}>
      <Box
        className={classes.tileHeader}
        display="flex"
        justifyContent={"space-between"}
      >
        <span data-testid="name">{title}</span>
        <Box margin={0} padding={0} height="20px">
          {typeof actionButtons === "function"
            ? actionButtons(toggleContent)
            : actionButtons}
          {!isOpen ? (
            <AddIcon
              data-testid="toggleContent"
              className={classes.iconButton}
              onClick={toggleContent}
            />
          ) : (
            <RemoveIcon
              data-testid="toggleContent"
              className={classes.iconButton}
              onClick={toggleContent}
            />
          )}
        </Box>
      </Box>
      {isOpen && (
        <Box className={classes.contentWrapper}>
          {typeof detail === "function" ? detail(toggleContent) : detail}
        </Box>
      )}
    </Box>
  );
};
