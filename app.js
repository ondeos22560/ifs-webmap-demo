const THEMES=["Agriculture & alimentation","Eau & assainissement","Énergie & climat","Gestion des ressources naturelles","Développement économique","Santé & services sociaux","Gouvernance territoriale","Mobilités & migrations","Risques naturels","Cohésion sociale"];
const ORGS=["AVSF","GERES","GRDR","GRET","Le Partenariat","ADOS"];
const FUNDERS=["Fondation de France","AFD","Union européenne","Agence de l'eau","Coopération suisse","Collectivités territoriales"];
const PARTNERS=["OMVS","Collectivité locale","Organisation paysanne","Service technique national","Association locale","Université / recherche","Chambre consulaire"];
const ODD=["ODD 2","ODD 5","ODD 6","ODD 7","ODD 8","ODD 11","ODD 13","ODD 15","ODD 16","ODD 17"];

// Géométries simplifiées de démonstration, volontairement non officielles.
const admin2Defs=[
["Sénégal","Saint-Louis","Saint-Louis",[-16.7,15.75,-15.8,16.35]], ["Sénégal","Saint-Louis","Dagana",[-16.1,16.0,-14.9,16.7]], ["Sénégal","Saint-Louis","Podor",[-15.3,16.1,-13.7,16.85]],
["Sénégal","Matam","Matam",[-14.1,15.0,-12.7,16.1]], ["Sénégal","Matam","Kanel",[-13.4,14.4,-12.0,15.45]], ["Sénégal","Tambacounda","Bakel",[-12.8,13.9,-11.4,14.95]],
["Mauritanie","Trarza","Rosso",[-16.3,16.2,-15.1,17.0]], ["Mauritanie","Brakna","Aleg",[-14.8,16.5,-13.0,17.4]], ["Mauritanie","Gorgol","Kaédi",[-13.7,15.8,-12.0,16.8]], ["Mauritanie","Guidimakha","Sélibaby",[-12.7,15.0,-11.4,15.9]],
["Mali","Kayes","Kayes",[-11.8,14.1,-10.8,15.0]], ["Mali","Kayes","Bafoulabé",[-11.5,13.2,-10.2,14.2]], ["Mali","Kayes","Yélimané",[-11.4,14.6,-10.2,15.6]], ["Mali","Kayes","Kéniéba",[-12.3,12.7,-11.0,13.8]], ["Mali","Koulikoro","Kita",[-10.1,12.6,-8.7,13.9]],
["Guinée","Labé","Labé",[-12.6,11.0,-11.3,12.2]], ["Guinée","Labé","Mali",[-12.5,11.8,-11.2,13.0]], ["Guinée","Mamou","Mamou",[-12.2,9.9,-10.8,11.2]], ["Guinée","Mamou","Dalaba",[-12.3,10.3,-11.2,11.3]], ["Guinée","Faranah","Dabola",[-11.3,10.4,-10.0,11.6]]
];

function polyFromBox(b,i){const [x1,y1,x2,y2]=b; const j=(i%3)*.06; return [[[x1+j,y1],[x2,y1+.04],[x2-.05,y2-j],[x1,y2-.02],[x1+j,y1]]];}
const admin2Geo={type:"FeatureCollection",features:admin2Defs.map((d,i)=>({type:"Feature",properties:{country:d[0],region:d[1],name:d[2],id:"a"+i},geometry:{type:"Polygon",coordinates:polyFromBox(d[3],i)}}))};

