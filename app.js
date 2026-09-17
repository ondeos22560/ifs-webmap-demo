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
["Guinée","Labé","Labé",[-12.6,11.0,-11.3,12.2]], ["Guinée","Labé","Mali",[-12.5,11.8,-11.2,13.0]], ["Guinée","Mamou","Mamou",[-12.2,9.9,-10.8,11.2]], ["Guinée","Mamou","Dalaba",[-12.3,10.3,-11.2,11.3]], ["Guinée","Faranah","Dabola",[-11.6,10.3,-10.1,11.8]], ["Guinée","Faranah","Dinguiraye",[-11.8,11.3,-10.2,12.5]]
];
function polyFromBox(b,i){const[x1,y1,x2,y2]=b; const j=(i%3)*.06;return [[[x1+j,y1],[x2,y1+.04],[x2-.05,y2-j],[x1,y2+.03],[x1+j,y1]]]}
const admin2Geo={type:"FeatureCollection",features:adminDefs.map((d,i)=>({type:"Feature",properties:{country:d[0],region:d[1],name:d[2],id:`a${i}`,population:35000+((i*37991)%260000)},geometry:{type:"Polygon",coordinates:polyFromBox(d[3],i)}}))};

const countryGeo=window.COUNTRY_GEOJSON;

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
function makeProjects(){let out=[];let id=1;adminDefs.forEach((d,a)=>{let count=2+Math.floor(seeded(a+9)*5);for(let j=0;j<count;j++){let n=a*20+j+3;let start=2021+Math.floor(seeded(n+2)*5);let duration=1+Math.floor(seeded(n+3)*3);let end=Math.min(2026,start+duration);let org=pick(ORGS,n+4);let theme=pick(THEMES,n+5);out.push({id:`P${String(id++).padStart(3,"0")}`,title:["Renforcement des filières locales","Résilience des territoires riverains","Appui aux dynamiques communautaires","Accès durable aux services essentiels","Adaptation climatique et ressources naturelles","Développement économique inclusif"][Math.floor(seeded(n+6)*6)]+` — ${d[2]}`,country:d[0],region:d[1],admin2:d[2],org,theme,odd:pick(ODDS,n+7),status:end>=2026?"En cours":"Terminé",start,end,beneficiaries:600+Math.floor(seeded(n+8)*14000),partner:pick(PARTNERS,n+9),funder:pick(FUNDERS,n+10),budget:35000+Math.floor(seeded(n+11)*465000),summary:`Projet de démonstration consacré à ${theme.toLowerCase()} dans l'unité administrative de ${d[2]}. Il illustre le niveau de détail attendu dans les TDR et les liens entre acteurs, bénéficiaires et territoire.`});}});return out}
let projects=makeProjects();
const historic=adminDefs.slice(0,14).map((d,i)=>({id:`H${i+1}`,country:d[0],region:d[1],admin2:d[2],projects:4+Math.floor(seeded(i+51)*11)}));

const map=L.map("map",{zoomControl:true,minZoom:3}).fitBounds(DEFAULT_BOUNDS);
const tiles={
"Plan OSM":L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}),
"OSM France":L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap France | © OSM"}),
"Humanitaire":L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors, HOT"}),
"CyclOSM":L.tileLayer("https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",{attribution:"© CyclOSM, OSM"}),
"Relief":L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:"© OpenTopoMap, OSM"}),
"Satellite":L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles © Esri"})
};
let currentBase="Plan OSM"; tiles[currentBase].addTo(map);

