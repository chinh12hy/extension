
(function(e) {
    const domainApi = 'https://beta.sbapi.1data.vn';
    const domain = 'https://beta.sb.1data.vn';

    function replaceClass(dom, newClass) {
        let newClassStr = ' ' + newClass;
        dom['className'] = dom['className']['replace'](newClassStr, '');
        dom['className'] = dom['className'] + newClassStr
    }

    function removeClass(dom, className) {
        dom['className'] = dom['className']['replace'](className, '')
    }
    function createHtml() {
        let listButton = document['getElementsByClassName']('container-extension');
        for (let index = 0; index < listButton['length']; index++) {
            listButton[index]['outerHTML'] = ''
        };

        function handleCreateModuleExtension() {
            // Xử lý thêm button khi đang xem video youtube
            if (location.href.includes('https://www.youtube.com/watch')) {
                try {
                    if (document.getElementsByClassName('ytd-subscribe-button-renderer').length > 0) {
                        if (document.getElementsByClassName('yt-simple-endpoint')) {
                            // console.log('image: ', document.getElementsByTagName('yt-img-shadow'))
                            let wrapExtensionTag = document.getElementById('meta');
                            let nameChanelYoutube = document.getElementsByClassName('ytd-video-owner-renderer')[3];
                            let linkTag = nameChanelYoutube.getElementsByTagName('a')[0];
                            let divWrapExtension = wrapExtensionTag.getElementsByClassName('container-extension')[0];
                            let channelName = linkTag.textContent;
                            let wrapChannelNameTag = wrapExtensionTag.getElementsByTagName('yt-formatted-string')[0];
                            document.getElementsByTagName('ytd-video-owner-renderer')[0].style = "position: relative";
                            if (divWrapExtension) {
                                const currentHref = linkTag.getAttribute('href');
                                const buttonHref = divWrapExtension.getAttribute('data-uid');
                                // check link giữa channel và data trong button khác nhau thì sẽ tiến hành xóa cái button cũ đi tạo cái button mới với link của channel hiện tại
                                if (currentHref !== buttonHref) {
                                    wrapChannelNameTag.parentNode.removeChild(divWrapExtension);
                                    let idChanel = linkTag.getAttribute('href');
                                    let divContainer = createDevContainer(idChanel, channelName);
                                    wrapChannelNameTag.parentNode.style = "display: flex";
                                    divContainer['className'] = 'container-extension yt-video-owner';
                                    wrapChannelNameTag.parentNode.append(divContainer);
                                }
                            }
                            if (linkTag && wrapExtensionTag['getElementsByClassName']('container-extension')['length'] === 0) {
                                let idChanel = linkTag.getAttribute('href');
                                let divContainer = createDevContainer(idChanel, channelName);
                                divContainer['className'] = 'container-extension yt-video-owner';
                                wrapChannelNameTag.parentNode.style = "display: flex";
                                wrapChannelNameTag.parentNode.append(divContainer);
                                    // document.getElementsByClassName('ytd-subscribe-button-renderer')[0].append(divContainer)
                            }
                        };
                    }
                } catch (error) {};
            }

            // Xử lý khi đang trong home của 1 kênh youtube
            if (location.href.includes('https://www.youtube.com/channel') || location.href.includes('https://www.youtube.com/user')) {
                // Xử lý cho chanel ở đây
                let bannerChannel = document.getElementById('banner-editor');
                let miniChannels = document.getElementsByTagName('ytd-mini-channel-renderer');
                // Nếu trang này có hiển thị các kênh liên quan trong youtube
                if (document.getElementById('inner-header-container') && miniChannels.length > 0) {
                    for(let index =0; index < miniChannels.length; index++) {
                        let miniChannel = miniChannels[index];
                        if (miniChannel.getElementsByClassName('container-extension').length === 0) {
                            let tagLink = miniChannel.getElementsByTagName('a')[0];
                            let miniChannelName = tagLink.getElementsByTagName('span')[0].textContent;
                            let miniChannelID = tagLink.getAttribute('href');
                            let divContainer = createDevContainer(miniChannelID, miniChannelName);
                            tagLink.parentNode.style = "position: relative";
                            divContainer['className'] = 'container-extension yt-mini-channel';
                            tagLink.parentNode.append(divContainer);
                        }
                    }
                }

                if (bannerChannel && location.href.includes('https://www.youtube.com/channel')) {
                    if (document.getElementById('channel-name')) {
                        // console.log('paper-tab: ', document.getElementsByTagName('paper-tab'))
                        let containerHeader = document.getElementById('inner-header-container');
                        // let channelName = containerHeader.childNodes[0].getElementsByTagName('ytd-channel-name')[0].getElementsByTagName('yt-formatted-string')[0].textContent;
                        if (containerHeader['getElementsByClassName']('container-extension')['length'] === 0) {
                            let content = containerHeader.childNodes[0].getElementsByTagName('ytd-channel-name')[0];
                            let idChanel = location.href.split('https://www.youtube.com')[1];
                            let divContainer = createDevContainer(idChanel);
                            content.style = "display:flex;align-items:center";
                            divContainer['className'] = 'container-extension yt-channel-detail';
                            content.appendChild(divContainer);
                        }
                    }
                }
            } else {
                // Tiến hành xóa các channel được recoment vì khi sang trang khác thì cái html nó vẫn còn dẫn đến khi vào một trang khác có các recoment trang youtube khác
                // thì cái đống ý lại hiển thị ra cái trang facebook từ trước dẫn đến bị sai chức năng button
                let miniChannels = document.getElementsByTagName('ytd-mini-channel-renderer');
                for (index = miniChannels.length - 1; index >= 0; index--) {
                    miniChannels[index].parentNode.removeChild(miniChannels[index]);
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
                                if (tagLink) {
                                    let channelName = tagLink && tagLink.textContent || '';
                                    let channelID = tagLink.getAttribute('href');
                                    if (channelID.includes('channel')) {
                                        let divContainer = createDevContainer(channelID, channelName);
                                        itemResult.style = "position: relative";
                                        divContainer['className'] = 'container-extension yt-channel-owner';
                                        itemResult.appendChild(divContainer);
                                    } else {
                                        // xử thêm 1 button xóa ản nó đi để tránh chạy for vô hạn thừa thãi nặng chương trình
                                        let divContainer = createDevContainer(channelID);
                                        divContainer['className'] = 'container-extension yt-channel-owner';
                                        divContainer.style = "display: none";
                                        itemResult.appendChild(divContainer);
                                    }
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
                                let channelID = tagLink.getAttribute('href');
                                if (item.getElementsByClassName('container-extension').length === 0) {
                                    if (channelID.includes('channel')) {
                                        let channelName = tagLink.getAttribute('title') || '';
                                        let divContainer = createDevContainer(channelID, channelName);
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

    function createDevContainer(channelID, channelName = '') {
        let buttonInner = document['createElement']('div');
        let iconInner = `<div class='icon-add-source' title='Thêm ${channelName} vào danh sách nguồn tin'>
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
        buttonInner['setAttribute']('data-uid', channelID);
        document['getElementsByTagName']('body')[0]['appendChild'](buttonInner);
        buttonInner['innerHTML'] = iconInner + '<span class=\'data_result\' ></span> <span class="icon-success"></span>';

        // Hàm này khi click vào icon trên màn hình sẽ được gọi tới và mình sẽ xử lỹ sự kiện trong hàm này.
        function handleClickButton() {
            let divContainer = this;
            // thêm loading class
            replaceClass(divContainer, 'youtube_loading');
            let id = divContainer['getAttribute']('data-uid');
            divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
            // let facebookName = divContainer['getAttribute']('data-fbname');
            function createButtonLogin() {
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('data_result')[0];
                let notify = `<span> Bạn chưa <a href="${domain}/login?ref=${location.href}" target="_blank">đăng nhập</a> vào SOCIALBOX </span> <br/>`;
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

            function createIconSuccess(sourceInfo) {
                // ẩn icon đi
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('icon-success')[0];
                let iconSuccess = `<a href="${domain}/sources/${sourceInfo.id}" class="icon-success" target="_blank" title="Click xem thông tin của nguồn tin ${sourceInfo.name}">
                    <svg width="18" height="19" viewBox="0 0 29.9 34.255">
                      <g id="Group_1118" data-name="Group 1118" transform="translate(-200.999 -156.193)">
                        <g id="Group_1970" data-name="Group 1970">
                          <g id="Group_1969" data-name="Group 1969">
                            <g id="Polygon_1" data-name="Polygon 1" transform="translate(230.898 156.193) rotate(90)" fill="none">
                              <path d="M22.793,0a5,5,0,0,1,4.339,2.515l5.7,9.95a5,5,0,0,1,0,4.971l-5.7,9.95A5,5,0,0,1,22.793,29.9H11.462a5,5,0,0,1-4.339-2.515l-5.7-9.95a5,5,0,0,1,0-4.971l5.7-9.95A5,5,0,0,1,11.462,0Z" stroke="none"/>
                              <path d="M 11.46182250976563 3.000003814697266 C 10.74678230285645 3.000003814697266 10.08180236816406 3.385433197021484 9.726381301879883 4.005893707275391 L 4.026792526245117 13.95574378967285 C 3.675542831420898 14.56893348693848 3.675542831420898 15.33077430725098 4.026802062988281 15.9439640045166 L 9.726381301879883 25.89382362365723 C 10.0817928314209 26.51427459716797 10.74677276611328 26.89970397949219 11.46182250976563 26.89970397949219 L 22.79312133789063 26.89970397949219 C 23.5081615447998 26.89970397949219 24.17315292358398 26.51426315307617 24.52856063842773 25.89381408691406 L 30.22814178466797 15.94397354125977 C 30.57939147949219 15.33078384399414 30.57939147949219 14.56892395019531 30.22814178466797 13.95574378967285 L 24.52857208251953 4.005903244018555 C 24.17315292358398 3.385444641113281 23.5081615447998 3.000003814697266 22.79312133789063 3.000003814697266 L 11.46182250976563 3.000003814697266 M 11.46182250976563 3.814697265625e-06 L 22.79312133789063 3.814697265625e-06 C 24.58552169799805 3.814697265625e-06 26.24079132080078 0.9594230651855469 27.13172149658203 2.514724731445313 L 32.83130264282227 12.46457481384277 C 33.71317291259766 14.00408363342285 33.71317291259766 15.8956241607666 32.83130264282227 17.43513488769531 L 27.13172149658203 27.38498306274414 C 26.24079132080078 28.94028472900391 24.58552169799805 29.89970397949219 22.79312133789063 29.89970397949219 L 11.46182250976563 29.89970397949219 C 9.669422149658203 29.89970397949219 8.014141082763672 28.94028472900391 7.123222351074219 27.38498306274414 L 1.423641204833984 17.43513488769531 C 0.5417633056640625 15.8956241607666 0.5417633056640625 14.00408363342285 1.423641204833984 12.46457481384277 L 7.123231887817383 2.514724731445313 C 8.014152526855469 0.9594230651855469 9.669422149658203 3.814697265625e-06 11.46182250976563 3.814697265625e-06 Z" stroke="none" fill="#0052cc"/>
                            </g>
                          </g>
                        </g>
                        <g id="Group_1093" data-name="Group 1093" transform="translate(201.21 164.059)">
                          <g id="Group_1090" data-name="Group 1090" transform="matrix(-0.899, -0.438, 0.438, -0.899, 16.364, 21.495)">
                            <path id="Path_248" data-name="Path 248" d="M14.463,9.673A29.031,29.031,0,0,0,6.1,7.164L6.964,0,5.986,1.03A27.73,27.73,0,0,0,.212,11.262L0,11.955l.719-.088c6.947-.851,13.505-1.3,13.571-1.3l1.783-.12Z" transform="matrix(0.978, 0.208, -0.208, 0.978, 2.486, 0)" fill="#ff5630"/>
                          </g>
                        </g>
                      </g>
                    </svg>
                </a>`;
                container['innerHTML'] = `${iconSuccess}`;
                divContainer.removeEventListener('click', handleClickButton)
            }
            try {
                let Http = new XMLHttpRequest();
                // Khi gọi API hoàn tất ( thành công 200 hoặc 500, 404 ect)
                Http.addEventListener("load", (response) => {
                    removeClass(divContainer, 'youtube_loading');
                    // Khi hết quyền truy cập vì k có token hoặc hết hạn thì tiến hành hiển thị ra thông báo lỗi
                    if (response.target.status === 401) {
                        createButtonLogin();
                    } else if (response.target.status === 200) {
                        const sourceInfo = JSON.parse(response.target.response)[0];
                        createIconSuccess(sourceInfo);
                    } else {
                        handleError(response.target.status);
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
                        Http['open']('POST', `${domainApi}/api/source_admin/?source_type=${mappingSourceType[currentOriginUrl]}`);
                        Http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                        Http.setRequestHeader('authorization', `Bearer ${token}`);
                        Http['send'](JSON.stringify(temp));
                    } else {
                        removeClass(divContainer, 'youtube_loading');
                        // tạo ra button đăng nhập
                        createButtonLogin();
                        // Xử lý hiển thị ra 1 button đường link sang trang login
                    }
                });
            } catch (e) {
                removeClass(divContainer, 'youtube_loading');
                handleError(500);
            }
        }
        buttonInner['addEventListener']('click', handleClickButton);
        return buttonInner
    }

    if (document['location']['href']['indexOf']('youtube') > -1) {
        createHtml()
    };
})()
