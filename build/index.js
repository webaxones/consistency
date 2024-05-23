(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var s in n)e.o(n,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:n[s]})}};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);const t=window.wp.plugins,n=window.wp.data,s=window.wp.domReady;var o=e.n(s);const c=window.React,r=window.wp.i18n,a=window.wp.editPost,i=window.wp.components,l=()=>(0,c.createElement)(i.Icon,{icon:(0,c.createElement)("svg",{version:"1.1",id:"consistency-plugin",x:"0px",y:"0px",width:"24px",height:"24px",viewBox:"0 0 24 24",enableBackground:"new 0 0 24 24"},(0,c.createElement)("line",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",x1:"4",y1:"20",x2:"7",y2:"20"}),(0,c.createElement)("line",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",x1:"14",y1:"20",x2:"21",y2:"20"}),(0,c.createElement)("line",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",x1:"6.9",y1:"15",x2:"13.8",y2:"15"}),(0,c.createElement)("line",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",x1:"10.2",y1:"6.3",x2:"16",y2:"20"}),(0,c.createElement)("polyline",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",points:"5,20 11,4 13,4 20,20 "}))}),d=window.wp.coreData,p=window.wp.notices,u=e=>{const{settingSlug:t,settingName:s,settingDescription:o}=e,{currentUser:a}=(0,n.useSelect)((e=>({currentUser:e(d.store).getCurrentUser()})),[]),l=a&&a.id,[u,_]=(0,d.useEntityProp)("root","user","meta",l),{saveEditedEntityRecord:g}=(0,n.useDispatch)(d.store),{createNotice:y}=(0,n.useDispatch)(p.store);return(0,c.createElement)(i.ToggleControl,{label:s,help:(0,c.createElement)("span",{dangerouslySetInnerHTML:o}),checked:u?.consistency_plugin_user_settings?.find((e=>e.slug===t))?.value||!1,onChange:e=>{let n=u?.consistency_plugin_user_settings.map((n=>t===n.slug?{...n,value:e}:n));n?.find((e=>e.slug===t))||n.push({slug:t,value:e}),_({...u,consistency_plugin_user_settings:n}),g("root","user",l,{...u,meta:n}),y((0,r.__)("info","consistency"),e?sprintf((0,r.__)('"%1$s" Correction is enabled',"consistency"),s):sprintf((0,r.__)('"%1$s" Correction is disabled',"consistency"),s),{isDismissible:!0,type:"snackbar",speak:!0})}})},_=()=>(0,c.createElement)(i.Panel,{className:"UserSettingPanel"},(0,c.createElement)(i.PanelHeader,null,(0,c.createElement)("strong",null,(0,r.__)("Settings for my account","consistency"))),(0,c.createElement)("div",{style:{padding:16}},(0,c.createElement)(i.PanelRow,null,(0,c.createElement)(u,{settingSlug:"on_the_fly",settingName:(0,r.__)("On-the-fly autocorrect","consistency"),settingDescription:{__html:(0,r.__)("Enable/disable on-the-fly autocorrect for my account","consistency")}})),(0,c.createElement)(i.PanelRow,null,(0,c.createElement)(u,{settingSlug:"on_paste",settingName:(0,r.__)("On paste autocorrect","consistency"),settingDescription:{__html:(0,r.__)("Enable/disable autocorrect on paste for my account","consistency")}})))),{getEntityRecord:g}=(0,n.select)("core"),y=[{slug:"quote",name:(0,r.__)("Straight quote","consistency"),description:(0,r.__)("Replaces straight quotes with curved quotes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>'</code> <span style='font-size:20px'>→</span> <code>’</code></span>",mask:/\'/,replace:"’",nbMoved:0,locales:["fr_FR","fr_BE","en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB"],category:"punctuation"},{slug:"2hyphens",name:(0,r.__)("Two hyphens","consistency"),description:(0,r.__)("Replaces 2 hyphens with em dash:","consistency")+"<span aria-hidden='true' style='display:block;'><code>--</code> <span style='font-size:20px'>→</span> <code>—</code></span>",mask:/(?:\-)\-/,replace:"—",nbMoved:-1,locales:["fr_FR","fr_BE","en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB","de_DE","de_AT","de_CH","ro_RO"],category:"punctuation"},{slug:"ordinalNumberSuffix",name:(0,r.__)("Ordinal number suffix","consistency"),description:(0,r.__)("Add HTML tag sup to ordinal number suffix","consistency")+"<span aria-hidden='true' style='display:block;'><code>1st</code> <span style='font-size:20px'>→</span> <code>1<sup>st</sup></code></span>",mask:/([10-9]{1,20})(th|nd|rd|e|er|res|d|ds|de|des)( | |\.|\,|\;)/,replace:"$1<sup>$2</sup>$3",nbMoved:0,locales:["fr_FR","fr_BE","en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB"],category:"punctuation"},{slug:"regularToCurlyQuotes",name:(0,r.__)("Curly quotes","consistency"),description:(0,r.__)("Replaces regular quotes with curly quotes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>“ ”</code></span>",mask:/"/,replace:"“$1”",nbMoved:0,locales:["en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB"],category:"punctuation"},{slug:"regularToGermanQuotes",name:(0,r.__)("Regular quotes to german","consistency"),description:(0,r.__)("Replaces regular quotes with german quotes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>„ “</code></span>",mask:/"/,replace:"„$1“",nbMoved:0,locales:["de_DE","de_AT","ro_RO"],category:"punctuation"},{slug:"regularToGermanBookStyleQuotes",name:(0,r.__)("Regular quotes to german book-style quotes","consistency"),description:(0,r.__)("Replaces regular quotes with german book-style quotes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>» «</code></span>",mask:/"/,replace:"»$1«",nbMoved:0,locales:["de_DE","de_AT"],category:"punctuation"},{slug:"regularToFrenchQuotes",name:(0,r.__)("Regular quotes to french","consistency"),description:(0,r.__)("Replaces regular quotes with french quotes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>« »</code></span>",mask:/"/,replace:"« $1 »",nbMoved:1,locales:["fr_FR","fr_BE"],category:"punctuation"},{slug:"regularToFrenchQuotesWithoutSpaces",name:(0,r.__)("Regular quotes to french quotes without spaces","consistency"),description:(0,r.__)("Replaces regular quotes with french quotes without spaces:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>« »</code></span>",mask:/"/,replace:"«$1»",nbMoved:0,locales:["de_CH"],category:"punctuation"},{slug:"curlyToFrenchQuotes",name:(0,r.__)("Curly quotes to french quotes","consistency"),description:(0,r.__)("Replaces curly quotes with french quotes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>“ ”</code> <span style='font-size:20px'>→</span> <code>« »</code></span>",mask:/“.*?”/,replace:e=>`« ${e.substring(1,e.length-1)} »`,nbMoved:0,locales:["fr_FR","fr_BE"],category:"punctuation"},{slug:"breakingSpace",name:(0,r.__)("Breaking space","consistency"),description:sprintf((0,r.__)("Replaces a breaking space followed by a character from this list:%1$s with a non-breaking space","consistency"),"<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />"),mask:/ ([\?|\!|\:|\;|»|€|\$|£|¥|₽|元|\%])/,replace:" $1",nbMoved:0,locales:["fr_FR","fr_BE"],category:"space"},{slug:"noSpaceBefore",name:(0,r.__)("No space before","consistency"),description:sprintf((0,r.__)("Adds a non-breaking space before a character from this list:%1$s having no space before","consistency"),"<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />"),mask:/(?<! | |&nbsp;)([\?|\!|\:|»|€|\$|£|¥|₽|元|\%])/,replace:" $1",nbMoved:1,locales:["fr_FR","fr_BE"],category:"space"},{slug:"spaceBefore",name:(0,r.__)("Space before","consistency"),description:(0,r.__)("Remove any space preceding a character from this list:","consistency")+"<span style='display:block;'><code>? ! : ; %</code></span>",mask:/([ | ])(?=[\?|\!|\:|\;|\%])/,replace:"",nbMoved:-1,locales:["en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB","de_DE","de_AT","de_CH","ro_RO"],category:"space"},{slug:"noBreakingSpaceAfter",name:(0,r.__)("No breaking space after","consistency"),description:sprintf((0,r.__)("Adds a breaking space after a character from this list:%1$s when followed with another character","consistency"),"<br /><code>, … ) ]</code><br />"),mask:/([\,|…|\)|\]])(?! | |\.|\,|\d|$)(.)/,replace:"$1 $2",nbMoved:1,locales:["fr_FR","fr_BE","en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB"],category:"space"},{slug:"noNonBreakingSpaceAfter",name:(0,r.__)("No non breaking space after","consistency"),description:(0,r.__)("Adds a non-breaking space after open french quote having no space after","consistency"),mask:/(«)(?! | |&nbsp;)/,replace:"$1 ",nbMoved:0,locales:["fr_FR","fr_BE"],category:"space"},{slug:"capitalizeFirstSentenceLetter",name:(0,r.__)("First sentence letter not capitalized","consistency"),description:(0,r.__)("Capitalize the first letter of a sentence","consistency"),mask:/(^[a-záàâäãåăçéèêëíìîïñóòôöõúùûüýÿæœșț])|(?<=[\.|\?|\!|…] )[a-záàâäãåăçéèêëíìîïñóòôöõúùûüýÿæœșț]/,replace:e=>e.toUpperCase(),nbMoved:0,locales:["fr_FR","fr_BE","en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB","de_DE","de_AT","de_CH","ro_RO"],category:"case"},{slug:"etcThreeDots",name:(0,r.__)('3 dots following "etc"',"consistency"),description:(0,r.__)('Replaces 3 dots placed after the abbreviation "etc" with a point:',"consistency")+"<span aria-hidden='true' style='display:block;'><code>etc...</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>",mask:/etc(\.{3})/i,replace:e=>e.substring(0,3)+".",nbMoved:-2,locales:["fr_FR","fr_BE"],category:"ellipsis"},{slug:"etcTwoDots",name:(0,r.__)('2 dots following "etc"',"consistency"),description:(0,r.__)('Replaces 2 dots placed after the abbreviation "etc" with a point:',"consistency")+"<span aria-hidden='true' style='display:block;'><code>etc..</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>",mask:/etc(\.{2})/i,replace:e=>e.substring(0,2)+".",nbMoved:-1,locales:["en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB"],category:"ellipsis"},{slug:"etcEllipsis",name:(0,r.__)('ellipsis following "etc"',"consistency"),description:(0,r.__)('Replaces ellipsis placed after the abbreviation "etc" with a point:',"consistency")+"<span aria-hidden='true' style='display:block;'><code>etc…</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>",mask:/etc(\.{3}|…)/i,replace:e=>e.substring(0,3)+".",nbMoved:0,locales:["fr_FR","fr_BE"],category:"ellipsis"},{slug:"ellipsis",name:(0,r.__)("Ellipsis","consistency"),description:(0,r.__)("Replaces 3 dots with ellipsis:","consistency")+"<span aria-hidden='true' style='display:block;'><code>...</code> <span style='font-size:20px'>→</span> <code>…</code></span>",mask:/\.{3}/,replace:"…",nbMoved:-2,locales:["fr_FR","fr_BE","en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB","de_DE","de_AT","de_CH","ro_RO"],category:"ellipsis"},{slug:"symbolBasedOn1Character",name:(0,r.__)("Symbol based on 1 character","consistency"),description:(0,r.__)("Replaces 1 character placed in parentheses with a symbol","consistency")+"<span aria-hidden='true' style='display:block;'><code>(c) (p) (r)</code> <span style='font-size:20px'>→</span> <code>© ℗ ®</code></span>",mask:/(\([c|p|r])(\))/,replace:e=>{switch(e[1]){case"c":return"©";case"p":return"℗";case"r":return"®"}return" "},nbMoved:-2,locales:["fr_FR","fr_BE","en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB","de_DE","de_AT","de_CH","ro_RO"],category:"symbol"},{slug:"symbolBasedOn2Characters",name:(0,r.__)("Symbol based on 2 characters","consistency"),description:(0,r.__)("Replaces 2-character abbreviations in parentheses with a symbol","consistency")+"<span aria-hidden='true' style='display:block;'><code>(tm) (sm) (md) (mc)</code> <span style='font-size:20px'>→</span> <code>™ ℠ 🅫 🅪</code></span>",mask:/(\(tm|\(sm|\(md|\(mc)(\))/,replace:e=>{switch(e){case"(tm)":return"™";case"(sm)":return"℠";case"(md)":return"🅫";case"(mc)":return"🅪";default:return" "}},nbMoved:-3,locales:["fr_FR","fr_BE","en_US","en_AU","en_CA","en_NZ","en_ZA","en_GB","de_DE","de_AT","de_CH","ro_RO"],category:"symbol"}],m=["regularToCurlyQuotes","regularToFrenchQuotes","regularToFrenchQuotesWithoutSpaces","regularToGermanQuotes","regularToGermanBookStyleQuotes"],b=["core/paragraph","core/heading","core/quote","core/list-item","core/read-more"],{getBlock:h}=(0,n.select)("core/block-editor"),{updateBlock:f}=(0,n.dispatch)("core/block-editor"),{getBlockName:k,getBlockAttributes:v}=(0,n.select)("core/block-editor"),w=e=>{const t=(()=>{const e=g("root","site");return e?.language||"en_US"})(),n=y?.find((t=>t.slug===e));return!(void 0===n||!n?.locales?.includes(t))},E=e=>{const{settingSlug:t,settingName:s,settingDescription:o}=e;if(!w(t))return"";const[a,l]=(0,d.useEntityProp)("root","site","consistency_plugin_settings",void 0),{saveEditedEntityRecord:u}=(0,n.useDispatch)(d.store),{createNotice:_}=(0,n.useDispatch)(p.store);return(0,c.createElement)(i.PanelRow,null,(0,c.createElement)(i.ToggleControl,{label:s,help:(0,c.createElement)("span",{dangerouslySetInnerHTML:o}),checked:a?.find((e=>e.slug===t))?.value||!1,onChange:e=>{let n=a.map((n=>t===n.slug?{...n,value:e}:n));n?.find((e=>e.slug===t))||n.push({slug:t,value:e}),l(n),u("root","site",void 0,n),_((0,r.__)("info","consistency"),e?sprintf((0,r.__)('"%1$s" Correction is enabled',"consistency"),s):sprintf((0,r.__)('"%1$s" Correction is disabled',"consistency"),s),{isDismissible:!0,type:"snackbar",speak:!0})}}))},C=[{slug:"punctuation",label:(0,r.__)("Punctuation","consistency"),description:(0,r.__)("Fixes related to punctuation.","consistency")},{slug:"space",label:(0,r.__)("Spaces","consistency"),description:(0,r.__)("Fixes related to spaces.","consistency")},{slug:"case",label:(0,r.__)("Case","consistency"),description:(0,r.__)("Fixes related to case.","consistency")},{slug:"ellipsis",label:(0,r.__)("Ellipsis","consistency"),description:(0,r.__)("Fixes related to ellipsis.","consistency")},{slug:"symbol",label:(0,r.__)("Symbols","consistency"),description:(0,r.__)("Fixes related to symbols.","consistency")}],A=()=>(0,c.createElement)(i.Panel,{className:"GlobalSettingPanel"},(0,c.createElement)(i.PanelHeader,null,(0,c.createElement)("strong",null,(0,r.__)("Global correction rules","consistency"))),[...C].map(((e,t)=>(0,c.createElement)(i.PanelBody,{key:t,title:(0,r.__)(e.label,"consistency"),initialOpen:!1},[...y].filter((t=>t.category===e.slug)).map(((e,t)=>(0,c.createElement)(E,{key:t,settingSlug:e.slug,settingName:e.name,settingDescription:{__html:e.description}}))))))),{canUser:R}=(0,n.select)("core"),{getBlock:x,getBlocks:B,getBlockAttributes:S,getSelectionStart:F,isTyping:M}=(0,n.select)("core/block-editor"),{updateBlock:T,selectionChange:P,updateBlockAttributes:$}=(0,n.dispatch)("core/block-editor"),q=t=>{const{currentBlockId:n,isPasting:s,settings:o}=t;let c=y.filter((e=>!0===o?.find((t=>t.slug===e.slug))?.value));const r=x(n);if(!(e=>{const t=k(e);return!!b.includes(t)})(n)||!(e=>{const t=v(e);return!(!t||!t.hasOwnProperty("content")||""===t.content)})(n))return;let a=S(n),i=!1;Object.entries(c).forEach((([t,o])=>{if(!w(o.slug)||i)return;e.g.consistencyLoop++,(t=>{e.g.consistencyLoop>=100&&(t=>{const n=h(t);f(t,{...n,attributes:{...n.attributes,content:n.attributes.content.slice(-2)}}),e.g.consistency_loop=0,console.log("Consistency - a memory leak has occured during the fix of the following block:",n)})(t)})(n);let c,l=o.replace,d="",p="",u=0,_=a.content,g=(e=>e.replace(/<\b(code|pre|kbd)\b>.*?<\/\b(code|pre|kbd)\b>/gi,"").replace(/(<([^>]+)>)/gi,""))(_),y=!1;if(M()||(y=o.mask.test(g)),M()){c=F(r.name),u=c?.offset||0;const e=(e=>{const t=document.querySelector(`#block-${e}`);if(null===t)return;const n=document.getSelection(),s=n?.getRangeAt(0);if(!s.collapsed)return;const o=s.cloneRange(),c=document.createTextNode("\0");o.insertNode(c);let r=t?.innerHTML?.indexOf("\0");c.parentNode.removeChild(c),t.normalize();const a=(t?.innerHTML.match(/&nbsp;/g)||[]).length;return a>0&&(r=r-6*a+a),r})(n)||u,t=g.match(o.mask);if(null===t||0===t.length)return;const s=t[0].length||1;d=_.substring(0,e-s),p=_.substring(e-s,_.length),y=o.mask.test(g)&&o.mask.test(p)}y&&((e=>!!m.includes(e.slug))(o)&&(l=((e,t,n)=>{const s=e.replace.charAt(0),o=e.replace.charAt(e.replace.length-1),c=e.replace.substring(1,e.replace.indexOf("$"))||"";let r="";0!==[...e.replace.matchAll(/[0-9]/g)].length&&(r=e.replace.substring([...e.replace.matchAll(/[0-9]/g)].pop().index+1,e.replace.length-1));const a=new RegExp(`${s}`,"g"),i=new RegExp(`${o}`,"g");return(t.match(a)||[]).length===(t.match(i)||[]).length?s+c:r+o})(o,_)),0!==u&&(_=d+p.replace(o.mask,l)),0===u&&(_=_.replace(o.mask,o.replace)),e.g.previousFixCanceled?e.g.previousFixCanceled=!1:(e.g.previousFixCanceled||(T(n,{...r,attributes:{...r.attributes,content:_}}),i=!0),0===u||s||(o.nbMoved<0&&P(n,c.attributeKey,u+o.nbMoved,u+o.nbMoved),o.nbMoved>0&&P(n,c.attributeKey,u+1+o.nbMoved,u+o.nbMoved),0===o.nbMoved&&P(n,c.attributeKey,u,u))))})),e.g.consistencyLoop=0},{getSelectedBlockClientId:U,isTyping:N,getBlockAttributes:O}=(0,n.select)("core/block-editor");(0,t.registerPlugin)("consistency-custom-sidebar",{render:()=>{const e=R("create","users");return(0,c.createElement)(c.Fragment,null,(0,c.createElement)(a.PluginSidebar,{name:"consistency-custom-sidebar",title:(0,r.__)("Consistency","consistency"),icon:l},(0,c.createElement)(_,null),e&&(0,c.createElement)(A,null)),(0,c.createElement)(a.PluginSidebarMoreMenuItem,{target:"consistency-custom-sidebar"},(0,r.__)("Consistency Settings","consistency")))}}),o()((()=>{e.g.consistencyLoop=0,e.g.previousFixCanceledContent="",e.g.previousFixCanceled=!1,e.g.contentPasted=!1,document.querySelector("#editor")?.addEventListener("paste",(t=>{e.g.contentPasted=!0})),document.querySelector("#editor")?.addEventListener("keydown",(t=>{90===t.keyCode&&(t.ctrlKey||t.metaKey)&&(e.g.previousFixCanceled=!0,t.preventDefault())})),(0,n.subscribe)((()=>{const{onTheFly:t,onPaste:s}=(()=>{const e={onTheFly:!1,onPaste:!1},t=(0,n.select)(d.store).getCurrentUser(),s=g("root","user",t?.id||0,"consistency_plugin_user_settings"),o=s?.meta?.consistency_plugin_user_settings;return e.onTheFly=o?.find((e=>"on_the_fly"===e.slug))?.value||!1,e.onPaste=o?.find((e=>"on_paste"===e.slug))?.value||!1,e})();if(!t&&!s)return;const o=(()=>{const e=g("root","site"),t=e?.consistency_plugin_settings;return t})();if(void 0===o)return;if(e.g.contentPasted&&s)return void(t=>{const{settings:n}=t;let s=y.filter((e=>!0===n?.find((t=>t.slug===e.slug))?.value));const o=B(),c=o.flatMap((({innerBlocks:e,...t})=>e.map((e=>({...t,...e}))))),r=o.reduce(((e,t)=>{let n=t.attributes?.content;return b.includes(t.name)&&void 0!==n?(Object.entries(s).forEach((([e,t])=>{if(w(t.slug)){if(m.includes(t.slug)){const e=t.mask.toString().match(/(?<=\/).+?(?=\/)/g)[0],s=new RegExp(`(?<!=)${e}(?!>)([^${e}]*)(?<!=)${e}(?!>)`,"g");n=n.replaceAll(s,t.replace)}if(!m.includes(t.slug)){const e=t.mask.toString(),s=new RegExp(e.substring(1,e.length-1),"g");n=n.replaceAll(s,t.replace)}}})),void 0!==n&&(e[t.clientId]={content:n}),e):e}),{});Object.keys(r).length>0&&e.g.contentPasted&&(e.g.contentPasted=!1,$(Object.keys(r),r,!0)),e.g.contentPasted=!1,c.forEach((e=>{if(!b.includes(e.name))return;const t=e.clientId;e?.clientId&&q({currentBlockId:t,theRegs:s,isPasting:!0})}))})({settings:o});const c=U();if(null===c||e.g.contentPasted||!t)return;const r=O(c);r.hasOwnProperty("content")&&e.g.previousFixCanceledContent===r.content||(e.g.previousFixCanceledContent=r.content,N()&&q({currentBlockId:c,isPasting:!1,settings:o}))}))}))})();