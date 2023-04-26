import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useState } from 'react';

import { documentNames } from '../../utils/constants';
import { formatDates } from '../../utils/helperFunctions';
import PersonRow from './PersonRow';

const QkagDocument = ({ document, targetSsn }) => {
    const [open, setOpen] = useState(false);
    const {
        type,
        office_name,
        cert_num,
        cert_num2,
        cert_date,
        person,
        person2,
        child,
        children,
    } = document;

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%' }}
            component='nav'
            aria-labelledby={type}
            subheader={
                <ListSubheader component='div' id={type}>
                    {documentNames[type]['name']}
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>{documentNames[type]['icon']}</ListItemIcon>
                <ListItemText
                    primary={`${cert_num}${
                        cert_num2 ? `-${cert_num2}` : ''
                    } | ${formatDates(cert_date)} | ${office_name}`}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <PersonRow
                        role='male'
                        person={person}
                        targetSsn={targetSsn}
                    />
                    <PersonRow
                        role='female'
                        person={person2}
                        targetSsn={targetSsn}
                    />
                    {child && (
                        <PersonRow
                            role='baby'
                            person={child}
                            targetSsn={targetSsn}
                        />
                    )}
                </List>
            </Collapse>
        </List>
    );
};

export default QkagDocument;
