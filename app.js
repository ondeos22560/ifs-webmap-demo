const THEMES=["Agriculture & alimentation","Eau & assainissement","Énergie & climat","Gestion des ressources naturelles","Développement économique","Santé & services sociaux","Mobilités & migrations","Gouvernance territoriale","Prévention / risques naturels","Cohésion sociale"];
const ORGS=["AVSF","GERES","GRDR","GRET","Le Partenariat","ADOS"];
const FUNDERS=["Fondation de France","AFD","Union européenne","Agence de l'eau","Coopération suisse","Collectivités territoriales"];
const PARTNERS=["OMVS","Collectivité locale","Organisation paysanne","Service technique national","Association locale","Université / recherche","Chambre consulaire"];
const ODDS=["ODD 2","ODD 5","ODD 6","ODD 7","ODD 8","ODD 11","ODD 13","ODD 15","ODD 16","ODD 17"];
const DEFAULT_BOUNDS=L.latLngBounds([[7.2,-19.5],[24.5,2.5]]);

const adminDefs=[
["Sénégal","Saint-Louis","Saint-Louis",[-16.7,15.75,-15.8,16.35]], ["Sénégal","Saint-Louis","Dagana",[-16.1,16.0,-14.9,16.71]], ["Sénégal","Saint-Louis","Podor",[-15.3,16.1,-13.7,16.85]],
["Sénégal","Matam","Matam",[-14.1,15.0,-12.7,16.1]], ["Sénégal","Matam","Kanel",[-13.4,14.4,-12.0,15.45]], ["Sénégal","Tambacounda","Bakel",[-12.8,13.9,-11.4,14.95]],
["Mauritanie","Trarza","Rosso",[-16.3,16.2,-15.1,17.0]], ["Mauritanie","Brakna","Aleg",[-14.8,16.5,-13.0,17.4]], ["Mauritanie","Gorgol","Kaédi",[-13.7,15.8,-12.0,16.8]], ["Mauritanie","Guidimakha","Sélibaby",[-12.7,14.7,-11.3,15.7]],
["Mali","Kayes","Kayes",[-11.8,14.1,-10.8,15.0]], ["Mali","Kayes","Bafoulabé",[-11.5,13.2,-10.2,14.2]], ["Mali","Kayes","Yélimané",[-11.4,14.6,-10.2,15.6]], ["Mali","Kayes","Kéniéba",[-12.3,12.7,-11.0,13.8]],
["Guinée","Labé","Labé",[-12.6,11.0,-11.3,12.2]], ["Guinée","Labé","Mali",[-12.5,11.8,-11.2,13.0]], ["Guinée","Mamou","Mamou",[-12.2,9.9,-10.8,11.2]], ["Guinée","Mamou","Dalaba",[-12.3,10.3,-11.2,11.3]], ["Guinée","Faranah","Dabola",[-11.6,10.3,-10.1,11.8]], ["Guinée","Faranah","Dinguiraye",[-11.8,11.3,-10.2,12.5]],
["Guinée","Labé","Koubia",[-12.3,11.3,-11.4,12.1]], ["Guinée","Labé","Tougué",[-11.8,11.4,-10.8,12.3]], ["Guinée","Kankan","Siguiri",[-10.2,11.1,-8.7,12.6]]
];
function polyFromBox(b,i){const[x1,y1,x2,y2]=b; const j=(i%3)*.06;return [[[x1+j,y1],[x2,y1+.04],[x2-.05,y2-j],[x1,y2+.03],[x1+j,y1]]]}
let admin2Geo={type:"FeatureCollection",features:adminDefs.map((d,i)=>({type:"Feature",properties:{country:d[0],region:d[1],name:d[2],id:`a${i}`,population:35000+((i*37991)%260000)},geometry:{type:"Polygon",coordinates:polyFromBox(d[3],i)}}))};

let countryGeo=window.COUNTRY_GEOJSON;

// --- Contexte hydrographique du bassin du fleuve Sénégal ---
// Un jeu de secours simplifié est affiché immédiatement. Lorsque le service public
// ArcGIS/HydroSHEDS répond, il remplace automatiquement ce réseau de secours.
const basinGeo={type:"Feature",properties:{name:"Bassin du fleuve Sénégal",source:"emprise indicative"},geometry:{type:"Polygon",coordinates:[[
[-16.75,16.70],[-16.25,17.15],[-15.15,17.45],[-13.65,17.30],[-12.20,16.75],[-10.85,16.10],[-9.40,15.65],[-8.05,15.30],[-7.35,14.40],[-7.70,13.35],[-8.55,12.45],[-9.65,11.45],[-10.55,10.65],[-11.55,10.35],[-12.35,10.75],[-12.85,11.55],[-12.80,12.70],[-13.30,13.55],[-14.10,14.20],[-15.10,14.80],[-16.15,15.30],[-16.75,16.00],[-16.75,16.70]
]]}};
const hydroFallback={type:"FeatureCollection",features:[
 {type:"Feature",properties:{name:"Fleuve Sénégal",order:8},geometry:{type:"LineString",coordinates:[[-16.48,16.05],[-16.10,16.18],[-15.55,16.32],[-15.05,16.58],[-14.55,16.62],[-14.05,16.55],[-13.55,16.45],[-13.05,16.30],[-12.55,15.95],[-12.10,15.42],[-11.70,14.95],[-11.35,14.70],[-10.95,14.55],[-10.60,14.40]]}},
 {type:"Feature",properties:{name:"Bafing",order:6},geometry:{type:"LineString",coordinates:[[-10.60,14.40],[-10.70,13.95],[-10.95,13.45],[-11.15,12.95],[-11.35,12.45],[-11.55,11.95],[-11.75,11.50]]}},
 {type:"Feature",properties:{name:"Bakoye",order:5},geometry:{type:"LineString",coordinates:[[-10.60,14.40],[-10.15,14.10],[-9.80,13.75],[-9.45,13.35],[-9.20,12.95]]}},
 {type:"Feature",properties:{name:"Falémé",order:5},geometry:{type:"LineString",coordinates:[[-12.10,15.42],[-12.00,14.95],[-11.85,14.45],[-11.70,13.95],[-11.65,13.45],[-11.55,12.95],[-11.45,12.45],[-11.30,11.95]]}},
 {type:"Feature",properties:{name:"Karakoro",order:4},geometry:{type:"LineString",coordinates:[[-12.55,15.95],[-12.20,15.75],[-11.95,15.55],[-11.75,15.25]]}}
]};
const HYDRO_SERVICE='https://services.arcgis.com/GL0fWlNkwysZaKeV/ArcGIS/rest/services/Senegal_Georeferenced_2_WFL1/FeatureServer/0/query?where=1%3D1&outFields=NAME%2CMAJ_NAME%2CSUB_NAME%2CSTRAHLER&returnGeometry=true&outSR=4326&f=geojson';

