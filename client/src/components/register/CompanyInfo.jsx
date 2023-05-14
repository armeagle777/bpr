import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import {
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import OwnerRow from './OwnerRow';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CompanyInfo = ({ company }) => {
    console.log('company:::::: ', company);

    const [expanded, setExpanded] = React.useState(false);

    const {
        name_am,
        name_en,
        name_ru,
        registered,
        company_type,
        inactive,
        cert_num,
        taxid,
        address,
        industry_code,
        executive,
        owners = [],
        sole_proprietor = {},
        capital,
        zcode,
        soc_num,
        reg_num,
    } = {
        ...company,
    };
    const { addr_descr, mobile, phone, website, email } = { ...address };
    const {
        address: bossAddress,
        full_name,
        id_info: { birth_date, passport_no, sex },
        ssn,
        exec_position,
    } = executive ? { ...executive } : { ...sole_proprietor };

    const {
        addr_descr: executiveAddr,
        email: executiveEmail,
        mobile: executiveMobile,
        phone: executivePhone,
    } = { ...bossAddress };

    const ownersArray = Array.isArray(owners) ? owners : Object.values(owners);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label='company'
                        alt={name_en}
                    >
                        {name_am[1]}
                    </Avatar>
                }
                action={
                    <Stack direction='row'>
                        <Typography
                            align='right'
                            variant='body2'
                            color='text.secondary'
                            fontWeight={700}
                            sx={{ pr: 1 }}
                        >
                            ՀՎՀՀ։ <br />
                            Կապիտալ:
                        </Typography>
                        <Typography
                            align='left'
                            variant='body2'
                            color='text.secondary'
                        >
                            {taxid} <br />
                            {capital ? Number(capital).toLocaleString() : ''} ֏
                        </Typography>
                    </Stack>
                }
                title={`${name_am} ${company_type} ${
                    name_en ? `| ${name_en}` : ''
                } ${name_ru ? `| ${name_ru}` : ''}`}
                subheader={registered}
            />
            <CardMedia
                component='img'
                height='194'
                image='/company.jpg'
                alt={name_am}
            />
            <CardContent>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography
                        align='left'
                        variant='body2'
                        color='text.secondary'
                        flexGrow={1}
                        fontWeight={700}
                        sx={{ pr: 1 }}
                    >
                        Հասցե։ <br />
                        էլ․ հասցե։ <br />
                        Հեռախոս։ <br />
                        Վեբ֊Կայք։ <br />
                        Կարգավիճակ։ <br />
                    </Typography>
                    <Typography
                        flexGrow={3}
                        variant='body2'
                        color='text.secondary'
                        sx={{ pl: 1 }}
                    >
                        {addr_descr} <br />
                        {email} <br />
                        {mobile || phone || ''} <br />
                        {website || ''} <br />
                        <span
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor:
                                    inactive === '1' ? 'red' : 'green',
                                display: 'inline-block',
                            }}
                        ></span>{' '}
                        <br />
                    </Typography>
                    <Typography
                        align='right'
                        variant='body2'
                        color='text.secondary'
                        flexGrow={1}
                        fontWeight={700}
                        sx={{ pr: 1 }}
                    >
                        Վկայական: <br />
                        Ոլորտ: <br />
                        reg_num: <br />
                        soc_num: <br />
                        zcode: <br />
                    </Typography>
                    <Typography
                        flexGrow={3}
                        variant='body2'
                        color='text.secondary'
                        sx={{ pl: 1 }}
                    >
                        {cert_num || ''} <br />
                        {industry_code || ''} <br />
                        {reg_num || ''} <br />
                        {soc_num || ''} <br />
                        {zcode || ''} <br />
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'>
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label='export'>
                    <PictureAsPdfOutlinedIcon color='error' />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography sx={{ mb: 0 }} paragraph>
                        {exec_position || 'Անհատ Ձեռնարկատեր'}:
                    </Typography>
                    <Divider
                        variant='fullWidth'
                        component='hr'
                        color='secondary'
                    />
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                        }}
                    >
                        <ListItem alignItems='flex-start'>
                            <ListItemAvatar>
                                <Avatar
                                    alt={full_name}
                                    src={
                                        sex === 'Ի'
                                            ? '/female.png'
                                            : '/male.png'
                                    }
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={full_name}
                                secondary={
                                    <Stack direction='row'>
                                        <Typography
                                            variant='body2'
                                            color='text.primary'
                                            align='right'
                                            fontWeight={700}
                                        >
                                            Հասցե {' - '} <br />
                                            Էլ․ փոստ {' - '} <br />
                                            Հեռախոս {' - '}
                                        </Typography>
                                        <Typography
                                            variant='secondary'
                                            color='text.primary'
                                            sx={{ pl: 1 }}
                                            flexGrow={2}
                                        >
                                            {executiveAddr} <br />
                                            {executiveEmail} <br />
                                            {executiveMobile || executivePhone}
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='text.primary'
                                            align='right'
                                            flexGrow={1}
                                            fontWeight={700}
                                        >
                                            ՀԾՀ {' - '} <br />
                                            Անձնագիր {' - '} <br />
                                            Ծննդ․ ա/թ {' - '}
                                        </Typography>
                                        <Typography
                                            variant='secondary'
                                            color='text.primary'
                                            sx={{ pl: 1 }}
                                            flexGrow={2}
                                        >
                                            {ssn} <br />
                                            {passport_no} <br />
                                            {birth_date}
                                        </Typography>
                                    </Stack>
                                }
                            />
                        </ListItem>
                    </List>
                    <Typography sx={{ mb: 0, mt: 2 }} paragraph>
                        Բաժնետերեր:
                    </Typography>
                    <Divider
                        variant='fullWidth'
                        component='hr'
                        color='secondary'
                    />

                    {ownersArray.length === 0
                        ? 'Բաժնետերեր չկան գրանցված'
                        : ownersArray.map((own, index) => (
                              <>
                                  <OwnerRow ownerInfo={own} key={own.id_num} />
                                  {index !== ownersArray.length - 1 && (
                                      <Divider variant='inset' component='hr' />
                                  )}
                              </>
                          ))}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default CompanyInfo;
