import Hash from 'jshashes'
import http from './http'

// wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: 'wx97f3b4eb3693a30e', // 必填，公众号的唯一标识
//     timestamp: '' , // 必填，生成签名的时间戳
//     nonceStr: '', // 必填，生成签名的随机串
//     signature: '',// 必填，签名
//     jsApiList: [] // 必填，需要使用的JS接口列表
// });


const getCode = (url)=>{
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx97f3b4eb3693a30e&redirect_uri=${encodeURI(url)}&response_type=code&scope=snsapi_base#wechat_redirect`
};

function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

export default {getCode, getQueryString}