function seeded(n){let x=Math.sin(n*997.1)*10000;return x-Math.floor(x)}
function pick(a,n){return a[Math.floor(seeded(n)*a.length)]}
const IFS_SOURCE_URL="https://www.groupe-initiatives.org/IMG/pdf/cartographies_des_projets_en_cours_dans_le_hbfs-v4.pdf";
const REAL_GUINEA_PROJECTS=[
 {id:"REAL-PGIRN-PBF",title:"Projet de Gestion Intégrée des Ressources Naturelles dans le Paysage Bafing-Falémé (PGIRN-PBF)",admin2s:["Mali","Koubia","Tougué","Siguiri"],org:"OGPNRF / MEDD",theme:"Gestion des ressources naturelles",odd:"ODD 15",status:"En cours",start:2021,end:2026,beneficiaries:0,partner:"PNUD",funder:"PNUD",budget:0,summary:"Gestion intégrée du paysage Bafing-Falémé : aires protégées, écovillages, restauration des forêts, protection des berges et têtes de sources, énergies renouvelables, chaînes de valeur et intégration du genre. Fin prévue : juin 2026.",source:"Atelier IFS de Labé 2024"},
 {id:"REAL-MBOP-PNMB",title:"Moyen Bafing Offset Programme / Parc National du Moyen Bafing (MBOP/PNMB)",admin2s:["Koubia","Tougué","Dinguiraye","Dabola","Mamou"],org:"OGPNRF",theme:"Gestion des ressources naturelles",odd:"ODD 15",status:"Terminé",start:2024,end:2025,beneficiaries:0,partner:"Trust Africa",funder:"Trust Africa",budget:0,summary:"Gestion transitoire du Parc National du Moyen Bafing avec l’OGPNRF : gestion durable des ressources naturelles, sauvegarde de l’intégrité du parc et prise en compte des préoccupations environnementales des communautés locales. Le document IFS indique 258 villages sur 6 763 km².",source:"Atelier IFS de Labé 2024"},
 {id:"REAL-PGIRN-MFD",title:"Projet de Gestion Intégrée des Ressources Naturelles du Massif du Fouta Djallon (PGIRN-MFD)",admin2s:["Labé","Tougué","Mamou"],org:"FAO",theme:"Gestion des ressources naturelles",odd:"ODD 15",status:"En cours",start:2021,end:2026,beneficiaries:0,partner:"FAO",funder:"FAO",budget:0,summary:"Collaboration régionale, gestion des ressources naturelles et moyens d’existence, renforcement des capacités et diffusion de l’information. Le document IFS mentionne les populations de six villages des sites pilotes comme cibles.",source:"Atelier IFS de Labé 2024"},
 {id:"REAL-FPROF",title:"Projet Femmes Pro-Forêts (P-FproF)",admin2s:["Tougué","Dinguiraye","Mamou"],org:"UPA DI",theme:"Énergie & climat",odd:"ODD 5",status:"En cours",start:2023,end:2026,beneficiaries:5000,partner:"UPA DI",funder:"Affaires mondiales Canada",budget:0,summary:"Adaptation aux changements climatiques, égalité femmes-hommes, conservation de la biodiversité et gouvernance inclusive des ressources naturelles. Le document IFS indique 5 000 bénéficiaires directs, dont 3 500 femmes, et 825 000 bénéficiaires indirects.",source:"Atelier IFS de Labé 2024"}
];
function guineaRegion(name){return ({Mali:"Labé",Koubia:"Labé",Tougué:"Labé",Labé:"Labé",Mamou:"Mamou",Dabola:"Faranah",Dinguiraye:"Faranah",Siguiri:"Kankan"})[name]||"Guinée"}
function makeProjects(){let out=[];let id=1;adminDefs.filter(d=>d[0]!=="Guinée").forEach((d,a)=>{let count=2+Math.floor(seeded(a+9)*5);for(let j=0;j<count;j++){let n=a*20+j+3;let start=2021+Math.floor(seeded(n+2)*5);let duration=1+Math.floor(seeded(n+3)*3);let end=Math.min(2026,start+duration);let org=pick(ORGS,n+4);let theme=pick(THEMES,n+5);out.push({id:`P${String(id++).padStart(3,"0")}`,title:["Renforcement des filières locales","Résilience des territoires riverains","Appui aux dynamiques communautaires","Accès durable aux services essentiels","Adaptation climatique et ressources naturelles","Développement économique inclusif"][Math.floor(seeded(n+6)*6)]+` — ${d[2]}`,country:d[0],region:d[1],admin2:d[2],org,theme,odd:pick(ODDS,n+7),status:end>=2026?"En cours":"Terminé",start,end,beneficiaries:600+Math.floor(seeded(n+8)*14000),partner:pick(PARTNERS,n+9),funder:pick(FUNDERS,n+10),budget:35000+Math.floor(seeded(n+11)*465000),summary:`Projet fictif de démonstration consacré à ${theme.toLowerCase()} dans l'unité administrative de ${d[2]}.`,isReal:false});}});
 REAL_GUINEA_PROJECTS.forEach(r=>r.admin2s.forEach(a=>out.push({...r,country:"Guinée",region:guineaRegion(a),admin2:a,isReal:true,sourceUrl:IFS_SOURCE_URL})));
 return out}
let projects=makeProjects();
function uniqueProjects(arr){const m=new Map();arr.forEach(p=>{if(!m.has(p.id))m.set(p.id,p)});return [...m.values()]}
function projectCoverage(id){return uniq(projects.filter(p=>p.id===id).map(p=>p.admin2))}
const historic=adminDefs.slice(0,14).map((d,i)=>({id:`H${i+1}`,country:d[0],region:d[1],admin2:d[2],projects:4+Math.floor(seeded(i+51)*11)}));

const map=L.map("map",{zoomControl:true,minZoom:3,preferCanvas:true}).fitBounds(DEFAULT_BOUNDS);
const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
const lowBandwidth=!!(connection&&(connection.saveData||['slow-2g','2g'].includes(connection.effectiveType)));
const tileOpts={updateWhenIdle:true,updateWhenZooming:!lowBandwidth,keepBuffer:lowBandwidth?1:2,detectRetina:false,crossOrigin:false};
const tiles={
"Plan OSM":L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{...tileOpts,attribution:"© OpenStreetMap contributors"}),
"Humanitaire":L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{...tileOpts,attribution:"© OpenStreetMap contributors, HOT"}),
"CyclOSM":L.tileLayer("https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",{...tileOpts,attribution:"© CyclOSM, OSM"}),
"Relief":L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{...tileOpts,attribution:"© OpenTopoMap, OSM"}),
"Satellite":L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{...tileOpts,attribution:"Tiles © Esri"})
};
let currentBase="Plan OSM"; tiles[currentBase].addTo(map);

let countryHalo=L.geoJSON(countryGeo,{style:{color:"white",weight:6,fill:false,opacity:.95},interactive:false}).addTo(map);
let countryLayer=L.geoJSON(countryGeo,{style:{color:"#183f34",weight:2.4,fill:false,opacity:1},interactive:false,onEachFeature:(f,l)=>l.bindTooltip(f.properties.name,{permanent:true,direction:"center",className:"country-label"})}).addTo(map);
let adminLayer,historicLayer,popLayer;
let basinLayer=null,hydroLayer=null;
function hydroStyle(f){let o=Number(f?.properties?.STRAHLER||f?.properties?.order||3);return {color:o>=7?'#0878c9':'#2b8fc9',weight:o>=7?3.6:o>=5?2.6:1.7,opacity:o>=7?.95:.78,lineCap:'round',lineJoin:'round'}}
function drawHydro(data){if(hydroLayer)map.removeLayer(hydroLayer);hydroLayer=L.geoJSON(data,{style:hydroStyle,interactive:false}).addTo(map);hydroLayer.bringToFront()}
function drawBasin(){if(basinLayer)map.removeLayer(basinLayer);basinLayer=L.geoJSON(basinGeo,{style:{color:"#2d78aa",weight:2,dashArray:"8 6",fillColor:"#5ba9d6",fillOpacity:.055},interactive:false}).addTo(map);basinLayer.bringToBack()}
drawBasin();drawHydro(hydroFallback);
fetch(HYDRO_SERVICE).then(r=>{if(!r.ok)throw new Error('hydro');return r.json()}).then(g=>{if(g&&g.features&&g.features.length>5){drawHydro(g);if(!$('toggleHydro').checked){map.removeLayer(hydroLayer)}}}).catch(()=>{});

