(function(e) {
    const domainApi = 'https://sbapi2.staging';

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
            // Xử lý khi trong trang www.facebook.com/messages
            if (url['indexOf']('com/messages/t/') > -1) {
                let regex = /messages\/t\/(\d+)/;
                let fbID = '';
                let friendID = regex['exec'](url);
                // Nếu url có dạng /usernamefb thì sẽ ra null
                if (friendID == null) {
                    let listTagA = document['getElementsByTagName']('a');
                    for (let index = 0; index < listTagA['length']; index++) {
                        // lấy ra thằng nào có chứu id fb
                        fbID = listTagA[index]['getAttribute']('uid');
                        // tìm được rồi thì dừng lại
                        if (fbID !== null && fbID !== '') {
                            break
                        }
                    }
                } else {
                    // còn nếu url dạng /facebookID thì sẽ bắt regex lấy ra id user
                    fbID = friendID[1]
                };
                let facebookName = document.getElementById('js_5').textContent || '';
                // chỉ thêm button khi không ở một nhóm chat nào đó
                if (document.getElementById('js_5').getElementsByTagName('em').length === 0) {
                    let divContainer = createDevContainer(fbID, facebookName);
                    try {
                        divContainer['className'] = 'container-extension fb_btn_profilechat';
                        let containerExtension = document['getElementsByClassName']('fb_content ')[0]['getElementsByTagName']('ul')[1];
                        containerExtension.style = "position: relative";
                        containerExtension['appendChild'](divContainer)
                    } catch (ex) {
                        createContainerButton(divContainer)
                    }
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
                        let wrapExtension = group.getElementsByClassName('_42ft _4jy0 _4jy3 _517h _51sy')[0];
                        if (wrapExtension.parentNode.getElementsByClassName('container-extension').length === 0) {
                            let id = JSON.parse(group.getAttribute('data-bt')).id;
                            let divContainer = createDevContainer(id);
                            divContainer['className'] = 'container-extension fb_btn_group1';
                            divContainer.style = "margin-right: 5px";
                            wrapExtension.parentNode.style = "display: flex;flex-direction: row-reverse;align-items: center;"
                            wrapExtension.parentNode.append(divContainer);
                        }
                    }
                } catch (ex1) {}
            };

            //Xử lý tìm kiếm tất cả
            if (location.href.includes('facebook.com/search/top')) {
                let listPostResult = document.getElementsByClassName('_5bl2 _401d');
                for (let index =0; index < listPostResult.length; index++) {
                    let postItem = listPostResult[index].parentNode;
                    let dataHoverCard = postItem.getElementsByClassName('_7gyi')[0].getAttribute('data-hovercard');
                    let namePageOrUser = postItem.getElementsByClassName('_7gyi')[0].textContent;
                    if (postItem.getElementsByClassName('container-extension').length === 0) {
                        if (dataHoverCard.includes('user.php')) {
                            let regex = /hovercard\/user\.php\?id=(\d+)/;
                            let userID = regex.exec(dataHoverCard)[1];
                            let divContainer = createDevContainer(userID, namePageOrUser);
                            divContainer.className = 'container-extension fb-search-post-all';
                            postItem.append(divContainer);
                        } else if (dataHoverCard.includes('page.php')) {
                            let regex = /hovercard\/page\.php\?id=(\d+)/;
                            let pageID = regex.exec(dataHoverCard)[1];
                            let divContainer = createDevContainer(pageID, namePageOrUser);
                            divContainer.className = 'container-extension fb-search-post-all';
                            postItem.append(divContainer);
                        }
                    }
                }
                // Dùng để xử lý cho trường hợp là page trong tìm kiếm tất cả
                let likeButtons = document.getElementsByClassName('PageLikeButton');
                try {
                    for (let index = 0; index < likeButtons['length']; index++) {
                        let wrapItem = likeButtons[index];
                        if (wrapItem['parentNode']['getElementsByClassName']('container-extension')['length'] === 0) {
                            let id = wrapItem['getAttribute']('data-profileid') + '';
                            let divContainer = createDevContainer(id);
                            try {
                                divContainer['className'] = 'container-extension';
                                divContainer.style = "margin-right: 5px";
                                wrapItem['parentNode'].className = "flex-row-reverse";
                                wrapItem['parentNode']['appendChild'](divContainer)
                            } catch (ex) {}
                        }
                    }
                } catch (ex1) {}
                // Dùng để xử lý cho trường hợp là group trong tìm kiếm tất cả
                let iconJoinGroup = document.getElementsByClassName('_3-8_ img sp_umIS4fBE-OL sx_c0e109');
                try {
                    for (let index = 0; index < iconJoinGroup['length']; index++) {
                        let regex = /\?group_id=(\d+)/;
                        let wrapItem = iconJoinGroup[index].parentNode;
                        let data = wrapItem.getAttribute('ajaxify');
                        if (wrapItem['parentNode']['getElementsByClassName']('container-extension')['length'] === 0) {
                            let groupID = regex.exec(data)[1];
                            let divContainer = createDevContainer(groupID);
                            try {
                                divContainer['className'] = 'container-extension';
                                divContainer.style = "margin-right: 5px";
                                wrapItem['parentNode'].className = "flex-row-reverse";
                                wrapItem['parentNode']['appendChild'](divContainer)
                            } catch (ex) {}
                        }
                    }
                } catch (ex1) {}
            }
            // Trong trang chi tiết 1 group
            if (location.href.includes('facebook.com/groups')) {
                let buttonJoinGroup = document['getElementsByClassName']('_42ft _4jy0 _21ku _4jy4 _4jy1 selected _51sy mrm')[0];
                if (buttonJoinGroup && buttonJoinGroup.parentNode.getElementsByClassName('container-extension').length === 0 ) {
                    let groupID = buttonJoinGroup.id.split('_')[1];
                    const groupName = document.getElementById('seo_h1_tag').textContent || '';
                    let divContainer = createDevContainer(groupID, groupName);
                    divContainer.className = 'container-extension';
                    divContainer.style = "margin-left: 5px"
                    buttonJoinGroup.parentNode.style = "display: flex; align-items: center;position:relative";
                    buttonJoinGroup.parentNode.parentNode.style = "display: flex; align-items: center";
                    buttonJoinGroup.parentNode.appendChild(divContainer);
                }
            };

            // Xử lý trong chi tiết 1 "Trang" trong facebook
            if (document.getElementById('PagesCoverElementContainerPagelet')) {
                if (document.getElementsByClassName('container-extension').length === 0) {
                    let likeButtonPage  =  document.getElementsByClassName('likeButton')[0] || document.getElementsByClassName('likedButton')[0];
                    let wrapImage = document.getElementsByClassName('_6tax')[0];
                    if (!wrapImage) return;
                    let idPage = wrapImage.getElementsByTagName('a')[0].getAttribute('href').split('/')[1]
                        || document.getElementById('PagesCoverElementContainerPagelet').getElementsByTagName('a')[0].getAttribute('href').split('/')[1];
                    const pageName = document.getElementById('seo_h1_tag').textContent || '';
                    let divContainer = createDevContainer(idPage, pageName);
                    divContainer.className = 'container-extension';
                    divContainer.style = "margin-right: 5px";
                    likeButtonPage.parentNode.style = "display: flex;align-items: center;flex-direction: row-reverse";
                    likeButtonPage.parentNode.append(divContainer);
                }
            }
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
                                        // check nếu bảng tin có header là đã chia sẻ từ album thì thêm 1 class để sửa lại bị trí
                                        if (item.getElementsByClassName('_1s31 i_axgck24rv f_axgck24r_').length > 0) {
                                            divContainer['className'] = 'container-extension fb_btn_userContentWrapper fix-position-button';
                                        } else {
                                            divContainer['className'] = 'container-extension fb_btn_userContentWrapper';
                                        }
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
                                        if (item.getElementsByClassName('_1s31 i_axgck24rv f_axgck24r_').length > 0) {
                                            divContainer['className'] = 'container-extension fb_btn_userContentWrapper fix-position-button';
                                        } else {
                                            divContainer['className'] = 'container-extension fb_btn_userContentWrapper';
                                        }
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
        let iconInner = `<div class=\'icon-add-source\' title=\'Thêm ${facebookNam} vào danh sách nguồn tin\'>
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
        buttonInner['innerHTML'] = iconInner + '<span class=\'data_result\' ></span> <span class="icon-success"></span>';

        // Hàm này khi click vào icon trên màn hình sẽ được gọi tới và mình sẽ xử lỹ sự kiện trong hàm này.
        function handleClickButton() {
            let divContainer = this;
            divContainer.className += ' fb-loading';
            // replaceClass(divContainer, 'fb_loading');
            let id = divContainer['getAttribute']('data-uid');
            // divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
            function createButtonLogin() {
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('data_result')[0];
                let notify = `<span> Bạn chưa <a href="${domainApi}/login?ref=${location.href}" style="display: initial" target="_blank">đăng nhập</a> vào SOCIALBOX </span> <br/>`;
                container['innerHTML'] = notify;
                divContainer['getElementsByClassName']('data_result')[0]['style']['display'] = 'flex';
                divContainer['removeEventListener']('click', divContainer)
            }

            function handleError(statusCode) {
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('data_result')[0];
                let notify = `<span> Xảy ra lỗi vui lòng thử lại sau. </span> <br/>`;
                if (statusCode === 403) {
                    notify = `<span> Bạn không có quyền thực hiện hành động này. </span> <br/>`;
                }
                container['innerHTML'] = notify;
                divContainer['getElementsByClassName']('data_result')[0]['style']['display'] = 'flex';
                divContainer['removeEventListener']('click', divContainer)
            }

            function createIconSuccess() {
                // ẩn icon đi
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('icon-success')[0];
                let iconSuccess = `<svg class="icon-success" width="18" height="18" viewBox="0 0 18 18">
                  <g id="add-source-tick" transform="translate(-1064 -172)">
                    <g id="Ellipse_97" data-name="Ellipse 97" transform="translate(1064 172)" fill="#fff" stroke="#36b37e" stroke-width="1">
                      <circle cx="9" cy="9" r="9" stroke="none"/>
                      <circle cx="9" cy="9" r="8.5" fill="none"/>
                    </g>
                    <g id="Layer_2" data-name="Layer 2" transform="translate(1064 172)">
                      <g id="plus">
                        <rect id="Rectangle_483" data-name="Rectangle 483" width="18" height="18" transform="translate(18 18) rotate(180)" fill="#0052cc" opacity="0"/>
                        <g id="Layer_2-2" data-name="Layer 2" transform="translate(0.922 0.922)">
                          <g id="checkmark-circle">
                            <rect id="Rectangle_502" data-name="Rectangle 502" width="16" height="16" transform="translate(0.078 0.078)" opacity="0"/>
                            <path id="Path_1331" data-name="Path 1331" d="M9.15,9.572a.676.676,0,0,0-.956.956l2.02,2.02a.653.653,0,0,0,.963-.034l4.712-5.385a.673.673,0,0,0-1.01-.889l-4.187,4.847Z" transform="translate(-3.613 -1.972)" fill="#36b37e"/>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>`;
                container['innerHTML'] = `${iconSuccess}`;
                divContainer['removeEventListener']('click', divContainer)
            }
            try {
                let Http = new XMLHttpRequest();
                // Khi gọi API hoàn tất ( thành công 200 hoặc 500, 404 ect)
                Http.addEventListener("load", (response) => {
                    removeClass(divContainer, 'fb-loading');
                    // Khi hết quyền truy cập vì k có token hoặc hết hạn thì tiến hành hiển thị ra thông báo lỗi
                    if (response.target.status === 401) {
                        createButtonLogin();
                    } else if (response.target.status === 200) {
                        createIconSuccess();
                    } else {
                        handleError(response.target.status);
                    }
                });
                // Lấy localStorage trong extension ra để dùng cho API
                let token = '';
                // khi lấy được token thì tiến hành gọi api
                setTimeout(() => {
                    chrome.storage.sync.get(['token'], function(tokens) {
                        token = tokens.token;
                        // check có token mới được gọi API
                        if (token) {
                            const mappingSourceType = {
                                'https://www.facebook.com': 'facebook',
                                'https://www.youtube.com': 'youtube'
                            };
                            let currentOriginUrl = location.origin;
                            let temp = [
                                `${currentOriginUrl}/${id}`
                            ];
                            // dùng https://sbapi2.staging để call api
                            // Chỉ nhận https
                            Http['open']('POST', `${domainApi}/api/source_admin/?source_type=facebook`);
                            Http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                            Http.setRequestHeader('authorization', `Bearer ${token}`);
                            Http['send'](JSON.stringify(temp));
                        } else {
                            removeClass(divContainer, 'fb-loading');
                            // tạo ra button đăng nhập
                            createButtonLogin();
                            // Xử lý hiển thị ra 1 button đường link sang trang login
                        }

                    });
                }, 500)
            } catch (e) {
                removeClass(divContainer, 'fb-loading');
                handleError(500);
            }
        }
        buttonInner['addEventListener']('click', handleClickButton);
        return buttonInner
    }

    if (document['location']['href']['indexOf']('facebook') > -1) {
        createHtml()
    };
})()
