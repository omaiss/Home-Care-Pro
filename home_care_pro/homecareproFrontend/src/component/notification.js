import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Notification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    "Notification 1",
    "Notification 2",
    "Notification 3",
    // Add more notifications here
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="notification-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<NotificationsIcon sx={{ color: 'purple' }} />}
        color="primary" // Set button color to purple
        sx={{ color: 'purple' }} // Set button text color to purple
      >
        <Typography variant="body1" sx={{ color: 'purple' }}>Notifications</Typography> {/* Set typography color to purple */}
        ({notifications.length})
      </Button>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: '300px', // Set minimum width
            maxHeight: '400px', // Set maximum height
          },
        }}
      >
        <Box sx={{ overflow: 'auto', height: '100%' }}>
          {notifications.map((notification, index) => (
            <MenuItem key={index}>{`${index + 1}. ${notification}`}</MenuItem>
          ))}
        </Box>
      </Menu>
    </div>
  );
}

export default Notification;
