import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const CardWrapper = styled(Card)(
  () => `
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
    height: 200px;
  `
);

const CardContentWrapper = styled(CardContent)(
  () => `
    padding-top:0
  `
);

export default function CardGenerator({ data, fields }) {
  return (
    <Grid container spacing={2} data-testid="cardWrapperContainer">
      {
        /* istanbul ignore next */
        data?.map((record, index) => {
          return (
            <Grid item xs={4} key={index} data-testid="card">
              <CardWrapper>
                <CardHeader
                  action={
                    <>
                      {fields?.map(
                        (field) =>
                          field.render &&
                          typeof field.render === "function" &&
                          field.key === "actions" &&
                          field.render(record[field.key], record)
                      )}
                    </>
                  }
                />
                <CardContentWrapper>
                  {
                    /* istanbul ignore next */
                    fields?.map(
                      (field) =>
                        field.render &&
                        typeof field.render === "function" &&
                        field.key === "resource_name" &&
                        field.render(record[field.key], record)
                    )
                  }

                  {fields?.map((field) => (
                    <Typography mt={1} variant="body2" color="text.secondary">
                      {field.key === "resource_desc" && record[field.key]}
                    </Typography>
                  ))}
                </CardContentWrapper>
              </CardWrapper>
            </Grid>
          );
        })
      }
    </Grid>
  );
}
