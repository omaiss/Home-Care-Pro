import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Notification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([null]);

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
        color="primary" 
        sx={{ color: 'purple' }}
      >
        <Typography variant="body1" sx={{ color: 'purple' }}>Notifications</Typography>
        ({notifications.length})
      </Button>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
