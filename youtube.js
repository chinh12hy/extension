
(function(e) {
    function createHtml() {
        let listButton = document['getElementsByClassName']('qcuidfb_btn_search');
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
            // TODO YOUTUBE ---------------------------------------------------------------------------------------------------------------
            // Xử lý ở youtube
            // Xử lý thêm button khi đang xem video youtube
            if (location.href.includes('https://www.youtube.com/watch')) {
                try {
                    if (document.getElementsByClassName('yt-simple-endpoint')) {
                        let nameChanelYoutube = document.getElementsByClassName('ytd-video-owner-renderer')[3];
                        let linkTag = nameChanelYoutube.getElementsByTagName('a')[0];
                        let divWrapExtension = linkTag.parentNode.getElementsByClassName('qcuidfb_btn_search')[0];
                        if (divWrapExtension) {
                            const currentHref = linkTag.getAttribute('href');
                            const buttonHref = divWrapExtension.getAttribute('data-uid');
                            if (currentHref !== buttonHref) {
                                linkTag.parentNode.removeChild(divWrapExtension);
                                let idChanel = linkTag.getAttribute('href');
                                let divContainer = createDevContainer(idChanel);
                                linkTag.parentNode.style = "display: flex; align-items: center;";
                                divContainer['className'] = 'qcuidfb_btn_search yt-video-owner';
                                linkTag.parentNode.appendChild(divContainer);
                            }
                        }
                        if (linkTag && nameChanelYoutube['getElementsByClassName']('qcuidfb_btn_search')['length'] === 0) {
                            let idChanel = linkTag.getAttribute('href');
                            let divContainer = createDevContainer(idChanel);
                            linkTag.parentNode.style = "display: flex; align-items: center;";
                            divContainer['className'] = 'qcuidfb_btn_search yt-video-owner';
                            linkTag.parentNode.appendChild(divContainer);
                        }
                    };
                } catch (error) {};
            }

            // Xử lý khi đang trong home của 1 kênh youtube
            if (location.href.includes('https://www.youtube.com/channel')) {
                // Xử lý cho chanel ở đây
                if (document.getElementById('channel-name')) {
                    let nameChannelYoutube = document.getElementById('channel-name');
                    if (nameChannelYoutube['getElementsByClassName']('qcuidfb_btn_search')['length'] === 0) {
                        let idChanel = location.href.split('https://www.youtube.com')[1];
                        let divContainer = createDevContainer(idChanel);
                        console.log('divContainer', divContainer);
                        nameChannelYoutube.style = "display: flex; align-items: center;";
                        divContainer['className'] = 'qcuidfb_btn_search yt-channel-detail';
                        nameChannelYoutube.appendChild(divContainer);
                    }
                }
            }

            // Xử lý khi đang trong trang search youtube
            if (location.href.includes('https://www.youtube.com/results')) {
                let contentResults = document.getElementsByClassName('ytd-item-section-renderer');
                for (let index = 0; index < contentResults.length; index++) {
                    let listItemResult = contentResults[index].getElementsByTagName('ytd-video-renderer');
                    if (listItemResult && listItemResult.length > 0) {
                        for (let i = 0; i < listItemResult.length; i++) {
                            let itemResult = listItemResult[i];
                            if (itemResult['getElementsByClassName']('qcuidfb_btn_search')['length'] === 0) {
                                let tagLink = itemResult.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')[0];
                                let idChanel = tagLink.getAttribute('href');
                                if (idChanel.includes('channel')) {
                                    let divContainer = createDevContainer(idChanel);
                                    itemResult.style = "position: relative";
                                    divContainer['className'] = 'qcuidfb_btn_search yt-channel-owner';
                                    itemResult.appendChild(divContainer);
                                }
                            }
                        }
                    }
                }
            }


            // Xử lý khi đang trong trang chủ youtube
            if (location.origin === location.href.substring(0, 23)) {
                // console.log(document.getElementById('contents'));
                let listYoutubeCard = document.getElementsByTagName('ytd-rich-item-renderer');
                for (let index = 0; index < listYoutubeCard.length; index++) {
                    let item = listYoutubeCard[index];
                    // Điều kiện để lọc ra các thằng có id
                    if (item.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string').length === 1) {
                        // Tìm ra thẻ a có chứa link youtube
                        if (item.getElementsByClassName('yt-simple-endpoint style-scope ytd-rich-grid-video-renderer').length > 0) {
                            let tagLink = item.getElementsByClassName('yt-simple-endpoint style-scope ytd-rich-grid-video-renderer')[0];
                            if (tagLink) {
                                let id = tagLink.getAttribute('href');
                                if (item.getElementsByClassName('qcuidfb_btn_search').length === 0) {
                                    if (id.includes('channel')) {
                                        let divContainer = createDevContainer(id);
                                        tagLink.style = "display: flex; align-items: center;flex-direction: column";
                                        divContainer['className'] = 'qcuidfb_btn_search yt-item-home';
                                        item.style = "position: relative";
                                        item.appendChild(divContainer);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // END youtube
            // TODO YOUTUBE ---------------------------------------------------------------------------------------------------------------
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
            '<span class=\'data_result\' ></span> <span class="icon-success"></span>';

        // Hàm này khi click vào icon trên màn hình sẽ được gọi tới và mình sẽ xử lỹ sự kiện trong hàm này.
        function handleClickButton() {
            let divContainer = this;
            // thêm loading class
            // replaceClass(divContainer, 'qcuidfb_loading');
            let id = divContainer['getAttribute']('data-uid');
            // let facebookName = divContainer['getAttribute']('data-fbname');
            function createButtonLogin() {
                let currentOriginUrl = location.origin;
                const mappingCurrentUrl = {
                    'https://www.facebook.com': 'facebook',
                    'https://www.youtube.com': 'youtube'
                }
                // ẩn icon đi
                divContainer['getElementsByClassName']('qcuidfb_icon')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('data_result')[0];
                let notify = `<span> Bạn chưa đăng nhập vào SOCIALBOX </span> <br/>`;
                let linkLogin = `<span> vui lòng click vào <a href="http://sbox.staging/login?ref=${mappingCurrentUrl[currentOriginUrl]}" target="_blank"> đây </a> để tiếp tục sử dụng sản phẩm </span>`
                container['innerHTML'] = `${notify} ${linkLogin}`;
                divContainer['getElementsByClassName']('data_result')[0]['style']['display'] = 'block';
                divContainer['removeEventListener']('click', divContainer)
            }

            function createIconSuccess() {
                // ẩn icon đi
                divContainer['getElementsByClassName']('qcuidfb_icon')[0]['style']['display'] = 'none';
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

    if (document['location']['href']['indexOf']('youtube') > -1) {
        createHtml()
    };
})()
