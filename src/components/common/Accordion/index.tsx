import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FC, ReactElement, cloneElement, useState } from "react";
import { useStyles } from "./accordionStyle";

type Props = {
  title?: string | ReactJSXElement;
  detail?: any;
  actionButtons?: any;
  marginBottom?: string;
  index?: number;
  handleToggleContent?: (v) => void;
};

export const Accordion: FC<Props> = ({
  title,
  detail,
  actionButtons,
  marginBottom,
  index = "",
  handleToggleContent,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    if (handleToggleContent && !isOpen)
      handleToggleContent(() => setIsOpen(true));
    else setIsOpen(!isOpen);
  };

  const detailElement = () => {
    return cloneElement(detail as ReactElement<any>, {
      toggleContent,
    });
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
          {typeof detail === "function"
            ? detail(toggleContent)
            : detailElement()}
        </Box>
      )}
    </Box>
  );
};
