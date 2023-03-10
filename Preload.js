import {$ as e, u as t, v as i, x as a, c as n, y as r, W as o, C as s, S as l, A as d, B as c, P as h, D as m, E as u, F as p, G as f, H as v, I as g, J as y, K as w, a as b, L as S, M as T, N as E, O as x, R as k, Q as C, _ as P, U as A, V as _, X as j, Y as B, w as L, Z as O, a0 as R, a1 as I, a2 as F, a3 as W, a4 as D, a5 as H, a6 as U, a7 as z, a8 as N, a9 as X, aa as G, ab as V, ac as q, ad as Y, ae as K, af as Z, ag as J, ah as Q, ai as $, aj as ee, ak as te, al as ie, am as ae, an as ne, ao as re, ap as oe, aq as se, ar as le, as as de, at as ce, au as he, r as me, av as ue} from "./vendor.js";

class pe {

    constructor(n) {
        var {scene: r, sceneInstance: o, renderer: s, endSession: l} = n;
        this.endSession = l,
        this.engine = n,
        this.gui = e("#".concat(t)),
        this.hitSearch = e("#hud-searching-hittest"),
        this.scene = r,
        this.renderer = s,
        this.sceneInstance = o,
        e.on("#".concat(i), "click", this.onExitButtonClick.bind(this)),
        a(this),
        this.animToggler = e("#toggle-animation-button")
    }

    setCamera(t) {
        this.cameraAccess = t,
        t ? e.show(this.recordVideoButton) : e.hide(this.recordVideoButton)
    }

    showAnimToggler(t) {
        this.animToggler && (this.animToggler.classList.remove("play"),
        e.show(this.animToggler),
        this.animTogglerInit || (this.animTogglerInit = !0,
        this.eventListener = ()=>{
            this.animToggler.classList.toggle("play"),
            t()
        }
        ,
        e.on(this.animToggler, "click", this.eventListener)))
    }

    hideAnimToggler() {
        e.hide(this.animToggler)
    }

    addSession(e) {
        this.session = e
    }

    show() {
        e.show(this.gui)
    }

    hide() {
        e.hide(this.gui)
    }

    onExitButtonClick() {
        var t = this;
        return n((function*() {
            if (t.session)
                try {
                    yield t.session.end()
                } catch (e) {
                    t.hide()
                }
            else
                yield t.endSession();
            e.off(t.animToggler, "click", t.eventListener),
            t.sceneInstance && t.sceneInstance.exit && t.sceneInstance.exit(t),
            r()
        }
        ))()
    }

    showHitSearch() {
        e.show(this.hitSearch)
    }

    hideHitSearch() {
        e.hide(this.hitSearch)
    }

    showElement(t) {
        t.shown || (e.show(t),
        t.shown = !0)
    }

    hideElement(t) {
        t.shown && (e.hide(t),
        t.shown = !1)
    }

}

var fe = o.APP_DB.SCENE_TYPES;

class ve {

    constructor(e) {
        var {artifact: t, preload: i, XR: a} = e;
        this.XR = a,
        this.artifact = t,
        this.preload = i;
        var {type: n=fe.Hit} = t;
        this.type = n,
        this.clock = new s,
        this.scene = new l,
        this.customMaterials = [],
        this.spatialObjects = [],
        this.lookAtCameraObjects = [],
        this.animateObjects = [],
        this.audioAnalysers = [],
        this.audioAnalyserEmissionConfigs = [],
        this.circlingLights = [],
        this.customObjects = [],
        this.videoTargets = [],
        this.audioRamps = {},
        this.animationListeners = [],
        this.materialFadeAnimations = [],
        this.eventsToRemove = [],
        this.renderSteps = [],
        this.onResize = this.onResize.bind(this),
        this.render = this.render.bind(this),
        this.initFallbackSession = this.initFallbackSession.bind(this),
        this.toggleAnimations = this.toggleAnimations.bind(this),
        this.endSession = this.endSession.bind(this)
    }

    init(t) {
        var i = this;
        return n((function*() {
            var a, {artifact: r, preload: s, scene: l, type: g, XR: y} = i;
            t && (i.sceneInstance = t);
            var {fov: w, near: b, far: S} = d(r.cam, c)
              , T = o.innerWidth / o.innerHeight;
            i.camera = new h(w,T,b,S),
            i.camera.updateProjectionMatrix(),
            l.add(i.camera);
            var E = new m({
                antialias: !0,
                alpha: !0
            });
            i.renderer = E,
            E.setPixelRatio(o.devicePixelRatio),
            E.domElement.id = u,
            E.physicallyCorrectLights = !0,
            E.outputEncoding = p,
            E.toneMappingExposure = 1;
            var {audio: x, circlingLights: k, clickables: C, customMaterials: P, wireframes: A, customObjects: _, hideLight: j, ocean: M, particles: B, shadow: L, spatialAudio: O, triggerVideo: R, underwater: I} = r;
            !1 !== L && (E.shadowMap.enabled = !0,
            E.shadowMap.type = f),
            i.hud = new pe(i);
            var F = null === (a = i.artifact.animateObjects) || void 0 === a ? void 0 : a.some((e=>e.sound));
            if ((x || O || F) && i.addAudio(),
            i.addSkybox(),
            j || i.addLights(),
            i.videoElement = s.assets.videoElement,
            null != t && t.init && (console.warn("`CustomScene.init` is deprecated", "and will be removed in a future version. use `CustomScene.beforeLoadModel` instead."),
            yield t.init({
                engine: i,
                preload: s
            })),
            null != t && t.beforeLoadModel && t.beforeLoadModel({
                engine: i,
                preload: s
            }),
            yield i.loadModel(),
            null != t && t.afterLoadModel && t.afterLoadModel({
                engine: i,
                preload: s
            }),
            null != k && k.length) {
                var {CirclingLights: W} = yield import("./vendor.js").then((function(e) {
                    return e.b5
                }
                ))
                  , D = new W(i);
                i.renderSteps.push(D.render.bind(D))
            }
            if (P) {
                var {addCustomMaterials: H, renderCustomMaterials: U} = yield import("./vendor.js").then((function(e) {
                    return e.b6
                }
                ));
                yield H(i),
                i.renderSteps.push(U)
            }
            if (_ && (yield i.addCustomObjects()),
            A && A.forEach((e=>{
                var t = i.model.getObjectByName(e.target);
                t && t.material && (t.material.wireframe = !0,
                e.transparent && (t.material.transparent = !0,
                t.material.opacity = e.opacity))
            }
            )),
            R) {
                var {addVideoTrigger: z, renderVideoTrigger: N} = yield import("./vendor.js").then((function(e) {
                    return e.b7
                }
                ));
                z(i),
                i.renderSteps.push(N)
            }
            if (I && (yield i.underwaterPlane()),
            M) {
                var {OceanPlane: X} = yield import("./vendor.js").then((function(e) {
                    return e.b8
                }
                ))
                  , G = new X(i);
                yield G.init(i),
                i.renderSteps.push(G.render)
            }
            if (B) {
                var {Particles: V} = yield import("./vendor.js").then((function(e) {
                    return e.b9
                }
                ));
                i.particles = new V(i),
                yield i.particles.init()
            }
            if (E.setSize(o.innerWidth, o.innerHeight),
            e.append(E.domElement, "#".concat(v)),
            y)
                try {
                    var q = E.xr.getController(0);
                    i.controller = q;
                    var {clickable: Y, shadow: K, shadowPlane: Z} = r;
                    if (!1 !== K && !1 !== Z && i.addShadowPlane(),
                    !i.isHittestScene())
                        throw new Error("Unknown scene type ".concat(g));
                    g !== fe.Float && i.spawnReticle(),
                    e.on(q, "select", (()=>{
                        if (!i.justUnspawned) {
                            i.spawnModel(!1),
                            Y ? i.hud.showAnimToggler(i.toggleAnimations) : i.hud.hideAnimToggler()
                        }
                    }
                    )),
                    Y || i.hud.hideAnimToggler(),
                    l.add(q),
                    i.initScene = n((function*() {
                        var t;
                        return e.hide("#Locator"),
                        t = yield o.NAV.xr.requestSession("immersive-ar", {
                            requiredFeatures: ["hit-test", "dom-overlay"],
                            domOverlay: {
                                root: e("#hud")
                            }
                        }),
                        e.on(t, "end", (()=>{
                            i.endSession()
                        }
                        )),
                        i.hud.addSession(t),
                        i.refSpace = yield t.requestReferenceSpace("viewer"),
                        i.renderer.xr.enabled = !0,
                        i.renderer.xr.setReferenceSpaceType("local"),
                        yield i.renderer.xr.setSession(t),
                        t.initFallbackSession = i.initFallbackSession.bind(i),
                        t
                    }
                    ))
                } catch (e) {
                    i.initScene = i.initFallbackSession
                }
            else
                i.initScene = i.initFallbackSession;
            return null != C && C.length && (yield i.addClickables()),
            e.on(o, "resize", i.onResize),
            i.onResize(),
            E.setAnimationLoop(i.render),
            i
        }
        ))()
    }