const countryHalo=L.geoJSON(countryGeo,{style:{color:"white",weight:6,fill:false,opacity:.95},interactive:false}).addTo(map);
const countryLayer=L.geoJSON(countryGeo,{style:{color:"#183f34",weight:2.4,fill:false,opacity:1},onEachFeature:(f,l)=>l.bindTooltip(f.properties.name,{permanent:true,direction:"center",className:"country-label"})}).addTo(map);
let adminLayer,historicLayer,popLayer;
let basinLayer=null,hydroLayer=null;
function hydroStyle(f){let o=Number(f?.properties?.STRAHLER||f?.properties?.order||3);return {color:o>=7?"#1769aa":"#3b8fc6",weight:o>=7?3.8:o>=5?2.6:1.5,opacity:o>=7?.95:.78,lineCap:"round"}}
function drawHydro(data){if(hydroLayer)map.removeLayer(hydroLayer);hydroLayer=L.geoJSON(data,{style:hydroStyle,interactive:false}).addTo(map);hydroLayer.bringToFront()}
function drawBasin(){if(basinLayer)map.removeLayer(basinLayer);basinLayer=L.geoJSON(basinGeo,{style:{color:"#2d78aa",weight:2,dashArray:"8 6",fillColor:"#5ba9d6",fillOpacity:.055},interactive:false}).addTo(map);basinLayer.bringToBack()}
drawBasin();drawHydro(hydroFallback);
fetch(HYDRO_SERVICE).then(r=>{if(!r.ok)throw new Error('hydro');return r.json()}).then(g=>{if(g&&g.features&&g.features.length>5){drawHydro(g);if(!$('toggleHydro').checked){map.removeLayer(hydroLayer)}}}).catch(()=>{});

