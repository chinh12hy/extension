(function(e) {
    function hasClass(dom, className) {
        return (' ' + dom['className'] + ' ')['indexOf'](className) > -1
    }

    function replaceClass(dom, newClass) {
        let newClassStr = ' ' + newClass;
        dom['className'] = dom['className']['replace'](newClassStr, '');
        dom['className'] = dom['className'] + newClassStr
    }

    function removeClass(dom, className) {
        dom['className'] = dom['className']['replace'](className, '')
    }

    function createHtml() {
        // Lấy danh sách các button
        let listButton = document['getElementsByClassName']('qcuidfb_btn_search');
        for (let index = 0; index < listButton['length']; index++) {
            listButton[index]['outerHTML'] = ''
        };
        try {
            let url = document['location']['href'];
            if (url['indexOf']('/inbox/') > -1 && url['indexOf']('mailbox_id=') > -1) {
                let regex = /selected_item_id=(\d+)/;
                let id = regex['exec'](url)[1];
                let divContainer = createDevContainer(id);
                try {
                    divContainer['className'] = 'qcuidfb_btn_search qcuidfb_btn_pagechat';
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
                    divContainer['className'] = 'qcuidfb_btn_search qcuidfb_btn_profilechat';
                    let _0xfea0x38 = document['getElementsByClassName']('fb_content ')[0]['getElementsByTagName']('ul')[1];
                    _0xfea0x38['appendChild'](divContainer)
                } catch (ex) {
                    createContainerButton(divContainer)
                }
            }
        } catch (ex7) {};

        function handleCreateModuleExtension() {
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
                                    let regex = /\?id=(\d+)/;
                                    let id = regex['exec'](linkItem)[1];
                                    let button = createDevContainer(id);
                                    // Lúc đầu có 3 thăng child thì khi thêm cái dev của mình sẽ lên 4 và từ vòng lặp sau sẽ không cần thêm dev của mình nữa.
                                    if (linkItem.parentNode.childNodes.length === 3) {
                                        button['className'] = 'qcuidfb_btn_search qcuidfb_btn_userCommentInner';
                                        linkItem['parentNode'].append(button);
                                    }
                                }
                            } catch (ex3) {}
                        };
                    };
                } catch (ex1) {}
            };

            if (document['getElementsByClassName']('userContentWrapper')['length'] > 0) {
                let container = document['getElementsByClassName']('userContentWrapper');
                try {
                    for (let index = 0; index < container['length']; index++) {
                        let item = container[index];
                        if (item['getElementsByClassName']('qcuidfb_btn_search')['length'] === 0) {
                            let tagA = item['getElementsByTagName']('a');
                            for (let index = 0; index < tagA['length']; index++) {
                                let itemHasID = tagA[index]['getAttribute']('data-hovercard') + '';
                                if (itemHasID['indexOf']('user.php') > -1) {
                                    let regex = /hovercard\/user\.php\?id=(\d+)/;
                                    let id = regex['exec'](itemHasID)[1];
                                    let divContainer = createDevContainer(id);
                                    try {
                                        divContainer['setAttribute']('data-fbtype', 'post');
                                        divContainer['setAttribute']('data-fbname', tagA[index]['getAttribute']('title'))
                                    } catch (ex) {};
                                    try {
                                        divContainer['className'] = 'qcuidfb_btn_search qcuidfb_btn_userContentWrapper';
                                        item['appendChild'](divContainer)
                                    } catch (ex) {};
                                    break
                                }
                            }
                        }
                    }
                } catch (ex1) {}
            };

            try {
                // Tạo button trong trang chi tiết trang cá nhân FB
                if (document['getElementById']('fbProfileCover') != null && document['getElementById']('pagelet_timeline_profile_actions')['getElementsByClassName']('qcuidfb_btn_search')['length'] === 0) {
                    let dataFBUser = document['getElementById']('pagelet_timeline_main_column')['getAttribute']('data-gt');
                    let userID = JSON['parse'](dataFBUser)['profile_owner'];
                    let divContainer = createDevContainer(userID);
                    try {
                        divContainer['setAttribute']('data-fbtype', 'profile');
                        divContainer['setAttribute']('data-fbname', document['getElementById']('fb-timeline-cover-name')['innerText'])
                    } catch (ex) {};
                    try {
                        divContainer['className'] = 'qcuidfb_btn_search qcuidfb_btn_profiletimeline';
                        // Thẻ html bao bọc trong chỗ thông tin cá nhân facebook
                        let profileInner = document['getElementById']('pagelet_timeline_profile_actions');
                        profileInner['appendChild'](divContainer)
                    } catch (ex5) {
                        createContainerButton(divContainer)
                    }
                }
            } catch (ex3) {};
            try {
                // Hiển thị trong phần hover vào mội tên người dùng facebook sẽ hiển thị ra 1 cái popup
                if (document['getElementsByClassName']('hovercardButtonGroup')['length'] > 0) {
                    let buttonGroups = document['getElementsByClassName']('hovercardButtonGroup');
                    try {
                        for (let index = 0; index < buttonGroups['length']; index++) {
                            let buttonGroups = buttonGroups[index];
                            if (buttonGroups['getElementsByClassName']('qcuidfb_btn_search')['length'] === 0) {
                                let id = buttonGroups['getElementsByClassName']('FriendRequestOutgoing')[0]['getAttribute']('data-profileid') + '';
                                let divContainer = createDevContainer(id);
                                try {
                                    divContainer['setAttribute']('data-fbtype', 'profile')
                                } catch (ex2) {};
                                try {
                                    divContainer['className'] = 'qcuidfb_btn_search qcuidfb_btn_userHoverCard';
                                    buttonGroups['appendChild'](divContainer)
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
                                if (button['getElementsByClassName']('qcuidfb_btn_search')['length'] === 0) {
                                    let id = button['getAttribute']('ajaxify') + '';
                                    let regex = /=(\d+)/;
                                    id = regex['exec'](id)[1];
                                    let divContainer = createDevContainer(id);
                                    try {
                                        divContainer['setAttribute']('data-fbtype', 'profile')
                                    } catch (ex2) {};
                                    try {
                                        divContainer['className'] = 'qcuidfb_btn_search qcuidfb_btn_userHoverCard';
                                        button['parentNode']['appendChild'](divContainer)
                                    } catch (ex) {}
                                }
                            }
                        } catch (ex1) {}
                    }
                }
            } catch (ex3) {};
            try {
                // Nếu trong danh sách tìm kiếm facebook
                if (document['getElementsByClassName']('FriendButton')['length'] > 0) {
                    let friendButtons = document['getElementsByClassName']('FriendButton');
                    try {
                        for (let index = 0; index < friendButtons['length']; index++) {
                            let button = friendButtons[index];
                            if (button['parentNode']['getElementsByClassName']('qcuidfb_btn_search')['length'] === 0) {
                                let id = button['getElementsByClassName']('FriendRequestOutgoing')[0]['getAttribute']('data-profileid') + '';
                                let divContainer = createDevContainer(id);
                                try {
                                    divContainer['setAttribute']('data-fbtype', 'profile')
                                } catch (ex2) {};
                                try {
                                    divContainer['className'] = 'qcuidfb_btn_search qcuidfb_btn_likereaction';
                                    button['appendChild'](divContainer)
                                } catch (ex) {}
                            }
                        }
                    } catch (ex1) {}
                }
            } catch (ex3) {};

            try {
                // Nếu trong danh sách tìm kiếm page
                if (document['getElementsByClassName']('PageLikeButton')['length'] > 0) {
                    let likeButtons = document['getElementsByClassName']('PageLikeButton');
                    try {
                        for (let index = 0; index < likeButtons['length']; index++) {
                            let wrapItem = likeButtons[index];
                            if (wrapItem['parentNode']['getElementsByClassName']('qcuidfb_btn_search')['length'] === 0) {
                                let id = wrapItem['getAttribute']('data-profileid') + '';
                                let divContainer = createDevContainer(id);

                                try {
                                    divContainer['setAttribute']('data-fbtype', 'profile')
                                } catch (ex2) {};
                                try {
                                    divContainer['className'] = 'qcuidfb_btn_search qcuidfb_btn_likePagereaction';
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
        divContainer['className'] = 'qcuidfb_btn_search qcuidfb_btn_searchglobal';
        document['getElementsByTagName']('body')[0]['appendChild'](divContainer)
    }

    let results = [];
    try {
        results = JSON['parse'](localStorage['getItem']('qcuidResults'));
        if (results == null) {
            results = []
        }
    } catch (exx) {};

    function createDevContainer(userId) {
        let buttonInner = document['createElement']('div');
        let iconInner = `<span class=\'qcuidfb_icon\' title=\'Thêm vào danh sách nguồn\'></span>`
        buttonInner['className'] = 'qcuidfb_btn_search';
        buttonInner['setAttribute']('data-uid', userId);
        document['getElementsByTagName']('body')[0]['appendChild'](buttonInner);
        buttonInner['innerHTML'] = iconInner +
            '<img class=\'qcuidfb_img_loading\' src=\'https://quangcaouidfb.com/images/loading-blue.gif\'/>' +
            '<span class=\'data_result\' ></span>';

        // Hàm này khi click vào icon trên màn hình sẽ được gọi tới và mình sẽ xử lỹ sự kiện trong hàm này.
        function getFBData() {
            let divContainer = this;
            // thêm loading class
            // replaceClass(divContainer, 'qcuidfb_loading');
            let userFbID = divContainer['getAttribute']('data-uid');
            // let facebookName = divContainer['getAttribute']('data-fbname');
            function createButtonLogin() {
                // ẩn icon đi
                divContainer['getElementsByClassName']('qcuidfb_icon')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('data_result')[0];
                let notify = `<span> Bạn chưa đăng nhập vào SOCIALBOX </span> <br/>`;
                let linkLogin = `<span> vui lòng click vào <a href="http://sbox.staging/login?ref=FB" target="_blank"> đây </a> để tiếp tục sử dụng sản phẩm </span>`
                container['innerHTML'] = `${notify} ${linkLogin}`;
                divContainer['getElementsByClassName']('data_result')[0]['style']['display'] = 'block';
                divContainer['removeEventListener']('click', divContainer)
            }
            let Http = new XMLHttpRequest();
            // Xử lý khi api lỗi
            Http.addEventListener("error", () => {
                console.log('error')
            });
            // Khi gọi API hoàn tất ( thành công hoặc 500, 404 ect)
            Http.addEventListener("load", (response) => {
                // Khi hết quyền truy cập vì k có token hoặc hết hạn thì tiến hành hiển thị ra thông báo lỗi
                if (response.target.status === 401) {
                    createButtonLogin();
                }
                console.log(response)
            });
            // Lấy localStorage trong extension ra để dùng cho API
            let token = '';
            // khi lấy được token thì tiến hành gọi api
            chrome.storage.sync.get(['token'], function(tokens) {
                token = tokens.token;
                // check có token mới được gọi API
                if (token) {
                    let temp = [
                        `https://www.facebook.com/${userFbID}`
                    ];
                    // dùng https://sbapi2.staging để call api
                    // Chỉ nhận https
                    Http['open']('POST', 'https://sbapi2.staging/api/source_admin/?source_type=facebook');
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
        buttonInner['addEventListener']('click', getFBData);
        return buttonInner
    }

    if (document['location']['href']['indexOf']('facebook') > -1) {
        createHtml()
    };
})()