    onResize() {
        var {innerWidth: e, innerHeight: t} = o;
        this.camera.aspect = e / t,
        this.camera.updateProjectionMatrix(),
        this.renderer.setSize(e, t)
    }

    addLights() {
        var {directionalLightPosition: e=y.directionalPosition} = this.artifact
          , t = new g(y.directionalColor,y.directionalIntensity);
        t.position.set(...e),
        t.castShadow = !0,
        !1 !== this.artifact.shadow && (t.shadow.bias = -1e-4,
        t.shadow.mapSize.width = 512,
        t.shadow.mapSize.height = 512,
        t.shadow.camera.near = .1,
        t.shadow.camera.far = 300),
        this.directionalLight = t,
        this.scene.add(t),
        this.ambientLight = new w(y.ambientColor,y.ambientIntensity),
        this.scene.add(this.ambientLight)
    }

    addCustomObjects() {
        var {artifact: e} = this
          , {customObjects: t} = e;
        t.forEach((e=>{
            var {config: t, object: i} = e
              , a = this.model.getObjectByName(t.target);
            a && (i.child ? a.add(i.child) : i.model && (a.parent.add(i.model),
            a.parent.remove(a)),
            this.customObjects.push({
                config: t,
                object: i
            }),
            b.fn(i.init) && i.init({
                engine: this
            }))
        }
        ))
    }

    addShadowPlane() {
        var e = new S(150,150,64,64)
          , t = new T;
        t.opacity = E;
        var i = new x(e,t);
        i.receiveShadow = !0,
        i.lookAt(0, 100, 0),
        i.position.set(0, .01, 0),
        this.shadowPlane = i
    }

    spawnReticle() {
        var e = new k(.15,.2,32).rotateX(-M.PI / 2)
          , t = new C;
        this.reticle = new x(e,t),
        this.reticle.matrixAutoUpdate = !1,
        this.reticle.visible = !1,
        this.scene.add(this.reticle)
    }

    onAnimationLoop(e, t) {
        var i = e.action._clip.name;
        t.forEach((e=>{
            if (!this.materialFadeAnimations.includes((e=>e.action._clip.name === i))) {
                var t = this.findEventTargets(e);
                this.materialFadeAnimations.push(P(P({}, e), {}, {
                    targets: t
                }))
            }
        }
        ))
    }

    onAnimationFinished(e, t) {
        var i = e.action._clip.name;
        t.forEach((e=>{
            if (!this.materialFadeAnimations.includes((e=>e.action._clip.name === i))) {
                var t = this.findEventTargets(e);
                this.materialFadeAnimations.push(P(P({}, e), {}, {
                    targets: t
                }))
            }
        }
        ))
    }

    glow() {
        var {glow: e} = this.artifact;
        this.model.traverse((t=>{
            if (A(t.name, "glow")) {
                var i = b.bool(e) ? 238 : e
                  , a = new C({
                    color: i,
                    side: _,
                    blending: j,
                    transparent: !0
                });
                t.material = a
            }
        }
        ))
    }

    addClickables() {
        var t = this;
        return n((function*() {
            var {artifact: i, model: a} = t
              , {clickables: n=[]} = i
              , r = [];
            if (!0 === n ? r.push(t.model) : n.length && a.traverse((e=>{
                n.forEach((i=>{
                    if (b.str(i) && (i = {
                        target: i
                    }),
                    B({
                        node: e,
                        search: i.target
                    })) {
                        var a;
                        i.node = e,
                        i.hide && (e.material.transparent = !0,
                        e.material.opacity = 0);
                        var n = !0 === i.audio ? e.name : i.audio;
                        null !== (a = t.preload.assets.audioElements) && void 0 !== a && a.length && (i.player = t.preload.assets.audioElements.find((e=>e.dataset.name === n))),
                        r.includes(i) || r.push(i)
                    }
                }
                ))
            }
            )),
            r.length) {
                var {Controls: o} = yield import("./Controls.js");
                t.controls = new o({
                    clickables: r,
                    engine: t
                }),
                t.controller ? e.on(t.controller, "select", t.controls.select, !1) : e.on(t.renderer.domElement, "mousedown", t.controls.click, !1)
            }
        }
        ))()
    }

    onTouch(t) {
        var i = this;
        return n((function*() {
            var a;
            null !== (a = i.sceneInstance) && void 0 !== a && a.onTouch && (yield i.sceneInstance.onTouch(t)),
            t.forEach(((t,a)=>{
                if (!(a + 1 > i.artifact.maxTouches)) {
                    var {emission: n, emissionIntensity: r=.2, link: o, player: s} = t;
                    if (o && (L ? window.location.href = o : window.open(o, "_hacked")),
                    s && (s.loop ? s.paused ? s.play() : (s.currentTime = 0,
                    s.pause()) : (s.currentTime = 0,
                    s.play())),
                    n) {
                        var l = t.node.name.split("_")[0]
                          , d = i.model.getObjectByName(l);
                        if (!d)
                            return void console.warn("node not found", l);
                        ("Group" === d.type ? d.children : [d]).forEach((i=>{
                            if (i) {
                                if (i.userData.origEmissive || (i.userData.origEmissive = i.material.emissive),
                                i.userData.origEmissiveIntensity || (i.userData.origEmissiveIntensity = i.material.emissiveIntensity),
                                s || console.warn("player not found", t.node.name),
                                s)
                                    if (O.same(i.material.emissive, i.userData.origEmissive)) {
                                        var a = new R(1,1,1);
                                        b.bool(n) ? i.material.color && (a = i.material.color) : b.arr(n) && (a = new R(...n)),
                                        i.material.emissive = a,
                                        i.material.emissiveIntensity = r,
                                        s.loop || e.on(s, "ended", (()=>{
                                            i.material.emissive = i.userData.origEmissive,
                                            i.material.emissiveIntensity = i.userData.origEmissiveIntensity
                                        }
                                        ))
                                    } else
                                        s.loop && (i.material.emissive = i.userData.origEmissive,
                                        i.material.emissiveIntensity = i.userData.origEmissiveIntensity)
                            } else
                                console.warn("node not found", l)
                        }
                        ))
                    }
                }
            }
            ))
        }
        ))()
    }

