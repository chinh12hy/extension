(function(e) {
    function createHtml() {
        // Lấy danh sách các button
        let listButton = document['getElementsByClassName']('container-extension');
        for (let index = 0; index < listButton['length']; index++) {
            listButton[index]['outerHTML'] = ''
        };

        // Xử lý ở facebook
        try {
            let url = document['location']['href'];
            if (url['indexOf']('/inbox/') > -1 && url['indexOf']('mailbox_id=') > -1) {
                let regex = /selected_item_id=(\d+)/;
                let id = regex['exec'](url)[1];
                let divContainer = createDevContainer(id);
                try {
                    divContainer['className'] = 'container-extension fb_btn_pagechat';
                    let isAppend = false;
                    let listTable = document['getElementById']('globalContainer')['getElementsByClassName']('fb_content')[0]['getElementsByTagName']('table')[0]['getElementsByTagName']('div');
                    for (let index = 0; index < listTable['length']; index++) {
                        if (listTable[index]['getAttribute']('data-testid') === 'action_spam') {
                            listTable[index]['parentNode']['appendChild'](divContainer);
                            isAppend = true
                        }
                    };
                    if (!isAppend) {
                        document['getElementById']('globalContainer')['getElementsByClassName']('fb_content')[0]['getElementsByTagName']('table')[0]['getElementsByTagName']('td')[1]['appendChild'](divContainer);
                        document['getElementById']('globalContainer')['getElementsByClassName']('fb_content')[0]['getElementsByTagName']('table')[0]['getElementsByTagName']('td')[2]['appendChild'](divContainer)
                    }
                } catch (ex) {
                    createContainerButton(divContainer)
                }
            };
            if (url['indexOf']('com/messages/t/') > -1) {
                let regex = /messages\/t\/(\d+)/;
                let _0xfea0x33 = '';
                let _0xfea0x1b = regex['exec'](url);
                if (_0xfea0x1b == null) {
                    let listTagA = document['getElementsByTagName']('a');
                    for (let index = 0; index < listTagA['length']; index++) {
                        _0xfea0x33 = listTagA[index]['getAttribute']('uid');
                        if (_0xfea0x33 !== null && _0xfea0x33 !== '') {
                            break
                        }
                    }
                } else {
                    _0xfea0x33 = _0xfea0x1b[1]
                };
                let divContainer = createDevContainer(_0xfea0x33);
                try {
                    divContainer['className'] = 'container-extension fb_btn_profilechat';
                    let _0xfea0x38 = document['getElementsByClassName']('fb_content ')[0]['getElementsByTagName']('ul')[1];
                    _0xfea0x38['appendChild'](divContainer)
                } catch (ex) {
                    createContainerButton(divContainer)
                }
            }
        } catch (ex7) {};

        function handleCreateModuleExtension() {
            // _3u1 _gli _6pe1 _87m1 là class nhận biết trong group
            // Xử lý thêm button trong phần group
            if (document.getElementById('BrowseResultsContainer') && location.href.includes('facebook.com/search/groups')) {
                let listGroup = document['getElementsByClassName']('_3u1 _gli _6pe1 _87m1');
                try {
                    for (let index = 0; index < listGroup['length']; index++) {
                        let group = listGroup[index];
                        if (group.childNodes.length === 1) {
                            let id = JSON.parse(group.getAttribute('data-bt')).id;
                            let divContainer = createDevContainer(id);
                            divContainer['className'] = 'container-extension qcuidfb_btn_group';
                            group.appendChild(divContainer)
                        }
                    }
                } catch (ex1) {}
            };
            // xử lý trong phần comment FB
            if (document['getElementsByClassName']('commentable_item')['length'] > 0) {
                let commentsTable = document['getElementsByClassName']('commentable_item');
                try {
                    for (let index = 0; index < commentsTable['length']; index++) {
                        let link = commentsTable[index]['getElementsByTagName']('a');
                        for ( let index = 0; index < link['length']; index++ ) {
                            try {
                                let linkItem = link[index];
                                // Tìm ra thằng nào có chứa id trong attrs
                                if (linkItem['getAttribute']('data-hovercard') && !linkItem['getAttribute']('aria-hidden')) {
                                    // lọc điều kiện chỉ lấy những thằng là người comment không lấy mấy thằng được tag trong comment
                                    if (linkItem.parentNode.className !== '_3l3x') {
                                        // Kiểm tra xem thăng cha nó có button chưa nếu chưa có thì mới tiến hành tạo tránh tạo spam html
                                        if (linkItem['parentNode']['getElementsByClassName']('container-extension')['length'] === 0) {
                                            let regex = /\?id=(\d+)/;
                                            let dataHoverCard = linkItem.getAttribute('data-hovercard');
                                            // sau khi regex thì sẽ có sai sót làm thiếu linkItem ở đây
                                            let id = regex['exec'](dataHoverCard)[1];
                                            let facebookName = linkItem.textContent;
                                            let button = createDevContainer(id, facebookName);

                                            button['className'] = 'container-extension fb_btn_userCommentInner';
                                            linkItem['parentNode'].append(button);
                                        }
                                    }
                                }
                            } catch (ex3) {}
                        };
                    };
                } catch (ex1) {}
            };

            // dùng cho các card hiển thị trong bảng tin FB
            if (document['getElementsByClassName']('userContentWrapper')['length'] > 0) {
                let container = document['getElementsByClassName']('userContentWrapper');
                try {
                    for (let index = 0; index < container['length']; index++) {
                        let item = container[index];
                        // Nếu chưa có button nào thì mới tiến hành tạo button
                        if (item['getElementsByClassName']('container-extension')['length'] === 0 || item.childNodes.length === 2) {
                            let tagA = item['getElementsByTagName']('a');
                            for (let index = 0; index < tagA['length']; index++) {
                                let itemHasID = tagA[index]['getAttribute']('data-hovercard') + '';
                                // nếu là bài viết của 1 người dùng (Vẫn chưa hiển thị trên tất cả user ( được khoảng 80% ))
                                if (itemHasID['indexOf']('user.php') > -1 ) {
                                    let regex = /hovercard\/user\.php\?id=(\d+)/;
                                    let id = regex['exec'](itemHasID)[1];
                                    let facebookName = tagA[index].getAttribute('title');
                                    let divContainer = createDevContainer(id, facebookName);
                                    try {
                                        divContainer['setAttribute']('data-fbtype', 'post');
                                        divContainer['setAttribute']('data-fbname', tagA[index]['getAttribute']('title'))
                                    } catch (ex) {};
                                    try {
                                        divContainer['className'] = 'container-extension fb_btn_userContentWrapper';
                                        item['appendChild'](divContainer)
                                    } catch (ex) {};
                                    break
                                }
                                // nếu là bài viết của 1 page đăng lên
                                if (itemHasID['indexOf']('page.php') > -1 ) {
                                    let regex = /hovercard\/page\.php\?id=(\d+)/;
                                    let idPage = regex['exec'](itemHasID)[1];
                                    let divContainer = null;
                                    if (tagA[index].textContent) {
                                        let pageName = tagA[index].textContent;
                                        divContainer = createDevContainer(idPage, pageName);
                                    } else {
                                        let labelPageImage = tagA[index].getElementsByTagName('img')[0].getAttribute('aria-label');
                                        divContainer = createDevContainer(idPage, labelPageImage);
                                    }
                                    try {
                                        divContainer['className'] = 'container-extension fb_btn_userContentWrapper';
                                        item['appendChild'](divContainer)
                                    } catch (ex) {};
                                    break
                                }
                            }
                        }
                    }
                } catch (ex1) {}
            };

            // Tạo button trong trang chi tiết trang cá nhân FB
            try {
                // Tạo button trong trang chi tiết trang cá nhân FB
                if (document['getElementById']('fbProfileCover') != null
                    && document['getElementById']('pagelet_timeline_profile_actions')['getElementsByClassName']('container-extension')['length'] === 0) {
                    let dataFBUser = document['getElementById']('pagelet_timeline_main_column')['getAttribute']('data-gt');
                    let userID = JSON['parse'](dataFBUser)['profile_owner'];
                    let facebookName = document.getElementById('fb-timeline-cover-name').textContent;
                    let divContainer = createDevContainer(userID, facebookName);
                    try {
                        // comment
                        divContainer['setAttribute']('data-fbtype', 'profile');
                        divContainer['setAttribute']('data-fbname', document['getElementById']('fb-timeline-cover-name')['innerText'])
                    } catch (ex) {};
                    try {
                        divContainer['className'] = 'container-extension fb_btn_profiletimeline';
                        // Thẻ html bao bọc trong chỗ thông tin cá nhân facebook
                        let profileInner = document['getElementById']('pagelet_timeline_profile_actions');
                        profileInner['appendChild'](divContainer)
                    } catch (ex5) {
                        createContainerButton(divContainer)
                    }
                }
            } catch (ex3) {};

            // Hiển thị trong phần hover vào mội tên người dùng facebook sẽ hiển thị ra 1 cái popup
            try {
                if (document['getElementsByClassName']('hovercardButtonGroup')['length'] > 0) {
                    let listButtonGroups = document['getElementsByClassName']('hovercardButtonGroup');
                    try {
                        for (let index = 0; index < listButtonGroups['length']; index++) {
                            let buttonGroup = listButtonGroups[index];
                            if (buttonGroup['getElementsByClassName']('container-extension')['length'] === 0) {
                                let id = buttonGroup['getElementsByClassName']('FriendRequestOutgoing')[0]['getAttribute']('data-profileid') + '';
                                let divContainer = createDevContainer(id);
                                try {
                                    divContainer['setAttribute']('data-fbtype', 'profile')
                                } catch (ex2) {};
                                try {
                                    divContainer['className'] = 'container-extension qcuidfb_btn_userHoverCard';
                                    buttonGroup['appendChild'](divContainer)
                                } catch (ex) {}
                            }
                        }
                    } catch (ex1) {}
                } else {
                    if (document['getElementsByClassName']('HovercardMessagesButton')['length'] > 0) {
                        let friendButtons = document['getElementsByClassName']('HovercardMessagesButton');
                        try {
                            for (let index = 0; index < friendButtons['length']; index++) {
                                let button = friendButtons[index];
                                if (button['getElementsByClassName']('container-extension')['length'] === 0) {
                                    let id = button['getAttribute']('ajaxify') + '';
                                    let regex = /=(\d+)/;
                                    id = regex['exec'](id)[1];
                                    let divContainer = createDevContainer(id);
                                    try {
                                        divContainer['setAttribute']('data-fbtype', 'profile')
                                    } catch (ex2) {};
                                    try {
                                        divContainer['className'] = 'container-extension qcuidfb_btn_userHoverCard';
                                        button['parentNode']['appendChild'](divContainer)
                                    } catch (ex) {}
                                }
                            }
                        } catch (ex1) {}
                    }
                }
            } catch (ex3) {};

            // Nếu trong danh sách tìm kiếm bạn bè facebook và trang gợi ý kết bạn
            try {
                if (document['getElementsByClassName']('FriendButton')['length'] > 0) {
                    let friendButtons = document['getElementsByClassName']('FriendButton');
                    try {
                        for (let index = 0; index < friendButtons['length']; index++) {
                            let button = friendButtons[index];
                            if (button['parentNode']['getElementsByClassName']('container-extension')['length'] === 0) {
                                let id = button['getElementsByClassName']('FriendRequestOutgoing')[0]['getAttribute']('data-profileid') + '';
                                let divContainer = createDevContainer(id);
                                try {
                                    divContainer['setAttribute']('data-fbtype', 'profile')
                                } catch (ex2) {};
                                try {
                                    divContainer['className'] = 'container-extension qcuidfb_btn_likereaction';
                                    button['appendChild'](divContainer)
                                } catch (ex) {}
                            }
                        }
                    } catch (ex1) {}
                }
            } catch (ex3) {};

            // Nếu trong danh sách tìm kiếm page
            try {
                if (document['getElementsByClassName']('PageLikeButton')['length'] > 0 && location.href.includes('facebook.com/search/pages')) {
                    let likeButtons = document['getElementsByClassName']('PageLikeButton');
                    try {
                        for (let index = 0; index < likeButtons['length']; index++) {
                            let wrapItem = likeButtons[index];
                            if (wrapItem['parentNode']['getElementsByClassName']('container-extension')['length'] === 0) {
                                let id = wrapItem['getAttribute']('data-profileid') + '';
                                let divContainer = createDevContainer(id);

                                try {
                                    divContainer['setAttribute']('data-fbtype', 'profile')
                                } catch (ex2) {};
                                try {
                                    divContainer['className'] = 'container-extension fb_btn_likePageReaction';
                                    wrapItem['parentNode'].style = "position: relative";
                                    wrapItem['parentNode']['appendChild'](divContainer)
                                } catch (ex) {}
                            }
                        }
                    } catch (ex1) {}
                }
            } catch (ex3) {};
            setTimeout(function() {
                handleCreateModuleExtension()
            }, 2000)
        }
        handleCreateModuleExtension();
    }

    function createContainerButton(divContainer) {
        divContainer['className'] = 'container-extension qcuidfb_btn_searchglobal';
        document['getElementsByTagName']('body')[0]['appendChild'](divContainer)
    }

    let results = [];
    try {
        results = JSON['parse'](localStorage['getItem']('qcuidResults'));
        if (results == null) {
            results = []
        }
    } catch (exx) {};

    function createDevContainer(userId, facebookNam='') {
        let buttonInner = document['createElement']('div');
        let iconInner = `<div class=\'qcuidfb_icon\' title=\'Thêm ${facebookNam} vào danh sách nguồn\'>
            <svg class="icon" width="18" height="18" viewBox="0 0 18 18">
              <g id="add-source" transform="translate(-1103 -111)">
                <g id="border-icon" data-name="Ellipse 95" transform="translate(1103 111)" fill="#fff" stroke-width="1">
                  <circle cx="9" cy="9" r="9" stroke="none"/>
                  <circle cx="9" cy="9" r="8.5"/>
                </g>
                <g id="Layer_2" data-name="Layer 2" transform="translate(1103 111)">
                  <g id="plus">
                    <rect id="Rectangle_483" data-name="Rectangle 483" width="18" height="18" transform="translate(18 18) rotate(180)" opacity="0"/>
                    <path id="Path_1307" data-name="Path 1307" d="M13.375,8.375H9.625V4.625a.625.625,0,0,0-1.25,0v3.75H4.625a.625.625,0,0,0,0,1.25h3.75v3.75a.625.625,0,0,0,1.25,0V9.625h3.75a.625.625,0,0,0,0-1.25Z"/>
                  </g>
                </g>
              </g>
            </svg>
        </div>`
        buttonInner['className'] = 'container-extension';
        buttonInner['setAttribute']('data-uid', userId);
        document['getElementsByTagName']('body')[0]['appendChild'](buttonInner);
        buttonInner['innerHTML'] = iconInner +
            '<img class=\'qcuidfb_img_loading\' src=\'https://quangcaouidfb.com/images/loading-blue.gif\'/>' +
            '<span class=\'data_result\' ></span> <span class="icon-success"></span>';

        // Hàm này khi click vào icon trên màn hình sẽ được gọi tới và mình sẽ xử lỹ sự kiện trong hàm này.
        function handleClickButton() {
            let divContainer = this;
            // thêm loading class
            // replaceClass(divContainer, 'qcuidfb_loading');
            let id = divContainer['getAttribute']('data-uid');
            // let facebookName = divContainer['getAttribute']('data-fbname');
            function createButtonLogin() {
                divContainer['getElementsByClassName']('qcuidfb_icon')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('data_result')[0];
                let notify = `<span> Bạn chưa <a href="http://sbox.staging/login?ref=facebook" target="_blank">đăng nhập</a> vào SOCIALBOX </span> <br/>`;
                container['innerHTML'] = notify;
                divContainer['getElementsByClassName']('data_result')[0]['style']['display'] = 'flex';
                divContainer['removeEventListener']('click', divContainer)
            }

            function createIconSuccess() {
                // ẩn icon đi
                divContainer['getElementsByClassName']('qcuidfb_icon')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('icon-success')[0];
                let iconSuccess = `<img src="https://w0.pngwave.com/png/873/563/computer-icons-icon-design-business-success-png-clip-art-thumbnail.png"
 width="20" height="20" alt="Thành công" title="Thêm thành công"/>`;
                container['innerHTML'] = `${iconSuccess}`;
                divContainer['removeEventListener']('click', divContainer)
            }
            let Http = new XMLHttpRequest();
            // Khi gọi API hoàn tất ( thành công 200 hoặc 500, 404 ect)
            Http.addEventListener("load", (response) => {
                // Khi hết quyền truy cập vì k có token hoặc hết hạn thì tiến hành hiển thị ra thông báo lỗi
                if (response.target.status === 401) {
                    createButtonLogin();
                }
                // Xử lý khi gọi API thành công
                if (response.target.status === 200) {
                    createIconSuccess();
                }
            });
            // Lấy localStorage trong extension ra để dùng cho API
            let token = '';
            // khi lấy được token thì tiến hành gọi api
            chrome.storage.sync.get(['token'], function(tokens) {
                token = tokens.token;
                // check có token mới được gọi API
                if (token) {
                    const mappingSourceType = {
                        'https://www.facebook.com': 'facebook',
                        'https://www.youtube.com': 'youtube'
                    };
                    let currentOriginUrl = location.origin;
                    let temp = [];
                    if (location.href.includes('facebook')) {
                        temp = [
                            `${currentOriginUrl}/${id}`
                        ];
                    } else if (location.href.includes('youtube')) {
                        temp = [
                            `${currentOriginUrl}${id}`
                        ];
                    }
                    // dùng https://sbapi2.staging để call api
                    // Chỉ nhận https
                    Http['open']('POST', `https://sbapi2.staging/api/source_admin/?source_type=${mappingSourceType[currentOriginUrl]}`);
                    Http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                    Http.setRequestHeader('authorization', `Bearer ${token}`);
                    Http['send'](JSON.stringify(temp));
                } else {
                    // tạo ra button đăng nhập
                    createButtonLogin();
                    // Xử lý hiển thị ra 1 button đường link sang trang login
                }

            });

        }
        buttonInner['addEventListener']('click', handleClickButton);
        return buttonInner
    }

    if (document['location']['href']['indexOf']('facebook') > -1) {
        createHtml()
    };
})()
