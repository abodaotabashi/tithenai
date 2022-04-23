import React from "react";
import PropTypes from "prop-types";
import { Paper, Box } from "@mui/material";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            style={{alignItems: "center", justifyContent: "center"}}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={2}>
                    <Paper elevation={8} style={{ width: "98%", padding: "1rem 1rem 1rem 1rem", marginBottom: 0 }}>
                        {children}
                    </Paper>
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TabPanel;

export function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}