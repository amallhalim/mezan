import{n as e}from"./rolldown-runtime-PE7_xIU0.js";import{t}from"./jsx-runtime-DjOA8AOY.js";import{c as n,n as r,o as i,t as a,u as o}from"./lucide-react-BUZT6n_i.js";function s({children:e,variant:t=`primary`,size:n=`md`,isLoading:r=!1,leftIcon:i,rightIcon:a,className:o=``,isSelected:s=!1,...l}){return(0,c.jsx)(`button`,{className:`inline-flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group ${{primary:`bg-gradient-to-r from-primary to-emerald-600 hover:from-emerald-400 hover:to-primary text-secondary shadow-[0_10px_30px_rgba(16,185,129,0.3)]`,secondary:`bg-surface hover:bg-surface-elevated text-foreground border border-border`,outline:`bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10`,ghost:`bg-transparent hover:bg-surface text-text-dim hover:text-foreground`,category:`border-primary/20 border whitespace-nowrap !tracking-normal !normal-case !font-bold !rounded-full transition-colors ${s?`bg-primary text-secondary`:`bg-primary/20 text-foreground`}`}[t]} ${{sm:`px-3 py-1.5 text-[10px] rounded-xl`,md:`px-4 py-2.5 text-xs rounded-2xl`,lg:`px-6 py-3.5 text-sm rounded-2xl`,xl:`px-8 py-4 text-base rounded-[1.5rem]`}[n]} ${s&&t!==`category`?`ring-primary ring-offset-background ring-2 ring-offset-2`:``} ${o}`,disabled:r||l.disabled,...l,children:r?(0,c.jsx)(`div`,{className:`me-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent`}):(0,c.jsxs)(c.Fragment,{children:[i&&(0,c.jsx)(`span`,{className:`me-2 transition-transform group-hover:scale-110`,children:i}),e,a&&(0,c.jsx)(`span`,{className:`ms-2 transition-transform group-hover:scale-110`,children:a})]})})}var c,l=e((()=>{c=t(),s.__docgenInfo={description:`Reusable Button component for user actions.

Supports various visual styles, sizes, and states (loading, disabled).
Automatically applies accessible contrast and hover effects based on the theme.`,methods:[],displayName:`Button`,props:{variant:{required:!1,tsType:{name:`Exclude`,elements:[{name:`union`,raw:`| "primary"
| "secondary"
| "outline"
| "ghost"
| "category"`,elements:[{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"outline"`},{name:`literal`,value:`"ghost"`},{name:`literal`,value:`"category"`}]},{name:`union`,raw:`"noghost" | "ghost"`,elements:[{name:`literal`,value:`"noghost"`},{name:`literal`,value:`"ghost"`}]}],raw:`Exclude<ButtonTypes, "noghost" | "ghost">`},description:`The visual style variant of the button.`,defaultValue:{value:`"primary"`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`"sm" | "md" | "lg" | "xl"`,elements:[{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`},{name:`literal`,value:`"xl"`}]},description:`The size of the button, controlling padding and text size.`,defaultValue:{value:`"md"`,computed:!1}},isLoading:{required:!1,tsType:{name:`boolean`},description:`If true, shows a loading spinner and disables the button.`,defaultValue:{value:`false`,computed:!1}},leftIcon:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Optional icon to display before the text.`},rightIcon:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Optional icon to display after the text.`},isSelected:{required:!1,tsType:{name:`boolean`},description:`Used primarily for 'category' variant to show active state.`,defaultValue:{value:`false`,computed:!1}},children:{required:!0,tsType:{name:`string`},description:`The text content of the button.`},className:{defaultValue:{value:`""`,computed:!1},required:!1}}}})),u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k;e((()=>{u=t(),l(),a(),{fn:d}=__STORYBOOK_MODULE_TEST__,f={title:`UI/Button`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{onClick:{action:`clicked`},onFocus:{action:`focused`},onBlur:{action:`blurred`},variant:{control:`select`,options:[`primary`,`secondary`,`outline`,`category`]},size:{control:`radio`,options:[`sm`,`md`,`lg`,`xl`]},isLoading:{control:`boolean`},isSelected:{control:`boolean`},disabled:{control:`boolean`}},args:{onClick:d()}},p={args:{variant:`primary`,size:`md`,children:`Save Meal`}},m={args:{variant:`secondary`,size:`md`,children:`View Details`}},h={args:{variant:`outline`,size:`md`,children:`Cancel`}},g={args:{variant:`category`,size:`md`,children:`Breakfast`,isSelected:!1}},_={args:{variant:`category`,size:`md`,children:`Breakfast`,isSelected:!0}},v={args:{size:`sm`,children:`Small`}},y={args:{size:`md`,children:`Medium`}},b={args:{size:`lg`,children:`Large`}},x={args:{size:`xl`,children:`Extra Large`}},S={args:{variant:`primary`,size:`md`,children:`Saving...`,isLoading:!0}},C={args:{variant:`primary`,size:`md`,children:`Unavailable`,disabled:!0}},w={args:{children:`Continue`,rightIcon:(0,u.jsx)(o,{className:`size-4`})}},T={args:{children:`Add Food`,variant:`primary`,leftIcon:(0,u.jsx)(i,{className:`size-4`})}},E={args:{children:`Confirm`,variant:`outline`,leftIcon:(0,u.jsx)(n,{className:`size-4`}),rightIcon:(0,u.jsx)(o,{className:`size-4`})}},D={decorators:[()=>(0,u.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,alignItems:`flex-start`},children:[(0,u.jsx)(s,{size:`sm`,onClick:d(),children:`Small Button`}),(0,u.jsx)(s,{size:`md`,onClick:d(),children:`Medium Button`}),(0,u.jsx)(s,{size:`lg`,onClick:d(),children:`Large Button`}),(0,u.jsx)(s,{size:`xl`,onClick:d(),children:`Extra Large Button`})]})],args:{children:`placeholder`}},O={decorators:[e=>(0,u.jsxs)(`div`,{style:{background:`#1c0a0a`,border:`1px solid #7f1d1d`,padding:`1.5rem`,borderRadius:`12px`,display:`flex`,flexDirection:`column`,gap:`0.75rem`},children:[(0,u.jsx)(`p`,{style:{color:`#f87171`,fontSize:`11px`,fontWeight:700,margin:0,letterSpacing:`0.1em`},children:`⚠️ DANGER ZONE`}),(0,u.jsx)(e,{})]})],args:{children:`Delete Account`,variant:`outline`,leftIcon:(0,u.jsx)(r,{className:`size-4`})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    size: "md",
    children: "Save Meal"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "secondary",
    size: "md",
    children: "View Details"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outline",
    size: "md",
    children: "Cancel"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "category",
    size: "md",
    children: "Breakfast",
    isSelected: false
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "category",
    size: "md",
    children: "Breakfast",
    isSelected: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    size: "sm",
    children: "Small"
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    size: "md",
    children: "Medium"
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    size: "lg",
    children: "Large"
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    children: "Extra Large"
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    size: "md",
    children: "Saving...",
    isLoading: true
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    size: "md",
    children: "Unavailable",
    disabled: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Continue",
    rightIcon: <ArrowRight className="size-4" />
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Add Food",
    variant: "primary",
    leftIcon: <Plus className="size-4" />
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Confirm",
    variant: "outline",
    leftIcon: <Check className="size-4" />,
    rightIcon: <ArrowRight className="size-4" />
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  decorators: [() => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "flex-start"
  }}>\r
        <Button size="sm" onClick={fn()}>Small Button</Button>\r
        <Button size="md" onClick={fn()}>Medium Button</Button>\r
        <Button size="lg" onClick={fn()}>Large Button</Button>\r
        <Button size="xl" onClick={fn()}>Extra Large Button</Button>\r
      </div>],
  args: {
    children: "placeholder"
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    background: "#1c0a0a",
    border: "1px solid #7f1d1d",
    padding: "1.5rem",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem"
  }}>\r
        <p style={{
      color: "#f87171",
      fontSize: "11px",
      fontWeight: 700,
      margin: 0,
      letterSpacing: "0.1em"
    }}>\r
          ⚠️ DANGER ZONE\r
        </p>\r
        <Story />\r
      </div>],
  args: {
    children: "Delete Account",
    variant: "outline",
    leftIcon: <Trash2 className="size-4" />
  }
}`,...O.parameters?.docs?.source}}},k=[`Primary`,`Secondary`,`Outline`,`Category`,`CategorySelected`,`Small`,`Medium`,`Large`,`ExtraLarge`,`Loading`,`Disabled`,`WithRightIcon`,`WithLeftIcon`,`WithBothIcons`,`AllSizes`,`DestructiveAction`]}))();export{D as AllSizes,g as Category,_ as CategorySelected,O as DestructiveAction,C as Disabled,x as ExtraLarge,b as Large,S as Loading,y as Medium,h as Outline,p as Primary,m as Secondary,v as Small,E as WithBothIcons,T as WithLeftIcon,w as WithRightIcon,k as __namedExportsOrder,f as default};