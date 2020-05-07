// FB url hoặc các link mình cần lấy thông tin
function checkHost(url) {
    let currentUrl = new URL(url)['host'];
    let isFacebook = currentUrl['indexOf']('facebook.com') > -1;
    let isYoutube = currentUrl['indexOf']('youtube.com') > -1;
    if (isFacebook || isYoutube || currentUrl['indexOf']('pages.fm') > -1) {
        return true
    };
    return false
}

function getCookies(domain, name)
{
    // Lấy cookies
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        // Lưu cookie vừa lấy vào trong localStorage của extension
        if (cookie) {
            chrome.storage.sync.set({'token': cookie.value}, function() {
                console.log('đã lưu vào storage');
                console.log(cookie)
            });
        } else {
            console.log('cookie không có hoặc đã hết hạn');
            // Xóa hết token cũ đi.
            chrome.storage.sync.clear(function() {});
            // sẽ xử lý để bắt người dùng đăng nhập trên extension hoặc là vào sb.1data đăng nhập
        }
    });
}
getCookies("http://sbox.staging/", "sbtoken");
// Check khi nào url trên tab chrome thay đổi thì hoạt động hàm này
chrome['tabs']['onUpdated']['addListener'](function(tabID, response) {
    if (response['status'] === 'complete') {
        chrome['tabs']['get'](tabID, function(resp) {
            if (checkHost(resp['url'])) {
                // Lấy token
                console.log('resp: ', resp);
                getCookies("http://sbox.staging/", "sbtoken");
                // Sử dụng file socialbox.js để tạo thêm các button trong tab google
                chrome['tabs']['executeScript'](tabID, {
                    file: 'socialbox.js'
                }, function() {});
                // Sử dụng css để thêm style cho button
                chrome['tabs']['insertCSS'](tabID, {
                    file: 'socialbox.css'
                })
            }

        })
    }
});
