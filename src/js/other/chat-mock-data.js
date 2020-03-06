const p1 = '../img/chat/avatars/1.png';
const p2 = '../img/chat/avatars/2.png';
const p3 = '../img/chat/avatars/3.png';
const p4 = '../img/chat/avatars/5.png';
const p5 = '../img/chat/avatars/6.png';

const awesome_image = '../img/chat/awesome-meme.jpg';

let users = [
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
        avatar: p5,
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
        id: 0,
        name: 'Light Blue Group',
        users: [2,3,4,5,1,6],
        createdBy: 3,
        createdAt: moment().subtract(1, 'd').subtract(5, 'm'),
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
                text: 'Guys did you see the new update of the Sing App from our competitors?'
            }
        ]
    },
    {
        id: 1,
        name: 'React Native',
        users: [1, 4, 6],
        createdBy: 4,
        createdAt: moment().subtract(1, 'd').subtract(5, 'm'),
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
        id: 2,
        name: 'Common',
        users: [1, 4, 6],
        createdBy: 6,
        createdAt: moment().subtract(1, 'd').subtract(5, 'm'),
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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

function chatDialogGenerator(id) {
    const dialog = chats[id].messages;

    let chatDialogBody = $('<div>', {
        'class': 'chat-dialog-body',
    });
    let dialogMessage = $('<div>', {
        'class': 'dialog-messages',
    });


    $(".chat-dialog-body").remove();

    dialog.forEach((item) => {
        let chatMessage = `<div class="chat-message ${item.userId === 1 ? "owner" : null}">
                <div class="avatar message-avatar">
                    <div class="image-wrapper">
                        <img src='../img/chat/avatars/${item.userId}.png'>
                    </div>
                </div>
                <p class="message-body">
                    ${item.text}
                </p>
                <small class="d-block text-muted">
                    3:09 pm
                </small>
            </div>`;
        dialogMessage.append(chatMessage);
    });

    chatDialogBody.append(dialogMessage);
    $(".chat-dialog-header").after(chatDialogBody);
}

function chatInfoHeaderGenerator(id) {
    $(".chat-info-header").remove();
    $(".chat-section.chat-info-body").remove();
    let el = ``;

    if (id >= 0 && id <= 5) {
        let name = users[id].name;
        el = `<section class="chat-info-header chat-section bg-info">
              <div class="d-flex mb-3">
                  <header>
                      <h3 class="mb-3 fw-semi-bold">${users[id].name} ${users[id].surname}</h3>
                      <h5>HighPark Inc</h5>
                      <h6>${users[id].jobtitle}</h6>
                  </header>
                  <div class="avatar ml-auto mr-3">
                      <div class="image-wrapper">
                          <img src="${users[id].avatar}"> 
                      </div>
                  </div>
              </div>
              <footer class="d-flex align-items-center justify-content-between">
                  <a href="mailto:J_Rowlis@gmail.com" class="text-white mt-2">${users[id].username}@gmail.com</a>
                  <ul class="social-links mt-2">
                      <li class="social-link">
                          <a href="https://www.facebook.com/${users[id].username}_lorem_ipsum">
                              <i class="fa fa-facebook"></i>
                          </a>
                      </li>
                      <li class="social-link">
                          <a href="https://twitter.com/${users[id].username}_lorem_ipsum">
                              <i class="fa fa-twitter"></i>
                          </a>
                      </li>
                      <li class="social-link">
                          <a href="https://www.linkedin.com/in/${users[id].username}_lorem_ipsum/">
                              <i class="fa fa-linkedin"></i>
                          </a>
                      </li>
                  </ul>
              </footer>
          </section>
                <section class="chat-section chat-info-body">
              <ul class="chat-info-list">
                  <li class="chat-info-item">
                      <header class="item-header" data-toggle="collapse" data-target="#common-info" role="button" aria-expanded="true">
                          <img src="../img/chat/information.svg" class="icon">
                          <h5 class="title">Information</h5>
                          <i class="la la-angle-up ml-auto"></i>
                      </header>
                      <div id="common-info" class="item-body collapse show" role="tabpanel" style="">
                          <div>
                              <p class="mb-0">${users[id].tel}</p>
                              <span class="help-block">Mobile</span>
                              <p class="mb-0">@${name}</p>
                              <span class="help-block">${name}</span>
                          </div>
                      </div>
                  </li>
                  <li class="chat-info-item">
                      <header class="item-header">
                          <img src="../img/chat/notifications.svg" class="icon">
                          <h5 class="title">Notifications</h5>
                          <label for="checkbox-ios1" class="switch ml-auto mb-0">
                              <input type="checkbox" id="checkbox-ios1" class="ios form-check-input">
                              <i></i>
                          </label>
                      </header>
                  </li>
                  <li class="chat-info-item">
                      <header class="item-header collapsed" data-toggle="collapse" data-target="#images" role="button" aria-expanded="false">
                          <img src="../img/chat/images.svg" class="icon">
                          <h5 class="title">Images</h5>
                          <i class="la la-angle-up ml-auto"></i>
                      </header>
                      <div id="images" class="item-body collapse" role="tabpanel" style="">
                          <p class="text-muted">
                              <i>No images</i>
                          </p>
                      </div>
                  </li>
                  <li class="chat-info-item">
                      <header class="item-header collapsed" data-toggle="collapse" data-target="#links" role="button">
                          <img src="../img/chat/links.svg" class="icon">
                          <h5 class="title">Links</h5>
                          <i class="la la-angle-up ml-auto"></i>
                      </header>
                      <div id="links" class="item-body collapse" role="tabpanel">
                          <p class="text-muted">
                              <i>No links</i>
                          </p>
                      </div>
                  </li>
                  <li class="chat-info-item">
                      <header class="item-header collapsed" data-toggle="collapse" data-target="#files" role="button">
                          <img src="../img/chat/files.svg" class="icon">
                          <h5 class="title">Files</h5>
                          <i class="la la-angle-up ml-auto"></i>
                      </header>
                      <div id="files" class="item-body collapse" role="tabpanel">
                          <ul class="files-list">
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Diagram_0126.jpg">Diagram_0126.jpg</a>
                              </li>
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Diagram_0127.jpg">Diagram_0127.jpg</a>
                              </li>
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Diagram_0128.jpg">Diagram_0128.jpg</a>
                              </li>
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Dynamic_tables_result.pdf">Dynamic_tables_result.pdf</a>
                              </li>
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Diagram_product_management.pdf">Diagram_product_management.pdf</a>
                              </li>
                          </ul>
                      </div>
                  </li>
              </ul>
          </section>`
    } else {
        let chat = chats[id-6];
        let name = chat.name;
        el = `<section class="chat-info-header chat-section bg-info">
    <div class="d-flex align-items-center mb-3">
        <h4 class="mb-0 fw-semi-bold">${name}</h4>
            <ul class="avatars-row ml-auto">
                <li>
                    <div class="avatar">
                        <div class="image-wrapper stroke">
                            <img src='../img/chat/avatars/${chat.users[0]}.png'>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="avatar">
                        <div class="image-wrapper stroke">
                            <img src='../img/chat/avatars/${chat.users[1]}.png'>
                         </div>
                     </div>
                </li>
                <li>
                    <div class="avatar">
                        <div class="image-wrapper stroke">
                        <img src='../img/chat/avatars/${chat.users[2]}.png'>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <footer class="d-flex align-items-center justify-content-between">
            <a>
                <h5 class="text-white mb-0">${chat.users.length} members</h5>
            </a>
            <button type="button" class="btn bg-white text-info fw-semi-bold">Add people</button>
        </footer>
    </section>
                <section class="chat-section chat-info-body">
              <ul class="chat-info-list">
                  <li class="chat-info-item">
                      <header class="item-header" data-toggle="collapse" data-target="#common-info" role="button" aria-expanded="true">
                          <img src="../img/chat/information.svg" class="icon">
                          <h5 class="title">Information</h5>
                          <i class="la la-angle-up ml-auto"></i>
                      </header>
                      <div id="common-info" class="item-body collapse show" role="tabpanel" style="">
                          <div>
                              <p class="mb-0">${chat.name}</p>
                              <span class="help-block">Name</span>
                              <p class="mb-0">by ${users[id-6].name}</p>
                              <span class="help-block">Created</span>
                          </div>
                      </div>
                  </li>
                  <li class="chat-info-item">
                      <header class="item-header">
                          <img src="../img/chat/notifications.svg" class="icon">
                          <h5 class="title">Notifications</h5>
                          <label for="checkbox-ios1" class="switch ml-auto mb-0">
                              <input type="checkbox" id="checkbox-ios1" class="ios form-check-input">
                              <i></i>
                          </label>
                      </header>
                  </li>
                  <li class="chat-info-item">
                      <header class="item-header collapsed" data-toggle="collapse" data-target="#images" role="button" aria-expanded="false">
                          <img src="../img/chat/images.svg" class="icon">
                          <h5 class="title">Images</h5>
                          <i class="la la-angle-up ml-auto"></i>
                      </header>
                      <div id="images" class="item-body collapse" role="tabpanel" style="">
                          <p class="text-muted">
                              <i>No images</i>
                          </p>
                      </div>
                  </li>
                  <li class="chat-info-item">
                      <header class="item-header collapsed" data-toggle="collapse" data-target="#links" role="button">
                          <img src="../img/chat/links.svg" class="icon">
                          <h5 class="title">Links</h5>
                          <i class="la la-angle-up ml-auto"></i>
                      </header>
                      <div id="links" class="item-body collapse" role="tabpanel">
                          <p class="text-muted">
                              <i>No links</i>
                          </p>
                      </div>
                  </li>
                  <li class="chat-info-item">
                      <header class="item-header collapsed" data-toggle="collapse" data-target="#files" role="button">
                          <img src="../img/chat/files.svg" class="icon">
                          <h5 class="title">Files</h5>
                          <i class="la la-angle-up ml-auto"></i>
                      </header>
                      <div id="files" class="item-body collapse" role="tabpanel">
                          <ul class="files-list">
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Diagram_0126.jpg">Diagram_0126.jpg</a>
                              </li>
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Diagram_0127.jpg">Diagram_0127.jpg</a>
                              </li>
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Diagram_0128.jpg">Diagram_0128.jpg</a>
                              </li>
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Dynamic_tables_result.pdf">Dynamic_tables_result.pdf</a>
                              </li>
                              <li class="file-item">
                                  <img src="../img/chat/download.svg" class="download-icon">
                                  <a href="Diagram_product_management.pdf">Diagram_product_management.pdf</a>
                              </li>
                          </ul>
                      </div>
                  </li>
              </ul>
          </section>`
    }

    $(".chat-info-section .d-lg-none.chat-mobile-navigation").after(el);
}
