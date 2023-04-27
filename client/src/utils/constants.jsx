import MarriageIcon from '@mui/icons-material/VolunteerActivism';
import BirthIcon from '@mui/icons-material/Cake';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

export const documentNames = {
    marriage: {
        name: 'Ամուսնության Վկայական',
        icon: <MarriageIcon color='primary' />,
    },
    birth: { name: 'Ծննդյան Վկայական', icon: <BirthIcon color='primary' /> },
    divorce: {
        name: 'Ամուսնալուծության Վկայական',
        icon: <HeartBrokenIcon color='primary' />,
    },
    death: {
        name: 'Մահվան Վկայական',
        icon: <HeartBrokenIcon color='primary' />,
    },
    adoption: {
        name: 'Որդեգրման վկայական',
        icon: <HeartBrokenIcon color='primary' />,
    },
    paternity: {
        name: 'Հայրության ճանաչման Վկայական',
        icon: <HeartBrokenIcon color='primary' />,
    },
    chname: {
        name: 'Անվանափոխության Վկայական',
        icon: <HeartBrokenIcon color='primary' />,
    },
};

export const qkagDocumentTypes = {
    p: 'Անձնագիր',
    id: 'Նույնականացման քարտ',
    b: 'Ծննդյան վկայական',
    fp: 'Արտասահմանյան անձնագիր',
    fb: 'Արտասահմանյան ծննդյան վկայական',
    f9: 'Ձեւ 9 տեղեկանք',
    f1: 'Ձեւ 1 փաստաթուղթ',
    cd: 'Կոնվենցիոն ՃՓ',
    tid: 'Ժամանակավոր անձը հաստատող փ/թ',
    rc: 'Կացության քարտ',
    ic: 'Անձը հաստատող վկայական',
    mc: 'Զինգրքույկ',
    pr: 'Տեղեկանք ԱՎՎ ԱԲ',
    td: 'ԱՎՎ ՃՓ',
    cr: 'Վերադարձի վկայական',
    bio: 'Բիոմետրիկ անձնագիր',
    ref: 'Փախստականի վկայական',
    oth: 'Այլ',
};

export const deathReasons = {
    1: 'Հիվանդությունից',
    2: 'Արտադրության հետ չկապված դժբախտ պատահարից',
    3: 'Արտադրության հետ կապված դժբախտ պատահարից',
    4: 'Սպանությունից',
    5: 'Ինքնասպանությունից',
    6: 'Մահվան բնույթն անորոշ է',
    7: 'Ռազմական իրադարձությունների հետևանքով',
    8: 'Ահաբեկչական գործողությունների հետևանքով',
};

export const bprDocumentTypes = {
    ID_CARD: 'ID քարտ',
    NON_BIOMETRIC_PASSPORT: 'ՀՀ անձնագիր',
    BIOMETRIC_PASSPORT: 'Կենսաչափ․ անձնագիր',
    BIRTH_CERTIFICATE: 'Ծննդյան․ վկ․',
    TRAVEL_DOCUMENT: 'Ճամփորդական փ/թ',
    FOREIGN_PASSPORT: 'Օտարերկրյա անձ․',
    RESIDENCE_CARD: 'Կացության քարտ',
    OTHER: 'Այլ',
};

export const perPageCount = 10;