const $=id=>document.getElementById(id); const fmt=n=>new Intl.NumberFormat("fr-FR").format(Math.round(n||0));
function uniq(a){return [...new Set(a)].sort((x,y)=>String(x).localeCompare(String(y),"fr"))}
function fillSelect(id,values,first){const el=$(id);let cur=el.value;el.innerHTML=`<option value="">${first}</option>`+values.map(v=>`<option>${v}</option>`).join("");if(values.includes(cur))el.value=cur}
function initFilters(){fillSelect("fCountry",uniq(projects.map(p=>p.country)),"Tous les pays");fillSelect("fOrg",uniq(projects.map(p=>p.org)),"Toutes");fillSelect("fTheme",uniq(projects.map(p=>p.theme)),"Toutes les thématiques");fillSelect("fFunder",uniq(projects.map(p=>p.funder)),"Tous les bailleurs");fillSelect("fPartner",uniq(projects.map(p=>p.partner)),"Tous les partenaires");fillSelect("fOdg",uniq(projects.map(p=>p.odd)),"Tous les ODD");$("fYearStart").innerHTML=[2021,2022,2023,2024,2025,2026].map(y=>`<option>${y}</option>`).join("");$("fYearEnd").innerHTML=[2021,2022,2023,2024,2025,2026].map(y=>`<option>${y}</option>`).join("");$("fYearStart").value=2021;$("fYearEnd").value=2026;cascade();}
function cascade(){
  // Les listes sont facettées : chaque choix est recalculé à partir des autres filtres actifs.
  refreshFacetOptions();
}
function projectMatchesExcept(p,exceptId){
  const ys=+$('fYearStart').value,ye=+$('fYearEnd').value;
  const checks=[
    ['fCountry',p.country],['fAdmin1',p.region],['fAdmin2',p.admin2],['fOrg',p.org],
    ['fTheme',p.theme],['fStatus',p.status],['fFunder',p.funder],['fPartner',p.partner],['fOdg',p.odd]
  ];
  for(const [id,val] of checks){if(id!==exceptId && $(id).value && $(id).value!==val)return false}
  if(exceptId!=='fYearStart' && p.end<ys)return false;
  if(exceptId!=='fYearEnd' && p.start>ye)return false;
  return true;
}
function setFacet(id,field,label){
  const cur=$(id).value;
  const values=uniq(projects.filter(p=>projectMatchesExcept(p,id)).map(p=>p[field]));
  fillSelect(id,values,label);
  if(cur && values.includes(cur))$(id).value=cur;
  else if(cur && !values.includes(cur))$(id).value='';
}
function refreshFacetOptions(){
  // Deux passes stabilisent les listes lorsqu'un choix devenu incompatible est retiré.
  for(let pass=0;pass<2;pass++){
    setFacet('fCountry','country','Tous les pays');
    setFacet('fAdmin1','region','Toutes les régions');
    setFacet('fAdmin2','admin2','Toutes les unités');
    setFacet('fOrg','org','Toutes');
    setFacet('fStatus','status','Tous');
    setFacet('fTheme','theme','Toutes les thématiques');
    setFacet('fFunder','funder','Tous les bailleurs');
    setFacet('fPartner','partner','Tous les partenaires');
    setFacet('fOdg','odd','Tous les ODD');
  }
}
function filtered(){let ys=+$('fYearStart').value,ye=+$('fYearEnd').value;return projects.filter(p=>(!$('fCountry').value||p.country===$('fCountry').value)&&(!$('fAdmin1').value||p.region===$('fAdmin1').value)&&(!$('fAdmin2').value||p.admin2===$('fAdmin2').value)&&(!$('fOrg').value||p.org===$('fOrg').value)&&(!$('fTheme').value||p.theme===$('fTheme').value)&&(!$('fStatus').value||p.status===$('fStatus').value)&&(!$('fFunder').value||p.funder===$('fFunder').value)&&(!$('fPartner').value||p.partner===$('fPartner').value)&&(!$('fOdg').value||p.odd===$('fOdg').value)&&p.end>=ys&&p.start<=ye)}
function statsFor(adminName,arr){let a=uniqueProjects(arr.filter(p=>p.admin2===adminName));return {projects:a.length,beneficiaries:a.reduce((s,p)=>s+p.beneficiaries,0),orgs:new Set(a.map(p=>p.org)).size,partners:new Set(a.map(p=>p.partner)).size,funders:new Set(a.map(p=>p.funder)).size}}
function metricValue(s){return s[$('metric').value]||0}
function color(v,max){if(!v)return '#dfe7e3';let t=Math.min(1,v/(max||1));let light=76-t*38;return `hsl(157 42% ${light}%)`}
const ADMIN_TERMS={
  "Sénégal":{adm1:"Région",adm2:"Département"},
  "Mali":{adm1:"Région",adm2:"Cercle"},
  "Mauritanie":{adm1:"Wilaya",adm2:"Moughataa"},
  "Guinée":{adm1:"Région",adm2:"Préfecture"}
};
function adminTerm(country,level='adm2'){return (ADMIN_TERMS[country]||{adm1:'Région',adm2:'Unité Admin 2'})[level]}
function currentAdminTerm(){return $('fCountry').value?adminTerm($('fCountry').value,'adm2'):'Unité Admin 2'}
function renderMap(arr){if(adminLayer)map.removeLayer(adminLayer);let vals=admin2Geo.features.map(f=>metricValue(statsFor(f.properties.name,arr)));let max=Math.max(1,...vals);adminLayer=L.geoJSON(admin2Geo,{interactive:false,style:f=>{let s=statsFor(f.properties.name,arr);return {color:metricValue(s)?'#dcebe5':'#8fa39b',weight:metricValue(s)?1.05:0.7,fillColor:color(metricValue(s),max),fillOpacity:metricValue(s)?.25:.035,lineCap:'butt',lineJoin:'miter'}}}).addTo(map);
let term=currentAdminTerm();let metricNames={projects:`Nombre de projets couvrant ${term==='Unité Admin 2'?'l’unité':'le/la '+term.toLowerCase()}`,orgs:'Intervenants',partners:'Partenaires',funders:'Bailleurs'};$('legend').innerHTML=`<b>${metricNames[$('metric').value]}</b><span style="float:right;color:#6b7c76">${term}</span><div class="ramp"></div><div class="ends"><span>0</span><span>${fmt(max)}</span></div>`;
if($('toggleHistoric').checked){if(historicLayer)map.removeLayer(historicLayer);historicLayer=L.geoJSON(admin2Geo,{style:f=>{let h=historic.find(x=>x.admin2===f.properties.name);return {color:'#7d4d8b',dashArray:'5 4',weight:2,fillColor:'#b892c1',fillOpacity:h?.projects?0.22:0}},interactive:false}).addTo(map)}else if(historicLayer){map.removeLayer(historicLayer);historicLayer=null}
if($('togglePopulation').checked){if(popLayer)map.removeLayer(popLayer);popLayer=L.geoJSON(admin2Geo,{style:f=>({color:'#c27c00',weight:1.2,fillColor:'#f0bd65',fillOpacity:Math.min(.45,f.properties.population/600000)}),interactive:false}).addTo(map)}else if(popLayer){map.removeLayer(popLayer);popLayer=null}
if($('toggleBasin').checked){if(!basinLayer)drawBasin();else if(!map.hasLayer(basinLayer))basinLayer.addTo(map)}else if(basinLayer&&map.hasLayer(basinLayer))map.removeLayer(basinLayer);
if($('toggleHydro').checked){if(!hydroLayer)drawHydro(hydroFallback);else if(!map.hasLayer(hydroLayer))hydroLayer.addTo(map);hydroLayer.bringToFront()}else if(hydroLayer&&map.hasLayer(hydroLayer))map.removeLayer(hydroLayer);
countryHalo.bringToFront();countryLayer.bringToFront();if($('toggleHydro').checked&&hydroLayer&&map.hasLayer(hydroLayer))hydroLayer.bringToFront();}
function renderKpis(arr){let u=uniqueProjects(arr);$('countBadge').textContent=`${u.length} projets uniques`;$('kProjects').textContent=fmt(u.length);$('kBenef').textContent=fmt(u.reduce((s,p)=>s+p.beneficiaries,0));$('kOrgs').textContent=new Set(u.map(p=>p.org)).size;$('kPartners').textContent=new Set(u.map(p=>p.partner)).size;$('kFunders').textContent=new Set(u.map(p=>p.funder)).size;$('kAdmin2').textContent=new Set(arr.map(p=>p.admin2)).size;
let counts=THEMES.map(t=>[t,u.filter(p=>p.theme===t).length]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]);$('themeCount').textContent=`${counts.length} actives`;let m=Math.max(1,...counts.map(x=>x[1]));$('themeChart').innerHTML=counts.slice(0,8).map(([t,n])=>`<div class="bar-row"><span>${t}</span><span class="bar-bg"><span class="bar-fill" style="display:block;width:${n/m*100}%"></span></span><b>${n}</b></div>`).join('');
let years=[2021,2022,2023,2024,2025,2026].map(y=>[y,u.filter(p=>p.start<=y&&p.end>=y).length]),ym=Math.max(1,...years.map(x=>x[1]));$('yearChart').innerHTML=years.map(([y,n])=>`<div class="year-col"><i style="height:${n/ym*70}px"></i>${String(y).slice(2)}</div>`).join('')}
function renderProjects(arr){let u=uniqueProjects(arr);$('projectList').innerHTML=[...u].sort((a,b)=>b.end-a.end).slice(0,30).map(p=>`<div class="project-card" data-id="${p.id}"><div class="tags"><span class="tag">${p.org}</span><span class="tag status">${p.status}</span>${p.isReal?'<span class="tag real-tag">SOURCE IFS</span>':''}</div><h4>${p.title}</h4><div class="project-meta"><span>${p.isReal?projectCoverage(p.id).join(', '):p.admin2} · ${p.country}</span><span>${p.start}–${p.end}</span></div></div>`).join('')||'<p class="note">Aucun projet ne correspond aux filtres.</p>';document.querySelectorAll('#projectList .project-card').forEach(x=>x.onclick=()=>showProject(projects.find(p=>p.id===x.dataset.id)))}
function zoomToSelection(arr){let feats=admin2Geo.features.filter(f=>(!$('fCountry').value||f.properties.country===$('fCountry').value)&&(!$('fAdmin1').value||f.properties.region===$('fAdmin1').value)&&(!$('fAdmin2').value||f.properties.name===$('fAdmin2').value));if($('fCountry').value||$('fAdmin1').value||$('fAdmin2').value){if(feats.length){let l=L.geoJSON({type:'FeatureCollection',features:feats});map.fitBounds(l.getBounds(),{padding:[30,30],maxZoom:$('fAdmin2').value?8:$('fAdmin1').value?7:6})}}else if(arr.length<projects.length&&arr.length){let names=new Set(arr.map(p=>p.admin2));let f=admin2Geo.features.filter(x=>names.has(x.properties.name));if(f.length)map.fitBounds(L.geoJSON({type:'FeatureCollection',features:f}).getBounds(),{padding:[25,25],maxZoom:7})}}
function activeFilterItems(){
  const items=[];
  const defs=[['fCountry','Pays'],['fAdmin1','Région'],['fAdmin2','Admin 2'],['fOrg','Organisation'],['fStatus','État'],['fTheme','Thématique'],['fFunder','Bailleur'],['fPartner','Partenaire'],['fOdg','ODD']];
  defs.forEach(([id,label])=>{if($(id).value)items.push({id,label,value:$(id).value})});
  if(+$('fYearStart').value!==2021)items.push({id:'fYearStart',label:'Début',value:$('fYearStart').value});
  if(+$('fYearEnd').value!==2026)items.push({id:'fYearEnd',label:'Fin',value:$('fYearEnd').value});
  return items;
}
function refreshFilterUI(){
  const items=activeFilterItems();
  $('activeCount').textContent=items.length?`${items.length} filtre${items.length>1?'s':''} actif${items.length>1?'s':''}`:'Aucun filtre actif';
  $('activeFilters').innerHTML=items.map(x=>`<button class="filter-chip" data-filter="${x.id}" title="Retirer ce filtre">${x.label} : ${x.value} ×</button>`).join('');
  document.querySelectorAll('.filter-chip').forEach(b=>b.onclick=()=>{let id=b.dataset.filter;$(id).value=(id==='fYearStart'?2021:id==='fYearEnd'?2026:'');update(true,true)});
  ['fCountry','fAdmin1','fAdmin2','fOrg','fStatus','fTheme','fFunder','fPartner','fOdg'].forEach(id=>$(id).classList.toggle('is-active',!!$(id).value));
  $('fYearStart').classList.toggle('is-active',+$('fYearStart').value!==2021);
  $('fYearEnd').classList.toggle('is-active',+$('fYearEnd').value!==2026);
  const extras=['fFunder','fPartner','fOdg'].filter(id=>$(id).value).length + ( +$('fYearStart').value!==2021 ? 1:0) + (+$('fYearEnd').value!==2026 ? 1:0);
  $('extraBadge').textContent=extras?String(extras):'';
}
function update(doZoom=false,resetRight=false){
  cascade();
  let arr=filtered();
  renderMap(arr);renderKpis(arr);renderProjects(arr);refreshFilterUI();
  if(resetRight)showSummaryView();
  if(doZoom)zoomToSelection(arr);
}
let selectedHighlight=null,selectedPulseTimer=null,lastAdminSelection=null;
function ensureRightVisible(){
  if(innerWidth<=1280){$('rightPanel').classList.add('summary-open');$('leftPanel').classList.remove('open')}
  if(layout.classList.contains('right-collapsed')){layout.classList.remove('right-collapsed');localStorage.setItem('ifs-right-collapsed','0')}
  setTimeout(()=>map.invalidateSize(),120);
}
function showSummaryView(){
  $('selectionView').classList.add('hidden');$('summaryDefault').classList.remove('hidden');lastAdminSelection=null;
}
function pulseAdmin(name,fit=true){
  const f=admin2Geo.features.find(x=>x.properties.name===name);if(!f)return;
  if(selectedHighlight){map.removeLayer(selectedHighlight);selectedHighlight=null}
  clearInterval(selectedPulseTimer);
  selectedHighlight=L.geoJSON(f,{style:{color:'#ffd34e',weight:6,fillColor:'#ffd34e',fillOpacity:.18,opacity:1},interactive:false}).addTo(map);
  selectedHighlight.bringToFront(); countryHalo.bringToFront(); countryLayer.bringToFront();
  if(fit)map.fitBounds(L.geoJSON(f).getBounds(),{padding:[70,70],maxZoom:9});
  let on=true,count=0;selectedPulseTimer=setInterval(()=>{if(!selectedHighlight){clearInterval(selectedPulseTimer);return}on=!on;selectedHighlight.setStyle({color:on?'#ffd34e':'#ffffff',weight:on?7:3,fillOpacity:on?.24:.06});count++;if(count>=6){clearInterval(selectedPulseTimer);setTimeout(()=>{if(selectedHighlight){map.removeLayer(selectedHighlight);selectedHighlight=null}},650)}},280);
}
function setRightView(html){$('summaryDefault').classList.add('hidden');$('selectionView').classList.remove('hidden');$('selectionView').innerHTML=html;ensureRightVisible()}
function showProject(p,fromAdmin=''){
  if(!p)return;lastAdminSelection=fromAdmin||p.admin2;const coverage=projectCoverage(p.id);const source=p.isReal?`<section class="detail-section real-source"><h4>✓ Donnée réelle publiée</h4><p>Projet et couverture territoriale issus de la présentation du 4e atelier de l’Initiative Fleuve Sénégal, Labé, novembre 2024.</p><a href="${p.sourceUrl}" target="_blank">Consulter la source IFS ↗</a></section>`:'';
  setRightView(`<div class="selection-head"><button class="back-link" onclick="${fromAdmin?`showAdminByName('${fromAdmin}')`:'showSummaryView()'}">← ${fromAdmin?'Retour à l’unité':'Vue d’ensemble'}</button><div class="eyebrow">PROJET ${p.isReal?'· DONNÉE RÉELLE':''}</div><h2>${p.title}</h2></div><div class="selection-scroll"><div class="tags"><span class="tag">${p.org}</span><span class="tag status">${p.status}</span><span class="tag">${p.theme}</span>${p.isReal?'<span class="tag real-tag">SOURCE IFS 2024</span>':''}</div><div class="detail-grid"><div><small>Territoires couverts</small><strong>${coverage.join(', ')}</strong></div><div><small>Période</small><strong>${p.start}–${p.end}</strong></div><div><small>Bénéficiaires directs documentés</small><strong>${p.beneficiaries?fmt(p.beneficiaries):'Non précisé'}</strong></div><div><small>Budget global</small><strong>${p.budget?fmt(p.budget)+' €':'Non précisé'}</strong></div><div><small>Partenaire / opérateur</small><strong>${p.partner}</strong></div><div><small>Bailleur indiqué</small><strong>${p.funder}</strong></div><div><small>ODD indicatif</small><strong>${p.odd}</strong></div><div><small>Identifiant démo</small><strong>${p.id}</strong></div></div><section class="detail-section"><h4>Résumé</h4><p>${p.summary}</p></section>${source}<div class="actions-row"><button onclick="zoomRealProject('${p.id}')">◎ Voir tout le périmètre</button></div></div>`)
}
window.zoomProject=name=>pulseAdmin(name,true);
function highlightProjectCoverage(id,fit=true){
  const names=new Set(projectCoverage(id));
  const feats=admin2Geo.features.filter(f=>names.has(f.properties.name));
  if(!feats.length)return;
  if(selectedHighlight){map.removeLayer(selectedHighlight);selectedHighlight=null}
  clearInterval(selectedPulseTimer);
  const fc={type:'FeatureCollection',features:feats};
  selectedHighlight=L.geoJSON(fc,{style:{color:'#ffd34e',weight:7,fillColor:'#ffd34e',fillOpacity:.20,opacity:1},interactive:false}).addTo(map);
  selectedHighlight.bringToFront();countryHalo.bringToFront();countryLayer.bringToFront();selectedHighlight.bringToFront();
  if(fit)map.fitBounds(selectedHighlight.getBounds(),{padding:[70,70],maxZoom:8});
  let on=true,count=0;
  selectedPulseTimer=setInterval(()=>{
    if(!selectedHighlight){clearInterval(selectedPulseTimer);return}
    on=!on;
    selectedHighlight.setStyle({color:on?'#ffd34e':'#ffffff',weight:on?8:4,fillColor:'#ffd34e',fillOpacity:on?.28:.08,opacity:1});
    count++;
    if(count>=6){
      clearInterval(selectedPulseTimer);
      if(selectedHighlight)selectedHighlight.setStyle({color:'#ffd34e',weight:5,fillColor:'#ffd34e',fillOpacity:.13,opacity:1});
    }
  },280);
}
window.zoomRealProject=id=>highlightProjectCoverage(id,true);
function showAdmin(prop,s){
  lastAdminSelection=prop.name;
  let ps=uniqueProjects(filtered().filter(p=>p.admin2===prop.name));let f=admin2Geo.features.find(x=>x.properties.name===prop.name);let c=L.geoJSON(f).getBounds().getCenter();let sv=`https://www.google.com/maps?q&layer=c&cbll=${c.lat},${c.lng}`;let gm=`https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`;
  setRightView(`<div class="selection-head"><button class="back-link" onclick="showSummaryView()">← Vue d’ensemble</button><div class="eyebrow">${adminTerm(prop.country,'adm2').toUpperCase()}</div><h2>${prop.name}${prop.country==='Guinée'&&prop.name==='Mali'?' <span class="admin-disambig">(préfecture)</span>':''}</h2><p>${prop.region?adminTerm(prop.country,'adm1')+' de '+prop.region+' · ':''}${prop.country}</p></div><div class="selection-scroll"><div class="detail-grid"><div><small>Projets couvrant cette unité</small><strong>${s.projects}</strong></div><div><small>Bénéficiaires au niveau territorial</small><strong>Non territorialisés</strong></div><div><small>Intervenants</small><strong>${s.orgs}</strong></div><div><small>Partenaires</small><strong>${s.partners}</strong></div><div><small>Bailleurs</small><strong>${s.funders}</strong></div><div><small>Population contexte</small><strong>${prop.population?fmt(prop.population):'Non renseignée'}</strong></div></div><div class="actions-row"><a target="_blank" href="${sv}">👁 Vue terrain</a><a target="_blank" href="${gm}">📍 Google Maps</a><button onclick="filterAdmin('${prop.name}')">Filtrer sur cette unité</button></div><section class="detail-section"><h4>Projets couvrant cette unité</h4><div class="project-list">${ps.map(p=>`<div class="project-card" onclick="showProjectById('${p.id}','${prop.name}')"><h4>${p.title}</h4><div class="project-meta"><span>${p.org}${p.isReal?' · source IFS':''}</span><span>${p.start}–${p.end}</span></div></div>`).join('')||'<p class="note">Aucun projet avec les filtres actuels.</p>'}</div></section></div>`);
}
function openAdminPopup(prop,latlng){
  const s=statsFor(prop.name,filtered());
  L.popup({closeButton:true,autoPan:false,maxWidth:230}).setLatLng(latlng).setContent(`<div class="popup compact-popup"><h3>${prop.name}</h3><div class="muted">${prop.region} · ${prop.country}</div><div class="compact-line"><strong>${s.projects}</strong> projet${s.projects>1?'s':''} couvrant cette préfecture</div><div class="muted">Double-clic : information rapide</div></div>`).openOn(map);
}
function selectAdminFromMap(prop,latlng){
  // Le clic carte sert à consulter une unité, sans modifier les filtres d'analyse à gauche.
  map.closePopup();
  const current=filtered();
  showAdmin(prop,statsFor(prop.name,current));
  pulseAdmin(prop.name,false);
}
window.showAdminByName=name=>{let f=admin2Geo.features.find(x=>x.properties.name===name);if(f){showAdmin(f.properties,statsFor(name,filtered()));pulseAdmin(name,false)}};
window.showProjectById=(id,fromAdmin='')=>{showProject(projects.find(p=>p.id===id),fromAdmin);highlightProjectCoverage(id,false)};window.filterAdmin=name=>{$('fAdmin2').value=name;update(true);showAdminByName(name)};window.showSummaryView=showSummaryView;