// Limites nationales simplifiées issues de Natural Earth (110m), intégrées localement pour garder les frontières lisibles.
const countryGeo={type:"FeatureCollection",features:[
 {type:"Feature",properties:{name:"Sénégal"},geometry:{type:"Polygon",coordinates:[[[-16.713729,13.594959],[-17.126107,14.373516],[-17.625043,14.729541],[-17.185173,14.919477],[-16.700706,15.621527],[-16.463098,16.135036],[-16.12069,16.455663],[-15.623666,16.369337],[-15.135737,16.587282],[-14.577348,16.598264],[-14.099521,16.304302],[-13.435738,16.039383],[-12.830658,15.303692],[-12.17075,14.616834],[-12.124887,13.994727],[-11.927716,13.422075],[-11.553398,13.141214],[-11.467899,12.754519],[-11.513943,12.442988],[-11.658301,12.386583],[-12.203565,12.465648],[-12.278599,12.35444],[-12.499051,12.33209],[-13.217818,12.575874],[-13.700476,12.586183],[-15.548477,12.62817],[-15.816574,12.515567],[-16.147717,12.547762],[-16.677452,12.384852],[-16.841525,13.151394],[-15.931296,13.130284],[-15.691001,13.270353],[-15.511813,13.27857],[-15.141163,13.509512],[-14.712197,13.298207],[-14.277702,13.280585],[-13.844963,13.505042],[-14.046992,13.794068],[-14.376714,13.62568],[-14.687031,13.630357],[-15.081735,13.876492],[-15.39877,13.860369],[-15.624596,13.623587],[-16.713729,13.594959]]]}} ,
 {type:"Feature",properties:{name:"Mali"},geometry:{type:"Polygon",coordinates:[[[-11.513943,12.442988],[-11.467899,12.754519],[-11.553398,13.141214],[-11.927716,13.422075],[-12.124887,13.994727],[-12.17075,14.616834],[-11.834208,14.799097],[-11.666078,15.388208],[-11.349095,15.411256],[-10.650791,15.132746],[-10.086846,15.330486],[-9.700255,15.264107],[-9.550238,15.486497],[-5.537744,15.50169],[-5.315277,16.201854],[-5.488523,16.325102],[-5.971129,20.640833],[-6.453787,24.956591],[-4.923337,24.974574],[-1.550055,22.792666],[1.823228,20.610809],[2.060991,20.142233],[2.683588,19.85623],[3.146661,19.693579],[3.158133,19.057364],[4.267419,19.155265],[4.27021,16.852227],[3.723422,16.184284],[3.638259,15.56812],[2.749993,15.409525],[1.385528,15.323561],[1.015783,14.968182],[0.374892,14.928908],[-0.266257,14.924309],[-0.515854,15.116158],[-1.066363,14.973815],[-2.001035,14.559008],[-2.191825,14.246418],[-2.967694,13.79815],[-3.103707,13.541267],[-3.522803,13.337662],[-4.006391,13.472485],[-4.280405,13.228444],[-4.427166,12.542646],[-5.220942,11.713859],[-5.197843,11.375146],[-5.470565,10.95127],[-5.404342,10.370737],[-5.816926,10.222555],[-6.050452,10.096361],[-6.205223,10.524061],[-6.493965,10.411303],[-6.666461,10.430811],[-6.850507,10.138994],[-7.622759,10.147236],[-7.89959,10.297382],[-8.029944,10.206535],[-8.335377,10.494812],[-8.282357,10.792597],[-8.407311,10.909257],[-8.620321,10.810891],[-8.581305,11.136246],[-8.376305,11.393646],[-8.786099,11.812561],[-8.905265,12.088358],[-9.127474,12.30806],[-9.327616,12.334286],[-9.567912,12.194243],[-9.890993,12.060479],[-10.165214,11.844084],[-10.593224,11.923975],[-10.87083,12.177887],[-11.036556,12.211245],[-11.297574,12.077971],[-11.456169,12.076834],[-11.513943,12.442988]]]}} ,
 {type:"Feature",properties:{name:"Mauritanie"},geometry:{type:"Polygon",coordinates:[[[-17.063423,20.999752],[-16.845194,21.333323],[-12.929102,21.327071],[-13.118754,22.77122],[-12.874222,23.284832],[-11.937224,23.374594],[-11.969419,25.933353],[-8.687294,25.881056],[-8.6844,27.395744],[-4.923337,24.974574],[-6.453787,24.956591],[-5.971129,20.640833],[-5.488523,16.325102],[-5.315277,16.201854],[-5.537744,15.50169],[-9.550238,15.486497],[-9.700255,15.264107],[-10.086846,15.330486],[-10.650791,15.132746],[-11.349095,15.411256],[-11.666078,15.388208],[-11.834208,14.799097],[-12.17075,14.616834],[-12.830658,15.303692],[-13.435738,16.039383],[-14.099521,16.304302],[-14.577348,16.598264],[-15.135737,16.587282],[-15.623666,16.369337],[-16.12069,16.455663],[-16.463098,16.135036],[-16.549708,16.673892],[-16.270552,17.166963],[-16.146347,18.108482],[-16.256883,19.096716],[-16.377651,19.593817],[-16.277838,20.092521],[-16.536324,20.567866],[-17.063423,20.999752]]]}} ,
 {type:"Feature",properties:{name:"Guinée"},geometry:{type:"Polygon",coordinates:[[[-13.700476,12.586183],[-13.217818,12.575874],[-12.499051,12.33209],[-12.278599,12.35444],[-12.203565,12.465648],[-11.658301,12.386583],[-11.513943,12.442988],[-11.456169,12.076834],[-11.297574,12.077971],[-11.036556,12.211245],[-10.87083,12.177887],[-10.593224,11.923975],[-10.165214,11.844084],[-9.890993,12.060479],[-9.567912,12.194243],[-9.327616,12.334286],[-9.127474,12.30806],[-8.905265,12.088358],[-8.786099,11.812561],[-8.376305,11.393646],[-8.581305,11.136246],[-8.620321,10.810891],[-8.407311,10.909257],[-8.282357,10.792597],[-8.335377,10.494812],[-8.029944,10.206535],[-8.229337,10.12902],[-8.309616,9.789532],[-8.079114,9.376224],[-7.8321,8.575704],[-8.203499,8.455453],[-8.299049,8.316444],[-8.221792,8.123329],[-8.280703,7.68718],[-8.439298,7.686043],[-8.722124,7.711674],[-8.926065,7.309037],[-9.208786,7.313921],[-9.403348,7.526905],[-9.33728,7.928534],[-9.755342,8.541055],[-10.016567,8.428504],[-10.230094,8.406206],[-10.505477,8.348896],[-10.494315,8.715541],[-10.65477,8.977178],[-10.622395,9.26791],[-10.839152,9.688246],[-11.117481,10.045873],[-11.917277,10.046984],[-12.150338,9.858572],[-12.425929,9.835834],[-12.596719,9.620188],[-12.711958,9.342712],[-13.24655,8.903049],[-13.685154,9.494744],[-14.074045,9.886167],[-14.330076,10.01572],[-14.579699,10.214467],[-14.693232,10.656301],[-14.839554,10.876572],[-15.130311,11.040412],[-14.685687,11.527824],[-14.382192,11.509272],[-14.121406,11.677117],[-13.9008,11.678719],[-13.743161,11.811269],[-13.828272,12.142644],[-13.718744,12.247186],[-13.700476,12.586183]]]}}
]};

