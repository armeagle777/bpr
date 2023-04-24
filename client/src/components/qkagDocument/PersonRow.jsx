import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { qkagDocumentTypes } from '../../utils/constants';
import { formatDates } from '../../utils/helperFunctions';

const PersonRow = ({ role, person, imageSrc }) => {
    const {
        psn,
        id_type,
        id_number,
        citizenship,
        id_department,
        id_issue_date,
        id_expirey_date,
        new_last_name,
        base_info: { name, last_name, fathers_name, birth_date },
        resident: { region, community, street, house_type, house },
    } = person;
    return (
        <ListItemButton sx={{ pl: 4 }}>
            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar
                        alt={`${name} ${last_name} ${
                            new_last_name ? ` (${new_last_name})` : ''
                        }`}
                        src={imageSrc || `../src/assets/${role}.png`}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={`${last_name} ${name}${
                        fathers_name ? ` ${fathers_name}` : ''
                    }`}
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.primary'
                            >
                                {id_type
                                    ? `${qkagDocumentTypes[id_type]} ։`
                                    : ''}
                            </Typography>
                            {id_number
                                ? `${id_number} ${id_department} ${formatDates(
                                      id_issue_date
                                  )} ; `
                                : ''}
                            <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.primary'
                            >
                                Հասցե։
                            </Typography>
                            {` ${citizenship} ${
                                region === community
                                    ? region
                                    : `${region}, ${community}`
                            } ${street} ${house_type} ${house}`}
                        </>
                    }
                />
            </ListItem>
        </ListItemButton>
    );
};

export default PersonRow;