// Sélection robuste par hit-test : le clic simple consulte l'Admin 2, indépendamment de l'ordre des calques Leaflet.
function pointInRing(latlng,ring){
  const x=latlng.lng,y=latlng.lat;let inside=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const xi=ring[i][0],yi=ring[i][1],xj=ring[j][0],yj=ring[j][1];
    const hit=((yi>y)!=(yj>y)) && (x < (xj-xi)*(y-yi)/((yj-yi)||1e-12)+xi);
    if(hit)inside=!inside;
  }
  return inside;
}
function featureAtLatLng(latlng){
  for(let i=admin2Geo.features.length-1;i>=0;i--){
    const f=admin2Geo.features[i],g=f.geometry;if(!g)continue;
    if(g.type==='Polygon' && g.coordinates.some(r=>pointInRing(latlng,r)))return f;
    if(g.type==='MultiPolygon' && g.coordinates.some(poly=>poly.some(r=>pointInRing(latlng,r))))return f;
  }
  return null;
}
let mapSingleClickTimer=null;
map.doubleClickZoom.disable();
map.on('click',e=>{
  clearTimeout(mapSingleClickTimer);
  mapSingleClickTimer=setTimeout(()=>{
    const f=featureAtLatLng(e.latlng);
    if(f)selectAdminFromMap(f.properties,e.latlng);
  },260);
});
map.on('mousemove',e=>{map.getContainer().style.cursor=featureAtLatLng(e.latlng)?'pointer':''});
map.on('mouseout',()=>{map.getContainer().style.cursor=''});
map.on('dblclick',e=>{
  clearTimeout(mapSingleClickTimer);mapSingleClickTimer=null;
  let sv=`https://www.google.com/maps?q&layer=c&cbll=${e.latlng.lat},${e.latlng.lng}`;let gm=`https://www.google.com/maps/search/?api=1&query=${e.latlng.lat},${e.latlng.lng}`;
  L.popup().setLatLng(e.latlng).setContent(`<div class="popup"><h3>Point cartographique</h3><div class="muted">${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}</div><div class="actions-row"><a target="_blank" href="${sv}">👁 Vue terrain</a><a target="_blank" href="${gm}">📍 Google Maps</a></div></div>`).openOn(map)
});

