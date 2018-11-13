class Unit {
    constructor() {

    }

    //返回状态接口
    retStatus(status, cont) {
        let stateJson = {
            state : status,
            msg: '',
            data : []
        }
        if(status == 1) {
            stateJson.data = cont
        } else {
            stateJson.msg = cont
        }
        return stateJson;
    }

    //生成timestamp格式
    exDate(time, type = 0) {
        Date.prototype.format = function(format) {
            var o = {
                "M+" : this.getMonth() + 1,// month
                "d+" : this.getDate(),// day
                "h+" : this.getHours(),// hour
                "m+" : this.getMinutes(),// minute
                "s+" : this.getSeconds(),// second
                "q+" : Math.floor((this.getMonth() + 3) / 3),// quarter
                "S" : this.getMilliseconds()
            // millisecond
            };
            if (/(y+)/.test(format) || /(Y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for ( var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        };
        let exDate;
        if( type == 0 ) {
            exDate = new Date(time).format("yyyy-MM-dd hh:mm:ss"); 
        } else if(type == 1) {
            exDate = new Date(time).format("hh:mm MM/dd"); 
        } else if(type == 2) {
            exDate = new Date(time).format("MM/dd ");             
        }
        return exDate;
    }


    dateCn(time) {
        let chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
        let chnUnitSection = ["","万","亿","万亿","亿亿"];
        let chnUnitChar = ["","十","百","千"];
        function SectionToChinese(section){
            var strIns = '', chnStr = '';
            var unitPos = 0;
            var zero = true;
            while(section > 0){
                var v = section % 10;
                if(v === 0){
                if(!zero){
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
                }else{
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
                }
                unitPos++;
                section = Math.floor(section / 10);
            }
            return chnStr;
        }

        function NumberToChinese(num){
            var unitPos = 0;
            var strIns = '', chnStr = '';
            var needZero = false;
           
            if(num === 0){
              return chnNumChar[0];
            }
           
            while(num > 0){
              var section = num % 10000;
              if(needZero){
                chnStr = chnNumChar[0] + chnStr;
              }
              strIns = SectionToChinese(section);
              strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
              chnStr = strIns + chnStr;
              needZero = (section < 1000) && (section > 0);
              num = Math.floor(num / 10000);
              unitPos++;
            }
           
            return chnStr;
        }

        let now = new Date(time);
        let mon = now.getMonth() + 1;
        let day = now.getDate();
        let hou = now.getHours();
        let min = now.getMinutes();

        let dateStr = `${NumberToChinese(mon)}月${NumberToChinese(day)}日${NumberToChinese(hou)}点${NumberToChinese(min)}分`;
        dateStr = dateStr.replace(/一十/g, '十');
        return dateStr;
    }

    //验证手机号码
    isPhone(iphone) {
        let str = String(iphone);  
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
        if (!myreg.test(str)) {  
            return false;  
        } else {  
            return true;  
        }  
    }
    
    //验证邮箱
    isEmail(email) {
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
        if(!reg.test(email)){ 
    　　　　return false;
    　　}else{
    　　　　return true;
    　　}
    }
}

module.exports = Unit;