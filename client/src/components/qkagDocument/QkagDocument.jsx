import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import PersonRow from './PersonRow';
import { documentNames } from '../../utils/constants';

const QkagDocument = ({ type }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%' }}
            component='nav'
            aria-labelledby='marriage-document'
            subheader={
                <ListSubheader component='div' id='marriage-document'>
                    {documentNames[type]['name']}
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>{documentNames[type]['icon']}</ListItemIcon>
                <ListItemText primary='ԱԲ337854 | 2014-05-12' />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <PersonRow role='male' />
                    <PersonRow role='female' />
                    {type === 'birth' && <PersonRow role='baby' />}
                </List>
            </Collapse>
        </List>
    );
};

export default QkagDocument;
