(function(d, $) {
    if (window.xheditor)
        return !1;
    var H = navigator.userAgent.toLowerCase(), Ba = -1 !== H.indexOf("mobile"), I = d.browser, pa = parseFloat(I.version), i = I.msie, qa = I.mozilla, R = I.safari, Ca = I.opera, eb = -1 < H.indexOf(" adobeair/"), Da = /OS 5(_\d)+ like Mac OS X/i.test(H);
    d.fn.xheditor = function(i) {
        if (Ba && !Da)
            return !1;
        var o = [];
        this.each(function() {
            if (d.nodeName(this, "TEXTAREA"))
                if (!1 === i) {
                    if (this.xheditor)
                        this.xheditor.remove(), this.xheditor = null
                } else if (this.xheditor)
                    o.push(this.xheditor);
                else {
                    var p = /({.*})/.exec(d(this).attr("class"));
                    if (p) {
                        try {
                            p = eval("(" + p[1] + ")")
                        } catch (t) {
                        }
                        i = d.extend({}, p, i)
                    }
                    p = new ra(this, i);
                    if (p.init())
                        this.xheditor = p, o.push(p)
                }
        });
        0 === o.length && (o = !1);
        1 === o.length && (o = o[0]);
        return o
    };
    var aa = 0, S = !1, sa = !0, ta = !1, Sa = !1, t, ba, ca, da, J, Ea, ea, Fa, Ga, Ha, K;
    d("script[src*=xheditor]").each(function() {
        var d = this.src;
        if (d.match(/xheditor[^\/]*\.js/i))
            return K = d.replace(/[\?#].*$/, "").replace(/(^|[\/\\])[^\/]*$/, "$1"), !1
    });
	
	// hap add
	// 在fn自动载入的情况下需要这段代码来获取文件夹路径
	if(fn){
		K = K || (fn.path + "lib/jquery.xheditor/")
	};
	
    if (i) {
        try {
            document.execCommand("BackgroundImageCache", !1, !0)
        } catch (qb) {
        }
        (H = d.fn.jquery) && H.match(/^1\.[67]/) && 
        (d.attrHooks.width = d.attrHooks.height = null)
    }
    var fb = {27: "esc",9: "tab",32: "space",13: "enter",8: "backspace",145: "scroll",20: "capslock",144: "numlock",19: "pause",45: "insert",36: "home",46: "del",35: "end",33: "pageup",34: "pagedown",37: "left",38: "up",39: "right",40: "down",112: "f1",113: "f2",114: "f3",115: "f4",116: "f5",117: "f6",118: "f7",119: "f8",120: "f9",121: "f10",122: "f11",123: "f12"}, Ta = "#FFFFFF,#CCCCCC,#C0C0C0,#999999,#666666,#333333,#000000,#FFCCCC,#FF6666,#FF0000,#CC0000,#990000,#660000,#330000,#FFCC99,#FF9966,#FF9900,#FF6600,#CC6600,#993300,#663300,#FFFF99,#FFFF66,#FFCC66,#FFCC33,#CC9933,#996633,#663333,#FFFFCC,#FFFF33,#FFFF00,#FFCC00,#999900,#666600,#333300,#99FF99,#66FF99,#33FF33,#33CC00,#009900,#006600,#003300,#99FFFF,#33FFFF,#66CCCC,#00CCCC,#339999,#336666,#003333,#CCFFFF,#66FFFF,#33CCFF,#3366FF,#3333FF,#000099,#000066,#CCCCFF,#9999FF,#6666CC,#6633FF,#6600CC,#333399,#330099,#FFCCFF,#FF99FF,#CC66CC,#CC33CC,#993399,#663366,#330033".split(","), 
    gb = [{n: "p",t: "\u666e\u901a\u6bb5\u843d"}, {n: "h1",t: "\u6807\u98981"}, {n: "h2",t: "\u6807\u98982"}, {n: "h3",t: "\u6807\u98983"}, {n: "h4",t: "\u6807\u98984"}, {n: "h5",t: "\u6807\u98985"}, {n: "h6",t: "\u6807\u98986"}, {n: "pre",t: "\u5df2\u7f16\u6392\u683c\u5f0f"}, {n: "address",t: "\u5730\u5740"}], hb = [{n: "\u5b8b\u4f53",c: "SimSun"}, {n: "\u4eff\u5b8b\u4f53",c: "FangSong_GB2312"}, {n: "\u9ed1\u4f53",c: "SimHei"}, {n: "\u6977\u4f53",c: "KaiTi_GB2312"}, {n: "\u5fae\u8f6f\u96c5\u9ed1",c: "Microsoft YaHei"}, {n: "Arial"}, {n: "Arial Black"}, 
        {n: "Comic Sans MS"}, {n: "Courier New"}, {n: "System"}, {n: "Times New Roman"}, {n: "Tahoma"}, {n: "Verdana"}], T = [{n: "x-small",s: "10px",t: "\u6781\u5c0f"}, {n: "small",s: "12px",t: "\u7279\u5c0f"}, {n: "medium",s: "16px",t: "\u5c0f"}, {n: "large",s: "18px",t: "\u4e2d"}, {n: "x-large",s: "24px",t: "\u5927"}, {n: "xx-large",s: "32px",t: "\u7279\u5927"}, {n: "-webkit-xxx-large",s: "48px",t: "\u6781\u5927"}], ib = [{s: "\u5de6\u5bf9\u9f50",v: "justifyleft"}, {s: "\u5c45\u4e2d",v: "justifycenter"}, {s: "\u53f3\u5bf9\u9f50",v: "justifyright"}, {s: "\u4e24\u7aef\u5bf9\u9f50",
            v: "justifyfull"}], jb = [{s: "\u6570\u5b57\u5217\u8868",v: "insertOrderedList"}, {s: "\u7b26\u53f7\u5217\u8868",v: "insertUnorderedList"}], kb = {"default": {name: "\u9ed8\u8ba4",width: 24,height: 24,line: 7,list: {smile: "\u5fae\u7b11",tongue: "\u5410\u820c\u5934",titter: "\u5077\u7b11",laugh: "\u5927\u7b11",sad: "\u96be\u8fc7",wronged: "\u59d4\u5c48",fastcry: "\u5feb\u54ed\u4e86",cry: "\u54ed",wail: "\u5927\u54ed",mad: "\u751f\u6c14",knock: "\u6572\u6253",curse: "\u9a82\u4eba",crazy: "\u6293\u72c2",angry: "\u53d1\u706b",ohmy: "\u60ca\u8bb6",
                awkward: "\u5c34\u5c2c",panic: "\u60ca\u6050",shy: "\u5bb3\u7f9e",cute: "\u53ef\u601c",envy: "\u7fa1\u6155",proud: "\u5f97\u610f",struggle: "\u594b\u6597",quiet: "\u5b89\u9759",shutup: "\u95ed\u5634",doubt: "\u7591\u95ee",despise: "\u9119\u89c6",sleep: "\u7761\u89c9",bye: "\u518d\u89c1"}}}, ka = {Cut: {t: "\u526a\u5207 (Ctrl+X)"},Copy: {t: "\u590d\u5236 (Ctrl+C)"},Paste: {t: "\u7c98\u8d34 (Ctrl+V)"},Pastetext: {t: "\u7c98\u8d34\u6587\u672c",h: i ? 0 : 1},Blocktag: {t: "\u6bb5\u843d\u6807\u7b7e",h: 1},Fontface: {t: "\u5b57\u4f53",
            h: 1},FontSize: {t: "\u5b57\u4f53\u5927\u5c0f",h: 1},Bold: {t: "\u52a0\u7c97 (Ctrl+B)",s: "Ctrl+B"},Italic: {t: "\u659c\u4f53 (Ctrl+I)",s: "Ctrl+I"},Underline: {t: "\u4e0b\u5212\u7ebf (Ctrl+U)",s: "Ctrl+U"},Strikethrough: {t: "\u5220\u9664\u7ebf"},FontColor: {t: "\u5b57\u4f53\u989c\u8272",h: 1},BackColor: {t: "\u80cc\u666f\u989c\u8272",h: 1},SelectAll: {t: "\u5168\u9009 (Ctrl+A)"},Removeformat: {t: "\u5220\u9664\u6587\u5b57\u683c\u5f0f"},Align: {t: "\u5bf9\u9f50",h: 1},List: {t: "\u5217\u8868",h: 1},Outdent: {t: "\u51cf\u5c11\u7f29\u8fdb"},
        Indent: {t: "\u589e\u52a0\u7f29\u8fdb"},Link: {t: "\u8d85\u94fe\u63a5 (Ctrl+L)",s: "Ctrl+L",h: 1},Unlink: {t: "\u53d6\u6d88\u8d85\u94fe\u63a5"},Anchor: {t: "\u951a\u70b9",h: 1},Img: {t: "\u56fe\u7247",h: 1},Flash: {t: "Flash\u52a8\u753b",h: 1},Media: {t: "\u591a\u5a92\u4f53\u6587\u4ef6",h: 1},Hr: {t: "\u63d2\u5165\u6c34\u5e73\u7ebf"},Emot: {t: "\u8868\u60c5",s: "ctrl+e",h: 1},Table: {t: "\u8868\u683c",h: 1},Source: {t: "\u6e90\u4ee3\u7801"},Preview: {t: "\u9884\u89c8"},Print: {t: "\u6253\u5370 (Ctrl+P)",s: "Ctrl+P"},Fullscreen: {t: "\u5168\u5c4f\u7f16\u8f91 (Esc)",
            s: "Esc"},About: {t: "\u5173\u4e8e xhEditor"}}, Ia = {mini: "Bold,Italic,Underline,Strikethrough,|,Align,List,|,Link,Img",simple: "Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,|,Align,List,Outdent,Indent,|,Link,Img,Emot",full: "Cut,Copy,Paste,Pastetext,|,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,|,Align,List,Outdent,Indent,|,Link,Unlink,Anchor,Img,Flash,Media,Hr,Emot,Table,|,Source,Preview,Print,Fullscreen"};
    Ia.mfull = Ia.full.replace(/\|(,Align)/i, "/$1");
    var lb = {a: "Link",img: "Img",embed: "Embed"}, mb = {"<": "&lt;",">": "&gt;",'"': "&quot;","\u00ae": "&reg;","\u00a9": "&copy;"}, nb = /[<>"\u00ae\u00a9]/g, ra = function(z, o) {
        function p(a) {
            var a = a.target, b = lb[a.tagName.toLowerCase()];
            b && ("Embed" === b && (b = {"application/x-shockwave-flash": "Flash","application/x-mplayer2": "Media"}[a.type.toLowerCase()]), c.exec(b))
        }
        function H(a) {
            if (27 === a.which)
                return ta ? c.removeModal() : S && c.hidePanel(), !1
        }
        function I() {
            setTimeout(c.setSource, 
            10)
        }
        function U() {
            c.getSource()
        }
        function Ua(a) {
            var b, e, f;
            if (a && (b = a.originalEvent.clipboardData) && (e = b.items) && (f = e[0]) && "file" == f.kind && f.type.match(/^image\//i))
                return a = f.getAsFile(), b = new FileReader, b.onload = function() {
                    var a = '<img src="' + event.target.result + '">', a = Va(a);
                    c.pasteHTML(a)
                }, b.readAsDataURL(a), !1;
            var h = g.cleanPaste;
            if (0 === h || y || Ja)
                return !0;
            Ja = !0;
            c.saveBookmark();
            var a = i ? "pre" : "div", n = d("<" + a + ' class="xhe-paste">\ufeff\ufeff</' + a + ">", k).appendTo(k.body), a = n[0];
            b = c.getSel();
            e = c.getRng(!0);
            n.css("top", fa.scrollTop());
            i ? (e.moveToElementText(a), e.select()) : (e.selectNodeContents(a), b.removeAllRanges(), b.addRange(e));
            setTimeout(function() {
                var a = 3 === h, b;
                if (a)
                    b = n.text();
                else {
                    var e = [];
                    d(".xhe-paste", k.body).each(function(a, b) {
                        0 == d(b).find(".xhe-paste").length && e.push(b.innerHTML)
                    });
                    b = e.join("<br />")
                }
                n.remove();
                c.loadBookmark();
                if (b = b.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ""))
                    if (a)
                        c.pasteText(b);
                    else if (b = c.cleanHTML(b), b = c.cleanWord(b), b = c.formatXHTML(b), !g.onPaste || g.onPaste && !1 !== (b = g.onPaste(b)))
                        b = 
                        Va(b), c.pasteHTML(b);
                Ja = !1
            }, 0)
        }
        function Va(a) {
            var b = g.localUrlTest, e = g.remoteImgSaveUrl;
            if (b && e) {
                var f = [], h = 0, a = a.replace(/(<img)((?:\s+[^>]*?)?(?:\s+src="\s*([^"]+)\s*")(?: [^>]*)?)(\/?>)/ig, function(a, e, c, d, r) {
                    /^(https?|data:image)/i.test(d) && !b.test(d) && (f[h] = d, c = c.replace(/\s+(width|height)="[^"]*"/ig, "").replace(/\s+src="[^"]*"/ig, ' src="' + ua + 'img/waiting.gif" remoteimg="' + h++ + '"'));
                    return e + c + r
                });
                0 < f.length && d.post(e, {urls: f.join("|")}, function(a) {
                    a = a.split("|");
                    d("img[remoteimg]", c.doc).each(function() {
                        var b = 
                        d(this);
                        L(b, "src", a[b.attr("remoteimg")]);
                        b.removeAttr("remoteimg")
                    })
                })
            }
            return a
        }
        function Ka(a) {
            try {
                c._exec("styleWithCSS", a, !0)
            } catch (b) {
                try {
                    c._exec("useCSS", !a, !0)
                } catch (e) {
                }
            }
        }
        function La() {
            if (Ma && !y) {
                Ka(!1);
                try {
                    c._exec("enableObjectResizing", !0, !0)
                } catch (a) {
                }
                if (i)
                    try {
                        c._exec("BackgroundImageCache", !0, !0)
                    } catch (b) {
                    }
            }
        }
        function Ba(a) {
            if (y || 13 !== a.which || a.shiftKey || a.ctrlKey || a.altKey)
                return !0;
            a = c.getParent("p,h1,h2,h3,h4,h5,h6,pre,address,div,li");
            if (a.is("li"))
                return !0;
            if (g.forcePtag)
                0 === a.length && 
                c._exec("formatblock", "<p>");
            else
                return c.pasteHTML("<br />"), i && 0 < a.length && 2 === c.getRng().parentElement().childNodes.length && c.pasteHTML("<br />"), !1
        }
        function Na() {
            !qa && !R && (la && A.height("100%").css("height", A.outerHeight() - q.outerHeight()), i && q.hide().show())
        }
        function Da(a) {
            a = a.target;
            if (a.tagName.match(/(img|embed)/i)) {
                var b = c.getSel(), e = c.getRng(!0);
                e.selectNode(a);
                b.removeAllRanges();
                b.addRange(e)
            }
        }
        function L(a, b, e) {
            if (!b)
                return !1;
            var c = "_xhe_" + b;
            e && (va && (e = V(e, va, B)), a.attr(b, B ? V(e, "abs", 
            B) : e).removeAttr(c).attr(c, e));
            return a.attr(c) || a.attr(b)
        }
        function Oa() {
            sa && c.hidePanel()
        }
        function ob(a) {
            if (y)
                return !0;
            var b = a.which, e = fb[b], b = e ? e : String.fromCharCode(b).toLowerCase();
            sKey = "";
            sKey += a.ctrlKey ? "ctrl+" : "";
            sKey += a.altKey ? "alt+" : "";
            sKey += a.shiftKey ? "shift+" : "";
            sKey += b;
            var a = ma[sKey], f;
            for (f in a)
                if (f = a[f], d.isFunction(f)) {
                    if (!1 === f.call(c))
                        return !1
                } else
                    return c.exec(f), !1
        }
        function M(a, b) {
            var e = typeof a;
            return !b ? "undefined" != e : "array" === b && a.hasOwnProperty && a instanceof Array ? !0 : e === 
            b
        }
        function V(a, b, e) {
            if (a.match(/^(\w+):\/\//i) && !a.match(/^https?:/i) || /^#/i.test(a) || /^data:/i.test(a))
                return a;
            var c = e ? d('<a href="' + e + '" />')[0] : location, e = c.protocol, h = c.host, n = c.hostname, j = c.port, c = c.pathname.replace(/\\/g, "/").replace(/[^\/]+$/i, "");
            "" === j && (j = "80");
            "" === c ? c = "/" : "/" !== c.charAt(0) && (c = "/" + c);
            a = d.trim(a);
            "abs" !== b && (a = a.replace(RegExp(e + "\\/\\/" + n.replace(/\./g, "\\.") + "(?::" + j + ")" + ("80" === j ? "?" : "") + "(/|$)", "i"), "/"));
            "rel" === b && (a = a.replace(RegExp("^" + c.replace(/([\/\.\+\[\]\(\)])/g, 
            "\\$1"), "i"), ""));
            if ("rel" !== b && (a.match(/^(https?:\/\/|\/)/i) || (a = c + a), "/" === a.charAt(0))) {
                for (var n = [], a = a.split("/"), l = a.length, c = 0; c < l; c++)
                    j = a[c], ".." === j ? n.pop() : "" !== j && "." !== j && n.push(j);
                "" === a[l - 1] && n.push("");
                a = "/" + n.join("/")
            }
            "abs" === b && !a.match(/^https?:\/\//i) && (a = e + "//" + h + a);
            return a = a.replace(/(https?:\/\/[^:\/?#]+):80(\/|$)/i, "$1$2")
        }
        function Wa(a, b) {
            if ("*" === b || a.match(RegExp(".(" + b.replace(/,/g, "|") + ")$", "i")))
                return !0;
            alert("\u4e0a\u4f20\u6587\u4ef6\u6269\u5c55\u540d\u5fc5\u9700\u4e3a: " + 
            b);
            return !1
        }
        function Xa(a) {
            var b = Math.floor(Math.log(a) / Math.log(1024));
            return (a / Math.pow(1024, Math.floor(b))).toFixed(2) + "Byte,KB,MB,GB,TB,PB".split(",")[b]
        }
        function N() {
            return !1
        }
        var c = this, F = d(z), Ya = F.closest("form"), q, A, W, fa, k, ga, ha, Ma = !1, y = !1, la = !1, Ja = !1, Pa, na = !1, Za = "", w = null, wa, oa = !1, Qa = !1, ia = null, X = null, O = 0, g = c.settings = d.extend({}, ra.settings, o), xa = g.plugins, ya = [];
        xa && (ka = d.extend({}, ka, xa), d.each(xa, function(a) {
            ya.push(a)
        }), ya = ya.join(","));
        if (g.tools.match(/^\s*(m?full|simple|mini)\s*$/i)) {
            var $a = 
            Ia[d.trim(g.tools)];
            g.tools = g.tools.match(/m?full/i) && xa ? $a.replace("Table", "Table," + ya) : $a
        }
        g.tools.match(/(^|,)\s*About\s*(,|$)/i) || (g.tools += ",About");
        g.tools = g.tools.split(",");
        if (g.editorRoot)
            K = g.editorRoot;
        !1 === eb && (K = V(K, "abs"));
        if (g.urlBase)
            g.urlBase = V(g.urlBase, "abs");
        var ab = "xheCSS_" + g.skin, ja = "xhe" + aa + "_container", bb = "xhe" + aa + "_Tool", cb = "xhe" + aa + "_iframearea", db = "xhe" + aa + "_iframe", za = "xhe" + aa + "_fixffcursor", P = "", Q = "", ua = K + "xheditor_skin/" + g.skin + "/", Aa = kb, va = g.urlType, B = g.urlBase, Y = g.emotPath, 
        Y = Y ? Y : K + "xheditor_emot/", Ra = "", Aa = d.extend({}, Aa, g.emots), Y = V(Y, "rel", B ? B : null);
        (na = g.showBlocktag) && (Q += " showBlocktag");
        var ma = [];
        this.init = function() {
            //0 === d("#" + ab).length && d("head").append('<link id="' + ab + '" rel="stylesheet" type="text/css" href="' + ua + 'ui.css" />');
            var a = F.outerWidth(), b = F.outerHeight(), a = g.width || z.style.width || (10 < a ? a : 0);
            O = g.height || z.style.height || (10 < b ? b : 150);
            M(a, "number") && (a += "px");
            M(O, "string") && (O = O.replace(/[^\d]+/g, ""));
            var b = g.background || z.style.background, e = ['<span class="xheGStart"/>'], 
            f, h, n = /\||\//i;
            d.each(g.tools, function(a, b) {
                b.match(n) && e.push('<span class="xheGEnd"/>');
                if ("|" === b)
                    e.push('<span class="xheSeparator"/>');
                else if ("/" === b)
                    e.push("<br />");
                else {
                    f = ka[b];
                    if (!f)
                        return;
                    h = f.c ? f.c : "xheIcon xheBtn" + b;
                    e.push('<span><a href="#" title="' + f.t + '" cmd="' + b + '" class="xheButton xheEnabled" tabindex="-1" role="button"><span class="' + h + '" unselectable="on" style="font-size:0;color:transparent;text-indent:-999px;">' + f.t + "</span></a></span>");
                    f.s && c.addShortcuts(f.s, b)
                }
                b.match(n) && 
                e.push('<span class="xheGStart"/>')
            });
            e.push('<span class="xheGEnd"/><br />');
            F.after(d('<input type="text" id="' + za + '" style="position:absolute;display:none;" /><span id="' + ja + '" class="xhe_' + g.skin + '" style="display:none"><table cellspacing="0" cellpadding="0" class="xheLayout" style="' + ("0px" != a ? "width:" + a + ";" : "") + "height:" + O + 'px;" role="presentation"><tr><td id="' + bb + '" class="xheTool" unselectable="on" style="height:1px;" role="presentation"></td></tr><tr><td id="' + cb + '" class="xheIframeArea" role="presentation"><iframe frameborder="0" id="' + 
            db + '" src="javascript:;" style="width:100%;"></iframe></td></tr></table></span>'));
            q = d("#" + bb);
            A = d("#" + cb);
            //P = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link rel="stylesheet" href="' + ua + 'iframe.css"/>';
            if (a = g.loadCSS)
                if (M(a, "array"))
                    for (var j in a)
                        P += '<link rel="stylesheet" href="' + a[j] + '"/>';
                else
                    P = a.match(/\s*<style(\s+[^>]*?)?>[\s\S]+?<\/style>\s*/i) ? P + a : P + ('<link rel="stylesheet" href="' + a + '"/>');
            j = "<html><head>" + P + "<title>\u53ef\u89c6\u5316\u7f16\u8f91\u5668,alt+1\u52309\u952e,\u5207\u6362\u5230\u5de5\u5177\u533a,tab\u952e,\u9009\u62e9\u6309\u94ae,esc\u952e,\u8fd4\u56de\u7f16\u8f91 " + 
            (g.readTip ? g.readTip : "") + "</title>";
            b && (j += "<style>html{background:" + b + ";}</style>");
            j += '</head><body spellcheck="0" class="editMode' + Q + '"></body></html>';
            c.win = W = d("#" + db)[0].contentWindow;
            fa = d(W);
            try {
                this.doc = k = W.document, ga = d(k), k.open(), k.write(j), k.close(), i ? k.body.contentEditable = "true" : k.designMode = "On"
            } catch (l) {
            }
            setTimeout(La, 300);
            c.setSource();
            W.setInterval = null;
            q.append(e.join("")).bind("mousedown contextmenu", N).click(function(a) {
                var b = d(a.target).closest("a");
                b.is(".xheEnabled") && (clearTimeout(wa), 
                q.find("a").attr("tabindex", "-1"), w = a, c.exec(b.attr("cmd")));
                return !1
            });
            q.find(".xheButton").hover(function(a) {
                var b = d(this), e = g.hoverExecDelay, m = X;
                X = null;
                if (-1 === e || oa || !b.is(".xheEnabled"))
                    return !1;
                if (m && 10 < m)
                    return oa = !0, setTimeout(function() {
                        oa = !1
                    }, 100), !1;
                var f = b.attr("cmd");
                if (1 !== ka[f].h)
                    return c.hidePanel(), !1;
                Qa && (e = 0);
                0 <= e && (wa = setTimeout(function() {
                    w = a;
                    ia = {x: w.clientX,y: w.clientY};
                    c.exec(f)
                }, e))
            }, function() {
                ia = null;
                wa && clearTimeout(wa)
            }).mousemove(function(a) {
                if (ia) {
                    var b = a.clientX - ia.x, 
                    c = a.clientY - ia.y;
                    if (1 < Math.abs(b) || 1 < Math.abs(c))
                        0 < b && 0 < c ? (b = Math.round(Math.atan(c / b) / 0.017453293), X = X ? (X + b) / 2 : b) : X = null, ia = {x: a.clientX,y: a.clientY}
                }
            });
            t = d("#xhePanel");
            ba = d("#xheShadow");
            ca = d("#xheCntLine");
            0 === t.length && (t = d('<div id="xhePanel"></div>').mousedown(function(a) {
                a.stopPropagation()
            }), ba = d('<div id="xheShadow"></div>'), ca = d('<div id="xheCntLine"></div>'), setTimeout(function() {
                d(document.body).append(t).append(ba).append(ca)
            }, 10));
            d("#" + ja).show();
            F.hide();
            A.css("height", O - q.outerHeight());
            i & 8 > pa && setTimeout(function() {
                A.css("height", O - q.outerHeight())
            }, 1);
            F.focus(c.focus);
            Ya.submit(U).bind("reset", I);
            g.submitID && d("#" + g.submitID).mousedown(U);
            d(window).bind("unload beforeunload", U).bind("resize", Na);
            d(document).mousedown(Oa);
            Sa || (d(document).keydown(H), Sa = !0);
            fa.focus(function() {
                g.focus && g.focus()
            }).blur(function() {
                g.blur && g.blur()
            });
            R && fa.click(Da);
            ga.mousedown(Oa).keydown(ob).keypress(Ba).dblclick(p).bind("mousedown click", function(a) {
                F.trigger(a.type)
            });
            if (i) {
                ga.keydown(function(a) {
                    var b = 
                    c.getRng();
                    if (8 === a.which && b.item)
                        return d(b.item(0)).remove(), !1
                });
                var u = function(a) {
                    var a = d(a.target), b;
                    (b = a.css("width")) && a.css("width", "").attr("width", b.replace(/[^0-9%]+/g, ""));
                    (b = a.css("height")) && a.css("height", "").attr("height", b.replace(/[^0-9%]+/g, ""))
                };
                ga.bind("controlselect", function(a) {
                    a = a.target;
                    d.nodeName(a, "IMG") && d(a).unbind("resizeend", u).bind("resizeend", u)
                })
            }
            ga.keydown(function(a) {
                var b = a.which;
                if (a.altKey && 49 <= b && 57 >= b)
                    return q.find("a").attr("tabindex", "0"), q.find(".xheGStart").eq(b - 
                    49).next().find("a").focus(), k.title = "\ufeff\ufeff", !1
            }).click(function() {
                q.find("a").attr("tabindex", "-1")
            });
            q.keydown(function(a) {
                var b = a.which;
                if (27 == b)
                    q.find("a").attr("tabindex", "-1"), c.focus();
                else if (a.altKey && 49 <= b && 57 >= b)
                    return q.find(".xheGStart").eq(b - 49).next().find("a").focus(), !1
            });
            j = d(k.documentElement);
            Ca ? j.bind("keydown", function(a) {
                a.ctrlKey && 86 === a.which && Ua()
            }) : j.bind(i ? "beforepaste" : "paste", Ua);
            g.disableContextmenu && j.bind("contextmenu", N);
            g.html5Upload && j.bind("dragenter dragover", 
            function(a) {
                var b;
                if ((b = a.originalEvent.dataTransfer.types) && -1 !== d.inArray("Files", b))
                    return !1
            }).bind("drop", function(a) {
                var a = a.originalEvent.dataTransfer, b;
                if (a && (b = a.files) && 0 < b.length) {
                    var e, f, a = ["Link", "Img", "Flash", "Media"], j = [], h;
                    for (e in a)
                        f = a[e], g["up" + f + "Url"] && g["up" + f + "Url"].match(/^[^!].*/i) && j.push(f + ":," + g["up" + f + "Ext"]);
                    if (0 === j.length)
                        return !1;
                    h = j.join(",");
                    f = function(a) {
                        var b, c;
                        for (e = 0; e < a.length; e++)
                            if (b = a[e].name.replace(/.+\./, ""), b = h.match(RegExp("(\\w+):[^:]*," + b + "(?:,|$)", 
                            "i")))
                                if (c) {
                                    if (c !== b[1])
                                        return 2
                                } else
                                    c = b[1];
                            else
                                return 1;
                        return c
                    }(b);
                    1 === f ? alert("\u4e0a\u4f20\u6587\u4ef6\u7684\u6269\u5c55\u540d\u5fc5\u9700\u4e3a\uff1a" + h.replace(/\w+:,/g, "")) : 2 === f ? alert("\u6bcf\u6b21\u53ea\u80fd\u62d6\u653e\u4e0a\u4f20\u540c\u4e00\u7c7b\u578b\u6587\u4ef6") : f && c.startUpload(b, g["up" + f + "Url"], "*", function(a) {
                        var b = [], e;
                        (e = g.onUpload) && e(a);
                        for (var r = 0, j = a.length; r < j; r++)
                            e = a[r], url = M(e, "string") ? e : e.url, "!" === url.substr(0, 1) && (url = url.substr(1)), b.push(url);
                        c.exec(f);
                        d("#xhe" + 
                        f + "Url").val(b.join(" "));
                        d("#xheSave").click()
                    });
                    return !1
                }
            });
            (j = g.shortcuts) && d.each(j, function(a, b) {
                c.addShortcuts(a, b)
            });
            aa++;
            Ma = !0;
            g.fullscreen ? c.toggleFullscreen() : g.sourceMode && setTimeout(c.toggleSource, 20);
            return !0
        };
        this.remove = function() {
            c.hidePanel();
            U();
            F.unbind("focus", c.focus);
            Ya.unbind("submit", U).unbind("reset", I);
            g.submitID && d("#" + g.submitID).unbind("mousedown", U);
            d(window).unbind("unload beforeunload", U).unbind("resize", Na);
            d(document).unbind("mousedown", Oa);
            d("#" + ja).remove();
            d("#" + 
            za).remove();
            F.show();
            Ma = !1
        };
        this.saveBookmark = function() {
            if (!y) {
                c.focus();
                var a = c.getRng(), a = a.cloneRange ? a.cloneRange() : a;
                ha = {top: fa.scrollTop(),rng: a}
            }
        };
        this.loadBookmark = function() {
            if (!y && ha) {
                c.focus();
                var a = ha.rng;
                if (i)
                    a.select();
                else {
                    var b = c.getSel();
                    b.removeAllRanges();
                    b.addRange(a)
                }
                fa.scrollTop(ha.top);
                ha = null
            }
        };
        this.focus = function() {
            y ? d("#sourceCode", k).focus() : W.focus();
            if (i) {
                var a = c.getRng();
                a.parentElement && a.parentElement().ownerDocument !== k && c.setTextCursor()
            }
            return !1
        };
        this.setTextCursor = 
        function(a) {
            var b = c.getRng(!0), e = k.body;
            if (i)
                b.moveToElementText(e);
            else {
                for (var d = a ? "lastChild" : "firstChild"; 3 != e.nodeType && e[d]; )
                    e = e[d];
                b.selectNode(e)
            }
            b.collapse(a ? !1 : !0);
            i ? b.select() : (a = c.getSel(), a.removeAllRanges(), a.addRange(b))
        };
        this.getSel = function() {
            return k.selection ? k.selection : W.getSelection()
        };
        this.getRng = function(a) {
            var b, e;
            try {
                a || (b = c.getSel(), e = b.createRange ? b.createRange() : 0 < b.rangeCount ? b.getRangeAt(0) : null), e || (e = k.body.createTextRange ? k.body.createTextRange() : k.createRange())
            } catch (d) {
            }
            return e
        };
        this.getParent = function(a) {
            var b = c.getRng(), e;
            i ? e = b.item ? b.item(0) : b.parentElement() : (e = b.commonAncestorContainer, b.collapsed || b.startContainer === b.endContainer && 2 > b.startOffset - b.endOffset && b.startContainer.hasChildNodes() && (e = b.startContainer.childNodes[b.startOffset]));
            a = a ? a : "*";
            e = d(e);
            e.is(a) || (e = d(e).closest(a));
            return e
        };
        this.getSelect = function(a) {
            var b = c.getSel(), e = c.getRng(), f = !0, f = !e || e.item ? !1 : !b || 0 === e.boundingWidth || e.collapsed;
            if ("text" === a)
                return f ? "" : e.text || (b.toString ? b.toString() : 
                "");
            e.cloneContents ? (a = d("<div></div>"), (e = e.cloneContents()) && a.append(e), e = a.html()) : e = M(e.item) ? e.item(0).outerHTML : M(e.htmlText) ? e.htmlText : e.toString();
            f && (e = "");
            e = c.processHTML(e, "read");
            e = c.cleanHTML(e);
            return e = c.formatXHTML(e)
        };
        this.pasteHTML = function(a, b) {
            if (y)
                return !1;
            c.focus();
            var a = c.processHTML(a, "write"), e = c.getSel(), f = c.getRng();
            if (b !== $) {
                if (f.item) {
                    var h = f.item(0), f = c.getRng(!0);
                    f.moveToElementText(h);
                    f.select()
                }
                f.collapse(b)
            }
            a += "<" + (i ? "img" : "span") + ' id="_xhe_temp" width="0" height="0" />';
            if (f.insertNode) {
                if (0 < d(f.startContainer).closest("style,script").length)
                    return !1;
                f.deleteContents();
                f.insertNode(f.createContextualFragment(a))
            } else
                "control" === e.type.toLowerCase() && (e.clear(), f = c.getRng()), f.pasteHTML(a);
            var h = d("#_xhe_temp", k), n = h[0];
            i ? (f.moveToElementText(n), f.select()) : (f.selectNode(n), e.removeAllRanges(), e.addRange(f));
            h.remove()
        };
        this.pasteText = function(a, b) {
            a || (a = "");
            a = c.domEncode(a);
            a = a.replace(/\r?\n/g, "<br />");
            c.pasteHTML(a, b)
        };
        this.appendHTML = function(a) {
            if (y)
                return !1;
            c.focus();
            a = c.processHTML(a, "write");
            d(k.body).append(a);
            c.setTextCursor(!0)
        };
        this.domEncode = function(a) {
            return a.replace(nb, function(a) {
                return mb[a]
            })
        };
        this.setSource = function(a) {
            ha = null;
            if ("string" !== typeof a && "" !== a)
                a = z.value;
            y ? d("#sourceCode", k).val(a) : (g.beforeSetSource && (a = g.beforeSetSource(a)), a = c.cleanHTML(a), a = c.formatXHTML(a), a = c.processHTML(a, "write"), i ? (k.body.innerHTML = '<img id="_xhe_temp" width="0" height="0" />' + a, d("#_xhe_temp", k).remove()) : k.body.innerHTML = a)
        };
        this.processHTML = function(a, 
        b) {
            if ("write" === b) {
                a = a.replace(/(<(\/?)(\w+))((?:\s+[\w\-:]+\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+))*)\s*((\/?)>)/g, function(a, b, c, e, d, f, h) {
                    e = e.toLowerCase();
                    qa ? "strong" === e ? e = "b" : "em" === e && (e = "i") : R && ("strong" === e ? (e = "span", c || (d += ' class="Apple-style-span" style="font-weight: bold;"')) : "em" === e ? (e = "span", c || (d += ' class="Apple-style-span" style="font-style: italic;"')) : "u" === e ? (e = "span", c || (d += ' class="Apple-style-span" style="text-decoration: underline;"')) : "strike" === e && (e = "span", c || (d += ' class="Apple-style-span" style="text-decoration: line-through;"')));
                    var m, x = "";
                    if ("del" === e)
                        e = "strike";
                    else if ("img" === e)
                        d = d.replace(/\s+emot\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/i, function(a, b) {
                            m = b.match(/^(["']?)(.*)\1/)[2];
                            m = m.split(",");
                            m[1] || (m[1] = m[0], m[0] = "");
                            "default" === m[0] && (m[0] = "");
                            return g.emotMark ? a : ""
                        });
                    else if ("a" === e)
                        !d.match(/ href=[^ ]/i) && d.match(/ name=[^ ]/i) && (x += " xhe-anchor"), h && (f = "></a>");
                    else if ("table" === e && !c && (a = d.match(/\s+border\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/i), !a || a[1].match(/^(["']?)\s*0\s*\1$/)))
                        x += " xhe-border";
                    var Z, d = d.replace(/\s+([\w\-:]+)\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/g, 
                    function(a, b, c) {
                        b = b.toLowerCase();
                        c = c.match(/^(["']?)(.*)\1/)[2];
                        aft = "";
                        if (i && b.match(/^(disabled|checked|readonly|selected)$/) && c.match(/^(false|0)$/i) || "img" === e && m && "src" === b)
                            return "";
                        b.match(/^(src|href)$/) && (aft = " _xhe_" + b + '="' + c + '"', B && (c = V(c, "abs", B)));
                        x && "class" === b && (c += " " + x, x = "");
                        R && "style" === b && "span" === e && c.match(/(^|;)\s*(font-family|font-size|color|background-color)\s*:\s*[^;]+\s*(;|$)/i) && (Z = !0);
                        return " " + b + '="' + c + '"' + aft
                    });
                    m && (a = Y + (m[0] ? m[0] : "default") + "/" + m[1] + ".gif", d += ' src="' + 
                    a + '" _xhe_src="' + a + '"');
                    Z && (d += ' class="Apple-style-span"');
                    x && (d += ' class="' + x + '"');
                    return "<" + c + e + d + f
                });
                i && (a = a.replace(/&apos;/ig, "&#39;"));
                if (!R)
                    var e = function(a, b, e, c, d, f) {
                        var b = "", h, m;
                        (h = c.match(/font-family\s*:\s*([^;"]+)/i)) && (b += ' face="' + h[1] + '"');
                        if (h = c.match(/font-size\s*:\s*([^;"]+)/i)) {
                            h = h[1].toLowerCase();
                            for (var x = 0; x < T.length; x++)
                                if (h === T[x].n || h === T[x].s) {
                                    m = x + 1;
                                    break
                                }
                            m && (b += ' size="' + m + '"', c = c.replace(/(^|;)(\s*font-size\s*:\s*[^;"]+;?)+/ig, "$1"))
                        }
                        if (m = c.match(/(?:^|[\s;])color\s*:\s*([^;"]+)/i)) {
                            if (h = 
                            m[1].match(/\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i)) {
                                m[1] = "#";
                                for (x = 1; 3 >= x; x++)
                                    m[1] += (h[x] - 0).toString(16)
                            }
                            m[1] = m[1].replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i, "#$1$1$2$2$3$3");
                            b += ' color="' + m[1] + '"'
                        }
                        c = c.replace(/(^|;)(\s*(font-family|color)\s*:\s*[^;"]+;?)+/ig, "$1");
                        return "" !== b ? (c && (b += ' style="' + c + '"'), "<font" + (e ? e : "") + b + (d ? d : "") + ">" + f + "</font>") : a
                    }, a = a.replace(/<(span)(\s+[^>]*?)?\s+style\s*=\s*"((?:[^"]*?;)?\s*(?:font-family|font-size|color)\s*:[^"]*)"( [^>]*)?>(((?!<\1(\s+[^>]*?)?>)[\s\S]|<\1(\s+[^>]*?)?>((?!<\1(\s+[^>]*?)?>)[\s\S]|<\1(\s+[^>]*?)?>((?!<\1(\s+[^>]*?)?>)[\s\S])*?<\/\1>)*?<\/\1>)*?)<\/\1>/ig, 
                    e), a = a.replace(/<(span)(\s+[^>]*?)?\s+style\s*=\s*"((?:[^"]*?;)?\s*(?:font-family|font-size|color)\s*:[^"]*)"( [^>]*)?>(((?!<\1(\s+[^>]*?)?>)[\s\S]|<\1(\s+[^>]*?)?>((?!<\1(\s+[^>]*?)?>)[\s\S])*?<\/\1>)*?)<\/\1>/ig, e), a = a.replace(/<(span)(\s+[^>]*?)?\s+style\s*=\s*"((?:[^"]*?;)?\s*(?:font-family|font-size|color)\s*:[^"]*)"( [^>]*)?>(((?!<\1(\s+[^>]*?)?>)[\s\S])*?)<\/\1>/ig, e);
                a = a.replace(/<(td|th)(\s+[^>]*?)?>(\s|&nbsp;)*<\/\1>/ig, "<$1$2>" + (i ? "" : "<br />") + "</$1>")
            } else {
                if (R)
                    for (var c = [{r: /font-weight\s*:\s*bold;?/ig,
                            t: "strong"}, {r: /font-style\s*:\s*italic;?/ig,t: "em"}, {r: /text-decoration\s*:\s*underline;?/ig,t: "u"}, {r: /text-decoration\s*:\s*line-through;?/ig,t: "strike"}], e = function(a, b, e, d, h) {
                        for (var a = (e ? e : "") + (d ? d : ""), g = [], D = [], m, e = 0; e < c.length; e++)
                            b = c[e].r, m = c[e].t, a = a.replace(b, function() {
                                g.push("<" + m + ">");
                                D.push("</" + m + ">");
                                return ""
                            });
                        a = a.replace(/\s+style\s*=\s*"\s*"/i, "");
                        return (a ? "<span" + a + ">" : "") + g.join("") + h + D.join("") + (a ? "</span>" : "")
                    }, d = 0; 2 > d; d++)
                        a = a.replace(/<(span)(\s+[^>]*?)?\s+class\s*=\s*"Apple-style-span"(\s+[^>]*?)?>(((?!<\1(\s+[^>]*?)?>)[\s\S]|<\1(\s+[^>]*?)?>((?!<\1(\s+[^>]*?)?>)[\s\S]|<\1(\s+[^>]*?)?>((?!<\1(\s+[^>]*?)?>)[\s\S])*?<\/\1>)*?<\/\1>)*?)<\/\1>/ig, 
                        e), a = a.replace(/<(span)(\s+[^>]*?)?\s+class\s*=\s*"Apple-style-span"(\s+[^>]*?)?>(((?!<\1(\s+[^>]*?)?>)[\s\S]|<\1(\s+[^>]*?)?>((?!<\1(\s+[^>]*?)?>)[\s\S])*?<\/\1>)*?)<\/\1>/ig, e), a = a.replace(/<(span)(\s+[^>]*?)?\s+class\s*=\s*"Apple-style-span"(\s+[^>]*?)?>(((?!<\1(\s+[^>]*?)?>)[\s\S])*?)<\/\1>/ig, e);
                a = a.replace(/(<(\w+))((?:\s+[\w\-:]+\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+))*)\s*(\/?>)/g, function(a, b, e, c, d) {
                    var e = e.toLowerCase(), f, c = c.replace(/\s+_xhe_(?:src|href)\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/i, function(a, 
                    b) {
                        f = b.match(/^(["']?)(.*)\1/)[2];
                        return ""
                    });
                    f && va && (f = V(f, va, B));
                    c = c.replace(/\s+([\w\-:]+)\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/g, function(a, b, c) {
                        b = b.toLowerCase();
                        c = c.match(/^(["']?)(.*)\1/)[2].replace(/"/g, "'");
                        if ("class" === b) {
                            if (c.match(/^["']?(apple|webkit)/i))
                                return "";
                            c = c.replace(/\s?xhe-[a-z]+/ig, "");
                            if ("" === c)
                                return ""
                        } else {
                            if (b.match(/^((_xhe_|_moz_|_webkit_)|jquery\d+)/i))
                                return "";
                            if (f && b.match(/^(src|href)$/i))
                                return " " + b + '="' + f + '"';
                            "style" === b && (c = c.replace(/(^|;)\s*(font-size)\s*:\s*([a-z-]+)\s*(;|$)/i, 
                            function(a, b, c, e, d) {
                                for (var f, h = 0; h < T.length; h++)
                                    if (a = T[h], e === a.n) {
                                        f = a.s;
                                        break
                                    }
                                return b + c + ":" + f + d
                            }))
                        }
                        return " " + b + '="' + c + '"'
                    });
                    "img" === e && !c.match(/\s+alt\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/i) && (c += ' alt=""');
                    return b + c + d
                });
                a = a.replace(/(<(td|th)(?:\s+[^>]*?)?>)\s*([\s\S]*?)(<br(\s*\/)?>)?\s*<\/\2>/ig, function(a, b, c, e) {
                    return b + (e ? e : "&nbsp;") + "</" + c + ">"
                });
                a = a.replace(/^\s*(?:<(p|div)(?:\s+[^>]*?)?>)?\s*(<span(?:\s+[^>]*?)?>\s*<\/span>|<br(?:\s+[^>]*?)?>|&nbsp;)*\s*(?:<\/\1>)?\s*$/i, "")
            }
            return a = a.replace(/(<pre(?:\s+[^>]*?)?>)([\s\S]+?)(<\/pre>)/gi, 
            function(a, b, c, e) {
                return b + c.replace(/<br\s*\/?>/ig, "\r\n") + e
            })
        };
        this.getSource = function(a) {
            var b, e = g.beforeGetSource;
            y ? (b = d("#sourceCode", k).val(), e || (b = c.formatXHTML(b, !1))) : (b = c.processHTML(k.body.innerHTML, "read"), b = c.cleanHTML(b), b = c.formatXHTML(b, a), e && (b = e(b)));
            return z.value = b
        };
        this.cleanWord = function(a) {
            var b = g.cleanPaste;
            if (0 < b && 3 > b && a.match(/mso(-|normal)|WordDocument|<table\s+[^>]*?x:str/i)) {
                for (var a = a.replace(/<\!--[\s\S]*?--\>|<!(--)?\[[\s\S]+?\](--)?>|<style(\s+[^>]*?)?>[\s\S]*?<\/style>/ig, 
                ""), a = a.replace(/\r?\n/ig, ""), a = a.replace(/(<(\/?)([\w\-:]+))((?:\s+[\w\-:]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+))?)*)\s*(\/?>)/g, function(a, c, e, d, g, u) {
                    d = d.toLowerCase();
                    if (d.match(/^(link|img)$/) && g.match(/file:\/\//i) || d.match(/:/) || "span" === d && 2 === b || !e && (g = g.replace(/\s([\w\-:]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^>\s]+))?/ig, function(a, c, e) {
                        c = c.toLowerCase();
                        e = e.match(/^(["']?)(.*)\1/)[2];
                        if (c.match(/:/) || c.match(/^(class|lang|language|span)$/) || "td" === d && ("height" === c || "width" === c && !g.match(/\scolspan="\d+"/i)))
                            return "";
                        return "style" === c ? 2 === b ? "" : (e = e.replace(/"|&quot;/ig, "'").replace(/\s*([^:]+)\s*:\s*(.*?)(;|$)/ig, function(a, b, c) {
                            return /^(color|background)$/i.test(b) ? b + ":" + c + ";" : ""
                        }).replace(/^\s+|\s+$/g, "")) ? " " + c + '="' + e + '"' : "" : a
                    }), "span" === d && /^\s*$/.test(g)))
                        return "";
                    return c + g + u
                }), c = 0; 3 > c; c++)
                    a = a.replace(/<([^\s>]+)(\s+[^>]*)?>\s*<\/\1>/g, function(a, b) {
                        return b.match(/^a$/i) ? a : ""
                    });
                for (c = 0; 3 > c; c++)
                    a = a.replace(/<font(\s+[^>]+)><font(\s+[^>]+)>/ig, function(a, b, c) {
                        return "<font" + b + c + ">"
                    })
            }
            return a
        };
        this.cleanHTML = 
        function(a) {
            var a = a.replace(/<!?\/?(DOCTYPE|html|body|meta)(\s+[^>]*?)?>/ig, ""), b, a = a.replace(/<head(?:\s+[^>]*?)?>([\s\S]*?)<\/head>/i, function(a, c) {
                b = c.match(/<(script|style)(\s+[^>]*?)?>[\s\S]*?<\/\1>/ig);
                return ""
            });
            b && (a = b.join("") + a);
            a = a.replace(/<\??xml(:\w+)?(\s+[^>]*?)?>([\s\S]*?<\/xml>)?/ig, "");
            g.internalScript || (a = a.replace(/<script(\s+[^>]*?)?>[\s\S]*?<\/script>/ig, ""));
            g.internalStyle || (a = a.replace(/<style(\s+[^>]*?)?>[\s\S]*?<\/style>/ig, ""));
            if (!g.linkTag || !g.inlineScript || !g.inlineStyle)
                a = 
                a.replace(/(<(\w+))((?:\s+[\w-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+))*)\s*(\/?>)/ig, function(a, b, c, d, j) {
                    if (!g.linkTag && "link" === c.toLowerCase())
                        return "";
                    g.inlineScript || (d = d.replace(/\s+on(?:click|dblclick|mouse(down|up|move|over|out|enter|leave|wheel)|key(down|press|up)|change|select|submit|reset|blur|focus|load|unload)\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/ig, ""));
                    g.inlineStyle || (d = d.replace(/\s+(style|class)\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)/ig, ""));
                    return b + d + j
                });
            return a = a.replace(/<\/(strong|b|u|strike|em|i)>((?:\s|<br\/?>|&nbsp;)*?)<\1(\s+[^>]*?)?>/ig, 
            "$2")
        };
        this.formatXHTML = function(a, b) {
            function e(a) {
                for (var b = {}, a = a.split(","), c = 0; c < a.length; c++)
                    b[a[c]] = !0;
                return b
            }
            function d(a) {
                var a = a.toLowerCase(), b = o[a];
                return b ? b : a
            }
            function h(a, b, c) {
                if (m[a])
                    for (; E.last() && x[E.last()]; )
                        g(E.last());
                Z[a] && E.last() === a && g(a);
                (c = D[a] || !!c) || E.push(a);
                var e = [];
                e.push("<" + a);
                b.replace(y, function(a, b, c, d, f) {
                    b = b.toLowerCase();
                    e.push(" " + b + '="' + (c ? c : d ? d : f ? f : k[b] ? b : "").replace(/"/g, "'") + '"')
                });
                e.push((c ? " /" : "") + ">");
                u(e.join(""), a, !0);
                "pre" === a && (B = !0)
            }
            function g(a) {
                if (a)
                    for (b = 
                    E.length - 1; 0 <= b && !(E[b] === a); b--)
                        ;
                else
                    var b = 0;
                if (0 <= b) {
                    for (var c = E.length - 1; c >= b; c--)
                        u("</" + E[c] + ">", E[c]);
                    E.length = b
                }
                "pre" === a && (B = !1, w--)
            }
            function j(a) {
                u(c.domEncode(a))
            }
            function l(a) {
                G.push(a.replace(/^[\s\r\n]+|[\s\r\n]+$/g, ""))
            }
            function u(a, c, e) {
                B || (a = a.replace(/(\t*\r?\n\t*)+/g, ""));
                if (!B && !0 === b)
                    if (a.match(/^\s*$/))
                        G.push(a);
                    else {
                        var d = m[c];
                        d ? (e && w++, "" === A && w--) : A && w++;
                        ((d ? c : "") !== A || d) && r();
                        G.push(a);
                        "br" === c && r();
                        d && (D[c] || !e) && w--;
                        A = d ? c : ""
                    }
                else
                    G.push(a)
            }
            function r() {
                G.push("\r\n");
                if (0 < 
                w)
                    for (var a = w; a--; )
                        G.push("\t")
            }
            function s(a, b, c, e) {
                if (!c)
                    return e;
                var d = "", c = c.replace(/ face\s*=\s*"\s*([^"]*)\s*"/i, function(a, b) {
                    b && (d += "font-family:" + b + ";");
                    return ""
                }), c = c.replace(/ size\s*=\s*"\s*(\d+)\s*"/i, function(a, b) {
                    d += "font-size:" + T[(7 < b ? 7 : 1 > b ? 1 : b) - 1].s + ";";
                    return ""
                }), c = c.replace(/ color\s*=\s*"\s*([^"]*)\s*"/i, function(a, b) {
                    b && (d += "color:" + b + ";");
                    return ""
                }), c = c.replace(/ style\s*=\s*"\s*([^"]*)\s*"/i, function(a, b) {
                    b && (d += b);
                    return ""
                });
                return (c += ' style="' + d + '"') ? "<span" + c + ">" + e + "</span>" : 
                e
            }
            var D = e("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"), m = e("address,applet,blockquote,button,center,dd,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,table,tbody,td,tfoot,th,thead,tr,ul,script"), x = e("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), 
            Z = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), k = e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), i = e("script,style"), o = {b: "strong",i: "em",s: "del",strike: "del"}, q = /<(?:\/([^\s>]+)|!([^>]*?)|([\w\-:]+)((?:"[^"]*"|'[^']*'|[^"'<>])*)\s*(\/?))>/g, y = /\s*([\w\-:]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+)))?/g, G = [], E = [];
            E.last = function() {
                return this[this.length - 1]
            };
            for (var v, C, p = 0, t, z, w = -1, A = "body", B = !1; v = q.exec(a); ) {
                C = v.index;
                C > p && (p = 
                a.substring(p, C), t ? z.push(p) : j(p));
                p = q.lastIndex;
                if (C = v[1])
                    if (C = d(C), t && C === t && (l(z.join("")), z = t = null), !t) {
                        g(C);
                        continue
                    }
                t ? z.push(v[0]) : (C = v[3]) ? (C = d(C), h(C, v[4], v[5]), i[C] && (t = C, z = [])) : v[2] && G.push(v[0])
            }
            a.length > p && j(a.substring(p, a.length));
            g();
            a = G.join("");
            G = null;
            a = a.replace(/<(font)(\s+[^>]*?)?>(((?!<\1(\s+[^>]*?)?>)[\s\S]|<\1(\s+[^>]*?)?>((?!<\1(\s+[^>]*?)?>)[\s\S]|<\1(\s+[^>]*?)?>((?!<\1(\s+[^>]*?)?>)[\s\S])*?<\/\1>)*?<\/\1>)*?)<\/\1>/ig, s);
            a = a.replace(/<(font)(\s+[^>]*?)?>(((?!<\1(\s+[^>]*?)?>)[\s\S]|<\1(\s+[^>]*?)?>((?!<\1(\s+[^>]*?)?>)[\s\S])*?<\/\1>)*?)<\/\1>/ig, 
            s);
            a = a.replace(/<(font)(\s+[^>]*?)?>(((?!<\1(\s+[^>]*?)?>)[\s\S])*?)<\/\1>/ig, s);
            return a = a.replace(/^(\s*\r?\n)+|(\s*\r?\n)+$/g, "")
        };
        this.toggleShowBlocktag = function(a) {
            na !== a && (na = !na, a = d(k.body), na ? (Q += " showBlocktag", a.addClass("showBlocktag")) : (Q = Q.replace(" showBlocktag", ""), a.removeClass("showBlocktag")))
        };
        this.toggleSource = function(a) {
            if (y !== a) {
                q.find("[cmd=Source]").toggleClass("xheEnabled").toggleClass("xheActive");
                var b = k.body, e = d(b), f, h, a = 0, g = "";
                if (y)
                    f = c.getSource(), e.html("").removeAttr("scroll").attr("class", 
                    "editMode" + Q), i ? b.contentEditable = "true" : k.designMode = "On", qa && (c._exec("inserthtml", "-"), d("#" + za).show().focus().hide()), g = "\u6e90\u4ee3\u7801";
                else {
                    c.pasteHTML('<span id="_xhe_cursor"></span>', !0);
                    f = c.getSource(!0);
                    a = f.indexOf('<span id="_xhe_cursor"></span>');
                    if (!Ca)
                        a = f.substring(0, a).replace(/\r/g, "").length;
                    f = f.replace(/(\r?\n\s*|)<span id="_xhe_cursor"><\/span>(\s*\r?\n|)/, function(a, b, c) {
                        return b && c ? "\r\n" : b + c
                    });
                    i ? b.contentEditable = "false" : k.designMode = "Off";
                    e.attr("scroll", "no").attr("class", 
                    "sourceMode").html('<textarea id="sourceCode" wrap="soft" spellcheck="false" style="width:100%;height:100%" />');
                    h = d("#sourceCode", e).blur(c.getSource)[0];
                    g = "\u53ef\u89c6\u5316\u7f16\u8f91"
                }
                y = !y;
                c.setSource(f);
                c.focus();
                y ? h.setSelectionRange ? h.setSelectionRange(a, a) : (h = h.createTextRange(), h.move("character", a), h.select()) : c.setTextCursor();
                q.find("[cmd=Source]").attr("title", g).find("span").text(g);
                q.find("[cmd=Source],[cmd=Preview]").toggleClass("xheEnabled");
                q.find(".xheButton").not("[cmd=Source],[cmd=Fullscreen],[cmd=About]").toggleClass("xheEnabled").attr("aria-disabled", 
                y ? !0 : !1);
                setTimeout(La, 300)
            }
        };
        this.showPreview = function() {
            var a = g.beforeSetSource, b = c.getSource();
            a && (b = a(b));
            var a = "<html><head>" + P + "<title>\u9884\u89c8</title>" + (B ? '<base href="' + B + '"/>' : "") + "</head><body>" + b + "</body></html>", b = window.screen, b = window.open("", "xhePreview", "toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=" + Math.round(0.9 * b.width) + ",height=" + Math.round(0.8 * b.height) + ",left=" + Math.round(0.05 * b.width)), e = b.document;
            e.open();
            e.write(a);
            e.close();
            b.focus()
        };
        this.toggleFullscreen = function(a) {
            if (la !== a) {
                var a = d("#" + ja).find(".xheLayout"), b = d("#" + ja), e = jQuery.browser.version, e = i && (6 == e || 7 == e);
                la ? (e && F.after(b), a.attr("style", Za), A.height(O - q.outerHeight()), d(window).scrollTop(Pa), setTimeout(function() {
                    d(window).scrollTop(Pa)
                }, 10)) : (e && d("body").append(b), Pa = d(window).scrollTop(), Za = a.attr("style"), a.removeAttr("style"), A.height("100%"), setTimeout(Na, 100));
                qa ? (d("#" + za).show().focus().hide(), setTimeout(c.focus, 1)) : e && c.setTextCursor();
                la = !la;
                b.toggleClass("xhe_Fullscreen");
                d("html").toggleClass("xhe_Fullfix");
                q.find("[cmd=Fullscreen]").toggleClass("xheActive");
                setTimeout(La, 300)
            }
        };
        this.showMenu = function(a, b) {
            var e = d('<div class="xheMenu"></div>'), f = a.length, h = [];
            d.each(a, function(a, b) {
                "-" === b.s ? h.push('<div class="xheMenuSeparator"></div>') : h.push("<a href=\"javascript:void('" + b.v + '\')" title="' + (b.t ? b.t : b.s) + '" v="' + b.v + '" role="option" aria-setsize="' + f + '" aria-posinset="' + (a + 1) + '" tabindex="0">' + b.s + "</a>")
            });
            e.append(h.join(""));
            e.click(function(a) {
                a = a.target;
                if (!d.nodeName(a, 
                "DIV"))
                    return c.loadBookmark(), b(d(a).closest("a").attr("v")), c.hidePanel(), !1
            }).mousedown(N);
            c.saveBookmark();
            c.showPanel(e)
        };
        this.showColor = function(a) {
            var b = d('<div class="xheColor"></div>'), e = [], f = Ta.length, h = 0;
            d.each(Ta, function(a, b) {
                0 === h % 7 && e.push((0 < h ? "</div>" : "") + "<div>");
                e.push("<a href=\"javascript:void('" + b + '\')" xhev="' + b + '" title="' + b + '" style="background:' + b + '" role="option" aria-setsize="' + f + '" aria-posinset="' + (h + 1) + '"></a>');
                h++
            });
            e.push("</div>");
            b.append(e.join(""));
            b.click(function(b) {
                b = 
                b.target;
                if (d.nodeName(b, "A"))
                    return c.loadBookmark(), a(d(b).attr("xhev")), c.hidePanel(), !1
            }).mousedown(N);
            c.saveBookmark();
            c.showPanel(b)
        };
        this.showPastetext = function() {
            var a = d('<div><label for="xhePastetextValue">\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl+V)\u628a\u5185\u5bb9\u7c98\u8d34\u5230\u65b9\u6846\u91cc\uff0c\u6309 \u786e\u5b9a</label></div><div><textarea id="xhePastetextValue" wrap="soft" spellcheck="false" style="width:300px;height:100px;" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="\u786e\u5b9a" /></div>'), 
            b = d("#xhePastetextValue", a);
            d("#xheSave", a).click(function() {
                c.loadBookmark();
                var a = b.val();
                a && c.pasteText(a);
                c.hidePanel();
                return !1
            });
            c.saveBookmark();
            c.showDialog(a)
        };
        this.showLink = function() {
            var a = '<div><label for="xheLinkUrl">\u94fe\u63a5\u5730\u5740: </label><input type="text" id="xheLinkUrl" value="http://" class="xheText" /></div><div><label for="xheLinkTarget">\u6253\u5f00\u65b9\u5f0f: </label><select id="xheLinkTarget"><option selected="selected" value="">\u9ed8\u8ba4</option><option value="_blank">\u65b0\u7a97\u53e3</option><option value="_self">\u5f53\u524d\u7a97\u53e3</option><option value="_parent">\u7236\u7a97\u53e3</option></select></div><div style="display:none"><label for="xheLinkText">\u94fe\u63a5\u6587\u5b57: </label><input type="text" id="xheLinkText" value="" class="xheText" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="\u786e\u5b9a" /></div>', 
            b = ga.find("a[name]").not("[href]"), e = 0 < b.length;
            if (e) {
                var f = [];
                b.each(function() {
                    var a = d(this).attr("name");
                    f.push('<option value="#' + a + '">' + a + "</option>")
                });
                a = a.replace(/(<div><label for="xheLinkTarget)/, '<div><label for="xheLinkAnchor">\u9875\u5185\u951a\u70b9: </label><select id="xheLinkAnchor"><option value="">\u672a\u9009\u62e9</option>' + f.join("") + "</select></div>$1")
            }
            var a = d(a), h = c.getParent("a"), n = d("#xheLinkText", a), j = d("#xheLinkUrl", a), l = d("#xheLinkTarget", a), b = d("#xheSave", a), u = c.getSelect();
            e && a.find("#xheLinkAnchor").change(function() {
                var a = d(this).val();
                "" != a && j.val(a)
            });
            if (1 === h.length) {
                if (!h.attr("href"))
                    return w = null, c.exec("Anchor");
                j.val(L(h, "href"));
                l.attr("value", h.attr("target"))
            } else
                "" === u && n.val(g.defLinkText).closest("div").show();
            g.upLinkUrl && c.uploadInit(j, g.upLinkUrl, g.upLinkExt);
            b.click(function() {
                c.loadBookmark();
                var a = j.val();
                ("" === a || 0 === h.length) && c._exec("unlink");
                if ("" !== a && "http://" !== a) {
                    var b = a.split(" "), e = l.val(), f = n.val();
                    if (1 < b.length) {
                        c._exec("unlink");
                        u = c.getSelect();
                        var g = '<a href="xhe_tmpurl"', Z = [];
                        "" !== e && (g += ' target="' + e + '"');

                        for (var g = g + ">xhe_tmptext</a>", f = "" !== u ? u : f ? f : a, i = 0, pb = b.length; i < pb; i++)
                            a = b[i], "" !== a && (a = a.split("||"), e = g, e = e.replace("xhe_tmpurl", a[0]), e = e.replace("xhe_tmptext", a[1] ? a[1] : f), Z.push(e));
                        c.pasteHTML(Z.join("&nbsp;"))
                    } else
                        a = b[0].split("||"), f || (f = a[0]), f = a[1] ? a[1] : "" !== u ? "" : f ? f : a[0], 0 === h.length ? (f ? c.pasteHTML('<a href="#xhe_tmpurl">' + f + "</a>") : c._exec("createlink", "#xhe_tmpurl"), h = d('a[href$="#xhe_tmpurl"]', k)) : f && 
                        !R && h.text(f), L(h, "href", a[0]), "" !== e ? h.attr("target", e) : h.removeAttr("target")
                }
                c.hidePanel();
                return !1
            });
            c.saveBookmark();
            c.showDialog(a)
        };
        this.showAnchor = function() {
            var a = d('<div><label for="xheAnchorName">\u951a\u70b9\u540d\u79f0: </label><input type="text" id="xheAnchorName" value="" class="xheText" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="\u786e\u5b9a" /></div>'), b = c.getParent("a"), e = d("#xheAnchorName", a), f = d("#xheSave", a);
            if (1 === b.length) {
                if (b.attr("href"))
                    return w = 
                    null, c.exec("Link");
                e.val(b.attr("name"))
            }
            f.click(function() {
                c.loadBookmark();
                var a = e.val();
                a ? 0 === b.length ? c.pasteHTML('<a name="' + a + '"></a>') : b.attr("name", a) : 1 === b.length && b.remove();
                c.hidePanel();
                return !1
            });
            c.saveBookmark();
            c.showDialog(a)
        };
        this.showImg = function() {
            var a = d('<div><label for="xheImgUrl">\u56fe\u7247\u6587\u4ef6: </label><input type="text" id="xheImgUrl" value="http://" class="xheText" /></div><div><div><label for="xheImgAlt">\u66ff\u6362\u6587\u672c: </label><input type="text" id="xheImgAlt" /></div><div><label for="xheImgAlign">\u5bf9\u9f50\u65b9\u5f0f: </label><select id="xheImgAlign"><option selected="selected" value="">\u9ed8\u8ba4</option><option value="left">\u5de6\u5bf9\u9f50</option><option value="right">\u53f3\u5bf9\u9f50</option><option value="top">\u9876\u7aef</option><option value="middle">\u5c45\u4e2d</option><option value="baseline">\u57fa\u7ebf</option><option value="bottom">\u5e95\u8fb9</option></select></div><div><label for="xheImgWidth">\u5bbd\u3000\u3000\u5ea6: </label><input type="text" id="xheImgWidth" style="width:40px;" /> <label for="xheImgHeight">\u9ad8\u3000\u3000\u5ea6: </label><input type="text" id="xheImgHeight" style="width:40px;" /></div><div><label for="xheImgBorder">\u8fb9\u6846\u5927\u5c0f: </label><input type="text" id="xheImgBorder" style="width:40px;" /></div><div><label for="xheImgHspace">\u6c34\u5e73\u95f4\u8ddd: </label><input type="text" id="xheImgHspace" style="width:40px;" /> <label for="xheImgVspace">\u5782\u76f4\u95f4\u8ddd: </label><input type="text" id="xheImgVspace" style="width:40px;" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="\u786e\u5b9a" /></div>'), 
            b = c.getParent("img"), e = d("#xheImgUrl", a), f = d("#xheImgAlt", a), h = d("#xheImgAlign", a), n = d("#xheImgWidth", a), j = d("#xheImgHeight", a), l = d("#xheImgBorder", a), u = d("#xheImgVspace", a), r = d("#xheImgHspace", a), s = d("#xheSave", a);
            if (1 === b.length) {
                e.val(L(b, "src"));
                f.val(b.attr("alt"));
                h.val(b.attr("align"));
                n.val(b.attr("width"));
                j.val(b.attr("height"));
                l.val(b.attr("border"));
                var D = b.attr("vspace"), m = b.attr("hspace");
                u.val(0 >= D ? "" : D);
                r.val(0 >= m ? "" : m)
            }
            g.upImgUrl && c.uploadInit(e, g.upImgUrl, g.upImgExt);
            s.click(function() {
                c.loadBookmark();
                var a = e.val();
                if ("" !== a && "http://" !== a) {
                    var g = a.split(" "), m = f.val(), D = h.val(), s = n.val(), i = j.val(), o = l.val(), p = u.val(), q = r.val();
                    if (1 < g.length) {
                        var v = '<img src="xhe_tmpurl"', t = [];
                        "" !== m && (v += ' alt="' + m + '"');
                        "" !== D && (v += ' align="' + D + '"');
                        "" !== s && (v += ' width="' + s + '"');
                        "" !== i && (v += ' height="' + i + '"');
                        "" !== o && (v += ' border="' + o + '"');
                        "" !== p && (v += ' vspace="' + p + '"');
                        "" !== q && (v += ' hspace="' + q + '"');
                        var v = v + " />", w;
                        for (w in g)
                            a = g[w], "" !== a && (a = a.split("||"), m = v, m = m.replace("xhe_tmpurl", a[0]), a[1] && (m = '<a href="' + 
                            a[1] + '" target="_blank">' + m + "</a>"), t.push(m));
                        c.pasteHTML(t.join("&nbsp;"))
                    } else
                        1 === g.length && (a = g[0], "" !== a && (a = a.split("||"), 0 === b.length && (c.pasteHTML('<img src="' + a[0] + '#xhe_tmpurl" />'), b = d('img[src$="#xhe_tmpurl"]', k)), L(b, "src", a[0]), "" !== m && b.attr("alt", m), "" !== D ? b.attr("align", D) : b.removeAttr("align"), "" !== s ? b.attr("width", s) : b.removeAttr("width"), "" !== i ? b.attr("height", i) : b.removeAttr("height"), "" !== o ? b.attr("border", o) : b.removeAttr("border"), "" !== p ? b.attr("vspace", p) : b.removeAttr("vspace"), 
                        "" !== q ? b.attr("hspace", q) : b.removeAttr("hspace"), a[1] && (g = b.parent("a"), 0 === g.length && (b.wrap("<a></a>"), g = b.parent("a")), L(g, "href", a[1]), g.attr("target", "_blank"))))
                } else
                    1 === b.length && b.remove();
                c.hidePanel();
                return !1
            });
            c.saveBookmark();
            c.showDialog(a)
        };
        this.showEmbed = function(a, b, e, f, g, n, j) {
            var b = d(b), l = c.getParent('embed[type="' + e + '"],embed[classid="' + f + '"]'), u = d("#xhe" + a + "Url", b), r = d("#xhe" + a + "Width", b), s = d("#xhe" + a + "Height", b), a = d("#xheSave", b);
            n && c.uploadInit(u, n, j);
            1 === l.length && (u.val(L(l, 
            "src")), r.val(l.attr("width")), s.val(l.attr("height")));
            a.click(function() {
                c.loadBookmark();
                var a = u.val();
                if ("" !== a && "http://" !== a) {
                    var b = r.val(), j = s.val(), n = /^\d+%?$/;
                    n.test(b) || (b = 412);
                    n.test(j) || (j = 300);
                    var i = '<embed type="' + e + '" classid="' + f + '" src="xhe_tmpurl"' + g, n = a.split(" ");
                    if (1 < n.length) {
                        var o, p = [], i = i + ' width="xhe_width" height="xhe_height" />', q;
                        for (q in n)
                            a = n[q].split("||"), o = i, o = o.replace("xhe_tmpurl", a[0]), o = o.replace("xhe_width", a[1] ? a[1] : b), o = o.replace("xhe_height", a[2] ? a[2] : j), "" !== 
                            a && p.push(o);
                        c.pasteHTML(p.join("&nbsp;"))
                    } else
                        1 === n.length && (a = n[0].split("||"), 0 === l.length && (c.pasteHTML(i.replace("xhe_tmpurl", a[0] + "#xhe_tmpurl") + " />"), l = d('embed[src$="#xhe_tmpurl"]', k)), L(l, "src", a[0]), l.attr("width", a[1] ? a[1] : b), l.attr("height", a[2] ? a[2] : j))
                } else
                    1 === l.length && l.remove();
                c.hidePanel();
                return !1
            });
            c.saveBookmark();
            c.showDialog(b)
        };
        this.showEmot = function(a) {
            var b = d('<div class="xheEmot"></div>'), a = a ? a : Ra ? Ra : "default", e = Aa[a], f = Y + a + "/", g = 0, n = [], j = "", j = e.width, l = e.height, u = e.line, 
            r = e.count, e = e.list;
            if (r)
                for (e = 1; e <= r; e++)
                    g++, n.push("<a href=\"javascript:void('" + e + '\')" style="background-image:url(' + f + e + '.gif);" emot="' + a + "," + e + '" xhev="" title="' + e + '" role="option">&nbsp;</a>'), 0 === g % u && n.push("<br />");
            else
                d.each(e, function(b, c) {
                    g++;
                    n.push("<a href=\"javascript:void('" + c + '\')" style="background-image:url(' + f + b + '.gif);" emot="' + a + "," + b + '" title="' + c + '" xhev="' + c + '" role="option">&nbsp;</a>');
                    0 === g % u && n.push("<br />")
                });
            var r = u * (j + 12), e = Math.ceil(g / u) * (l + 12), s = 0.75 * r;
            e <= s && 
            (s = "");
            j = d("<style>" + (s ? ".xheEmot div{width:" + (r + 20) + "px;height:" + s + "px;}" : "") + ".xheEmot div a{width:" + j + "px;height:" + l + "px;}</style><div>" + n.join("") + "</div>").click(function(a) {
                var a = a.target, b = d(a);
                if (d.nodeName(a, "A"))
                    return c.loadBookmark(), c.pasteHTML('<img emot="' + b.attr("emot") + '" alt="' + b.attr("xhev") + '">'), c.hidePanel(), !1
            }).mousedown(N);
            b.append(j);
            var i = 0, m = ['<ul role="tablist">'];
            d.each(Aa, function(b, c) {
                i++;
                m.push("<li" + (a === b ? ' class="cur"' : "") + ' role="presentation"><a href="javascript:void(\'' + 
                c.name + '\')" group="' + b + '" role="tab" tabindex="0">' + c.name + "</a></li>")
            });
            1 < i && (m.push('</ul><br style="clear:both;" />'), j = d(m.join("")).click(function(a) {
                Ra = d(a.target).attr("group");
                c.exec("Emot");
                return !1
            }).mousedown(N), b.append(j));
            c.saveBookmark();
            c.showPanel(b)
        };
        this.showTable = function() {
            var a = d('<div><label for="xheTableRows">\u884c\u3000\u3000\u6570: </label><input type="text" id="xheTableRows" style="width:40px;" value="3" /> <label for="xheTableColumns">\u5217\u3000\u3000\u6570: </label><input type="text" id="xheTableColumns" style="width:40px;" value="2" /></div><div><label for="xheTableHeaders">\u6807\u9898\u5355\u5143: </label><select id="xheTableHeaders"><option selected="selected" value="">\u65e0</option><option value="row">\u7b2c\u4e00\u884c</option><option value="col">\u7b2c\u4e00\u5217</option><option value="both">\u7b2c\u4e00\u884c\u548c\u7b2c\u4e00\u5217</option></select></div><div><label for="xheTableWidth">\u5bbd\u3000\u3000\u5ea6: </label><input type="text" id="xheTableWidth" style="width:40px;" value="200" /> <label for="xheTableHeight">\u9ad8\u3000\u3000\u5ea6: </label><input type="text" id="xheTableHeight" style="width:40px;" value="" /></div><div><label for="xheTableBorder">\u8fb9\u6846\u5927\u5c0f: </label><input type="text" id="xheTableBorder" style="width:40px;" value="1" /></div><div><label for="xheTableCellSpacing">\u8868\u683c\u95f4\u8ddd: </label><input type="text" id="xheTableCellSpacing" style="width:40px;" value="1" /> <label for="xheTableCellPadding">\u8868\u683c\u586b\u5145: </label><input type="text" id="xheTableCellPadding" style="width:40px;" value="1" /></div><div><label for="xheTableAlign">\u5bf9\u9f50\u65b9\u5f0f: </label><select id="xheTableAlign"><option selected="selected" value="">\u9ed8\u8ba4</option><option value="left">\u5de6\u5bf9\u9f50</option><option value="center">\u5c45\u4e2d</option><option value="right">\u53f3\u5bf9\u9f50</option></select></div><div><label for="xheTableCaption">\u8868\u683c\u6807\u9898: </label><input type="text" id="xheTableCaption" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="\u786e\u5b9a" /></div>'), 
            b = d("#xheTableRows", a), e = d("#xheTableColumns", a), f = d("#xheTableHeaders", a), g = d("#xheTableWidth", a), n = d("#xheTableHeight", a), j = d("#xheTableBorder", a), l = d("#xheTableCellSpacing", a), u = d("#xheTableCellPadding", a), r = d("#xheTableAlign", a), s = d("#xheTableCaption", a);
            d("#xheSave", a).click(function() {
                c.loadBookmark();
                var a = s.val(), d = j.val(), i = b.val(), k = e.val(), o = f.val(), p = g.val(), q = n.val(), t = l.val(), w = u.val(), z = r.val(), d = "<table" + ("" !== d ? ' border="' + d + '"' : "") + ("" !== p ? ' width="' + p + '"' : "") + ("" !== q ? ' height="' + 
                q + '"' : "") + ("" !== t ? ' cellspacing="' + t + '"' : "") + ("" !== w ? ' cellpadding="' + w + '"' : "") + ("" !== z ? ' align="' + z + '"' : "") + ">";
                "" !== a && (d += "<caption>" + a + "</caption>");
                if ("row" === o || "both" === o) {
                    d += "<tr>";
                    for (a = 0; a < k; a++)
                        d += '<th scope="col"></th>';
                    d += "</tr>";
                    i--
                }
                d += "<tbody>";
                for (a = 0; a < i; a++) {
                    d += "<tr>";
                    for (p = 0; p < k; p++)
                        d = 0 === p && ("col" === o || "both" === o) ? d + '<th scope="row"></th>' : d + "<td></td>";
                    d += "</tr>"
                }
                c.pasteHTML(d + "</tbody></table>");
                c.hidePanel();
                return !1
            });
            c.saveBookmark();
            c.showDialog(a)
        };
        this.showAbout = function() {
            var a = 
            d('<div style="font:12px Arial;width:245px;word-wrap:break-word;word-break:break-all;outline:none;" role="dialog" tabindex="-1"><p><span style="font-size:20px;color:#1997DF;">xhEditor</span><br />v1.1.13 (build 120304)</p><p>xhEditor\u662f\u57fa\u4e8ejQuery\u5f00\u53d1\u7684\u8de8\u5e73\u53f0\u8f7b\u91cf\u53ef\u89c6\u5316XHTML\u7f16\u8f91\u5668\uff0c\u57fa\u4e8e<a href="http://www.gnu.org/licenses/lgpl.html" target="_blank">LGPL</a>\u5f00\u6e90\u534f\u8bae\u53d1\u5e03\u3002</p><p>Copyright &copy; <a href="http://xheditor.com/" target="_blank">xhEditor.com</a>. All rights reserved.</p></div>');
            a.find("p").attr("role", "presentation");
            c.showDialog(a, !0);
            setTimeout(function() {
                a.focus()
            }, 100)
        };
        this.addShortcuts = function(a, b) {
            a = a.toLowerCase();
            ma[a] === $ && (ma[a] = []);
            ma[a].push(b)
        };
        this.delShortcuts = function(a) {
            delete ma[a]
        };
        this.uploadInit = function(a, b, e) {
            function f(b) {
                M(b, "string") && (b = [b]);
                var c = !1, e, d = b.length, f, h = [];
                (e = g.onUpload) && e(b);
                for (e = 0; e < d; e++)
                    f = b[e], f = M(f, "string") ? f : f.url, "!" === f.substr(0, 1) && (c = !0, f = f.substr(1)), h.push(f);
                a.val(h.join(" "));
                c && a.closest(".xheDialog").find("#xheSave").click()
            }
            var h = d('<span class="xheUpload"><input type="text" style="visibility:hidden;" tabindex="-1" /><input type="button" value="' + g.upBtnText + '" class="xheBtn" tabindex="-1" /></span>'), n = d(".xheBtn", h), j = g.html5Upload, l = j ? g.upMultiple : 1;
            a.after(h);
            n.before(a);
            b = b.replace(/{editorRoot}/ig, K);
            if ("!" === b.substr(0, 1))
                n.click(function() {
                    c.showIframeModal("\u4e0a\u4f20\u6587\u4ef6", b.substr(1), f, null, null)
                });
            else {
                h.append('<input type="file"' + (1 < l ? ' multiple=""' : "") + ' class="xheFile" size="13" name="filedata" tabindex="-1" />');
                var i = d(".xheFile", h);
                i.change(function() {
                    c.startUpload(i[0], b, e, f)
                });
                setTimeout(function() {
                    a.closest(".xheDialog").bind("dragenter dragover", N).bind("drop", function(a) {
                        var a = a.originalEvent.dataTransfer, d;
                        j && a && (d = a.files) && 0 < d.length && c.startUpload(d, b, e, f);
                        return !1
                    })
                }, 10)
            }
        };
        this.startUpload = function(a, b, e, f) {
            function h(a, e) {
                var d = Object, g = !1;
                try {
                    d = eval("(" + a + ")")
                } catch (h) {
                }
                d.err === $ || d.msg === $ ? alert(b + " \u4e0a\u4f20\u63a5\u53e3\u53d1\u751f\u9519\u8bef\uff01\r\n\r\n\u8fd4\u56de\u7684\u9519\u8bef\u5185\u5bb9\u4e3a: \r\n\r\n" + 
                a) : d.err ? alert(d.err) : (n.push(d.msg), g = !0);
                (!g || e) && c.removeModal();
                e && g && f(n);
                return g
            }
            var n = [], j = g.html5Upload, l = j ? g.upMultiple : 1, i, r = d('<div style="padding:22px 0;text-align:center;line-height:30px;">\u6587\u4ef6\u4e0a\u4f20\u4e2d\uff0c\u8bf7\u7a0d\u5019\u2026\u2026<br /></div>'), s = '<img src="' + ua + 'img/loading.gif">';
            if (Ca || !j || a.nodeType && (!(i = a.files) || !i[0].name)) {
                if (!Wa(a.value, e))
                    return;
                r.append(s);
                e = new c.html4Upload(a, b, h)
            } else {
                i || (i = a);
                a = i.length;
                if (a > l) {
                    alert("\u8bf7\u4e0d\u8981\u4e00\u6b21\u4e0a\u4f20\u8d85\u8fc7" + 
                    l + "\u4e2a\u6587\u4ef6");
                    return
                }
                for (l = 0; l < a; l++)
                    if (!Wa(i[l].name, e))
                        return;
                var k = d('<div class="xheProgress"><div><span>0%</span></div></div>');
                r.append(k);
                e = new c.html5Upload("filedata", i, b, h, function(a) {
                    if (0 <= a.loaded) {
                        var b = Math.round(100 * a.loaded / a.total) + "%";
                        d("div", k).css("width", b);
                        d("span", k).text(b + " ( " + Xa(a.loaded) + " / " + Xa(a.total) + " )")
                    } else
                        k.replaceWith(s)
                })
            }
            c.showModal("\u6587\u4ef6\u4e0a\u4f20\u4e2d(Esc\u53d6\u6d88\u4e0a\u4f20)", r, 320, 150);
            e.start()
        };
        this.html4Upload = function(a, b, 
        c) {
            var f = "jUploadFrame" + (new Date).getTime(), g = this, i = d('<iframe name="' + f + '" class="xheHideArea" />').appendTo("body"), j = d('<form action="' + b + '" target="' + f + '" method="post" enctype="multipart/form-data" class="xheHideArea"></form>').appendTo("body"), l = d(a), k = l.clone().attr("disabled", "true");
            l.before(k).appendTo(j);
            this.remove = function() {
                null !== g && (k.before(l).remove(), i.remove(), j.remove(), g = null)
            };
            this.onLoad = function() {
                var a = i[0].contentWindow.document, b = d(a.body).text();
                a.write("");
                g.remove();
                c(b, !0)
            };
            this.start = function() {
                j.submit();
                i.load(g.onLoad)
            };
            return this
        };
        this.html5Upload = function(a, b, c, d, g) {
            function i(b, c, e, d) {
                l = new XMLHttpRequest;
                upload = l.upload;
                l.onreadystatechange = function() {
                    4 === l.readyState && e(l.responseText)
                };
                upload ? upload.onprogress = function(a) {
                    d(a.loaded)
                } : d(-1);
                l.open("POST", c);
                l.setRequestHeader("Content-Type", "application/octet-stream");
                l.setRequestHeader("Content-Disposition", 'attachment; name="' + encodeURIComponent(a) + '"; filename="' + encodeURIComponent(b.name) + '"');
                l.sendAsBinary && b.getAsBinary ? l.sendAsBinary(b.getAsBinary()) : l.send(b)
            }
            function j(a) {
                g && g({loaded: s + a,total: o})
            }
            for (var l, k = 0, r = b.length, s = 0, o = 0, m = this, p = 0; p < r; p++)
                o += b[p].size;
            this.remove = function() {
                l && (l.abort(), l = null)
            };
            this.uploadNext = function(a) {
                a && (s += b[k - 1].size, j(0));
                (!a || a && !0 === d(a, k === r)) && k < r && i(b[k++], c, m.uploadNext, function(a) {
                    j(a)
                })
            };
            this.start = function() {
                m.uploadNext()
            }
        };
        this.showIframeModal = function(a, b, e, f, g, i) {
            function j() {
                try {
                    s.callback = l, s.unloadme = c.removeModal, d(s.document).keydown(H), 
                    o = s.name
                } catch (a) {
                }
            }
            function l(a) {
                s.document.write("");
                c.removeModal();
                null != a && e(a)
            }
            var b = d('<iframe frameborder="0" src="' + b.replace(/{editorRoot}/ig, K) + (/\?/.test(b) ? "&" : "?") + "parenthost=" + location.host + '" style="width:100%;height:100%;display:none;" /><div class="xheModalIfmWait"></div>'), k = b.eq(0), r = b.eq(1);
            c.showModal(a, b, f, g, i);
            var s = k[0].contentWindow, o;
            j();
            k.load(function() {
                j();
                if (o) {
                    var a = !0;
                    try {
                        o = eval("(" + unescape(o) + ")")
                    } catch (b) {
                        a = !1
                    }
                    if (a)
                        return l(o)
                }
                r.is(":visible") && (k.show().focus(), 
                r.remove())
            })
        };
        this.showModal = function(a, b, e, f, h) {
            if (ta)
                return !1;
            c.panelState = S;
            S = !1;
            ea = g.layerShadow;
            e = e ? e : g.modalWidth;
            f = f ? f : g.modalHeight;
            J = d('<div class="xheModal" style="width:' + (e - 1) + "px;height:" + f + "px;margin-left:-" + Math.ceil(e / 2) + "px;" + (i && 7 > pa ? "" : "margin-top:-" + Math.ceil(f / 2) + "px") + '">' + (g.modalTitle ? '<div class="xheModalTitle"><span class="xheModalClose" title="\u5173\u95ed (Esc)" tabindex="0" role="button"></span>' + a + "</div>" : "") + '<div class="xheModalContent"></div></div>').appendTo("body");
            Fa = d('<div class="xheModalOverlay"></div>').appendTo("body");
            0 < ea && (Ea = d('<div class="xheModalShadow" style="width:' + J.outerWidth() + "px;height:" + J.outerHeight() + "px;margin-left:-" + (Math.ceil(e / 2) - ea - 2) + "px;" + (i && 7 > pa ? "" : "margin-top:-" + (Math.ceil(f / 2) - ea - 2) + "px") + '"></div>').appendTo("body"));
            d(".xheModalContent", J).css("height", f - (g.modalTitle ? d(".xheModalTitle").outerHeight() : 0)).html(b);
            i && 6 === pa && (Ga = d("select:visible").css("visibility", "hidden"));
            d(".xheModalClose", J).click(c.removeModal);
            Fa.show();
            0 < ea && Ea.show();
            J.show();
            setTimeout(function() {
                J.find("a,input[type=text],textarea").filter(":visible").filter(function() {
                    return "hidden" !== d(this).css("visibility")
                }).eq(0).focus()
            }, 10);
            ta = !0;
            Ha = h
        };
        this.removeModal = function() {
            Ga && Ga.css("visibility", "visible");
            J.html("").remove();
            0 < ea && Ea.remove();
            Fa.remove();
            Ha && Ha();
            ta = !1;
            S = c.panelState
        };
        this.showDialog = function(a, b) {
            var e = d('<div class="xheDialog"></div>'), f = d(a), h = d("#xheSave", f);
            if (1 === h.length) {
                f.find("input[type=text],select").keypress(function(a) {
                    if (13 === 
                    a.which)
                        return h.click(), !1
                });
                f.find("textarea").keydown(function(a) {
                    if (a.ctrlKey && 13 === a.which)
                        return h.click(), !1
                });
                h.after(' <input type="button" id="xheCancel" value="\u53d6\u6d88" />');
                d("#xheCancel", f).click(c.hidePanel);
                if (!g.clickCancelDialog) {
                    sa = !1;
                    var i = d('<div class="xheFixCancel"></div>').appendTo("body").mousedown(N), j = A.offset();
                    i.css({left: j.left,top: j.top,width: A.outerWidth(),height: A.outerHeight()})
                }
                e.mousedown(function() {
                    oa = !0
                })
            }
            e.append(f);
            c.showPanel(e, b)
        };
        this.showPanel = function(a, 
        b) {
            if (!w.target)
                return !1;
            t.html("").append(a).css("left", -999).css("top", -999);
            da = d(w.target).closest("a").addClass("xheActive");
            var c = da.offset(), f = c.left, c = c.top, c = c + (da.outerHeight() - 1);
            ca.css({left: f + 1,top: c,width: da.width()}).show();
            var h = document.documentElement, i = document.body;
            if (f + t.outerWidth() > (window.pageXOffset || h.scrollLeft || i.scrollLeft) + (h.clientWidth || i.clientWidth))
                f -= t.outerWidth() - da.outerWidth();
            h = g.layerShadow;
            0 < h && ba.css({left: f + h,top: c + h,width: t.outerWidth(),height: t.outerHeight()}).show();
            if ((h = d("#" + ja).offsetParent().css("zIndex")) && !isNaN(h))
                ba.css("zIndex", parseInt(h, 10) + 1), t.css("zIndex", parseInt(h, 10) + 2), ca.css("zIndex", parseInt(h, 10) + 3);
            t.css({left: f,top: c}).show();
            b || setTimeout(function() {
                t.find("a,input[type=text],textarea").filter(":visible").filter(function() {
                    return "hidden" !== d(this).css("visibility")
                }).eq(0).focus()
            }, 10);
            Qa = S = !0
        };
        this.hidePanel = function() {
            S && (da.removeClass("xheActive"), ba.hide(), ca.hide(), t.hide(), S = !1, sa || (d(".xheFixCancel").remove(), sa = !0), Qa = oa = !1, 
            X = null, c.focus(), c.loadBookmark())
        };
        this.exec = function(a) {
            c.hidePanel();
            var b = ka[a];
            if (!b)
                return !1;
            if (null === w) {
                w = {};
                var e = q.find(".xheButton[cmd=" + a + "]");
                if (1 === e.length)
                    w.target = e
            }
            if (b.e)
                b.e.call(c);
            else
                switch (a = a.toLowerCase(), a) {
                    case "cut":
                        try {
                            if (k.execCommand(a), !k.queryCommandSupported(a))
                                throw "Error";
                        } catch (f) {
                            alert("\u60a8\u7684\u6d4f\u89c8\u5668\u5b89\u5168\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u4f7f\u7528\u526a\u5207\u64cd\u4f5c\uff0c\u8bf7\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl + X)\u6765\u5b8c\u6210")
                        }
                        break;
                    case "copy":
                        try {
                            if (k.execCommand(a), !k.queryCommandSupported(a))
                                throw "Error";
                        } catch (h) {
                            alert("\u60a8\u7684\u6d4f\u89c8\u5668\u5b89\u5168\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u4f7f\u7528\u590d\u5236\u64cd\u4f5c\uff0c\u8bf7\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl + C)\u6765\u5b8c\u6210")
                        }
                        break;
                    case "paste":
                        try {
                            if (k.execCommand(a), !k.queryCommandSupported(a))
                                throw "Error";
                        } catch (o) {
                            alert("\u60a8\u7684\u6d4f\u89c8\u5668\u5b89\u5168\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u4f7f\u7528\u7c98\u8d34\u64cd\u4f5c\uff0c\u8bf7\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl + V)\u6765\u5b8c\u6210")
                        }
                        break;
                    case "pastetext":
                        window.clipboardData ? c.pasteText(window.clipboardData.getData("Text", !0)) : c.showPastetext();
                        break;
                    case "blocktag":
                        var j = [];
                        d.each(gb, function(a, b) {
                            j.push({s: "<" + b.n + ">" + b.t + "</" + b.n + ">",v: "<" + b.n + ">",t: b.t})
                        });
                        c.showMenu(j, function(a) {
                            c._exec("formatblock", a)
                        });
                        break;
                    case "fontface":
                        var l = [];
                        d.each(hb, function(a, b) {
                            b.c = b.c ? b.c : b.n;
                            l.push({s: '<span style="font-family:' + b.c + '">' + b.n + "</span>",v: b.c,t: b.n})
                        });
                        c.showMenu(l, function(a) {
                            c._exec("fontname", a)
                        });
                        break;
                    case "fontsize":
                        var p = 
                        [];
                        d.each(T, function(a, b) {
                            p.push({s: '<span style="font-size:' + b.s + ';">' + b.t + "(" + b.s + ")</span>",v: a + 1,t: b.t})
                        });
                        c.showMenu(p, function(a) {
                            c._exec("fontsize", a)
                        });
                        break;
                    case "fontcolor":
                        c.showColor(function(a) {
                            c._exec("forecolor", a)
                        });
                        break;
                    case "backcolor":
                        c.showColor(function(a) {
                            i ? c._exec("backcolor", a) : (Ka(!0), c._exec("hilitecolor", a), Ka(!1))
                        });
                        break;
                    case "align":
                        c.showMenu(ib, function(a) {
                            c._exec(a)
                        });
                        break;
                    case "list":
                        c.showMenu(jb, function(a) {
                            c._exec(a)
                        });
                        break;
                    case "link":
                        c.showLink();
                        break;
                    case "anchor":
                        c.showAnchor();
                        break;
                    case "img":
                        c.showImg();
                        break;
                    case "flash":
                        c.showEmbed("Flash", '<div><label for="xheFlashUrl">\u52a8\u753b\u6587\u4ef6: </label><input type="text" id="xheFlashUrl" value="http://" class="xheText" /></div><div><label for="xheFlashWidth">\u5bbd\u3000\u3000\u5ea6: </label><input type="text" id="xheFlashWidth" style="width:40px;" value="480" /> <label for="xheFlashHeight">\u9ad8\u3000\u3000\u5ea6: </label><input type="text" id="xheFlashHeight" style="width:40px;" value="400" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="\u786e\u5b9a" /></div>', 
                        "application/x-shockwave-flash", "clsid:d27cdb6e-ae6d-11cf-96b8-4445535400000", ' wmode="opaque" quality="high" menu="false" play="true" loop="true" allowfullscreen="true"', g.upFlashUrl, g.upFlashExt);
                        break;
                    case "media":
                        c.showEmbed("Media", '<div><label for="xheMediaUrl">\u5a92\u4f53\u6587\u4ef6: </label><input type="text" id="xheMediaUrl" value="http://" class="xheText" /></div><div><label for="xheMediaWidth">\u5bbd\u3000\u3000\u5ea6: </label><input type="text" id="xheMediaWidth" style="width:40px;" value="480" /> <label for="xheMediaHeight">\u9ad8\u3000\u3000\u5ea6: </label><input type="text" id="xheMediaHeight" style="width:40px;" value="400" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="\u786e\u5b9a" /></div>', 
                        "application/x-mplayer2", "clsid:6bf52a52-394a-11d3-b153-00c04f79faa6", ' enablecontextmenu="false" autostart="false"', g.upMediaUrl, g.upMediaExt);
                        break;
                    case "hr":
                        c.pasteHTML("<hr />");
                        break;
                    case "emot":
                        c.showEmot();
                        break;
                    case "table":
                        c.showTable();
                        break;
                    case "source":
                        c.toggleSource();
                        break;
                    case "preview":
                        c.showPreview();
                        break;
                    case "print":
                        W.print();
                        break;
                    case "fullscreen":
                        c.toggleFullscreen();
                        break;
                    case "about":
                        c.showAbout();
                        break;
                    default:
                        c._exec(a)
                }
            w = null
        };
        this._exec = function(a, b, e) {
            e || c.focus();
            return b !== 
            $ ? k.execCommand(a, !1, b) : k.execCommand(a, !1, null)
        }
    };
    ra.settings = {skin: "default",tools: "full",clickCancelDialog: !0,linkTag: !1,internalScript: !1,inlineScript: !1,internalStyle: !0,inlineStyle: !0,showBlocktag: !1,forcePtag: !0,upLinkExt: "zip,rar,txt",upImgExt: "jpg,jpeg,gif,png",upFlashExt: "swf",upMediaExt: "wmv,avi,wma,mp3,mid",modalWidth: 350,modalHeight: 220,modalTitle: !0,defLinkText: "\u70b9\u51fb\u6253\u5f00\u94fe\u63a5",layerShadow: 3,emotMark: !1,upBtnText: "\u4e0a\u4f20",cleanPaste: 1,hoverExecDelay: 100,html5Upload: !0,
        upMultiple: 99};
    window.xheditor = ra;
    d(function() {
        d.fn.oldVal = d.fn.val;
        d.fn.val = function(d) {
            var i = this, p;
            return d === $ ? i[0] && (p = i[0].xheditor) ? p.getSource() : i.oldVal() : i.each(function() {
                (p = this.xheditor) ? p.setSource(d) : i.oldVal(d)
            })
        };
        d("textarea").each(function() {
            var i = d(this), o = i.attr("class");
            if (o && (o = o.match(/(?:^|\s)xheditor(?:\-(m?full|simple|mini))?(?:\s|$)/i)))
                i.xheditor(o[1] ? {tools: o[1]} : null)
        })
    })
})(jQuery);
