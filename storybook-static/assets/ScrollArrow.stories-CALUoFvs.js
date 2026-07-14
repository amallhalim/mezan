import{n as e,o as t}from"./rolldown-runtime-PE7_xIU0.js";import{t as n}from"./react-BRITX5Kl.js";import{t as r}from"./jsx-runtime-DjOA8AOY.js";var i=e((()=>{}));function a(){let e=(0,s.useContext)(c);if(!e)throw Error(void 0);return e}function o(){return a().locale}var s,c,l=e((()=>{s=t(n(),1),r(),c=(0,s.createContext)(void 0)})),u=e((()=>{i(),l(),i()}));function d({direction:e,visible:t,onClick:n}){let r=o()===`ar`?e===`left`?`right`:`left`:e,i=e===`left`?`-translate-x-2`:`translate-x-2`;return(0,f.jsx)(`button`,{onClick:n,"aria-label":`Scroll ${e}`,className:`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#04120c]/90 text-white shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-emerald-500/50 hover:text-emerald-400 ${t?`pointer-events-auto translate-x-0 opacity-100`:`pointer-events-none opacity-0 ${i}`}`,children:(0,f.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,f.jsx)(`path`,{d:r===`left`?`M15 18l-6-6 6-6`:`M9 18l6-6-6-6`})})})}var f,p=e((()=>{f=r(),u(),d.__docgenInfo={description:`A navigational arrow component used for horizontal scrolling containers.
Automatically flips its visual direction in RTL layouts.`,methods:[],displayName:`ScrollArrow`,props:{direction:{required:!0,tsType:{name:`union`,raw:`"left" | "right"`,elements:[{name:`literal`,value:`"left"`},{name:`literal`,value:`"right"`}]},description:`The direction the arrow should point and scroll.`},visible:{required:!0,tsType:{name:`boolean`},description:`If true, the arrow is visible and interactable.`},onClick:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Callback fired when the arrow is clicked.`}}}})),m,h,g,_,v,y,b,x,S;e((()=>{m=r(),p(),{fn:h}=__STORYBOOK_MODULE_TEST__,g={title:`UI/ScrollArrow`,component:d,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{onClick:{action:`clicked`},direction:{control:`radio`,options:[`left`,`right`]},visible:{control:`boolean`}},args:{onClick:h(),visible:!0,direction:`right`},decorators:[e=>(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`1rem`,padding:`2rem`,background:`#0d1f14`,borderRadius:`16px`,minWidth:`200px`},children:[(0,m.jsx)(`div`,{style:{width:`120px`,height:`40px`,background:`rgba(255,255,255,0.05)`,borderRadius:`8px`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,m.jsx)(`span`,{style:{color:`#4b5563`,fontSize:`10px`},children:`scroll content`})}),(0,m.jsx)(e,{})]})]},_={args:{direction:`right`,visible:!0}},v={args:{direction:`left`,visible:!0}},y={args:{direction:`right`,visible:!1}},b={args:{direction:`right`,visible:!0}},x={decorators:[()=>(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`,background:`#0d1f14`,borderRadius:`16px`,padding:`1.5rem`},children:[(0,m.jsx)(d,{direction:`left`,visible:!0,onClick:h()}),(0,m.jsx)(`div`,{style:{width:`200px`,height:`40px`,background:`rgba(255,255,255,0.05)`,borderRadius:`8px`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,m.jsx)(`span`,{style:{color:`#4b5563`,fontSize:`10px`},children:`horizontal scroll area`})}),(0,m.jsx)(d,{direction:`right`,visible:!0,onClick:h()})]})],args:{direction:`right`,visible:!0}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "right",
    visible: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "left",
    visible: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "right",
    visible: false
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "right",
    visible: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  decorators: [() => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#0d1f14",
    borderRadius: "16px",
    padding: "1.5rem"
  }}>\r
        <ScrollArrow direction="left" visible={true} onClick={fn()} />\r
        <div style={{
      width: "200px",
      height: "40px",
      background: "rgba(255,255,255,0.05)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>\r
          <span style={{
        color: "#4b5563",
        fontSize: "10px"
      }}>horizontal scroll area</span>\r
        </div>\r
        <ScrollArrow direction="right" visible={true} onClick={fn()} />\r
      </div>],
  args: {
    direction: "right",
    visible: true
  }
}`,...x.parameters?.docs?.source}}},S=[`RightArrow`,`LeftArrow`,`Hidden`,`Visible`,`BothArrows`]}))();export{x as BothArrows,y as Hidden,v as LeftArrow,_ as RightArrow,b as Visible,S as __namedExportsOrder,g as default};