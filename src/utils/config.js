import Hash from 'jshashes'
import http from './http'

const Wx = require('weixin-js-sdk');
const SHA1 = new Hash.SHA1;


class WX {

    ticket = '';

    wx = '';

    wraperConfig = () => {
        let timestamp = Date.parse(new Date());
        let nonceStr = 'fPE4DxkXGEs8VMCPG';
        let url = window.location.href;
        let strp = `jsapi_ticket=${this.ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
        let signature = SHA1.hex(strp);
        return {
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx97f3b4eb3693a30e', // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名
            jsApiList: ['chooseImage', 'uploadImage', 'previewImage'] // 必填，需要使用的JS接口列表
        }
    };

    getWx = async (props) => {
        // console.log(this.wraperConfig());
        if (this.ticket) {
            Wx.config(this.wraperConfig());
            this.wx = Wx
        } else {
            await this.getTicket(props);
            Wx.config(this.wraperConfig());
            this.wx = Wx
        }
    };

    getTicket = async (props) => {
        this.props = props;
        if (this.ticket) {
            return this.ticket
        }
        let resp = await http.get('https://www.hlfeilibao.com/get_ticket');
        if (resp.status) {
            this.ticket = resp.data.ticket
        }
    };
}


// wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: 'wx97f3b4eb3693a30e', // 必填，公众号的唯一标识
//     timestamp: '' , // 必填，生成签名的时间戳
//     nonceStr: '', // 必填，生成签名的随机串
//     signature: '',// 必填，签名
//     jsApiList: [] // 必填，需要使用的JS接口列表
// });


const getCode = (url, flag) => {
    if (flag) {
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx97f3b4eb3693a30e&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
    } else {
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx97f3b4eb3693a30e&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base#wechat_redirect`
    }


};

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

const dateFormat = (date = new Date()) => {
    let fmt = 'yyyy-MM-dd hh:mm';
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        // eslint-disable-next-line
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt
};

class User {

    openId = '';

    userInfo = '';

    access_token = '';

    getOpenid = async (props) => {
        this.props = props;
        let search = this.props.location.search;
        if (!search) {
            window.location = getCode(window.location.href)
        } else {
            let code = getQueryString('code');
            if (code) {
                let resp = await http.get('https://www.hlfeilibao.com/gong_openid', {code});
                this.openId = resp.status;
                // resp = await config.http.get('/', {openid:resp.openid});
                console.log(resp)
            }
        }
    };

    getOpenInfo = async (props) => {
        this.props = props;
        if (this.userInfo) {
            return this.userInfo
        }
        let search = this.props.location.search;
        if (!search) {
            window.location = getCode(window.location.href, true)
        } else {
            let code = getQueryString('code');
            if (code) {
                let resp = await http.get('https://www.hlfeilibao.com/getUserInfo', {code});
                if (resp.status) {
                    this.openId = resp.data.openid;
                    this.userInfo = resp.data;
                    this.access_token = resp.access_token;
                    return resp.data
                }
            }
        }
    };


    checkOpenid = async (props) => {
        this.openId || await this.getOpenid(props)
    }
}

const user = new User();
const wx = new WX();

export default {getCode, getQueryString, http, dateFormat, user, wx}