import { FC, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

export interface MenuItem {
  key: string;
  value: string;
}

export interface ActionMenuProps {
  options: Array<MenuItem>;
  onChange?: (menu) => void;
  icon?: any;
}

export const ActionMenu: FC<ActionMenuProps> = ({
  options,
  onChange,
  icon,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event, "event");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        data-testid={`action-menu-icon`}
        onClick={handleClick}
      >
        {icon || <MoreVertIcon />}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.key}
            data-testid={`${option.key}`}
            onClick={
              onChange
                ? () => {
                    onChange?.(option);
                    handleClose();
                  }
                : null
            }
          >
            {option.value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
