(function(e) {
    const domainApi = 'https://sbapi2.staging';
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
            let linkResultItem = divContainer['getAttribute']('data-url');
            // let facebookName = divContainer['getAttribute']('data-fbname');
            function createButtonLogin() {
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('content-error')[0];
                let notify = `<span> Bạn chưa <a href="http://sbox.staging/login?ref=${location.href}" target="_blank">đăng nhập</a> vào SOCIALBOX </span> <br/>`;
                container['innerHTML'] = notify;
                divContainer['getElementsByClassName']('content-error')[0]['style']['display'] = 'flex';
                divContainer['removeEventListener']('click', divContainer)
            }

            function createIconSuccess() {
                // ẩn icon đi
                divContainer['getElementsByClassName']('icon-add-source')[0]['style']['display'] = 'none';
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
            let Http = new XMLHttpRequest();
            // Khi gọi API hoàn tất ( thành công 200 hoặc 500, 404 ect)
            Http.addEventListener("load", (response) => {
                // Khi hết quyền truy cập vì k có token hoặc hết hạn thì tiến hành hiển thị ra thông báo lỗi
                if (response.target.status === 401) {
                    createButtonLogin();
                }
                // Xử lý khi gọi API thành công
                if (response.target.status === 200 || response.target.status === 201) {
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
                    let temp = {
                        url: linkResultItem
                    };
                    Http['open']('POST', `${domainApi}/api/url_sources/`);
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

    if (document['location']['href']['indexOf']('google') > -1) {
        createHtml()
    };
})()