    nosort() {
        this.renderer.sortObjects = !1
    }

    clip() {
        var {model: e, artifact: t} = this
          , {clipSide: i, clipInFallback: a} = t;
        e.traverse((e=>{
            if (A(e.name, "clip"))
                if (this.XR || !1 !== a) {
                    var t = _;
                    "back" === i ? t = W : "front" === i && (t = J),
                    e.material = new C({
                        color: "green",
                        colorWrite: !1,
                        side: t
                    }),
                    e.castShadow = !1,
                    e.receiveShadow = !1,
                    e.renderOrder = 1
                } else
                    e.visible = !1;
            else
                e.renderOrder = 2
        }
        ))
    }

    underwaterPlane() {
        var e = this;
        return n((function*() {
            var {UnderwaterPlane: t} = yield import("./vendor.js").then((function(e) {
                return e.ba
            }
            ));
            e.cameraPlane = new t,
            yield e.cameraPlane.preload(e)
        }
        ))()
    }

    addSkybox() {
        var e = this;
        return n((function*() {
            var {artifact: t, preload: i, renderer: a, scene: n, XR: r} = e
              , o = Q
              , s = null == t ? void 0 : t.skySphere;
            b.arr(s) && s.length && (o = s);
            var l = new I(...o)
              , d = i.assets.skybox
              , c = new F(a);
            c.compileEquirectangularShader();
            var h = c.fromEquirectangular(d).texture;
            c.dispose();
            var m = new C({
                map: d,
                side: W
            })
              , u = new x(l,m);
            u.rotation.y = D.degToRad(180),
            u.visible = !r,
            n.add(u),
            !1 === t.light || t.hideEnvironment || (n.environment = h),
            e.skybox = u
        }
        ))()
    }

    addAudio() {
        this.listener = new H,
        this.camera.add(this.listener)
    }

