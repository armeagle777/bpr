import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const DocumentNotFound = () => {
    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component='img'
                sx={{ width: 151 }}
                image='/no_document.png'
                alt='No document found'
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component='div' variant='h6'>
                        Տվյալ անձի վերաբերյալ ՔԿԱԳ փաստաթղթեր չեն գտնվել
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default DocumentNotFound;
