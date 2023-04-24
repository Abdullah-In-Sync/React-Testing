import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Radio,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ViewProps {
  openResourceModal: boolean;
  setOpenResourceModal: any;
  popupData: any;
  onSearchData: any;
  handleMyResourceData: any;
  assigneHomeworkResources: any;
  handleMyFavouritesData: any;
}

const ResourcePopup: React.FC<ViewProps> = ({
  openResourceModal,
  setOpenResourceModal,
  popupData,
  onSearchData,
  handleMyResourceData,
  handleMyFavouritesData,
  assigneHomeworkResources,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectResourceId, setSelectResourceId] = useState(0);

  const handleClearInput = () => {
    setSearchValue("");
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearchData(event.target.value);
  };

  const handleMyRes = () => {
    handleMyResourceData(1);
  };

  const handleMyFav = () => {
    handleMyFavouritesData(1);
  };

  const setCheckBox = (data) => {
    setSelectResourceId(data._id);
  };
  return (
    <Box>
      <Modal
        open={openResourceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 600,
            position: "fixed",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: "5px 5px 0 0",

            boxShadow: 24,
          }}
        >
          <Box
            sx={{
              display: "flex",
              placeItems: "center",
              justifyContent: "space-between",
              p: 1,
              bgcolor: "background.paper",
              backgroundColor: "#6EC9DB",
              borderRadius: "5px 5px 0 0",
              paddingBottom: "13px",
            }}
          >
            <div></div>
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                display: "grid",
                placeItems: "center",
              }}
            >
              Select Resources
            </Typography>
            <IconButton
              style={{ color: "white" }}
              size="small"
              onClick={() => setOpenResourceModal(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            style={{
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="search"
              variant="outlined"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {searchValue ? (
                      <IconButton
                        aria-label="clear search input"
                        onClick={handleClearInput}
                      >
                        <CloseIcon />
                      </IconButton>
                    ) : null}
                  </InputAdornment>
                ),
              }}
              style={{ height: "10px", width: "300px" }}
            />

            <Box>
              <Button
                data-testid="editTemplateCancelButton"
                variant="contained"
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "#6BA08E",
                  marginRight: "10px",
                }}
                onClick={handleMyRes}
              >
                My Resource
              </Button>

              <Button
                data-testid="editTemplateCancelButton"
                variant="contained"
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "#6BA08E",
                }}
                onClick={handleMyFav}
              >
                My Favourites
              </Button>
            </Box>
          </Box>

          <Box sx={{ padding: "20px" }}>
            <Grid container spacing={3}>
              {popupData?.getPopupResourceList?.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent sx={{ overflowY: "auto" }}>
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            data-testid={`resource_checkbox${index}`}
                            control={<Radio />}
                            onChange={() => setCheckBox(data)}
                            label={""}
                          />
                        </FormGroup>
                      </FormControl>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#6EC9DB",
                          borderRadius: "3px 3px 3px 3px",
                          paddingBottom: "13px",
                        }}
                      >
                        <Tooltip title={data.resource_name} arrow>
                          <Typography
                            data-testid={`reource_description${index}`}
                            sx={{ color: "white", paddingTop: "10px" }}
                          >
                            {data.resource_name.length > 20
                              ? `${data.resource_name.substring(0, 20)}...`
                              : data.resource_name}
                          </Typography>
                        </Tooltip>
                      </Box>
                      <Tooltip title={data.resource_desc} arrow>
                        <Typography
                          variant="body2"
                          color="#30373E"
                          sx={{
                            pt: 1,
                            height: "200px",
                          }}
                        >
                          {data.resource_desc.length > 250
                            ? `${data.resource_desc.substring(0, 250)}...`
                            : data.resource_desc}
                        </Typography>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            <Button
              data-testid="assign_resource_button"
              variant="contained"
              style={{
                backgroundColor: "#6BA08E",
              }}
              onClick={() => assigneHomeworkResources(selectResourceId)}
            >
              Assign Resource
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ResourcePopup;