    startMedia() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        if (!this.isMediaPlaying) {
            var {actions: t=[], artifact: i, preload: a} = this
              , {audioElement: n, videoElement: r, audioElements: o=[]} = a.assets;
            i.triggerAudio || (n && (e && (n.currentTime = 0),
            n.play()),
            null != o && o.length && o.forEach((t=>{
                t.autoplay && (e && (t.currentTime = 0),
                t.play())
            }
            ))),
            r && !i.triggerVideo && (e && (r.currentTime = 0),
            r.play()),
            t.forEach((e=>e.play())),
            this.isMediaPlaying = !0
        }
    }

    stopMedia() {
        var {audioElement: e, preload: t, videoElement: i, actions: a=[], audioElements: n=[]} = this;
        e && e.pause(),
        i && i.pause(),
        t.hls && t.hls.destroy(),
        a && a.length && a.forEach((e=>e.stop())),
        n.forEach((e=>e.pause())),
        this.isMediaPlaying = !1
    }

    toggleAnimations() {
        this.actions.forEach((e=>e.paused = !e.paused))
    }

    initFallbackSession() {
        this.XR = !1,
        o.B.classList.add(U);
        var {camera: e, artifact: t, model: i, renderer: a} = this
          , n = new z(e,a.domElement);
        this.controller = n,
        this.skybox.visible = !0,
        Object.entries(N).forEach((e=>{
            var [t,i] = e;
            n[t] = i
        }
        ));
        var {cam: r={}, orbit: s={}, clickable: l} = t;
        b.num(s.min) && (n.minDistance = s.min),
        b.num(s.max) && (n.maxDistance = s.max),
        b.num(r.maxPolar) && (n.maxPolarAngle = D.degToRad(r.maxPolar)),
        b.num(r.minPolar) && (n.minPolarAngle = D.degToRad(r.minPolar)),
        l ? this.hud.showAnimToggler(this.toggleAnimations) : this.hud.hideAnimToggler();
        var {cam: d={}} = t
          , c = $
          , {x: h=c.x, y: m=c.y, z: u=c.z} = d;
        e.position.set(h, m, u);
        var {lookat: p={}} = t
          , {x: f=0, y: v=0, z: g=0} = p;
        if (n.target = new X(f,v,g),
        i) {
            var {x: y, y: w, z: S} = i.scale
              , {scale: T} = t;
            T && i.scale.set(y * T, w * T, S * T)
        }
        n.update();
        this.spawnModel(!0),
        a.domElement.focus()
    }

    loadModel() {
        var t = this;
        return n((function*() {
            var i, a, r, {artifact: o, preload: s, sceneInstance: l={}} = t, {spatialObjects: d=[], audioElements: c=[]} = o;
            if (t.spatials = [...d, ...c],
            null != l && l.model ? t.model = l.model : null !== (i = s.assets.gltf) && void 0 !== i && i.scene && (t.model = s.assets.gltf.scene),
            o.ply) {
                var {addPly: h} = yield import("./vendor.js").then((function(e) {
                    return e.bb
                }
                ));
                h(t)
            }
            if (null != l && l.animations ? t.animations = l.animations : null !== (a = s.assets.gltf) && void 0 !== a && a.animations && (t.animations = s.assets.gltf.animations),
            t.actions = [],
            null !== (r = t.animations) && void 0 !== r && r.length) {
                var m;
                t.mixer = new G(t.model);
                var {animations: u={}} = o
                  , {loop: f, startOnTouch: v, clampWhenFinished: g=!0, autoplay: y=!0, noLoopAnimations: w=[], pausedAnimations: b=[]} = u;
                if (t.animations.forEach((e=>{
                    var i = t.mixer.clipAction(e)
                      , a = b.includes(e.name)
                      , n = v || !y || a;
                    (!1 === f || w.includes(e.name)) && (i.clampWhenFinished = g,
                    i.loop = V),
                    n && (i.paused = !0),
                    t.actions.push(i)
                }
                )),
                null !== (m = t.artifact.events) && void 0 !== m && m.animation) {
                    var {events: S} = t.artifact
                      , {times: T=[], loop: E=[], finished: x=[]} = null == S ? void 0 : S.animation;
                    if (E.length) {
                        var k = [t.mixer, "loop", e=>t.onAnimationLoop(e, E)];
                        e.on(...k),
                        k.targets = t.findEventTargets(E),
                        t.eventsToRemove.push(k)
                    }
                    if (x.length) {
                        var C = [t.mixer, "finished", e=>t.onAnimationFinished(e, x)];
                        e.on(...C),
                        C.targets = t.findEventTargets(x),
                        t.eventsToRemove.push(C)
                    }
                    if (T.length) {
                        var {times: _} = t.artifact.events.animation;
                        _.length && _.forEach((e=>{
                            var {action: i, once: a=!1, targets: n} = e
                              , r = q.findByName(t.animations, i)
                              , o = t.findEventTargets(e);
                            t.animationListeners.push(P(P({}, e), {}, {
                                once: a,
                                action: r,
                                targets: o
                            }))
                        }
                        ))
                    }
                }
            }
            if (t.model) {
                var j, M, B = {};
                if (t.model.traverse((e=>{
                    if (l.parentName && l.child && A(e.name, l.parentName) && (M = e),
                    t.customObjects.forEach((t=>{
                        var {object: i} = t;
                        i.parentName && i.child && A(e.name, i.parentName) && (B[i.name] = e)
                    }
                    )),
                    e.isMesh) {
                        var {frustumCulled: i, transparent: a, castShadow: n, receiveShadow: r} = o;
                        !1 === i && (e.frustumCulled = !1),
                        !1 === a && (e.material.transparent = !1),
                        A(e.name, "noshadow") || (e.castShadow = !1 !== n,
                        e.receiveShadow = !1 !== r),
                        A(e.name, "videotarget") && t.videoTargets.push(e),
                        e.material.map && (e.material.map.anisotropy = 16,
                        e.material.map.encoding = p),
                        e.material.emissiveMap && (e.material.emissiveMap.encoding = p),
                        (e.material.map || e.material.emissiveMap) && (e.material.needsUpdate = !0)
                    }
                    var s = [];
                    o.animateObjects && o.animateObjects.forEach((i=>{
                        if (A(e.name, i.name)) {
                            var a = q.findByName(t.animations, e.name);
                            if (i.sound) {
                                !0 === i.sound && (i.sound = {
                                    name: t.artifact.slug
                                }),
                                i.sound.name || (i.sound.name = t.artifact.slug);
                                var n = t.preload.assets.animateObjects[i.sound.name];
                                if (n) {
                                    var r = new Y(t.listener);
                                    r.setBuffer(n);
                                    var {loopSound: o=!0} = i;
                                    if (r.setLoop(o),
                                    i.audio = r,
                                    i.sound.distance) {
                                        var l = !1 !== i.sound.yDistanceTest;
                                        s.push({
                                            buffer: r,
                                            distance: i.sound.distance,
                                            distanceTarget: e.name,
                                            target: e.name,
                                            yDistanceTest: l
                                        })
                                    }
                                } else
                                    console.error("animateObjects: Sound not found in preload.assets", i)
                            }
                            t.animateObjects.push(P(P({}, i), {}, {
                                action: a,
                                node: e
                            }))
                        }
                    }
                    )),
                    t.spatials = [...t.spatials, ...s]
                }
                )),
                t.spatials.length) {
                    var {SpatialObjects: L} = yield import("./vendor.js").then((function(e) {
                        return e.bc
                    }
                    ))
                      , O = new L(t);
                    t.renderSteps.push(O.render.bind(O))
                }
                if (null !== (j = o.lookAtCameraObjects) && void 0 !== j && j.length) {
                    var {LookAtCamera: R} = yield import("./vendor.js").then((function(e) {
                        return e.bd
                    }
                    ))
                      , I = new R(t);
                    t.renderSteps.push(I.render.bind(I))
                }
                M && M.add(l.child),
                t.customObjects.forEach((e=>{
                    var {object: i} = e;
                    i.child ? B[i.name].add(i.child) : i.model && t.model.add(i.model)
                }
                )),
                t.videoElement && t.videoTargets.length && (yield Promise.all(t.videoTargets.map(function() {
                    var e = n((function*(e) {
                        var i = new ee(t.videoElement)
                          , {flipVideo: a, chromaKey: n} = o;
                        if (!1 !== a && (i.flipY = !1),
                        e.material.map = i,
                        n) {
                            var {ChromaKeyMaterial: r} = yield import("./materials/ChromaKeyMaterial.js");
                            e.material = new r(o.chromaKey,i)
                        }
                    }
                    ));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }())))
            }
            var {clip: F, glow: W, mirrors: D, nosort: H, clones: U} = t.artifact;
            if (W && t.glow(),
            t.model && F && t.clip(),
            H && t.nosort(),
            null != D && D.length) {
                var {mirror: z} = yield import("./vendor.js").then((function(e) {
                    return e.be
                }
                ));
                z(t)
            }
            if (t.artifact.analyseAudio) {
                var {AnalyseAudio: N} = yield import("./vendor.js").then((function(e) {
                    return e.bf
                }
                ))
                  , X = new N(t);
                t.renderSteps.push(X.render)
            }
            if (t.model)
                if (U) {
                    var {Clones: K} = yield import("./vendor.js").then((function(e) {
                        return e.bg
                    }
                    ));
                    t.clones = new K(t),
                    t.renderSteps.push(t.clones.render.bind(t.clones))
                } else
                    t.model.position.set(5e3, 5e3, 5e3),
                    t.scene.add(t.model)
        }
        ))()
    }

    findEventTargets(e) {
        var t = [];
        return this.model.traverse((i=>{
            B({
                node: i,
                search: e.targets
            }) && (i.material && (t.includes(i.material) || t.push(i.material)))
        }
        )),
        t
    }

    spawnModel(e) {
        var t, {artifact: i, camera: a, controller: n, model: r, reticle: o, scene: s, sceneInstance: l={}, shadowPlane: d, type: c, XR: h} = this, {showSkybox: m, floatSpawnAtZeroY: u=!1} = i;
        if (this.applyPositionAndRotation(),
        !h || e)
            r && (this.clones || r.position.set(0, 0, 0)),
            this.modelSpawned = !0;
        else if (this.isHittestScene()) {
            if (!this.modelSpawned && this.lastHit) {
                o.updateMatrixWorld(),
                r.position.setFromMatrixPosition(o.matrixWorld),
                r.updateMatrixWorld();
                var p = a.position
                  , f = r.position
                  , v = p.x - f.x
                  , g = p.z - f.z
                  , y = Math.atan2(v, g);
                r.rotation.y = y,
                d && (d.position.setFromMatrixPosition(o.matrixWorld),
                s.add(d)),
                this.clones || (r.visible = !0),
                o.visible = !1,
                this.modelSpawned = !0
            }
        } else if (c === fe.Float) {
            var w = r.clone();
            w.position.set(0, 0, -1).applyMatrix4(n.matrixWorld),
            u && (w.position.y = 0),
            s.add(w)
        }
        if (null != l && l.spawnModel && (console.warn("W_DEPRECATED: sceneInstance.spawnModel is deprecated. Please use sceneInstance.afterSpawnModel instead."),
        l.spawnModel({
            engine: this
        })),
        null != l && l.afterSpawnModel && l.afterSpawnModel({
            engine: this
        }),
        this.startMedia(),
        m && (this.skybox.visible = !0),
        null !== (t = this.preload.gui) && void 0 !== t && t.afterSpawnModel) {
            var {afterSpawnModel: S} = this.preload.gui;
            S.style.visibility = "visible",
            S.style.opacity = 1,
            setTimeout((()=>{
                var e;
                b.fn(null === (e = S.parentNode) || void 0 === e ? void 0 : e.removeChild) && S.parentNode.removeChild(S)
            }
            ), 8e3)
        }
    }

    unspawnModel() {
        var t;
        this.modelSpawned && (this.scene.remove(this.model),
        this.modelSpawned = !1,
        this.isAnimationRunning = !1,
        this.stopMedia(),
        this.exitSceneInstance(),
        this.justUnspawned = !0,
        null !== (t = this.eventsToRemove) && void 0 !== t && t.length && this.eventsToRemove.forEach((t=>{
            e.off(...t)
        }
        )),
        setTimeout((()=>{
            this.justUnspawned = !1
        }
        ), 200))
    }

    exitSceneInstance() {
        var e;
        this.customObjects.forEach((e=>{
            var {object: t} = e;
            b.fn(t.exit) && t.exit({
                engine: this
            })
        }
        )),
        this.customMaterials.forEach((e=>{
            var {material: t} = e;
            b.fn(t.exit) && t.exit({
                engine: this
            })
        }
        )),
        this.animateObjects.forEach((e=>{
            var t;
            null === (t = e.audio) || void 0 === t || t.stop()
        }
        )),
        null !== (e = this.sceneInstance) && void 0 !== e && e.exit && this.sceneInstance.exit({
            engine: this
        })
    }

    applyPositionAndRotation() {
        var {artifact: e, model: t} = this;
        if (t) {
            var {pos: i={}, rot: a={}} = e;
            i.x && (t.position.x += i.x),
            i.y && (t.position.y += i.y),
            i.z && (t.position.z += i.z);
            var n = D.degToRad;
            a.x && t.rotateX(n(a.x)),
            a.y && t.rotateY(n(a.y)),
            a.z && t.rotateZ(n(a.z))
        }
    }

    endSession() {
        var t = this;
        return n((function*() {
            var i;
            t.hud.hide(),
            t.renderer.setAnimationLoop(null),
            e("#".concat(v)).classList.remove("visible"),
            t.exitSceneInstance(),
            t.scene && K(t.scene),
            e.remove(".".concat(Z)),
            null !== (i = t.preload) && void 0 !== i && i.hls && t.preload.hls.destroy();
            var a = e("#".concat(u));
            if (a) {
                var n = a.parentNode;
                n.id === v ? e.remove(a) : e.remove(n)
            }
            o.B.classList.remove(U),
            e(".start-experience-button").forEach((e=>{
                e.removeAttribute("disabled")
            }
            )),
            L && o.location.reload()
        }
        ))()
    }

    isHittestScene() {
        return ![fe.Float].includes(this.type)
    }

    render(e, t) {
        var i = this;
        return n((function*() {
            var a, n, r, o, s, l = i.clock.getDelta();
            i.renderHittest(t),
            i.mixer && i.mixer.update(l);
            var d = {
                delta: l,
                timestamp: e,
                engine: i,
                frame: t
            };
            i.modelSpawned && i.renderSteps.forEach((e=>{
                e(d)
            }
            )),
            null !== (a = i.sceneInstance) && void 0 !== a && a.tick && i.sceneInstance.tick(d),
            null !== (n = i.artifact.ply) && void 0 !== n && n.animated && i.renderPlyMorphTargetInfluences(d),
            null !== (r = i.animateObjects) && void 0 !== r && r.length && i.renderAnimateObjects(d),
            i.cameraPlane && i.renderUnderwater(d),
            null !== (o = i.animationListeners) && void 0 !== o && o.length && i.renderAnimationTimeEvent(d),
            i.materialFadeAnimations.length && i.renderMaterialAnimTick(d),
            i.particles && i.particles.update(d),
            i.customObjects.length && i.renderCustomObjects(d),
            null !== (s = i.sceneInstance) && void 0 !== s && s.render ? i.sceneInstance.render(d) : i.renderer.render(i.scene, i.camera)
        }
        ))()
    }

    renderPlyMorphTargetInfluences(e) {
        var {delta: t, timestamp: i} = e;
        this.nextMorphTargetStep || (this.nextMorphTargetStep = i + this.morphTargetInfluenceConfig.delay);
        var a = this.animatedPoints
          , n = a.morphTargetInfluences.length - 1
          , r = t * this.morphTargetInfluenceConfig.speed;
        a.morphTargetInfluences = a.morphTargetInfluences.map(((e,t)=>{
            if (t === this.morphTargetTargetIndex) {
                var a = Math.min(e + r, 1);
                return a >= 1 && i > this.nextMorphTargetStep && (this.nextMorphTargetStep = i + this.morphTargetInfluenceConfig.delay,
                this.hasRun = !this.hasRun,
                this.hasRun || (this.morphTargetTargetIndex += 1,
                this.morphTargetTargetIndex > n && (this.morphTargetTargetIndex = 0))),
                a
            }
            return Math.max(e - r, 0)
        }
        ))
    }

    renderCustomObjects(e) {
        this.customObjects.forEach((t=>{
            var {object: i} = t;
            b.fn(i.tick) && i.tick(e)
        }
        ))
    }

    renderAnimateObjects(e) {
        var {timestamp: t} = e;
        this.animateObjects.forEach((e=>{
            var {action: i, audio: a, speed: n, minSpeed: r=0, maxDelay: o=2, minDelay: s=1} = e;
            if (i && i.paused && (e.nextAnimation || (e.nextAnimation = t + Math.random() * (1e3 * o) + 1e3 * s),
            a.isPlaying && a.stop(),
            e.nextAnimation <= t)) {
                e.nextAnimation = !1;
                var l = Math.random() > .5 ? 1 : -1
                  , d = Math.max(r, Math.random() * n) * l;
                i.timeScale = d,
                i.paused = !1,
                i.play(),
                a && !a.isPlaying && a.play()
            }
        }
        ))
    }

    renderHittest(t) {
        var i = this;
        return n((function*() {
            if (t && i.XR) {
                var a = i.renderer.xr.getSession();
                i.hitTestSourceRequested || (i.hitTestSource = yield a.requestHitTestSource({
                    space: i.refSpace
                }),
                e.on(a, "end", (()=>{
                    i.hitTestSourceRequested = !1,
                    i.hitTestSource = null
                }
                )),
                i.hitTestSourceRequested = !0);
                var n = t.getHitTestResults(i.hitTestSource);
                if (n.length) {
                    if (i.lastHit = n[0],
                    !i.modelSpawned) {
                        i.reticle.visible = !0;
                        var r = i.renderer.xr.getReferenceSpace();
                        i.reticle.matrix.fromArray(i.lastHit.getPose(r).transform.matrix)
                    }
                    i.hud.hideHitSearch()
                } else
                    i.reticle.visible = !1,
                    i.modelSpawned || i.hud.showHitSearch(),
                    i.lastHit = void 0
            }
        }
        ))()
    }

    renderAnimationTimeEvent() {
        this.animationListeners.forEach((e=>{
            var {time: t, action: i, once: a} = e
              , {time: n} = i;
            !e.hasTriggered && n >= t ? (e.hasTriggered = !0,
            this.materialFadeAnimations.push(e)) : n <= t && (a || (e.hasTriggered = !1))
        }
        ))
    }

    renderMaterialAnimTick(e) {
        var {delta: t} = e;
        this.materialFadeAnimations.forEach(((e,i)=>{
            if (e) {
                var {targets: a=[], speed: n=1, to: r=0, props: o} = e;
                a.forEach((e=>{
                    var a = b.arr(o) ? o : [o]
                      , s = !0;
                    a.map((i=>{
                        var a = e[i] + n * t;
                        n < 0 ? a <= r ? a = r : s = !1 : n > 0 && (a >= r ? a = r : s = !1),
                        e[i] = a
                    }
                    )),
                    s && this.materialFadeAnimations.splice(i, 1)
                }
                ))
            }
        }
        ))
    }
    
    renderUnderwater(e) {
        var {delta: t} = e;
        this.cameraPlane.tick(t)
    }
}