const $=id=>document.getElementById(id); const fmt=n=>new Intl.NumberFormat("fr-FR").format(Math.round(n||0));
function uniq(a){return [...new Set(a)].sort((x,y)=>String(x).localeCompare(String(y),"fr"))}
function fillSelect(id,values,first){const el=$(id);let cur=el.value;el.innerHTML=`<option value="">${first}</option>`+values.map(v=>`<option>${v}</option>`).join("");if(values.includes(cur))el.value=cur}
function initFilters(){fillSelect("fCountry",uniq(projects.map(p=>p.country)),"Tous les pays");fillSelect("fOrg",uniq(projects.map(p=>p.org)),"Toutes");fillSelect("fTheme",uniq(projects.map(p=>p.theme)),"Toutes les thématiques");fillSelect("fFunder",uniq(projects.map(p=>p.funder)),"Tous les bailleurs");fillSelect("fPartner",uniq(projects.map(p=>p.partner)),"Tous les partenaires");fillSelect("fOdg",uniq(projects.map(p=>p.odd)),"Tous les ODD");$("fYearStart").innerHTML=[2021,2022,2023,2024,2025,2026].map(y=>`<option>${y}</option>`).join("");$("fYearEnd").innerHTML=[2021,2022,2023,2024,2025,2026].map(y=>`<option>${y}</option>`).join("");$("fYearStart").value=2021;$("fYearEnd").value=2026;cascade();}
function cascade(){let c=$("fCountry").value;let r=$("fAdmin1").value;let base=projects.filter(p=>!c||p.country===c);fillSelect("fAdmin1",uniq(base.map(p=>p.region)),"Toutes les régions");r=$("fAdmin1").value;base=base.filter(p=>!r||p.region===r);fillSelect("fAdmin2",uniq(base.map(p=>p.admin2)),"Toutes les unités");}
function filtered(){let ys=+$('fYearStart').value,ye=+$('fYearEnd').value;return projects.filter(p=>(!$('fCountry').value||p.country===$('fCountry').value)&&(!$('fAdmin1').value||p.region===$('fAdmin1').value)&&(!$('fAdmin2').value||p.admin2===$('fAdmin2').value)&&(!$('fOrg').value||p.org===$('fOrg').value)&&(!$('fTheme').value||p.theme===$('fTheme').value)&&(!$('fStatus').value||p.status===$('fStatus').value)&&(!$('fFunder').value||p.funder===$('fFunder').value)&&(!$('fPartner').value||p.partner===$('fPartner').value)&&(!$('fOdg').value||p.odd===$('fOdg').value)&&p.end>=ys&&p.start<=ye)}
function statsFor(adminName,arr){let a=arr.filter(p=>p.admin2===adminName);return {projects:a.length,beneficiaries:a.reduce((s,p)=>s+p.beneficiaries,0),orgs:new Set(a.map(p=>p.org)).size,partners:new Set(a.map(p=>p.partner)).size,funders:new Set(a.map(p=>p.funder)).size}}
function metricValue(s){return s[$('metric').value]||0}
function color(v,max){if(!v)return '#eef3f0';let t=Math.min(1,v/(max||1));let light=88-t*48;return `hsl(157 38% ${light}%)`}
function renderMap(arr){if(adminLayer)map.removeLayer(adminLayer);let vals=admin2Geo.features.map(f=>metricValue(statsFor(f.properties.name,arr)));let max=Math.max(1,...vals);adminLayer=L.geoJSON(admin2Geo,{style:f=>{let s=statsFor(f.properties.name,arr);return {color:'#fff',weight:1.5,fillColor:color(metricValue(s),max),fillOpacity:.88}},onEachFeature:(f,l)=>{let s=statsFor(f.properties.name,arr);l.on('click',()=>showAdmin(f.properties,s));l.bindTooltip(`${f.properties.name} · ${s.projects} projet${s.projects>1?'s':''}`)}}).addTo(map);
let metricNames={projects:'Nombre de projets',beneficiaries:'Bénéficiaires',orgs:'Intervenants',partners:'Partenaires',funders:'Bailleurs'};$('legend').innerHTML=`<b>${metricNames[$('metric').value]}</b><span style="float:right;color:#6b7c76">Admin 2</span><div class="ramp"></div><div class="ends"><span>0</span><span>${fmt(max)}</span></div>`;
if($('toggleHistoric').checked){if(historicLayer)map.removeLayer(historicLayer);historicLayer=L.geoJSON(admin2Geo,{style:f=>{let h=historic.find(x=>x.admin2===f.properties.name);return {color:'#7d4d8b',dashArray:'5 4',weight:2,fillColor:'#b892c1',fillOpacity:h?.projects?0.22:0}},interactive:false}).addTo(map)}else if(historicLayer){map.removeLayer(historicLayer);historicLayer=null}
if($('togglePopulation').checked){if(popLayer)map.removeLayer(popLayer);popLayer=L.geoJSON(admin2Geo,{style:f=>({color:'#c27c00',weight:1.2,fillColor:'#f0bd65',fillOpacity:Math.min(.45,f.properties.population/600000)}),interactive:false}).addTo(map)}else if(popLayer){map.removeLayer(popLayer);popLayer=null}
if($('toggleBasin').checked){if(!basinLayer)drawBasin();else if(!map.hasLayer(basinLayer))basinLayer.addTo(map)}else if(basinLayer&&map.hasLayer(basinLayer))map.removeLayer(basinLayer);
if($('toggleHydro').checked){if(!hydroLayer)drawHydro(hydroFallback);else if(!map.hasLayer(hydroLayer))hydroLayer.addTo(map);hydroLayer.bringToFront()}else if(hydroLayer&&map.hasLayer(hydroLayer))map.removeLayer(hydroLayer);
countryHalo.bringToFront();countryLayer.bringToFront();}
function renderKpis(arr){$('countBadge').textContent=`${arr.length} projets`;$('kProjects').textContent=fmt(arr.length);$('kBenef').textContent=fmt(arr.reduce((s,p)=>s+p.beneficiaries,0));$('kOrgs').textContent=new Set(arr.map(p=>p.org)).size;$('kPartners').textContent=new Set(arr.map(p=>p.partner)).size;$('kFunders').textContent=new Set(arr.map(p=>p.funder)).size;$('kAdmin2').textContent=new Set(arr.map(p=>p.admin2)).size;
let counts=THEMES.map(t=>[t,arr.filter(p=>p.theme===t).length]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]);$('themeCount').textContent=`${counts.length} actives`;let m=Math.max(1,...counts.map(x=>x[1]));$('themeChart').innerHTML=counts.slice(0,8).map(([t,n])=>`<div class="bar-row"><span>${t}</span><span class="bar-bg"><span class="bar-fill" style="display:block;width:${n/m*100}%"></span></span><b>${n}</b></div>`).join('');
let years=[2021,2022,2023,2024,2025,2026].map(y=>[y,arr.filter(p=>p.start<=y&&p.end>=y).length]),ym=Math.max(1,...years.map(x=>x[1]));$('yearChart').innerHTML=years.map(([y,n])=>`<div class="year-col"><i style="height:${n/ym*70}px"></i>${String(y).slice(2)}</div>`).join('')}
function renderProjects(arr){$('projectList').innerHTML=[...arr].sort((a,b)=>b.end-a.end).slice(0,30).map(p=>`<div class="project-card" data-id="${p.id}"><div class="tags"><span class="tag">${p.org}</span><span class="tag status">${p.status}</span></div><h4>${p.title}</h4><div class="project-meta"><span>${p.admin2} · ${p.country}</span><span>${p.start}–${p.end}</span></div></div>`).join('')||'<p class="note">Aucun projet ne correspond aux filtres.</p>';document.querySelectorAll('.project-card').forEach(x=>x.onclick=()=>showProject(projects.find(p=>p.id===x.dataset.id)))}
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
  document.querySelectorAll('.filter-chip').forEach(b=>b.onclick=()=>{let id=b.dataset.filter;$(id).value=(id==='fYearStart'?2021:id==='fYearEnd'?2026:'');update(true)});
  ['fCountry','fAdmin1','fAdmin2','fOrg','fStatus','fTheme','fFunder','fPartner','fOdg'].forEach(id=>$(id).classList.toggle('is-active',!!$(id).value));
  $('fYearStart').classList.toggle('is-active',+$('fYearStart').value!==2021);
  $('fYearEnd').classList.toggle('is-active',+$('fYearEnd').value!==2026);
  const extras=['fFunder','fPartner','fOdg'].filter(id=>$(id).value).length + ( +$('fYearStart').value!==2021 ? 1:0) + (+$('fYearEnd').value!==2026 ? 1:0);
  $('extraBadge').textContent=extras?String(extras):'';
}
function update(doZoom=false){cascade();let arr=filtered();renderMap(arr);renderKpis(arr);renderProjects(arr);refreshFilterUI();if(doZoom)zoomToSelection(arr)}
function showProject(p){$('drawerTitle').textContent=p.title;$('drawerBody').innerHTML=`<div class="tags"><span class="tag">${p.org}</span><span class="tag status">${p.status}</span><span class="tag">${p.theme}</span></div><div class="detail-grid"><div><small>Localisation</small><strong>${p.admin2} · ${p.region} · ${p.country}</strong></div><div><small>Période</small><strong>${p.start}–${p.end}</strong></div><div><small>Bénéficiaires</small><strong>${fmt(p.beneficiaries)}</strong></div><div><small>Budget global</small><strong>${fmt(p.budget)} €</strong></div><div><small>Partenaire technique</small><strong>${p.partner}</strong></div><div><small>Bailleur</small><strong>${p.funder}</strong></div><div><small>ODD</small><strong>${p.odd}</strong></div><div><small>Identifiant</small><strong>${p.id}</strong></div></div><section class="detail-section"><h4>Résumé</h4><p>${p.summary}</p></section><div class="actions-row"><button onclick="zoomProject('${p.admin2}')">Voir sur la carte</button></div>`;$('drawer').classList.remove('hidden')}
window.zoomProject=name=>{let f=admin2Geo.features.find(x=>x.properties.name===name);if(f)map.fitBounds(L.geoJSON(f).getBounds(),{padding:[60,60],maxZoom:9})};
function showAdmin(prop,s){let ps=filtered().filter(p=>p.admin2===prop.name);let f=admin2Geo.features.find(x=>x.properties.name===prop.name);let c=L.geoJSON(f).getBounds().getCenter();let sv=`https://www.google.com/maps?q&layer=c&cbll=${c.lat},${c.lng}`;let gm=`https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`;$('drawerTitle').textContent=prop.name;$('drawerBody').innerHTML=`<p class="note">${prop.region} · ${prop.country}</p><div class="detail-grid"><div><small>Projets</small><strong>${s.projects}</strong></div><div><small>Bénéficiaires</small><strong>${fmt(s.beneficiaries)}</strong></div><div><small>Intervenants</small><strong>${s.orgs}</strong></div><div><small>Partenaires</small><strong>${s.partners}</strong></div><div><small>Bailleurs</small><strong>${s.funders}</strong></div><div><small>Population contexte</small><strong>${fmt(prop.population)}</strong></div></div><div class="actions-row"><a target="_blank" href="${sv}">👁 Vue terrain</a><a target="_blank" href="${gm}">📍 Google Maps</a><button onclick="filterAdmin('${prop.name}')">Filtrer sur cette unité</button></div><section class="detail-section"><h4>Projets concernés</h4>${ps.map(p=>`<div class="project-card" onclick="showProjectById('${p.id}')"><h4>${p.title}</h4><div class="project-meta"><span>${p.org}</span><span>${p.start}–${p.end}</span></div></div>`).join('')||'<p class="note">Aucun projet avec les filtres actuels.</p>'}</section>`;$('drawer').classList.remove('hidden')}
window.showProjectById=id=>showProject(projects.find(p=>p.id===id));window.filterAdmin=name=>{$('fAdmin2').value=name;update(true)};

