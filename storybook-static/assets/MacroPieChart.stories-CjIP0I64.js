import{n as e}from"./rolldown-runtime-PE7_xIU0.js";import{t}from"./jsx-runtime-DjOA8AOY.js";function n({protein:e,carbs:t,fat:n,size:i=120}){let a=e*4,o=t*4,s=n*9,c=a+o+s;if(c===0)return(0,r.jsx)(`div`,{className:`flex items-center justify-center rounded-full border border-white/10 bg-white/5`,style:{width:i,height:i},children:(0,r.jsx)(`span`,{className:`text-[10px] font-black text-gray-600 uppercase`,children:`Empty`})});let l=a/c*100,u=o/c*100,d=s/c*100,f=0;function p(e){return[Math.cos(2*Math.PI*e),Math.sin(2*Math.PI*e)]}let m=[{percent:l/100,color:`var(--protein)`},{percent:u/100,color:`var(--carbs)`},{percent:d/100,color:`var(--fat)`}];return(0,r.jsxs)(`div`,{className:`relative flex flex-col items-center gap-4`,children:[(0,r.jsxs)(`svg`,{viewBox:`-1 -1 2 2`,style:{width:i,height:i,transform:`rotate(-90deg)`},className:`drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]`,children:[m.map((e,t)=>{if(e.percent===0)return null;let[n,i]=p(f);f+=e.percent;let[a,o]=p(f),s=+(e.percent>.5);return(0,r.jsx)(`path`,{d:[`M ${n} ${i}`,`A 1 1 0 ${s} 1 ${a} ${o}`,`L 0 0`].join(` `),fill:e.color,className:`transition-all duration-500 hover:opacity-80`},t)}),(0,r.jsx)(`circle`,{cx:`0`,cy:`0`,r:`0.75`,fill:`#09090b`})]}),(0,r.jsxs)(`div`,{className:`grid w-full grid-cols-3 gap-4`,children:[(0,r.jsxs)(`div`,{className:`flex flex-col items-center gap-1`,children:[(0,r.jsx)(`div`,{className:`size-1.5 rounded-full`,style:{backgroundColor:`var(--protein)`}}),(0,r.jsxs)(`span`,{className:`text-[8px] font-black tracking-tighter text-gray-500 uppercase`,children:[`Prot `,Math.round(l),`%`]})]}),(0,r.jsxs)(`div`,{className:`flex flex-col items-center gap-1`,children:[(0,r.jsx)(`div`,{className:`size-1.5 rounded-full`,style:{backgroundColor:`var(--carbs)`}}),(0,r.jsxs)(`span`,{className:`text-[8px] font-black tracking-tighter text-gray-500 uppercase`,children:[`Carb `,Math.round(u),`%`]})]}),(0,r.jsxs)(`div`,{className:`flex flex-col items-center gap-1`,children:[(0,r.jsx)(`div`,{className:`size-1.5 rounded-full`,style:{backgroundColor:`var(--fat)`}}),(0,r.jsxs)(`span`,{className:`text-[8px] font-black tracking-tighter text-gray-500 uppercase`,children:[`Fat `,Math.round(d),`%`]})]})]})]})}var r,i=e((()=>{r=t(),n.__docgenInfo={description:``,methods:[],displayName:`MacroPieChart`,props:{protein:{required:!0,tsType:{name:`number`},description:``},carbs:{required:!0,tsType:{name:`number`},description:``},fat:{required:!0,tsType:{name:`number`},description:``},size:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`120`,computed:!1}}}}})),a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{a=t(),i(),o={title:`Charts/MacroPieChart`,component:n,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{protein:{control:{type:`range`,min:0,max:200,step:1}},carbs:{control:{type:`range`,min:0,max:500,step:1}},fat:{control:{type:`range`,min:0,max:200,step:1}},size:{control:{type:`range`,min:60,max:300,step:10}}},args:{protein:30,carbs:50,fat:20,size:120},decorators:[e=>(0,a.jsx)(`div`,{style:{background:`#0d1f14`,padding:`2rem`,borderRadius:`20px`,display:`inline-flex`,flexDirection:`column`,alignItems:`center`,gap:`1rem`},children:(0,a.jsx)(e,{})})]},s={args:{protein:30,carbs:40,fat:20}},c={args:{protein:180,carbs:40,fat:20}},l={args:{protein:30,carbs:300,fat:20}},u={args:{protein:30,carbs:40,fat:150}},d={args:{protein:80,carbs:20,fat:180}},f={args:{protein:60,carbs:250,fat:40}},p={args:{protein:0,carbs:0,fat:0}},m={args:{protein:150,carbs:0,fat:0}},h={args:{protein:30,carbs:50,fat:20,size:80}},g={args:{protein:30,carbs:50,fat:20,size:120}},_={args:{protein:30,carbs:50,fat:20,size:200}},v={args:{protein:45,carbs:55,fat:8}},y={args:{protein:25,carbs:5,fat:30}},b={args:{protein:150,carbs:200,fat:67,size:160}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 30,
    carbs: 40,
    fat: 20
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 180,
    carbs: 40,
    fat: 20
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 30,
    carbs: 300,
    fat: 20
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 30,
    carbs: 40,
    fat: 150
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 80,
    carbs: 20,
    fat: 180
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 60,
    carbs: 250,
    fat: 40
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 0,
    carbs: 0,
    fat: 0
  }
}`,...p.parameters?.docs?.source},description:{story:`When all macros are 0, the component renders an "Empty" placeholder.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 150,
    carbs: 0,
    fat: 0
  }
}`,...m.parameters?.docs?.source},description:{story:`Only protein — single-slice chart.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 30,
    carbs: 50,
    fat: 20,
    size: 80
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 30,
    carbs: 50,
    fat: 20,
    size: 120
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 30,
    carbs: 50,
    fat: 20,
    size: 200
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 45,
    carbs: 55,
    fat: 8
  }
}`,...v.parameters?.docs?.source},description:{story:`A typical chicken & rice meal.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 25,
    carbs: 5,
    fat: 30
  }
}`,...y.parameters?.docs?.source},description:{story:`A high-fat breakfast (eggs & bacon).`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    protein: 150,
    carbs: 200,
    fat: 67,
    size: 160
  }
}`,...b.parameters?.docs?.source},description:{story:`Daily macro summary for a 2000 kcal diet.`,...b.parameters?.docs?.description}}},x=[`Balanced`,`HighProtein`,`HighCarbs`,`HighFat`,`Keto`,`Vegan`,`Empty`,`ProteinOnly`,`Small`,`Default`,`Large`,`ChickenAndRice`,`EggsAndBacon`,`DailySummary`]}))();export{s as Balanced,v as ChickenAndRice,b as DailySummary,g as Default,y as EggsAndBacon,p as Empty,l as HighCarbs,u as HighFat,c as HighProtein,d as Keto,_ as Large,m as ProteinOnly,h as Small,f as Vegan,x as __namedExportsOrder,o as default};