class Preload {

    constructor(t) {
        var {artifact: i, root: a, THREE: n} = t;
        this.artifact = i,
        this.root = a,
        n && (this.THREE = n);
        var {android: r, chrome: o} = me;
        this.isAndroidChrome = r && o,
        this._warningContainer = e("#timeout-warning"),
        this._header = e("#timeout-warning-header"),
        this._headerDone = e("#timeout-warning-header-done"),
        this._preloadInfo = e("#timeout-warning-info"),
        this._cancelButton = e("#timeout-warning-cancel"),
        this._confirmButton = e("#timeout-warning-confirm"),
        this._tooFarContainer = e("#toofar-warning"),
        this._tooFarPreviewButton = e("#toofar-warning-load-preview-button"),
        this._tooFarDistanceInfo = e("#toofar-warning-distance"),
        this._tooFarCancelButton = e("#toofar-warning-cancel-button"),
        this._tooFarAbortButton = e("#toofar-warning-abort-button"),
        this._webglDisabledContainer = e("#timeout-warning-webgl-disabled"),
        this._webglDisabledOkButton = e("#timeout-warning-webgl-disabled-ok-button"),
        this.confirmButtonClickHandler = this.confirmButtonClickHandler.bind(this),
        e.on(this._confirmButton, "click", this.confirmButtonClickHandler),
        this.onTooFarCancelButtonClick = this.onTooFarCancelButtonClick.bind(this),
        this.onTooFarPreviewButtonClick = this.onTooFarPreviewButtonClick.bind(this),
        this.onWebglDisabledOkButtonClick = this.onWebglDisabledOkButtonClick.bind(this),
        this.textureLoader = new te,
        this.gltfLoader = new ie,
        this.plyLoader = new ae,
        this.audioLoader = new ne,
        this.fontLoader = new re,
        this.audioElements = [],
        this.collectPreloadPromises(),
        this.startEngine = this.startEngine.bind(this)
    }

