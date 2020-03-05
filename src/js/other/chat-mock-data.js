const p1 = '../img/chat/avatars/1.png';
const p2 = '../img/chat/avatars/2.png';
const p3 = '../img/chat/avatars/3.png';
const p4 = '../img/chat/avatars/5.png';
const p7 = '../img/chat/avatars/7.png';

const awesome_image = '../img/chat/awesome-meme.jpg';

function randomXToY(minVal,maxVal)
{
    let randVal = minVal+(Math.random()*(maxVal-minVal));
    return Math.round(randVal);
}

let users =
    [
    {
        id: 1,
        name: 'Jane',
        surname: 'Rowlis',
        username: 'J_Rowlis',
        jobtitle: 'CEO & Founder',
        tel: '+375 29 243 14 12',
        avatar: p1,
        isOnline: true
    },
    {
        id: 2,
        name: 'Sam',
        surname: 'Fisher',
        username: 'S_Fisher',
        jobtitle: 'Web Developer',
        tel: '+375 29 379 56 67',
        avatar: p2,
        isOnline: false,
    },
    {
        id: 3,
        name: 'Jane',
        surname: 'Bredly',
        username: 'J_Bredly',
        jobtitle: 'Web Developer',
        tel: '+375 29 121 24 34',
        avatar: p3,
        isOnline: false,
    },
    {
        id: 4,
        name: 'John',
        surname: 'Hubbard',
        username: 'J_Hubbard',
        jobtitle: 'Operations manager',
        tel: '+375 29 230 94 51',
        avatar: p7,
        isOnline: true
    },
    {
        id: 5,
        name: 'Darrell',
        surname: 'Jackson',
        username: 'D_Jackson',
        jobtitle: 'Office manager',
        tel: '+375 29 404 64 56',
        avatar: p4,
        isOnline: true
    }
    ];