function openModal(title,html){$('modalTitle').textContent=title;$('modalBody').innerHTML=html;$('modal').classList.remove('hidden')}
$('btnContext').onclick=()=>openModal('Contexte — Initiative Fleuve Sénégal',`<h4>À propos</h4><p>L’Initiative Fleuve Sénégal est un cadre de concertation entre six associations de solidarité internationale intervenant dans le Bassin du Fleuve Sénégal. Cette maquette reprend les fonctionnalités attendues dans les TDR : consultation agrégée Admin 1 / Admin 2, fiches projets, filtres croisés, indicateurs dynamiques, couches de contexte, historique Traverse 50 et mise à jour simplifiée.</p><h4>Membres</h4><ul>${ORGS.map(o=>`<li>${o}</li>`).join('')}</ul><h4>Diffusion</h4><p>La même application peut être utilisée en page autonome ou embarquée par iframe.</p><div class="iframe-hint">&lt;iframe src="${location.origin}${location.pathname}?embed=1" width="100%" height="760" loading="lazy"&gt;&lt;/iframe&gt;</div>`);
$('btnAdmin').onclick=()=>openModal('Administration du contenu',`<div class="admin-form"><p>Dans une version de production, cet écran serait protégé par authentification. Pour la maquette, il montre le principe d’édition sans modifier le code.</p><label>Présentation du Bassin<textarea id="ctxText">Territoire de coopération transfrontalière autour du Fleuve Sénégal.</textarea></label><label>Contact / équipe<input value="Initiative Fleuve Sénégal"></label><label>Logo / identité visuelle<input value="Logo IFS (fichier à déposer)"></label><button class="primary" onclick="alert('Maquette : contenu validé localement')">Enregistrer</button><p class="note">La mise à jour des projets s’effectue via le bouton « Mettre à jour les données » avec contrôle préalable des fichiers Excel ou CSV.</p></div>`);
$('modalClose').onclick=()=>$('modal').classList.add('hidden');$('drawerClose').onclick=()=>$('drawer').classList.add('hidden');
$('btnHome').onclick=()=>map.fitBounds(DEFAULT_BOUNDS);$('btnReset').onclick=()=>{showSummaryView();map.closePopup();['fCountry','fAdmin1','fAdmin2','fOrg','fTheme','fStatus','fFunder','fPartner','fOdg'].forEach(id=>$(id).value='');$('fYearStart').value=2021;$('fYearEnd').value=2026;$('toggleHistoric').checked=false;$('togglePopulation').checked=false;$('toggleHydro').checked=true;$('toggleBasin').checked=true;map.fitBounds(DEFAULT_BOUNDS);update(false)};

