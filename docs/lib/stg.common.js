module.exports=function(t){var e={};function s(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,s),o.l=!0,o.exports}return s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(i,o,function(e){return t[e]}.bind(null,o));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=18)}([function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(1)),n=s(19),r={images:{}};async function a(t={}){const e=[];for(const s in t)s in r.images||(r.images[s]=fetch(n.resolve(o.default.publicPath,t[s])).then(t=>t.blob()).then(createImageBitmap).then(t=>r.images[s]=t).catch(()=>delete r.images[s])),e.push(r.images[s]);return await Promise.all(e),r.images}e.default=r,e.loadImages=a,e.checkImages=function(...t){t.forEach(t=>{if(!(t in r.images&&"function"!=typeof r.images[t].then))throw new Error(`Asset ${t} has not been loaded.`)})},e.loadAssets=async function(t={}){return await Promise.all([a(t.images)]),r}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={angleUnit:Math.PI,defaultColor:"blue",publicPath:"",showWarning:!0}},function(t,e,s){"use strict";var i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var s in t)Object.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e.default=t,e},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(28));e.random=n;const r=o(s(15));e.memorize=r.default;const a=o(s(29));e.math=a.default},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(1)),n=s(2),r=s(0),a=i(s(5)),h=i(s(6));e.default=class extends h.default{constructor(t={}){super(),this._point={x:0,y:0,face:0},this._displayHook=t.display,this._mountedHook=t.mounted?[t.mounted]:[],this._mutateHook=t.mutate?[t.mutate]:[],Object.assign(this,t.methods);const e="function"==typeof t.state?t.state.call(this):t.state;Object.assign(this,e),this.color||(this.color=o.default.defaultColor)}get x(){return this._point.x}get y(){return this._point.y}get face(){return this._point.face}set x(t){this._point.x=t,this._coordinate=null}set y(t){this._point.y=t,this._coordinate=null}set face(t){this._point.face=t,this._coordinate=null}_mounted(){this._mountedHook.forEach(t=>t.call(this)),this._mutateHook.forEach(t=>this.setTask(t))}render(){this.$context&&"function"==typeof this._displayHook&&this._displayHook.call(this,this.$tick)}get $coord(){return this._coordinate&&this.$tick===this._coordinate.$birth||(this._coordinate=new a.default(this.x,this.y,this.face),this._coordinate.$birth=this.$tick),this._coordinate}emitBullets(...t){this.$parent.$refs.source=this,this.$parent.emitBullets(...t),delete this.$parent.$refs.source}drawImage(t,e={},s){r.checkImages(t);const{x:i,y:a,face:h}=this.$coord,l=this.$assets.images[t],{xStart:u,xEnd:c,yStart:f,yEnd:d}=s||{xStart:0,yStart:0,xEnd:l.width,yEnd:l.height},p=c-u,_=d-f,{scale:m=1,xOffset:y=0,yOffset:g=0,rotate:v=h}=e,b=p*m,x=_*m,$=-(p/2+y)*m,w=-(_/2+g)*m,k=n.math.sin(o.default.angleUnit*v),j=n.math.cos(o.default.angleUnit*v);this.$context.setTransform(-k,j,-j,-k,i,a),this.$context.drawImage(l,u,f,p,_,$,w,b,x),this.$context.setTransform(1,0,0,1,0,0)}fillCircle(t=this.color,e=this.radius){const{x:s,y:i}=this.$coord;this.$context.beginPath(),this.$context.arc(s,i,e,0,n.math.twoPI),this.$context.closePath(),this.$context.fillStyle=t.output?t.output():t,this.$context.fill()}fillEllipse(t=this.color,e=this.innerColor,s=this.radiusX,i=this.radiusY,r=this.face){const{x:a,y:h}=this.$coord;this.$context.beginPath(),this.$context.strokeStyle=t,this.$context.lineWidth=2,this.$context.ellipse(a,h,s,i,r*o.default.angleUnit,0,n.math.twoPI),this.$context.closePath(),this.$context.stroke(),this.$context.fillStyle=e.output?e.output():e,this.$context.fill()}getGradient(t,e,s=this.color,i=this.radius){const{x:o,y:n}=this.$coord,r=this.$context.createRadialGradient(o,n,e,o,n,i);return r.addColorStop(0,t.output?t.output():t),r.addColorStop(1,s.output?s.output():s),r}bezierCurve(...t){if(t.length%6==2){const e=this.$coord.resolve(t[0],t[1]);this.$context.moveTo(e.x,e.y)}for(let e=0;e<t.length;e+=6){const s=this.$coord.resolve(t[e],t[e+1]),i=this.$coord.resolve(t[e+2],t[e+3]),o=this.$coord.resolve(t[e+4],t[e+5]);this.$context.bezierCurveTo(s.x,s.y,i.x,i.y,o.x,o.y)}}quadraticCurve(...t){if(t.length%4==2){const e=this.$coord.resolve(t[0],t[1]);this.$context.moveTo(e.x,e.y)}for(let e=0;e<t.length;e+=4){const s=this.$coord.resolve(t[e],t[e+1]),i=this.$coord.resolve(t[e+2],t[e+3]);this.$context.quadraticCurveTo(s.x,s.y,i.x,i.y)}}toJSON(){const t={};for(const e in this)("string"==typeof e&&"$"!==e[0]&&"_"!==e[0]||"$tick"===e)&&(t[e]=this[e]);return t}}},function(t,e,s){"use strict";function i(t){for(var s in t)e.hasOwnProperty(s)||(e[s]=t[s])}var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=o(s(0));e.assets=n.default;const r=o(s(9));e.builtin=r.default;const a=o(s(1));e.config=a.default;const h=o(s(10));e.Barrage=h.default;const l=o(s(11));e.Bullet=l.default;const u=o(s(5));e.Coordinate=u.default;const c=o(s(16));e.Field=c.default;const f=o(s(12));e.Looping=f.default;const d=o(s(13));e.Player=d.default;const p=o(s(3));e.CanvasPoint=p.default;const _=o(s(6));e.Updater=_.default,i(s(0)),i(s(10)),i(s(11)),i(s(5)),i(s(16)),i(s(12)),i(s(13)),i(s(30)),i(s(3)),i(s(9)),i(s(6))},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=s(2),n=i(s(1));class r{constructor(t,e,s){this.x=t,this.y=e,this.face=s}get face(){return this._face}set face(t){this._face=t||0,this._cos=o.math.cos(n.default.angleUnit*t||0),this._sin=o.math.sin(n.default.angleUnit*t||0)}get rho(){return this._rho?this._rho:this._rho=o.math.sqrt(this.x**2+this.y**2)}get theta(){return this._thetaRadian/n.default.angleUnit}get thetaRadian(){return"number"==typeof this._thetaRadian?this._thetaRadian:this._thetaRadian=o.math.atan2(this.y,this.x)}dist2(t){return(this.x-t.x)**2+(this.y-t.y)**2}resolve(...t){let e,s,i;return"object"==typeof t[0]?(e=t[0].x,s=t[0].y,i=t[0].face):[e,s,i=0]=t,new r(this.x+e*this._cos-s*this._sin,this.y+e*this._sin+s*this._cos,this.face+i)}locate(...t){let e,s,i;"object"==typeof t[0]?(e=t[0].x,s=t[0].y,i=t[0].face):[e,s,i=0]=t;const o=e-this.x,n=s-this.y;return new r(o*this._cos+n*this._sin,n*this._cos-o*this._sin,i-this.face)}}e.default=r},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(0)),n=i(s(1));class r{constructor(){this.$assets=o.default,this.$config=n.default,this.$tick=0,Object.defineProperty(this,"__updater__",{value:{tasks:[],currentTask:null,tasksToRemove:new Set,taskIndex:0}})}initialize(t,e){return this.$context=t,this.$parent=e,this._mounted&&this._mounted(),this}update(){this.$tick+=1;const t=this.__updater__;t.tasks=t.tasks.filter(e=>!t.tasksToRemove.has(e.id));const e=t.tasks;if(t.tasksToRemove.clear(),e.forEach(e=>{t.currentTask=e.id,e.callback.call(this,this.$tick),e.preserve||t.tasksToRemove.add(e.id)}),t.tasks.length>r.scheduleLimit)throw new Error(`The amount of scheduled tasks (${t.tasks.length}) is beyond the limit!`)}setTask(t,e=1/0,s=!0){const i=++this.__updater__.taskIndex;return this.__updater__.tasks.splice(e,0,{callback:t,preserve:s,id:i}),i}setTimeout(t,e){return t+=this.$tick,this.setTask(()=>{this.$tick<=t||(e.call(this,this.$tick),this.removeTask())},0)}setInterval(t,...e){if(t<=0)throw new Error(`The interval ${t} should be positive.`);const s=e.length>1?e[0]:1/0,i=e.length>2?e[1]:0,o=e[e.length-1],n=this.$tick+i;return this.setTask(e=>{e-=n;const i=Math.floor(e/t),r=i*t-e;if(i>0&&r>=0&&r<t&&(o.call(this,this.$tick),i>=s))return this.removeTask()},0)}removeTask(t=this.__updater__.currentTask){t&&this.__updater__.tasksToRemove.add(t)}}r.scheduleLimit=256,e.default=r},function(t,e,s){"use strict";function i(t,s=256/t,i=1){const o=s/i;return(i,n,r,a,h)=>{const l={};return e.colorSeries[s].forEach((e,s)=>{const u=r+s*t,c=a+Math.floor(s/o)*t;l[`${i}?color=${e}`]={judgeRadius:n,transform:h,selector:[u,c,u+t,c+t]}}),l}}Object.defineProperty(e,"__esModule",{value:!0}),e.colorSeries={4:["red","blue","green","yellow"],8:["black","red","magenta","blue","cyan","green","yellow","gray"],16:["black","maroon","red","purple","magenta","darkblue","blue","","cyan","","green","yellowgreen","","yellow","orange","gray"]},e.defineBullet=i,e.bullet8x32p=i(32),e.bullet4x64p=i(64),e.bullet16x16p=i(16),e.bullet16x8p=i(8,16,2)},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(31)),n=i(s(32)),r=i(s(33)),a=i(s(34)),h=i(s(35)),l=i(s(36)),u=i(s(37)),c=i(s(38));var f=s(7);e.colorSeries=f.colorSeries,e.touhou={v2_1:l.default,v2_2:u.default,v2_3:c.default},e.default=function(t){t.defineTemplate({flaming:o.default,large:n.default,medium:r.default,small:a.default,ellipse:h.default})}},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=s(14),n=s(0),r=i(s(26)),a=i(s(27)),h={},l=r.default,u=a.default;function c(...t){if("string"==typeof t[0]){const e=/^([\w_$]+)(?:\?(.+))?$/.exec(t[0]);if(!e)throw new Error(`Invalid form: "${t[0]}".`);const s=e[1],i=t[0],n=o.parse(e[2]),r=Object.keys(n).length;h[s]=h[s]||[];let a=0,l=null;for(;a<h[s].length;a+=1){const t=h[s][a];if(t.query===i)break;if(t.weight<=r&&(null===l&&(l=a),t.weight<r))break}h[s][a]&&h[s][a].query===i?Object.assign(h[s][a],t[1]):h[s].splice(null===l?1/0:l,0,{query:i,weight:r,...t[1],test(t){for(const e in n)if(t[e]!=n[e])return!1;return!0}})}else for(const e in t[0])c(e,t[0][e])}e.default={templates:h,fields:l,judges:u},e.defineTemplate=c,e.buildFromImages=function(t,e){n.checkImages(t);for(const s in e){let{selector:i,judgeRadius:o,transform:[n=!1,r=1,a=0,h=0]=[]}=e[s];Array.isArray(i)&&(i={data:[i]});const l=i.interval||1,u=i.data,f=n?void 0:0;c(s,{applied(){this.judgeRadius=o},display(e){const[s,i,o,n]=u[Math.floor(e/l)%u.length];this.drawImage(t,{rotate:f,scale:r,xOffset:a,yOffset:h},{xStart:s,yStart:i,xEnd:o,yEnd:n})}})}}},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(11)),n=i(s(3)),r=i(s(6));class a extends r.default{constructor(t={}){super(),this._pointCounter=0,this.$refs={},this.$bullets=[],this._mutateHook=t.mutate,this._mountedHook=t.mounted,this._references=t.reference||{},Object.assign(this,t.methods);const e="function"==typeof t.state?t.state.call(this):t.state;Object.assign(this,e)}_mounted(){this.$refs={},this._mountedHook&&this._mountedHook(),this._mutateHook&&this.setTask(this._mutateHook);for(const t of Object.keys(this._references))this.setRefPoint(t,this._references[t]);this.setTask(()=>{for(const t in this.$refs){const e=this.$refs[t];e.$parent===this&&e.update()}if(this.$bullets.forEach(t=>t.update()),this.$bullets.length>a.maxBulletCount)throw new Error(`The amount of bullets ${this.$bullets.length} is beyond the limit!`)})}render(){for(const t in this.$refs){const e=this.$refs[t];e.$parent===this&&e.render()}this.$bullets.forEach(t=>t.render())}setRefPoint(...t){const e=t[t.length-1],s=t.length>1?t[0]:++this._pointCounter;return this.$refs[s]=new n.default(e).initialize(this.$context,this),s}removeRefPoint(t){return delete this.$refs[t]}emitBullets(...t){const e=t.length>2?t[0]:0,s=t.length>1?t.length>2?t[1]:t[0]:1,i=t.length>3?t[2]:1,n=t[t.length-1];for(let t=e;t<s;t+=i){const e="function"==typeof n?n.call(this,t):n,s=new o.default(e);s.$id=++this._pointCounter;for(const t in this.$refs)s.$refs[t]=this.$refs[t].$coord;s.initialize(this.$context,this);const i=this.$bullets.findIndex(({layer:t})=>t>s.layer);i<0?this.$bullets.push(s):this.$bullets.splice(i,0,s)}}}a.maxBulletCount=4096,e.default=a},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(1)),n=i(s(9)),r=s(2),a=i(s(5)),h=i(s(3));class l extends h.default{constructor(t={}){const e=t.display;delete t.display,super(t),this.$refs={},this.layer=void 0===t.layer?0:t.layer,this.judgeType=void 0===t.judgeType?"ortho":t.judgeType,this.fieldType=void 0===t.fieldType?"viewport":t.fieldType,this.setTask(t=>{const e=this._resolveHook(this.judgeType,n.default.judges),s=this.$parent.$refs.player;e&&s&&e.call(this,s)&&this.hitPlayer();const i=this._resolveHook(this.fieldType,n.default.fields);i&&i.call(this,t)&&this.destroy()});const s=t.origin||"origin";"string"!=typeof s?this.$origin=s:this._mountedHook.unshift(()=>{this.$refs[s]?this.$origin=this.$refs[s]:(o.default.showWarning&&console.warn(`Warning: reference point ${s} is not found.`),this.$origin={x:0,y:0,face:0})}),this.display=e}set display(t){if("string"==typeof t){const e=(n.default.templates[t]||[]).find(t=>t.test(this));if(!e)throw new Error(`A template matching ${t} was not found.`);e.applied&&e.applied.call(this),this._displayHook=e.display}else this._displayHook=t}get display(){return this._displayHook}_resolveHook(t,e){if("string"!=typeof t)return t;if(t in e)return e[t];throw new Error(`Plugin ${t} was not found.`)}get $coord(){return this._coordinate&&this.$tick===this._coordinate.$birth||(this._coordinate=new a.default(this.x+this.$origin.x,this.y+this.$origin.y,this.face+this.$origin.face),this._coordinate.$birth=this.$tick),this._coordinate}polarLocate(t=this.rho,e=this.theta){e+=this.$origin.face,this.x=t*r.math.cos(o.default.angleUnit*e),this.y=t*r.math.sin(o.default.angleUnit*e)}hitPlayer(){this.$parent.$refs.player.lifeCount-=1,this.destroy()}destroy(){const t=this.$id;this.$parent.setTimeout(0,function(){const e=this.$bullets.findIndex(e=>e.$id===t);e>=0&&this.$bullets.splice(e,1)})}}e.default=l,Object.assign(l,n.default)},function(t,e,s){"use strict";function i(){}Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t={}){this.initialize(t)}initialize(t={}){"__loop__"in this&&(t=Object.assign(this.__loop__.options,t));const e={options:t,frameId:null,frameCount:0,lastFrame:null,totalStop:0,lastStop:null,recentData:[],timeLine:null,lastModifyStats:0,skipRate:1+(t.skipFrame||0),tickLength:1e3/(t.tickRate||60),tickStorage:t.tickStorage||60,statsInterval:t.statsInterval||1/0,maxInterpolation:t.maxInterpolation||5};return e.sampleTime=e.tickLength*e.tickStorage,Object.defineProperty(this,"__loop__",{value:e}),this.onPause=t.onPause||this.onPause||i,this.onResume=t.onResume||this.onResume||i,this.onStats=t.onStats||this.onStats||i,this.onError=t.onError||this.onError||i,this}pause(){this.__loop__.frameId&&(this.__loop__.lastStop=performance.now(),cancelAnimationFrame(this.__loop__.frameId),this.__loop__.frameId=null,this.onPause())}resume(){if(!this.__loop__.frameId){if(this.__loop__.lastStop){const t=performance.now()-this.__loop__.lastStop;this.__loop__.totalStop+=t,this.__loop__.lastFrame&&(this.__loop__.lastFrame+=t)}this.__loop__.frameId=requestAnimationFrame(t=>this._render(t)),this.onResume()}}toggle(){null!==this.__loop__.frameId?this.pause():this.resume()}getStatus(){const{recentData:t}=this.__loop__;if(!t.length)return null;let e=0,s=0,i=0;for(const o of t)e+=o.time,s+=o.ticks,i+=Number(1!==o.ticks);return{tickRate:1e3/e*s,frameRate:1e3/e*t.length,dropRate:i/t.length}}_render(t){const e=this.__loop__;let s=(t-e.totalStop-e.timeLine)/e.tickLength;(s=s<1?Math.round(s):Math.floor(s))>e.maxInterpolation?(s=e.maxInterpolation,e.timeLine=t-e.totalStop):e.timeLine+=s*e.tickLength;const i=t-(e.lastFrame||0);e.lastFrame&&(e.recentData.unshift({time:i,ticks:s}),e.recentData=e.recentData.slice(0,e.tickStorage)),e.lastFrame=t;try{for(let t=0;t<s;t+=1)this.update();s&&(e.frameCount%e.skipRate==0&&this.render(),e.frameCount+=1)}catch(t){return console.error(t),this.onError(t),void this.pause()}e.frameId=requestAnimationFrame(t=>this._render(t));const o=performance.now();if(o-e.lastModifyStats<e.statsInterval)return;e.lastModifyStats=o;const n=this.getStatus();n&&this.onStats(n)}}},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(3));e.default=class extends o.default{constructor(t={}){t.state={color:"red",radius:4,lifeCount:8,judgeRadius:2.5,bombCount:0,highSpeed:5,lowSpeed:2,...t.state},super(t),this._listeners=[],this.control=void 0===t.control?"keyboard":t.control}_mounted(){this.x=this.$context.canvas.width/2,this.y=this.$context.canvas.height/8*7,this._mountedHook.forEach(t=>t.call(this)),this.render(),this.setTask(this._mutate),"mouse"===this.control?(this._mouseState={x:0,y:0},this._listen(this.$context.canvas,"mousemove",t=>{this._mouseState.x=t.clientX/this.$context.canvas.offsetWidth*this.$context.canvas.width,this._mouseState.y=t.clientY/this.$context.canvas.offsetHeight*this.$context.canvas.height,t.preventDefault(),t.stopPropagation()})):"keyboard"===this.control&&(this._keyState={ArrowUp:0,ArrowDown:0,ArrowLeft:0,ArrowRight:0,Shift:0},this._listen(window,"keydown",t=>{t.key in this._keyState&&(this._keyState[t.key]=1,t.preventDefault(),t.stopPropagation())}),this._listen(window,"keyup",t=>{t.key in this._keyState&&(this._keyState[t.key]=0,t.preventDefault(),t.stopPropagation())}))}_listen(t,e,s,i){t.addEventListener(e,s,i),this._listeners.push([t,e,s,i])}_mutate(t){if(this._mutateHook.forEach(e=>e.call(this,t)),"mouse"===this.control)this.x=this._mouseState.x,this.y=this._mouseState.y;else if("keyboard"===this.control){const t=(this._keyState.Shift?this.lowSpeed:this.highSpeed)/Math.sqrt((this._keyState.ArrowDown^this._keyState.ArrowUp)+(this._keyState.ArrowLeft^this._keyState.ArrowRight)||1);this.x+=t*this._keyState.ArrowRight,this.x-=t*this._keyState.ArrowLeft,this.y+=t*this._keyState.ArrowDown,this.y-=t*this._keyState.ArrowUp,this.x<0&&(this.x=0),this.y<0&&(this.y=0),this.x>this.$context.canvas.width&&(this.x=this.$context.canvas.width),this.y>this.$context.canvas.height&&(this.y=this.$context.canvas.height)}}render(){const t=this.getGradient("white",this.radius/2);this.fillCircle(t)}destory(){this._listeners.forEach(([t,e,s,i])=>{t.removeEventListener(e,s,i)})}}},function(t,e,s){"use strict";e.decode=e.parse=s(24),e.encode=e.stringify=s(25)},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=1024;e.default=function(t){let e=1,s=0,o=0;const n={},r={};function a(t){if(delete n[t],t===e)for(;!n.hasOwnProperty(++e);)continue}return(...h)=>{const l=function(t){let e=t.length-1,s=String(t[e]);for(;--e>=0;)s+=""+t[e];return s}(h.slice(0,t.length)),u=r[l],c=++o;if(n[c]=l,u)return a(u.index),u.index=c,u.value;{const o=t(...h);return r[l]={index:c,value:o},(s+=1)<=i?o:(delete r[n[e]],s-=1,a(e),o)}}}},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=s(0),n=i(s(12)),r=i(s(10)),a=i(s(13));e.default=class extends n.default{constructor(t,e={}){super(e),this.element=t,t.classList.add("stg-field"),t.style.background=e.background,this.canvas=t.appendChild(document.createElement("canvas")),this.canvas.height=e.height||560,this.canvas.width=e.width||480,this.title=e.title||"",this.context=this.canvas.getContext("2d"),this.setTitleStyle(e.titleStyle)}setTitleStyle(t={}){const e=t.fontSize||24;this.titleStyle={fontSize:e,fontColor:"white",x:this.canvas.width-e,y:e,textAlign:"right",textBaseline:"top",fontFamily:'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial',...t}}async setPlayer(t){t&&(this.removePlayer(),await o.loadAssets(t.assets),this.player=new a.default(t).initialize(this.context),this.barrage&&(this.barrage.$refs.player=this.player))}removePlayer(){this.player&&this.player.destory(),this.barrage&&delete this.barrage.$refs.player}async setBarrage(t){t&&(this.pause(),this.clearScreen(),await o.loadAssets(t.assets),this.barrage=new r.default(t).initialize(this.context),this.player&&(this.barrage.$refs.player=this.player))}clearScreen(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}clear(){this.pause(),this.removePlayer(),this.clearScreen(),this.barrage=null}update(){this.barrage&&this.barrage.update(),this.player&&this.player.update()}render(){this.clearScreen(),this.barrage&&this.barrage.render(),this.player&&this.player.render(),this.showTitle()}showText(t,e){this.context.textAlign=e.textAlign,this.context.textBaseline=e.textBaseline,this.context.fillStyle=e.fontColor,this.context.font=`${e.fontSize||16}px ${e.fontFamily}`,this.context.fillText(t,e.x,e.y)}showTitle(){const t=this.title&&this.titleStyle;t&&this.showText(this.title,t)}}},function(t){t.exports={a:"0.3.1"}},function(t,e,s){"use strict";s.r(e);var i=s(4),o=s(8),n=s.n(o);for(var r in i)["version","default"].indexOf(r)<0&&function(t){s.d(e,t,function(){return i[t]})}(r);var a=s(2);for(var r in a)["version","default"].indexOf(r)<0&&function(t){s.d(e,t,function(){return a[t]})}(r);for(var r in o)["version","default"].indexOf(r)<0&&function(t){s.d(e,t,function(){return o[t]})}(r);var h=s(17);s.d(e,"version",function(){return h.a}),Object(i.use)(n.a)},function(t,e,s){"use strict";var i=s(20),o=s(23);function n(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}e.parse=v,e.resolve=function(t,e){return v(t,!1,!0).resolve(e)},e.resolveObject=function(t,e){return t?v(t,!1,!0).resolveObject(e):e},e.format=function(t){o.isString(t)&&(t=v(t));return t instanceof n?t.format():n.prototype.format.call(t)},e.Url=n;var r=/^([a-z0-9.+-]+:)/i,a=/:[0-9]*$/,h=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,l=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),u=["'"].concat(l),c=["%","/","?",";","#"].concat(u),f=["/","?","#"],d=/^[+a-z0-9A-Z_-]{0,63}$/,p=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,_={javascript:!0,"javascript:":!0},m={javascript:!0,"javascript:":!0},y={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},g=s(14);function v(t,e,s){if(t&&o.isObject(t)&&t instanceof n)return t;var i=new n;return i.parse(t,e,s),i}n.prototype.parse=function(t,e,s){if(!o.isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var n=t.indexOf("?"),a=-1!==n&&n<t.indexOf("#")?"?":"#",l=t.split(a);l[0]=l[0].replace(/\\/g,"/");var v=t=l.join(a);if(v=v.trim(),!s&&1===t.split("#").length){var b=h.exec(v);if(b)return this.path=v,this.href=v,this.pathname=b[1],b[2]?(this.search=b[2],this.query=e?g.parse(this.search.substr(1)):this.search.substr(1)):e&&(this.search="",this.query={}),this}var x=r.exec(v);if(x){var $=(x=x[0]).toLowerCase();this.protocol=$,v=v.substr(x.length)}if(s||x||v.match(/^\/\/[^@\/]+@[^@\/]+/)){var w="//"===v.substr(0,2);!w||x&&m[x]||(v=v.substr(2),this.slashes=!0)}if(!m[x]&&(w||x&&!y[x])){for(var k,j,O=-1,S=0;S<f.length;S++){-1!==(P=v.indexOf(f[S]))&&(-1===O||P<O)&&(O=P)}-1!==(j=-1===O?v.lastIndexOf("@"):v.lastIndexOf("@",O))&&(k=v.slice(0,j),v=v.slice(j+1),this.auth=decodeURIComponent(k)),O=-1;for(S=0;S<c.length;S++){var P;-1!==(P=v.indexOf(c[S]))&&(-1===O||P<O)&&(O=P)}-1===O&&(O=v.length),this.host=v.slice(0,O),v=v.slice(O),this.parseHost(),this.hostname=this.hostname||"";var C="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!C)for(var M=this.hostname.split(/\./),R=(S=0,M.length);S<R;S++){var I=M[S];if(I&&!I.match(d)){for(var T="",A=0,E=I.length;A<E;A++)I.charCodeAt(A)>127?T+="x":T+=I[A];if(!T.match(d)){var q=M.slice(0,S),U=M.slice(S+1),H=I.match(p);H&&(q.push(H[1]),U.unshift(H[2])),U.length&&(v="/"+U.join(".")+v),this.hostname=q.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),C||(this.hostname=i.toASCII(this.hostname));var D=this.port?":"+this.port:"",L=this.hostname||"";this.host=L+D,this.href+=this.host,C&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==v[0]&&(v="/"+v))}if(!_[$])for(S=0,R=u.length;S<R;S++){var F=u[S];if(-1!==v.indexOf(F)){var z=encodeURIComponent(F);z===F&&(z=escape(F)),v=v.split(F).join(z)}}var B=v.indexOf("#");-1!==B&&(this.hash=v.substr(B),v=v.slice(0,B));var N=v.indexOf("?");if(-1!==N?(this.search=v.substr(N),this.query=v.substr(N+1),e&&(this.query=g.parse(this.query)),v=v.slice(0,N)):e&&(this.search="",this.query={}),v&&(this.pathname=v),y[$]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){D=this.pathname||"";var G=this.search||"";this.path=D+G}return this.href=this.format(),this},n.prototype.format=function(){var t=this.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":"),t+="@");var e=this.protocol||"",s=this.pathname||"",i=this.hash||"",n=!1,r="";this.host?n=t+this.host:this.hostname&&(n=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(n+=":"+this.port)),this.query&&o.isObject(this.query)&&Object.keys(this.query).length&&(r=g.stringify(this.query));var a=this.search||r&&"?"+r||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||y[e])&&!1!==n?(n="//"+(n||""),s&&"/"!==s.charAt(0)&&(s="/"+s)):n||(n=""),i&&"#"!==i.charAt(0)&&(i="#"+i),a&&"?"!==a.charAt(0)&&(a="?"+a),e+n+(s=s.replace(/[?#]/g,function(t){return encodeURIComponent(t)}))+(a=a.replace("#","%23"))+i},n.prototype.resolve=function(t){return this.resolveObject(v(t,!1,!0)).format()},n.prototype.resolveObject=function(t){if(o.isString(t)){var e=new n;e.parse(t,!1,!0),t=e}for(var s=new n,i=Object.keys(this),r=0;r<i.length;r++){var a=i[r];s[a]=this[a]}if(s.hash=t.hash,""===t.href)return s.href=s.format(),s;if(t.slashes&&!t.protocol){for(var h=Object.keys(t),l=0;l<h.length;l++){var u=h[l];"protocol"!==u&&(s[u]=t[u])}return y[s.protocol]&&s.hostname&&!s.pathname&&(s.path=s.pathname="/"),s.href=s.format(),s}if(t.protocol&&t.protocol!==s.protocol){if(!y[t.protocol]){for(var c=Object.keys(t),f=0;f<c.length;f++){var d=c[f];s[d]=t[d]}return s.href=s.format(),s}if(s.protocol=t.protocol,t.host||m[t.protocol])s.pathname=t.pathname;else{for(var p=(t.pathname||"").split("/");p.length&&!(t.host=p.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==p[0]&&p.unshift(""),p.length<2&&p.unshift(""),s.pathname=p.join("/")}if(s.search=t.search,s.query=t.query,s.host=t.host||"",s.auth=t.auth,s.hostname=t.hostname||t.host,s.port=t.port,s.pathname||s.search){var _=s.pathname||"",g=s.search||"";s.path=_+g}return s.slashes=s.slashes||t.slashes,s.href=s.format(),s}var v=s.pathname&&"/"===s.pathname.charAt(0),b=t.host||t.pathname&&"/"===t.pathname.charAt(0),x=b||v||s.host&&t.pathname,$=x,w=s.pathname&&s.pathname.split("/")||[],k=(p=t.pathname&&t.pathname.split("/")||[],s.protocol&&!y[s.protocol]);if(k&&(s.hostname="",s.port=null,s.host&&(""===w[0]?w[0]=s.host:w.unshift(s.host)),s.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===p[0]?p[0]=t.host:p.unshift(t.host)),t.host=null),x=x&&(""===p[0]||""===w[0])),b)s.host=t.host||""===t.host?t.host:s.host,s.hostname=t.hostname||""===t.hostname?t.hostname:s.hostname,s.search=t.search,s.query=t.query,w=p;else if(p.length)w||(w=[]),w.pop(),w=w.concat(p),s.search=t.search,s.query=t.query;else if(!o.isNullOrUndefined(t.search)){if(k)s.hostname=s.host=w.shift(),(C=!!(s.host&&s.host.indexOf("@")>0)&&s.host.split("@"))&&(s.auth=C.shift(),s.host=s.hostname=C.shift());return s.search=t.search,s.query=t.query,o.isNull(s.pathname)&&o.isNull(s.search)||(s.path=(s.pathname?s.pathname:"")+(s.search?s.search:"")),s.href=s.format(),s}if(!w.length)return s.pathname=null,s.search?s.path="/"+s.search:s.path=null,s.href=s.format(),s;for(var j=w.slice(-1)[0],O=(s.host||t.host||w.length>1)&&("."===j||".."===j)||""===j,S=0,P=w.length;P>=0;P--)"."===(j=w[P])?w.splice(P,1):".."===j?(w.splice(P,1),S++):S&&(w.splice(P,1),S--);if(!x&&!$)for(;S--;S)w.unshift("..");!x||""===w[0]||w[0]&&"/"===w[0].charAt(0)||w.unshift(""),O&&"/"!==w.join("/").substr(-1)&&w.push("");var C,M=""===w[0]||w[0]&&"/"===w[0].charAt(0);k&&(s.hostname=s.host=M?"":w.length?w.shift():"",(C=!!(s.host&&s.host.indexOf("@")>0)&&s.host.split("@"))&&(s.auth=C.shift(),s.host=s.hostname=C.shift()));return(x=x||s.host&&w.length)&&!M&&w.unshift(""),w.length?s.pathname=w.join("/"):(s.pathname=null,s.path=null),o.isNull(s.pathname)&&o.isNull(s.search)||(s.path=(s.pathname?s.pathname:"")+(s.search?s.search:"")),s.auth=t.auth||s.auth,s.slashes=s.slashes||t.slashes,s.href=s.format(),s},n.prototype.parseHost=function(){var t=this.host,e=a.exec(t);e&&(":"!==(e=e[0])&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},function(t,e,s){(function(t,i){var o;/*! https://mths.be/punycode v1.4.1 by @mathias */!function(n){e&&e.nodeType,t&&t.nodeType;var r="object"==typeof i&&i;r.global!==r&&r.window!==r&&r.self;var a,h=2147483647,l=36,u=1,c=26,f=38,d=700,p=72,_=128,m="-",y=/^xn--/,g=/[^\x20-\x7E]/,v=/[\x2E\u3002\uFF0E\uFF61]/g,b={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},x=l-u,$=Math.floor,w=String.fromCharCode;function k(t){throw new RangeError(b[t])}function j(t,e){for(var s=t.length,i=[];s--;)i[s]=e(t[s]);return i}function O(t,e){var s=t.split("@"),i="";return s.length>1&&(i=s[0]+"@",t=s[1]),i+j((t=t.replace(v,".")).split("."),e).join(".")}function S(t){for(var e,s,i=[],o=0,n=t.length;o<n;)(e=t.charCodeAt(o++))>=55296&&e<=56319&&o<n?56320==(64512&(s=t.charCodeAt(o++)))?i.push(((1023&e)<<10)+(1023&s)+65536):(i.push(e),o--):i.push(e);return i}function P(t){return j(t,function(t){var e="";return t>65535&&(e+=w((t-=65536)>>>10&1023|55296),t=56320|1023&t),e+=w(t)}).join("")}function C(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function M(t,e,s){var i=0;for(t=s?$(t/d):t>>1,t+=$(t/e);t>x*c>>1;i+=l)t=$(t/x);return $(i+(x+1)*t/(t+f))}function R(t){var e,s,i,o,n,r,a,f,d,y,g,v=[],b=t.length,x=0,w=_,j=p;for((s=t.lastIndexOf(m))<0&&(s=0),i=0;i<s;++i)t.charCodeAt(i)>=128&&k("not-basic"),v.push(t.charCodeAt(i));for(o=s>0?s+1:0;o<b;){for(n=x,r=1,a=l;o>=b&&k("invalid-input"),((f=(g=t.charCodeAt(o++))-48<10?g-22:g-65<26?g-65:g-97<26?g-97:l)>=l||f>$((h-x)/r))&&k("overflow"),x+=f*r,!(f<(d=a<=j?u:a>=j+c?c:a-j));a+=l)r>$(h/(y=l-d))&&k("overflow"),r*=y;j=M(x-n,e=v.length+1,0==n),$(x/e)>h-w&&k("overflow"),w+=$(x/e),x%=e,v.splice(x++,0,w)}return P(v)}function I(t){var e,s,i,o,n,r,a,f,d,y,g,v,b,x,j,O=[];for(v=(t=S(t)).length,e=_,s=0,n=p,r=0;r<v;++r)(g=t[r])<128&&O.push(w(g));for(i=o=O.length,o&&O.push(m);i<v;){for(a=h,r=0;r<v;++r)(g=t[r])>=e&&g<a&&(a=g);for(a-e>$((h-s)/(b=i+1))&&k("overflow"),s+=(a-e)*b,e=a,r=0;r<v;++r)if((g=t[r])<e&&++s>h&&k("overflow"),g==e){for(f=s,d=l;!(f<(y=d<=n?u:d>=n+c?c:d-n));d+=l)j=f-y,x=l-y,O.push(w(C(y+j%x,0))),f=$(j/x);O.push(w(C(f,0))),n=M(s,b,i==o),s=0,++i}++s,++e}return O.join("")}a={version:"1.4.1",ucs2:{decode:S,encode:P},decode:R,encode:I,toASCII:function(t){return O(t,function(t){return g.test(t)?"xn--"+I(t):t})},toUnicode:function(t){return O(t,function(t){return y.test(t)?R(t.slice(4).toLowerCase()):t})}},void 0===(o=function(){return a}.call(e,s,e,t))||(t.exports=o)}()}).call(this,s(21)(t),s(22))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e){var s;s=function(){return this}();try{s=s||new Function("return this")()}catch(t){"object"==typeof window&&(s=window)}t.exports=s},function(t,e,s){"use strict";t.exports={isString:function(t){return"string"==typeof t},isObject:function(t){return"object"==typeof t&&null!==t},isNull:function(t){return null===t},isNullOrUndefined:function(t){return null==t}}},function(t,e,s){"use strict";function i(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.exports=function(t,e,s,n){e=e||"&",s=s||"=";var r={};if("string"!=typeof t||0===t.length)return r;var a=/\+/g;t=t.split(e);var h=1e3;n&&"number"==typeof n.maxKeys&&(h=n.maxKeys);var l=t.length;h>0&&l>h&&(l=h);for(var u=0;u<l;++u){var c,f,d,p,_=t[u].replace(a,"%20"),m=_.indexOf(s);m>=0?(c=_.substr(0,m),f=_.substr(m+1)):(c=_,f=""),d=decodeURIComponent(c),p=decodeURIComponent(f),i(r,d)?o(r[d])?r[d].push(p):r[d]=[r[d],p]:r[d]=p}return r};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},function(t,e,s){"use strict";var i=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,s,a){return e=e||"&",s=s||"=",null===t&&(t=void 0),"object"==typeof t?n(r(t),function(r){var a=encodeURIComponent(i(r))+s;return o(t[r])?n(t[r],function(t){return a+encodeURIComponent(i(t))}).join(e):a+encodeURIComponent(i(t[r]))}).join(e):a?encodeURIComponent(i(a))+s+encodeURIComponent(i(t)):""};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function n(t,e){if(t.map)return t.map(e);for(var s=[],i=0;i<t.length;i++)s.push(e(t[i],i));return s}var r=Object.keys||function(t){var e=[];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.push(s);return e}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={distant(){const{width:t,height:e}=this.$context.canvas;return this.x**2+this.y**2>t**2+e**2},timing(t){return t>(this.lifeSpan||12e3)},viewport(){const{x:t,y:e}=this.$coord,{width:s,height:i}=this.$context.canvas,o=this.fieldBorder||10;return e<-o||e>i+o||t<-o||t>s+o}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ortho(t){return this.$coord.dist2(t)<t.judgeRadius**2+this.judgeRadius**2},square(t){const e=t.judgeRadius+this.judgeRadius,s=this.$coord.locate(t.x,t.y);return Math.abs(s.x)<e||Math.abs(s.y)<e},viewport(t){const e=t.judgeRadius+this.judgeRadius;return this.$coord.dist2(t)<e**2}}},function(t,e,s){"use strict";function i(){return 2*Math.floor(2*Math.random())-1}function o(...t){const e=t.length>1?t[0]:0,s=t[t.length-1];return Math.random()*(s-e)+e}function n(...t){let e=Math.random()*t.reduce((t,e)=>t+e,0);for(let s=0;s<t.length;s+=1)if((e-=t[s])<0)return s}Object.defineProperty(e,"__esModule",{value:!0}),e.pm1=i,e.real=o,e.int=function(...t){return Math.floor(o(...t))},e.choose=n,e.transfer=function(t,e,s,r,a){return t<e+r?t+o(r,a):t>s-r?t-o(r,a):t<e+a?n(t-e-r,a-r)?t+o(r,a):t-o(r,t-e-r):t>s-a?n(s-t-r,a-r)?t-o(r,a):t+o(r,s-t-r):t+o(r,a)*i()}},function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(15)),n={},r=["sqrt","cbrt","exp","log","log2","log10","sin","cos","tan","asin","acos","atan","sinh","cosh","tanh","asinh","acosh","atanh"];Object.defineProperty(n,"twoPI",{value:2*Math.PI}),Object.defineProperty(n,"halfPI",{value:Math.PI/2}),Object.getOwnPropertyNames(Math).forEach(t=>{Object.defineProperty(n,t,{value:r.includes(t)?o.default(Math[t]):Math[t]})}),e.default=n},function(t,e,s){"use strict";var i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var s in t)Object.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(4));e.use=function(t){if("function"==typeof t)t(o);else{if("function"!=typeof t.install)throw new Error("Not a valid plugin.");t.install(o)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={applied(){this.radius=6,this.innerRadius=4,this.judgeRadius=4,this.color=this.color||"blue",this.innerColor=this.innerColor||"white"},display(){this.fillCircle(this.getGradient(this.color,this.innerR,this.bdColor))}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={applied(){this.radius=20,this.innerRadius=14,this.judgeRadius=8.5,this.color=this.color||"blue",this.innerColor=this.innerColor||"white"},display(){this.fillCircle(this.getGradient(this.innerColor,this.innerRadius))}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={applied(){this.radius=14,this.innerRadius=8.5,this.judgeRadius=9,this.color=this.color||"blue",this.innerColor=this.innerColor||"white"},display(){this.fillCircle(this.getGradient(this.innerColor,this.innerRadius))}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={applied(){this.radius=6,this.innerRadius=4,this.judgeRadius=4,this.color=this.color||"blue",this.innerColor=this.innerColor||"white"},display(){this.fillCircle(this.getGradient(this.innerColor,this.innerRadius))}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={applied(){this.radiusX=14,this.radiusY=7,this.judgeRadius=7,this.color=this.color||"blue",this.innerColor=this.innerColor||"white"},display(){this.fillEllipse()}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(7);e.default={...i.bullet16x16p("scale",2.4,0,16,[!0,1,0,3]),...i.bullet16x16p("ring",4,0,32),...i.bullet16x16p("small",4,0,48),...i.bullet16x16p("rice",2.4,0,64,[!0]),...i.bullet16x16p("chain",2.4,0,80,[!0]),...i.bullet16x16p("needle",2.4,0,96,[!0]),...i.bullet16x16p("shell",2.8,0,112,[!0]),...i.bullet16x16p("bullet",2.4,0,128,[!0]),...i.bullet16x16p("bacillus",2.4,0,144,[!0]),...i.bullet16x16p("star",4,0,160,[!0]),...i.bullet16x16p("unknown1",4,0,176),...i.bullet16x8p("grape",2.4,0,192),...i.bullet16x8p("grain",2.4,64,192,[!0]),...i.bullet16x8p("point",2.4,0,240)}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(7);e.default={...i.bullet8x32p("bigstar",7,0,0,[!0]),...i.bullet8x32p("medium",8.5,0,32),...i.bullet8x32p("butterfly",7,0,64,[!0]),...i.bullet8x32p("knife",6,0,96,[!0]),...i.bullet8x32p("ellipse",7,0,128,[!0]),...i.bullet8x32p("unknown2",7,0,160),...i.bullet4x64p("large",14,0,192)}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(7);e.default={...i.bullet8x32p("heart",10,0,0,[!0]),...i.bullet8x32p("arrow",4,0,32,[!0,1,0,-3]),...i.bullet8x32p("unknown3",4,0,64),...i.bullet8x32p("unknown4",7,0,224),...i.bullet16x16p("drop",2.4,0,192,[!0,1,0,-4])}}]);
//# sourceMappingURL=stg.common.js.map