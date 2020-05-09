
(function(e) {
    function createHtml() {
        let listButton = document['getElementsByClassName']('container-extension');
        for (let index = 0; index < listButton['length']; index++) {
            listButton[index]['outerHTML'] = ''
        };

        function handleCreateModuleExtension() {
            // Xử lý thêm button khi đang xem video youtube
            if (location.href.includes('https://www.youtube.com/watch')) {
                try {
                    if (document.getElementsByClassName('yt-simple-endpoint')) {
                        let wrapExtensionTag = document.getElementById('meta');
                        let nameChanelYoutube = document.getElementsByClassName('ytd-video-owner-renderer')[3];
                        let linkTag = nameChanelYoutube.getElementsByTagName('a')[0];
                        let divWrapExtension = wrapExtensionTag.getElementsByClassName('container-extension')[0];
                        if (divWrapExtension) {
                            const currentHref = linkTag.getAttribute('href');
                            const buttonHref = divWrapExtension.getAttribute('data-uid');
                            // check link giữa channel và data trong button khác nhau thì sẽ tiến hành xóa cái button cũ đi tạo cái button mới với link của channel hiện tại
                            if (currentHref !== buttonHref) {
                                wrapExtensionTag.removeChild(divWrapExtension);
                                let idChanel = linkTag.getAttribute('href');
                                let divContainer = createDevContainer(idChanel);
                                wrapExtensionTag.style = "position: relative";
                                divContainer['className'] = 'container-extension yt-video-owner';
                                wrapExtensionTag.appendChild(divContainer);
                            }
                        }
                        if (linkTag && wrapExtensionTag['getElementsByClassName']('container-extension')['length'] === 0) {
                            let idChanel = linkTag.getAttribute('href');
                            let divContainer = createDevContainer(idChanel);
                            divContainer['className'] = 'container-extension yt-video-owner';
                            wrapExtensionTag.style = "position: relative";
                            wrapExtensionTag.appendChild(divContainer);
                        }
                    };
                } catch (error) {};
            }

            // Xử lý khi đang trong home của 1 kênh youtube
            if (location.href.includes('https://www.youtube.com/channel')) {
                // Xử lý cho chanel ở đây
                if (document.getElementById('channel-name')) {
                    let nameChannelYoutube = document.getElementById('channel-name');
                    if (nameChannelYoutube['getElementsByClassName']('container-extension')['length'] === 0) {
                        let idChanel = location.href.split('https://www.youtube.com')[1];
                        let divContainer = createDevContainer(idChanel);
                        nameChannelYoutube.style = "display: flex; align-items: center;";
                        divContainer['className'] = 'container-extension yt-channel-detail';
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
                            if (itemResult['getElementsByClassName']('container-extension')['length'] === 0) {
                                let tagLink = itemResult.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')[0];
                                let idChanel = tagLink.getAttribute('href');
                                if (idChanel.includes('channel')) {
                                    let divContainer = createDevContainer(idChanel);
                                    itemResult.style = "position: relative";
                                    divContainer['className'] = 'container-extension yt-channel-owner';
                                    itemResult.appendChild(divContainer);
                                } else {
                                    // xử thêm 1 button xóa ản nó đi để tránh chạy for vô hạn thừa thãi nặng chương trình
                                    let divContainer = createDevContainer(idChanel);
                                    divContainer['className'] = 'container-extension yt-channel-owner';
                                    divContainer.style = "display: none";
                                    itemResult.appendChild(divContainer);
                                }
                            }
                        }
                    }
                }
            }


            // Xử lý khi đang trong trang chủ youtube
            if (location.pathname === '/') {
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
                                if (item.getElementsByClassName('container-extension').length === 0) {
                                    if (id.includes('channel')) {
                                        let divContainer = createDevContainer(id);
                                        tagLink.style = "display: flex; align-items: center;flex-direction: column";
                                        divContainer['className'] = 'container-extension yt-item-home';
                                        item.style = "position: relative";
                                        item.appendChild(divContainer);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Xử lý trong trang trending
            if (location.href.includes('youtube.com/feed/trending')) {
                let listTrendingVideo = document.getElementsByTagName('ytd-video-renderer');
                for (let index = 0; index < listTrendingVideo.length; index++) {
                    let videoTrending = listTrendingVideo[index];
                    if (videoTrending.getElementsByClassName('container-extension').length === 0) {
                        let url = videoTrending.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')[0].getAttribute('href');
                        if (url.includes('channel')) {
                            let divContainer = createDevContainer(url);
                            videoTrending.style = "display: flex; align-items: center;flex-direction: column";
                            divContainer['className'] = 'container-extension yt-item-trending';
                            videoTrending.style = "position: relative";
                            videoTrending.appendChild(divContainer);
                        } else {
                            // trường hợp này tạo để đấy để tránh bị chạy vòng lặp vô hạn ở cái điều kiện ở trên
                            let divContainer = createDevContainer(url);
                            divContainer.style = "display: none";
                            videoTrending.appendChild(divContainer);
                        }
                    }
                }
                return
            }
            setTimeout(function() {
                handleCreateModuleExtension()
            }, 2000)
        }
        handleCreateModuleExtension();
    }

    function createDevContainer(userId) {
        let buttonInner = document['createElement']('div');
        let iconInner = `<div class='qcuidfb_icon' title='Thêm vào danh sách nguồn'>
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
                let notify = `<span> Bạn chưa <a href="http://sbox.staging/login?ref=youtube" target="_blank">đăng nhập</a> vào SOCIALBOX </span> <br/>`;
                container['innerHTML'] = notify;
                divContainer['getElementsByClassName']('data_result')[0]['style']['display'] = 'flex';
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
