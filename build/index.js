(()=>{"use strict";var e={n:t=>{var s=t&&t.__esModule?()=>t.default:()=>t;return e.d(s,{a:s}),s},d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})}};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);const t=window.wp.plugins,s=window.wp.data,n=window.wp.domReady;var o=e.n(n);const c=window.React,a=window.wp.i18n,r=window.wp.editPost,i=window.wp.components,l=()=>(0,c.createElement)(i.Icon,{icon:(0,c.createElement)("svg",{version:"1.1",id:"consistency-plugin",x:"0px",y:"0px",width:"24px",height:"24px",viewBox:"0 0 24 24",enableBackground:"new 0 0 24 24"},(0,c.createElement)("line",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",x1:"4",y1:"20",x2:"7",y2:"20"}),(0,c.createElement)("line",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",x1:"14",y1:"20",x2:"21",y2:"20"}),(0,c.createElement)("line",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",x1:"6.9",y1:"15",x2:"13.8",y2:"15"}),(0,c.createElement)("line",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",x1:"10.2",y1:"6.3",x2:"16",y2:"20"}),(0,c.createElement)("polyline",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",points:"5,20 11,4 13,4 20,20 "}))}),u=window.wp.coreData,p=window.wp.notices,d=e=>{const{settingSlug:t,settingName:n,settingDescription:o}=e,{currentUser:r}=(0,s.useSelect)((e=>({currentUser:e(u.store).getCurrentUser()})),[]),l=r&&r.id,[d,g]=(0,u.useEntityProp)("root","user","meta",l),{saveEditedEntityRecord:y}=(0,s.useDispatch)(u.store),{createNotice:m}=(0,s.useDispatch)(p.store);return(0,c.createElement)(i.ToggleControl,{label:n,help:(0,c.createElement)("span",{dangerouslySetInnerHTML:o}),checked:d?.consistency_plugin_user_settings?.find((e=>e.slug===t))?.value||!1,onChange:e=>{let s=d?.consistency_plugin_user_settings.map((s=>t===s.slug?{...s,value:e}:s));s?.find((e=>e.slug===t))||s.push({slug:t,value:e}),g({...d,consistency_plugin_user_settings:s}),y("root","user",l,{...d,meta:s}),m((0,a.__)("info","consistency"),e?sprintf((0,a.__)('"%1$s" Correction is enabled',"consistency"),n):sprintf((0,a.__)('"%1$s" Correction is disabled',"consistency"),n),{isDismissible:!0,type:"snackbar",speak:!0})}})},g=()=>(0,c.createElement)(i.Panel,{className:"UserSettingPanel"},(0,c.createElement)(i.PanelHeader,null,(0,c.createElement)("strong",null,(0,a.__)("Settings for my account","consistency")),(0,c.createElement)("br",null)),(0,c.createElement)("div",{style:{padding:16}},(0,c.createElement)(i.PanelRow,null,(0,c.createElement)(d,{settingSlug:"on_the_fly",settingName:(0,a.__)("On-the-fly autocorrect","consistency"),settingDescription:{__html:(0,a.__)("Enable/disable on-the-fly autocorrect","consistency")}})),(0,c.createElement)(i.PanelRow,null,(0,c.createElement)(d,{settingSlug:"on_paste",settingName:(0,a.__)("On paste autocorrect","consistency"),settingDescription:{__html:(0,a.__)("Enable/disable autocorrect on paste","consistency")}})))),{getEntityRecord:y}=(0,s.select)("core"),m=()=>{const e=y("root","site"),t=e?.consistency_plugin_settings;return t},h=()=>{const e=y("root","site"),t=e?.consistency_plugin_localization_management;return t},b=()=>{const e=y("root","site");return e?.language||"en_US"},_=()=>{const e=b(),t=h()?(0,a.__)(` (${e} locale)`,"consistency"):(0,a.__)(" (all locales)","consistency");return(0,c.createElement)("span",{style:{fontWeight:"normal",fontStyle:"italic",fontSize:"smaller"}},t)},f=["regularToCurlyQuotes","regularToFrenchQuotes","regularToFrenchQuotesWithoutSpaces","regularToGermanQuotes","regularToGermanBookStyleQuotes"],k=["core/paragraph","core/heading","core/quote","core/list-item","core/read-more"],{getBlock:w}=(0,s.select)("core/block-editor"),{updateBlock:v}=(0,s.dispatch)("core/block-editor"),S=[{slug:"quote",incompatibleWith:[]},{slug:"2hyphens",incompatibleWith:[]},{slug:"3hyphens",incompatibleWith:[]},{slug:"4hyphens",incompatibleWith:[]},{slug:"ordinalNumberSuffix",incompatibleWith:[]},{slug:"regularToCurlyQuotes",incompatibleWith:["regularToGermanQuotes","regularToGermanBookStyleQuotes","regularToFrenchQuotes","regularToFrenchQuotesWithoutSpaces"]},{slug:"regularToGermanQuotes",incompatibleWith:["regularToCurlyQuotes","regularToGermanBookStyleQuotes","regularToFrenchQuotes","regularToFrenchQuotesWithoutSpaces"]},{slug:"regularToGermanBookStyleQuotes",incompatibleWith:["regularToCurlyQuotes","regularToGermanQuotes","regularToFrenchQuotes","regularToFrenchQuotesWithoutSpaces"]},{slug:"regularToFrenchQuotes",incompatibleWith:["regularToCurlyQuotes","regularToGermanQuotes","regularToGermanBookStyleQuotes","regularToFrenchQuotesWithoutSpaces"]},{slug:"regularToFrenchQuotesWithoutSpaces",incompatibleWith:["regularToCurlyQuotes","regularToGermanQuotes","regularToGermanBookStyleQuotes","regularToFrenchQuotes"]},{slug:"curlyToFrenchQuotes",incompatibleWith:["regularToCurlyQuotes"]},{slug:"breakingSpace",incompatibleWith:["spaceBefore"]},{slug:"noSpaceBefore",incompatibleWith:["spaceBefore"]},{slug:"spaceBefore",incompatibleWith:["breakingSpace","noSpaceBefore"]},{slug:"noBreakingSpaceAfter",incompatibleWith:[]},{slug:"noNonBreakingSpaceAfter",incompatibleWith:[]},{slug:"capitalizeFirstSentenceLetter",incompatibleWith:[]},{slug:"etcThreeDots",incompatibleWith:[]},{slug:"etcTwoDots",incompatibleWith:[]},{slug:"etcEllipsis",incompatibleWith:[]},{slug:"ellipsis",incompatibleWith:[]},{slug:"symbolInACircle",incompatibleWith:[]},{slug:"symbolInSmallCapsAndSuperscriptStyle",incompatibleWith:[]},{slug:"fractions",incompatibleWith:[]},{slug:"percentages",incompatibleWith:[]}],{getBlockName:E,getBlockAttributes:x}=(0,s.select)("core/block-editor"),T=e=>{const t=b();return!(void 0===localesByRules||!localesByRules.hasOwnProperty(e))&&localesByRules[e].includes(t)},C=e=>{const t=S.find((t=>t.slug===e));return!!t&&t.incompatibleWith.some((e=>m()?.find((t=>t.slug===e))?.value))},F=e=>{const{settingSlug:t,settingName:n,settingDescription:o}=e,{createNotice:r}=(0,s.useDispatch)(p.store);if(h()&&!T(t))return"";const[l,d]=(0,u.useEntityProp)("root","site","consistency_plugin_settings",void 0),{saveEditedEntityRecord:g}=(0,s.useDispatch)(u.store);return(0,c.createElement)(i.PanelRow,null,(0,c.createElement)(i.ToggleControl,{label:n,help:(0,c.createElement)("span",{dangerouslySetInnerHTML:o}),checked:l?.find((e=>e.slug===t))?.value||!1,disabled:C(t),onChange:e=>{let s=l.map((s=>t===s.slug?{...s,value:e}:s));d(s),g("root","site",void 0,s),r((0,a.__)("info","consistency"),e?sprintf((0,a.__)('"%1$s" Correction is enabled',"consistency"),n):sprintf((0,a.__)('"%1$s" Correction is disabled',"consistency"),n),{isDismissible:!0,type:"snackbar",speak:!0})}}))},Q=[{slug:"quote",name:(0,a.__)("Straight Apostrophe","consistency"),description:(0,a.__)("Replace straight apostrophes with curly apostrophes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>'</code> <span style='font-size:20px'>→</span> <code>’</code></span>",mask:/\'/,replace:"’",nbMoved:0,category:"apostrophe"},{slug:"2hyphens",name:(0,a.__)("En Dash","consistency"),description:(0,a.__)("Replace two hyphens with an en dash:","consistency")+"<span aria-hidden='true' style='display:block;'><code>--</code> <span style='font-size:20px'>→</span> <code style=\"font-family:sans-serif;\">–</code></span>",mask:/(?:\-)\-/,replace:"–",nbMoved:-1,category:"dash"},{slug:"3hyphens",name:(0,a.__)("Em Dash","consistency"),description:(0,a.__)("Replace three hyphens with an em dash:","consistency")+"<span aria-hidden='true' style='display:block;'><code>---</code> <span style='font-size:20px'>→</span> <code style=\"font-family:sans-serif;\">—</code></span>",mask:/(?:–|\-\-)\-/,replace:"—",nbMoved:e=>-(e.length-1),category:"dash"},{slug:"4hyphens",name:(0,a.__)("Two-Em Dash","consistency"),description:(0,a.__)("Replace four hyphens with two-em dash:","consistency")+"<span aria-hidden='true' style='display:block;'><code>----</code> <span style='font-size:20px'>→</span> <code style=\"font-family:sans-serif;\">⸺</code></span>",mask:/(?:—|–\-|\-\-\-)\-/,replace:"⸺",nbMoved:e=>-(e.length-1),category:"dash"},{slug:"ordinalNumberSuffix",name:(0,a.__)("Ordinal Number Suffix","consistency"),description:(0,a.__)("Add the sup HTML tag to ordinal number suffixes","consistency")+"<span aria-hidden='true' style='display:block;'><code>1st</code> <span style='font-size:20px'>→</span> <code>1<sup>st</sup></code></span>",mask:/([10-9]{1,20})(th|nd|rd|e|er|res|d|ds|de|des)( | |\.|\,|\;)/,replace:"$1<sup>$2</sup>$3",nbMoved:0,category:"suffixe"},{slug:"regularToCurlyQuotes",name:(0,a.__)("Curly Quotes","consistency"),description:(0,a.__)("Replace straight quotes with curly quotes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>“ ”</code></span>",mask:/"/,replace:"“$1”",nbMoved:0,category:"quotation"},{slug:"regularToGermanQuotes",name:(0,a.__)("German Quotes","consistency"),description:(0,a.__)("Replace straight quotes with german quotes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>„ “</code></span>",mask:/"/,replace:"„$1“",nbMoved:0,category:"quotation"},{slug:"regularToGermanBookStyleQuotes",name:(0,a.__)("German Book-Style Quotes","consistency"),description:(0,a.__)("Replace straight quotes with german book-style quotes:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>» «</code></span>",mask:/"/,replace:"»$1«",nbMoved:0,category:"quotation"},{slug:"regularToFrenchQuotes",name:(0,a.__)("French Quotes with Spaces","consistency"),description:(0,a.__)("Replace straight quotes with french quotes with non-breaking spaces:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>«   »</code></span>",mask:/"/,replace:"« $1 »",nbMoved:1,category:"quotation"},{slug:"regularToFrenchQuotesWithoutSpaces",name:(0,a.__)("French Quotes","consistency"),description:(0,a.__)("Replace straight quotes with french quotes without spaces:","consistency")+"<span aria-hidden='true' style='display:block;'><code>\" \"</code> <span style='font-size:20px'>→</span> <code>« »</code></span>",mask:/"/,replace:"«$1»",nbMoved:0,category:"quotation"},{slug:"curlyToFrenchQuotes",name:(0,a.__)("Curly Quotes to French Quotes","consistency"),description:(0,a.__)("Replace curly quotes with french quotes with non-breaking spaces:","consistency")+"<span aria-hidden='true' style='display:block;'><code>“ ”</code> <span style='font-size:20px'>→</span> <code>«   »</code></span>",mask:/“.*?”/,replace:e=>`« ${e.substring(1,e.length-1)} »`,nbMoved:0,category:"quotation"},{slug:"breakingSpace",name:(0,a.__)("Breaking Spaces","consistency"),description:sprintf((0,a.__)("Replace a breaking space followed by a character from this list:%1$s with a non-breaking space","consistency"),"<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />"),mask:/ ([\?|\!|\:|\;|»|€|\$|£|¥|₽|元|\%])/,replace:" $1",nbMoved:0,category:"space"},{slug:"noSpaceBefore",name:(0,a.__)("No Space Before","consistency"),description:sprintf((0,a.__)("Add a non-breaking space before a character from this list:%1$s having no space before","consistency"),"<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />"),mask:/(?<! | |&nbsp;)([\?|\!|\:|»|€|\$|£|¥|₽|元|\%])/,replace:" $1",nbMoved:1,category:"space"},{slug:"spaceBefore",name:(0,a.__)("Space Before","consistency"),description:(0,a.__)("Remove any space preceding a character from this list:","consistency")+"<span style='display:block;'><code>? ! : ; %</code></span>",mask:/([ | ])(?=[\?|\!|\:|\;|\%])(.)/,replace:"$2",nbMoved:-1,category:"space"},{slug:"noBreakingSpaceAfter",name:(0,a.__)("No Breaking Space After","consistency"),description:sprintf((0,a.__)("Add a breaking space after a character from this list:%1$s when followed with another character","consistency"),"<br /><code>, … ) ]</code><br />"),mask:/([\,|…|\)|\]])(?! | |\.|\,|\d|$)(.)/,replace:"$1 $2",nbMoved:1,category:"space"},{slug:"noNonBreakingSpaceAfter",name:(0,a.__)("No Non-Breaking Space After","consistency"),description:(0,a.__)("Add a non-breaking space after open french quote having no space after","consistency"),mask:/(«)(?! | |&nbsp;)/,replace:"$1 ",nbMoved:0,category:"space"},{slug:"capitalizeFirstSentenceLetter",name:(0,a.__)("First Sentence Letter","consistency"),description:(0,a.__)("Capitalize the first letter of a sentence","consistency"),mask:/(^[a-záàâäãåăçéèêëíìîïñóòôöõúùûüýÿæœșț])|(?<=[\.|\?|\!|…] )[a-záàâäãåăçéèêëíìîïñóòôöõúùûüýÿæœșț]/,replace:e=>e.toUpperCase(),nbMoved:0,category:"case"},{slug:"etcThreeDots",name:(0,a.__)('Three Dots Following "etc"',"consistency"),description:(0,a.__)('Replace 3 dots placed after the abbreviation "etc" with a period:',"consistency")+"<span aria-hidden='true' style='display:block;'><code>etc...</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>",mask:/etc(\.{3})/i,replace:e=>e.substring(0,3)+".",nbMoved:-2,category:"ellipsis"},{slug:"etcTwoDots",name:(0,a.__)('Two Dots Following "etc"',"consistency"),description:(0,a.__)('Replace 2 dots placed after the abbreviation "etc" with a period:',"consistency")+"<span aria-hidden='true' style='display:block;'><code>etc..</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>",mask:/etc(\.{2})/i,replace:e=>e.substring(0,2)+".",nbMoved:-1,category:"ellipsis"},{slug:"etcEllipsis",name:(0,a.__)('Ellipsis Following "etc"',"consistency"),description:(0,a.__)('Replace the ellipsis placed after the abbreviation "etc" with a period:',"consistency")+"<span aria-hidden='true' style='display:block;'><code>etc…</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>",mask:/etc(\.{3}|…)/i,replace:e=>e.substring(0,3)+".",nbMoved:0,category:"ellipsis"},{slug:"ellipsis",name:(0,a.__)("Ellipsis","consistency"),description:(0,a.__)("Replaces 3 dots with ellipsis:","consistency")+"<span aria-hidden='true' style='display:block;'><code>...</code> <span style='font-size:20px'>→</span> <code>…</code></span>",mask:/\.{3}/,replace:"…",nbMoved:-2,category:"ellipsis"},{slug:"symbolInACircle",name:(0,a.__)("Symbol in a Circle","consistency"),description:(0,a.__)("Replaces 1 character placed in parentheses with a symbol","consistency")+"<span aria-hidden='true' style='display:block;'><code>(c) (p) (r)</code> <span style='font-size:20px'>→</span> <code>© ℗ ®</code></span>",mask:/(\([c|p|r])(\))/,replace:e=>{switch(e[1]){case"c":return"©";case"p":return"℗";case"r":return"®"}return" "},nbMoved:-2,category:"symbol"},{slug:"symbolInSmallCapsAndSuperscriptStyle",name:(0,a.__)("Symbol in Small Caps and Superscript Style","consistency"),description:(0,a.__)("Replaces 2-character abbreviations with a symbol in small caps and superscript style","consistency")+"<span aria-hidden='true' style='display:block;'><code>tm sm md mc</code> <span style='font-size:20px'>→</span> <code>™ ℠ 🅫 🅪</code></span>",mask:/(?<= | |\(|\[|\{|:|^)(tm|sm|md|mc)(?= | |\.|\,|\;|\:|\)|\]|\}|$)/,replace:e=>{switch(e){case"tm":return"™";case"sm":return"℠";case"md":return"🅫";case"mc":return"🅪";default:return" "}},nbMoved:-1,category:"symbol"},{slug:"fractions",name:(0,a.__)("Fractions","consistency"),description:(0,a.__)("Replaces fractions with fraction symbols:","consistency")+"<span aria-hidden='true' style='display:block;'><code>1/2 3/5 1/9</code> <span style='font-size:20px'>→</span> <code>½ ⅗ ⅑</code></span>",mask:/[1-9]\/[1-9]/,replace:e=>{switch(e){case"1/4":return"¼";case"1/2":return"½";case"3/4":return"¾";case"1/3":return"⅓";case"2/3":return"⅔";case"1/5":return"⅕";case"2/5":return"⅖";case"3/5":return"⅗";case"4/5":return"⅘";case"1/6":return"⅙";case"5/6":return"⅚";case"1/8":return"⅛";case"3/8":return"⅜";case"5/8":return"⅝";case"7/8":return"⅞";case"1/7":return"⅐";case"1/9":return"⅑";default:return" "}},nbMoved:-2,category:"symbol"},{slug:"percentages",name:(0,a.__)("Percentages","consistency"),description:(0,a.__)("Replaces percentages with percentages symbols:","consistency")+"<span aria-hidden='true' style='display:block;'><code>0/0 0/00 0/000</code> <span style='font-size:20px'>→</span> <code>% ‰ ‱</code></span>",mask:/(0\/0|0\/00|0\/000)(?= | |\.|\,|\;|\:|\)|\]|\})(.)/,replace:e=>{const t=e.substring(0,e.length-1),s=e.substring(e.length-1,e.length);switch(t){case"0/0":return"%"+s;case"0/00":return"‰"+s;case"0/000":return"‱"+s;default:return" "+s}},nbMoved:e=>-(e.substring(0,e.length-1).length-1),category:"symbol"}],B=[{slug:"apostrophe",label:(0,a.__)("Apostrophes","consistency"),description:(0,a.__)("Fixes related to apostrophes.","consistency")},{slug:"quotation",label:(0,a.__)("Quotation marks","consistency"),description:(0,a.__)("Fixes related to quotation marks.","consistency")},{slug:"dash",label:(0,a.__)("Dashes","consistency"),description:(0,a.__)("Fixes related to dashes.","consistency")},{slug:"suffixe",label:(0,a.__)("Suffixes","consistency"),description:(0,a.__)("Fixes related to suffixes.","consistency")},{slug:"space",label:(0,a.__)("Spaces","consistency"),description:(0,a.__)("Fixes related to spaces.","consistency")},{slug:"case",label:(0,a.__)("Case","consistency"),description:(0,a.__)("Fixes related to case.","consistency")},{slug:"ellipsis",label:(0,a.__)("Ellipsis","consistency"),description:(0,a.__)("Fixes related to ellipsis.","consistency")},{slug:"symbol",label:(0,a.__)("Symbols","consistency"),description:(0,a.__)("Fixes related to symbols.","consistency")}],P=()=>(0,c.createElement)(i.Panel,{className:"GlobalSettingPanel"},(0,c.createElement)(i.PanelHeader,null,(0,c.createElement)("strong",null,(0,a.__)("Global correction rules","consistency"),(0,c.createElement)(_,null))),[...B].map(((e,t)=>(0,c.createElement)(i.PanelBody,{key:t,title:(0,a.__)(e.label,"consistency"),initialOpen:!1},[...Q].filter((t=>t.category===e.slug)).map(((e,t)=>(0,c.createElement)(F,{key:t,settingSlug:e.slug,settingName:e.name,settingDescription:{__html:e.description}}))))))),{canUser:W}=(0,s.select)("core"),{getBlock:R,getBlocks:M,getBlockAttributes:$,getSelectionStart:A,isTyping:q}=(0,s.select)("core/block-editor"),{updateBlock:z,selectionChange:I,updateBlockAttributes:L}=(0,s.dispatch)("core/block-editor"),D=t=>{const{currentBlockId:s,isPasting:n,settings:o}=t;let c=Q.filter((e=>!0===o?.find((t=>t.slug===e.slug))?.value));const a=R(s);if(!(e=>{const t=E(e);return!!k.includes(t)})(s)||!(e=>{const t=x(e);return!(!t||!t.hasOwnProperty("content")||""===t.content)})(s))return;let r=$(s),i=!1;Object.entries(c).forEach((([t,o])=>{if(!T(o.slug)||i)return;e.g.consistencyLoop++,(t=>{e.g.consistencyLoop>=100&&(t=>{const s=w(t);v(t,{...s,attributes:{...s.attributes,content:s.attributes.content.slice(-2)}}),e.g.consistency_loop=0,console.log("Consistency - a memory leak has occured during the fix of the following block:",s)})(t)})(s);let c,l=o.replace,u="",p="",d=0,g=r.content,y=(e=>e.replace(/<\b(code|pre|kbd)\b>.*?<\/\b(code|pre|kbd)\b>/gi,"").replace(/(<([^>]+)>)/gi,""))(g),m=!1;if(q()||(m=o.mask.test(y)),q()){c=A(a.name),d=c?.offset||0;const e=(e=>{const t=document.querySelector(`#block-${e}`);if(null===t)return;const s=document.getSelection(),n=s?.getRangeAt(0);if(!n.collapsed)return;const o=n.cloneRange(),c=document.createTextNode("\0");o.insertNode(c);let a=t?.innerHTML?.indexOf("\0");c.parentNode.removeChild(c),t.normalize();const r=(t?.innerHTML.match(/&nbsp;/g)||[]).length;return r>0&&(a=a-6*r+r),a})(s)||d,t=y.match(o.mask);if(null===t||0===t.length)return;const n=t[0].length||1;u=g.substring(0,e-n),p=g.substring(e-n,g.length),m=o.mask.test(y)&&o.mask.test(p)}if(!m)return;if((e=>!!f.includes(e.slug))(o)&&(l=((e,t,s)=>{const n=e.replace.charAt(0),o=e.replace.charAt(e.replace.length-1),c=e.replace.substring(1,e.replace.indexOf("$"))||"";let a="";0!==[...e.replace.matchAll(/[0-9]/g)].length&&(a=e.replace.substring([...e.replace.matchAll(/[0-9]/g)].pop().index+1,e.replace.length-1));const r=new RegExp(`${n}`,"g"),i=new RegExp(`${o}`,"g");return(t.match(r)||[]).length===(t.match(i)||[]).length?n+c:a+o})(o,g)),0!==d&&(g=u+p.replace(o.mask,l)),0===d&&(g=g.replace(o.mask,o.replace)),e.g.previousFixCanceled)return void(e.g.previousFixCanceled=!1);if(e.g.previousFixCanceled||(z(s,{...a,attributes:{...a.attributes,content:g}}),i=!0),0===d||n)return;const h="function"==typeof o.nbMoved?o.nbMoved(p):o.nbMoved;h<0&&I(s,c.attributeKey,d+h,d+h),h>0&&I(s,c.attributeKey,d+1+h,d+h),0===h&&I(s,c.attributeKey,d,d)})),e.g.consistencyLoop=0},{getSelectedBlockClientId:N,isTyping:G,getBlockAttributes:O}=(0,s.select)("core/block-editor");(0,t.registerPlugin)("consistency-custom-sidebar",{render:()=>{const e=W("create","users");return(0,c.createElement)(c.Fragment,null,(0,c.createElement)(r.PluginSidebar,{name:"consistency-custom-sidebar",title:(0,a.__)("Consistency","consistency"),icon:l},(0,c.createElement)(g,null),e&&(0,c.createElement)(P,null)),(0,c.createElement)(r.PluginSidebarMoreMenuItem,{target:"consistency-custom-sidebar"},(0,a.__)("Consistency Settings","consistency")))}}),o()((()=>{e.g.consistencyLoop=0,e.g.previousFixCanceledContent="",e.g.previousFixCanceled=!1,e.g.contentPasted=!1,e.g.isPasteEventAttached=!1,e.g.isEditorInIframe=null!==document.querySelector('iframe[name="editor-canvas"]'),document.querySelector("#editor")?.addEventListener("keydown",(t=>{90===t.keyCode&&(t.ctrlKey||t.metaKey)&&(e.g.previousFixCanceled=!0,t.preventDefault())})),(0,s.subscribe)((()=>{(()=>{if((()=>{const t=null!==document.querySelector('iframe[name="editor-canvas"]');e.g.isEditorInIframe!==t&&(e.g.isEditorInIframe=t,e.g.isPasteEventAttached=!1)})(),!e.g.isPasteEventAttached){if(e.g.isEditorInIframe){const t=document.querySelector('iframe[name="editor-canvas"]');t&&(t.onload=()=>{(t.contentDocument||t.contentWindow.document).addEventListener("paste",(t=>{e.g.contentPasted=!0,e.g.isPasteEventAttached=!0}))},"complete"===t.contentWindow.document.readyState&&t.onload())}e.g.isEditorInIframe||document.querySelector("#editor")?.addEventListener("paste",(t=>{e.g.contentPasted=!0,e.g.isPasteEventAttached=!0}))}})();const{onTheFly:t,onPaste:n}=(()=>{const e={onTheFly:!1,onPaste:!1},t=(0,s.select)(u.store).getCurrentUser(),n=y("root","user",t?.id||0,"consistency_plugin_user_settings"),o=n?.meta?.consistency_plugin_user_settings;return e.onTheFly=o?.find((e=>"on_the_fly"===e.slug))?.value||!1,e.onPaste=o?.find((e=>"on_paste"===e.slug))?.value||!1,e})();if(!t&&!n)return;const o=m();if(void 0===o)return;if(e.g.contentPasted&&n)return void(t=>{const{settings:s}=t;let n=Q.filter((e=>!0===s?.find((t=>t.slug===e.slug))?.value));const o=M(),c=o.flatMap((({innerBlocks:e,...t})=>e.map((e=>({...t,...e}))))),a=o.reduce(((e,t)=>{let s=t.attributes?.content;return k.includes(t.name)&&void 0!==s?(Object.entries(n).forEach((([e,t])=>{if(T(t.slug)){if(f.includes(t.slug)){const e=t.mask.toString().match(/(?<=\/).+?(?=\/)/g)[0],n=new RegExp(`(?<!=)${e}(?!>)([^${e}]*)(?<!=)${e}(?!>)`,"g");s=s.replaceAll(n,t.replace)}if(!f.includes(t.slug)){const e=t.mask.toString(),n=new RegExp(e.substring(1,e.length-1),"g");s=s.replaceAll(n,t.replace)}}})),void 0!==s&&(e[t.clientId]={content:s}),e):e}),{});Object.keys(a).length>0&&e.g.contentPasted&&(e.g.contentPasted=!1,L(Object.keys(a),a,!0)),e.g.contentPasted=!1,c.forEach((e=>{if(!k.includes(e.name))return;const t=e.clientId;e?.clientId&&D({currentBlockId:t,theRegs:n,isPasting:!0})}))})({settings:o});const c=N();if(null===c||e.g.contentPasted||!t)return;const a=O(c);a.hasOwnProperty("content")&&e.g.previousFixCanceledContent===a.content||(e.g.previousFixCanceledContent=a.content,G()&&D({currentBlockId:c,isPasting:!1,settings:o}))}))}))})();