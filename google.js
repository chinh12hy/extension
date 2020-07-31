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
        function handleCreateModuleExtension() {
            // Xử lý trong trang search result của google
            if (location.href.includes('search?')) {
                let listResult = document.getElementsByClassName('g');
                //getAttribute
                for (let index = 0; index < listResult.length; index++) {
                    let itemResult = listResult[index];
                    // Lọc ra những thằng là link 1 bài viết
                    if (!itemResult.getAttribute('data-hveid')) {
                        let labelResult = itemResult.getElementsByClassName('LC20lb DKV0Md')[0];
                        if (labelResult) {
                            let urlResult = labelResult.parentNode.getAttribute('href');
                            let divContainer = createDevContainer(urlResult);
                            divContainer['className'] = 'container-extension google-result-item';
                            labelResult.parentNode.parentNode.appendChild(divContainer);
                        }
                    } else {
                        if (!itemResult.getAttribute('data-ved')) {
                            let labelResult = itemResult.getElementsByClassName('LC20lb DKV0Md')[0];
                            let urlResult = labelResult.parentNode.getAttribute('href');
                            let divContainer = createDevContainer(urlResult);
                            // labelResult.parentNode.style = "display: flex; align-items: center;";
                            divContainer['className'] = 'container-extension google-result-item';
                            labelResult.parentNode.parentNode.appendChild(divContainer);
                        }
                    }
                }
                return;
            }
            setTimeout(function() {
                handleCreateModuleExtension()
            }, 2000)
        }
        handleCreateModuleExtension();
    }

    function createDevContainer(url) {
        let buttonInner = document['createElement']('div');
        let iconInner = `<div class='icon-add-source' title='Thêm ${url} vào danh sách nguồn'>
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
        buttonInner['setAttribute']('data-url', url);
        document['getElementsByTagName']('body')[0]['appendChild'](buttonInner);
        buttonInner['innerHTML'] = iconInner + '<span class=\'content-error\' ></span> <span class="icon-success"></span>';

        // Hàm xử lý khi click icon của extension
        function handleClickButton() {
            let divContainer = this;
            replaceClass(divContainer, 'google-loading');
            let linkResultItem = divContainer['getAttribute']('data-url');
            divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
            function createButtonLogin() {
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('content-error')[0];
                let notify = `<span> Bạn chưa <a href="${domainApi}/login?ref=${location.href}" target="_blank">đăng nhập</a> vào SOCIALBOX </span> <br/>`;
                container['innerHTML'] = notify;
                divContainer['getElementsByClassName']('content-error')[0]['style']['display'] = 'flex';
                divContainer['removeEventListener']('click', divContainer)
            }

            function handleError(statusCode) {
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('content-error')[0];
                let notify = `<span> Xảy ra lỗi vui lòng thử lại sau. </span> <br/>`;
                if (statusCode === 403) {
                    notify = `<span> Bạn không có quyền thực hiện hành động này. </span> <br/>`;
                }
                container['innerHTML'] = notify;
                divContainer['getElementsByClassName']('content-error')[0]['style']['display'] = 'flex';
                divContainer['removeEventListener']('click', divContainer)
            }

            function createIconSuccess() {
                // ẩn icon đi
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('icon-success')[0];
                let iconSuccess = `<svg width="18" height="19" viewBox="0 0 29.9 34.255">
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
                    </svg>`;
                container['innerHTML'] = `${iconSuccess}`;
                divContainer['removeEventListener']('click', handleClickButton)
            }
            try {
                let Http = new XMLHttpRequest();
                // Khi gọi API hoàn tất ( thành công 200 hoặc 500, 404 ect)
                Http.addEventListener("load", (response) => {
                    removeClass(divContainer, 'google-loading');
                    // Khi hết quyền truy cập vì k có token hoặc hết hạn thì tiến hành hiển thị ra thông báo lỗi
                    if (response.target.status === 401) {
                        createButtonLogin();
                    } else if (response.target.status === 200 || response.target.status === 201) {
                        createIconSuccess();
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
                        let temp = {
                            url: linkResultItem
                        };
                        Http['open']('POST', `${domainApi}/api/url_sources/`);
                        Http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                        Http.setRequestHeader('authorization', `Bearer ${token}`);
                        Http['send'](JSON.stringify(temp));
                    } else {
                        removeClass(divContainer, 'google-loading');
                        // tạo ra button đăng nhập
                        createButtonLogin();
                        // Xử lý hiển thị ra 1 button đường link sang trang login
                    }

                });
            } catch (e) {
                removeClass(divContainer, 'google-loading');
                handleError(500);
            }

        }
        buttonInner['addEventListener']('click', handleClickButton);
        return buttonInner
    }

    if (document['location']['href']['indexOf']('google') > -1) {
        createHtml()
    };
})()