function seeded(n){let x=Math.sin(n*999.1)*10000;return x-Math.floor(x)}
function pick(arr,n){return arr[Math.floor(seeded(n)*arr.length)]}
function makeProjects(){let out=[];let id=1;for(let a=0;a<admin2Defs.length;a++){let count=2+Math.floor(seeded(a+9)*5);for(let j=0;j<count;j++){let n=a*11+j+1;let start=2021+Math.floor(seeded(n+2)*5);let duration=1+Math.floor(seeded(n+3)*3);let end=Math.min(2026,start+duration);let org=pick(ORGS,n+4), theme=pick(THEMES,n+5);let theme2=seeded(n+6)>.68?pick(THEMES,n+16):null;let status=end>=2026&&seeded(n+8)>.35?"En cours":"Terminé";let beneficiaries=250+Math.floor(seeded(n+10)*9800);let d=admin2Defs[a];out.push({id:id++,title:["Renforcement des filières locales","Résilience des territoires riverains","Accès durable aux services essentiels","Appui aux dynamiques communautaires","Adaptation climatique et ressources naturelles","Développement économique inclusif"][Math.floor(seeded(n+12)*6)]+" — "+d[2],country:d[0],region:d[1],admin2:d[2],organization:org,themes:[theme,...(theme2&&theme2!==theme?[theme2]:[])],funder:pick(FUNDERS,n+7),partner:pick(PARTNERS,n+9),status,start,end,beneficiaries,budget:45000+Math.floor(seeded(n+13)*530000),odd:[pick(ODD,n+14),pick(ODD,n+15)].filter((v,i,a)=>a.indexOf(v)===i),summary:"Projet de démonstration illustrant une intervention territoriale multi-acteurs dans le Bassin du Fleuve Sénégal. Les données présentées sont fictives et servent uniquement à tester l’ergonomie de la WebMap."});}}
return out}
let projects=makeProjects();
const historical=admin2Geo.features.filter((_,i)=>i%2===0).map((f,i)=>({feature:f,count:3+Math.floor(seeded(i+41)*15)}));