function parseCSV(text){
  let lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(x=>x.trim());
  if(!lines.length)return {rows:[],errors:['Fichier vide'],warnings:[],headers:[]};
  let sep=(lines[0].split(';').length>lines[0].split(',').length)?';':',';
  let parseLine=line=>{let out=[],cur='',q=false;for(let i=0;i<line.length;i++){let c=line[i];if(c==='"'){if(q&&line[i+1]==='"'){cur+='"';i++}else q=!q}else if(c===sep&&!q){out.push(cur.trim());cur=''}else cur+=c}out.push(cur.trim());return out};
  let headers=parseLine(lines[0]).map(h=>h.trim());
  let rows=lines.slice(1).map(l=>{let a=parseLine(l),o={};headers.forEach((h,i)=>o[h]=a[i]??'');return o});
  return validateData(headers,rows);
}
function parseWorkbook(buffer){
  if(typeof XLSX==='undefined')return {rows:[],errors:['Le composant de lecture Excel n’a pas pu être chargé. Vérifiez la connexion Internet.'],warnings:[],headers:[]};
  const wb=XLSX.read(buffer,{type:'array',cellDates:false});
  const preferred=wb.SheetNames.includes('PROJETS')?'PROJETS':wb.SheetNames[0];
  if(!preferred)return {rows:[],errors:['Classeur Excel vide'],warnings:[],headers:[]};
  const rows=XLSX.utils.sheet_to_json(wb.Sheets[preferred],{defval:'',raw:false});
  const headers=rows.length?Object.keys(rows[0]):[];
  return validateData(headers,rows);
}
function validateData(headers,rows){
  const req=['id','title','country','region','admin2','org','theme','odd','status','start','end','beneficiaries','partner','funder','budget','summary'];
  const aliases={
    'Identifiant projet':'id','Titre du projet':'title','Pays':'country','Région':'region','Region':'region',
    'Unité Admin 2':'admin2','Unite Admin 2':'admin2','Organisation':'org','Thématique':'theme','Thematique':'theme',
    'ODD':'odd','État':'status','Etat':'status','Année de début':'start','Annee de debut':'start','Année de fin':'end','Annee de fin':'end',
    'Bénéficiaires':'beneficiaries','Beneficiaires':'beneficiaries','Partenaire':'partner','Bailleur':'funder','Budget (€)':'budget','Budget':'budget','Résumé':'summary','Resume':'summary'
  };
  const sourceHeaders=headers.map(h=>String(h).trim());
  const mappedHeaders=sourceHeaders.map(h=>aliases[h]||h);
  rows=rows.map(r=>{let o={};sourceHeaders.forEach((h,i)=>o[mappedHeaders[i]]=r[h]??'');return o});
  headers=mappedHeaders;
  let errors=[],warnings=[];
  req.filter(x=>!headers.includes(x)).forEach(x=>errors.push(`Colonne obligatoire manquante : ${x}`));
  if(errors.length)return {rows,errors,warnings,headers};
  let known=new Set(adminDefs.map(d=>`${d[0]}|${d[1]}|${d[2]}`)),ids=new Set();
  rows.forEach((r,i)=>{
    let n=i+2;
    if(req.some(k=>!String(r[k]??'').trim()))errors.push(`Ligne ${n} : un champ obligatoire est vide`);
    if(!known.has(`${r.country}|${r.region}|${r.admin2}`))errors.push(`Ligne ${n} : combinaison pays / région / Admin 2 inconnue`);
    if(!['En cours','Terminé'].includes(r.status))errors.push(`Ligne ${n} : état invalide (${r.status})`);
    let sy=+r.start,ey=+r.end,b=+String(r.beneficiaries).replace(/\s/g,''),bu=+String(r.budget).replace(/\s/g,'').replace(',','.');
    if(!(sy>=2021&&sy<=2026&&ey>=2021&&ey<=2026))errors.push(`Ligne ${n} : années hors 2021–2026`);
    if(sy>ey)errors.push(`Ligne ${n} : année de début supérieure à l'année de fin`);
    if(!Number.isFinite(b)||b<0)errors.push(`Ligne ${n} : bénéficiaires non numériques`);
    if(!Number.isFinite(bu)||bu<0)warnings.push(`Ligne ${n} : budget invalide ou nul`);
    if(ids.has(r.id))warnings.push(`Ligne ${n} : même projet sur plusieurs territoires (${r.id}) — relation acceptée`);
    ids.add(r.id);
    if(!THEMES.includes(r.theme))warnings.push(`Ligne ${n} : thématique non standard (${r.theme})`);
  });
  return {rows,errors:[...new Set(errors)],warnings:[...new Set(warnings)],headers};
}
function importModal(){
  openModal('Mettre à jour les données',`<p><strong>Excel (.xlsx) est recommandé</strong>. Une ligne correspond à <strong>un projet × une unité Admin 2</strong>. Un même identifiant projet peut donc apparaître plusieurs fois : aucune géométrie SIG n'est demandée dans le fichier.</p><div id="dropzone" class="dropzone"><strong>Choisir ou déposer un fichier Excel ou CSV</strong><br><span class="note">Formats acceptés : .xlsx, .xls, .csv</span></div><div class="import-links"><a href="modele_import_ifs.xlsx" download>Télécharger le modèle Excel</a><a href="sample_projects.csv" download>Télécharger le modèle CSV</a></div><div class="validation" id="validation"><p class="note">Feuille Excel recommandée : <strong>PROJETS</strong>. Répétez l'ID du projet pour chaque Admin 2 couvert. Les en-têtes sont en français. Le modèle Excel propose des listes de choix : Pays (4 pays IFS), Région et Unité Admin 2 cohérentes avec le pays, ainsi que des listes enrichissables pour la thématique, l'organisation, les partenaires et les bailleurs.</p></div>`);
  setTimeout(()=>{
    const dz=$('dropzone');
    dz.onclick=()=>$('dataInput').click();
    ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag')}));
    ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag')}));
    dz.addEventListener('drop',e=>{const f=e.dataTransfer.files[0];if(f)processImportFile(f)});
  },0);
}
function showValidation(file,res){
  let html=`<h4>Contrôle de ${file.name}</h4><p class="${res.errors.length?'err':'ok'}">${res.errors.length?`⛔ ${res.errors.length} erreur(s) bloquante(s)`:`✓ ${res.rows.length} ligne(s) territoriale(s) valide(s)`}</p>`;
  if(res.errors.length)html+=`<ul class="err">${res.errors.slice(0,15).map(x=>`<li>${x}</li>`).join('')}</ul>`;
  if(res.warnings.length)html+=`<p class="warn">⚠ ${res.warnings.length} avertissement(s)</p><ul class="warn">${res.warnings.slice(0,10).map(x=>`<li>${x}</li>`).join('')}</ul>`;
  if(!res.errors.length){
    html+=`<button id="applyImport" class="primary">Importer ${res.rows.length} lignes territoriales</button><div class="table-wrap"><table><tr>${res.headers.slice(0,8).map(h=>`<th>${h}</th>`).join('')}</tr>${res.rows.slice(0,5).map(r=>`<tr>${res.headers.slice(0,8).map(h=>`<td>${r[h]}</td>`).join('')}</tr>`).join('')}</table></div>`;
  }
  $('validation').innerHTML=html;
  if(!res.errors.length)setTimeout(()=>{$('applyImport').onclick=()=>{
    projects=res.rows.map(r=>({...r,start:+r.start,end:+r.end,beneficiaries:+String(r.beneficiaries).replace(/\s/g,''),budget:+String(r.budget).replace(/\s/g,'').replace(',','.')}));
    initFilters();update(false);loadAllRealBoundaries();
$('modal').classList.add('hidden');alert('Import réussi : la carte et les indicateurs ont été recalculés.');
  }},0);
}
function processImportFile(file){
  const name=file.name.toLowerCase();
  if(!/\.(xlsx|xls|csv)$/.test(name)){showValidation(file,{rows:[],headers:[],errors:['Format non pris en charge. Utilisez .xlsx, .xls ou .csv.'],warnings:[]});return;}
  const reader=new FileReader();
  reader.onload=()=>{let res=name.endsWith('.csv')?parseCSV(reader.result):parseWorkbook(reader.result);showValidation(file,res)};
  if(name.endsWith('.csv'))reader.readAsText(file,'utf-8');else reader.readAsArrayBuffer(file);
}


