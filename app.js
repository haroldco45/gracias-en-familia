/* Gracias en Familia — Vibras Positivas HM (2026)
   PWA bilingüe ES/EN. Hora real de Colombia (America/Bogota).
   Fotos reales desde Wikimedia Commons con crédito de autor. */
(function () {
  "use strict";
  var TZ = "America/Bogota";
  var WA = "573117700431";
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var lang = store.get("gf_lang", "es");
  var $ = function (s) { return document.querySelector(s); };
  function L(o) { return (o && typeof o === "object") ? (o[lang] || o.es) : o; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function toast(t) { var el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove("on"); }, 2200); }

  /* ---------- Textos de la interfaz ---------- */
  var UI = {
    brand: { es: "Gracias en Familia", en: "Thankful Together" },
    refresh: { es: "Actualizar", en: "Refresh" },
    t_home: { es: "Hoy", en: "Today" }, t_history: { es: "Historia", en: "History" },
    t_customs: { es: "Costumbres", en: "Traditions" }, t_menu: { es: "Menú", en: "Menu" },
    t_wall: { es: "Muro de gratitud", en: "Gratitude wall" }, t_table: { es: "Ronda en la mesa", en: "Table talk" },
    t_card: { es: "Tarjeta", en: "Card" }, t_phrases: { es: "Frases", en: "Messages" }, t_english: { es: "Inglés", en: "Vocabulary" },
    hero_title: { es: "Hoy es día de dar gracias", en: "Today is a day to give thanks" },
    hero_lead: { es: "El cuarto jueves de noviembre, millones de familias se sientan a la mesa a agradecer por la cosecha, la familia y las bendiciones del año. Aquí tiene todo para vivirlo en casa.", en: "On the fourth Thursday of November, millions of families sit down together to give thanks for the harvest, their loved ones and the year's blessings. Here is everything you need to celebrate at home." },
    cta_wall: { es: "Escribir mi agradecimiento", en: "Write what I'm thankful for" },
    cta_menu: { es: "Ver el menú", en: "See the menu" },
    col_time: { es: "Hora en Colombia", en: "Time in Colombia" },
    wall_count: { es: "agradecimientos en su muro", en: "notes on your wall" },
    bf_txt: { es: "días para el Black Friday", en: "days to Black Friday" },
    today_title: { es: "Para hoy", en: "For today" },
    today_sub: { es: "Una idea distinta cada vez que entra.", en: "A new idea every time you open the app." },
    hist_sub: { es: "De una cosecha en 1621 a un festivo nacional.", en: "From a 1621 harvest feast to a national holiday." },
    hist_note: { es: "Para el pueblo wampanoag y otros pueblos nativos la fecha también trae memoria de pérdidas: desde 1970 se conmemora ese mismo día el \"Día Nacional de Luto\" en Plymouth. Dar gracias también es recordar con respeto.", en: "For the Wampanoag and other Native peoples the date also carries memories of loss: since 1970 a \"National Day of Mourning\" has been held in Plymouth on the same day. Giving thanks also means remembering with respect." },
    cust_sub: { es: "Lo que pasa ese día en Estados Unidos, Canadá y en casas colombianas.", en: "What happens on the day in the U.S., Canada and Colombian homes." },
    menu_title: { es: "Menú de Acción de Gracias a la colombiana", en: "A Colombian-style Thanksgiving menu" },
    menu_sub: { es: "Con lo que se consigue en la plaza y el supermercado. Toque una receta para ver ingredientes, pasos y videos.", en: "Made with what you can find at the market. Tap a recipe for ingredients, steps and videos." },
    wall_sub: { es: "Escriba por qué da gracias este año. Se guarda en su celular y lo puede mandar por WhatsApp.", en: "Write what you are thankful for this year. It is saved on your phone and you can send it on WhatsApp." },
    ph_name: { es: "Su nombre", en: "Your name" }, ph_text: { es: "Este año doy gracias por...", en: "This year I'm thankful for..." },
    add: { es: "Agregar al muro", en: "Add to the wall" }, share_all: { es: "Compartir todo el muro", en: "Share the whole wall" },
    table_sub: { es: "Pase el celular: cada uno toca y responde en voz alta antes de comer.", en: "Pass the phone around: each person taps and answers out loud before the meal." },
    table_start: { es: "Toque \"Siguiente pregunta\" para empezar", en: "Tap \"Next question\" to start" },
    next_q: { es: "Siguiente pregunta", en: "Next question" },
    card_title: { es: "Haga su tarjeta", en: "Make your card" },
    card_sub: { es: "Escoja una foto, escriba su mensaje y descárguela o compártala.", en: "Pick a photo, write your message, then download or share it." },
    card_to: { es: "Para", en: "To" }, card_msg: { es: "Mensaje", en: "Message" }, card_from: { es: "De", en: "From" },
    card_photo: { es: "Foto", en: "Photo" }, card_own: { es: "O use una foto suya", en: "Or use your own photo" },
    download: { es: "Descargar", en: "Download" }, share: { es: "Compartir", en: "Share" },
    phr_sub: { es: "Para la familia, los amigos, el equipo de trabajo y los clientes.", en: "For family, friends, your team and your customers." },
    eng_title: { es: "Aprenda el inglés de Thanksgiving", en: "Thanksgiving words in English and Spanish" },
    eng_sub: { es: "Toque cada palabra para oír cómo se pronuncia.", en: "Tap any word to hear it." },
    promo_title: { es: "¿Quiere una app así para su negocio o su familia?", en: "Want an app like this for your business or family?" },
    promo_txt: { es: "Vibras Positivas HM hace apps para negocios, eventos, colegios y recuerdos de familia en Caucasia y toda Colombia.", en: "Vibras Positivas HM builds apps for businesses, events, schools and family keepsakes in Caucasia and all of Colombia." },
    promo_btn: { es: "Escribir por WhatsApp", en: "Message us on WhatsApp" },
    footer_photos: { es: "Fotos reales de Wikimedia Commons, con el crédito de cada autor.", en: "Real photos from Wikimedia Commons, credited to each author." },
    copied: { es: "Copiado", en: "Copied" }, saved: { es: "Agregado al muro", en: "Added to the wall" },
    updated: { es: "Actualizado", en: "Updated" }, del: { es: "Borrar", en: "Delete" }, send: { es: "Enviar", en: "Send" },
    copy: { es: "Copiar", en: "Copy" }, empty_wall: { es: "Su muro está vacío. Escriba el primer agradecimiento.", en: "Your wall is empty. Write the first note." },
    idea: { es: "Idea del día", en: "Idea of the day" }, question: { es: "Pregunta para la mesa", en: "Question for the table" },
    word: { es: "Palabra en inglés", en: "Word of the day" },
    ingredients: { es: "Ingredientes", en: "Ingredients" }, steps: { es: "Preparación", en: "Method" },
    watch: { es: "Ver videos de la receta", en: "Watch recipe videos" },
    dinner: { es: "para la cena (7:00 p. m.)", en: "to dinner (7:00 p.m.)" },
    atTable: { es: "¡A la mesa!", en: "Dinner time!" },
    nextTg: { es: "Próximo Día de Acción de Gracias", en: "Next Thanksgiving" },
    isToday: { es: "Hoy es Día de Acción de Gracias", en: "Today is Thanksgiving Day" },
    all: { es: "Todas", en: "All" }, photo: { es: "Foto", en: "Photo" }
  };

  /* ---------- Fechas con hora real de Colombia ---------- */
  function bogotaParts(d) {
    var f = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
    var o = {}; f.formatToParts(d || new Date()).forEach(function (p) { o[p.type] = p.value; });
    return { y: +o.year, m: +o.month, d: +o.day, h: +o.hour % 24, min: +o.minute };
  }
  function thanksgiving(y) { // cuarto jueves de noviembre
    var first = new Date(Date.UTC(y, 10, 1)).getUTCDay();
    var day = 1 + ((4 - first + 7) % 7) + 21;
    return { y: y, m: 11, d: day };
  }
  function fmtDate(p) {
    return new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" })
      .format(new Date(Date.UTC(p.y, p.m - 1, p.d, 12)));
  }
  function dayDiff(a, b) { return Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 864e5); }

  function tick() {
    var now = bogotaParts();
    $("#clockNow").textContent = String(now.h).padStart(2, "0") + ":" + String(now.min).padStart(2, "0");
    var tg = thanksgiving(now.y);
    if (dayDiff(now, tg) < 0) tg = thanksgiving(now.y + 1);
    var isToday = dayDiff(now, tg) === 0;
    var label = fmtDate(now);
    $("#todayLabel").textContent = isToday ? (L(UI.isToday) + " · " + label) : (L(UI.nextTg) + ": " + fmtDate(tg));
    var mins = (19 * 60) - (now.h * 60 + now.min);
    if (isToday && mins > 0) { $("#countdown").textContent = Math.floor(mins / 60) + "h " + (mins % 60) + "m"; $("#countdownTxt").textContent = L(UI.dinner); }
    else if (isToday) { $("#countdown").textContent = L(UI.atTable); $("#countdownTxt").textContent = "7:00 p. m."; }
    else { $("#countdown").textContent = dayDiff(now, tg); $("#countdownTxt").textContent = lang === "es" ? "días para Acción de Gracias" : "days to Thanksgiving"; }
    var bf = { y: tg.y, m: 11, d: tg.d + 1 };
    $("#blackFriday").textContent = Math.max(0, dayDiff(now, bf));
  }

  /* ---------- Fotos reales: Wikimedia Commons ---------- */
  var photoCache = store.get("gf_photos", {});
  function stripTags(s) { var d = document.createElement("div"); d.innerHTML = s || ""; return (d.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60); }
  function commons(query, n) {
    var key = query + "|" + n;
    var c = photoCache[key];
    if (c && Date.now() - c.t < 6 * 3600e3 && c.list.length) return Promise.resolve(c.list);
    var url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6" +
      "&gsrlimit=" + (n * 3) + "&gsrsearch=" + encodeURIComponent(query + " filetype:bitmap") +
      "&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=1280";
    return fetch(url).then(function (r) { return r.json(); }).then(function (j) {
      var pages = j && j.query ? Object.keys(j.query.pages).map(function (k) { return j.query.pages[k]; }) : [];
      pages.sort(function (a, b) { return (a.index || 0) - (b.index || 0); });
      var list = pages.map(function (p) {
        var ii = p.imageinfo && p.imageinfo[0]; if (!ii || !/jpe?g/i.test(ii.mime)) return null;
        var md = ii.extmetadata || {};
        return { src: ii.thumburl || ii.url, page: ii.descriptionurl, author: stripTags(md.Artist && md.Artist.value) || "Wikimedia Commons", lic: stripTags(md.LicenseShortName && md.LicenseShortName.value) };
      }).filter(Boolean).slice(0, n);
      photoCache[key] = { t: Date.now(), list: list }; store.set("gf_photos", photoCache);
      return list;
    }).catch(function () { return []; });
  }
  function creditHTML(p) { return p ? ('<a href="' + esc(p.page) + '" target="_blank" rel="noopener">' + L(UI.photo) + ': ' + esc(p.author) + (p.lic ? " · " + esc(p.lic) : "") + '</a>') : ""; }
  function fillImg(img, creditEl, query, i) {
    commons(query, 4).then(function (list) {
      var p = list[i % Math.max(1, list.length)] || list[0];
      if (!p) { img.remove(); return; }
      img.src = p.src; img.alt = query;
      if (creditEl) creditEl.innerHTML = creditHTML(p);
    });
  }

  /* Hero: carrusel de fotos reales */
  var heroQueries = ["Thanksgiving dinner family table", "roast turkey Thanksgiving", "pumpkin pie", "Thanksgiving dinner", "cranberry sauce"];
  var heroList = [], heroIdx = 0, heroTimer;
  function loadHero() {
    Promise.all(heroQueries.map(function (q) { return commons(q, 3); })).then(function (res) {
      heroList = []; var seen = {};
      res.forEach(function (l) { l.forEach(function (p) { if (!seen[p.src]) { seen[p.src] = 1; heroList.push(p); } }); });
      heroList = heroList.slice(0, 10);
      var box = $("#heroSlides"); box.innerHTML = "";
      heroList.forEach(function (p, i) { var im = new Image(); im.src = p.src; im.alt = ""; if (i === 0) im.className = "on"; im.style.animationDelay = (-i * 3) + "s"; box.appendChild(im); });
      $("#heroCredit").innerHTML = creditHTML(heroList[0]);
      clearInterval(heroTimer);
      heroTimer = setInterval(function () {
        var imgs = box.querySelectorAll("img"); if (imgs.length < 2) return;
        imgs[heroIdx].classList.remove("on"); heroIdx = (heroIdx + 1) % imgs.length; imgs[heroIdx].classList.add("on");
        $("#heroCredit").innerHTML = creditHTML(heroList[heroIdx]);
      }, 5500);
      buildThumbs();
    });
  }

  /* ---------- Contenido ---------- */
  var TIMELINE = [
    { y: "1621", q: "The First Thanksgiving Plymouth painting", t: { es: "La cosecha de Plymouth", en: "The Plymouth harvest" }, d: { es: "Tras su primera cosecha, los colonos ingleses de Plymouth (Massachusetts) y unos 90 hombres del pueblo wampanoag, con su líder Massasoit, compartieron tres días de comida, caza y juegos.", en: "After their first harvest, the English settlers of Plymouth, Massachusetts and about 90 Wampanoag men led by Massasoit shared three days of food, hunting and games." } },
    { y: "1789", q: "George Washington portrait Gilbert Stuart", t: { es: "Washington pide dar gracias", en: "Washington's proclamation" }, d: { es: "George Washington proclama un día nacional de acción de gracias para el 26 de noviembre, aunque todavía no era un festivo fijo cada año.", en: "George Washington proclaims a national day of thanksgiving for November 26, though it was not yet a fixed yearly holiday." } },
    { y: "1863", q: "Sarah Josepha Hale", t: { es: "Lincoln lo vuelve festivo", en: "Lincoln makes it national" }, d: { es: "Después de 17 años de cartas de la escritora Sarah Josepha Hale, Abraham Lincoln, en plena Guerra Civil, proclama el último jueves de noviembre como día nacional de acción de gracias.", en: "After 17 years of letters from writer Sarah Josepha Hale, Abraham Lincoln, in the middle of the Civil War, proclaims the last Thursday of November a national day of thanksgiving." } },
    { y: "1924", q: "Macy's Thanksgiving Day Parade balloon", t: { es: "Nace el desfile de Macy's", en: "The Macy's parade begins" }, d: { es: "Los empleados de la tienda Macy's en Nueva York hacen el primer desfile. Hoy lo ven millones de personas con sus globos gigantes.", en: "Macy's employees in New York hold the first parade. Today millions watch its giant balloons." } },
    { y: "1941", q: "Franklin D. Roosevelt", t: { es: "El cuarto jueves, por ley", en: "Fourth Thursday by law" }, d: { es: "Franklin D. Roosevelt había adelantado la fecha para alargar la temporada de compras. En 1941 el Congreso fijó por ley el cuarto jueves de noviembre.", en: "Franklin D. Roosevelt had moved the date earlier to lengthen the shopping season. In 1941 Congress fixed it by law on the fourth Thursday of November." } },
    { y: "1957", q: "Canadian Thanksgiving dinner", t: { es: "Canadá: segundo lunes de octubre", en: "Canada: second Monday of October" }, d: { es: "Canadá fija su Día de Acción de Gracias el segundo lunes de octubre, más cerca de su propia cosecha.", en: "Canada sets its Thanksgiving Day on the second Monday of October, closer to its own harvest." } },
    { y: "1970", q: "Plymouth Rock Massachusetts", t: { es: "Día Nacional de Luto", en: "National Day of Mourning" }, d: { es: "Pueblos nativos empiezan a reunirse en Plymouth ese mismo día para recordar a sus antepasados y las pérdidas que trajo la colonización.", en: "Native peoples begin gathering in Plymouth on the same day to remember their ancestors and the losses colonization brought." } },
    { y: "2026", q: "family dinner table gathering", t: { es: "Hoy en su casa", en: "Today, at your home" }, d: { es: "Jueves 26 de noviembre. En Colombia no es festivo, pero cada vez más familias, colegios bilingües y familias con parientes en Estados Unidos lo celebran.", en: "Thursday, November 26. It is not a holiday in Colombia, but more and more families, bilingual schools and families with relatives in the U.S. celebrate it." } }
  ];
  var CUSTOMS = [
    { q: "Thanksgiving dinner table", t: { es: "La cena en familia", en: "The family dinner" }, d: { es: "Pavo al horno, relleno, puré de papa, salsa de arándanos, batatas y pastel de calabaza. La mesa se llena y sobra para el día siguiente.", en: "Roast turkey, stuffing, mashed potatoes, cranberry sauce, sweet potatoes and pumpkin pie. The table is full and there are leftovers for the next day." } },
    { q: "family saying grace before dinner", t: { es: "Decir por qué se da gracias", en: "Saying what you are thankful for" }, d: { es: "Antes de comer, cada uno dice algo por lo que está agradecido. Muchas familias también oran.", en: "Before eating, everyone says something they are thankful for. Many families also say grace." } },
    { q: "Macy's Thanksgiving Day Parade", t: { es: "El desfile de Macy's", en: "The Macy's parade" }, d: { es: "En la mañana, Nueva York se llena de globos gigantes, bandas y carrozas. Termina con la llegada de Papá Noel, que abre la temporada navideña.", en: "In the morning New York fills with giant balloons, bands and floats. It ends with Santa's arrival, opening the holiday season." } },
    { q: "American football Thanksgiving game", t: { es: "Fútbol americano", en: "Football" }, d: { es: "La NFL juega ese día; los Detroit Lions y los Dallas Cowboys juegan en casa casi todos los años desde hace décadas.", en: "The NFL plays that day; the Detroit Lions and Dallas Cowboys have hosted games almost every year for decades." } },
    { q: "National Thanksgiving Turkey Presentation White House", t: { es: "El indulto del pavo", en: "The turkey pardon" }, d: { es: "En la Casa Blanca, el presidente \"perdona\" a un pavo que se salva de la cena y se va a vivir a una granja.", en: "At the White House the president \"pardons\" a turkey, which is spared and sent to live on a farm." } },
    { q: "Black Friday shopping store", t: { es: "Black Friday", en: "Black Friday" }, d: { es: "Al día siguiente empiezan las grandes ofertas. En Colombia también se volvió costumbre en almacenes y tiendas en línea.", en: "The next day the big sales begin. It has become a custom in Colombian stores and online shops too." } },
    { q: "friends dinner party table", t: { es: "Friendsgiving", en: "Friendsgiving" }, d: { es: "Una cena de agradecimiento entre amigos, donde cada uno lleva un plato.", en: "A thanksgiving dinner among friends where everyone brings a dish." } },
    { q: "food bank volunteers", t: { es: "Ayudar a otros", en: "Helping others" }, d: { es: "Mucha gente dona mercados o sirve comida en comedores comunitarios. Es una buena idea también aquí en el barrio.", en: "Many people donate food or serve meals at community kitchens. A good idea for your neighborhood too." } }
  ];
  var RECIPES = [
    { q: "roast turkey", time: "3–4 h", serv: { es: "10 personas", en: "Serves 10" }, t: { es: "Pavo (o pollo campesino) al horno con naranja agria", en: "Roast turkey (or farm chicken) with sour orange" },
      ing: { es: ["1 pavo de 5 a 6 kg (o 2 pollos campesinos)", "Jugo de 4 naranjas agrias", "1 cabeza de ajo machacada", "Mantequilla al gusto", "Tomillo, laurel, comino, sal y pimienta", "1 cebolla larga y 1 cebolla cabezona"], en: ["1 turkey, 5–6 kg (or 2 farm chickens)", "Juice of 4 sour oranges", "1 head of garlic, crushed", "Butter to taste", "Thyme, bay leaf, cumin, salt and pepper", "Scallions and 1 onion"] },
      st: { es: ["La noche anterior adobe el pavo por dentro y por fuera con la naranja, el ajo, las hierbas, sal y pimienta.", "Unte mantequilla bajo la piel de la pechuga.", "Rellene la cavidad con las cebollas o con el relleno de pan.", "Hornee a 180 °C unos 40 minutos por kilo, bañándolo con su jugo cada 30 minutos. Cubra con papel aluminio si se dora mucho.", "Déjelo reposar 20 minutos antes de partirlo y guarde el jugo para la salsa."], en: ["The night before, rub the turkey inside and out with orange juice, garlic, herbs, salt and pepper.", "Spread butter under the breast skin.", "Fill the cavity with the onions or with the bread stuffing.", "Roast at 180 °C (350 °F) about 40 minutes per kilo, basting every 30 minutes. Cover with foil if it browns too fast.", "Rest 20 minutes before carving and save the juices for gravy."] } },
    { q: "Thanksgiving stuffing bread", time: "50 min", serv: { es: "10 personas", en: "Serves 10" }, t: { es: "Relleno de pan con chorizo antioqueño", en: "Bread stuffing with Antioquia-style chorizo" },
      ing: { es: ["8 panes aliñados del día anterior en cubos", "3 chorizos antioqueños sin piel", "1 cebolla y 2 tallos de apio picados", "1 manzana verde en cubos", "2 huevos", "2 tazas de caldo de pollo", "Perejil y tomillo"], en: ["8 day-old bread rolls, cubed", "3 Colombian chorizos, casings removed", "1 onion and 2 celery stalks, chopped", "1 green apple, diced", "2 eggs", "2 cups chicken stock", "Parsley and thyme"] },
      st: { es: ["Dore el chorizo desmenuzado en un sartén y saque.", "En esa grasa sofría cebolla, apio y manzana.", "Mezcle el pan con todo, los huevos batidos, el caldo y las hierbas.", "Hornee en refractario tapado 25 minutos a 180 °C y destapado 15 más, hasta que dore."], en: ["Brown the crumbled chorizo and set aside.", "In the same fat, cook onion, celery and apple.", "Mix the bread with everything, the beaten eggs, the stock and herbs.", "Bake covered 25 minutes at 180 °C, then uncovered 15 more until golden."] } },
    { q: "mashed potatoes", time: "35 min", serv: { es: "8 personas", en: "Serves 8" }, t: { es: "Puré de papa criolla y pastusa", en: "Mashed criolla and white potatoes" },
      ing: { es: ["1 kg de papa pastusa", "1/2 kg de papa criolla", "1 taza de leche caliente", "4 cucharadas de mantequilla", "Sal, pimienta y nuez moscada"], en: ["1 kg white potatoes", "1/2 kg yellow criolla potatoes", "1 cup hot milk", "4 tbsp butter", "Salt, pepper and nutmeg"] },
      st: { es: ["Cocine las papas peladas en agua con sal hasta que estén blandas (la criolla se cocina más rápido: échela 10 minutos después).", "Escurra y machaque caliente.", "Agregue la mantequilla y la leche poco a poco hasta que quede cremoso.", "Sazone con sal, pimienta y una pizca de nuez moscada."], en: ["Boil the peeled potatoes in salted water until soft (criolla cooks faster: add it 10 minutes later).", "Drain and mash while hot.", "Add butter and milk gradually until creamy.", "Season with salt, pepper and a pinch of nutmeg."] } },
    { q: "cranberry sauce", time: "20 min", serv: { es: "10 personas", en: "Serves 10" }, t: { es: "Salsa de arándanos (o de mora y uchuva)", en: "Cranberry sauce (or blackberry and goldenberry)" },
      ing: { es: ["2 tazas de arándanos frescos o congelados (o mora de Castilla con uchuvas)", "3/4 de taza de azúcar o panela rallada", "Jugo y ralladura de 1 naranja", "1/2 taza de agua", "1 astilla de canela"], en: ["2 cups fresh or frozen cranberries (or Andean blackberries with goldenberries)", "3/4 cup sugar or grated panela", "Juice and zest of 1 orange", "1/2 cup water", "1 cinnamon stick"] },
      st: { es: ["Hierva el agua con el azúcar, la naranja y la canela.", "Agregue la fruta y cocine a fuego medio 10 minutos, hasta que revienten.", "Retire la canela y deje enfriar: espesa sola.", "Sirva fría al lado del pavo."], en: ["Boil water with sugar, orange and cinnamon.", "Add the fruit and simmer 10 minutes until the berries burst.", "Remove the cinnamon and let cool: it thickens on its own.", "Serve cold next to the turkey."] } },
    { q: "roasted sweet potatoes", time: "45 min", serv: { es: "8 personas", en: "Serves 8" }, t: { es: "Batatas asadas con panela y canela", en: "Roasted sweet potatoes with panela and cinnamon" },
      ing: { es: ["1 kg de batata en rodajas gruesas", "3 cucharadas de panela rallada", "3 cucharadas de mantequilla derretida", "Canela en polvo y una pizca de sal"], en: ["1 kg sweet potatoes, thick slices", "3 tbsp grated panela", "3 tbsp melted butter", "Ground cinnamon and a pinch of salt"] },
      st: { es: ["Mezcle la batata con la mantequilla, la panela, la canela y la sal.", "Extienda en una bandeja sin amontonar.", "Hornee a 200 °C unos 35 minutos, volteando a la mitad, hasta que caramelice."], en: ["Toss sweet potatoes with butter, panela, cinnamon and salt.", "Spread on a tray in one layer.", "Roast at 200 °C about 35 minutes, turning halfway, until caramelized."] } },
    { q: "pumpkin pie", time: "1 h 30", serv: { es: "8 porciones", en: "8 slices" }, t: { es: "Pastel de ahuyama", en: "Pumpkin (ahuyama) pie" },
      ing: { es: ["Masa para tarta (comprada o casera)", "2 tazas de ahuyama cocida y hecha puré", "1 lata de leche condensada", "3 huevos", "1 cucharadita de canela, 1/2 de jengibre y una pizca de clavo y nuez moscada"], en: ["Pie crust (store-bought or homemade)", "2 cups cooked, puréed pumpkin", "1 can condensed milk", "3 eggs", "1 tsp cinnamon, 1/2 tsp ginger, a pinch of clove and nutmeg"] },
      st: { es: ["Forre un molde con la masa y precocínela 10 minutos a 190 °C.", "Licúe la ahuyama con la leche condensada, los huevos y las especias.", "Vierta sobre la masa y hornee a 180 °C unos 45 a 50 minutos, hasta que el centro apenas tiemble.", "Deje enfriar y sirva con crema chantilly."], en: ["Line a pan with the crust and pre-bake 10 minutes at 190 °C.", "Blend pumpkin with condensed milk, eggs and spices.", "Pour into the crust and bake at 180 °C for 45–50 minutes, until the center barely wobbles.", "Cool and serve with whipped cream."] } },
    { q: "gravy boat", time: "15 min", serv: { es: "10 personas", en: "Serves 10" }, t: { es: "Salsa gravy con el jugo del pavo", en: "Turkey gravy" },
      ing: { es: ["El jugo que soltó el pavo", "2 cucharadas de harina de trigo", "2 cucharadas de mantequilla", "2 tazas de caldo", "Sal y pimienta"], en: ["The turkey pan drippings", "2 tbsp flour", "2 tbsp butter", "2 cups stock", "Salt and pepper"] },
      st: { es: ["Derrita la mantequilla y tueste la harina 2 minutos revolviendo.", "Agregue el jugo del pavo colado y el caldo poco a poco, batiendo para que no se formen grumos.", "Cocine hasta que espese y sazone."], en: ["Melt butter and cook the flour 2 minutes, stirring.", "Gradually whisk in strained drippings and stock so no lumps form.", "Simmer until thick and season."] } }
  ];
  var IDEAS = [
    { es: "Pídale a cada invitado que traiga escrito en un papel algo bueno que le pasó este año y léanlos en la sobremesa.", en: "Ask each guest to bring a note about something good that happened this year and read them after dinner." },
    { es: "Haga una videollamada con los familiares que están lejos, en Estados Unidos o en otra ciudad, antes de servir.", en: "Video-call relatives who live far away before you serve dinner." },
    { es: "Prepare un plato de más y llévelo a un vecino que esté solo.", en: "Cook one extra plate and take it to a neighbor who lives alone." },
    { es: "Tome una foto de toda la familia en la mesa y conviértala en tarjeta en la pestaña Tarjeta.", en: "Take a photo of the whole family at the table and turn it into a card in the Card tab." },
    { es: "Escríbale hoy un mensaje de gracias a alguien que lo ayudó este año y que nunca se lo ha dicho.", en: "Send a thank-you message today to someone who helped you this year." },
    { es: "Pongan una jarra en la mesa: cada uno echa un papelito con un agradecimiento y se leen el 31 de diciembre.", en: "Put a jar on the table: everyone drops in a thank-you note, and you read them on New Year's Eve." },
    { es: "Done un mercado a un comedor comunitario o a la parroquia del barrio.", en: "Donate groceries to a community kitchen or your local parish." }
  ];
  var QUESTIONS = [
    { es: "¿Qué es lo que más agradece de este año?", en: "What are you most thankful for this year?" },
    { es: "¿Quién lo ayudó este año sin que usted se lo pidiera?", en: "Who helped you this year without being asked?" },
    { es: "¿Cuál es su recuerdo favorito de una comida en familia?", en: "What is your favorite memory of a family meal?" },
    { es: "¿Qué aprendió este año que quiere enseñarle a otro?", en: "What did you learn this year that you'd like to teach someone?" },
    { es: "¿De qué cosa pequeña de todos los días da gracias?", en: "What small everyday thing are you grateful for?" },
    { es: "¿A qué persona de esta mesa le quiere dar las gracias, y por qué?", en: "Who at this table do you want to thank, and why?" },
    { es: "¿Cuál fue el momento más difícil del año y qué lo sacó adelante?", en: "What was the hardest moment of the year and what got you through it?" },
    { es: "¿Qué tradición de la familia no quiere que se pierda nunca?", en: "Which family tradition should never be lost?" },
    { es: "Si pudiera agradecerle a alguien que ya no está, ¿qué le diría?", en: "If you could thank someone who is no longer here, what would you say?" },
    { es: "¿Qué lugar de Colombia agradece conocer?", en: "Which place in Colombia are you grateful to know?" },
    { es: "¿Qué quiere que agradezcamos juntos el año que viene?", en: "What would you like us to be thankful for together next year?" },
    { es: "¿Cuál es la comida que más le recuerda a su casa?", en: "Which dish reminds you most of home?" },
    { es: "¿Qué talento de otra persona de la mesa admira?", en: "Which talent of someone at this table do you admire?" },
    { es: "¿Qué canción pondría para celebrar este año?", en: "Which song would you play to celebrate this year?" }
  ];
  var VOCAB = [
    ["Happy Thanksgiving!", "¡Feliz Día de Acción de Gracias!"], ["turkey", "pavo"], ["stuffing", "relleno"], ["gravy", "salsa de carne / gravy"],
    ["mashed potatoes", "puré de papa"], ["cranberry sauce", "salsa de arándanos"], ["sweet potatoes", "batatas"], ["pumpkin pie", "pastel de ahuyama"],
    ["harvest", "cosecha"], ["feast", "banquete"], ["grateful", "agradecido"], ["thankful", "agradecido"], ["blessing", "bendición"],
    ["leftovers", "sobras"], ["parade", "desfile"], ["Pilgrims", "peregrinos / colonos"], ["wishbone", "hueso de la suerte"],
    ["What are you thankful for?", "¿Por qué está agradecido?"], ["Please pass the gravy.", "Páseme la salsa, por favor."], ["Let's give thanks.", "Demos gracias."]
  ];
  var PHRASES = [
    { c: "fam", es: "Gracias, familia, por ser mi casa en cualquier lugar. Hoy doy gracias por cada uno de ustedes. ¡Feliz Día de Acción de Gracias!", en: "Thank you, family, for being my home wherever I am. Today I give thanks for each of you. Happy Thanksgiving!" },
    { c: "fam", es: "No necesitamos un pavo para dar gracias: basta con estar juntos. Los quiero mucho.", en: "We don't need a turkey to give thanks: being together is enough. Love you all." },
    { c: "fam", es: "Doy gracias a Dios por la salud, por el pan de cada día y por la familia que me dio.", en: "I thank God for our health, our daily bread and the family He gave me." },
    { c: "ami", es: "Gracias por tu amistad este año, por las risas y por estar en los días duros. ¡Feliz Día de Acción de Gracias!", en: "Thank you for your friendship this year, for the laughs and for being there on hard days. Happy Thanksgiving!" },
    { c: "ami", es: "Los amigos son la familia que uno escoge. Hoy doy gracias por ti.", en: "Friends are the family we choose. Today I'm thankful for you." },
    { c: "tra", es: "Equipo: gracias por el esfuerzo, la puntualidad y las ganas de cada día. Lo que logramos este año es de todos.", en: "Team: thank you for the effort, the commitment and the energy every day. What we achieved this year belongs to all of us." },
    { c: "tra", es: "Hoy, Día de Acción de Gracias, quiero agradecerle a cada compañero por hacer que el trabajo valga la pena.", en: "On Thanksgiving Day I want to thank every colleague for making the work worthwhile." },
    { c: "cli", es: "Gracias por confiar en nosotros este año. Cada pedido suyo nos ayuda a crecer. ¡Feliz Día de Acción de Gracias!", en: "Thank you for trusting us this year. Every order helps us grow. Happy Thanksgiving!" },
    { c: "cli", es: "En este Día de Acción de Gracias queremos decirle algo sencillo: gracias por preferirnos. Seguimos a su servicio.", en: "This Thanksgiving we want to say something simple: thank you for choosing us. We remain at your service." }
  ];
  var CATS = { all: UI.all, fam: { es: "Familia", en: "Family" }, ami: { es: "Amigos", en: "Friends" }, tra: { es: "Equipo de trabajo", en: "Team" }, cli: { es: "Clientes", en: "Customers" } };
  var phraseCat = "all";

  /* ---------- Render ---------- */
  function applyUI() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { var k = el.getAttribute("data-i18n"); if (UI[k]) el.textContent = L(UI[k]); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { var k = el.getAttribute("data-i18n-ph"); if (UI[k]) el.placeholder = L(UI[k]); });
    $("#btnLang").textContent = lang === "es" ? "EN" : "ES";
    $("#promoWa").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(lang === "es" ? "Hola Harold, vi la app Gracias en Familia y quiero una app para mi negocio." : "Hi Harold, I saw the Thankful Together app and I'd like an app for my business.");
  }
  function renderToday() {
    var idea = pick(IDEAS), q = pick(QUESTIONS), w = pick(VOCAB);
    $("#ideaOfDay").innerHTML = '<span class="lbl">' + L(UI.idea) + '</span><h3>' + esc(L(idea)) + '</h3>';
    $("#questionOfDay").innerHTML = '<span class="lbl">' + L(UI.question) + '</span><h3>' + esc(L(q)) + '</h3>';
    $("#wordOfDay").innerHTML = '<span class="lbl">' + L(UI.word) + '</span><h3>' + esc(w[0]) + '</h3><p class="muted">' + esc(w[1]) + '</p>';
    $("#wordOfDay").onclick = function () { speak(w[0]); };
    [$("#ideaOfDay"), $("#questionOfDay"), $("#wordOfDay")].forEach(function (el) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; });
  }
  function renderTimeline() {
    var ol = $("#timeline"); ol.innerHTML = "";
    TIMELINE.forEach(function (it, i) {
      var li = document.createElement("li");
      li.innerHTML = '<div class="tl-year">' + it.y + '</div><div class="tl-body"><img loading="lazy" alt=""><div class="pad"><h3>' + esc(L(it.t)) + '</h3><p>' + esc(L(it.d)) + '</p></div><p class="credit"></p></div>';
      ol.appendChild(li);
      fillImg(li.querySelector("img"), li.querySelector(".credit"), it.q, 0);
    });
    observe(ol.querySelectorAll("li"));
  }
  function renderCustoms() {
    var box = $("#customs"); box.innerHTML = "";
    CUSTOMS.forEach(function (it) {
      var a = document.createElement("article"); a.className = "ccard";
      a.innerHTML = '<img loading="lazy" alt=""><div class="pad"><h3>' + esc(L(it.t)) + '</h3><p>' + esc(L(it.d)) + '</p></div><p class="credit"></p>';
      box.appendChild(a); fillImg(a.querySelector("img"), a.querySelector(".credit"), it.q, 0);
    });
  }
  function renderRecipes() {
    var box = $("#recipes"); box.innerHTML = "";
    RECIPES.forEach(function (r) {
      var a = document.createElement("article"); a.className = "recipe";
      var yt = "https://www.youtube.com/results?search_query=" + encodeURIComponent((lang === "es" ? "receta " : "recipe ") + L(r.t));
      a.innerHTML = '<img loading="lazy" alt=""><p class="credit"></p><div class="pad"><h3>' + esc(L(r.t)) + '</h3><div class="meta"><span>' + r.time + '</span><span>' + esc(L(r.serv)) + '</span></div>' +
        '<details><summary>' + L(UI.ingredients) + '</summary><ul>' + L(r.ing).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></details>' +
        '<details><summary>' + L(UI.steps) + '</summary><ol>' + L(r.st).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ol></details>' +
        '<a class="vid" target="_blank" rel="noopener" href="' + yt + '">' + L(UI.watch) + ' →</a></div>';
      box.appendChild(a); fillImg(a.querySelector("img"), a.querySelector(".credit"), r.q, 0);
    });
  }

  /* Muro */
  function wallItems() { return store.get("gf_wall", []); }
  function renderWall() {
    var items = wallItems(), box = $("#wall");
    $("#wallCount").textContent = items.length;
    if (!items.length) { box.innerHTML = '<p class="muted">' + L(UI.empty_wall) + '</p>'; return; }
    box.innerHTML = items.slice().reverse().map(function (it) {
      return '<div class="note-card" data-id="' + it.id + '"><p>' + esc(it.text) + '</p><div class="who">— ' + esc(it.name || (lang === "es" ? "Anónimo" : "Anonymous")) + '</div>' +
        '<div class="acts"><button data-act="wa">' + L(UI.send) + '</button><button data-act="del">' + L(UI.del) + '</button></div></div>';
    }).join("");
  }
  $("#wallForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var t = $("#wallText").value.trim(); if (!t) return;
    var items = wallItems(); items.push({ id: Date.now(), name: $("#wallName").value.trim(), text: t });
    store.set("gf_wall", items); store.set("gf_name", $("#wallName").value.trim());
    $("#wallText").value = ""; renderWall(); toast(L(UI.saved));
  });
  $("#wall").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var id = +b.closest(".note-card").dataset.id, items = wallItems(), it = items.filter(function (x) { return x.id === id; })[0];
    if (b.dataset.act === "del") { store.set("gf_wall", items.filter(function (x) { return x.id !== id; })); renderWall(); }
    else if (it) shareText("«" + it.text + "» — " + (it.name || "") + "\n\n" + appLine());
  });
  $("#wallShareAll").addEventListener("click", function () {
    var items = wallItems(); if (!items.length) return toast(L(UI.empty_wall));
    shareText((lang === "es" ? "Nuestro muro de gratitud:\n\n" : "Our gratitude wall:\n\n") + items.map(function (i) { return "• " + i.text + (i.name ? " — " + i.name : ""); }).join("\n") + "\n\n" + appLine());
  });

  /* Ronda en la mesa */
  var deck = [], asked = 0;
  $("#btnNextQ").addEventListener("click", function () {
    if (!deck.length) deck = QUESTIONS.slice().sort(function () { return Math.random() - .5; });
    var q = deck.pop(); asked++;
    var c = $("#rouletteCard"); c.classList.remove("flip"); void c.offsetWidth; c.classList.add("flip");
    setTimeout(function () { c.textContent = L(q); }, 270);
    $("#rouletteCount").textContent = (lang === "es" ? "Pregunta " : "Question ") + asked;
  });

  /* Tarjeta */
  var cardImg = null, cardSrcIdx = 0;
  function buildThumbs() {
    var box = $("#cardThumbs"); box.innerHTML = "";
    heroList.forEach(function (p, i) {
      var im = new Image(); im.src = p.src; im.alt = ""; if (i === cardSrcIdx) im.className = "sel";
      im.onclick = function () { cardSrcIdx = i; box.querySelectorAll("img").forEach(function (x) { x.classList.remove("sel"); }); im.classList.add("sel"); loadCardImg(p.src); };
      box.appendChild(im);
    });
    if (heroList[cardSrcIdx]) loadCardImg(heroList[cardSrcIdx].src); else drawCard();
  }
  function loadCardImg(src) {
    var im = new Image(); im.crossOrigin = "anonymous";
    im.onload = function () { cardImg = im; drawCard(); };
    im.onerror = function () { cardImg = null; drawCard(); };
    im.src = src;
  }
  $("#cardUpload").addEventListener("change", function (e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader(); r.onload = function () { var im = new Image(); im.onload = function () { cardImg = im; drawCard(); }; im.src = r.result; }; r.readAsDataURL(f);
  });
  ["#cardTo", "#cardMsg", "#cardFrom"].forEach(function (s) { $(s).addEventListener("input", drawCard); });
  function wrap(ctx, text, x, y, maxW, lh) {
    var words = text.split(" "), line = "", lines = [];
    words.forEach(function (w) { var t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
    if (line) lines.push(line);
    lines.forEach(function (l, i) { ctx.fillText(l, x, y + i * lh); });
    return lines.length;
  }
  function drawCard() {
    var c = $("#cardCanvas"), ctx = c.getContext("2d"), W = c.width, H = c.height;
    var g0 = ctx.createLinearGradient(0, 0, W, H); g0.addColorStop(0, "#7a2e12"); g0.addColorStop(1, "#e0a43a");
    ctx.fillStyle = g0; ctx.fillRect(0, 0, W, H);
    if (cardImg) { var s = Math.max(W / cardImg.width, H / cardImg.height), w = cardImg.width * s, h = cardImg.height * s; ctx.drawImage(cardImg, (W - w) / 2, (H - h) / 2, w, h); }
    var g = ctx.createLinearGradient(0, H * .25, 0, H); g.addColorStop(0, "rgba(40,15,5,0)"); g.addColorStop(1, "rgba(40,15,5,.92)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#e0a43a"; ctx.font = "800 44px 'Nunito Sans', sans-serif"; ctx.textAlign = "left";
    ctx.fillText((lang === "es" ? "Para: " : "To: ") + $("#cardTo").value, 80, H - 560);
    ctx.fillStyle = "#fff"; ctx.font = "800 92px Fraunces, Georgia, serif";
    ctx.fillText(lang === "es" ? "Gracias" : "Thank you", 80, H - 450);
    ctx.font = "600 50px 'Nunito Sans', sans-serif";
    wrap(ctx, $("#cardMsg").value, 80, H - 360, W - 160, 64);
    ctx.fillStyle = "#e0a43a"; ctx.font = "800 46px 'Nunito Sans', sans-serif";
    ctx.fillText("— " + $("#cardFrom").value, 80, H - 110);
    ctx.fillStyle = "rgba(255,255,255,.75)"; ctx.font = "600 26px 'Nunito Sans', sans-serif"; ctx.textAlign = "right";
    ctx.fillText((lang === "es" ? "Día de Acción de Gracias" : "Thanksgiving Day") + " · Vibras Positivas HM", W - 60, H - 46);
  }
  function cardBlob(cb) { try { $("#cardCanvas").toBlob(cb, "image/jpeg", .92); } catch (e) { cb(null); } }
  $("#btnCardDownload").addEventListener("click", function () {
    cardBlob(function (b) { if (!b) return toast("No se pudo crear la imagen"); var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "tarjeta-gracias.jpg"; a.click(); });
  });
  $("#btnCardShare").addEventListener("click", function () {
    cardBlob(function (b) {
      var f = b && new File([b], "tarjeta-gracias.jpg", { type: "image/jpeg" });
      if (f && navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], text: appLine() }).catch(function () {});
      else $("#btnCardDownload").click();
    });
  });

  /* Frases */
  function renderPhrases() {
    $("#phraseFilters").innerHTML = Object.keys(CATS).map(function (k) { return '<button data-c="' + k + '" class="' + (k === phraseCat ? "on" : "") + '">' + L(CATS[k]) + '</button>'; }).join("");
    $("#phrases").innerHTML = PHRASES.filter(function (p) { return phraseCat === "all" || p.c === phraseCat; }).map(function (p, i) {
      return '<div class="phrase"><p>' + esc(L(p)) + '</p><div class="row"><button data-i="' + PHRASES.indexOf(p) + '" data-a="copy">' + L(UI.copy) + '</button><button class="wa" data-i="' + PHRASES.indexOf(p) + '" data-a="wa">WhatsApp</button></div></div>';
    }).join("");
  }
  $("#phraseFilters").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; phraseCat = b.dataset.c; renderPhrases(); });
  $("#phrases").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return; var t = L(PHRASES[+b.dataset.i]);
    if (b.dataset.a === "copy") { (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { toast(L(UI.copied)); }).catch(function () {}); }
    else window.open("https://wa.me/?text=" + encodeURIComponent(t), "_blank");
  });

  /* Inglés */
  function speak(t) {
    try { var u = new SpeechSynthesisUtterance(t); u.lang = "en-US"; u.rate = .85; speechSynthesis.cancel(); speechSynthesis.speak(u); return u; } catch (e) { return null; }
  }
  function renderVocab() {
    $("#vocab").innerHTML = VOCAB.map(function (v, i) { return '<div class="word" data-i="' + i + '"><b>' + esc(v[0]) + '</b><i>' + esc(v[1]) + '</i></div>'; }).join("");
  }
  $("#vocab").addEventListener("click", function (e) {
    var w = e.target.closest(".word"); if (!w) return;
    w.classList.add("speaking"); var u = speak(VOCAB[+w.dataset.i][0]);
    setTimeout(function () { w.classList.remove("speaking"); }, 1400);
  });

  /* Utilidades */
  function appLine() { return (lang === "es" ? "Hecho con la app Gracias en Familia" : "Made with the Thankful Together app") + ": " + location.origin + location.pathname; }
  function shareText(t) {
    if (navigator.share) navigator.share({ text: t }).catch(function () {});
    else window.open("https://wa.me/?text=" + encodeURIComponent(t), "_blank");
  }
  function observe(nodes) {
    if (!("IntersectionObserver" in window)) { nodes.forEach(function (n) { n.classList.add("seen"); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("seen"); io.unobserve(en.target); } }); }, { threshold: .15 });
    nodes.forEach(function (n) { io.observe(n); });
  }
  // Pestaña activa según la sección visible
  (function () {
    var tabs = document.querySelectorAll(".tab"), map = {};
    tabs.forEach(function (t) { map[t.getAttribute("href").slice(1)] = t; });
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting && map[en.target.id]) { tabs.forEach(function (t) { t.classList.remove("active"); }); map[en.target.id].classList.add("active"); map[en.target.id].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); } });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  })();

  function renderAll() { applyUI(); tick(); renderToday(); renderTimeline(); renderCustoms(); renderRecipes(); renderWall(); renderPhrases(); renderVocab(); drawCard(); }

  $("#btnLang").addEventListener("click", function () { lang = lang === "es" ? "en" : "es"; store.set("gf_lang", lang); renderAll(); });
  $("#btnRefresh").addEventListener("click", function () {
    photoCache = {}; store.set("gf_photos", {}); heroIdx = 0; renderAll(); loadHero(); toast(L(UI.updated));
  });

  $("#wallName").value = store.get("gf_name", "");
  renderAll(); loadHero();
  setInterval(tick, 30000);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawCard);

  if ("serviceWorker" in navigator) window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
})();