const map=L.map('map',{zoomControl:false}).setView([14.7,-12.7],5);
L.control.zoom({position:'bottomright'}).addTo(map);
const street=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);
const osmFrance=L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',{maxZoom:20,attribution:'© OpenStreetMap France · © OpenStreetMap'});
const hot=L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{maxZoom:20,attribution:'© OpenStreetMap · HOT'});
const cycle=L.tileLayer('https://{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',{maxZoom:20,attribution:'© CyclOSM · © OpenStreetMap'});
const topo=L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{maxZoom:17,attribution:'© OpenTopoMap · © OpenStreetMap'});
const satellite=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Tiles © Esri'});
L.control.layers({"Plan OSM":street,"OSM France":osmFrance,"Humanitaire":hot,"CyclOSM":cycle,"Relief":topo,"Satellite":satellite},null,{position:'topright',collapsed:false}).addTo(map);
map.createPane('countryHalo');map.getPane('countryHalo').style.zIndex=445;map.getPane('countryHalo').style.pointerEvents='none';
map.createPane('countryLines');map.getPane('countryLines').style.zIndex=446;map.getPane('countryLines').style.pointerEvents='none';
let geoLayer=L.geoJSON(admin2Geo).addTo(map), histLayer=L.layerGroup();
const countryHalo=L.geoJSON(countryGeo,{pane:'countryHalo',style:{color:'#ffffff',weight:6,opacity:.92,fill:false,interactive:false}}).addTo(map);
const countryLines=L.geoJSON(countryGeo,{pane:'countryLines',style:{color:'#24473e',weight:2.4,opacity:1,fill:false,interactive:false}}).addTo(map);
countryGeo.features.forEach(f=>{let c=L.geoJSON(f).getBounds().getCenter();L.marker(c,{interactive:false,icon:L.divIcon({className:'country-label',html:f.properties.name,iconSize:[90,20],iconAnchor:[45,10]})}).addTo(map)});

const $=q=>typeof q==='string'&&q.startsWith('.')?document.querySelector(q):document.getElementById(q);
const ids=["countryFilter","regionFilter","admin2Filter","orgFilter","statusFilter","themeFilter","funderFilter","partnerFilter","yearStart","yearEnd","metricSelect"];
let sortDesc=true, current=[];
function unique(a){return [...new Set(a)].sort((x,y)=>x.localeCompare(y,'fr'))}
function fillSelect(id,values,keep=true){let el=$(id), cur=keep?el.value:""; let first=el.options[0]?.outerHTML||'<option value="">Tous</option>'; el.innerHTML=first+values.map(v=>`<option>${v}</option>`).join(''); if(values.includes(cur))el.value=cur;}
fillSelect('countryFilter',unique(projects.map(p=>p.country)));fillSelect('orgFilter',ORGS);fillSelect('themeFilter',THEMES);fillSelect('funderFilter',FUNDERS);fillSelect('partnerFilter',PARTNERS);
for(let y=2021;y<=2026;y++){ $('yearStart').add(new Option(y,y)); $('yearEnd').add(new Option(y,y)); } $('yearStart').value=2021;$('yearEnd').value=2026;

