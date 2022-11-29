import React, { useState, useEffect } from "react";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import { IconButton, Chip, TextField, Autocomplete } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

interface FormProps {
  [x: string]: any;
  type?: string;
  values?: any;
  buttonText?: any;
  callBackFormValues?: (params: any) => any;
}

// DYNAMIC FORM
const DynamicForm = ({
  callBackFormValues,
  values = {},
  buttonText = false,
  type,
}: FormProps) => {
  const [formValues, setFormValues] = useState<any>([]);

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      setFormValues([
        {
          question: values.question,
          answer_type: values.answer_type,
          answer_options: values.answer_options,
        },
      ]);
    }
  }, [values]);

  if (type !== "view") {
    callBackFormValues(formValues);
  }

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      { question: "", answer_type: "text", answer_options: "" },
    ]);
  };
  /* istanbul ignore next */
  const handleChange = (index: number, e: any, chip_val?: any) => {
    /* istanbul ignore else */
    if (e.target.name == "answer_type" && e.target.value == "text") {
      const newFormValues = [...formValues];
      newFormValues[index]["answer_options"] = "";
      setFormValues(newFormValues);
    }
    /* istanbul ignore next */
    if (e.target.name == "answer_options") {
      const newFormValues = [...formValues];
      newFormValues[index][e.target.name] = chip_val;
      setFormValues(newFormValues);
    } else {
      const newFormValues = [...formValues];
      newFormValues[index][e.target.name] = e.target.value;
      setFormValues(newFormValues);
    }
  };

  const removeFormFields = (i: number) => {
    const newData = formValues.filter((val: any, index: number) => {
      return i != index;
    });
    setFormValues(newData);
  };
  return (
    <form data-testid="formData">
      {buttonText && (
        <Button
          data-testid="addField"
          onClick={() => addFormFields()}
          sx={{ marginBottom: 1 }}
          variant="outlined"
        >
          {buttonText}
        </Button>
      )}
      {formValues?.map(
        (
          element: {
            question: string;
            answer_type: string;
            answer_options: string[];
          },
          index
        ) => (
          <div className="form-inline" key={index}>
            <Paper
              elevation={3}
              sx={{ padding: "15px 11px", marginBottom: "15px" }}
            >
              {Object.keys(values).length === 0 && (
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <IconButton
                    size="small"
                    onClick={() => removeFormFields(index)}
                    sx={{
                      position: "relative",
                      left: "14px",
                      top: "-7px",
                    }}
                  >
                    <CancelIcon sx={{ color: "error.main" }} />
                  </IconButton>
                </Box>
              )}
              <TextField
                value={element.question}
                onChange={(e) => handleChange(index, e)}
                name="question"
                disabled={type === "view" ? true : false}
                label="Type your Question"
                multiline
                rows={4}
                sx={{ width: "100%" }}
              />

              <FormControl sx={{ mt: 2, mb: 2, minWidth: 220 }} size="small">
                <InputLabel id="answer_type">Choose answer type</InputLabel>
                <Select
                  inputProps={{ "data-testid": "answerType" }}
                  labelId="answer_type"
                  name="answer_type"
                  disabled={type === "view" ? true : false}
                  value={element.answer_type || ""}
                  label="Choose answer type"
                  onChange={(e) => handleChange(index, e)}
                >
                  {/* <MenuItem value="Checkbox">Checkbox</MenuItem> */}
                  <MenuItem value="text">Text</MenuItem>
                  {/* <MenuItem value="Radio button">Radio button</MenuItem> */}
                  <MenuItem value="list">List</MenuItem>
                </Select>
              </FormControl>

              {element.answer_type === "list" && (
                <Autocomplete
                  data-testid="answerOptions"
                  multiple
                  id="tags-filled"
                  options={[]}
                  disabled={type === "view" ? true : false}
                  defaultValue={element.answer_options || []}
                  // defaultValue={_.isEmpty(element.answer_options) ? []: [element.answer_options]  }
                  onChange={(_, val) => {
                    handleChange(index, _, val);
                  }}
                  freeSolo
                  renderTags={(value: string[][], getTagProps) =>
                    value.map((option: string[], index: number) => {
                      return (
                        <Chip
                          key={index}
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Question Options"
                      placeholder="Add a option by pressing enter after write it"
                      name="answer_options"
                    />
                  )}
                />
              )}
            </Paper>
          </div>
        )
      )}
    </form>
  );
};

export default DynamicForm;