    collectPreloadPromises() {
        var e = {
            skybox: this.loadSkybox()
        }
          , {animateObjects: t, audio: i, audioElements: a, customMaterials: n, customObjects: r, examples: o, fonts: s, glb: l, gui: d, ply: c, textures: h, type: m, video: u} = this.artifact;
        if (a && (e.audioElements = this.loadAudioElements()),
        i && (e.audioElement = this.loadAudio()),
        oe(m) || (e.scene = this.loadScene()),
        !1 !== l && (e.gltf = this.loadGltf()),
        c && (e.ply = this.loadPly()),
        h && (e.textures = this.loadTextures()),
        u) {
            var {slug: p, video: f} = this.artifact;
            e.videoElement = this.loadVideo({
                slug: p,
                video: f
            })
        }
        s && (e.fonts = this.loadFonts()),
        o && (e.examples = this.loadExamples()),
        d && this.loadGui(),
        n && (e.customMaterials = this.loadCustomMaterials()),
        r && (e.customObjects = this.loadCustomObjects()),
        t && (e.animateObjects = this.loadAnimateObjects()),
        this.promises = e
    }

    init() {
        var t = arguments
          , i = this;
        return n((function*() {
            var a = t.length > 0 && void 0 !== t[0] ? t[0] : {}
              , {map: n, XR: r} = a;
            i._isWorking = !0,
            i._isCancelled = !1,
            i._session = !1,
            i.map = n,
            i.XR = r,
            e.on(i._cancelButton, "click", (()=>{
                i._isCancelled = !0,
                i.finished()
            }
            )),
            e.show([i._warningContainer, i._header]),
            i.timeout = o.setTimeout(i.showTimeoutWarning, se)
        }
        ))()
    }

    loadScene() {
        var t = this;
        return n((function*() {
            var {artifact: i} = t
              , a = APP_DB.SCENE_TYPES
              , {type: n=a.Hit} = i
              , r = Object.entries(a).find((e=>{
                var [t,i] = e;
                return i === n
            }
            ))
              , s = "".concat(t.root, "/CustomScene.js");
            if (b.arr(r)) {
                var l = r[0];
                s = "./scenes/".concat(l, ".js")
            }
            var {default: c} = yield import(s)
              , h = new c({
                artifact: i,
                mergeConfig: d,
                preload: t,
                $: e,
                W: o,
                is: b
            });
            return b.fn(null == h ? void 0 : h.preload) && (yield h.preload({
                artifact: i,
                preload: t
            })),
            h
        }
        ))()
    }

    loadSkybox() {
        var e = this;
        return n((function*() {
            var {city: t, sky: i, slug: a} = e.artifact
              , n = i || a
              , r = "jpg";
            o.SUPPORTS.WEBP && (r = "webp");
            var s = n;
            return n.startsWith("/") || (s = [o.STATIC_URL, "skybox", t, n].filter((e=>e)).join("/")),
            s.endsWith(".".concat(r)) || (s += ".".concat(r)),
            yield e.promisifiedLoad({
                loader: e.textureLoader,
                file: s
            })
        }
        ))()
    }

    loadFonts() {
        var e = this;
        return n((function*() {
            var {fonts: t} = e.artifact
              , i = {};
            return yield Promise.all(t.map(function() {
                var t = n((function*(t) {
                    var a = "https://static.artificialmuseum.com/font/json/".concat(t, ".typeface.json");
                    i[t] = yield e.promisifiedLoad({
                        loader: e.fontLoader,
                        file: a
                    })
                }
                ));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }())),
            i
        }
        ))()
    }

    loadAnimateObjects() {
        var e = this;
        return n((function*() {
            var {animateObjects: t, slug: i} = e.artifact
              , a = {}
              , r = e.audioLoader;
            return yield Promise.all(t.map(function() {
                var t = n((function*(t) {
                    if (t.sound) {
                        var {sound: n={}} = t;
                        if (!0 === n && (n = {
                            name: i
                        }),
                        n.name || (n.name = i),
                        !a[n.name]) {
                            var s = ".mp3";
                            o.SUPPORTS.A_MP4 ? s = ".mp4" : o.SUPPORTS.A_OGG && (s = ".ogg");
                            var l = "https://media.artificialmuseum.com/audio/".concat(n.name).concat(s);
                            a[n.name] = yield e.promisifiedLoad({
                                loader: r,
                                file: l
                            })
                        }
                    }
                }
                ));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }())),
            a
        }
        ))()
    }

    loadExamples() {
        var e = this;
        return n((function*() {
            var {examples: t} = e.artifact
              , i = {};
            if (t.TextGeometry) {
                var {TextGeometry: a} = yield import("./vendor.js").then((function(e) {
                    return e.bh
                }
                ));
                i.TextGeometry = a
            }
            return i
        }
        ))()
    }

