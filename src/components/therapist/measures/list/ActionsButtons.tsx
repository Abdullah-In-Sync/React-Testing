import { Box, Fab } from "@mui/material";
import * as React from "react";

interface ViewProps {
    data: any;
    buttonClick: (value) => void;
}

const iconButtonsData = [
    {
        id: "edit",
        icon: require("@mui/icons-material/Edit").default,
    },
    {
        id: "delete",
        icon: require("@mui/icons-material/DeleteSharp").default,
    },
    {
        id: "share",
        icon: require("@mui/icons-material/Share").default,
    },
];

const ActionsButtons: React.FC<ViewProps> = ({ data, buttonClick }) => {
    const iconButtons = () => {
        return iconButtonsData.map((item, i) => {
            const { id, icon: Icon } = item;
            return (
                <Box
                    key={`iconButton_${id}_${i}`}
                    aria-label={`iconButton_${id}_${i}`}
                    data-testid={`iconButton_${id}_${i}`}
                    onClick={() => buttonClick({ ...data, ...{ pressedIconButton: id } })}
                    className="actionButton"
                >
                    <Icon />
                </Box>
            );
        });
    };

    return <>{iconButtons()}</>;
};

export default ActionsButtons;
