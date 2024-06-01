/*!
 * calendar v1.0.0
 * Chinese lunar calendar
 * https://passer-by.com/calendar/
 *
 * Copyright (c) 2022-present, HaoLe Zheng
 *
 * Released under the MIT License
 * https://github.com/mumuy/calendar
 *
 * Created on: 2023-09-22
 */
!function(a,l){"object"==typeof exports&&"undefined"!=typeof module?module.exports=l():"function"==typeof define&&define.amd?define(l):(a="undefined"!=typeof globalThis?globalThis:a||self).calendar=l()}(this,(function(){"use strict";var a=["日","一","二","三","四","五","六"];function l(a,l,n){return Date.UTC(a,l-1,n,0,0,0)}function n(l){var n=new Date(l),k=n.getDay();return{date:n.toISOString().substr(0,10),sYear:n.getFullYear(),sMonth:n.getMonth()+1,sDay:n.getDate(),week:k,weekZH:"星期"+a[k]}}var k=1900,r=2100,t=["iuo","in0","19bg","l6l","1kj0","1mag","2pak","ll0","16mg","lei","in0","19dm","196g","1kig","3kil","1da0","1ll0","1bd2","15dg","2ibn","ibg","195g","1d5l","qig","ra0","3aqk","ar0","15bg","kni","ibg","pb6","1l50","1qig","rkl","mmg","ar0","31n3","14n0","3i6n","1iag","1l50","3m56","1dag","ll0","39dk","9eg","14mg","1kli","1aag","1dan","r50","1dag","2kql","jd0","19dg","2hbj","klg","1ad8","1qag","ql0","1bl6","1aqg","ir0","1an4","19bg","kj0","1sj3","1mag","mqn","ll0","15mg","jel","img","196g","1l6k","1kig","1lao","1da0","1dl0","35d6","15dg","idg","1abk","195g","1cjq","qig","ra0","1bq6","1ar0","15bg","inl","ibg","p5g","t53","1qig","qqo","le0","1ar0","15ml","14n0","1ib0","1mak","1l50","1mig","tai","ll0","1atn","9eg","14mg","1ill","1aag","1d50","1el4","1bag","lep","it0","19dg","2kbm","klg","1a9g","uak","ql0","1bag","mqi","ir0","19n6","1970","1kj0","1qj5","1l9g","ml0","tl3","15mg","inr","img","196g","3k5m","1kig","1l90","1na5","1dd0","lmg","ldi","idg","19bn","195g","1aig","3cil","r90","1bd0","2ir3","14rg","ifo","ibg","p5g","2q56","1qig","qp0","39m4","1an0","18n0","1kn3","1ib0","1lan","1l50","1mig","nal","ll0","19mg","lek","kmg","1ado","1aag","1d50","1dl6","1bag","ld0","1at4","19dg","klg","1cjj","q9g","spn","ql0","1bag","2iql","ir0","19bg","l74","1kb0","1qb8","1l90","1ml0","2ql6","lmg","in0","1aek","18mg","1kag","1sii","1l90"],e=["正","二","三","四","五","六","七","八","九","十","冬","腊"],g=["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"],i=Date.UTC(k,0,30,0,0,0);function o(a){return 15&parseInt(t[a-k],32)}function u(a){for(var l=0,n=parseInt(t[a-k],32),r=32768;r>=16;r>>=1)l+=n&r?30:29;return o(a)&&(l+=65536&n?30:29),l}function m(a){var l,n,m=Math.floor((a-i)/864e5),c=0,d=0,f=!1;if(m<=0)return null;var s=0;for(c=k;c<=r&&!(s+(n=u(c))>=m);c++)s+=n;var h=parseInt(t[c-k],32),b=o(c);for(m-=s,s=0,d=1;d<=12&&!(s+(n=h&1<<16-d?30:29)>=m);d++)if(s+=n,b&&d==b){if(s+(n=65536&h?30:29)>=m){f=!0;break}s+=n}return{lYear:c,lMonth:d,lDay:l=m-s,isLeap:f,lMonthZH:(f?"闰":"")+e[d-1]+"月",lDayZH:g[l-1]}}var c=[4,19,3,18,4,19,4,19,4,20,4,20,6,22,6,22,6,22,7,22,6,21,6,21],d=["4lkmd5j6l5","55kql9lal9","59lanalala","5avbnatqla","7akmd5j6l5","55kql9lal9","59lalalala","5avbnatqla","7akmd5j6l5","55kql9lal9","59lalalala","5avbnatqla","7akmd5j6l5","4lkql9lal9","55kqlalala","5ananalqla","5akmd5j5kl","4lkqd9l6l5","55kqlalal9","5ananalqla","5akmd5j5kl","4lkmd9l6l5","55kqlalal9","59lanalqla","5akmd5j5kl","4lkmd9l6l5","55kql9lal9","59lanalala","5akmclj5al","4lkmd5j6l5","55kql9lal9","59lanalala","5akmclj5al","4lkmd5j6l5","55kql9lal9","59lalalala","5akmclj5al","4lkmd5j6l5","55kql9lal9","59lalalala","5akmclj5al","4lkmd5j6l5","55kql9lal9","59lalalala","5aklclj5al","4lkmd5j5kl","4lkql9l6l9","55kqlalala","5aclclb5al","2lkmd5j5kl","4lkmd9l6l9","55kqlalala","5aclclb5al","2lkmd5j5kl","4lkmd9l6l5","55kql9lal9","5aalclb5al","2lkmd5j5kl","4lkmd5j6l5","55kql9lal9","59alclalal","2lkmclj5al","4lkmd5j6l5","55kql9lal9","59alclalal","2lkmclj5al","4lkmd5j6l5","55kql9lal9","59alalalal","2lkmclj5al","4lkmd5j6l5","55kql9lal9","59alalalal","2lklclj5al","4lkmd5j6l5","55kql9l6l9","59a5alalal","2lklclb5al","4lkmd5j5l5","55kqd9l6l9","59a5alalal","2lklclb5al","4lkmd5j5kl","4lkmd9l6l9","55a5akalal","2lclclb5al","2lkmd5j5kl","4lkmd5l6l5","55a5akalak","2lalclalal","2lkmclj5kl","4lkmd5j6l5","55a5akalak","2kalclalal","2lkmclj5al","4lkmd5j6l5","55a5akalak","2kalalalal","2lkmclj5al","4lkmd5j6l5","55a5akalak","2kalalalal","2lkmclj5al","4lkmd5j6l5","55a5akalak","2kalalalal","2lklclb5al","4lkmd5j6l5","55a5akahak","2ka5alalal","2lklclb5al","4lkmd5j5l5","55a52kahak","2ka5akalal","2lklclb5al","4lkmd5j5kl","4la12kahak","2ga5akalal","2lclclb5al","2lkmclj5kl","4la12g8hak","2ga5akalak","2lalclalal","2lkmclj5kl","4la12g8hag","2ga5akalak","2kalalalal","2lkmclj5al","4la12g8hag","2ga5akalak","2kalalalal","2lkmclj5al","4la12g8hag","2ga5akalak","2kalalalal","2lklclb5al","4la12g8hag","2ga5akalak","2kalalalal","2lklclb5al","4la12g8hag","2ga52kahak","2ka5alalal","2lklclb5al","4la12g8gag","2ga12kahak","2ka5akalal","2lklclb5al","4la1208ga0","20a12g8hak","2ga5akalal","2lalclalal","2la1208ga0","20a12g8hak","2ga5akalal","2lalalalal","2la1208ga0","20a12g8hag","2ga5akalak","2lalalalal","2la1208g00","20a12g8hag","2ga5akalak","2kalalalal","2la1208g00","20a12g8hag","2ga5akalak","2kalalalal","2la0200g00","20a12g8hag","2ga52kahak","2kalalalal","2la0200g00","20a12g8gag","2ga52kahak","2ka5akalal","2la0200g00","20a12g8gag","2ga12gahak","2ka5akalal","2la0200g00","20a1208ga0","2ga12g8hak","2ga5akalal","2l00200000","a1208ga0","20a12g8hak","2ga5akalal","2l00000000","a1208ga0","20a12g8hag","2ga5akalak","2l00000000","a1208g00","20a12g8hag","2ga5akalak","2k00000000","a1200g00","20a12g8hag","2ga5akalak","2kalalalal"],f=["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"];function s(a){if(a<k||a>r)return!1;var l=d[a-k],n=parseInt(l,32).toString(4);return 24!=n.length&&(n="0"+n),n.split("").map((function(a,l){return+a+c[l]}))}function h(){return Array.from(arguments).map((function(a){return(""+a).padStart(2,"0")})).join("-")}var b=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],j=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];function q(a,n,k){var r=Math.round((l(a,n,k)-l(1900,1,30))/864e5)+39,t=(r=r%60>0?r%60:r%60+60)%12;return b[r%10]+j[t]}var p=["水瓶","双鱼","白羊","金牛","双子","巨蟹","狮子","处女","天秤","天蝎","射手","摩羯"],v=[20,19,21,20,21,22,23,23,23,24,23,22];var y,D=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];function M(a){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},M(a)}function Y(a){var l=function(a,l){if("object"!==M(a)||null===a)return a;var n=a[Symbol.toPrimitive];if(void 0!==n){var k=n.call(a,l||"default");if("object"!==M(k))return k;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===l?String:Number)(a)}(a,"string");return"symbol"===M(l)?l:String(l)}function S(a,l,n){return(l=Y(l))in a?Object.defineProperty(a,l,{value:n,enumerable:!0,configurable:!0,writable:!0}):a[l]=n,a}var T={"01-01":"元旦","02-14":"情人节","03-08":"妇女节","03-12":"植树节","04-01":"愚人节","05-01":"劳动节","05-04":"青年节","06-01":"儿童节","07-01":"建党节","08-01":"建军节","09-10":"教师节","10-01":"国庆节","11-01":"万圣节","12-13":"国家公祭日","12-24":"平安夜","12-25":"圣诞节"},w=(S(y={"01-10":"中国人民警察节","01-26":"国际海关日","02-02":"世界湿地日","02-10":"国际气象节","03-01":"国际海豹日","03-03":"全国爱耳日","03-05":"雷锋纪念日","03-09":"保护母亲河日","03-14":"国际警察日","03-15":"消费者权益日","03-17":"国际航海日","03-18":"全国爱肝日","03-21":"世界睡眠日","03-22":"世界水日","03-23":"世界气象日","03-24":"防治结核病日","03-27":"学生安全教育日","04-07":"世界卫生日","04-13":"泼水节","04-15":"国家安全教育日","04-22":"世界地球日","04-23":"世界读书日","04-24":"中国航天日","04-26":"知识产权日","05-02":"世界哮喘日","05-08":"世界微笑日 世界红十字日","05-12":"国际护士节 防灾减灾日","05-15":"国际家庭日","05-18":"博物馆日","05-20":"学生营养日","05-22":"生物多样性日","05-31":"世界无烟日","06-06":"世界环境日"},"06-06","全国爱眼日"),S(y,"06-11","中国人口日"),S(y,"06-14","世界献血者日"),S(y,"06-23","国际奥林匹克日"),S(y,"06-25","全国土地日"),S(y,"06-26","国际禁毒日"),S(y,"07-01","香港回归日"),S(y,"07-02","体育记者日"),S(y,"07-11","世界人口日"),S(y,"08-08","全民健身日"),S(y,"08-12","国际青年节"),S(y,"08-19","中国医师节"),S(y,"08-26","律师咨询日"),S(y,"09-08","国际扫盲日"),S(y,"09-16","中国脑健康日 臭氧层保护日"),S(y,"09-17","清洁地球日"),S(y,"09-18","九一八纪念日"),S(y,"09-20","全国爱牙日"),S(y,"09-21","国际和平日"),S(y,"09-27","世界旅游日"),S(y,"09-30","烈士纪念日"),S(y,"10-04","世界动物日"),S(y,"10-05","世界教师日"),S(y,"10-08","全国高血压日"),S(y,"10-09","世界邮政日"),S(y,"10-13","世界保健日"),S(y,"10-14","世界标准日"),S(y,"10-15","国际盲人节"),S(y,"10-16","世界粮食日"),S(y,"11-08","记者节"),S(y,"11-09","消防宣传日"),S(y,"11-14","世界糖尿病日"),S(y,"11-17","世界学生日"),S(y,"12-01","艾滋病日"),S(y,"12-03","国际残疾人日"),S(y,"12-04","国家宪法日"),S(y,"12-09","世界足球日"),S(y,"12-10","世界人权日"),S(y,"12-11","国际山岳日"),S(y,"12-15","强化免疫日"),y),H={"01-01":"春节","01-15":"元宵节","02-02":"龙头节","03-03":"上巳节","05-05":"端午节","07-07":"七夕节","07-15":"中元节","08-15":"中秋节","09-09":"重阳节","10-15":"下元节","12-08":"腊八节","12-23":"北小年","12-24":"南小年","12-30":"除夕"},Z={"06-24":"火把节","10-01":"寒衣节"},z={"05-02-00":"母亲节","06-03-00":"父亲节","11-04-04":"感恩节"};function I(a,l,n){var r=[],e=h(l,n);return 12==l&&n==function(a,l,n){var r=parseInt(t[a-k],32),e=r&1<<16-l?30:29;return n&&l==leapMonth&&(e=65536&r?30:29),e}(a,12)?r.push(H["12-30"]):(H[e]&&r.push(H[e]),Z[e]&&r.push(Z[e])),r}function O(a){var l,k,r,t=n(a);t.zodiac=(l=t.sMonth,k=t.sDay,r=11,v.forEach((function(a,n){var t=n+1;h(l,k)>=h(t,a)&&(r=n%12)})),p[r]+"座");var e,g,i,o,u,c=[],d=m(a);return d?(Object.assign(t,d),t.gzYearZH=(i=t.lYear,u=(o=(o=i-1984)%60>0?o%60:o%60+60)%12,b[o%10]+j[u]),t.gzMonthZH=function(a,l,n){var k=0,r=s(a);r.push(31),r.forEach((function(a,r){var t=Math.floor(r/2)+1;h(t,a)>=h(l,n)&&(k||(k=t))}));var t=(k=(k+=12*(a-1984)-1)%60>0?k%60:k%60+60)%12;return b[k%10]+j[t]}(t.sYear,t.sMonth,t.sDay),t.gzDayZH=q(t.sYear,t.sMonth,t.sDay),t.animal=(e=t.lYear,D[(g=(e-1984)%12)>-1?g:g+12]),t.term=function(a,l,n){var k="",r=s(a);return r.push(31),r.forEach((function(a,r){var t=Math.floor(r/2)+1;l==t&&n==a&&(k=f[r])})),k}(t.sYear,t.sMonth,t.sDay),c=c.concat(function(a,l,k){for(var r=[],t=s(a),e=864e5,g=new Date(a,5,t[11]),i=new Date(a,7,t[14]),o=0,u=g.getTime();u<=i.getTime();u+=e){var c=n(u);q(c.sYear,c.sMonth,c.sDay).indexOf("庚")>-1&&(o++,c.sYear==a&&c.sMonth==l&&c.sDay==k&&(3==o?r.push("初伏"):4==o&&r.push("中伏")))}o=0;for(var d=i.getTime();d<=i.getTime()+1728e6;d+=e){var f=n(d);q(f.sYear,f.sMonth,f.sDay).indexOf("庚")>-1&&(o++,f.sYear==a&&f.sMonth==l&&f.sDay==k&&(1==o?r.push("末伏"):2==o&&r.push("出伏")))}for(var h=new Date(a,2,t[5]),b=!1,j=!1,p=h.getTime();p<=h.getTime()+2592e6;p+=e)if(b){if(!j){var v=n(p);0==v.week&&(j=!0,v.sYear==a&&v.sMonth==l&&v.sDay==k&&r.push("复活节"))}}else 15==m(p).lDay&&(b=!0);return r}(t.sYear,t.sMonth,t.sDay)),c=c.concat(I(t.lYear,t.lMonth,t.lDay))):Object.assign(t,{lYear:null,lMonth:null,lDay:null,isLeap:!1,lMonthZH:"",lDayZH:"",gzYearZH:"",gzMonthZH:"",gzDayZH:"",animal:"",term:""}),c=c.concat(function(a,l,n){var k=[],r=new Date(a,l-1,n),t=r.getDate(),e=r.getDay(),g=Math.ceil(t/7),i=h(l,n);return T[i]&&k.push(T[i]),w[i]&&k.push(w[i]),i=h(l,g,e),z[i]&&k.push(z[i]),k}(t.sYear,t.sMonth,t.sDay)),t.festival=c.join(" "),t}return{getDateBySolar:function(a,n,k){var r=l(a,n,k);return r?O(r):null},getDateByLunar:function(a,l,n,e){var g=function(a,l,n,e){if(a<k||a>r)return null;if(l<1||l>12)return null;var g=o(a);if(e&&g!=l)return null;if(n>((e?65536&c:1<<17-l)?30:29))return null;for(var m=0,c=parseInt(t[a-k],32),d=k;d<a;d++)m+=u(d);for(var f=1;f<l||e&&f==l;f++)m+=c&1<<16-f?30:29;return e&&l>g&&(m+=65536&c?30:29),i+864e5*(m+n)}(a,l,n,e);return g?O(g):null},getToday:function(){return O((new Date).getTime())}}}));
