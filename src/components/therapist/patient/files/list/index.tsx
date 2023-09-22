import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ContentHeader from "../../../../common/ContentHeader";

interface ViewProps {
  fileListData?: any;
  onSearchData?: any;
  handleFileUpload?: any;
  handleShare?: any;
  handleDelete?: any;
}

const TherapistFileList: React.FC<ViewProps> = ({
  fileListData,
  onSearchData,
  handleFileUpload,
  handleShare,
  handleDelete,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCheckBoxId, setSelectedCheckBox] = useState(0);
  console.log("Koca: selectedCheckBoxId ", selectedCheckBoxId);

  /* istanbul ignore next */
  const handleClearInput = () => {
    setSearchValue("");
    onSearchData("");
  };

  /* istanbul ignore next */
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearchData(event.target.value);
  };

  /* istanbul ignore next */
  const setCheckBox = (data) => {
    setSelectedCheckBox(data._id);
  };
  /* istanbul ignore next */
  const openInNewTab = (url) => {
    /* istanbul ignore next */
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    /* istanbul ignore next */
    if (newWindow) newWindow.opener = null;
  };
  return (
    <Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <ContentHeader title="Files" />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TextField
            id="search"
            variant="outlined"
            size="small"
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
                  {
                    /* istanbul ignore next */
                    searchValue ? (
                      <IconButton
                        aria-label="clear search input"
                        onClick={handleClearInput}
                      >
                        <CloseIcon />
                      </IconButton>
                    ) : null
                  }
                </InputAdornment>
              ),
            }}
            style={{ width: "250px" }}
          />

          <IconButton
            style={{
              borderRadius: "50%",
              backgroundColor: "#6EC9DB",
              marginLeft: "10px",
            }}
            size="small"
            onClick={handleFileUpload}
          >
            <FileUploadIcon
              style={{
                color: "#ffff",
              }}
              data-testid="upload_file_button"
            />
          </IconButton>

          <IconButton
            style={{
              borderRadius: "50%",
              backgroundColor: "#6EC9DB",
              marginLeft: "10px",
            }}
            size="small"
            onClick={handleShare}
          >
            <ShareIcon
              style={{
                color: "#ffff",
              }}
              data-testid="share-agenda-button"
            />
          </IconButton>
          <IconButton
            style={{
              borderRadius: "50%",
              backgroundColor: "#6EC9DB",
              marginLeft: "10px",
            }}
            size="small"
            onClick={handleDelete}
          >
            <DeleteIcon
              style={{
                color: "#ffff",
              }}
              data-testid="share-agenda-button"
            />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
          {
            /* istanbul ignore next */
            fileListData?.getPatientFileListByTherapist?.map((data, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    border: "1px solid #cecece",
                    borderRadius: "3px",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto auto",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      sx={{ gridColumn: "1", m: 0 }}
                      data-testid={`resource_checkbox${index}`}
                      control={<Checkbox />}
                      onChange={() => setCheckBox(data)}
                      label=""
                    />

                    <IconButton
                      style={{ borderRadius: "50%", border: "1px solid #000" }}
                      size="small"
                      sx={{ gridColumn: "2", m: 1 }}
                    >
                      <DownloadIcon
                        style={{ fontSize: 14 }}
                        data-testid="share-agenda-button"
                      />
                    </IconButton>

                    <IconButton
                      style={{ borderRadius: "50%", border: "1px solid #000" }}
                      size="small"
                      sx={{ gridColumn: "3", m: 1 }}
                    >
                      <EditIcon
                        style={{ fontSize: 14 }}
                        data-testid="share-agenda-button"
                      />
                    </IconButton>
                  </Box>

                  <Box
                    style={{
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      paddingBottom: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        bgcolor: "#6EC9DB",
                        borderRadius: "3px 3px 3px 3px",
                        paddingBottom: "13px",
                        cursor: "pointer",
                      }}
                      /* istanbul ignore next */
                      onClick={() => openInNewTab(data.file_url)}
                    >
                      <Tooltip title={data.title} arrow={true}>
                        <Typography
                          data-testid={`reource_description${index}`}
                          sx={{ color: "white", paddingTop: "10px" }}
                        >
                          {data.title.length > 20
                            ? `${data.title.substring(0, 20)}...`
                            : data.title}
                        </Typography>
                      </Tooltip>
                    </Box>
                    <Tooltip title={data?.description} arrow>
                      <Box>
                        <Typography>
                          File uploaded on: {data.updated_date.slice(0, 10)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="#30373E"
                          sx={{
                            pt: 1,
                            height: "200px",
                          }}
                        >
                          {data.description.length > 250
                            ? `${data.description.substring(0, 250)}...`
                            : data.description}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Box>
  );
};

export default TherapistFileList;