    loadCustomMaterials() {
        var e = this;
        return n((function*() {
            var {artifact: t} = e
              , {customMaterials: i} = t;
            return Promise.all(i.map(function() {
                var i = n((function*(i) {
                    var {default: a} = yield import("./materials/".concat(i.name, ".js"))
                      , n = new a({
                        artifact: t,
                        config: i,
                        preload: e
                    });
                    return b.fn(n.preload) && (yield n.preload()),
                    {
                        config: i,
                        material: n
                    }
                }
                ));
                return function(e) {
                    return i.apply(this, arguments)
                }
            }()))
        }
        ))()
    }

    loadCustomObjects() {
        var e = this;
        return n((function*() {
            var {artifact: t} = e
              , {customObjects: i} = t;
            return Promise.all(i.map(function() {
                var i = n((function*(i) {
                    var {default: a} = yield import("./objects/".concat(i.name, ".js"))
                      , n = new a({
                        artifact: t,
                        config: i,
                        preload: e
                    });
                    return b.fn(n.preload) && (yield n.preload()),
                    n
                }
                ));
                return function(e) {
                    return i.apply(this, arguments)
                }
            }()))
        }
        ))()
    }

    loadVideo(t) {
        var i = this;
        return n((function*() {
            var {dir: a, slug: n, video: r, id: s=ue} = t
              , l = !0 === r ? n : r
              , d = e.create("video", {
                id: s,
                class: Z,
                loop: !0,
                playsinline: !0,
                preload: "auto",
                crossorigin: "anonymous"
            });
            i.videoElement = d;
            var c = ["webm", "mp4"]
              , h = b.str(l) ? l : n
              , m = h.endsWith("m3u8");
            if (m) {
                if ("" !== d.canPlayType("application/vnd.apple.mpegurl"))
                    return d.src = h,
                    e.append(d),
                    d;
                var u = e.create("script", {
                    src: "".concat(o.ROOT_URL, "/hls.js"),
                    parent: o.B
                });
                return new Promise((t=>{
                    e.on(u, "load", (()=>{
                        if (Hls.isSupported()) {
                            var a = i.hls = new o.Hls;
                            a.loadSource(h),
                            a.attachMedia(d),
                            e.append(d),
                            t(d)
                        }
                    }
                    ))
                }
                ))
            }
            if (h.startsWith("/") || h.startsWith("http") || (h.endsWith(".mp4") ? (c = ["mp4"],
            h = h.slice(0, -4)) : h = a ? "/video/".concat(a, "/").concat(h) : "/video/".concat(h, "/").concat(h)),
            h.endsWith(".mp4") && (c = ["mp4"],
            h = h.slice(0, -4)),
            h.startsWith("http") || (h = "".concat(o.MEDIA_URL).concat(h)),
            c.forEach((t=>{
                e.create("source", {
                    src: "".concat(h, ".").concat(t, "?v=").concat(le),
                    type: "video/".concat(t),
                    parent: d
                })
            }
            )),
            e.append(d),
            !m) {
                var {videoWidth: p} = d;
                if (p > 0)
                    return d;
                var f = "canplaythrough";
                return de && (f = "loadedmetadata"),
                new Promise((t=>{
                    e.on(d, f, (e=>{
                        de ? setTimeout((()=>{
                            t(e.target)
                        }
                        ), ce) : t(e.target)
                    }
                    ))
                }
                ))
            }
        }
        ))()
    }

    loadAudio() {
        var t = this;
        return n((function*() {
            var {slug: i, audio: a} = t.artifact;
            e.remove("#".concat(he));
            var n = e.create("audio", {
                class: Z,
                crossorigin: "anonymous",
                id: he,
                loop: !0,
                preload: "auto"
            });
            t.audioElement = n;
            var r = b.str(a) ? a : i;
            r.startsWith("/") || (r = "/audio/".concat(r));
            var s = ["ogg", "mp4", "mp3"];
            r.endsWith(".mp3") && (s = ["mp3"],
            r = r.slice(0, -4));
            var l = "".concat(o.MEDIA_URL).concat(r);
            s.forEach((t=>{
                e.create("source", {
                    src: "".concat(l, ".").concat(t, "?v=").concat(le),
                    type: "audio/".concat(t),
                    parent: n
                })
            }
            )),
            e.append(n);
            var {duration: d} = n;
            if (b.num(d) && d > 0)
                return n;
            var c = "canplaythrough";
            return de && (c = "loadedmetadata"),
            new Promise((t=>{
                e.on(n, c, (e=>t(e.target)))
            }
            ))
        }
        ))()
    }

    loadAudioElements() {
        var t = this;
        return n((function*() {
            var {audioElements: i, slug: a} = t.artifact;
            return yield Promise.all(i.map(function() {
                var i = n((function*(i, n) {
                    var r = i.audio || a
                      , s = "".concat(he, "-").concat(n);
                    e.remove("#".concat(s));
                    var l = e.create("audio", {
                        class: Z,
                        crossorigin: "anonymous",
                        "data-name": r,
                        preload: "auto",
                        id: s
                    });
                    !1 !== i.loop && (l.loop = "true"),
                    t.audioElements.push(l);
                    var d = "/audio/".concat(r)
                      , c = ["mp4", "ogg", "mp3"];
                    d.endsWith(".mp3") && (c = ["mp3"],
                    d = d.slice(0, -4));
                    var h = "".concat(o.MEDIA_URL).concat(d);
                    c.forEach((t=>{
                        e.create("source", {
                            src: "".concat(h, ".").concat(t, "?v=").concat(le),
                            type: "audio/".concat(t),
                            parent: l
                        })
                    }
                    )),
                    e.append(l);
                    var {duration: m} = l;
                    if (b.num(m) && m > 0)
                        return l;
                    var u = "canplaythrough";
                    return de && (u = "loadedmetadata"),
                    new Promise((t=>{
                        e.on(l, u, (e=>t(e.target)))
                    }
                    ))
                }
                ));
                return function(e, t) {
                    return i.apply(this, arguments)
                }
            }()))
        }
        ))()
    }

    loadTextures() {
        var e = this;
        return n((function*() {
            var {textures: t={}} = e.artifact
              , {dir: i, names: a} = t
              , n = "jpg";
            o.SUPPORTS.WEBP && (n = "webp"),
            i && !i.endsWith("/") && (i = "".concat(i, "/"));
            var r = {};
            return a.forEach((t=>{
                var a = t;
                i.startsWith("/") || (a = "https://static.artificialmuseum.com/textures/".concat(i, "/").concat(t)),
                a.endsWith(".jpg") || (a = "".concat(a, ".").concat(n));
                var o = e.promisifiedLoad({
                    loader: e.textureLoader,
                    file: a
                });
                r[slugged] = o
            }
            )),
            r
        }
        ))()
    }

    loadGltf() {
        var e = this;
        return n((function*() {
            var {artifact: t, XR: i} = e
              , {file: a, version: n=1} = t
              , r = i ? "&xr=1" : ""
              , s = "".concat(o.GLB_URL, "/").concat(a, ".glb?v=").concat(n).concat(r);
            return yield e.promisifiedLoad({
                loader: e.gltfLoader,
                file: s
            })
        }
        ))()
    }

