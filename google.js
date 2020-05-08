(function(e) {
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
                            divContainer['className'] = 'qcuidfb_btn_search google-result-item';
                            labelResult.parentNode.parentNode.appendChild(divContainer);
                        }
                    } else {
                        if (!itemResult.getAttribute('data-ved')) {
                            let labelResult = itemResult.getElementsByClassName('LC20lb DKV0Md')[0];
                            let urlResult = labelResult.parentNode.getAttribute('href');
                            let divContainer = createDevContainer(urlResult);
                            // labelResult.parentNode.style = "display: flex; align-items: center;";
                            divContainer['className'] = 'qcuidfb_btn_search google-result-item';
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
        let iconInner = `<span class=\'qcuidfb_icon\' title=\'Thêm ${url}'></span>`
        buttonInner['className'] = 'qcuidfb_btn_search';
        buttonInner['setAttribute']('data-url', url);
        document['getElementsByTagName']('body')[0]['appendChild'](buttonInner);
        buttonInner['innerHTML'] = iconInner +
            '<img class=\'qcuidfb_img_loading\' src=\'https://quangcaouidfb.com/images/loading-blue.gif\'/>' +
            '<span class=\'content-error\' ></span> <span class="icon-success"></span>';

        // Hàm xử lý khi click icon của extension
        function handleClickButton() {
            let divContainer = this;
            let linkResultItem = divContainer['getAttribute']('data-url');
            // let facebookName = divContainer['getAttribute']('data-fbname');
            function createButtonLogin() {
                divContainer['getElementsByClassName']('qcuidfb_icon')[0]['style']['display'] = 'none';
                let container = divContainer['getElementsByClassName']('content-error')[0];
                let notify = `<span> Bạn chưa đăng nhập vào SOCIALBOX </span> <br/>`;
                let linkLogin = `<span> vui lòng click vào <a href="http://sbox.staging/login?ref=google" target="_blank"> đây </a> để tiếp tục sử dụng sản phẩm </span>`
                container['innerHTML'] = `${notify} ${linkLogin}`;
                divContainer['getElementsByClassName']('content-error')[0]['style']['display'] = 'block';
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
                    let temp = {
                        url: linkResultItem
                    };
                    Http['open']('POST', 'https://sbapi2.staging/api/waiting_sources/');
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
