// Official brand domains (for favicon logos) and Simple Icons slugs (official brand marks).
// Key = brand name lowercased with non-alphanumerics removed. Lookup falls back word-by-word
// ("Apple MacBook" -> "applemacbook" -> "apple").
// Format: key: 'domain' or key: ['domain', 'simpleIconSlug']

type Meta = string | [string, string];

const M: Record<string, Meta> = {
  // Big consumer electronics
  samsung: ['samsung.com', 'samsung'], lg: ['lg.com', 'lg'], lgelectronics: ['lg.com', 'lg'], apple: ['apple.com', 'apple'], sony: ['sony.com', 'sony'],
  huawei: ['huawei.com', 'huawei'], xiaomi: ['mi.com', 'xiaomi'], oppo: ['oppo.com', 'oppo'], vivo: ['vivo.com', 'vivo'], honor: ['honor.com', 'honor'],
  google: ['google.com', 'google'], googlenest: ['store.google.com', 'googlenest'], motorola: ['motorola.com', 'motorola'], nokia: ['nokia.com', 'nokia'],
  oneplus: ['oneplus.com', 'oneplus'], realme: 'realme.com', tecno: 'tecno-mobile.com', infinix: 'infinixmobility.com', itel: 'itel-life.com', mobicel: 'mobicel.co.za',
  nothingphone: ['nothing.tech', 'nothing'], hisense: 'hisense.com', tcl: 'tcl.com', philips: ['philips.com', 'philips'], panasonic: ['panasonic.com', 'panasonic'],
  sharp: 'sharp.co.jp', toshiba: ['toshiba.com', 'toshiba'], hitachi: ['hitachi.com', 'hitachi'], jvc: 'jvc.com', sinotec: 'sinotec.co.za', telefunken: 'telefunken.com',
  skyworth: 'skyworth.com', changhong: 'changhong.com', konka: 'konka.com', haier: 'haier.com', akai: 'akai.com', blaupunkt: 'blaupunkt.com', vizio: 'vizio.com',
  // Computing
  hp: ['hp.com', 'hp'], dell: ['dell.com', 'dell'], lenovo: ['lenovo.com', 'lenovo'], asus: ['asus.com', 'asus'], acer: ['acer.com', 'acer'], msi: ['msi.com', 'msi'],
  microsoft: ['microsoft.com', 'microsoft'], mecer: 'mecer.co.za', alienware: 'alienware.com', aoc: 'aoc.com', benq: 'benq.com', viewsonic: 'viewsonic.com',
  gigabyte: ['gigabyte.com', 'gigabyte'], nvidia: ['nvidia.com', 'nvidia'], amd: ['amd.com', 'amd'], sapphire: 'sapphiretech.com', zotac: 'zotac.com', palit: 'palit.com',
  seagate: ['seagate.com', 'seagate'], westerndigital: ['westerndigital.com', 'westerndigital'], sandisk: ['sandisk.com', 'sandisk'], corsair: ['corsair.com', 'corsair'],
  logitech: ['logitech.com', 'logitech'], razer: ['razer.com', 'razer'], hyperx: 'hyperx.com', synology: ['synology.com', 'synology'], framework: 'frame.work',
  epson: ['epson.com', 'epson'], canon: ['canon.com', 'canon'], brother: ['brother.com', 'brother'], pantum: 'pantum.com', kyocera: ['kyocera.com', 'kyocera'],
  xerox: ['xerox.com', 'xerox'], lexmark: 'lexmark.com', fujitsu: ['fujitsu.com', 'fujitsu'], ricoh: ['ricoh.com', 'ricoh'], konicaminolta: 'konicaminolta.com',
  creality: 'creality.com', bambulab: ['bambulab.com', 'bambulab'], prusa: ['prusa3d.com', 'prusa'], elegoo: 'elegoo.com', anycubic: 'anycubic.com', flashforge: 'flashforge.com',
  amazon: ['amazon.com', 'amazon'], kobo: ['kobo.com', 'rakutenkobo'], pocketbook: 'pocketbook.ch', remarkable: 'remarkable.com', wacom: ['wacom.com', 'wacom'],
  // Gaming
  nintendo: ['nintendo.com', 'nintendo'], playstation: ['playstation.com', 'playstation'], xbox: ['xbox.com', 'xbox'], valve: ['valvesoftware.com', 'valve'],
  meta: ['meta.com', 'meta'], htc: ['htc.com', 'htc'], pico: 'picoxr.com', powera: 'powera.com', anbernic: 'anbernic.com', ayaneo: 'ayaneo.com',
  // Audio
  jbl: ['jbl.com', 'jbl'], bose: ['bose.com', 'bose'], sennheiser: ['sennheiser.com', 'sennheiser'], marshall: 'marshall.com', sonos: ['sonos.com', 'sonos'],
  yamaha: ['yamaha.com', 'yamahacorporation'], denon: 'denon.com', marantz: 'marantz.com', onkyo: 'onkyo.com', pioneer: ['pioneer.com', 'pioneer'], polkaudio: 'polkaudio.com',
  klipsch: 'klipsch.com', svs: 'svsound.com', shure: ['shure.com', 'shure'], rode: 'rode.com', audiotechnica: ['audio-technica.com', 'audiotechnica'], blue: 'bluemic.com',
  ultimateears: 'ultimateears.com', beats: ['beatsbydre.com', 'beatsbydre'], skullcandy: 'skullcandy.com', volkano: 'volkano.co.za', anker: ['anker.com', 'anker'],
  soundcore: ['soundcore.com', 'anker'], jabra: 'jabra.com', akg: 'akg.com', bangolufsen: 'bang-olufsen.com', harmankardon: 'harmankardon.com', edifier: 'edifier.com',
  sangean: 'sangean.com', roberts: 'robertsradio.com', tecsun: 'tecsun.com.cn', kef: 'kef.com', bowerswilkins: 'bowerswilkins.com', technics: 'technics.com',
  // TV / media
  dstv: 'dstv.com', multichoice: 'multichoice.com', openview: 'openview.co.za', starsat: 'starsat.co.za', telkomtv: 'telkom.co.za', sentech: 'sentech.co.za',
  roku: ['roku.com', 'roku'], epsonprojectors: 'epson.com', optoma: 'optoma.com', xgimi: 'xgimi.com',
  // Kitchen & home appliances
  defy: 'defy.co.za', kic: 'kic.co.za', bosch: ['bosch-home.com', 'bosch'], whirlpool: 'whirlpool.com', smeg: 'smeg.com', russellhobbs: 'russellhobbs.com',
  mellerware: 'mellerware.co.za', salton: 'salton.co.za', kenwood: 'kenwoodworld.com', kitchenaid: 'kitchenaid.com', delonghi: 'delonghi.com', nespresso: 'nespresso.com',
  breville: 'breville.com', krups: 'krups.com', dolcegusto: 'dolce-gusto.com', jura: 'jura.com', gaggia: 'gaggia.com', tefal: 'tefal.com', moulinex: 'moulinex.com',
  ninja: 'ninjakitchen.com', sharkninja: 'sharkninja.com', cosori: 'cosori.com', instantpot: 'instanthome.com', instantbrands: 'instanthome.com', crockpot: 'crock-pot.com',
  nutribullet: 'nutribullet.com', vitamix: 'vitamix.com', cuisinart: 'cuisinart.com', magimix: 'magimix.com', hurom: 'hurom.com', insinkerator: 'insinkerator.com',
  wasteking: 'wasteking.com', franke: 'franke.com', morphyrichards: 'morphyrichards.com', braun: 'braun.com', electrolux: 'electrolux.com', beko: 'beko.com',
  midea: 'midea.com', univa: 'univa.co.za', aquacool: 'aquacool.co.za', miele: 'miele.com', siemens: ['siemens-home.bsh-group.com', 'siemens'], liebherr: 'liebherr.com',
  frigidaire: 'frigidaire.com', geappliances: 'geappliances.com', maytag: 'maytag.com', hotpoint: 'hotpoint.co.uk', indesit: 'indesit.com', zojirushi: 'zojirushi.com',
  hamiltonbeach: 'hamiltonbeach.com', sunbeam: 'sunbeam.com', oster: 'oster.com', galanz: 'galanz.com', keurig: 'keurig.com', bialetti: 'bialetti.com', dualit: 'dualit.com',
  goldair: 'goldair.co.za', alva: 'alva.co.za', purepleasure: 'purepleasure.co.za', hotdot: 'hotdot.co.za', hunter: 'hunterfan.com', levoit: 'levoit.com', meaco: 'meaco.com',
  dyson: ['dyson.com', 'dyson'], karcher: 'kaercher.com', hoover: 'hoover.co.uk', shark: 'sharkclean.com', bissell: 'bissell.com', irobot: ['irobot.com', 'irobot'],
  roborock: 'roborock.com', ecovacs: 'ecovacs.com', dreame: 'dreametech.com', eufy: 'eufy.com', tineco: 'tineco.com',
  // Climate & water
  daikin: 'daikin.com', mitsubishielectric: 'mitsubishielectric.com', carrier: 'carrier.com', gree: 'gree.com', greeelectric: 'gree.com', alliance: 'alliance-aircon.co.za',
  kwikot: 'kwikot.co.za', heattech: 'heattech.co.za', ariston: 'ariston.com', gap: 'gapgeysers.co.za', solarmax: 'solarmax.co.za', geyserwise: 'geyserwise.com',
  itron: 'itron.co.za', ecoheat: 'ecoheat.co.za', atlantic: 'atlantic-comfort.com', hager: 'hager.com', honeywell: ['honeywell.com', 'honeywell'], ecobee: 'ecobee.com', tado: 'tado.com',
  // Networking & smart home
  tplink: ['tp-link.com', 'tplink'], netgear: ['netgear.com', 'netgear'], mikrotik: ['mikrotik.com', 'mikrotik'], ubiquiti: ['ui.com', 'ubiquiti'], zte: 'zte.com',
  mercusys: 'mercusys.com', tenda: 'tendacn.com', dlink: ['dlink.com', 'dlink'], linksys: 'linksys.com', avm: 'avm.de', sonoff: 'sonoff.tech', shelly: 'shelly.com',
  eurolux: 'eurolux.co.za', philipshue: ['philips-hue.com', 'philipshue'], govee: 'govee.com', lifx: 'lifx.com', ikea: ['ikea.com', 'ikea'], nanoleaf: 'nanoleaf.me',
  aqara: 'aqara.com', switchbot: 'switch-bot.com', yeelight: 'yeelight.com',
  // Power & backup
  sunsynk: 'sunsynk.com', deye: 'deyeinverter.com', victron: 'victronenergy.com', growatt: 'growatt.com', goodwe: 'goodwe.com', sma: 'sma.de', kodak: 'kodak.com',
  voltronicaxpert: 'voltronicpower.com', must: 'mustpower.com', fronius: 'fronius.com', solis: 'solisinverters.com', luxpower: 'luxpowertek.com', pylontech: 'pylontech.com.cn',
  hubblelithium: 'hubblelithium.co.za', dyness: 'dyness.com', freedomwon: 'freedomwon.co.za', byd: ['byd.com', 'byd'], revov: 'revov.co.za', shoto: 'shotopower.com',
  rct: 'rct.co.za', apc: 'apc.com', eaton: 'eaton.com', gizzu: 'gizzu.co.za', ellies: 'ellies.co.za', vertiv: 'vertiv.com', ecoflow: 'ecoflow.com', bluetti: 'bluettipower.com',
  jackery: 'jackery.com', romoss: 'romoss.com', baseus: 'baseus.com', noco: 'no.co', ctek: 'ctek.com', energizer: 'energizer.com', eveready: 'eveready.co.za',
  honda: ['honda.com', 'honda'], kipor: 'kipor.com', bennett: 'bennett.co.za', ingco: 'ingco.com', champion: 'championpowerequipment.com',
  // Security
  hikvision: 'hikvision.com', dahua: 'dahuasecurity.com', ezviz: 'ezviz.com', reolink: 'reolink.com', imou: 'imoulife.com', ring: ['ring.com', 'ring'], uniview: 'uniview.com',
  provisionisr: 'provision-isr.com', commax: 'commax.com', zartek: 'zartek.co.za', centurion: 'centsys.com', akuvox: 'akuvox.com', paradox: 'paradox.com', ids: 'ids.co.za',
  dsc: 'dsc.com', texecom: 'texe.com', ajax: 'ajax.systems', olarm: 'olarm.com', risco: 'riscogroup.com', nemtek: 'nemtek.com', jva: 'jva-fence.com', stafix: 'stafix.co.za',
  yale: 'yalehome.com', nuki: 'nuki.io', august: 'august.com', kidde: 'kidde.com', fireangel: 'fireangel.co.uk', xsense: 'x-sense.com', philipsavent: 'philips.com',
  vtech: 'vtech.com', nanit: 'nanit.com', owlet: 'owletcare.com', etnice: 'etnice.co.za', gemini: 'geminigates.co.za', digidoor: 'digidoor.co.za', hansa: 'hansa.co.za',
  nice: 'niceforyou.com', came: 'came.com', arlo: 'arlo.com', swann: 'swann.com', wyze: 'wyze.com', lorex: 'lorex.com', blink: 'blinkforhome.com',
  // Personal care
  ghd: 'ghdhair.com', remington: 'remington-europe.com', babyliss: 'babyliss.com', revlon: 'revlon.com', wahl: 'wahl.com', oralb: 'oralb.com', philipssonicare: 'philips.com',
  colgate: 'colgate.com', singer: 'singer.com', janome: 'janome.com', bernette: 'bernette.com', juki: 'juki.com',
  // Pool, water & garden
  dab: 'dabpumps.com', grundfos: 'grundfos.com', pedrollo: 'pedrollo.com', leo: 'leogroup.com', franklinelectric: 'franklin-electric.com', speck: 'speck-pumps.com',
  pentair: 'pentair.com', hayward: 'hayward.com', kreepykrauly: 'kreepykrauly.com', waterite: 'waterite.co.za', zodiac: 'zodiac.com', wolf: 'wolf-garten.com',
  mcculloch: 'mcculloch.com', gardena: 'gardena.com', husqvarna: 'husqvarna.com', nilfisk: 'nilfisk.com',
  // Tools
  makita: ['makita.com', 'makita'], dewalt: 'dewalt.com', ryobi: 'ryobitools.com', milwaukee: 'milwaukeetool.com', blackdecker: 'blackanddecker.com', stanley: 'stanleytools.com',
  festool: 'festool.com', metabo: 'metabo.com', triton: 'tritontools.com', steinel: 'steinel.de', fluke: 'fluke.com', unit: 'uni-trend.com', brymen: 'brymen.com',
  kleintools: 'kleintools.com', kaiweets: 'kaiweets.com', majortech: 'majortech.co.za', hakko: 'hakko.com', weller: 'weller-tools.com', pinecil: 'pine64.org',
  miniware: 'miniware.com.cn', quick: 'quick-global.com', yihua: 'yihua-soldering.com', rigol: 'rigol.com', siglent: 'siglent.com', owon: 'owon.com.hk', hantek: 'hantek.com',
  keysight: 'keysight.com', tektronix: 'tek.com', baofeng: 'baofengradio.com', hytera: 'hytera.com', icom: 'icomjapan.com', lincolnelectric: 'lincolnelectric.com',
  esab: 'esab.com', telwin: 'telwin.com', hilti: 'hilti.com', ridgid: 'ridgid.com',
  // Mobility & automotive
  segwayninebot: 'segway.com', segway: 'segway.com', apollo: 'apolloscooters.co', kaabo: 'kaabo.com', inokim: 'inokim.com', dualtron: 'minimotors.com', specialized: 'specialized.com',
  giant: 'giant-bicycles.com', trek: 'trekbikes.com', merida: 'merida-bikes.com', boschebike: 'bosch-ebike.com', shimano: ['shimano.com', 'shimano'], bafang: 'bafang-e.com',
  fiido: 'fiido.com', gyroor: 'gyroor.com', hover1: 'hover-1.com', swagtron: 'swagtron.com', jetson: 'ridejetson.com', denso: 'denso.com', continentalsiemens: 'continental.com',
  delphi: 'delphiautoparts.com', magnetimarelli: 'marelli.com', volkswagen: ['vw.com', 'volkswagen'], toyota: ['toyota.com', 'toyota'], ford: ['ford.com', 'ford'],
  garmin: ['garmin.com', 'garmin'], xiaomi70mai: '70mai.com', nextbase: 'nextbase.com', viofo: 'viofo.com', thinkware: 'thinkware.com', ddpai: 'ddpai.com',
  // Cameras & drones & wearables
  nikon: ['nikon.com', 'nikon'], fujifilm: ['fujifilm.com', 'fujifilm'], gopro: ['gopro.com', 'gopro'], dji: ['dji.com', 'dji'], autel: 'autelrobotics.com',
  potensic: 'potensic.com', holystone: 'holystone.com', ryze: 'ryzerobotics.com', insta360: 'insta360.com', leica: 'leica-camera.com', fitbit: ['fitbit.com', 'fitbit'],
  amazfit: 'amazfit.com', polar: 'polar.com', suunto: 'suunto.com', coros: 'coros.com', withings: 'withings.com',
};

export interface BrandMeta { domain?: string; simpleIconSlug?: string }

const norm = (s: string) => s.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '');

export function brandMetaFor(name: string): BrandMeta {
  const words = name.replace(/\(.*?\)/g, '').split(/[\s/+&,-]+/).filter(Boolean);
  for (let n = words.length; n >= 1; n--) {
    const key = norm(words.slice(0, n).join(''));
    const m = M[key];
    if (m) return typeof m === 'string' ? { domain: m } : { domain: m[0], simpleIconSlug: m[1] };
  }
  return {};
}