map.on('click',e=>{let sv=`https://www.google.com/maps?q&layer=c&cbll=${e.latlng.lat},${e.latlng.lng}`;let gm=`https://www.google.com/maps/search/?api=1&query=${e.latlng.lat},${e.latlng.lng}`;L.popup().setLatLng(e.latlng).setContent(`<div class="popup"><h3>Point cartographique</h3><div class="muted">${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}</div><div class="actions-row"><a target="_blank" href="${sv}">👁 Vue terrain</a><a target="_blank" href="${gm}">📍 Google Maps</a></div></div>`).openOn(map)});

function openModal(title,html){$('modalTitle').textContent=title;$('modalBody').innerHTML=html;$('modal').classList.remove('hidden')}
$('btnContext').onclick=()=>openModal('Contexte — Initiative Fleuve Sénégal',`<h4>À propos</h4><p>L’Initiative Fleuve Sénégal est un cadre de concertation entre six associations de solidarité internationale intervenant dans le Bassin du Fleuve Sénégal. Cette maquette reprend les fonctionnalités attendues dans les TDR : consultation agrégée Admin 1 / Admin 2, fiches projets, filtres croisés, indicateurs dynamiques, couches de contexte, historique Traverse 50 et mise à jour simplifiée.</p><h4>Membres</h4><ul>${ORGS.map(o=>`<li>${o}</li>`).join('')}</ul><h4>Diffusion</h4><p>La même application peut être utilisée en page autonome ou embarquée par iframe.</p><div class="iframe-hint">&lt;iframe src="${location.origin}${location.pathname}?embed=1" width="100%" height="760" loading="lazy"&gt;&lt;/iframe&gt;</div>`);
$('btnAdmin').onclick=()=>openModal('Administration du contenu',`<div class="admin-form"><p>Dans une version de production, cet écran serait protégé par authentification. Pour la maquette, il montre le principe d’édition sans modifier le code.</p><label>Présentation du Bassin<textarea id="ctxText">Territoire de coopération transfrontalière autour du Fleuve Sénégal.</textarea></label><label>Contact / équipe<input value="Initiative Fleuve Sénégal"></label><label>Logo / identité visuelle<input value="Logo IFS (fichier à déposer)"></label><button class="primary" onclick="alert('Maquette : contenu validé localement')">Enregistrer</button><p class="note">La mise à jour des projets s’effectue via le bouton « Mettre à jour les données » avec contrôle préalable des fichiers Excel ou CSV.</p></div>`);
$('modalClose').onclick=()=>$('modal').classList.add('hidden');$('drawerClose').onclick=()=>$('drawer').classList.add('hidden');
$('btnHome').onclick=()=>map.fitBounds(DEFAULT_BOUNDS);$('btnReset').onclick=()=>{['fCountry','fAdmin1','fAdmin2','fOrg','fTheme','fStatus','fFunder','fPartner','fOdg'].forEach(id=>$(id).value='');$('fYearStart').value=2021;$('fYearEnd').value=2026;$('toggleHistoric').checked=false;$('togglePopulation').checked=false;$('toggleHydro').checked=true;$('toggleBasin').checked=true;map.fitBounds(DEFAULT_BOUNDS);update(false)};

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
  headers=headers.map(h=>String(h).trim());
  rows=rows.map(r=>{let o={};headers.forEach(h=>o[h]=r[h]??'');return o});
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
    if(ids.has(r.id))warnings.push(`Ligne ${n} : identifiant en doublon (${r.id})`);
    ids.add(r.id);
    if(!THEMES.includes(r.theme))warnings.push(`Ligne ${n} : thématique non standard (${r.theme})`);
  });
  return {rows,errors:[...new Set(errors)],warnings:[...new Set(warnings)],headers};
}
function importModal(){
  openModal('Mettre à jour les données',`<p><strong>Excel (.xlsx) est recommandé</strong> pour les corrections manuelles. Les exports Kobo en CSV restent acceptés. Le fichier est contrôlé avant intégration.</p><div id="dropzone" class="dropzone"><strong>Choisir ou déposer un fichier Excel ou CSV</strong><br><span class="note">Formats acceptés : .xlsx, .xls, .csv</span></div><div class="import-links"><a href="modele_import_ifs.xlsx" download>Télécharger le modèle Excel</a><a href="sample_projects.csv" download>Télécharger le modèle CSV</a></div><div class="validation" id="validation"><p class="note">Feuille Excel recommandée : <strong>PROJETS</strong>. Colonnes attendues : id, title, country, region, admin2, org, theme, odd, status, start, end, beneficiaries, partner, funder, budget, summary.</p></div>`);
  setTimeout(()=>{
    const dz=$('dropzone');
    dz.onclick=()=>$('dataInput').click();
    ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag')}));
    ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag')}));
    dz.addEventListener('drop',e=>{const f=e.dataTransfer.files[0];if(f)processImportFile(f)});
  },0);
}
function showValidation(file,res){
  let html=`<h4>Contrôle de ${file.name}</h4><p class="${res.errors.length?'err':'ok'}">${res.errors.length?`⛔ ${res.errors.length} erreur(s) bloquante(s)`:`✓ ${res.rows.length} ligne(s) valides`}</p>`;
  if(res.errors.length)html+=`<ul class="err">${res.errors.slice(0,15).map(x=>`<li>${x}</li>`).join('')}</ul>`;
  if(res.warnings.length)html+=`<p class="warn">⚠ ${res.warnings.length} avertissement(s)</p><ul class="warn">${res.warnings.slice(0,10).map(x=>`<li>${x}</li>`).join('')}</ul>`;
  if(!res.errors.length){
    html+=`<button id="applyImport" class="primary">Importer ${res.rows.length} projets</button><div class="table-wrap"><table><tr>${res.headers.slice(0,8).map(h=>`<th>${h}</th>`).join('')}</tr>${res.rows.slice(0,5).map(r=>`<tr>${res.headers.slice(0,8).map(h=>`<td>${r[h]}</td>`).join('')}</tr>`).join('')}</table></div>`;
  }
  $('validation').innerHTML=html;
  if(!res.errors.length)setTimeout(()=>{$('applyImport').onclick=()=>{
    projects=res.rows.map(r=>({...r,start:+r.start,end:+r.end,beneficiaries:+String(r.beneficiaries).replace(/\s/g,''),budget:+String(r.budget).replace(/\s/g,'').replace(',','.')}));
    initFilters();update(false);$('modal').classList.add('hidden');alert('Import réussi : la carte et les indicateurs ont été recalculés.');
  }},0);
}
function processImportFile(file){
  const name=file.name.toLowerCase();
  if(!/\.(xlsx|xls|csv)$/.test(name)){showValidation(file,{rows:[],headers:[],errors:['Format non pris en charge. Utilisez .xlsx, .xls ou .csv.'],warnings:[]});return;}
  const reader=new FileReader();
  reader.onload=()=>{let res=name.endsWith('.csv')?parseCSV(reader.result):parseWorkbook(reader.result);showValidation(file,res)};
  if(name.endsWith('.csv'))reader.readAsText(file,'utf-8');else reader.readAsArrayBuffer(file);
}

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
  if(tiles[currentBase])map.removeLayer(tiles[currentBase]);currentBase=name;tiles[currentBase].addTo(map);tiles[currentBase].bringToBack();
  document.querySelectorAll('.basemap-option').forEach(x=>x.classList.toggle('active',x.dataset.basemap===name));
  closeMapPanels();
});
document.addEventListener('click',e=>{if(!e.target.closest('.map-toolbox'))closeMapPanels()});
['fCountry','fAdmin1','fAdmin2','fOrg','fTheme','fStatus','fFunder','fPartner','fOdg','fYearStart','fYearEnd','metric','toggleHistoric','togglePopulation','toggleHydro','toggleBasin'].forEach(id=>$(id).addEventListener('change',()=>update(['fCountry','fAdmin1','fAdmin2','fOrg','fTheme','fStatus','fFunder','fPartner','fOdg'].includes(id))));

if(new URLSearchParams(location.search).get('embed')==='1'){document.body.classList.add('embed');document.querySelector('.topbar').style.display='none';document.querySelector('.layout').style.height='100vh'}
initFilters();update(false);