// V8 - ergonomie avancée : panneaux ajustables, plein écran, thème nuit et connexion dégradée.
const layout=document.querySelector('.layout');
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
function restorePanelLayout(){
  const lw=Number(localStorage.getItem('ifs-left-width'))||285;
  const rw=Number(localStorage.getItem('ifs-right-width'))||330;
  layout.style.setProperty('--left-w',clamp(lw,240,520)+'px');
  layout.style.setProperty('--right-w',clamp(rw,280,560)+'px');
  if(localStorage.getItem('ifs-left-collapsed')==='1') layout.classList.add('left-collapsed');
  if(localStorage.getItem('ifs-right-collapsed')==='1') layout.classList.add('right-collapsed');
}
restorePanelLayout();
function togglePanel(side){
  const cls=side==='left'?'left-collapsed':'right-collapsed';
  layout.classList.toggle(cls);
  localStorage.setItem(`ifs-${side}-collapsed`,layout.classList.contains(cls)?'1':'0');
  setTimeout(()=>map.invalidateSize(),220);
}
$('btnCollapseLeft').onclick=()=>togglePanel('left');
$('btnCollapseRight').onclick=()=>togglePanel('right');
function makeResizable(handle,side,min,max){
  let active=false;
  const move=e=>{if(!active)return; const rect=layout.getBoundingClientRect(); const width=side==='left'?e.clientX-rect.left:rect.right-e.clientX; const w=clamp(width,min,max); layout.style.setProperty(side==='left'?'--left-w':'--right-w',w+'px'); localStorage.setItem(`ifs-${side}-width`,String(w)); map.invalidateSize({pan:false});};
  const up=()=>{active=false;handle.classList.remove('dragging');document.body.style.userSelect='';window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up)};
  handle.addEventListener('mousedown',e=>{if(innerWidth<=1280)return;active=true;e.preventDefault();handle.classList.add('dragging');document.body.style.userSelect='none';window.addEventListener('mousemove',move);window.addEventListener('mouseup',up)});
  handle.addEventListener('dblclick',()=>{const w=side==='left'?285:330;layout.style.setProperty(side==='left'?'--left-w':'--right-w',w+'px');localStorage.setItem(`ifs-${side}-width`,String(w));setTimeout(()=>map.invalidateSize(),20)});
}
makeResizable($('leftResizer'),'left',240,520);makeResizable($('rightResizer'),'right',280,560);

function applyTheme(dark,save=true){
  document.body.classList.toggle('dark',dark);
  $('btnTheme').textContent=dark?'☀':'☾'; $('btnTheme').title=dark?'Mode jour':'Mode nuit';
  countryHalo.setStyle({color:dark?'#d7e5de':'#ffffff',weight:dark?6.5:7,opacity:dark?.9:.96});
  countryLayer.setStyle({color:dark?'#8ed7bd':'#064f40',weight:dark?3.4:3.6,opacity:1,fillColor:'#46a98a',fillOpacity:dark?.06:.075});
  if(save)localStorage.setItem('ifs-theme',dark?'dark':'light');
}
function switchBasemap(name){
  if(!tiles[name]||name===currentBase)return;
  if(tiles[currentBase]&&map.hasLayer(tiles[currentBase]))map.removeLayer(tiles[currentBase]);currentBase=name;tiles[currentBase].addTo(map);tiles[currentBase].bringToBack();
  document.querySelectorAll('.basemap-option').forEach(x=>x.classList.toggle('active',x.dataset.basemap===name));
}
$('btnTheme').onclick=()=>applyTheme(!document.body.classList.contains('dark'));
applyTheme(localStorage.getItem('ifs-theme')==='dark',false);

async function toggleFullscreen(){
  try{if(!document.fullscreenElement){await document.documentElement.requestFullscreen()}else{await document.exitFullscreen()}}catch(e){showNetwork('Le plein écran n’est pas autorisé par ce navigateur.','offline',4000)}
}
$('btnFullscreen').onclick=toggleFullscreen;
document.addEventListener('fullscreenchange',()=>{$('btnFullscreen').textContent=document.fullscreenElement?'⤢':'⛶';$('btnFullscreen').title=document.fullscreenElement?'Quitter le plein écran':'Plein écran';setTimeout(()=>map.invalidateSize(),120)});

let networkTimer=null,tileSlowTimer=null,tileErrors=[];
function showNetwork(text,type='warn',duration=0){const el=$('networkStatus');el.textContent=text;el.className='network-status '+type;clearTimeout(networkTimer);if(duration)networkTimer=setTimeout(()=>el.classList.add('hidden'),duration)}
function hideNetwork(){clearTimeout(networkTimer);$('networkStatus').classList.add('hidden')}
function evaluateConnection(){
  if(!navigator.onLine){showNetwork('Hors connexion · les données IFS restent consultables, le fond peut manquer.','offline');return}
  const c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  if(c&&(c.saveData||['slow-2g','2g'].includes(c.effectiveType))){showNetwork('Connexion lente · chargement cartographique allégé.','warn');return}
  hideNetwork();
}
window.addEventListener('offline',evaluateConnection);window.addEventListener('online',()=>{evaluateConnection();setTimeout(()=>map.eachLayer(l=>{if(l.redraw)l.redraw()}),300)});if(connection)connection.addEventListener?.('change',evaluateConnection);evaluateConnection();
Object.values(tiles).forEach(layer=>{
  layer.on('loading',()=>{clearTimeout(tileSlowTimer);tileSlowTimer=setTimeout(()=>{if(navigator.onLine)showNetwork('Fond cartographique lent · les données IFS restent disponibles.','warn')},6500)});
  layer.on('load',()=>{clearTimeout(tileSlowTimer);tileErrors=[];evaluateConnection()});
  layer.on('tileerror',()=>{tileErrors.push(Date.now());tileErrors=tileErrors.filter(t=>Date.now()-t<15000);if(tileErrors.length>=3)showNetwork('Fond cartographique perturbé · vous pouvez continuer à utiliser filtres et données.','warn',8000)});
});

// Panneaux responsifs : la synthèse reste accessible en 4/3 et les filtres sur petit écran.
if($('btnSummary')) $('btnSummary').onclick=()=>{$('rightPanel').classList.toggle('summary-open');$('leftPanel').classList.remove('open');setTimeout(()=>map.invalidateSize(),120)};
if($('btnFilters')) $('btnFilters').onclick=()=>{$('leftPanel').classList.toggle('open');$('rightPanel').classList.remove('summary-open');setTimeout(()=>map.invalidateSize(),120)};

$('btnImport').onclick=importModal;
$('dataInput').onchange=e=>{let file=e.target.files[0];if(file)processImportFile(file);e.target.value=''};

