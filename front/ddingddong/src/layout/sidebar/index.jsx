import * as React from 'react';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import Typography from '@mui/material/Typography';
import { makeStyles, ThemeProvider, createTheme, classes } from '@mui/material/styles';


const SideBar = () => {
    return (
        <Box style={{border: '1px solid rgba(0, 0, 0, 0.3)', width: '100%'}}>
        <List
        sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}
        aria-label="contacts"
        >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ManageAccountsIcon sx={{fontSize: 60}} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography type="body2" style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 25 }}>원생관리</Typography>}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
          <ListItemIcon>
              <LibraryBooksIcon sx={{fontSize: 60}} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography type="body2" style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 25 }}>공지사항</Typography>}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
          <ListItemIcon>
              <WysiwygIcon sx={{fontSize: 60}} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography type="body2" style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 25 }}>알림장</Typography>}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
          <ListItemIcon>
              <LocalDiningIcon sx={{fontSize: 60}} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography type="body2" style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 25 }}>식단관리</Typography>}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
          <ListItemIcon>
              <GroupRemoveIcon sx={{fontSize: 60}} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography type="body2" style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 25 }}>반 관리</Typography>}/>
          </ListItemButton>
        </ListItem>
      </List>
      </Box>
    );
};

export default SideBar;