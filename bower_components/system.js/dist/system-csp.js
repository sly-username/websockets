!function($__global,$__globalName){$__global.upgradeSystemLoader=function(){function e(e){var t=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@\/?#]*(?::[^:@\/?#]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return t?{href:t[0]||"",protocol:t[1]||"",authority:t[2]||"",host:t[3]||"",hostname:t[4]||"",port:t[5]||"",pathname:t[6]||"",search:t[7]||"",hash:t[8]||""}:null}function t(t,a){function r(e){var t=[];return e.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?t.pop():t.push(e)}),t.join("").replace(/^\//,"/"===e.charAt(0)?"/":"")}return g&&(a=a.replace(/\\/g,"/")),a=e(a||""),t=e(t||""),a&&t?(a.protocol||t.protocol)+(a.protocol||a.authority?a.authority:t.authority)+r(a.protocol||a.authority||"/"===a.pathname.charAt(0)?a.pathname:a.pathname?(t.authority&&!t.pathname?"/":"")+t.pathname.slice(0,t.pathname.lastIndexOf("/")+1)+a.pathname:t.pathname)+(a.protocol||a.authority||a.pathname?a.search:a.search||t.search)+a.hash:null}function a(e){function r(e,t){t._extensions=[];for(var a=0,r=e.length;r>a;a++)e[a](t)}var n=e["import"];e["import"]=function(e,t){return n.call(this,e,t).then(function(e){return e.__useDefault?e["default"]:e})},e.set("@empty",e.newModule({})),"undefined"!=typeof require&&(e._nodeRequire=require),e.config=function(e){for(var t in e){var a=e[t];if("object"!=typeof a||a instanceof Array)this[t]=a;else{this[t]=this[t]||{};for(var r in a)this[t][r]=a[r]}}};var o;if("undefined"==typeof window&&"undefined"==typeof WorkerGlobalScope&&"undefined"!=typeof process)o="file:"+process.cwd()+"/",g&&(o=o.replace(/\\/g,"/"));else if("undefined"==typeof window)o=location.href;else if(o=document.baseURI,!o){var i=document.getElementsByTagName("base");o=i[0]&&i[0].href||window.location.href}var s,l=e.locate;e.locate=function(e){return this.baseURL!=s&&(s=t(o,this.baseURL),"/"!=s.substr(s.length-1,1)&&(s+="/"),this.baseURL=s),Promise.resolve(l.call(this,e))},e._extensions=e._extensions||[],e._extensions.push(a),e.clone=function(){var e=this,t=new LoaderPolyfill(b);return t.baseURL=e.baseURL,t.paths={"*":"*.js"},r(e._extensions,t),t}}function r(e){"undefined"==typeof v&&(v=Array.prototype.indexOf),e._extensions.push(r);var t=document.getElementsByTagName("head")[0];e.onScriptLoad=function(){},e.fetch=function(a){return new Promise(function(r,n){function o(){l.readyState&&"loaded"!=l.readyState&&"complete"!=l.readyState||(s(),e.onScriptLoad(a),a.metadata.registered||n(a.address+" did not call System.register or AMD define"),r(""))}function i(e){s(),n(e)}function s(){l.detachEvent?l.detachEvent("onreadystatechange",o):(l.removeEventListener("load",o,!1),l.removeEventListener("error",i,!1)),t.removeChild(l)}var l=document.createElement("script");l.async=!0,l.attachEvent?l.attachEvent("onreadystatechange",o):(l.addEventListener("load",o,!1),l.addEventListener("error",i,!1)),l.src=a.address,t.appendChild(l)})},e.scriptLoader=!0}function n(e){function t(e,t){var a=e.meta&&e.meta[t.name];if(a)for(var r in a)t.metadata[r]=t.metadata[r]||a[r]}var a=/^(\s*\/\*.*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,r=/\/\*.*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;e.meta={},e._extensions=e._extensions||[],e._extensions.push(n);var o=e.locate;e.locate=function(e){return t(this,e),o.call(this,e)};var i=e.translate;e.translate=function(e){var n=e.source.match(a);if(n)for(var o=n[0].match(r),s=0;s<o.length;s++){var l=o[s].length,u=o[s].substr(0,1);if(";"==o[s].substr(l-1,1)&&l--,'"'==u||"'"==u){var d=o[s].substr(1,o[s].length-3),c=d.substr(0,d.indexOf(" "));if(c){var f=d.substr(c.length+1,d.length-c.length-1);e.metadata[c]instanceof Array?e.metadata[c].push(f):e.metadata[c]||(e.metadata[c]=f)}}}return t(this,e),i.call(this,e)}}function o(e){function a(e){var a,r=e.source.lastIndexOf("\n");-1!=r&&"//# sourceMappingURL="==e.source.substr(r+1,21)&&(a=e.source.substr(r+22,e.source.length-r-22),"undefined"!=typeof t&&(a=t(e.address,a))),__eval(e.source,e.address,a)}function r(e){for(var t=[],a=0,r=e.length;r>a;a++)-1==v.call(t,e[a])&&t.push(e[a]);return t}function n(t,a,r,n){"string"!=typeof t&&(n=r,r=a,a=t,t=null),g=!0;var o;if(o="boolean"==typeof r?{declarative:!1,deps:a,execute:n,executingRequire:r}:{declarative:!0,deps:a,declare:r},t)o.name=t,t in e.defined||(e.defined[t]=o);else if(o.declarative){if(p)throw new TypeError("Multiple anonymous System.register calls in the same module file.");p=o}}function i(e){if(!e.register){e.register=n,e.defined||(e.defined={});var t=e.onScriptLoad;e.onScriptLoad=function(e){t(e),p&&(e.metadata.entry=p),g&&(e.metadata.format=e.metadata.format||"register",e.metadata.registered=!0)}}}function s(e,t,a){if(a[e.groupIndex]=a[e.groupIndex]||[],-1==v.call(a[e.groupIndex],e)){a[e.groupIndex].push(e);for(var r=0,n=e.normalizedDeps.length;n>r;r++){var o=e.normalizedDeps[r],i=t.defined[o];if(i&&!i.evaluated){var l=e.groupIndex+(i.declarative!=e.declarative);if(void 0===i.groupIndex||i.groupIndex<l){if(void 0!==i.groupIndex&&(a[i.groupIndex].splice(v.call(a[i.groupIndex],i),1),0==a[i.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");i.groupIndex=l}s(i,t,a)}}}}function l(e,t){var a=t.defined[e];if(!a.module){a.groupIndex=0;var r=[];s(a,t,r);for(var n=!!a.declarative==r.length%2,o=r.length-1;o>=0;o--){for(var i=r[o],l=0;l<i.length;l++){var u=i[l];n?d(u,t):f(u,t)}n=!n}}}function u(e){return b[e]||(b[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(e,t){if(!e.module){var a=e.module=u(e.name),r=e.module.exports,n=e.declare.call(t.global,function(e,t){a.locked=!0,r[e]=t;for(var n=0,o=a.importers.length;o>n;n++){var i=a.importers[n];if(!i.locked){var s=v.call(i.dependencies,a);i.setters[s](r)}}return a.locked=!1,t});if(a.setters=n.setters,a.execute=n.execute,!a.setters||!a.execute)throw new TypeError("Invalid System.register form for "+e.name);for(var o=0,i=e.normalizedDeps.length;i>o;o++){var s,l=e.normalizedDeps[o],c=t.defined[l],f=b[l];f?s=f.exports:c&&!c.declarative?s=c.module.exports&&c.module.exports.__esModule?c.module.exports:{"default":c.module.exports,__useDefault:!0}:c?(d(c,t),f=c.module,s=f.exports):s=t.get(l),f&&f.importers?(f.importers.push(a),a.dependencies.push(f)):a.dependencies.push(null),a.setters[o]&&a.setters[o](s)}}}function c(e,t){var a,r=t.defined[e];if(r)r.declarative?m(e,[],t):r.evaluated||f(r,t),a=r.module.exports;else if(a=t.get(e),!a)throw new Error("Unable to load dependency "+e+".");return(!r||r.declarative)&&a&&a.__useDefault?a["default"]:a}function f(e,t){if(!e.module){var a={},r=e.module={exports:a,id:e.name};if(!e.executingRequire)for(var n=0,o=e.normalizedDeps.length;o>n;n++){var i=e.normalizedDeps[n],s=t.defined[i];s&&f(s,t)}e.evaluated=!0;var l=e.execute.call(t.global,function(a){for(var r=0,n=e.deps.length;n>r;r++)if(e.deps[r]==a)return c(e.normalizedDeps[r],t);throw new TypeError("Module "+a+" not declared as a dependency.")},a,r);l&&(r.exports=l)}}function m(e,t,a){var r=a.defined[e];if(r&&!r.evaluated&&r.declarative){t.push(e);for(var n=0,o=r.normalizedDeps.length;o>n;n++){var i=r.normalizedDeps[n];-1==v.call(t,i)&&(a.defined[i]?m(i,t,a):a.get(i))}r.evaluated||(r.evaluated=!0,r.module.execute.call(a.global))}}"undefined"==typeof v&&(v=Array.prototype.indexOf),("undefined"==typeof __eval||"undefined"!=typeof document&&!document.addEventListener)&&(__eval=0||eval),e._extensions=e._extensions||[],e._extensions.push(o);e.__exec=a;var p,g;i(e);var b={},y=e["delete"];e["delete"]=function(e){return delete b[e],y.call(this,e)};var x=/System\.register/,_=e.fetch;e.fetch=function(e){var t=this;return i(t),t.defined[e.name]?(e.metadata.format="defined",""):(p=null,g=!1,_.call(t,e))};var w=e.translate;e.translate=function(e){return this.register=n,this.__exec=a,e.metadata.deps=e.metadata.deps||[],Promise.resolve(w.call(this,e)).then(function(t){return(e.metadata.init||e.metadata.exports)&&(e.metadata.format=e.metadata.format||"global"),("register"==e.metadata.format||!e.metadata.format&&e.source.match(x))&&(e.metadata.format="register"),t})};var S=e.instantiate;e.instantiate=function(e){var t,a=this;if(a.defined[e.name])t=a.defined[e.name],t.deps=t.deps.concat(e.metadata.deps);else if(e.metadata.entry)t=e.metadata.entry;else if(e.metadata.execute)t={declarative:!1,deps:e.metadata.deps||[],execute:e.metadata.execute,executingRequire:e.metadata.executingRequire};else if("register"==e.metadata.format){p=null,g=!1;var n=a.global.System;if(a.global.System=a,a.__exec(e),a.global.System=n,p?t=p:e.metadata.bundle=!0,!t&&h.defined[e.name]&&(t=h.defined[e.name]),!g&&!e.metadata.registered)throw new TypeError(e.name+" detected as System.register but didn't execute.")}if(!t&&"es6"!=e.metadata.format)return{deps:e.metadata.deps,execute:function(){return a.newModule({})}};if(!t)return S.call(this,e);a.defined[e.name]=t,t.deps=r(t.deps),t.name=e.name;for(var o=[],i=0,s=t.deps.length;s>i;i++)o.push(Promise.resolve(a.normalize(t.deps[i],e.name)));return Promise.all(o).then(function(r){return t.normalizedDeps=r,{deps:t.deps,execute:function(){l(e.name,a),m(e.name,[],a),a.defined[e.name]=void 0;var r=t.module.exports;return(!r||!t.declarative&&r.__esModule!==!0)&&(r={"default":r,__useDefault:!0}),a.newModule(r)}}})}}function i(e){function t(e,t,r,n){e.meta=e.meta||{};var o=e.meta[t]=e.meta[t]||{};if(o.format=o.format||"global",!e.paths[t]){var i=a(r,n);i&&(e.paths[t]=i)}}function a(e,t){if(d){var a=t?"/package.json":"";try{var r=d(e+a);return"file:"+r.substr(0,r.length-a.length)+(t?"/*.js":"")}catch(n){}}}e._extensions.push(i);var r,n,o=/(^\s*|[}\);\n]\s*)(import\s+(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s+from\s+['"]|\{)|export\s+\*\s+from\s+["']|export\s+(\{|default|function|class|var|const|let|async\s+function))/,s=/\$traceurRuntime\s*\./,l=/babelHelpers\s*\./,u=!0,d="undefined"!=typeof process&&"undefined"!=typeof require&&require.resolve,c=e.locate;e.locate=function(e){var a=this;return u&&("traceur"==a.transpiler?(t(a,"traceur","traceur/bin/traceur.js"),a.meta.traceur.exports="traceur",t(a,"traceur-runtime","traceur/bin/traceur-runtime.js")):"babel"==a.transpiler&&(t(a,"babel","babel-core/browser.js"),t(a,"babel/external-helpers","babel-core/external-helpers.js"),t(a,"babel-runtime/*","babel-runtime",!0)),u=!1),c.call(a,e)};var f=e.translate;e.translate=function(e){var t=this;return f.call(t,e).then(function(a){if("es6"==e.metadata.format||!e.metadata.format&&a.match(o))return e.metadata.format="es6",a;if("register"==e.metadata.format){if(!t.global.$traceurRuntime&&e.source.match(s))return t["import"]("traceur-runtime").then(function(){return a});if(!t.global.babelHelpers&&e.source.match(l))return t["import"]("babel/external-helpers").then(function(){return a})}return"traceur"==t.transpiler?Promise.all([r||(r=t.normalize(t.transpiler)),n||(n=t.normalize(t.transpiler+"-runtime"))]).then(function(t){return e.name==t[0]||e.name==t[1]?"(function() { var curSystem = System; "+a+"\nSystem = curSystem; })();":a}):a})}}function s(e){function t(e,t){for(var a=e.split(".");a.length;)t=t[a.shift()];return t}function a(t){if(Object.keys)Object.keys(e.global).forEach(t);else for(var a in e.global)i.call(e.global,a)&&t(a)}function r(t){a(function(a){if(-1==v.call(o,a)){try{var r=e.global[a]}catch(n){o.push(a)}t(a,r)}})}function n(e){if(!e.has("@@global-helpers")){var a,n={};e.set("@@global-helpers",e.newModule({prepareGlobal:function(t,o){for(var i=0;i<o.length;i++){var s=n[o[i]];if(s)for(var l in s)e.global[l]=s[l]}a={},r(function(e,t){a[e]=t})},retrieveGlobal:function(o,i,s){var l,u,d={};if(s)l=s.call(e.global);else if(i){var c=i.split(".")[0];l=t(i,e.global),d[c]=e.global[c]}else r(function(e,t){a[e]!==t&&"undefined"!=typeof t&&(d[e]=t,"undefined"!=typeof l?u||l===t||(u=!0):l=t)});return n[o]=d,u?d:l}}))}}e._extensions.push(s);var o=["sessionStorage","localStorage","clipboardData","frames","external"],i=Object.prototype.hasOwnProperty;n(e);var l=e.instantiate;e.instantiate=function(e){var t=this;n(t);var a=e.metadata.exports;return e.metadata.format||(e.metadata.format="global"),"global"==e.metadata.format&&(e.metadata.execute=function(r,n,o){t.get("@@global-helpers").prepareGlobal(o.id,e.metadata.deps),a&&(e.source+=$__globalName+'["'+a+'"] = '+a+";");var i=t.global.define,r=t.global.require;return t.global.define=void 0,t.global.module=void 0,t.global.exports=void 0,t.__exec(e),t.global.require=r,t.global.define=i,t.get("@@global-helpers").retrieveGlobal(o.id,a,e.metadata.init)}),l.call(t,e)}}function l(e){function t(e){r.lastIndex=0;var t=[];e.length/e.split("\n").length<200&&(e=e.replace(n,""));for(var a;a=r.exec(e);)t.push(a[1].substr(1,a[1].length-2));return t}e._extensions.push(l);var a=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.]|module\.)exports\s*(\[['"]|\.)|(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])module\.exports\s*[=,]/,r=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g,n=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm;if("undefined"!=typeof location&&location.origin)var o=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");var i=e.instantiate;e.instantiate=function(n){return n.metadata.format||(a.lastIndex=0,r.lastIndex=0,(r.exec(n.source)||a.exec(n.source))&&(n.metadata.format="cjs")),"cjs"==n.metadata.format&&(n.metadata.deps=n.metadata.deps?n.metadata.deps.concat(t(n.source)):t(n.source),n.metadata.executingRequire=!0,n.metadata.execute=function(t,a,r){var i=(n.address||"").split("/");i.pop(),i=i.join("/");var s=n.address;o&&s.substr(0,o.length)===o?(s=s.substr(o.length),i=i.substr(o.length)):"file:"==s.substr(0,5)&&(s=s.substr(5),i=i.substr(5)),h._nodeRequire&&(i=i.substr(5));var l=(e.global._g={global:e.global,exports:a,module:r,require:t,__filename:s,__dirname:i},"(function(global, exports, module, require, __filename, __dirname) { "+n.source+"\n}).call(_g.exports, _g.global, _g.exports, _g.module, _g.require, _g.__filename, _g.__dirname);"),u=e.global.define;e.global.define=void 0,e.__exec({name:n.name,address:n.address,source:l}),e.global.define=u,e.global._g=void 0}),i.call(this,n)}}function u(e){function t(e,t){e=e.replace(c,"");var a=e.match(p),r=(a[1].split(",")[t]||"require").replace(g,""),n=b[r]||(b[r]=new RegExp(f+r+m,"g"));n.lastIndex=0;for(var o,i=[];o=n.exec(e);)i.push(o[2]||o[3]);return i}function a(e,t,r,n){var o=this;if("object"==typeof e&&!(e instanceof Array))return a.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if(!(e instanceof Array)){if("string"==typeof e){var i=o.get(e);return i.__useDefault?i["default"]:i}throw new TypeError("Invalid require")}for(var s=[],l=0;l<e.length;l++)s.push(o["import"](e[l],n));Promise.all(s).then(function(e){t&&t.apply(null,e)},r)}function r(e,t,r){return function(n,o,i){if("string"==typeof n){if("function"!=typeof o)return t(n);n=[n]}return a.call(r,n,o,i,{name:e})}}function n(e){function a(a,n,o){"string"!=typeof a&&(o=n,n=a,a=null),n instanceof Array||(o=n,n=["require","exports","module"]),"function"!=typeof o&&(o=function(e){return function(){return e}}(o)),void 0===n[n.length-1]&&n.pop();var i,l,u;if(-1!=(i=v.call(n,"require"))){n.splice(i,1);var d=o.toString();n=n.concat(t(d,i))}-1!=(l=v.call(n,"exports"))&&n.splice(l,1),-1!=(u=v.call(n,"module"))&&n.splice(u,1);var c={deps:n,execute:function(t,a,d){for(var c=[],f=0;f<n.length;f++)c.push(t(n[f]));d.uri=e.baseURL+d.id,d.config=function(){},-1!=u&&c.splice(u,0,d),-1!=l&&c.splice(l,0,a),-1!=i&&c.splice(i,0,r(d.id,t,e));var m=s.require;s.require=h.amdRequire;var p=o.apply(s,c);return s.require=m,"undefined"==typeof p&&d&&(p=d.exports),"undefined"!=typeof p?p:void 0}};if(a)y=0!=n.length||y||x?null:c,x=!0,e.register(a,c.deps,!1,c.execute);else{if(y)throw new TypeError("Multiple defines for anonymous module");y=c}}var n=e.onScriptLoad;e.onScriptLoad=function(e){n(e),(y||x)&&(e.metadata.format="defined",e.metadata.registered=!0),y&&(e.metadata.deps=e.metadata.deps?e.metadata.deps.concat(y.deps):y.deps,e.metadata.execute=y.execute)},a.amd={},e.amdDefine=a}function o(e){e.amdDefine||n(e),y=null,x=null;var t=e.global;_=t.module,w=t.exports,S=t.define,t.module=void 0,t.exports=void 0,t.define&&t.define===e.amdDefine||(t.define=e.amdDefine)}function i(e){var t=e.global;t.define=S,t.module=_,t.exports=w}var l="undefined"!=typeof module&&module.exports;e._extensions.push(u);var d=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/,c=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,f="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",m="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",p=/\(([^\)]*)\)/,g=/^\s+|\s+$/g,b={};e.amdRequire=function(){return a.apply(this,arguments)};var y,x,_,w,S;if(n(e),e.scriptLoader){var z=e.fetch;e.fetch=function(e){return o(this),z.call(this,e)}}var $=e.instantiate;e.instantiate=function(e){var t=this;if("amd"==e.metadata.format||!e.metadata.format&&e.source.match(d)){if(e.metadata.format="amd",t.execute!==!1&&(o(t),t.__exec(e),i(t),!y&&!x&&!l))throw new TypeError("AMD module "+e.name+" did not define");y&&(e.metadata.deps=e.metadata.deps?e.metadata.deps.concat(y.deps):y.deps,e.metadata.execute=y.execute)}return $.call(t,e)}}function d(e){function t(e,t){return e.length<t.length?!1:e.substr(0,t.length)!=t?!1:e[t.length]&&"/"!=e[t.length]?!1:!0}function a(e){for(var t=1,a=0,r=e.length;r>a;a++)"/"===e[a]&&t++;return t}function r(e,t,a){return a+e.substr(t)}function n(e,n,o){var i,s,l,u,d=0,c=0;if(n)for(var f in o.map){var m=o.map[f];if("object"==typeof m&&t(n,f)&&(l=a(f),!(c>=l)))for(var p in m)t(e,p)&&(u=a(p),d>=u||(i=p,d=u,s=f,c=l))}if(i)return r(e,i.length,o.map[s][i]);for(var f in o.map){var m=o.map[f];if("string"==typeof m&&t(e,f)){var u=a(f);d>=u||(i=f,d=u)}}return i?r(e,i.length,o.map[i]):e}e.map=e.map||{},e._extensions.push(d);var o=e.normalize;e.normalize=function(e,t,a){var r=this;r.map||(r.map={});var i=!1;return"/"==e.substr(e.length-1,1)&&(i=!0,e+="#"),Promise.resolve(o.call(r,e,t,a)).then(function(e){if(e=n(e,t,r),i){var a=e.split("/");a.pop();var o=a.pop();a.push(o),a.push(o),e=a.join("/")}return e})}}function c(e){"undefined"==typeof v&&(v=Array.prototype.indexOf),e._extensions.push(c);var t=e.normalize;e.normalize=function(e,a,r){var n,o=this;return a&&-1!=(n=a.indexOf("!"))&&(a=a.substr(0,n)),Promise.resolve(t.call(o,e,a,r)).then(function(e){var t=e.lastIndexOf("!");if(-1!=t){var n=e.substr(0,t),i=e.substr(t+1)||n.substr(n.lastIndexOf(".")+1);return new Promise(function(e){e(o.normalize(i,a,r))}).then(function(e){return i=e,o.normalize(n,a,r)}).then(function(e){return e+"!"+i})}return e})};var a=e.locate;e.locate=function(e){var t=this,r=e.name;if(this.defined&&this.defined[r])return a.call(this,e);var n=r.lastIndexOf("!");if(-1!=n){var o=r.substr(n+1);e.name=r.substr(0,n);var i=t.pluginLoader||t;return i["import"](o).then(function(){var a=i.get(o);return a=a["default"]||a,a.build===!1&&t.pluginLoader&&(e.metadata.build=!1),e.metadata.plugin=a,e.metadata.pluginName=o,e.metadata.pluginArgument=e.name,a.locate?a.locate.call(t,e):Promise.resolve(t.locate(e)).then(function(e){return e.replace(/\.js$/,"")})})}return a.call(this,e)};var r=e.fetch;e.fetch=function(e){var t=this;return e.metadata.build===!1&&t.pluginLoader?"":e.metadata.plugin&&e.metadata.plugin.fetch&&!e.metadata.pluginFetchCalled?(e.metadata.pluginFetchCalled=!0,e.metadata.plugin.fetch.call(t,e,r)):r.call(t,e)};var n=e.translate;e.translate=function(e){var t=this;return e.metadata.plugin&&e.metadata.plugin.translate?Promise.resolve(e.metadata.plugin.translate.call(t,e)).then(function(a){return"string"==typeof a&&(e.source=a),n.call(t,e)}):n.call(t,e)};var o=e.instantiate;e.instantiate=function(e){var t=this;return e.metadata.plugin&&e.metadata.plugin.instantiate?Promise.resolve(e.metadata.plugin.instantiate.call(t,e)).then(function(a){return e.metadata.format="defined",e.metadata.execute=function(){return a},o.call(t,e)}):e.metadata.plugin&&e.metadata.plugin.build===!1?(e.metadata.format="defined",e.metadata.deps.push(e.metadata.pluginName),e.metadata.execute=function(){return t.newModule({})},o.call(t,e)):o.call(t,e)}}function f(e){function t(e,t){return Promise.resolve(e.normalize(t)).then(function(r){return-1==v.call(a,r)&&(a.push(r),e.bundles[r]=e.bundles[r]||e.bundles[t],e.meta=e.meta||{},e.meta[r]=e.meta[r]||{},e.meta[r].bundle=!0),e.load(r)}).then(function(){return""})}"undefined"==typeof v&&(v=Array.prototype.indexOf),e._extensions.push(f),e.bundles=e.bundles||{};var a=[],r=e.fetch;e.fetch=function(e){var n=this;if(n.trace)return r.call(this,e);n.bundles||(n.bundles={});for(var o=0;o<a.length;o++)if(-1!=v.call(n.bundles[a[o]],e.name))return t(n,a[o]);for(var i in n.bundles)if(-1!=v.call(n.bundles[i],e.name))return t(n,i);return r.call(this,e)}}function m(e){function t(e){return parseInt(e,10)}function a(e){var a=e.match(s);return a?{major:t(a[1]),minor:t(a[2]),patch:t(a[3]),pre:a[4]&&a[4].split(".")}:{tag:e}}function r(e,a){if(e.tag&&a.tag)return 0;if(e.tag)return-1;if(a.tag)return 1;for(var r=0;r<u.length;r++){var n=u[r],o=e[n],i=a[n];if(o!=i)return isNaN(o)?-1:isNaN(i)?1:o>i?1:-1}if(!e.pre&&!a.pre)return 0;if(!e.pre)return 1;if(!a.pre)return-1;for(var r=0,s=Math.min(e.pre.length,a.pre.length);s>r;r++)if(e.pre[r]!=a.pre[r]){var d=e.pre[r].match(l),c=a.pre[r].match(l);return d&&!c?-1:c&&!d?1:d&&c?t(e.pre[r])>t(a.pre[r])?1:-1:e.pre[r]>a.pre[r]?1:-1}return e.pre.length==a.pre.length?0:e.pre.length>a.pre.length?1:-1}function n(e,t){var a=e.version;return a.tag?a.tag==t.tag:1==r(a,t)?!1:isNaN(t.minor)||isNaN(t.patch)?!1:t.pre?a.major!=t.major||a.minor!=t.minor||a.patch!=t.patch?!1:e.semver||e.fuzzy||a.pre.join(".")==t.pre.join("."):e.semver?0==a.major&&isNaN(a.minor)?t.major<1:a.major>=1?a.major==t.major:a.minor>=1?a.minor==t.minor:(a.patch||0)==t.patch:e.fuzzy?t.major==a.major&&t.minor<(a.minor||0)+1:!a.pre&&a.major==t.major&&a.minor==t.minor&&a.patch==t.patch}function o(e){var t={};((t.semver="^"==e.substr(0,1))||(t.fuzzy="~"==e.substr(0,1)))&&(e=e.substr(1));var r=t.version=a(e);return r.tag?t:(t.fuzzy||t.semver||!isNaN(r.minor)&&!isNaN(r.patch)||(t.fuzzy=!0),t.fuzzy&&isNaN(r.minor)&&(t.semver=!0,t.fuzzy=!1),t.semver&&!isNaN(r.minor)&&isNaN(r.patch)&&(t.semver=!1,t.fuzzy=!0),t)}function i(e,t){return r(a(e),a(t))}"undefined"==typeof v&&(v=Array.prototype.indexOf),e._extensions.push(m);var s=/^(\d+)(?:\.(\d+)(?:\.(\d+)(?:-([\da-z-]+(?:\.[\da-z-]+)*)(?:\+([\da-z-]+(?:\.[\da-z-]+)*))?)?)?)?$/i,l=/^\d+$/,u=["major","minor","patch"];e.versions=e.versions||{};var d=e.normalize;e.normalize=function(e,t,r){this.versions||(this.versions={});var s,l,u=this.versions,c=-1!=e.indexOf("!")?0:e.lastIndexOf("@");if(c>0){var f=e.substr(c+1,e.length-c-1).split("/");s=f[0],l=f.length,e=e.substr(0,c)+e.substr(c+s.length+1,e.length-c-s.length-1)}return Promise.resolve(d.call(this,e,t,r)).then(function(e){var t=-1!=e.indexOf("!")?0:e.indexOf("@");if(s&&(-1==t||0==t)){var r=e.split("/");r[r.length-l]+="@"+s,e=r.join("/"),t=e.indexOf("@")}var d,c;if(-1==t||0==t){for(var f in u)if(c=u[f],e.substr(0,f.length)==f&&(d=e.substr(f.length,1),!d||"/"==d))return f+"@"+("string"==typeof c?c:c[c.length-1])+e.substr(f.length);return e}var m=e.substr(0,t),p=e.substr(t+1).split("/")[0],h=p.length,v=o(e.substr(t+1).split("/")[0]);c=u[e.substr(0,t)]||[],"string"==typeof c&&(c=[c]);for(var g=c.length-1;g>=0;g--)if(n(v,a(c[g])))return m+"@"+c[g]+e.substr(t+h+1);var b;return v.semver?b=0!=v.version.major||isNaN(v.version.minor)?v.version.major:"0."+v.version.minor:v.fuzzy?b=v.version.major+"."+v.version.minor:(b=p,c.push(p),c.sort(i),u[m]=1==c.length?c[0]:c),m+"@"+b+e.substr(t+h+1)})}}function p(e){e.depCache=e.depCache||{},e._extensions.push(p);var t=e.locate;e.locate=function(e){var a=this;a.depCache||(a.depCache={});var r=a.depCache[e.name];if(r)for(var n=0;n<r.length;n++)a.load(r[n]);return t.call(a,e)}}$__global.upgradeSystemLoader=void 0;var h,v=Array.prototype.indexOf||function(e){for(var t=0,a=this.length;a>t;t++)if(this[t]===e)return t;return-1},g="undefined"!=typeof process&&!!process.platform.match(/^win/);!function(){var e=$__global.System;h=$__global.System=new LoaderPolyfill(e),h.baseURL=e.baseURL,h.paths={"*":"*.js"},h.originalSystem=e}(),h.noConflict=function(){$__global.SystemJS=h,$__global.System=h.originalSystem};var b=$__global.System.originalSystem;a(h),r(h),n(h),o(h),i(h),s(h),l(h),u(h),d(h),c(h),f(h),m(h),p(h)};var $__curScript,__eval;!function(){var doEval;if(__eval=function(e,t,a){e+="\n//# sourceURL="+t+(a?"\n//# sourceMappingURL="+a:"");try{doEval(e)}catch(r){var n="Error evaluating "+t+"\n";throw r instanceof Error?r.message=n+r.message:r=n+r,r}},"undefined"!=typeof document){var head,scripts=document.getElementsByTagName("script");if($__curScript=scripts[scripts.length-1],doEval=function(e){head||(head=document.head||document.body||document.documentElement);var t=document.createElement("script");t.text=e;var a,r=window.onerror;if(window.onerror=function(e){a=e},head.appendChild(t),head.removeChild(t),window.onerror=r,a)throw a},$__global.System&&$__global.LoaderPolyfill)$__global.upgradeSystemLoader();else{var curPath=$__curScript.src,basePath=curPath.substr(0,curPath.lastIndexOf("/")+1);document.write('<script type="text/javascript" src="'+basePath+'es6-module-loader.js" data-init="upgradeSystemLoader"></script>')}}else if("undefined"!=typeof importScripts)if(doEval=function(source){try{eval(source)}catch(e){throw e}},$__global.System&&$__global.LoaderPolyfill)$__global.upgradeSystemLoader();else{var basePath="";try{throw new Error("Get worker base path via error stack")}catch(e){e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/,function(e,t){basePath=t.replace(/\/[^\/]*$/,"/")})}importScripts(basePath+"es6-module-loader.js"),$__global.upgradeSystemLoader()}else{var es6ModuleLoader=require("es6-module-loader");$__global.System=es6ModuleLoader.System,$__global.Loader=es6ModuleLoader.Loader,$__global.upgradeSystemLoader(),module.exports=$__global.System;var vm=require("vm");doEval=function(e){vm.runInThisContext(e)}}}()}("undefined"!=typeof window?window:"undefined"!=typeof global?global:self,"undefined"!=typeof window?"window":"undefined"!=typeof global?"global":"self");
//# sourceMappingURL=system-csp.js.map