// Fonds de carte et options : disponibles en permanence, mais repliés par défaut.
function closeMapPanels(except){
  if(except!=='base'){$('basemapPanel').classList.add('hidden');$('btnBasemap').setAttribute('aria-expanded','false')}
  if(except!=='options'){$('mapOptionsPanel').classList.add('hidden');$('btnMapOptions').setAttribute('aria-expanded','false')}
}
$('btnBasemap').onclick=e=>{e.stopPropagation();const open=$('basemapPanel').classList.toggle('hidden')===false;$('btnBasemap').setAttribute('aria-expanded',String(open));if(open)closeMapPanels('base')};
$('btnMapOptions').onclick=e=>{e.stopPropagation();const open=$('mapOptionsPanel').classList.toggle('hidden')===false;$('btnMapOptions').setAttribute('aria-expanded',String(open));if(open)closeMapPanels('options')};
document.querySelectorAll('.basemap-option').forEach(btn=>btn.onclick=()=>{
  const name=btn.dataset.basemap;if(name===currentBase){closeMapPanels();return}
  switchBasemap(name);
  closeMapPanels();
});
document.addEventListener('click',e=>{if(!e.target.closest('.map-toolbox'))closeMapPanels()});
const analysisFilterIds=['fCountry','fAdmin1','fAdmin2','fOrg','fTheme','fStatus','fFunder','fPartner','fOdg','fYearStart','fYearEnd'];
analysisFilterIds.forEach(id=>$(id).addEventListener('change',()=>{
  const doZoom=['fCountry','fAdmin1','fAdmin2','fOrg','fTheme','fStatus','fFunder','fPartner','fOdg'].includes(id);
  // Tout changement d'analyse invalide une ancienne fiche projet/unité : retour automatique à la synthèse filtrée.
  update(doZoom,true);
}));
['metric','toggleHistoric','togglePopulation','toggleHydro','toggleBasin'].forEach(id=>$(id).addEventListener('change',()=>update(false,false)));

// V25 : référentiel administratif topologiquement cohérent.
// Principe : les contours pays ne sont PLUS chargés séparément.
// Ils sont reconstruits par dissolution des ADM2 réellement affichés, afin que
// la frontière extérieure d'un pays partage exactement les mêmes sommets que ses unités.
const GEOBOUNDARIES_COMMIT='9469f09';
const COUNTRY_REFS={
  'Sénégal':{iso:'SEN'},
  'Mali':{iso:'MLI'},
  'Mauritanie':{iso:'MRT'},
  'Guinée':{iso:'GIN'}
};
function gbCurrentFullUrl(iso,adm){return `https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/${GEOBOUNDARIES_COMMIT}/releaseData/gbOpen/${iso}/${adm}/geoBoundaries-${iso}-${adm}.geojson`}
function gbLegacyFullUrl(iso,adm){return `https://www.geoboundaries.org/data/geoBoundariesHPSCGS-3_0_0/${iso}/${adm}/geoBoundariesHPSCGS-3_0_0-${iso}-${adm}.geojson`}
function gbSimplifiedUrl(iso,adm){return `https://raw.githubusercontent.com/wmgeolab/geoBoundaries/${GEOBOUNDARIES_COMMIT}/releaseData/gbOpen/${iso}/${adm}/geoBoundaries-${iso}-${adm}_simplified.geojson`}
async function fetchBoundary(iso,adm){
  try{return {geo:await fetchGeoJSON(gbCurrentFullUrl(iso,adm)),source:'geoBoundaries complet'}}
  catch(e1){
    console.warn(`IFS V25 : référentiel complet ${iso} ${adm} indisponible, essai HPSCGS`,e1);
    try{return {geo:await fetchGeoJSON(gbLegacyFullUrl(iso,adm)),source:'HPSCGS haute précision (repli)'}}
    catch(e2){console.warn(`IFS V25 : HPSCGS ${iso} ${adm} indisponible, repli simplifié`,e2);return {geo:await fetchGeoJSON(gbSimplifiedUrl(iso,adm)),source:'simplifié de secours'}}
  }
}
function normName(x){return String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,'').replace(/\s+/g,' ').trim()}
const PROJECT_REGION_LOOKUP=new Map(adminDefs.map(d=>[`${d[0]}|${normName(d[2])}`,d[1]]));
function knownRegion(country,name){if(country==='Guinée')return guineaRegion(name);return PROJECT_REGION_LOOKUP.get(`${country}|${normName(name)}`)||''}
async function fetchGeoJSON(url){
  const r=await fetch(url,{cache:'force-cache'});if(!r.ok)throw new Error(`HTTP ${r.status}`);
  const txt=await r.text();if(txt.trim().startsWith('version https://git-lfs'))throw new Error('Git LFS pointer');
  const g=JSON.parse(txt);if(!g||!Array.isArray(g.features))throw new Error('GeoJSON invalide');return g;
}
function buildCountryGeoFromAdmin2(features){
  const out=[];
  for(const country of Object.keys(COUNTRY_REFS)){
    const fs=features.filter(f=>f.properties.country===country && f.geometry);
    if(!fs.length)continue;
    try{
      if(window.turf){
        // Une seule géométrie de frontière est fabriquée à partir des mêmes ADM2 que la carte.
        let dissolved;
        try{dissolved=turf.dissolve(turf.featureCollection(fs.map(f=>turf.feature(f.geometry,{country}))));}
        catch(_){
          let merged=turf.feature(fs[0].geometry,{country});
          for(let i=1;i<fs.length;i++){
            try{merged=turf.union(turf.featureCollection([merged,turf.feature(fs[i].geometry,{country})]));}catch(e){}
          }
          dissolved=merged;
        }
        const feats=dissolved?.type==='FeatureCollection'?dissolved.features:[dissolved];
        feats.filter(Boolean).forEach((f,i)=>out.push({...f,properties:{...(f.properties||{}),name:country,country,id:`derived-${country}-${i}`,derivedFromAdmin2:true}}));
        continue;
      }
    }catch(e){console.warn(`IFS V25 : dissolution ${country} impossible`,e)}
    // Secours sans Turf : MultiPolygon composé des ADM2. Il garantit au moins la même géométrie source.
    const polys=[];
    fs.forEach(f=>{if(f.geometry.type==='Polygon')polys.push(f.geometry.coordinates);else if(f.geometry.type==='MultiPolygon')polys.push(...f.geometry.coordinates)});
    out.push({type:'Feature',properties:{name:country,country,id:`derived-${country}`,derivedFromAdmin2:true},geometry:{type:'MultiPolygon',coordinates:polys}});
  }
  return {type:'FeatureCollection',features:out};
}
function rebuildCountryLayers(){
  if(countryHalo)map.removeLayer(countryHalo);if(countryLayer)map.removeLayer(countryLayer);
  countryHalo=L.geoJSON(countryGeo,{style:{color:'#ffffff',weight:7.0,fill:false,opacity:.96,lineCap:'round',lineJoin:'round'},interactive:false}).addTo(map);
  countryLayer=L.geoJSON(countryGeo,{style:{color:'#064f40',weight:3.6,fillColor:'#46a98a',fillOpacity:.075,opacity:1,lineCap:'round',lineJoin:'round'},interactive:false,onEachFeature:(f,l)=>l.bindTooltip(f.properties.name,{permanent:true,direction:'center',className:'country-label'})}).addTo(map);
}
async function loadAllRealBoundaries(){
  const adm2Features=[];const failures=[];
  for(const [country,cfg] of Object.entries(COUNTRY_REFS)){
    try{
      const b2=await fetchBoundary(cfg.iso,'ADM2');const g2=b2.geo;
      g2.features.forEach((f,i)=>{
        const raw=f.properties.shapeName||f.properties.name||`ADM2 ${i+1}`;
        const name=String(raw).trim();
        adm2Features.push({...f,properties:{...f.properties,country,region:knownRegion(country,name),name,id:`${cfg.iso}-adm2-${i}`,population:0,realBoundary:true}});
      });
      console.info(`IFS V25 : ${country} chargé (${g2.features.length} unités ADM2) — ${b2.source}.`);
    }catch(e){failures.push(country);console.warn(`IFS V25 : référentiel ${country} indisponible`,e)}
  }
  const loadedCountries=new Set(adm2Features.map(f=>f.properties.country));
  const remaining=admin2Geo.features.filter(f=>!loadedCountries.has(f.properties.country));
  admin2Geo={type:'FeatureCollection',features:[...remaining,...adm2Features]};
  // Les pays sont reconstruits APRES chargement des ADM2 : aucun ADM0 indépendant n'est affiché.
  countryGeo=buildCountryGeoFromAdmin2(admin2Geo.features.filter(f=>loadedCountries.has(f.properties.country)));
  if(countryGeo.features.length)rebuildCountryLayers();
  if(failures.length)showNetwork(`Référentiel administratif indisponible : ${failures.join(', ')}. Les autres pays restent utilisables.`,'warn',9000);
  update(false,false);
  return failures.length===0;
}

if(new URLSearchParams(location.search).get('embed')==='1'){document.body.classList.add('embed');document.querySelector('.topbar').style.display='none';document.querySelector('.layout').style.height='100vh'}
initFilters();update(false);loadAllRealBoundaries();