function syncGeoFilters(){let c=$('countryFilter').value,r=$('regionFilter').value;let regs=unique(projects.filter(p=>!c||p.country===c).map(p=>p.region));fillSelect('regionFilter',regs);r=$('regionFilter').value;let a2=unique(projects.filter(p=>(!c||p.country===c)&&(!r||p.region===r)).map(p=>p.admin2));fillSelect('admin2Filter',a2);}
function filtered(){let ys=+$('yearStart').value,ye=+$('yearEnd').value;return projects.filter(p=>(!$('countryFilter').value||p.country===$('countryFilter').value)&&(!$('regionFilter').value||p.region===$('regionFilter').value)&&(!$('admin2Filter').value||p.admin2===$('admin2Filter').value)&&(!$('orgFilter').value||p.organization===$('orgFilter').value)&&(!$('statusFilter').value||p.status===$('statusFilter').value)&&(!$('themeFilter').value||p.themes.includes($('themeFilter').value))&&(!$('funderFilter').value||p.funder===$('funderFilter').value)&&(!$('partnerFilter').value||p.partner===$('partnerFilter').value)&&p.end>=ys&&p.start<=ye)}
function statsFor(name){let a=current.filter(p=>p.admin2===name);return {projects:a.length,beneficiaries:a.reduce((s,p)=>s+p.beneficiaries,0),organizations:new Set(a.map(p=>p.organization)).size,partners:new Set(a.map(p=>p.partner)).size,funders:new Set(a.map(p=>p.funder)).size}}
function metricValue(s){return s[$('metricSelect').value]||0}
function color(v,max){let t=max?Math.min(1,v/max):0; if(t===0)return '#eef2ef'; if(t<.25)return '#cfe0d3'; if(t<.5)return '#9fc2aa'; if(t<.75)return '#65967a'; return '#2c6e5a'}
function terrainLinks(lat,lng){
  const ll=`${Number(lat).toFixed(6)},${Number(lng).toFixed(6)}`;
  return `<div class="terrain-links"><a href="https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${ll}" target="_blank" rel="noopener">◉ Vue terrain</a><a href="https://www.google.com/maps/search/?api=1&query=${ll}" target="_blank" rel="noopener">↗ Google Maps</a></div>`;
}
function renderMap(){let vals=admin2Geo.features.map(f=>metricValue(statsFor(f.properties.name))),max=Math.max(0,...vals);geoLayer.clearLayers();geoLayer=L.geoJSON(admin2Geo,{style:f=>{let s=statsFor(f.properties.name),v=metricValue(s);return {color:'#f8fbf9',weight:1.2,fillColor:color(v,max),fillOpacity:.82,bubblingMouseEvents:false}},onEachFeature:(f,l)=>{let s=statsFor(f.properties.name);l.bindTooltip(`${f.properties.name} · ${s.projects} projet${s.projects>1?'s':''}`,{sticky:true});l.on('click',e=>{if(e.originalEvent)L.DomEvent.stopPropagation(e.originalEvent);let c=l.getBounds().getCenter();let html=`<div class="popup-title">${f.properties.name}</div><div style="font-size:9px;color:#71817c">${f.properties.region} · ${f.properties.country}</div><div class="popup-stats"><div class="popup-stat"><strong>${s.projects}</strong>Projets</div><div class="popup-stat"><strong>${fmt(s.beneficiaries)}</strong>Bénéficiaires</div><div class="popup-stat"><strong>${s.organizations}</strong>Intervenants</div><div class="popup-stat"><strong>${s.partners}</strong>Partenaires</div></div><span class="popup-link" onclick="focusAdmin2('${f.properties.name.replaceAll("'","\\'")}')">Filtrer sur cette unité →</span>${terrainLinks(c.lat,c.lng)}`;l.bindPopup(html,{maxWidth:280}).openPopup()})}}).addTo(map);$('legendMax').textContent=fmt(max);$('legendMin').textContent='0';$('legendMetric').textContent=$('metricSelect').selectedOptions[0].textContent;}
window.focusAdmin2=name=>{ $('admin2Filter').value=name; apply(true);map.closePopup();}
function renderHistorical(){histLayer.clearLayers();if(!$('historicalToggle').checked){if(map.hasLayer(histLayer))map.removeLayer(histLayer);return}historical.forEach(h=>{let c=L.geoJSON(h.feature).getBounds().getCenter();L.circleMarker(c,{radius:5+Math.sqrt(h.count)*1.6,color:'#7c5b8e',weight:1,fillColor:'#a77cba',fillOpacity:.65}).bindTooltip(`Historique 2010–2020 : ${h.count} projets`).addTo(histLayer)});histLayer.addTo(map)}
function fmt(n){return Number(n||0).toLocaleString('fr-FR')}
function renderKpis(){ $('visibleProjects').textContent=`${current.length} projet${current.length>1?'s':''}`;$('kpiProjects').textContent=current.length;$('kpiBeneficiaries').textContent=fmt(current.reduce((s,p)=>s+p.beneficiaries,0));$('kpiOrgs').textContent=new Set(current.map(p=>p.organization)).size;$('kpiPartners').textContent=new Set(current.map(p=>p.partner)).size;}
function renderThemes(){let counts=THEMES.map(t=>[t,current.filter(p=>p.themes.includes(t)).length]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]);let max=Math.max(1,...counts.map(x=>x[1]));$('themeCount').textContent=`${counts.length} actives`;$('themeChart').innerHTML=counts.slice(0,7).map(([t,v])=>`<div class="bar-row"><span class="bar-label" title="${t}">${t}</span><span class="bar-track"><span class="bar-fill" style="display:block;width:${v/max*100}%"></span></span><span class="bar-value">${v}</span></div>`).join('')||'<span class="small-note">Aucune donnée</span>';}
function renderYears(){let years=[2021,2022,2023,2024,2025,2026], vals=years.map(y=>current.filter(p=>p.start<=y&&p.end>=y).length),max=Math.max(1,...vals);$('yearChart').innerHTML=years.map((y,i)=>`<div class="spark-col"><div title="${vals[i]} projets actifs" class="spark-bar" style="height:${Math.max(4,vals[i]/max*58)}px"></div><span>${String(y).slice(2)}</span></div>`).join('')}
function renderList(){let arr=[...current].sort((a,b)=>sortDesc?b.start-a.start:a.start-b.start);$('projectList').innerHTML=arr.slice(0,28).map(p=>`<article class="project-item" data-id="${p.id}"><span class="tag">${p.organization}</span> <span class="tag ${p.status==='Terminé'?'done':'status'}">${p.status}</span><h4>${p.title}</h4><div class="project-meta"><span>${p.admin2} · ${p.country}</span><span>${p.start}–${p.end}</span></div></article>`).join('')||'<p class="small-note">Aucun projet ne correspond aux filtres.</p>';document.querySelectorAll('.project-item').forEach(el=>el.onclick=()=>openProject(+el.dataset.id))}
function activeDataFilter(){return ['countryFilter','regionFilter','admin2Filter','orgFilter','statusFilter','themeFilter','funderFilter','partnerFilter'].some(id=>$(id).value)||+$('yearStart').value!==2021||+$('yearEnd').value!==2026}
function smartZoom(bounds,maxZoom){
  if(!bounds||!bounds.isValid())return;
  map.flyToBounds(bounds,{padding:[46,46],maxZoom,duration:.75,easeLinearity:.25});
}
function zoomToSelection(){
  const c=$('countryFilter').value,r=$('regionFilter').value,a=$('admin2Filter').value;
  let features=[];
  if(a) features=admin2Geo.features.filter(f=>f.properties.name===a&&(!c||f.properties.country===c));
  else if(r) features=admin2Geo.features.filter(f=>f.properties.region===r&&(!c||f.properties.country===c));
  else if(c){let cf=countryGeo.features.find(f=>f.properties.name===c);if(cf){smartZoom(L.geoJSON(cf).getBounds(),6.4);$('mapScope').textContent=c;return}}
  else if(activeDataFilter()){let keys=new Set(current.map(p=>`${p.country}|${p.admin2}`));features=admin2Geo.features.filter(f=>keys.has(`${f.properties.country}|${f.properties.name}`))}
  if(features.length){smartZoom(L.geoJSON({type:'FeatureCollection',features}).getBounds(),a?9:r?7.8:7);$('mapScope').textContent=a?`${a} · ${r}`:r||`${current.length} projets visibles`}
  else if(!activeDataFilter()){smartZoom(L.geoJSON(countryGeo).getBounds(),5.3);$('mapScope').textContent='Bassin du Fleuve Sénégal · 4 pays'}
}
function apply(autoZoom=false){syncGeoFilters();current=filtered();renderKpis();renderThemes();renderYears();renderList();renderMap();renderHistorical();if(autoZoom)zoomToSelection();}
ids.forEach(id=>$(id).addEventListener('change',()=>apply(id!=='metricSelect')));$('historicalToggle').addEventListener('change',renderHistorical);
$('sortBtn').onclick=()=>{sortDesc=!sortDesc;renderList()};
function openProject(id){let p=projects.find(x=>x.id===id);if(!p)return;$('drawerContent').innerHTML=`<span class="eyebrow">FICHE PROJET</span><h2>${p.title}</h2><div><span class="tag">${p.organization}</span> <span class="tag ${p.status==='Terminé'?'done':'status'}">${p.status}</span></div><p class="drawer-summary">${p.summary}</p><div class="detail-grid"><div class="detail"><span>Territoire</span><strong>${p.admin2}, ${p.country}</strong></div><div class="detail"><span>Période</span><strong>${p.start}–${p.end}</strong></div><div class="detail"><span>Bénéficiaires</span><strong>${fmt(p.beneficiaries)}</strong></div><div class="detail"><span>Budget global</span><strong>${fmt(p.budget)} €</strong></div><div class="detail"><span>Bailleur</span><strong>${p.funder}</strong></div><div class="detail"><span>Partenaire</span><strong>${p.partner}</strong></div></div><h3>Thématique(s)</h3><p>${p.themes.join(' · ')}</p><h3>Objectifs de développement durable</h3><p>${p.odd.join(' · ')}</p>`;$('projectDrawer').classList.add('open');$('drawerBackdrop').classList.add('open')}
function closeDrawer(){$('projectDrawer').classList.remove('open');$('drawerBackdrop').classList.remove('open')}$('drawerClose').onclick=closeDrawer;$('drawerBackdrop').onclick=closeDrawer;
function openModal(){$('aboutModal').classList.add('open');$('modalBackdrop').classList.add('open')};function closeModal(){$('aboutModal').classList.remove('open');$('modalBackdrop').classList.remove('open')}$('btnAbout').onclick=openModal;$('modalClose').onclick=closeModal;$('modalBackdrop').onclick=closeModal;
$('btnReset').onclick=()=>{['countryFilter','regionFilter','admin2Filter','orgFilter','statusFilter','themeFilter','funderFilter','partnerFilter'].forEach(id=>$(id).value='');$('yearStart').value=2021;$('yearEnd').value=2026;$('metricSelect').value='projects';$('historicalToggle').checked=false;map.setView([14.7,-12.7],5);$('mapScope').textContent='Bassin du Fleuve Sénégal · 4 pays';apply();toast('Filtres réinitialisés')};
$('btnFilters').onclick=()=>$('.left-panel')?.classList.toggle('open');
function toast(msg){let t=$('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function openTerrainPopup(latlng){
  const html=`<div class="popup-title">Point sur la carte</div><div class="terrain-coords">${latlng.lat.toFixed(5)} · ${latlng.lng.toFixed(5)}</div><p class="terrain-note">Ouvrir une vue au sol si Google dispose d'une couverture à cet endroit.</p>${terrainLinks(latlng.lat,latlng.lng)}`;
  L.popup({maxWidth:270}).setLatLng(latlng).setContent(html).openOn(map);
}
map.on('click',e=>openTerrainPopup(e.latlng));
let stagedImport=[];
function openImport(){ $('importModal').classList.add('open');$('importBackdrop').classList.add('open') }
function closeImport(){ $('importModal').classList.remove('open');$('importBackdrop').classList.remove('open') }
$('btnImport').onclick=openImport;$('importClose').onclick=closeImport;$('importBackdrop').onclick=closeImport;$('btnChooseCsv').onclick=()=>$('csvInput').click();
function parseCSVLine(line,sep){let out=[],cur='',q=false;for(let i=0;i<line.length;i++){let ch=line[i];if(ch==='"'){if(q&&line[i+1]==='"'){cur+='"';i++}else q=!q}else if(ch===sep&&!q){out.push(cur.trim());cur=''}else cur+=ch}out.push(cur.trim());return out}
function validationState(kind,title,subtitle){let b=$('csvValidation');b.className='validation-box '+kind;b.innerHTML=`<strong>${title}</strong><span>${subtitle}</span>`}
function validateCSV(txt,fileName='fichier.csv'){
  const errors=[],warnings=[],rows=[];let lines=txt.replace(/^\uFEFF/,'').split(/\r?\n/).filter(x=>x.trim());
  if(lines.length<2)return {errors:['Le fichier ne contient aucune ligne de données.'],warnings,rows,sep:';'};
  let sep=lines[0].includes(';')?';':',';let headers=parseCSVLine(lines[0],sep).map(x=>x.toLowerCase().trim());
  let req=['title','country','region','admin2','organization','theme','funder','partner','status','start','end','beneficiaries'];
  let missing=req.filter(x=>!headers.includes(x));if(missing.length)errors.push('Colonnes obligatoires manquantes : '+missing.join(', ')+'.');
  if(errors.length)return {errors,warnings,rows,sep,headers};
  const territoryKeys=new Set(admin2Defs.map(d=>`${d[0]}|${d[1]}|${d[2]}`));
  const allowedStatus=new Set(['En cours','Terminé']);const seen=new Set();
  for(let i=1;i<lines.length;i++){let vals=parseCSVLine(lines[i],sep),o={};headers.forEach((h,k)=>o[h]=vals[k]||'');let rowErrors=[];
    req.forEach(k=>{if(!String(o[k]||'').trim())rowErrors.push(`champ ${k} vide`)});
    if(o.status&&!allowedStatus.has(o.status))rowErrors.push('status doit être « En cours » ou « Terminé »');
    let sy=Number(o.start),ey=Number(o.end),ben=Number(String(o.beneficiaries).replace(/\s/g,''));
    if(!Number.isInteger(sy)||sy<2021||sy>2026)rowErrors.push('start doit être une année 2021–2026');
    if(!Number.isInteger(ey)||ey<2021||ey>2026)rowErrors.push('end doit être une année 2021–2026');
    if(Number.isFinite(sy)&&Number.isFinite(ey)&&sy>ey)rowErrors.push('start est postérieur à end');
    if(!Number.isFinite(ben)||ben<0)rowErrors.push('beneficiaries doit être un nombre positif');
    if(o.country&&o.region&&o.admin2&&!territoryKeys.has(`${o.country}|${o.region}|${o.admin2}`))rowErrors.push(`territoire inconnu : ${o.country} / ${o.region} / ${o.admin2}`);
    let dup=`${o.title}|${o.admin2}|${o.start}`.toLowerCase();if(seen.has(dup))warnings.push(`Ligne ${i+1} : doublon possible « ${o.title} »`);seen.add(dup);
    if(o.organization&&!ORGS.includes(o.organization))warnings.push(`Ligne ${i+1} : organisation nouvelle « ${o.organization} »`);
    let unknownThemes=(o.theme||'').split('|').filter(t=>t&&!THEMES.includes(t));if(unknownThemes.length)warnings.push(`Ligne ${i+1} : thématique nouvelle « ${unknownThemes.join(' / ')} »`);
    if(rowErrors.length)errors.push(`Ligne ${i+1} : ${rowErrors.join(' ; ')}`);else rows.push(o);
  }
  return {errors,warnings,rows,sep,headers,fileName};
}
function showValidation(result){
  stagedImport=[];$('btnCommitImport').disabled=true;let details=[];
  if(result.errors.length){validationState('error',`${result.errors.length} erreur${result.errors.length>1?'s':''} bloquante${result.errors.length>1?'s':''}`,`Le fichier n'a pas été importé.`);details.push(`<div class="err"><strong>À corriger</strong><ul>${result.errors.slice(0,12).map(e=>`<li>${e}</li>`).join('')}</ul></div>`)}
  else{stagedImport=result.rows;let msg=`${result.rows.length} ligne${result.rows.length>1?'s':''} valide${result.rows.length>1?'s':''} · séparateur « ${result.sep} »`;validationState(result.warnings.length?'warn':'ok',result.warnings.length?'Fichier valide avec avertissements':'Fichier valide',msg);$('btnCommitImport').disabled=false}
  if(result.warnings.length)details.push(`<div class="warn"><strong>Avertissements non bloquants</strong><ul>${result.warnings.slice(0,10).map(e=>`<li>${e}</li>`).join('')}</ul></div>`);
  $('csvErrors').innerHTML=details.join('');$('csvSummary').textContent=result.fileName?`${result.fileName} · ${result.rows.length} ligne(s) exploitable(s)`:'Contrôle terminé';
}
$('csvInput').addEventListener('change',e=>{let file=e.target.files[0];if(!file)return;validationState('idle','Contrôle en cours…',file.name);let r=new FileReader();r.onload=()=>showValidation(validateCSV(r.result,file.name));r.readAsText(file,'utf-8');e.target.value=''});
$('btnCommitImport').onclick=()=>{if(!stagedImport.length)return;let next=Math.max(0,...projects.map(p=>p.id))+1;stagedImport.forEach(o=>projects.push({id:next++,title:o.title,country:o.country,region:o.region,admin2:o.admin2,organization:o.organization,themes:o.theme.split('|').filter(Boolean),funder:o.funder,partner:o.partner,status:o.status,start:+o.start,end:+o.end,beneficiaries:+o.beneficiaries||0,budget:+o.budget||0,odd:(o.odd||'').split('|').filter(Boolean),summary:o.summary||'Projet importé depuis CSV.'}));let n=stagedImport.length;stagedImport=[];fillSelect('countryFilter',unique(projects.map(p=>p.country)));fillSelect('orgFilter',unique(projects.map(p=>p.organization)));fillSelect('themeFilter',unique(projects.flatMap(p=>p.themes)));fillSelect('funderFilter',unique(projects.map(p=>p.funder)));fillSelect('partnerFilter',unique(projects.map(p=>p.partner)));closeImport();apply();toast(`${n} projet${n>1?'s':''} importé${n>1?'s':''}`)};
apply();