    loadPly() {
        var e = this;
        return n((function*() {
            var t, {artifact: i, XR: a} = e, {file: r, ply: s={}, version: l=1} = i, d = a ? "&xr=1" : "", c = s.files;
            if (c && !b.arr(c) && (c = [c]),
            null !== (t = c) && void 0 !== t && t.length)
                return yield Promise.all(c.map(function() {
                    var t = n((function*(t, i) {
                        if (t)
                            return t = t.startsWith("/") ? "".concat(t, ".ply?v=").concat(l).concat(d) : "".concat(o.STATIC_URL, "/ply/").concat(t, ".ply?v=").concat(l).concat(d),
                            yield e.promisifiedLoad({
                                loader: e.plyLoader,
                                file: t
                            });
                        console.log("empty file", c, t, i)
                    }
                    ));
                    return function(e, i) {
                        return t.apply(this, arguments)
                    }
                }()));
            var h = r;
            s.file && (h = s.file);
            var m = "?v=".concat(l).concat(d)
              , u = h.endsWith(".ply") ? h : "".concat(h, ".ply");
            return h.startsWith("/") || (u = "".concat(o.STATIC_URL, "/ply/").concat(h, ".ply")),
            u += m,
            yield e.promisifiedLoad({
                loader: e.plyLoader,
                file: u
            })
        }
        ))()
    }

    loadGui() {
        var {title: t, button: i, body: a} = this.artifact.gui.afterSpawnModel
          , n = [];
        t && n.push(e.create("h3", {
            innerText: t
        })),
        a && n.push(e.create("div", {
            innerText: a
        })),
        n.length && (i && n.push(e.create("button", {
            id: "afterSpawnModelButton",
            class: "styled margin inverse",
            innerText: i,
            on: {
                click: e=>{
                    var t = e.target.parentNode;
                    t.parentNode.removeChild(t)
                }
            }
        })),
        this.gui = {
            afterSpawnModel: e.create("div", {
                class: "w hudgui",
                children: n,
                parent: "#hud"
            })
        })
    }

    promisifiedLoad(e) {
        var {loader: t, file: i} = e;
        return new Promise(((e,a)=>{
            t.load(i, (t=>{
                e(t)
            }
            ), (e=>{
                e.lengthComputable && (Math.ceil(e.loaded / e.total * 100),
                "".concat(e.loaded, "/").concat(e.total))
            }
            ), (e=>{
                this.setError(e, "Error loading artifact.", 5e3),
                a(e)
            }
            ))
        }
        ))
    }

    startEngine() {
        var t = this;
        return n((function*() {
            var {artifact: i, XR: a} = t
              , r = Object.entries(t.promises).map(function() {
                var e = n((function*(e) {
                    var [t,i] = e;
                    return [t, yield i]
                }
                ));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }())
              , o = yield Promise.all(r);
            t.assets = Object.fromEntries(o);
            var s = new ve({
                artifact: i,
                preload: t,
                XR: a
            })
              , l = yield s.init(t.assets.scene);
            if (!l)
                throw new Error("Session undefined.");
            e.hide(t._header),
            e.hide(t._preloadInfo),
            e.show(t._headerDone),
            t._session = l,
            t._timeoutShown && t.isAndroidChrome ? e.prop(t._confirmButton, {
                disabled: !1
            }) : t._isCancelled || (yield t.finishLoad())
        }
        ))()
    }

    showTimeoutWarning() {
        e.show(this._preloadInfo),
        this.isAndroidChrome && (e.show(this._confirmButton),
        this._confirmButton.setAttribute("disabled", !0),
        this._timeoutShown = !0)
    }

    confirmButtonClickHandler() {
        var t = this;
        return n((function*() {
            t._session ? (e.off(t._confirmButton, "click", t.confirmButtonClickHandler),
            yield t.finishLoad(),
            t.finished()) : console.error("confirmButtonClickHandler: session not defined", t)
        }
        ))()
    }

    finishLoad() {
        var t = this;
        return n((function*() {
            if (t._session) {
                var {hud: i, initFallbackSession: a, initScene: n} = t._session;
                try {
                    yield n(),
                    i.show(),
                    e.show("#".concat(v)),
                    t.finished()
                } catch (n) {
                    "InvalidStateError" === n.name || "NotSupportedError" === n.name ? (yield a(),
                    i.show(),
                    e.show("#".concat(v)),
                    t.finished()) : "SecurityError" === n.name ? (e.show(t._confirmButton),
                    e.prop(t._confirmButton, {
                        disabled: !1
                    })) : (console.error("Unexpected Preload.finishLoad error"),
                    console.error(n))
                }
            }
        }
        ))()
    }

    setError(e, t) {
        console.warn(e, t),
        o.clearTimeout(this.timeout),
        this.finished()
    }

    showTooFarNotification(t) {
        var {distance: i, artifact: a, map: n} = t
          , r = "meter"
          , o = i;
        o >= 1e3 ? (r = "kilometer",
        o >= 2e3 && (r += "s"),
        o = Math.round(o / 1e3)) : o >= 2 && (r += "s"),
        this.artifact = a,
        this.map = n,
        this.XR = !1,
        this._tooFarDistanceInfo.innerText = "This artifact is ".concat(o, " ").concat(r, " away."),
        e.show(this._tooFarContainer),
        e.on(this._tooFarPreviewButton, "click", this.onTooFarPreviewButtonClick),
        e.on(this._tooFarCancelButton, "click", this.onTooFarCancelButtonClick),
        e.on(this._tooFarAbortButton, "click", this.onTooFarCancelButtonClick)
    }

    onTooFarCancelButtonClick() {
        e.off(this._tooFarPreviewButton, "click", this.onTooFarPreviewButtonClick),
        this._isCancelled = !0,
        e.hide(this._tooFarContainer),
        this.finished()
    }

    onTooFarPreviewButtonClick() {
        var t = this;
        return n((function*() {
            e.off(t._tooFarPreviewButton, "click", t.onTooFarPreviewButtonClick),
            e.off(t._tooFarCancelButton, "click", t.onTooFarCancelButtonClick),
            e.off(t._tooFarAbortButton, "click", t.onTooFarCancelButtonClick),
            e.hide(t._tooFarContainer);
            var {artifact: i, map: a, XR: n} = t;
            yield t.init({
                artifact: i,
                map: a,
                XR: n
            }),
            yield t.startEngine()
        }
        ))()
    }

    showWebglDisabledNotification() {
        e.show(this._webglDisabledContainer),
        e.hide([this._header, this._headerDone, this._preloadInfo, this._cancelButton, this._confirmButton]),
        e.on(this._webglDisabledOkButton, "click", this.onWebglDisabledOkButtonClick)
    }

    onWebglDisabledOkButtonClick() {
        e.off(this._webglDisabledOkButton, "click", this.onWebglDisabledOkButtonClick),
        this._isCancelled = !0,
        e.hide(this._webglDisabledContainer),
        this.finished()
    }

    finished() {
        this._isWorking = !1,
        this._timeoutShown = !1,
        e(".start-experience-button").forEach((e=>{
            e.removeAttribute("disabled")
        }
        )),
        e.hide([this._warningContainer, this._confirmButton, this._preloadInfo, this._headerDone]),
        e.prop(this._confirmButton, {
            disabled: !0
        }),
        e.show(this._header),
        o.clearTimeout(this.timeout)
    }
}

export { Preload };
