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

const chats = [
    {
        id: 1,
        name: 'Light Blue Group',
        users: [2,3,4,5,1,6],
        createdBy: 3,
        messages: [
            {
                id: 1,
                userId: 6,
                text: 'Hello, @John. Can you help me with Light Blue project? I cannot understand how it works.'
            },
            {
                id: 2,
                userId: 4,
                text: 'Hi, @Darrell. It\'s too easy. I can explain it too you if you have some minutes.'
            },
            {
                id: 3,
                userId: 5,
                text: '',
                attachments: [
                    {
                        id: 1,
                        type: 'image',
                        src: awesome_image
                    }
                ]
            },
            {
                id: 4,
                userId: 1,
                text: 'Guys did you see the new update of the Sing App from our competitors?',
                timestamp: moment().subtract(2, 'm')
            }
        ]
    },
    {
        id: 2,
        name: 'React Native',
        users: [1, 4, 6],
        createdBy: 4,
        messages: [
            {
                id: 1,
                userId: 6,
                text: 'Hello, @John. Can you help me with Light Blue project? I cannot understand how it works.'
            },
            {
                id: 2,
                userId: 4,
                text: 'Hi, @Darrell. It\'s too easy. I can explain it too you if you have some minutes.'
            }
        ]
    },
    {
        id: 3,
        name: 'Common',
        users: [1, 4, 6],
        createdBy: 6,
        messages: [
            {
                id: 1,
                userId: 6,
                text: 'Hello, @John. Can you help me with Light Blue project? I cannot understand how it works.'
            },
            {
                id: 2,
                userId: 4,
                text: 'Hi, @Darrell. It\'s too easy. I can explain it too you if you have some minutes.'
            }
        ]
    },
    {
        id: 4,
        users: [1, 2],
        messages: [
            {
                id: 1,
                userId: 1,
                text: 'How can we help? We’re here for you!'
            },
            {
                id: 2,
                userId: 2,
                text: 'Hey John, I am looking for the best admin template.\n' +
                    'Could you help me to find it out?'
            },
            {
                id: 3,
                userId: 2,
                text: 'It should be Bootstrap 4 compatible'
            },
            {
                id: 4,
                userId: 1,
                text: 'Absolutely!'
            },
            {
                id: 5,
                userId: 1,
                text: 'Modern admin is the responsive bootstrap 4 admin template!'
            }
        ]
    },
    {
        id: 5,
        users: [1, 3],
        messages: [
            {
                id: 1,
                userId: 3,
                text: 'If it takes long you can mail m...'
            }
        ]
    },
    {
        id: 6,
        users: [1, 4],
        messages: [
            {
                id: 1,
                userId: 4,
                text: 'If it takes long you can mail m...'
            }
        ]
    },
    {
        id: 7,
        users: [1, 5],
        messages: [
            {
                id: 1,
                userId: 5,
                text: 'If it takes long you can mail m...'
            }
        ]
    },
    {
        id: 8,
        users: [1, 6],
        messages: [
            {
                id: 1,
                userId: 5,
                text: 'If it takes long you can mail m...'
            }
        ]
    },
];

