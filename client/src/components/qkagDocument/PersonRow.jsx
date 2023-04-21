import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const PersonRow = ({ role = 'male', imageSrc }) => {
    return (
        <ListItemButton sx={{ pl: 4 }}>
            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar
                        alt='Վազգեն Մանուկյան'
                        src={imageSrc || `../src/assets/${role}.png`}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary='Վազգեն Մանուկյան'
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.primary'
                            >
                                Նույնականացման քարտ ։
                            </Typography>
                            {' 010558633 012 2018-08-27 ; '}
                            <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.primary'
                            >
                                Հասցե։
                            </Typography>
                            {' AM ԵՐԵՎԱՆ ԵՐԵՎԱՆ ԲԱՇԻՆՋԱՂՅԱՆ Փ. Շ. 4'}
                        </>
                    }
                />
            </ListItem>
        </ListItemButton>
    );
};

export default PersonRow;
