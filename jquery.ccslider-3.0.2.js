(function(f) {
    f.tools = f.tools || {
        version: "v1.2.7"
    }, f.tools.tooltip = {
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            predelay: 0,
            delay: 30,
            opacity: 1,
            tip: 0,
            fadeIE: !1,
            position: ["top", "center"],
            offset: [0, 0],
            relative: !1,
            cancelDefault: !0,
            events: {
                def: "mouseenter,mouseleave",
                input: "focus,blur",
                widget: "focus mouseenter,blur mouseleave",
                tooltip: "mouseenter,mouseleave"
            },
            layout: "<div/>",
            tipClass: "tooltip"
        },
        addEffect: function(b, j, i) {
            e[b] = [j, i]
        }
    };
    var e = {
        toggle: [
            function(j) {
                var i = this.getConf(),
                    l = this.getTip(),
                    k = i.opacity;
                k < 1 && l.css({
                    opacity: k
                }), l.show(), j.call()
            },
            function(b) {
                this.getTip().hide(), b.call()
            }
        ],
        fade: [
            function(a) {
                var d = this.getConf();
                !f.browser.msie || d.fadeIE ? this.getTip().fadeTo(d.fadeInSpeed, d.opacity, a) : (this.getTip().show(), a())
            },
            function(a) {
                var d = this.getConf();
                !f.browser.msie || d.fadeIE ? this.getTip().fadeOut(d.fadeOutSpeed, a) : (this.getTip().hide(), a())
            }
        ]
    };

    function h(a, p, o) {
        var n = o.relative ? a.position().top : a.offset().top,
            m = o.relative ? a.position().left : a.offset().left,
            l = o.position[0];
        n -= p.outerHeight() - o.offset[0], m += a.outerWidth() + o.offset[1];
        var k = p.outerHeight() + a.outerHeight();
        l == "center" && (n += k / 2), l == "bottom" && (n += k), l = o.position[1];
        var j = p.outerWidth() + a.outerWidth();
        l == "center" && (m -= j / 2), l == "left" && (m -= j);
        return {
            top: n,
            left: m
        }
    }

    function g(D, C) {
        var B = this,
            A = D.add(B),
            z, y = 0,
            x = 0,
            w = D.attr("title"),
            v = D.attr("data-tooltip"),
            u = e[C.effect],
            t, s = D.is(":input"),
            c = s && D.is(":checkbox, :radio, select, :button, :submit"),
            b = D.attr("type"),
            a = C.events[b] || C.events[s ? c ? "widget" : "input" : "def"];
        if (!u) {
            throw 'Nonexistent effect "' + C.effect + '"'
        }
        a = a.split(/,\s*/);
        if (a.length != 2) {
            throw "Tooltip: bad events configuration for " + b
        }
        D.on(a[0], function(d) {
            clearTimeout(y), C.predelay ? x = setTimeout(function() {
                B.show(d)
            }, C.predelay) : B.show(d)
        }).on(a[1], function(d) {
            clearTimeout(x), C.delay ? y = setTimeout(function() {
                B.hide(d)
            }, C.delay) : B.hide(d)
        }), w && C.cancelDefault && (D.removeAttr("title"), D.data("title", w)), f.extend(B, {
            show: function(d) {
                if (!z) {
                    v ? z = f(v) : C.tip ? z = f(C.tip).eq(0) : w ? z = f(C.layout).addClass(C.tipClass).appendTo(document.body).hide().append(w) : (z = D.next(), z.length || (z = D.parent().next()));
                    if (!z.length) {
                        throw "Cannot find tooltip for " + D
                    }
                }
                if (B.isShown()) {
                    return B
                }
                z.stop(!0, !0);
                var j = h(D, z, C);
                C.tip && z.html(D.data("title")), d = f.Event(), d.type = "onBeforeShow", A.trigger(d, [j]);
                if (d.isDefaultPrevented()) {
                    return B
                }
                j = h(D, z, C), z.css({
                    position: "absolute",
                    top: j.top,
                    left: j.left
                }), t = !0, u[0].call(B, function() {
                    d.type = "onShow", t = "full", A.trigger(d)
                });
                var i = C.events.tooltip.split(/,\s*/);
                z.data("__set") || (z.off(i[0]).on(i[0], function() {
                    clearTimeout(y), clearTimeout(x)
                }), i[1] && !D.is("input:not(:checkbox, :radio), textarea") && z.off(i[1]).on(i[1], function(k) {
                    k.relatedTarget != D[0] && D.trigger(a[1].split(" ")[0])
                }), C.tip || z.data("__set", !0));
                return B
            },
            hide: function(d) {
                if (!z || !B.isShown()) {
                    return B
                }
                d = f.Event(), d.type = "onBeforeHide", A.trigger(d);
                if (!d.isDefaultPrevented()) {
                    t = !1, e[C.effect][1].call(B, function() {
                        d.type = "onHide", A.trigger(d)
                    });
                    return B
                }
            },
            isShown: function(d) {
                return d ? t == "full" : t
            },
            getConf: function() {
                return C
            },
            getTip: function() {
                return z
            },
            getTrigger: function() {
                return D
            }
        }), f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function(d, i) {
            f.isFunction(C[i]) && f(B).on(i, C[i]), B[i] = function(j) {
                j && f(B).on(i, j);
                return B
            }
        })
    }
    f.fn.tooltip = function(a) {
        var d = this.data("tooltip");
        if (d) {
            return d
        }
        a = f.extend(!0, {}, f.tools.tooltip.conf, a), typeof a.position == "string" && (a.position = a.position.split(/,?\s/)), this.each(function() {
            d = new g(f(this), a), f(this).data("tooltip", d)
        });
        return a.api ? d : this
    }
})(jQuery);
(function(e) {
    var d = e.tools.tooltip;
    e.extend(d.conf, {
        direction: "up",
        bounce: !1,
        slideOffset: 10,
        slideInSpeed: 200,
        slideOutSpeed: 200,
        slideFade: !e.browser.msie
    });
    var f = {
        up: ["-", "top"],
        down: ["+", "top"],
        left: ["-", "left"],
        right: ["+", "left"]
    };
    d.addEffect("slide", function(g) {
        var c = this.getConf(),
            j = this.getTip(),
            i = c.slideFade ? {
                opacity: c.opacity
            } : {},
            h = f[c.direction] || f.up;
        i[h[1]] = h[0] + "=" + c.slideOffset, c.slideFade && j.css({
            opacity: 0
        }), j.show().animate(i, c.slideInSpeed, g)
    }, function(a) {
        var l = this.getConf(),
            k = l.slideOffset,
            j = l.slideFade ? {
                opacity: 0
            } : {},
            i = f[l.direction] || f.up,
            c = "" + i[0];
        l.bounce && (c = c == "+" ? "-" : "+"), j[i[1]] = c + "=" + k, this.getTip().animate(j, l.slideOutSpeed, function() {
            e(this).hide(), a.call()
        })
    })
})(jQuery);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(j, i, b, c, d) {
        return jQuery.easing[jQuery.easing.def](j, i, b, c, d)
    },
    easeInQuad: function(j, i, b, c, d) {
        return c * (i /= d) * i + b
    },
    easeOutQuad: function(j, i, b, c, d) {
        return -c * (i /= d) * (i - 2) + b
    },
    easeInOutQuad: function(j, i, b, c, d) {
        if ((i /= d / 2) < 1) {
            return c / 2 * i * i + b
        }
        return -c / 2 * ((--i) * (i - 2) - 1) + b
    },
    easeInCubic: function(j, i, b, c, d) {
        return c * (i /= d) * i * i + b
    },
    easeOutCubic: function(j, i, b, c, d) {
        return c * ((i = i / d - 1) * i * i + 1) + b
    },
    easeInOutCubic: function(j, i, b, c, d) {
        if ((i /= d / 2) < 1) {
            return c / 2 * i * i * i + b
        }
        return c / 2 * ((i -= 2) * i * i + 2) + b
    },
    easeInQuart: function(j, i, b, c, d) {
        return c * (i /= d) * i * i * i + b
    },
    easeOutQuart: function(j, i, b, c, d) {
        return -c * ((i = i / d - 1) * i * i * i - 1) + b
    },
    easeInOutQuart: function(j, i, b, c, d) {
        if ((i /= d / 2) < 1) {
            return c / 2 * i * i * i * i + b
        }
        return -c / 2 * ((i -= 2) * i * i * i - 2) + b
    },
    easeInQuint: function(j, i, b, c, d) {
        return c * (i /= d) * i * i * i * i + b
    },
    easeOutQuint: function(j, i, b, c, d) {
        return c * ((i = i / d - 1) * i * i * i * i + 1) + b
    },
    easeInOutQuint: function(j, i, b, c, d) {
        if ((i /= d / 2) < 1) {
            return c / 2 * i * i * i * i * i + b
        }
        return c / 2 * ((i -= 2) * i * i * i * i + 2) + b
    },
    easeInSine: function(j, i, b, c, d) {
        return -c * Math.cos(i / d * (Math.PI / 2)) + c + b
    },
    easeOutSine: function(j, i, b, c, d) {
        return c * Math.sin(i / d * (Math.PI / 2)) + b
    },
    easeInOutSine: function(j, i, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * i / d) - 1) + b
    },
    easeInExpo: function(j, i, b, c, d) {
        return (i == 0) ? b : c * Math.pow(2, 10 * (i / d - 1)) + b
    },
    easeOutExpo: function(j, i, b, c, d) {
        return (i == d) ? b + c : c * (-Math.pow(2, -10 * i / d) + 1) + b
    },
    easeInOutExpo: function(j, i, b, c, d) {
        if (i == 0) {
            return b
        }
        if (i == d) {
            return b + c
        }
        if ((i /= d / 2) < 1) {
            return c / 2 * Math.pow(2, 10 * (i - 1)) + b
        }
        return c / 2 * (-Math.pow(2, -10 * --i) + 2) + b
    },
    easeInCirc: function(j, i, b, c, d) {
        return -c * (Math.sqrt(1 - (i /= d) * i) - 1) + b
    },
    easeOutCirc: function(j, i, b, c, d) {
        return c * Math.sqrt(1 - (i = i / d - 1) * i) + b
    },
    easeInOutCirc: function(j, i, b, c, d) {
        if ((i /= d / 2) < 1) {
            return -c / 2 * (Math.sqrt(1 - i * i) - 1) + b
        }
        return c / 2 * (Math.sqrt(1 - (i -= 2) * i) + 1) + b
    },
    easeInElastic: function(o, m, p, a, b) {
        var d = 1.70158;
        var c = 0;
        var n = a;
        if (m == 0) {
            return p
        }
        if ((m /= b) == 1) {
            return p + a
        }
        if (!c) {
            c = b * 0.3
        }
        if (n < Math.abs(a)) {
            n = a;
            var d = c / 4
        } else {
            var d = c / (2 * Math.PI) * Math.asin(a / n)
        }
        return -(n * Math.pow(2, 10 * (m -= 1)) * Math.sin((m * b - d) * (2 * Math.PI) / c)) + p
    },
    easeOutElastic: function(o, m, p, a, b) {
        var d = 1.70158;
        var c = 0;
        var n = a;
        if (m == 0) {
            return p
        }
        if ((m /= b) == 1) {
            return p + a
        }
        if (!c) {
            c = b * 0.3
        }
        if (n < Math.abs(a)) {
            n = a;
            var d = c / 4
        } else {
            var d = c / (2 * Math.PI) * Math.asin(a / n)
        }
        return n * Math.pow(2, -10 * m) * Math.sin((m * b - d) * (2 * Math.PI) / c) + a + p
    },
    easeInOutElastic: function(o, m, p, a, b) {
        var d = 1.70158;
        var c = 0;
        var n = a;
        if (m == 0) {
            return p
        }
        if ((m /= b / 2) == 2) {
            return p + a
        }
        if (!c) {
            c = b * (0.3 * 1.5)
        }
        if (n < Math.abs(a)) {
            n = a;
            var d = c / 4
        } else {
            var d = c / (2 * Math.PI) * Math.asin(a / n)
        }
        if (m < 1) {
            return -0.5 * (n * Math.pow(2, 10 * (m -= 1)) * Math.sin((m * b - d) * (2 * Math.PI) / c)) + p
        }
        return n * Math.pow(2, -10 * (m -= 1)) * Math.sin((m * b - d) * (2 * Math.PI) / c) * 0.5 + a + p
    },
    easeInBack: function(l, k, b, c, d, j) {
        if (j == undefined) {
            j = 1.70158
        }
        return c * (k /= d) * k * ((j + 1) * k - j) + b
    },
    easeOutBack: function(l, k, b, c, d, j) {
        if (j == undefined) {
            j = 1.70158
        }
        return c * ((k = k / d - 1) * k * ((j + 1) * k + j) + 1) + b
    },
    easeInOutBack: function(l, k, b, c, d, j) {
        if (j == undefined) {
            j = 1.70158
        }
        if ((k /= d / 2) < 1) {
            return c / 2 * (k * k * (((j *= (1.525)) + 1) * k - j)) + b
        }
        return c / 2 * ((k -= 2) * k * (((j *= (1.525)) + 1) * k + j) + 2) + b
    },
    easeInBounce: function(j, i, b, c, d) {
        return c - jQuery.easing.easeOutBounce(j, d - i, 0, c, d) + b
    },
    easeOutBounce: function(j, i, b, c, d) {
        if ((i /= d) < (1 / 2.75)) {
            return c * (7.5625 * i * i) + b
        } else {
            if (i < (2 / 2.75)) {
                return c * (7.5625 * (i -= (1.5 / 2.75)) * i + 0.75) + b
            } else {
                if (i < (2.5 / 2.75)) {
                    return c * (7.5625 * (i -= (2.25 / 2.75)) * i + 0.9375) + b
                } else {
                    return c * (7.5625 * (i -= (2.625 / 2.75)) * i + 0.984375) + b
                }
            }
        }
    },
    easeInOutBounce: function(j, i, b, c, d) {
        if (i < d / 2) {
            return jQuery.easing.easeInBounce(j, i * 2, 0, c, d) * 0.5 + b
        }
        return jQuery.easing.easeOutBounce(j, i * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    }
});
(function(f, e) {
    function d(w, x) {
        var y = f.extend(true, {}, f.fn.ccslider.defaults, x);
        var z = this,
            cI = f(w),
            co = cI.wrapInner('<div class="slider-innerWrapper"/>').find("div.slider-innerWrapper"),
            cE = cI.width(),
            b7 = cI.height(),
            bW = cE,
            b4 = b7,
            cO = cI.find("img"),
            cl = cO.length,
            bJ, bm, bB = false,
            bD = false,
            cU = [],
            b0 = false,
            br = y._3dOptions.imageWidth,
            c2 = y._3dOptions.imageHeight,
            bF = y._3dOptions.transparentImg,
            cr = y._3dOptions.innerSideColor,
            bo = y._3dOptions.makeShadow,
            cp = y._3dOptions.shadowColor,
            b3 = y._3dOptions.slices,
            ch = y._3dOptions.rows,
            ct = y._3dOptions.columns,
            by = y._3dOptions.delay,
            cf = y._3dOptions.delayDir,
            bq = y._3dOptions.depthOffset,
            b9 = y._3dOptions.sliceGap,
            cG = y._3dOptions.easing,
            cz = y._3dOptions.fallBack,
            bY, cZ, c1 = y.startSlide,
            ck = false,
            bi = false,
            ca = false,
            bv, bR, bO, cN;
        for (var A = 0; A < cl; A++) {
            cU[A] = cO.eq(A).data("transition")
        }
        if (y.effectType === "3d") {
            if (e.createElement("canvas").getContext) {
                bm = "3d";
                bJ = y.effect;
                bY = y.animSpeed
            } else {
                bm = "2d";
                bJ = cz;
                bY = y._3dOptions.fallBackSpeed;
                bD = true;
                cI.addClass("fallback")
            }
        } else {
            bm = "2d";
            bJ = y.effect;
            bY = y.animSpeed
        }
        cI.addClass("ccslider");
        if (y.directionNav) {
            var B = f('<a class="slider-nav prev"/>').appendTo(cI),
                cx = f('<a class="slider-nav next"/>').appendTo(cI);
            B.click(function() {
                z.prev()
            });
            cx.click(function() {
                z.next()
            })
        }
        if (y.controlLinks) {
            var C = f('<ul class="control-links" />').appendTo(cI),
                cV = "";
            if (y.controlLinkThumbs) {
                cI.addClass("controlThumbs")
            }
            for (var A = 0; A < cl; A++) {
                if (y.controlLinkThumbs) {
                    cV += '<li class="linkThumb" data-index="' + A + '"><img src="' + y.controlThumbLocation + cO.eq(A).data("thumbname") + '" /></li>'
                } else {
                    cV += '<li data-index="' + A + '">' + (A + 1) + "</li>"
                }
            }
            C.append(cV).delegate("li", "click", function() {
                if (!f(this).hasClass("active")) {
                    z.goToSlide(f(this).data("index"))
                }
            })
        }

        function bT() {
            if (y.controlLinks) {
                C.find("li").removeClass("active").eq(c1).addClass("active")
            }
        }
        bT();
        var D, cq;
        cI.bind("touchstart.ccslider", function(h) {
            var g = h.originalEvent.touches[0];
            D = g.pageX
        }).bind("touchmove.ccslider", function(h) {
            var g = h.originalEvent.touches[0];
            cq = g.pageX;
            if (cq - D >= 50) {
                z.next()
            } else {
                if (cq - D <= -50) {
                    z.prev()
                }
            }
            h.preventDefault()
        });

        function bZ() {
            if (!ca && !bi) {
                bv = setInterval(function() {
                    if (bm === "3d") {
                        bs("next")
                    } else {
                        cc("next")
                    }
                }, y.pauseTime)
            }
        }

        function cB() {
            clearInterval(bv);
            bv = ""
        }
        if (y.autoPlay) {
            bZ()
        }
        if (y.pauseOnHover) {
            cI.hover(function() {
                ca = true;
                cB()
            }, function() {
                ca = false;
                if (bv === "" && y.autoPlay && !ck) {
                    bZ()
                }
            })
        }
        if (y.autoPlay) {
            var E = f('<div class="slider-timer pause"/>').appendTo(cI);
            E.click(function() {
                if (E.hasClass("pause")) {
                    E.removeClass("pause").addClass("play");
                    cB();
                    ck = true
                } else {
                    E.removeClass("play").addClass("pause");
                    bZ();
                    ck = false
                }
            })
        }

        function b1() {
            bi = false;
            if (y.autoPlay && !ck) {
                bZ()
            }
        }

        function cS() {
            var g = ["webkit", "moz", "ms", "o"];
            if ("hidden" in e) {
                return "hidden"
            }
            for (var h = 0; h < g.length; h++) {
                if ((g[h] + "Hidden") in e) {
                    return g[h] + "Hidden"
                }
            }
            return null
        }

        function bU() {
            var g = cS();
            if (!g) {
                return false
            }
            return e[g]
        }
        var F = cS();
        if (F) {
            var G = F.replace(/[H|h]idden/, "") + "visibilitychange";
            e.addEventListener(G, bp)
        }

        function bp() {
            if (y.autoPlay) {
                E.trigger("click")
            }
        }
        this.next = function() {
            if (bv) {
                cB()
            }
            if (bm === "3d") {
                bs("next")
            } else {
                cc("next")
            }
        };
        this.prev = function() {
            if (bv) {
                cB()
            }
            if (bm === "3d") {
                bs("prev")
            } else {
                cc("prev")
            }
        };
        this.stop = function() {
            E.trigger("click")
        };
        this.start = function() {
            E.trigger("click")
        };
        this.goToSlide = function(g) {
            if (bm === "3d") {
                bs(g)
            } else {
                cc(g)
            }
        };
        this.destroy = function() {
            cI.children().not(co).remove();
            co.children().not(cO).remove();
            cO.stop().unwrap().removeAttr("style");
            co.remove();
            cB();
            cI.removeData("ccslider").removeData("dimensions").removeAttr("style").unbind(".ccslider");
            f(window).unbind(".slider3d .slider2d")
        };
        this.beforeSlideChange = function(g) {
            y.beforeSlideChange.call(cI[0], g);
            cI.trigger("beforeSlideChange", [g])
        };
        this.afterSlideChange = function(g) {
            y.afterSlideChange.call(cI[0], g);
            cI.trigger("afterSlideChange", [g])
        };
        if (y.captions) {
            var H = f('<div class="slider-caption"/>').appendTo(cI)
        }

        function c() {
            if (y.captions) {
                var g = cO.eq(c1),
                    h = "",
                    j = "";
                if (g.data("captionelem")) {
                    h = g.data("captionelem");
                    j = f(h)[0].innerHTML
                } else {
                    if (g[0].alt) {
                        j = g[0].alt
                    }
                }
                if (j) {
                    H[0].innerHTML = j;
                    cZ = g.data("captionPosition");
                    cZ = cZ ? cZ : y.captionPosition;
                    H[0].className = "slider-caption " + cZ;
                    H.removeAttr("style");
                    bm === "3d" && cQ();
                    if (y.captionAnimation === "none") {
                        H.show()
                    } else {
                        if (y.captionAnimation === "fade") {
                            H.fadeIn(y.captionAnimationSpeed)
                        } else {
                            if (y.captionAnimation === "slide") {
                                if (cZ === "left" || cZ === "right") {
                                    H.animate({
                                        width: "show",
                                        paddingLeft: "show",
                                        paddingRight: "show"
                                    }, y.captionAnimationSpeed)
                                } else {
                                    H.slideDown(y.captionAnimationSpeed)
                                }
                            }
                        }
                    }
                }
            }
        }
        c();

        function cH() {
            if (y.captions) {
                if (y.captionAnimation === "none") {
                    H.hide()
                } else {
                    if (y.captionAnimation === "fade") {
                        H.fadeOut(y.captionAnimationSpeed)
                    } else {
                        if (y.captionAnimation === "slide") {
                            if (cZ === "left" || cZ === "right") {
                                H.animate({
                                    width: "hide",
                                    paddingLeft: "hide",
                                    paddingRight: "hide"
                                }, y.captionAnimationSpeed)
                            } else {
                                H.slideUp(y.captionAnimationSpeed)
                            }
                        }
                    }
                }
            }
        }

        function cQ() {
            if (cZ === "bottom") {
                H.css({
                    width: br - parseInt(H.css("padding-left"), 10) - parseInt(H.css("padding-right"), 10),
                    left: (bW - br) / 2,
                    bottom: (b4 - c2) / 2,
                    right: "auto"
                })
            } else {
                if (cZ === "top") {
                    H.css({
                        width: br - parseInt(H.css("padding-left"), 10) - parseInt(H.css("padding-right"), 10),
                        left: (bW - br) / 2,
                        top: (b4 - c2) / 2,
                        right: "auto"
                    })
                } else {
                    if (cZ === "left") {
                        H.css({
                            height: c2 - parseInt(H.css("padding-top"), 10) - parseInt(H.css("padding-bottom"), 10),
                            left: (bW - br) / 2,
                            top: (b4 - c2) / 2,
                            right: "auto",
                            bottom: "auto"
                        })
                    } else {
                        if (cZ === "right") {
                            H.css({
                                height: c2 - parseInt(H.css("padding-top"), 10) - parseInt(H.css("padding-bottom"), 10),
                                right: (bW - br) / 2,
                                top: (b4 - c2) / 2,
                                left: "auto",
                                bottom: "auto"
                            })
                        }
                    }
                }
            }
        }
        var I = f('<div class="cc-htmlwrapper"/>').appendTo(cI);
        for (var A = 0; A < cl; A++) {
            var J = cO.eq(A).data("htmlelem");
            if (J) {
                I.append(f(J))
            }
        }

        function a() {
            var g = cO.eq(c1).data("htmlelem");
            if (g) {
                I.show();
                f(g).show()
            }
        }

        function bh() {
            I.hide().children().hide()
        }
        a();
        var K = f('<a class="slider-link" href="" />').appendTo(cI);
        K.hide();
        var L = [];
        for (var A = 0; A < cl; A++) {
            L[A] = cO.eq(A).data("href")
        }

        function cM() {
            if (L[c1]) {
                K.show();
                K[0].href = L[c1]
            }
        }
        cM();
        b0 = bJ === "random" ? true : false;

        function bL() {
            var g = [];
            if (bm === "3d") {
                if (bo) {
                    g = ["cubeUp", "cubeDown", "cubeRight", "cubeLeft"]
                } else {
                    g = ["cubeUp", "cubeDown", "cubeRight", "cubeLeft", "flipUp", "flipDown", "flipRight", "flipLeft", "blindsVertical", "blindsHorizontal", "gridBlocksUp", "gridBlocksDown", "gridBlocksLeft", "gridBlocksRight"]
                }
            } else {
                g = ["scaleFade", "fade", "horizontalOverlap", "verticalOverlap", "horizontalSlide", "verticalSlide", "horizontalWipe", "verticalWipe", "horizontalSplit", "verticalSplit", "fadeSlide", "circle", "fadeZoom", "clock", "zoomInOut", "spinFade", "rotate"]
            }
            bJ = g[Math.floor(Math.random() * (g.length + 1))];
            if (bJ === undefined) {
                bJ = g[0]
            }
        }
        if (b0) {
            bL()
        }

        function cY() {
            cM();
            c();
            a();
            b1();
            z.afterSlideChange(c1);
            if (b0) {
                bL();
                bm === "3d" ? i() : bQ()
            } else {
                if (cU[c1]) {
                    bm === "3d" ? i() : bQ()
                }
            }
        }
        if (bm === "3d") {
            cI.data("dimensions", {
                width: bW,
                height: b4,
                imageWidth: br,
                imageHeight: c2
            });
            if (y.directionNav) {
                var M = parseInt(B.css("left"), 10),
                    cd = parseInt(cx.css("right"), 10)
            }
            co.hide();
            cI.css("background", "transparent none");
            if (y.autoPlay) {
                var N = parseInt(E.css("right"), 10),
                    ci = parseInt(E.css("top"), 10)
            }

            function bx() {
                var h = cI.parent(),
                    j = (h.width() + 0.5) | 0,
                    m = cI.data("dimensions"),
                    g = m.width - m.imageWidth;
                if (j !== cI.width()) {
                    var l = m.width / m.height,
                        k = m.imageWidth / m.imageHeight;
                    if (m.width <= j) {
                        cI.width(m.width).height(m.height);
                        bW = m.width;
                        b4 = m.height;
                        br = m.imageWidth;
                        c2 = m.imageHeight
                    } else {
                        cI.width(j).height(j / l);
                        bW = j;
                        b4 = (j / l + 0.5) | 0;
                        br = j - g;
                        c2 = (br / k + 0.5) | 0
                    }
                }
                if (y.directionNav) {
                    B.css("left", g / 2 + M);
                    cx.css("right", g / 2 + cd)
                }
                cQ();
                E && E.css({
                    right: N + g / 2,
                    top: ci + g / 2
                });
                K.add(I).css({
                    width: br,
                    height: c2,
                    left: "50%",
                    top: "50%",
                    marginLeft: -br / 2,
                    marginTop: -c2 / 2
                })
            }
            bx();

            function bI() {
                (bW - br) % 2 !== 0 && (br--);
                (b4 - c2) % 2 !== 0 && (c2--)
            }
            bI();
            var O, bj, cJ, bw, c0 = [],
                cb = [],
                bN = [],
                bC = [],
                b5 = [],
                cs = [],
                cK = [],
                cj = [];

            function i() {
                if (cU[c1]) {
                    bJ = cU[c1].effect ? cU[c1].effect : b0 ? bJ : y.effect;
                    b3 = cU[c1].slices ? cU[c1].slices : y._3dOptions.slices;
                    ch = cU[c1].rows ? cU[c1].rows : y._3dOptions.rows;
                    ct = cU[c1].columns ? cU[c1].columns : y._3dOptions.columns;
                    by = cU[c1].delay ? cU[c1].delay : y._3dOptions.delay;
                    cf = cU[c1].delayDir ? cU[c1].delayDir : y._3dOptions.delayDir;
                    bq = cU[c1].depthOffset ? cU[c1].depthOffset : y._3dOptions.depthOffset;
                    b9 = cU[c1].sliceGap ? cU[c1].sliceGap : y._3dOptions.sliceGap;
                    cG = cU[c1].easing ? cU[c1].easing : y._3dOptions.easing;
                    bY = cU[c1].animSpeed ? cU[c1].animSpeed : y.animSpeed
                }
                bB = bJ.indexOf("grid") !== -1 ? true : false;
                if (bJ === "cubeLeft" || bJ === "cubeRight") {
                    O = br;
                    bj = ((c2 / b3) + 0.5) | 0;
                    cJ = br
                } else {
                    if (bJ === "cubeUp" || bJ === "cubeDown") {
                        O = ((br / b3) + 0.5) | 0;
                        bj = c2;
                        cJ = c2
                    } else {
                        if (bJ === "flipLeft" || bJ === "flipRight" || bJ === "blindsHorizontal") {
                            O = br;
                            bj = ((c2 / b3) + 0.5) | 0;
                            cJ = 10
                        } else {
                            if (bJ === "flipUp" || bJ === "flipDown" || bJ === "blindsVertical") {
                                O = ((br / b3) + 0.5) | 0;
                                bj = c2;
                                cJ = 10
                            } else {
                                if (bB) {
                                    O = ((br / ct) + 0.5) | 0;
                                    bj = ((c2 / ch) + 0.5) | 0;
                                    cJ = 10;
                                    b3 = ch * ct
                                }
                            }
                        }
                    }
                }
                bw = cJ === 10 ? 500 : br > 500 ? cJ + 100 : cJ + 50;
                if (c0[0]) {
                    cI.find("canvas.draw").remove()
                }
                bR = cP(b3);
                if (bB) {
                    bO = cP(ch);
                    cN = cP(ct)
                }
                var j = b3,
                    l, g, k, h;
                cj = [];
                while (j--) {
                    if (bB) {
                        g = a0(j);
                        if (g[0] <= bO) {
                            if (g[1] <= cN) {
                                l = 2 + g[0] + g[1]
                            } else {
                                l = 2 + g[0] + (ct - 1 - g[1])
                            }
                        } else {
                            if (g[1] <= cN) {
                                l = 2 + (ch - 1 - g[0]) + g[1]
                            } else {
                                l = 2 + (ch - 1 - g[0]) + (ct - 1 - g[1])
                            }
                        }
                    } else {
                        if (j <= bR) {
                            l = 2 + j
                        } else {
                            l = 2 + b3 - 1 - j
                        }
                    }
                    c0[j] = f('<canvas class="draw"/>').css("z-index", l);
                    cj[j] = c0[j][0];
                    cb[j] = c0[j][0].getContext("2d");
                    c0[j][0].width = bW;
                    c0[j][0].height = b4;
                    if (!bC[j]) {
                        bC[j] = e.createElement("canvas");
                        cs[j] = bC[j].getContext("2d")
                    }
                    if (!b5[j]) {
                        b5[j] = e.createElement("canvas");
                        cK[j] = b5[j].getContext("2d")
                    }
                    k = O;
                    h = bj;
                    if (bB) {
                        if (g[0] === (ch - 1)) {
                            h = c2 - g[0] * bj
                        }
                        if (g[1] === (ct - 1)) {
                            k = br - g[1] * O
                        }
                        bN[j] = new Cube(k, h, cJ, bw, cb[j], cr, []);
                        bN[j].position.y = c2 / 2 - h / 2 - g[0] * bj;
                        bN[j].position.x = -br / 2 + k / 2 + g[1] * O
                    } else {
                        if (bJ.indexOf("Left") !== -1 || bJ.indexOf("Right") !== -1 || bJ === "blindsHorizontal") {
                            if (j === (b3 - 1)) {
                                h = c2 - j * bj
                            }
                            bN[j] = new Cube(k, h, cJ, bw, cb[j], cr, []);
                            bN[j].position.y = c2 / 2 - h / 2 - j * bj
                        } else {
                            if (bJ.indexOf("Up") !== -1 || bJ.indexOf("Down") !== -1 || bJ === "blindsVertical") {
                                if (j === (b3 - 1)) {
                                    k = br - j * O
                                }
                                bN[j] = new Cube(k, h, cJ, bw, cb[j], cr, []);
                                bN[j].position.x = -br / 2 + k / 2 + j * O
                            }
                        }
                    }
                    bC[j].width = b5[j].width = k;
                    bC[j].height = b5[j].height = h;
                    if (bB) {
                        cv(cs[j], cO[c1], g[0], g[1])
                    } else {
                        cv(cs[j], cO[c1], j)
                    }
                    bN[j].images[0] = bC[j];
                    bN[j].render()
                }
                cI.append(cj)
            }
            i();
            if (navigator.userAgent.match(/webkit/gi) !== null) {
                i()
            }

            function cA() {
                if (bo && bJ.indexOf("cube") === 0) {
                    var l = f('<canvas class="shadow"/>').appendTo(cI).css("z-index", "1"),
                        k = l[0].getContext("2d");
                    k.canvas.width = bW;
                    k.canvas.height = b4;
                    var g = new Plane(br, cJ, bw, k, "#444", "", cp),
                        h = cI.data("dimensions"),
                        j = h.width - h.imageWidth;
                    g.position.y = -c2 / 2 + 50;
                    g.position.z = cJ / 2;
                    g.rotation.x = Math.PI / 2;
                    g.shadowOffsetY = 50 + 25;
                    g.render()
                }
            }
            cA();
            f(window).bind("resize.slider3d orientationchange.slider3d", function() {
                bx();
                bI();
                y.autoPlay && z.stop();
                cI.find("canvas.draw, canvas.shadow").remove();
                i();
                cA();
                y.autoPlay && z.start()
            })
        }

        function bs(s) {
            if (!bi) {
                if (!ca && bv) {
                    cB()
                }
                var o = c1,
                    q = cO[c1],
                    n, t, g, l, h, j, k, p;
                if (typeof(s) === "number") {
                    c1 = s;
                    s = o < c1 ? "next" : "prev"
                } else {
                    c1 += ~~(s === "next") || -1;
                    c1 = c1 < 0 ? cl - 1 : c1 % cl
                }
                var u = cO[c1];
                z.beforeSlideChange(c1);
                cH();
                bh();
                bT();
                K.hide();
                bi = true;
                switch (bJ) {
                    case "cubeLeft":
                        if (s === "next") {
                            n = 1;
                            t = -1
                        } else {
                            n = 3;
                            t = 1
                        }
                        g = "y";
                        break;
                    case "cubeRight":
                        if (s === "next") {
                            n = 3;
                            t = 1
                        } else {
                            n = 1;
                            t = -1
                        }
                        g = "y";
                        break;
                    case "cubeUp":
                        if (s === "next") {
                            n = 5;
                            t = 1
                        } else {
                            n = 4;
                            t = -1
                        }
                        g = "x";
                        break;
                    case "cubeDown":
                        if (s === "next") {
                            n = 4;
                            t = -1
                        } else {
                            n = 5;
                            t = 1
                        }
                        g = "x";
                        break;
                    case "flipLeft":
                        if (s === "next") {
                            t = -1
                        } else {
                            t = 1
                        }
                        n = 2;
                        g = "y";
                        break;
                    case "flipRight":
                        if (s === "next") {
                            t = 1
                        } else {
                            t = -1
                        }
                        n = 2;
                        g = "y";
                        break;
                    case "flipUp":
                        if (s === "next") {
                            t = 1
                        } else {
                            t = -1
                        }
                        n = 2;
                        g = "x";
                        break;
                    case "flipDown":
                        if (s === "next") {
                            t = -1
                        } else {
                            t = 1
                        }
                        n = 2;
                        g = "x";
                        break;
                    case "blindsVertical":
                        if (s === "next") {
                            t = 1
                        } else {
                            t = -1
                        }
                        n = 2;
                        g = "y";
                        break;
                    case "blindsHorizontal":
                        if (s === "next") {
                            t = -1
                        } else {
                            t = 1
                        }
                        n = 2;
                        g = "x";
                        break;
                    case "gridBlocksUp":
                        if (s === "next") {
                            t = 1
                        } else {
                            t = -1
                        }
                        n = 2;
                        g = "x";
                        break;
                    case "gridBlocksDown":
                        if (s === "next") {
                            t = -1
                        } else {
                            t = 1
                        }
                        n = 2;
                        g = "x";
                        break;
                    case "gridBlocksLeft":
                        if (s === "next") {
                            t = -1
                        } else {
                            t = 1
                        }
                        n = 2;
                        g = "y";
                        break;
                    case "gridBlocksRight":
                        if (s === "next") {
                            t = 1
                        } else {
                            t = -1
                        }
                        n = 2;
                        g = "y";
                        break
                }
                j = b3;
                while (j--) {
                    if (bB) {
                        h = a0(j);
                        cv(cs[j], q, h[0], h[1]);
                        cv(cK[j], u, h[0], h[1])
                    } else {
                        cv(cs[j], q, j);
                        cv(cK[j], u, j)
                    }
                    bN[j].images[0] = bC[j];
                    bN[j].images[n] = b5[j]
                }
                if (bJ.indexOf("cube") === 0) {
                    l = Math.PI / 2
                } else {
                    l = Math.PI
                }
                j = b3;
                var r, v;
                while (j--) {
                    bN[j].rotation[g] = 0;
                    if (bB) {
                        h = a0(j);
                        switch (cf) {
                            case "fromCentre":
                                r = (Math.abs(h[0] - bO)) * by + (Math.abs(h[1] - cN)) * by;
                                v = 0;
                                break;
                            case "toCentre":
                                if (h[0] < bO) {
                                    r = h[0] * by
                                } else {
                                    r = (ch - 1 - h[0]) * by
                                }
                                if (h[1] < cN) {
                                    r += h[1] * by
                                } else {
                                    r += (ct - 1 - h[1]) * by
                                }
                                v = bR;
                                break;
                            case "first-last":
                                r = h[0] * by + h[1] * by;
                                v = b3 - 1;
                                break;
                            case "last-first":
                                r = (ch - 1 - h[0]) * by + (ct - 1 - h[1]) * by;
                                v = 0;
                                break
                        }
                    } else {
                        switch (cf) {
                            case "fromCentre":
                                r = (Math.abs(j - bR)) * by;
                                v = 0;
                                break;
                            case "toCentre":
                                if (j < bR) {
                                    r = j * by
                                } else {
                                    r = (b3 - 1 - j) * by
                                }
                                v = bR;
                                break;
                            case "first-last":
                                r = j * by;
                                v = b3 - 1;
                                break;
                            case "last-first":
                                r = (b3 - 1 - j) * by;
                                v = 0;
                                break
                        }
                    }
                    f.fx.interval = 25;
                    var m = {
                        axis: g,
                        angle: 0,
                        z: 0,
                        gap: 0,
                        cubeX: bN[j].position.x,
                        cubeY: bN[j].position.y,
                        cubeZ: bN[j].position.z,
                        cube: bN[j],
                        cubeNum: j,
                        gridXY: h
                    };
                    f(m).delay(r).animate({
                        angle: t * l,
                        gap: 2 * b9,
                        z: 2 * bq
                    }, {
                        duration: bY,
                        specialEasing: {
                            angle: cG,
                            z: "easeInOutCubic",
                            gap: "easeInOutCubic"
                        },
                        step: c3,
                        complete: function() {
                            if (this.cubeNum === v) {
                                f.fx.interval = 16;
                                cY()
                            }
                        }
                    })
                }
            }
        }

        function c3(g, h) {
            if (h.prop === "angle") {
                this.cube.rotation[this.axis] = g
            } else {
                if (h.prop === "gap") {
                    if (g > b9) {
                        g = 2 * b9 - g
                    }
                    if (bJ === "blindsHorizontal") {
                        this.cube.position.y = this.cubeY - (this.cubeNum - bR) * g
                    } else {
                        if (bJ === "blindsVertical") {
                            this.cube.position.x = this.cubeX + (this.cubeNum - bR) * g
                        } else {
                            if (bB) {
                                this.cube.position.y = this.cubeY - (this.gridXY[0] - bO) * g;
                                this.cube.position.x = this.cubeX + (this.gridXY[1] - cN) * g
                            } else {
                                if (this.axis === "y") {
                                    this.cube.position.y = this.cubeY - (this.cubeNum - bR) * g
                                } else {
                                    if (this.axis === "x") {
                                        this.cube.position.x = this.cubeX + (this.cubeNum - bR) * g
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (g > bq) {
                        g = 2 * bq - g
                    }
                    this.cube.position.z = this.cubeZ + g;
                    this.cube.render()
                }
            }
        }

        function cv(r, m, o, q) {
            var k = r.canvas.width,
                p = r.canvas.height;
            if (bF) {
                r.clearRect(0, 0, k, p)
            }
            if (m.width !== br || m.height !== c2) {
                var l = e.createElement("canvas"),
                    h = l.getContext("2d");
                l.width = br;
                l.height = c2;
                h.drawImage(m, 0, 0, br, c2);
                m = l
            }
            if (bJ.indexOf("grid") !== -1) {
                var s = ((m.width / ct) + 0.5) | 0,
                    g = ((m.height / ch) + 0.5) | 0,
                    n = s,
                    j = g;
                if (o === (ch - 1)) {
                    g = m.height - o * g
                }
                if (q === (ct - 1)) {
                    s = m.width - q * s
                }
                r.drawImage(m, q * n, o * j, s, g, 0, 0, k, p)
            } else {
                if (bJ.indexOf("Up") !== -1 || bJ.indexOf("Down") !== -1 || bJ === "blindsVertical") {
                    var s = ((m.width / b3) + 0.5) | 0,
                        n = s;
                    if (o === b3 - 1) {
                        s = m.width - o * s
                    }
                    r.drawImage(m, o * n, 0, s, m.height, 0, 0, k, p)
                } else {
                    if (bJ.indexOf("Left") !== -1 || bJ.indexOf("Right") !== -1 || bJ === "blindsHorizontal") {
                        var g = ((m.height / b3) + 0.5) | 0,
                            j = g;
                        if (o === b3 - 1) {
                            g = m.height - o * g
                        }
                        r.drawImage(m, 0, o * j, m.width, g, 0, 0, k, p)
                    }
                }
            }
        }

        function cP(g) {
            var h;
            if (g % 2 === 0) {
                h = g / 2
            } else {
                h = (g + 1) / 2
            }
            return (h - 1)
        }

        function a0(g) {
            var h, j;
            if (g % ct !== 0) {
                h = (g / ct) | 0;
                j = g % ct
            } else {
                h = g / ct;
                j = 0
            }
            return [h, j]
        }
        if (bm === "2d") {
            var P = new Image(),
                bt = 1,
                b = 1,
                bK = 0,
                bn = cI.parent(),
                M = y.directionNav ? parseInt(B.css("left"), 10) : 0,
                cd = y.directionNav ? parseInt(cx.css("right"), 10) : 0,
                bA = (M + cd) < 0 ? -(M + cd) : 0;
            cO.each(function() {
                P.src = this.src;
                if (bt < P.width) {
                    bt = P.width
                }
                if (b < P.height) {
                    b = P.height
                }
            });
            bK = bt / b;
            cI.css({
                backgroundImage: "none"
            });
            f(window).bind("resize.slider2d orientationchange.slider2d", function() {
                y.autoPlay && z.stop();
                if (bn.width() >= bt + bA) {
                    cI.width(bt);
                    cI.height(b);
                    cE = bt;
                    b7 = b
                } else {
                    var h = bn.is("body") ? (bn.width() - bA) : bn.width(),
                        g = h / bK;
                    cI.width(h);
                    cI.height(g);
                    cE = h;
                    b7 = g
                }
                if (cF) {
                    bE.css({
                        left: -cE,
                        width: cE,
                        height: (Math.sqrt(cE * cE + b7 * b7)),
                        marginTop: -(Math.sqrt(cE * cE + b7 * b7)) / 2
                    });
                    cn.css({
                        right: -cE,
                        width: cE,
                        height: (Math.sqrt(cE * cE + b7 * b7)),
                        marginTop: -(Math.sqrt(cE * cE + b7 * b7)) / 2
                    });
                    bu.add(cT).css({
                        width: cE,
                        height: b7,
                        marginTop: -b7 / 2
                    })
                }
                y.autoPlay && z.start()
            }).trigger("resize.slider2d");
            cO.eq(c1).css("z-index", "3").fadeIn(600, function() {
                cO.show()
            });
            var Q, cw, cy, bM, cF, cD, cn, bE, cT, bu;

            function bQ() {
                if (cU[c1] && !bD) {
                    bJ = cU[c1].effect ? cU[c1].effect : b0 ? bJ : y.effect;
                    bY = cU[c1].animSpeed ? cU[c1].animSpeed : y.animSpeed
                }
                if ((bJ === "clock" || bJ === "circle" || bJ === "spinFade" || bJ === "rotate") && (navigator.appName.toLowerCase().indexOf("microsoft") != -1 && parseFloat(navigator.appVersion.split("MSIE")[1], 10) < 9)) {
                    bJ = "fadeSlide"
                }
                if (bJ.indexOf("Wipe") !== -1) {
                    if (!Q) {
                        Q = f('<div class="wipe-div"/>').appendTo(cI)
                    }
                }
                if (bJ.indexOf("Split") !== -1) {
                    if (!cw) {
                        cw = f('<div class="split1-div"/>').appendTo(cI);
                        cy = f('<div class="split2-div"/>').appendTo(cI)
                    }
                }
                if (bJ.indexOf("circle") !== -1) {
                    if (!bM) {
                        bM = f('<div class="circle-div"/>').appendTo(co)
                    }
                }
                if (bJ.indexOf("clock") !== -1) {
                    if (!cF) {
                        cF = f('<div class="clock-mask left"/>').appendTo(cI);
                        cn = f('<div class="clock-outer"/>').appendTo(cF);
                        cT = f('<div class="clock-inner"/>').appendTo(cn);
                        cD = f('<div class="clock-mask right"/>').appendTo(cI);
                        bE = f('<div class="clock-outer"/>').appendTo(cD);
                        bu = f('<div class="clock-inner"/>').appendTo(bE);
                        bE.css({
                            left: -cE,
                            width: cE,
                            height: (Math.sqrt(cE * cE + b7 * b7)),
                            marginTop: -(Math.sqrt(cE * cE + b7 * b7)) / 2
                        });
                        cn.css({
                            right: -cE,
                            width: cE,
                            height: (Math.sqrt(cE * cE + b7 * b7)),
                            marginTop: -(Math.sqrt(cE * cE + b7 * b7)) / 2
                        });
                        bu.add(cT).css({
                            width: cE,
                            height: b7,
                            marginTop: -b7 / 2
                        })
                    }
                }
            }
            bQ()
        }

        function cc(j) {
            if (!bi) {
                if (!ca && bv) {
                    cB()
                }
                var p = c1,
                    g = cO.eq(c1),
                    k;
                if (typeof(j) === "number") {
                    c1 = j;
                    j = p < c1 ? "next" : "prev"
                } else {
                    c1 += ~~(j === "next") || -1;
                    c1 = c1 < 0 ? cl - 1 : c1 % cl
                }
                k = cO.eq(c1);
                z.beforeSlideChange(c1);
                cH();
                bh();
                bT();
                K.hide();
                bi = true;
                cO.css("z-index", "1");
                g.css("z-index", "2");
                switch (bJ) {
                    case "scaleFade":

                        break;
                    case "fade":
                        k.css({
                            opacity: 0,
                            zIndex: 3
                        }).animate({
                            opacity: 1
                        }, bY, cY);
                        break;
                    case "horizontalOverlap":
                        if (j === "next") {
                            k.css({
                                left: cE,
                                zIndex: 3
                            }).animate({
                                left: 0
                            }, bY, cY)
                        } else {
                            k.css({
                                left: -cE,
                                zIndex: 3
                            }).animate({
                                left: 0
                            }, bY, cY)
                        }
                        break;
                    case "verticalOverlap":
                        if (j === "next") {
                            k.css({
                                top: -b7,
                                zIndex: 3
                            }).animate({
                                top: 0
                            }, bY, cY)
                        } else {
                            k.css({
                                top: b7,
                                zIndex: 3
                            }).animate({
                                top: 0
                            }, bY, cY)
                        }
                        break;
                    case "horizontalSlide":
                        if (j === "next") {
                            k.css({
                                left: cE,
                                zIndex: 3
                            }).animate({
                                left: 0
                            }, bY, cY);
                            g.animate({
                                left: -cE
                            }, bY, function() {
                                g.css("left", "0")
                            })
                        } else {
                            k.css({
                                left: -cE,
                                zIndex: 3
                            }).animate({
                                left: 0
                            }, bY, cY);
                            g.animate({
                                left: cE
                            }, bY, function() {
                                g.css("left", "0")
                            })
                        }
                        break;
                    case "verticalSlide":
                        if (j === "next") {
                            k.css({
                                top: -b7,
                                zIndex: 3
                            }).animate({
                                top: 0
                            }, bY, cY);
                            g.animate({
                                top: b7
                            }, bY, function() {
                                g.css("top", "0")
                            })
                        } else {
                            k.css({
                                top: b7,
                                zIndex: 3
                            }).animate({
                                top: 0
                            }, bY, cY);
                            g.animate({
                                top: -b7
                            }, bY, function() {
                                g.css("top", "0")
                            })
                        }
                        break;
                    case "horizontalWipe":
                        k.hide();
                        Q.css({
                            background: "url(" + k[0].src + ") no-repeat",
                            height: b7
                        }).animate({
                            width: cE
                        }, bY, function() {
                            Q.css({
                                width: 0,
                                height: 0
                            });
                            k.css("z-index", "3").show();
                            cY()
                        });
                        break;
                    case "verticalWipe":
                        k.hide();
                        Q.css({
                            background: "url(" + k[0].src + ") no-repeat",
                            width: cE
                        }).animate({
                            height: b7
                        }, bY, function() {
                            Q.css({
                                width: 0,
                                height: 0
                            });
                            k.css("z-index", "3").show();
                            cY()
                        });
                        break;
                    case "verticalSplit":
                        g.css({
                            opacity: 0
                        });
                        k.css({
                            zIndex: 3
                        });
                        cw.css({
                            width: cE / 2,
                            height: b7,
                            top: 0,
                            left: 0,
                            background: "url(" + g[0].src + ") no-repeat"
                        });
                        cy.css({
                            width: cE / 2,
                            height: b7,
                            top: 0,
                            right: 0,
                            background: "url(" + g[0].src + ") -50% 0 no-repeat"
                        });
                        cw.animate({
                            width: 0
                        }, bY);
                        cy.animate({
                            width: 0
                        }, {
                            duration: bY,
                            step: function(r) {
                                cy.css("background-position", r - cE + "px 0")
                            },
                            complete: function() {
                                g.css("opacity", "1");
                                cw.add(cy).css({
                                    top: "auto",
                                    bottom: "auto",
                                    left: "auto",
                                    right: "auto"
                                });
                                cY()
                            }
                        });
                        break;
                    case "horizontalSplit":
                        g.css({
                            opacity: 0
                        });
                        k.css({
                            zIndex: 3
                        });
                        cw.css({
                            width: cE,
                            height: b7 / 2,
                            top: 0,
                            left: 0,
                            background: "url(" + g[0].src + ") no-repeat"
                        });
                        cy.css({
                            width: cE,
                            height: b7 / 2,
                            bottom: 0,
                            left: 0,
                            background: "url(" + g[0].src + ") 0 -50% no-repeat"
                        });
                        cw.animate({
                            height: 0
                        }, bY);
                        cy.animate({
                            height: 0
                        }, {
                            duration: bY,
                            step: function(r) {
                                cy.css("background-position", "0" + (r - b7) + "px")
                            },
                            complete: function() {
                                g.css("opacity", "1");
                                cw.add(cy).css({
                                    top: "auto",
                                    bottom: "auto",
                                    left: "auto",
                                    right: "auto"
                                });
                                cY()
                            }
                        });
                        break;
                    case "fadeSlide":
                        k.css("z-index", "3");
                        g.css("z-index", "4");
                        if (j === "next") {
                            g.animate({
                                left: -cE,
                                opacity: 0
                            }, bY, function() {
                                g.css({
                                    left: 0,
                                    opacity: 1,
                                    zIndex: 1
                                });
                                cY()
                            })
                        } else {
                            g.animate({
                                left: cE,
                                opacity: 0
                            }, bY, function() {
                                g.css({
                                    left: 0,
                                    opacity: 1,
                                    zIndex: 1
                                });
                                cY()
                            })
                        }
                        break;
                    case "circle":
                        var h = Math.round(Math.sqrt(cE * cE + b7 * b7));
                        if (j === "next") {
                            k.hide();
                            bM.css({
                                background: "url(" + k[0].src + ") center center no-repeat",
                                "-webkit-background-size": cE + "px " + b7 + "px",
                                "background-size": cE + "px " + b7 + "px"
                            }).animate({
                                width: h,
                                height: h,
                                marginLeft: -h / 2,
                                marginTop: -h / 2
                            }, bY, function() {
                                bM.css({
                                    width: 0,
                                    height: 0,
                                    marginLeft: 0,
                                    marginTop: 0
                                });
                                k.css("z-index", "3").show();
                                cY()
                            })
                        } else {
                            k.css("z-index", "3");
                            g.css("z-index", "2");
                            bM.css({
                                background: "url(" + g[0].src + ") center center no-repeat",
                                "-webkit-background-size": cE + "px " + b7 + "px",
                                "background-size": cE + "px " + b7 + "px",
                                width: h,
                                height: h,
                                marginLeft: -h / 2,
                                marginTop: -h / 2,
                                zIndex: 4
                            }).animate({
                                width: 0,
                                height: 0,
                                marginLeft: 0,
                                marginTop: 0
                            }, bY, function() {
                                bM.css("z-index", "3");
                                cY()
                            })
                        }
                        break;
                    case "fadeZoom":
                        k.css("z-index", "3");
                        g.css({
                            "z-index": "4",
                            maxWidth: "none",
                            width: cE
                        });
                        var l = cE,
                            m = b7;
                        g.animate({
                            top: -m / 2,
                            left: -l / 2,
                            width: 2 * l,
                            height: 2 * m,
                            opacity: 0
                        }, bY, function() {
                            g.css({
                                top: 0,
                                left: 0,
                                maxWidth: "100%",
                                width: "auto",
                                height: "auto",
                                opacity: 1,
                                zIndex: 2
                            });
                            cY()
                        });
                        break;
                    case "clock":
                        cF.add(cD).show();
                        cT.add(bu).css({
                            background: "url(" + k[0].src + ") center center no-repeat"
                        });
                        var o = {
                            deg: 0
                        };
                        f(o).animate({
                            deg: 358
                        }, {
                            duration: bY,
                            step: function(r) {
                                if (r <= 180) {
                                    bE.css({
                                        "-moz-transform": "rotate(" + r + "deg)",
                                        "-webkit-transform": "rotate(" + r + "deg)",
                                        "-o-transform": "rotate(" + r + "deg)",
                                        "-ms-transform": "rotate(" + r + "deg)"
                                    });
                                    bu.css({
                                        "-moz-transform": "rotate(-" + r + "deg)",
                                        "-webkit-transform": "rotate(-" + r + "deg)",
                                        "-o-transform": "rotate(-" + r + "deg)",
                                        "-ms-transform": "rotate(-" + r + "deg)"
                                    })
                                } else {
                                    bE.css({
                                        "-moz-transform": "rotate(180deg)",
                                        "-webkit-transform": "rotate(180deg)",
                                        "-o-transform": "rotate(180deg)",
                                        "-ms-transform": "rotate(180deg)"
                                    });
                                    bu.css({
                                        "-moz-transform": "rotate(-180deg)",
                                        "-webkit-transform": "rotate(-180deg)",
                                        "-o-transform": "rotate(-180deg)",
                                        "-ms-transform": "rotate(-180deg)"
                                    });
                                    r = r - 180;
                                    cn.css({
                                        "-moz-transform": "rotate(" + r + "deg)",
                                        "-webkit-transform": "rotate(" + r + "deg)",
                                        "-o-transform": "rotate(" + r + "deg)",
                                        "-ms-transform": "rotate(" + r + "deg)"
                                    });
                                    cT.css({
                                        "-moz-transform": "rotate(-" + r + "deg)",
                                        "-webkit-transform": "rotate(-" + r + "deg)",
                                        "-o-transform": "rotate(-" + r + "deg)",
                                        "-ms-transform": "rotate(-" + r + "deg)"
                                    })
                                }
                            },
                            complete: function() {
                                cF.add(cD).hide();
                                cn.add(bE).add(cT).add(bu).css({
                                    "-moz-transform": "rotate(0)",
                                    "-webkit-transform": "rotate(0)",
                                    "-o-transform": "rotate(0)",
                                    "-ms-transform": "rotate(0)"
                                });
                                k.css("z-index", "3");
                                cY()
                            }
                        });
                        break;
                    case "zoomInOut":
                        cO.hide();
                        k.css("z-index", "3").show();
                        g.css("z-index", "4").show();
                        var l = g[0].width,
                            m = g[0].height,
                            n = k[0].width,
                            q = k[0].height;
                        k.css({
                            top: 0,
                            left: 0,
                            width: "auto",
                            height: "auto",
                            opacity: 1
                        });
                        g.animate({
                            top: m / 2,
                            left: l / 2,
                            width: 0,
                            height: 0,
                            opacity: 0
                        }, bY / 2, function() {
                            k.animate({
                                top: 0,
                                left: 0,
                                width: n,
                                height: q,
                                opacity: 1
                            }, bY / 2, function() {
                                g.css({
                                    top: 0,
                                    left: 0,
                                    width: "auto",
                                    height: "auto",
                                    opacity: 1,
                                    zIndex: 2
                                });
                                k.css({
                                    width: "auto",
                                    height: "auto"
                                });
                                cO.show();
                                cY()
                            })
                        });
                        break;
                    case "spinFade":
                        k.css("z-index", "3");
                        g.css({
                            "z-index": "4",
                            "-moz-transform-origin": "center center",
                            "-webkit-transform-origin": "center center",
                            "-o-transform-origin": "center center",
                            "-ms-transform-origin": "center center"
                        });
                        var l = g[0].width,
                            m = g[0].height,
                            o = {
                                deg: 0
                            };
                        f(o).animate({
                            deg: 1080
                        }, {
                            duration: bY,
                            step: function(r) {
                                g.css({
                                    "-moz-transform": "rotate(" + r + "deg)",
                                    "-webkit-transform": "rotate(" + r + "deg)",
                                    "-o-transform": "rotate(" + r + "deg)",
                                    "-ms-transform": "rotate(" + r + "deg)"
                                })
                            }
                        });
                        g.animate({
                            top: m / 2,
                            left: l / 2,
                            width: 0,
                            height: 0,
                            opacity: 0
                        }, bY, function() {
                            g.css({
                                top: 0,
                                left: 0,
                                width: "auto",
                                height: "auto",
                                opacity: 1,
                                zIndex: 2
                            });
                            cY()
                        });
                        break;
                    case "rotate":
                        k.css({
                            "z-index": "3",
                            "-moz-transform-origin": "0 0",
                            "-moz-transform": "rotate(-90deg)",
                            "-webkit-transform-origin": "0 0",
                            "-webkit-transform": "rotate(-90deg)",
                            "-o-transform-origin": "0 0",
                            "-o-transform": "rotate(-90deg)",
                            "-ms-transform-origin": "0 0",
                            "-ms-transform": "rotate(-90deg)"
                        });
                        var o = {
                            deg: -90
                        };
                        f(o).animate({
                            deg: 0
                        }, {
                            duration: bY,
                            step: function(r) {
                                k.css({
                                    "-moz-transform": "rotate(" + r + "deg)",
                                    "-webkit-transform": "rotate(" + r + "deg)",
                                    "-o-transform": "rotate(" + r + "deg)",
                                    "-ms-transform": "rotate(" + r + "deg)"
                                })
                            },
                            complete: cY
                        })
                }
            }
        }
    }
    f.fn.ccslider = function(a) {
        return this.each(function() {
            if (!f.data(this, "ccslider")) {
                f.data(this, "ccslider", new d(this, a))
            }
        })
    };
    f.fn.ccslider.defaults = {
        effectType: "3d",
        effect: "cubeUp",
        _3dOptions: {
            imageWidth: 600,
            imageHeight: 300,
            transparentImg: false,
            innerSideColor: "#444",
            makeShadow: true,
            shadowColor: "rgba(0, 0, 0, 0.7)",
            slices: 3,
            rows: 3,
            columns: 3,
            delay: 200,
            delayDir: "first-last",
            depthOffset: 400,
            sliceGap: 20,
            easing: "easeInOutCubic",
            fallBack: "fadeSlide",
            fallBackSpeed: 1200
        },
        animSpeed: 1200, //指定每次切换幻灯片时的动画持续时间（毫秒）。这里设置为 1200 毫秒，即 1.2 秒。
        startSlide: 0, //指定幻灯片从哪一张开始显示。索引从 0 开始，所以 0 表示第一张幻灯片。
        directionNav: false, //启用或禁用方向导航（左右箭头）。true 表示启用，用户可以通过点击箭头来手动切换幻灯片。
        controlLinks: false, //启用或禁用控制链接（通常是底部的小圆点或其他形式的缩略图），用于快速跳转到特定幻灯片。
        controlLinkThumbs: false, //如果启用了 controlLinks，此选项决定是否显示缩略图作为控制链接。false 表示不显示缩略图。
        controlThumbLocation: "", //如果启用了缩略图控制链接，此选项指定缩略图的位置。空字符串表示默认位置。如果你需要自定义缩略图的位置，可以在这里提供一个 CSS 类名或选择器。
        autoPlay: false, //启用或禁用自动播放功能。true 表示启用，幻灯片会自动切换。
        pauseTime: 8000, //设置自动播放时两张幻灯片之间的暂停时间（毫秒）。这里设置为 5000 毫秒，即 5 秒。
        pauseOnHover: false, //当鼠标悬停在幻灯片上时，是否暂停自动播放。true 表示启用此功能。
        captions: false, //启用或禁用幻灯片标题（字幕）。true 表示启用，幻灯片中的图片可以包含标题文本。
        captionPosition: "bottom", //设置标题的位置。"bottom" 表示标题位于幻灯片的底部。其他可能的值包括 "top"、"left"、"right" 等。
        captionAnimation: "slide", //设置标题的动画效果。"slide" 表示标题将以滑动的方式出现。其他可能的值包括 "fade"（淡入）等。
        captionAnimationSpeed: 600, //设置标题动画的持续时间（毫秒）。这里设置为 600 毫秒，即 0.6 秒。
        beforeSlideChange: function(a) {}, //定义在幻灯片切换前触发的回调函数。你可以在这个函数中执行一些自定义逻辑，比如加载数据或更新 UI。
        afterSlideChange: function(a) {} //定义在幻灯片切换后触发的回调函数。同样可以用于执行自定义逻辑，比如更新状态或记录日志。
    }
})(jQuery, document);

function Cube(l, h, j, k, n, m, i) {
    this.width = l;
    this.height = h;
    this.depth = j;
    this.focalLength = k;
    this.ctx = n;
    this.color = m;
    this.images = i;
    this.rotation = {
        x: 0,
        y: 0,
        z: 0,
        parent: this
    };
    this.position = {
        x: 0,
        y: 0,
        z: 0,
        parent: this
    };
    this.canvas = this.ctx.canvas;
    this.cwidth = this.canvas.width;
    this.cheight = this.canvas.height;
    this.centerx = this.cwidth / 2;
    this.centery = this.cheight / 2;
    this.maxX = 0;
    this.minX = 0;
    this.maxY = 0;
    this.minY = 0;
    this.drawWidth = 0;
    this.drawHeight = 0;
    this.vertexPoints = [make3DPoint(-this.width / 2, this.height / 2, -this.depth / 2), make3DPoint(this.width / 2, this.height / 2, -this.depth / 2), make3DPoint(this.width / 2, -this.height / 2, -this.depth / 2), make3DPoint(-this.width / 2, -this.height / 2, -this.depth / 2), make3DPoint(-this.width / 2, this.height / 2, this.depth / 2), make3DPoint(this.width / 2, this.height / 2, this.depth / 2), make3DPoint(this.width / 2, -this.height / 2, this.depth / 2), make3DPoint(-this.width / 2, -this.height / 2, this.depth / 2)];
    this.position.z += this.depth / 2
}
Cube.prototype.render = function() {
    var g = Transform3DTo2D(this.vertexPoints, this.rotation, this.position, this.focalLength, this.centerx, this.centery);
    this.ctx.clearRect(this.minX, this.minY, this.drawWidth, this.drawHeight);
    var e;
    if (isVisible(g[3], g[0], g[1])) {
        e = [g[0], g[1], g[3], g[2]];
        mapTexture(this.ctx, e, this.images[0])
    }
    if (isVisible(g[6], g[5], g[4])) {
        if (this.rotation.x === 0) {
            e = [g[5], g[4], g[6], g[7]]
        } else {
            e = [g[7], g[6], g[4], g[5]]
        }
        mapTexture(this.ctx, e, this.images[2])
    }
    if (isVisible(g[2], g[1], g[5]) && this.depth !== 0) {
        if (this.images[1]) {
            e = [g[1], g[5], g[2], g[6]];
            mapTexture(this.ctx, e, this.images[1])
        } else {
            this.ctx.fillStyle = this.color;
            drawPlane(this.ctx, g[1], g[5], g[6], g[2]);
            this.ctx.fill()
        }
    }
    if (isVisible(g[7], g[4], g[0]) && this.depth !== 0) {
        if (this.images[3]) {
            e = [g[4], g[0], g[7], g[3]];
            mapTexture(this.ctx, e, this.images[3])
        } else {
            this.ctx.fillStyle = this.color;
            drawPlane(this.ctx, g[4], g[0], g[3], g[7]);
            this.ctx.fill()
        }
    }
    if (isVisible(g[0], g[4], g[5]) && this.depth !== 0) {
        if (this.images[4]) {
            e = [g[4], g[5], g[0], g[1]];
            mapTexture(this.ctx, e, this.images[4])
        } else {
            this.ctx.fillStyle = this.color;
            drawPlane(this.ctx, g[4], g[5], g[1], g[0]);
            this.ctx.fill()
        }
    }
    if (isVisible(g[7], g[3], g[2]) && this.depth !== 0) {
        if (this.images[5]) {
            e = [g[3], g[2], g[7], g[6]];
            mapTexture(this.ctx, e, this.images[5])
        } else {
            this.ctx.fillStyle = this.color;
            drawPlane(this.ctx, g[3], g[2], g[6], g[7]);
            this.ctx.fill()
        }
    }
    var f = Math.max,
        h = Math.min;
    this.maxX = (f(g[0].x, g[1].x, g[2].x, g[3].x, g[4].x, g[5].x, g[6].x, g[7].x) + 1) | 0;
    this.minX = h(g[0].x, g[1].x, g[2].x, g[3].x, g[4].x, g[5].x, g[6].x, g[7].x) | 0;
    this.maxY = (f(g[0].y, g[1].y, g[2].y, g[3].y, g[4].y, g[5].y, g[6].y, g[7].y) + 1) | 0;
    this.minY = h(g[0].y, g[1].y, g[2].y, g[3].y, g[4].y, g[5].y, g[6].y, g[7].y) | 0;
    this.drawWidth = this.maxX - this.minX;
    this.drawHeight = this.maxY - this.minY
};

function Plane(l, i, j, h, m, n, k) {
    this.width = l;
    this.height = i;
    this.focalLength = j;
    this.ctx = h;
    this.color = m;
    this.shadowColor = k;
    this.rotation = {
        x: 0,
        y: 0,
        z: 0
    };
    this.position = {
        x: 0,
        y: 0,
        z: 0
    };
    this.canvas = this.ctx.canvas, this.cWidth = this.canvas.width, this.cHeight = this.canvas.height, this.centerx = this.cWidth / 2, this.centery = this.cHeight / 2;
    this.vertexPoints = [make3DPoint(-this.width / 2, this.height / 2, 0), make3DPoint(this.width / 2, this.height / 2, 0), make3DPoint(this.width / 2, -this.height / 2, 0), make3DPoint(-this.width / 2, -this.height / 2, 0)]
}
Plane.prototype.render = function() {
    var e = Transform3DTo2D(this.vertexPoints, this.rotation, this.position, this.focalLength, this.centerx, this.centery),
        d = (Math.max(e[0].y, e[1].y, e[2].y, e[3].y) + 1) | 0,
        f = Math.min(e[0].y, e[1].y, e[2].y, e[3].y) | 0;
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    drawPlane(this.ctx, make2DPoint(0, this.cHeight), make2DPoint(this.cWidth, this.cHeight), make2DPoint(this.cWidth, d), make2DPoint(0, d));
    this.ctx.clip();
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = (d - f) >= 25 ? this.shadowOffsetY : this.shadowOffsetY - 25 + (d - f);
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = this.shadowColor;
    this.ctx.fillStyle = this.color;
    drawPlane(this.ctx, e[0], e[1], e[2], e[3]);
    this.ctx.fill()
};

function make3DPoint(e, g, h) {
    var f = {
        x: e,
        y: g,
        z: h
    };
    return f
}

function make2DPoint(d, f) {
    var e = {
        x: d,
        y: f
    };
    return e
}

function Transform3DTo2D(i, R, F, S, y, z) {
    var Q = [],
        K = Math.sin,
        Z = Math.cos,
        H = K(R.x),
        V = Z(R.x),
        L = K(R.y),
        W = Z(R.y),
        M = K(R.z),
        Y = Z(R.z),
        N, O, P, T, U, E, J, G, I, X;
    var x = i.length;
    while (x--) {
        N = i[x].x;
        O = i[x].y;
        P = i[x].z;
        T = V * O - H * P;
        U = H * O + V * P;
        J = W * U + L * N;
        E = -L * U + W * N;
        G = Y * E - M * T;
        I = M * E + Y * T;
        N = G + F.x;
        O = I + F.y;
        P = J + F.z;
        X = S / (S + P);
        N = N * X + y;
        O = -(O * X) + z;
        Q[x] = {
            x: N,
            y: O
        }
    }
    return Q
}

function drawPlane(c, d, j, a, b) {
    c.beginPath();
    c.moveTo(d.x, d.y);
    c.lineTo(j.x, j.y);
    c.lineTo(a.x, a.y);
    c.lineTo(b.x, b.y);
    c.closePath()
}

function isVisible(b, c, a) {
    if (((c.y - b.y) / (c.x - b.x) - (a.y - b.y) / (a.x - b.x) < 0) ^ (b.x <= c.x === b.x > a.x)) {
        return true
    } else {
        return false
    }
}

function mapTexture(k, l, p) {
    var m = 5,
        n = 64,
        s = getProjectiveTransform(l);
    var q = s.transformProjectiveVector([0, 0, 1]),
        t = s.transformProjectiveVector([1, 0, 1]),
        o = s.transformProjectiveVector([0, 1, 1]),
        r = s.transformProjectiveVector([1, 1, 1]);
    k.save();
    k.beginPath();
    k.moveTo(q[0], q[1]);
    k.lineTo(t[0], t[1]);
    k.lineTo(r[0], r[1]);
    k.lineTo(o[0], o[1]);
    k.closePath();
    k.clip();
    divide(0, 0, 1, 1, q, t, o, r, s, m, n, k, p);
    k.restore()
}

function divide(a, r, b, X, Y, Z, c, d, e, f, g, h, i) {
    var j = Math.abs,
        ar = Math.max,
        aM = Math.min,
        aC = Math.sqrt;
    if (f) {
        var k = [Z[0] + c[0] - 2 * Y[0], Z[1] + c[1] - 2 * Y[1]],
            ai = [Z[0] + c[0] - 2 * d[0], Z[1] + c[1] - 2 * d[1]],
            ak = [k[0] + ai[0], k[1] + ai[1]],
            ao = j((ak[0] * ak[0] + ak[1] * ak[1]) / (k[0] * ai[0] + k[1] * ai[1]));
        k = [Z[0] - Y[0] + d[0] - c[0], Z[1] - Y[1] + d[1] - c[1]];
        ai = [c[0] - Y[0] + d[0] - Z[0], c[1] - Y[1] + d[1] - Z[1]];
        var l = j(k[0] * ai[1] - k[1] * ai[0]);
        if ((a === 0 && b === 1) || ((0.25 + ao * 5) * l > (g * g))) {
            var m = (a + b) / 2,
                ax = (r + X) / 2,
                aS = e.transformProjectiveVector([m, ax, 1]),
                aK = e.transformProjectiveVector([m, r, 1]),
                aA = e.transformProjectiveVector([m, X, 1]),
                aD = e.transformProjectiveVector([a, ax, 1]),
                aJ = e.transformProjectiveVector([b, ax, 1]);
            --f;
            divide(a, r, m, ax, Y, aK, aD, aS, e, f, g, h, i);
            divide(m, r, b, ax, aK, Z, aS, aJ, e, f, g, h, i);
            divide(a, ax, m, X, aD, aS, c, aA, e, f, g, h, i);
            divide(m, ax, b, X, aS, aJ, aA, d, e, f, g, h, i);
            return
        }
    }
    h.save();
    var n = [Z[0] - Y[0], Z[1] - Y[1]],
        av = [d[0] - Z[0], d[1] - Z[1]],
        ab = [c[0] - d[0], c[1] - d[1]],
        aI = [Y[0] - c[0], Y[1] - c[1]];
    var o = j(n[0] * aI[1] - n[1] * aI[0]),
        am = j(av[0] * n[1] - av[1] * n[0]),
        ap = j(ab[0] * av[1] - ab[1] * av[0]),
        an = j(aI[0] * ab[1] - aI[1] * ab[0]),
        aF = ar(ar(o, am), ar(an, ap)),
        aP = 0,
        aR = 0,
        ah = 0,
        aj = 0;
    switch (aF) {
        case o:
            h.transform(n[0], n[1], -aI[0], -aI[1], Y[0], Y[1]);
            if (b !== 1) {
                ah = 1.5 / aC(n[0] * n[0] + n[1] * n[1])
            }
            if (X !== 1) {
                aj = 1.5 / aC(aI[0] * aI[0] + aI[1] * aI[1])
            }
            break;
        case am:
            h.transform(n[0], n[1], av[0], av[1], Z[0], Z[1]);
            if (b !== 1) {
                ah = 1.5 / aC(n[0] * n[0] + n[1] * n[1])
            }
            if (X !== 1) {
                aj = 1.5 / aC(av[0] * av[0] + av[1] * av[1])
            }
            aP = -1;
            break;
        case ap:
            h.transform(-ab[0], -ab[1], av[0], av[1], d[0], d[1]);
            if (b !== 1) {
                ah = 1.5 / aC(ab[0] * ab[0] + ab[1] * ab[1])
            }
            if (X !== 1) {
                aj = 1.5 / aC(av[0] * av[0] + av[1] * av[1])
            }
            aP = -1;
            aR = -1;
            break;
        case an:
            h.transform(-ab[0], -ab[1], -aI[0], -aI[1], c[0], c[1]);
            if (b !== 1) {
                ah = 1.5 / aC(ab[0] * ab[0] + ab[1] * ab[1])
            }
            if (X !== 1) {
                aj = 1.5 / aC(aI[0] * aI[0] + aI[1] * aI[1])
            }
            aR = -1;
            break
    }
    var p = (b - a),
        aO = (X - r),
        ae = ah * p,
        af = aj * aO;
    var q = i.width,
        au = i.height;
    h.drawImage(i, a * q, r * au, aM(b - a + ae, 1) * q, aM(X - r + af, 1) * au, aP, aR, 1 + ah, 1 + aj);
    h.restore()
}

function getProjectiveTransform(e) {
    var h = new Matrix(9, 8, [
        [1, 1, 1, 0, 0, 0, -e[3].x, -e[3].x, -e[3].x],
        [0, 1, 1, 0, 0, 0, 0, -e[2].x, -e[2].x],
        [1, 0, 1, 0, 0, 0, -e[1].x, 0, -e[1].x],
        [0, 0, 1, 0, 0, 0, 0, 0, -e[0].x],
        [0, 0, 0, -1, -1, -1, e[3].y, e[3].y, e[3].y],
        [0, 0, 0, 0, -1, -1, 0, e[2].y, e[2].y],
        [0, 0, 0, -1, 0, -1, e[1].y, 0, e[1].y],
        [0, 0, 0, 0, 0, -1, 0, 0, e[0].y]
    ]);
    var g = h.rowEchelon().values;
    var f = new Matrix(3, 3, [
        [-g[0][8], -g[1][8], -g[2][8]],
        [-g[3][8], -g[4][8], -g[5][8]],
        [-g[6][8], -g[7][8], 1]
    ]);
    return f
}
var Matrix = function(e, f, d) {
    this.w = e;
    this.h = f;
    this.values = d || Matrix.allocate(f)
};
Matrix.allocate = function(g, h) {
    var f = [],
        i = h,
        j = g;
    while (i--) {
        f[i] = [];
        while (j--) {
            f[i][j] = 0
        }
    }
    return f
};
Matrix.cloneValues = function(e) {
    var f = [],
        d = e.length;
    while (d--) {
        f[d] = [].concat(e[d])
    }
    return f
};
Matrix.prototype.transformProjectiveVector = function(f) {
    var j = [];
    for (var h = 0; h < this.h; ++h) {
        j[h] = 0;
        for (var g = 0; g < this.w; ++g) {
            j[h] += this.values[h][g] * f[g]
        }
    }
    var i = 1 / (j[j.length - 1]);
    for (var h = 0; h < this.h; ++h) {
        j[h] *= i
    }
    return j
};
Matrix.prototype.rowEchelon = function() {
    if (this.w <= this.h) {
        throw "Matrix rowEchelon size mismatch"
    }
    var k = Matrix.cloneValues(this.values);
    for (var r = 0; r < this.h; ++r) {
        var m = k[r][r];
        while (m == 0) {
            for (var l = r + 1; l < this.h; ++l) {
                if (k[l][r] != 0) {
                    var j = k[l];
                    k[l] = k[r];
                    k[r] = j;
                    break
                }
            }
            if (l == this.h) {
                return new Matrix(this.w, this.h, k)
            } else {
                m = k[r][r]
            }
        }
        var q = 1 / m;
        for (var n = r; n < this.w; ++n) {
            k[r][n] *= q
        }
        for (var o = 0; o < this.h; ++o) {
            if (o == r) {
                continue
            }
            var p = k[o][r];
            k[o][r] = 0;
            for (var n = r + 1; n < this.w; ++n) {
                k[o][n] -= p * k[r][n]
            }
        }
    }
    return new Matrix(this.w, this.h, k)
};
