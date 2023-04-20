import { Box } from "@material-ui/core";
import { FC, useState } from "react";
import { useStyles } from "./accordionStyle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

type Props = {
  title?: string | ReactJSXElement;
  detail?: any;
  actionButtons?: any;
  marginBottom?: string;
  index?: number;
};

export const Accordion: FC<Props> = ({
  title,
  detail,
  actionButtons,
  marginBottom,
  index = "",
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      className={classes.wrapper}
      data-testid={`list-tile`}
      marginBottom={marginBottom}
    >
      <Box
        className={classes.tileHeader}
        display="flex"
        justifyContent={"space-between"}
      >
        {typeof title === "string" ? (
          <span data-testid="name">{title}</span>
        ) : (
          title
        )}
        <Box margin={0} padding={0} height="20px" className="actionWrapper">
          {typeof actionButtons === "function"
            ? actionButtons(toggleContent)
            : actionButtons}
          {!isOpen ? (
            <AddIcon
              data-testid={`toggleContent${index}`}
              className={classes.iconButton}
              onClick={toggleContent}
            />
          ) : (
            <RemoveIcon
              data-testid={`toggleContent${index}`}
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
