import { Typography } from "@material-ui/core";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
} from "@mui/material";
import React from "react";
import { DetailObjectTypes } from "./therapistHomeData";

interface ViewProps {
  detail?: DetailObjectTypes[];
}

const TherapistHomeCard: React.FC<ViewProps> = ({ detail }) => {
  const cards = () => detail.map((item) => card(item));
  const card = ({ id, title, icon: Icon, description }: any) => {
    return (
      <Grid
        key={id}
        data-testid={`cardBox_${id}`}
        item
        xs={12}
        sm={6}
        md={4}
        className="gridItem"
      >
        <Stack className="cardWrapper">
          <Card variant="outlined" className="card">
            <CardHeader
              avatar={
                <Avatar className="headerAvatar">
                  <Icon />
                </Avatar>
              }
              title={<Typography variant="subtitle1">{title}</Typography>}
              className="cardHeader"
            />
            <CardContent>
              <Box className="cardRow2">
                <Typography>{description}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    );
  };
  return (
    <>
      <Grid mt={2} container className="gridContainer">
        {cards()}
      </Grid>
    </>
  );
};

export default TherapistHomeCard;
