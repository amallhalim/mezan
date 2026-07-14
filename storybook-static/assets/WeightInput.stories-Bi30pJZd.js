import{n as e}from"./rolldown-runtime-PE7_xIU0.js";import{t}from"./jsx-runtime-DjOA8AOY.js";import{i as n,t as r}from"./lucide-react-BUZT6n_i.js";function i({amount:e,unit:t=`g`,label:r=`Custom`,onChange:i,className:o=``}){return(0,a.jsxs)(`div`,{className:`flex-1 space-y-1.5 ${o}`,children:[(0,a.jsx)(`label`,{className:`ml-1 text-[9px] font-black tracking-[0.15em] text-gray-500 uppercase`,children:r}),(0,a.jsxs)(`div`,{className:`relative h-10`,children:[(0,a.jsx)(`div`,{className:`pointer-events-none absolute inset-y-0 left-3 flex items-center`,children:(0,a.jsx)(n,{className:`size-3.5 text-gray-500`})}),(0,a.jsx)(`input`,{type:`number`,min:`1`,max:`5000`,value:e||``,onChange:e=>{let t=Number(e.target.value);t>5e3&&(t=5e3),t>=0&&i(t)},className:`focus:border-primary/50 h-full w-full rounded-xl border border-white/5 bg-white/5 pr-8 pl-9 text-xs font-bold text-white transition-all outline-none`}),(0,a.jsx)(`div`,{className:`pointer-events-none absolute inset-y-0 right-3 flex items-center`,children:(0,a.jsx)(`span`,{className:`text-[9px] font-bold text-gray-500 uppercase`,children:t})})]})]})}var a,o=e((()=>{a=t(),r(),i.__docgenInfo={description:`A specialized numeric input component for weight measurements.
Features an integrated scale icon, unit suffix, and automatic value capping.`,methods:[],displayName:`WeightInput`,props:{amount:{required:!0,tsType:{name:`number`},description:`The current numeric weight amount.`},unit:{required:!1,tsType:{name:`string`},description:`The unit of measurement (e.g., 'g', 'kg'). Defaults to 'g'.`,defaultValue:{value:`"g"`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`The label displayed above the input. Defaults to 'Custom'.`,defaultValue:{value:`"Custom"`,computed:!1}},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(amount: number) => void`,signature:{arguments:[{type:{name:`number`},name:`amount`}],return:{name:`void`}}},description:`Callback fired when a valid numeric value is entered.`},className:{required:!1,tsType:{name:`string`},description:`Optional additional CSS classes.`,defaultValue:{value:`""`,computed:!1}}}}})),s,c,l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{s=t(),o(),{fn:c}=__STORYBOOK_MODULE_TEST__,l={title:`UI/WeightInput`,component:i,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{onChange:{action:`changed`},amount:{control:`number`},unit:{control:`text`},label:{control:`text`}},args:{amount:100,unit:`g`,label:`Amount`,onChange:c()},decorators:[e=>(0,s.jsx)(`div`,{style:{width:`200px`},children:(0,s.jsx)(e,{})})]},u={args:{amount:150,unit:`g`,label:`Weight`}},d={args:{amount:1.5,unit:`kg`,label:`Weight`}},f={args:{amount:500,unit:`mg`,label:`Sodium`}},p={args:{amount:350,unit:`kcal`,label:`Calories`}},m={args:{amount:0,unit:`g`,label:`Amount`}},h={args:{amount:5e3,unit:`g`,label:`Max Amount (5000g)`}},g={args:{amount:2500,unit:`g`,label:`Large Amount`}},_={args:{amount:150,unit:`g`,label:`Chicken Breast`}},v={args:{amount:200,unit:`g`,label:`Cooked Rice`}},y={args:{amount:15,unit:`ml`,label:`Olive Oil`}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 150,
    unit: "g",
    label: "Weight"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 1.5,
    unit: "kg",
    label: "Weight"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 500,
    unit: "mg",
    label: "Sodium"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 350,
    unit: "kcal",
    label: "Calories"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 0,
    unit: "g",
    label: "Amount"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 5000,
    unit: "g",
    label: "Max Amount (5000g)"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 2500,
    unit: "g",
    label: "Large Amount"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 150,
    unit: "g",
    label: "Chicken Breast"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 200,
    unit: "g",
    label: "Cooked Rice"
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 15,
    unit: "ml",
    label: "Olive Oil"
  }
}`,...y.parameters?.docs?.source}}},b=[`Grams`,`Kilograms`,`Milligrams`,`Calories`,`Empty`,`AtMaximum`,`LargeAmount`,`ProteinServing`,`RiceServing`,`OilServing`]}))();export{h as AtMaximum,p as Calories,m as Empty,u as Grams,d as Kilograms,g as LargeAmount,f as Milligrams,y as OilServing,_ as ProteinServing,v as RiceServing,b as __namedExportsOrder,l as default};