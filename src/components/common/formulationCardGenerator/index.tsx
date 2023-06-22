import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const CardWrapper = styled(Card)(
  () => `
    border: 1px solid #6EC9DB;
    border-radius: 10px;
    box-shadow: none;
    height: 200px;
    padding-bottom: 10px;
  `
);

const CardContentTitleWrapper = styled(CardContent)(
  () => `
    bax-shadow: none;
    padding: 0px
  `
);
const CardContentDescriptionWrapper = styled(CardContent)(
  () => `
   padding: 0px 7px 0px 7px;
    `
);

export default function FormulationCardGenerator({ data, fields }) {
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
                <CardContentTitleWrapper>
                  {
                    /* istanbul ignore next */
                    fields?.map(
                      (field) =>
                        field.render &&
                        typeof field.render === "function" &&
                        field.key === "formulation_name" &&
                        field.render(record[field.key], record)
                    )
                  }
                </CardContentTitleWrapper>
                <CardContentDescriptionWrapper>
                  {fields?.map((field) => (
                    <Typography
                      className={`text-ellipsis`}
                      mt={1.3}
                      variant="body2"
                      color="text.secondary"
                    >
                      {field.key === "formulation_desc" && record[field.key]}
                    </Typography>
                  ))}
                </CardContentDescriptionWrapper>
              </CardWrapper>
            </Grid>
          );
        })
      }
    </Grid>
  );
}
