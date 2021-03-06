const autoComplete = require('js-autocomplete')

const timezones = [
  { id: 'Pacific/Niue', value: '(GMT-11:00) Pacific/Niue' },
  { id: 'Pacific/Pago_Pago', value: '(GMT-11:00) Pacific/Pago_Pago' },
  { id: 'Pacific/Midway', value: '(GMT-11:00) Pacific/Midway' },
  { id: 'Pacific/Honolulu', value: '(GMT-10:00) Pacific/Honolulu' },
  { id: 'Pacific/Rarotonga', value: '(GMT-10:00) Pacific/Rarotonga' },
  { id: 'Pacific/Tahiti', value: '(GMT-10:00) Pacific/Tahiti' },
  { id: 'Pacific/Johnston', value: '(GMT-10:00) Pacific/Johnston' },
  { id: 'Pacific/Marquesas', value: '(GMT-09:30) Pacific/Marquesas' },
  { id: 'America/Adak', value: '(GMT-09:00) America/Adak' },
  { id: 'Pacific/Gambier', value: '(GMT-09:00) Pacific/Gambier' },
  { id: 'America/Sitka', value: '(GMT-08:00) America/Sitka' },
  { id: 'America/Juneau', value: '(GMT-08:00) America/Juneau' },
  { id: 'America/Metlakatla', value: '(GMT-08:00) America/Metlakatla' },
  { id: 'America/Nome', value: '(GMT-08:00) America/Nome' },
  { id: 'America/Anchorage', value: '(GMT-08:00) America/Anchorage' },
  { id: 'America/Yakutat', value: '(GMT-08:00) America/Yakutat' },
  { id: 'Pacific/Pitcairn', value: '(GMT-08:00) Pacific/Pitcairn' },
  { id: 'America/Whitehorse', value: '(GMT-07:00) America/Whitehorse' },
  { id: 'America/Dawson', value: '(GMT-07:00) America/Dawson' },
  { id: 'America/Santa_Isabel', value: '(GMT-07:00) America/Santa_Isabel' },
  { id: 'America/Los_Angeles', value: '(GMT-07:00) America/Los_Angeles' },
  { id: 'America/Vancouver', value: '(GMT-07:00) America/Vancouver' },
  { id: 'America/Tijuana', value: '(GMT-07:00) America/Tijuana' },
  { id: 'America/Creston', value: '(GMT-07:00) America/Creston' },
  { id: 'America/Phoenix', value: '(GMT-07:00) America/Phoenix' },
  { id: 'America/Hermosillo', value: '(GMT-07:00) America/Hermosillo' },
  { id: 'America/Fort_Nelson', value: '(GMT-07:00) America/Fort_Nelson' },
  { id: 'America/Dawson_Creek', value: '(GMT-07:00) America/Dawson_Creek' },
  { id: 'America/Boise', value: '(GMT-06:00) America/Boise' },
  { id: 'America/Cambridge_Bay', value: '(GMT-06:00) America/Cambridge_Bay' },
  { id: 'America/Yellowknife', value: '(GMT-06:00) America/Yellowknife' },
  { id: 'America/Tegucigalpa', value: '(GMT-06:00) America/Tegucigalpa' },
  { id: 'America/Mazatlan', value: '(GMT-06:00) America/Mazatlan' },
  { id: 'America/Managua', value: '(GMT-06:00) America/Managua' },
  { id: 'America/Inuvik', value: '(GMT-06:00) America/Inuvik' },
  { id: 'America/Belize', value: '(GMT-06:00) America/Belize' },
  { id: 'America/Ojinaga', value: '(GMT-06:00) America/Ojinaga' },
  { id: 'America/Costa_Rica', value: '(GMT-06:00) America/Costa_Rica' },
  { id: 'America/Denver', value: '(GMT-06:00) America/Denver' },
  { id: 'America/El_Salvador', value: '(GMT-06:00) America/El_Salvador' },
  { id: 'America/Edmonton', value: '(GMT-06:00) America/Edmonton' },
  { id: 'Pacific/Galapagos', value: '(GMT-06:00) Pacific/Galapagos' },
  { id: 'America/Regina', value: '(GMT-06:00) America/Regina' },
  { id: 'America/Swift_Current', value: '(GMT-06:00) America/Swift_Current' },
  { id: 'America/Chihuahua', value: '(GMT-06:00) America/Chihuahua' },
  { id: 'America/Guatemala', value: '(GMT-06:00) America/Guatemala' },
  { id: 'America/Lima', value: '(GMT-05:00) America/Lima' },
  { id: 'America/Guayaquil', value: '(GMT-05:00) America/Guayaquil' },
  { id: 'America/Atikokan', value: '(GMT-05:00) America/Atikokan' },
  { id: 'America/Eirunepe', value: '(GMT-05:00) America/Eirunepe' },
  { id: 'America/Indiana/Knox', value: '(GMT-05:00) America/Indiana/Knox' },
  { id: 'America/Menominee', value: '(GMT-05:00) America/Menominee' },
  { id: 'America/Cancun', value: '(GMT-05:00) America/Cancun' },
  {
    id: 'America/Indiana/Tell_City',
    value: '(GMT-05:00) America/Indiana/Tell_City'
  },
  { id: 'America/Bogota', value: '(GMT-05:00) America/Bogota' },
  { id: 'America/Chicago', value: '(GMT-05:00) America/Chicago' },
  { id: 'America/Jamaica', value: '(GMT-05:00) America/Jamaica' },
  { id: 'America/Bahia_Banderas', value: '(GMT-05:00) America/Bahia_Banderas' },
  { id: 'America/Matamoros', value: '(GMT-05:00) America/Matamoros' },
  { id: 'America/Panama', value: '(GMT-05:00) America/Panama' },
  { id: 'America/Winnipeg', value: '(GMT-05:00) America/Winnipeg' },
  { id: 'Pacific/Easter', value: '(GMT-05:00) Pacific/Easter' },
  {
    id: 'America/North_Dakota/New_Salem',
    value: '(GMT-05:00) America/North_Dakota/New_Salem'
  },
  {
    id: 'America/North_Dakota/Center',
    value: '(GMT-05:00) America/North_Dakota/Center'
  },
  { id: 'America/Rio_Branco', value: '(GMT-05:00) America/Rio_Branco' },
  { id: 'America/Resolute', value: '(GMT-05:00) America/Resolute' },
  { id: 'America/Merida', value: '(GMT-05:00) America/Merida' },
  { id: 'America/Rankin_Inlet', value: '(GMT-05:00) America/Rankin_Inlet' },
  { id: 'America/Rainy_River', value: '(GMT-05:00) America/Rainy_River' },
  {
    id: 'America/North_Dakota/Beulah',
    value: '(GMT-05:00) America/North_Dakota/Beulah'
  },
  { id: 'America/Mexico_City', value: '(GMT-05:00) America/Mexico_City' },
  { id: 'America/Monterrey', value: '(GMT-05:00) America/Monterrey' },
  { id: 'America/Caracas', value: '(GMT-04:30) America/Caracas' },
  { id: 'America/Indiana/Vevay', value: '(GMT-04:00) America/Indiana/Vevay' },
  {
    id: 'America/Indiana/Marengo',
    value: '(GMT-04:00) America/Indiana/Marengo'
  },
  { id: 'America/St_Kitts', value: '(GMT-04:00) America/St_Kitts' },
  { id: 'America/Havana', value: '(GMT-04:00) America/Havana' },
  { id: 'America/St_Thomas', value: '(GMT-04:00) America/St_Thomas' },
  { id: 'America/Guyana', value: '(GMT-04:00) America/Guyana' },
  { id: 'America/St_Vincent', value: '(GMT-04:00) America/St_Vincent' },
  { id: 'America/Thunder_Bay', value: '(GMT-04:00) America/Thunder_Bay' },
  { id: 'America/St_Lucia', value: '(GMT-04:00) America/St_Lucia' },
  { id: 'America/Toronto', value: '(GMT-04:00) America/Toronto' },
  { id: 'America/St_Barthelemy', value: '(GMT-04:00) America/St_Barthelemy' },
  { id: 'America/Puerto_Rico', value: '(GMT-04:00) America/Puerto_Rico' },
  {
    id: 'America/Indiana/Indianapolis',
    value: '(GMT-04:00) America/Indiana/Indianapolis'
  },
  { id: 'America/Tortola', value: '(GMT-04:00) America/Tortola' },
  { id: 'America/Santo_Domingo', value: '(GMT-04:00) America/Santo_Domingo' },
  { id: 'America/Port_of_Spain', value: '(GMT-04:00) America/Port_of_Spain' },
  { id: 'America/Guadeloupe', value: '(GMT-04:00) America/Guadeloupe' },
  { id: 'America/La_Paz', value: '(GMT-04:00) America/La_Paz' },
  { id: 'America/Kralendijk', value: '(GMT-04:00) America/Kralendijk' },
  { id: 'America/Lower_Princes', value: '(GMT-04:00) America/Lower_Princes' },
  { id: 'America/Montserrat', value: '(GMT-04:00) America/Montserrat' },
  { id: 'America/Martinique', value: '(GMT-04:00) America/Martinique' },
  { id: 'America/Marigot', value: '(GMT-04:00) America/Marigot' },
  { id: 'America/Manaus', value: '(GMT-04:00) America/Manaus' },
  { id: 'America/Nassau', value: '(GMT-04:00) America/Nassau' },
  {
    id: 'America/Kentucky/Monticello',
    value: '(GMT-04:00) America/Kentucky/Monticello'
  },
  { id: 'America/Port-au-Prince', value: '(GMT-04:00) America/Port-au-Prince' },
  {
    id: 'America/Indiana/Winamac',
    value: '(GMT-04:00) America/Indiana/Winamac'
  },
  {
    id: 'America/Indiana/Vincennes',
    value: '(GMT-04:00) America/Indiana/Vincennes'
  },
  { id: 'America/Pangnirtung', value: '(GMT-04:00) America/Pangnirtung' },
  { id: 'America/Iqaluit', value: '(GMT-04:00) America/Iqaluit' },
  { id: 'America/New_York', value: '(GMT-04:00) America/New_York' },
  {
    id: 'America/Kentucky/Louisville',
    value: '(GMT-04:00) America/Kentucky/Louisville'
  },
  { id: 'America/Nipigon', value: '(GMT-04:00) America/Nipigon' },
  { id: 'America/Porto_Velho', value: '(GMT-04:00) America/Porto_Velho' },
  {
    id: 'America/Indiana/Petersburg',
    value: '(GMT-04:00) America/Indiana/Petersburg'
  },
  { id: 'America/Blanc-Sablon', value: '(GMT-04:00) America/Blanc-Sablon' },
  { id: 'America/Boa_Vista', value: '(GMT-04:00) America/Boa_Vista' },
  { id: 'America/Cayman', value: '(GMT-04:00) America/Cayman' },
  { id: 'America/Cuiaba', value: '(GMT-04:00) America/Cuiaba' },
  { id: 'America/Barbados', value: '(GMT-04:00) America/Barbados' },
  { id: 'America/Anguilla', value: '(GMT-04:00) America/Anguilla' },
  { id: 'America/Antigua', value: '(GMT-04:00) America/Antigua' },
  { id: 'America/Aruba', value: '(GMT-04:00) America/Aruba' },
  { id: 'America/Asuncion', value: '(GMT-04:00) America/Asuncion' },
  { id: 'America/Curacao', value: '(GMT-04:00) America/Curacao' },
  { id: 'America/Campo_Grande', value: '(GMT-04:00) America/Campo_Grande' },
  { id: 'America/Grenada', value: '(GMT-04:00) America/Grenada' },
  { id: 'America/Grand_Turk', value: '(GMT-04:00) America/Grand_Turk' },
  { id: 'America/Dominica', value: '(GMT-04:00) America/Dominica' },
  { id: 'America/Detroit', value: '(GMT-04:00) America/Detroit' },
  { id: 'America/Moncton', value: '(GMT-03:00) America/Moncton' },
  { id: 'America/Santarem', value: '(GMT-03:00) America/Santarem' },
  { id: 'America/Araguaina', value: '(GMT-03:00) America/Araguaina' },
  {
    id: 'America/Argentina/Buenos_Aires',
    value: '(GMT-03:00) America/Argentina/Buenos_Aires'
  },
  {
    id: 'America/Argentina/Catamarca',
    value: '(GMT-03:00) America/Argentina/Catamarca'
  },
  { id: 'America/Montevideo', value: '(GMT-03:00) America/Montevideo' },
  {
    id: 'America/Argentina/Cordoba',
    value: '(GMT-03:00) America/Argentina/Cordoba'
  },
  { id: 'America/Sao_Paulo', value: '(GMT-03:00) America/Sao_Paulo' },
  {
    id: 'America/Argentina/La_Rioja',
    value: '(GMT-03:00) America/Argentina/La_Rioja'
  },
  { id: 'Antarctica/Rothera', value: '(GMT-03:00) Antarctica/Rothera' },
  { id: 'America/Paramaribo', value: '(GMT-03:00) America/Paramaribo' },
  { id: 'America/Thule', value: '(GMT-03:00) America/Thule' },
  { id: 'Atlantic/Stanley', value: '(GMT-03:00) Atlantic/Stanley' },
  { id: 'Antarctica/Palmer', value: '(GMT-03:00) Antarctica/Palmer' },
  { id: 'America/Recife', value: '(GMT-03:00) America/Recife' },
  { id: 'America/Santiago', value: '(GMT-03:00) America/Santiago' },
  {
    id: 'America/Argentina/Jujuy',
    value: '(GMT-03:00) America/Argentina/Jujuy'
  },
  { id: 'Atlantic/Bermuda', value: '(GMT-03:00) Atlantic/Bermuda' },
  {
    id: 'America/Argentina/Mendoza',
    value: '(GMT-03:00) America/Argentina/Mendoza'
  },
  { id: 'America/Belem', value: '(GMT-03:00) America/Belem' },
  { id: 'America/Fortaleza', value: '(GMT-03:00) America/Fortaleza' },
  { id: 'America/Glace_Bay', value: '(GMT-03:00) America/Glace_Bay' },
  { id: 'America/Goose_Bay', value: '(GMT-03:00) America/Goose_Bay' },
  { id: 'America/Halifax', value: '(GMT-03:00) America/Halifax' },
  { id: 'America/Bahia', value: '(GMT-03:00) America/Bahia' },
  { id: 'America/Cayenne', value: '(GMT-03:00) America/Cayenne' },
  {
    id: 'America/Argentina/San_Juan',
    value: '(GMT-03:00) America/Argentina/San_Juan'
  },
  {
    id: 'America/Argentina/San_Luis',
    value: '(GMT-03:00) America/Argentina/San_Luis'
  },
  { id: 'America/Maceio', value: '(GMT-03:00) America/Maceio' },
  {
    id: 'America/Argentina/Ushuaia',
    value: '(GMT-03:00) America/Argentina/Ushuaia'
  },
  {
    id: 'America/Argentina/Tucuman',
    value: '(GMT-03:00) America/Argentina/Tucuman'
  },
  {
    id: 'America/Argentina/Salta',
    value: '(GMT-03:00) America/Argentina/Salta'
  },
  {
    id: 'America/Argentina/Rio_Gallegos',
    value: '(GMT-03:00) America/Argentina/Rio_Gallegos'
  },
  { id: 'America/St_Johns', value: '(GMT-02:30) America/St_Johns' },
  { id: 'America/Godthab', value: '(GMT-02:00) America/Godthab' },
  { id: 'America/Miquelon', value: '(GMT-02:00) America/Miquelon' },
  { id: 'America/Noronha', value: '(GMT-02:00) America/Noronha' },
  { id: 'Atlantic/South_Georgia', value: '(GMT-02:00) Atlantic/South_Georgia' },
  { id: 'Atlantic/Cape_Verde', value: '(GMT-01:00) Atlantic/Cape_Verde' },
  { id: 'Africa/Abidjan', value: '(GMT+00:00) Africa/Abidjan' },
  { id: 'Atlantic/St_Helena', value: '(GMT+00:00) Atlantic/St_Helena' },
  { id: 'Atlantic/Reykjavik', value: '(GMT+00:00) Atlantic/Reykjavik' },
  { id: 'Africa/Freetown', value: '(GMT+00:00) Africa/Freetown' },
  { id: 'America/Scoresbysund', value: '(GMT+00:00) America/Scoresbysund' },
  { id: 'Africa/Dakar', value: '(GMT+00:00) Africa/Dakar' },
  { id: 'Africa/Accra', value: '(GMT+00:00) Africa/Accra' },
  { id: 'Africa/Bamako', value: '(GMT+00:00) Africa/Bamako' },
  { id: 'Africa/Banjul', value: '(GMT+00:00) Africa/Banjul' },
  { id: 'Africa/Bissau', value: '(GMT+00:00) Africa/Bissau' },
  { id: 'Africa/Conakry', value: '(GMT+00:00) Africa/Conakry' },
  { id: 'UTC', value: '(GMT+00:00) UTC' },
  { id: 'Africa/Lome', value: '(GMT+00:00) Africa/Lome' },
  { id: 'Africa/Monrovia', value: '(GMT+00:00) Africa/Monrovia' },
  { id: 'Atlantic/Azores', value: '(GMT+00:00) Atlantic/Azores' },
  { id: 'Africa/Ouagadougou', value: '(GMT+00:00) Africa/Ouagadougou' },
  { id: 'America/Danmarkshavn', value: '(GMT+00:00) America/Danmarkshavn' },
  { id: 'Africa/Nouakchott', value: '(GMT+00:00) Africa/Nouakchott' },
  { id: 'Africa/Sao_Tome', value: '(GMT+00:00) Africa/Sao_Tome' },
  { id: 'Africa/Niamey', value: '(GMT+01:00) Africa/Niamey' },
  { id: 'Europe/Guernsey', value: '(GMT+01:00) Europe/Guernsey' },
  { id: 'Africa/Bangui', value: '(GMT+01:00) Africa/Bangui' },
  { id: 'Africa/Ndjamena', value: '(GMT+01:00) Africa/Ndjamena' },
  { id: 'Africa/Porto-Novo', value: '(GMT+01:00) Africa/Porto-Novo' },
  { id: 'Europe/Jersey', value: '(GMT+01:00) Europe/Jersey' },
  { id: 'Europe/Isle_of_Man', value: '(GMT+01:00) Europe/Isle_of_Man' },
  { id: 'Europe/Lisbon', value: '(GMT+01:00) Europe/Lisbon' },
  { id: 'Europe/Dublin', value: '(GMT+01:00) Europe/Dublin' },
  { id: 'Europe/London', value: '(GMT+01:00) Europe/London' },
  { id: 'Africa/Libreville', value: '(GMT+01:00) Africa/Libreville' },
  { id: 'Africa/Algiers', value: '(GMT+01:00) Africa/Algiers' },
  { id: 'Atlantic/Faroe', value: '(GMT+01:00) Atlantic/Faroe' },
  { id: 'Africa/Malabo', value: '(GMT+01:00) Africa/Malabo' },
  { id: 'Africa/El_Aaiun', value: '(GMT+01:00) Africa/El_Aaiun' },
  { id: 'Atlantic/Canary', value: '(GMT+01:00) Atlantic/Canary' },
  { id: 'Africa/Kinshasa', value: '(GMT+01:00) Africa/Kinshasa' },
  { id: 'Africa/Lagos', value: '(GMT+01:00) Africa/Lagos' },
  { id: 'Africa/Luanda', value: '(GMT+01:00) Africa/Luanda' },
  { id: 'Africa/Douala', value: '(GMT+01:00) Africa/Douala' },
  { id: 'Atlantic/Madeira', value: '(GMT+01:00) Atlantic/Madeira' },
  { id: 'Africa/Tunis', value: '(GMT+01:00) Africa/Tunis' },
  { id: 'Africa/Windhoek', value: '(GMT+01:00) Africa/Windhoek' },
  { id: 'Africa/Casablanca', value: '(GMT+01:00) Africa/Casablanca' },
  { id: 'Africa/Brazzaville', value: '(GMT+01:00) Africa/Brazzaville' },
  { id: 'Europe/Amsterdam', value: '(GMT+02:00) Europe/Amsterdam' },
  { id: 'Europe/Gibraltar', value: '(GMT+02:00) Europe/Gibraltar' },
  { id: 'Europe/Copenhagen', value: '(GMT+02:00) Europe/Copenhagen' },
  { id: 'Europe/Busingen', value: '(GMT+02:00) Europe/Busingen' },
  { id: 'Europe/Sarajevo', value: '(GMT+02:00) Europe/Sarajevo' },
  { id: 'Europe/Brussels', value: '(GMT+02:00) Europe/Brussels' },
  { id: 'Europe/Berlin', value: '(GMT+02:00) Europe/Berlin' },
  { id: 'Europe/Belgrade', value: '(GMT+02:00) Europe/Belgrade' },
  { id: 'Europe/Budapest', value: '(GMT+02:00) Europe/Budapest' },
  { id: 'Europe/Andorra', value: '(GMT+02:00) Europe/Andorra' },
  { id: 'Europe/Bratislava', value: '(GMT+02:00) Europe/Bratislava' },
  { id: 'Europe/Monaco', value: '(GMT+02:00) Europe/Monaco' },
  { id: 'Europe/Vaduz', value: '(GMT+02:00) Europe/Vaduz' },
  { id: 'Europe/Tirane', value: '(GMT+02:00) Europe/Tirane' },
  { id: 'Europe/Stockholm', value: '(GMT+02:00) Europe/Stockholm' },
  { id: 'Europe/Skopje', value: '(GMT+02:00) Europe/Skopje' },
  { id: 'Europe/Vatican', value: '(GMT+02:00) Europe/Vatican' },
  { id: 'Europe/Zurich', value: '(GMT+02:00) Europe/Zurich' },
  { id: 'Europe/Warsaw', value: '(GMT+02:00) Europe/Warsaw' },
  { id: 'Europe/Zagreb', value: '(GMT+02:00) Europe/Zagreb' },
  { id: 'Europe/Vienna', value: '(GMT+02:00) Europe/Vienna' },
  { id: 'Europe/San_Marino', value: '(GMT+02:00) Europe/San_Marino' },
  { id: 'Europe/Rome', value: '(GMT+02:00) Europe/Rome' },
  { id: 'Europe/Madrid', value: '(GMT+02:00) Europe/Madrid' },
  { id: 'Europe/Luxembourg', value: '(GMT+02:00) Europe/Luxembourg' },
  { id: 'Europe/Ljubljana', value: '(GMT+02:00) Europe/Ljubljana' },
  { id: 'Europe/Malta', value: '(GMT+02:00) Europe/Malta' },
  { id: 'Europe/Oslo', value: '(GMT+02:00) Europe/Oslo' },
  { id: 'Europe/Prague', value: '(GMT+02:00) Europe/Prague' },
  { id: 'Europe/Podgorica', value: '(GMT+02:00) Europe/Podgorica' },
  { id: 'Europe/Paris', value: '(GMT+02:00) Europe/Paris' },
  { id: 'Europe/Kaliningrad', value: '(GMT+02:00) Europe/Kaliningrad' },
  { id: 'Antarctica/Troll', value: '(GMT+02:00) Antarctica/Troll' },
  { id: 'Africa/Lubumbashi', value: '(GMT+02:00) Africa/Lubumbashi' },
  { id: 'Africa/Kigali', value: '(GMT+02:00) Africa/Kigali' },
  { id: 'Africa/Johannesburg', value: '(GMT+02:00) Africa/Johannesburg' },
  { id: 'Africa/Lusaka', value: '(GMT+02:00) Africa/Lusaka' },
  { id: 'Africa/Maputo', value: '(GMT+02:00) Africa/Maputo' },
  { id: 'Arctic/Longyearbyen', value: '(GMT+02:00) Arctic/Longyearbyen' },
  { id: 'Africa/Tripoli', value: '(GMT+02:00) Africa/Tripoli' },
  { id: 'Africa/Mbabane', value: '(GMT+02:00) Africa/Mbabane' },
  { id: 'Africa/Harare', value: '(GMT+02:00) Africa/Harare' },
  { id: 'Africa/Maseru', value: '(GMT+02:00) Africa/Maseru' },
  { id: 'Africa/Blantyre', value: '(GMT+02:00) Africa/Blantyre' },
  { id: 'Africa/Bujumbura', value: '(GMT+02:00) Africa/Bujumbura' },
  { id: 'Africa/Gaborone', value: '(GMT+02:00) Africa/Gaborone' },
  { id: 'Africa/Cairo', value: '(GMT+02:00) Africa/Cairo' },
  { id: 'Africa/Ceuta', value: '(GMT+02:00) Africa/Ceuta' },
  { id: 'Africa/Addis_Ababa', value: '(GMT+03:00) Africa/Addis_Ababa' },
  { id: 'Asia/Aden', value: '(GMT+03:00) Asia/Aden' },
  { id: 'Europe/Mariehamn', value: '(GMT+03:00) Europe/Mariehamn' },
  { id: 'Europe/Moscow', value: '(GMT+03:00) Europe/Moscow' },
  { id: 'Antarctica/Syowa', value: '(GMT+03:00) Antarctica/Syowa' },
  { id: 'Europe/Minsk', value: '(GMT+03:00) Europe/Minsk' },
  { id: 'Asia/Amman', value: '(GMT+03:00) Asia/Amman' },
  { id: 'Europe/Kiev', value: '(GMT+03:00) Europe/Kiev' },
  { id: 'Europe/Bucharest', value: '(GMT+03:00) Europe/Bucharest' },
  { id: 'Europe/Athens', value: '(GMT+03:00) Europe/Athens' },
  { id: 'Asia/Damascus', value: '(GMT+03:00) Asia/Damascus' },
  { id: 'Asia/Gaza', value: '(GMT+03:00) Asia/Gaza' },
  { id: 'Asia/Beirut', value: '(GMT+03:00) Asia/Beirut' },
  { id: 'Europe/Chisinau', value: '(GMT+03:00) Europe/Chisinau' },
  { id: 'Europe/Helsinki', value: '(GMT+03:00) Europe/Helsinki' },
  { id: 'Asia/Baghdad', value: '(GMT+03:00) Asia/Baghdad' },
  { id: 'Asia/Bahrain', value: '(GMT+03:00) Asia/Bahrain' },
  { id: 'Europe/Riga', value: '(GMT+03:00) Europe/Riga' },
  { id: 'Europe/Sofia', value: '(GMT+03:00) Europe/Sofia' },
  { id: 'Indian/Antananarivo', value: '(GMT+03:00) Indian/Antananarivo' },
  { id: 'Africa/Khartoum', value: '(GMT+03:00) Africa/Khartoum' },
  { id: 'Europe/Zaporozhye', value: '(GMT+03:00) Europe/Zaporozhye' },
  { id: 'Indian/Comoro', value: '(GMT+03:00) Indian/Comoro' },
  { id: 'Indian/Mayotte', value: '(GMT+03:00) Indian/Mayotte' },
  { id: 'Africa/Djibouti', value: '(GMT+03:00) Africa/Djibouti' },
  { id: 'Africa/Juba', value: '(GMT+03:00) Africa/Juba' },
  { id: 'Africa/Kampala', value: '(GMT+03:00) Africa/Kampala' },
  { id: 'Africa/Dar_es_Salaam', value: '(GMT+03:00) Africa/Dar_es_Salaam' },
  { id: 'Europe/Volgograd', value: '(GMT+03:00) Europe/Volgograd' },
  { id: 'Africa/Mogadishu', value: '(GMT+03:00) Africa/Mogadishu' },
  { id: 'Africa/Nairobi', value: '(GMT+03:00) Africa/Nairobi' },
  { id: 'Europe/Simferopol', value: '(GMT+03:00) Europe/Simferopol' },
  { id: 'Europe/Tallinn', value: '(GMT+03:00) Europe/Tallinn' },
  { id: 'Europe/Uzhgorod', value: '(GMT+03:00) Europe/Uzhgorod' },
  { id: 'Europe/Vilnius', value: '(GMT+03:00) Europe/Vilnius' },
  { id: 'Asia/Hebron', value: '(GMT+03:00) Asia/Hebron' },
  { id: 'Africa/Asmara', value: '(GMT+03:00) Africa/Asmara' },
  { id: 'Europe/Istanbul', value: '(GMT+03:00) Europe/Istanbul' },
  { id: 'Asia/Nicosia', value: '(GMT+03:00) Asia/Nicosia' },
  { id: 'Asia/Kuwait', value: '(GMT+03:00) Asia/Kuwait' },
  { id: 'Asia/Jerusalem', value: '(GMT+03:00) Asia/Jerusalem' },
  { id: 'Asia/Qatar', value: '(GMT+03:00) Asia/Qatar' },
  { id: 'Asia/Riyadh', value: '(GMT+03:00) Asia/Riyadh' },
  { id: 'Asia/Tbilisi', value: '(GMT+04:00) Asia/Tbilisi' },
  { id: 'Indian/Mahe', value: '(GMT+04:00) Indian/Mahe' },
  { id: 'Asia/Dubai', value: '(GMT+04:00) Asia/Dubai' },
  { id: 'Europe/Samara', value: '(GMT+04:00) Europe/Samara' },
  { id: 'Asia/Yerevan', value: '(GMT+04:00) Asia/Yerevan' },
  { id: 'Indian/Mauritius', value: '(GMT+04:00) Indian/Mauritius' },
  { id: 'Asia/Muscat', value: '(GMT+04:00) Asia/Muscat' },
  { id: 'Indian/Reunion', value: '(GMT+04:00) Indian/Reunion' },
  { id: 'Asia/Tehran', value: '(GMT+04:30) Asia/Tehran' },
  { id: 'Asia/Kabul', value: '(GMT+04:30) Asia/Kabul' },
  { id: 'Asia/Samarkand', value: '(GMT+05:00) Asia/Samarkand' },
  { id: 'Asia/Aqtau', value: '(GMT+05:00) Asia/Aqtau' },
  { id: 'Asia/Yekaterinburg', value: '(GMT+05:00) Asia/Yekaterinburg' },
  { id: 'Asia/Karachi', value: '(GMT+05:00) Asia/Karachi' },
  { id: 'Asia/Aqtobe', value: '(GMT+05:00) Asia/Aqtobe' },
  { id: 'Antarctica/Mawson', value: '(GMT+05:00) Antarctica/Mawson' },
  { id: 'Asia/Baku', value: '(GMT+05:00) Asia/Baku' },
  { id: 'Asia/Ashgabat', value: '(GMT+05:00) Asia/Ashgabat' },
  { id: 'Indian/Kerguelen', value: '(GMT+05:00) Indian/Kerguelen' },
  { id: 'Asia/Tashkent', value: '(GMT+05:00) Asia/Tashkent' },
  { id: 'Asia/Dushanbe', value: '(GMT+05:00) Asia/Dushanbe' },
  { id: 'Indian/Maldives', value: '(GMT+05:00) Indian/Maldives' },
  { id: 'Asia/Oral', value: '(GMT+05:00) Asia/Oral' },
  { id: 'Asia/Colombo', value: '(GMT+05:30) Asia/Colombo' },
  { id: 'Asia/Kolkata', value: '(GMT+05:30) Asia/Kolkata' },
  { id: 'Asia/Kathmandu', value: '(GMT+05:45) Asia/Kathmandu' },
  { id: 'Asia/Almaty', value: '(GMT+06:00) Asia/Almaty' },
  { id: 'Indian/Chagos', value: '(GMT+06:00) Indian/Chagos' },
  { id: 'Asia/Thimphu', value: '(GMT+06:00) Asia/Thimphu' },
  { id: 'Asia/Omsk', value: '(GMT+06:00) Asia/Omsk' },
  { id: 'Asia/Novosibirsk', value: '(GMT+06:00) Asia/Novosibirsk' },
  { id: 'Antarctica/Vostok', value: '(GMT+06:00) Antarctica/Vostok' },
  { id: 'Asia/Urumqi', value: '(GMT+06:00) Asia/Urumqi' },
  { id: 'Asia/Qyzylorda', value: '(GMT+06:00) Asia/Qyzylorda' },
  { id: 'Asia/Bishkek', value: '(GMT+06:00) Asia/Bishkek' },
  { id: 'Asia/Dhaka', value: '(GMT+06:00) Asia/Dhaka' },
  { id: 'Indian/Cocos', value: '(GMT+06:30) Indian/Cocos' },
  { id: 'Asia/Rangoon', value: '(GMT+06:30) Asia/Rangoon' },
  { id: 'Asia/Pontianak', value: '(GMT+07:00) Asia/Pontianak' },
  { id: 'Asia/Ho_Chi_Minh', value: '(GMT+07:00) Asia/Ho_Chi_Minh' },
  { id: 'Indian/Christmas', value: '(GMT+07:00) Indian/Christmas' },
  { id: 'Asia/Krasnoyarsk', value: '(GMT+07:00) Asia/Krasnoyarsk' },
  { id: 'Antarctica/Davis', value: '(GMT+07:00) Antarctica/Davis' },
  { id: 'Asia/Phnom_Penh', value: '(GMT+07:00) Asia/Phnom_Penh' },
  { id: 'Asia/Vientiane', value: '(GMT+07:00) Asia/Vientiane' },
  { id: 'Asia/Novokuznetsk', value: '(GMT+07:00) Asia/Novokuznetsk' },
  { id: 'Asia/Bangkok', value: '(GMT+07:00) Asia/Bangkok' },
  { id: 'Asia/Jakarta', value: '(GMT+07:00) Asia/Jakarta' },
  { id: 'Asia/Chita', value: '(GMT+08:00) Asia/Chita' },
  { id: 'Asia/Hong_Kong', value: '(GMT+08:00) Asia/Hong_Kong' },
  { id: 'Asia/Irkutsk', value: '(GMT+08:00) Asia/Irkutsk' },
  { id: 'Asia/Manila', value: '(GMT+08:00) Asia/Manila' },
  { id: 'Australia/Perth', value: '(GMT+08:00) Australia/Perth' },
  { id: 'Asia/Singapore', value: '(GMT+08:00) Asia/Singapore' },
  { id: 'Asia/Shanghai', value: '(GMT+08:00) Asia/Shanghai' },
  { id: 'Asia/Makassar', value: '(GMT+08:00) Asia/Makassar' },
  { id: 'Asia/Taipei', value: '(GMT+08:00) Asia/Taipei' },
  { id: 'Asia/Kuching', value: '(GMT+08:00) Asia/Kuching' },
  { id: 'Asia/Kuala_Lumpur', value: '(GMT+08:00) Asia/Kuala_Lumpur' },
  { id: 'Asia/Macau', value: '(GMT+08:00) Asia/Macau' },
  { id: 'Asia/Hovd', value: '(GMT+08:00) Asia/Hovd' },
  { id: 'Asia/Brunei', value: '(GMT+08:00) Asia/Brunei' },
  { id: 'Antarctica/Casey', value: '(GMT+08:00) Antarctica/Casey' },
  { id: 'Asia/Pyongyang', value: '(GMT+08:30) Asia/Pyongyang' },
  { id: 'Australia/Eucla', value: '(GMT+08:45) Australia/Eucla' },
  { id: 'Asia/Khandyga', value: '(GMT+09:00) Asia/Khandyga' },
  { id: 'Asia/Ulaanbaatar', value: '(GMT+09:00) Asia/Ulaanbaatar' },
  { id: 'Asia/Choibalsan', value: '(GMT+09:00) Asia/Choibalsan' },
  { id: 'Asia/Jayapura', value: '(GMT+09:00) Asia/Jayapura' },
  { id: 'Asia/Yakutsk', value: '(GMT+09:00) Asia/Yakutsk' },
  { id: 'Asia/Tokyo', value: '(GMT+09:00) Asia/Tokyo' },
  { id: 'Pacific/Palau', value: '(GMT+09:00) Pacific/Palau' },
  { id: 'Asia/Seoul', value: '(GMT+09:00) Asia/Seoul' },
  { id: 'Asia/Dili', value: '(GMT+09:00) Asia/Dili' },
  { id: 'Australia/Darwin', value: '(GMT+09:30) Australia/Darwin' },
  { id: 'Australia/Adelaide', value: '(GMT+09:30) Australia/Adelaide' },
  { id: 'Australia/Broken_Hill', value: '(GMT+09:30) Australia/Broken_Hill' },
  { id: 'Pacific/Guam', value: '(GMT+10:00) Pacific/Guam' },
  { id: 'Asia/Magadan', value: '(GMT+10:00) Asia/Magadan' },
  { id: 'Australia/Brisbane', value: '(GMT+10:00) Australia/Brisbane' },
  { id: 'Australia/Currie', value: '(GMT+10:00) Australia/Currie' },
  { id: 'Pacific/Chuuk', value: '(GMT+10:00) Pacific/Chuuk' },
  { id: 'Pacific/Port_Moresby', value: '(GMT+10:00) Pacific/Port_Moresby' },
  { id: 'Pacific/Saipan', value: '(GMT+10:00) Pacific/Saipan' },
  { id: 'Australia/Hobart', value: '(GMT+10:00) Australia/Hobart' },
  { id: 'Asia/Sakhalin', value: '(GMT+10:00) Asia/Sakhalin' },
  { id: 'Australia/Sydney', value: '(GMT+10:00) Australia/Sydney' },
  {
    id: 'Antarctica/DumontDUrville',
    value: '(GMT+10:00) Antarctica/DumontDUrville'
  },
  { id: 'Asia/Vladivostok', value: '(GMT+10:00) Asia/Vladivostok' },
  { id: 'Asia/Ust-Nera', value: '(GMT+10:00) Asia/Ust-Nera' },
  { id: 'Australia/Lindeman', value: '(GMT+10:00) Australia/Lindeman' },
  { id: 'Australia/Melbourne', value: '(GMT+10:00) Australia/Melbourne' },
  { id: 'Australia/Lord_Howe', value: '(GMT+10:30) Australia/Lord_Howe' },
  { id: 'Pacific/Noumea', value: '(GMT+11:00) Pacific/Noumea' },
  { id: 'Asia/Srednekolymsk', value: '(GMT+11:00) Asia/Srednekolymsk' },
  { id: 'Antarctica/Macquarie', value: '(GMT+11:00) Antarctica/Macquarie' },
  { id: 'Pacific/Efate', value: '(GMT+11:00) Pacific/Efate' },
  { id: 'Pacific/Pohnpei', value: '(GMT+11:00) Pacific/Pohnpei' },
  { id: 'Pacific/Norfolk', value: '(GMT+11:00) Pacific/Norfolk' },
  { id: 'Pacific/Guadalcanal', value: '(GMT+11:00) Pacific/Guadalcanal' },
  { id: 'Pacific/Kosrae', value: '(GMT+11:00) Pacific/Kosrae' },
  { id: 'Pacific/Bougainville', value: '(GMT+11:00) Pacific/Bougainville' },
  { id: 'Asia/Anadyr', value: '(GMT+12:00) Asia/Anadyr' },
  { id: 'Pacific/Wallis', value: '(GMT+12:00) Pacific/Wallis' },
  { id: 'Antarctica/McMurdo', value: '(GMT+12:00) Antarctica/McMurdo' },
  { id: 'Pacific/Tarawa', value: '(GMT+12:00) Pacific/Tarawa' },
  { id: 'Pacific/Wake', value: '(GMT+12:00) Pacific/Wake' },
  { id: 'Pacific/Kwajalein', value: '(GMT+12:00) Pacific/Kwajalein' },
  { id: 'Asia/Kamchatka', value: '(GMT+12:00) Asia/Kamchatka' },
  { id: 'Pacific/Fiji', value: '(GMT+12:00) Pacific/Fiji' },
  { id: 'Pacific/Majuro', value: '(GMT+12:00) Pacific/Majuro' },
  { id: 'Pacific/Nauru', value: '(GMT+12:00) Pacific/Nauru' },
  { id: 'Pacific/Funafuti', value: '(GMT+12:00) Pacific/Funafuti' },
  { id: 'Pacific/Auckland', value: '(GMT+12:00) Pacific/Auckland' },
  { id: 'Pacific/Chatham', value: '(GMT+12:45) Pacific/Chatham' },
  { id: 'Pacific/Tongatapu', value: '(GMT+13:00) Pacific/Tongatapu' },
  { id: 'Pacific/Fakaofo', value: '(GMT+13:00) Pacific/Fakaofo' },
  { id: 'Pacific/Enderbury', value: '(GMT+13:00) Pacific/Enderbury' },
  { id: 'Pacific/Apia', value: '(GMT+13:00) Pacific/Apia' },
  { id: 'Pacific/Kiritimati', value: '(GMT+14:00) Pacific/Kiritimati' },
  { id: 'America/Vancouver', value: '(GMT-07:00) Canada/Pacific' },
  { id: 'America/Edmonton', value: '(GMT-06:00) Canada/Mountain' },
  { id: 'America/Regina', value: '(GMT-06:00) Canada/Saskatchewan' },
  { id: 'America/Winnipeg', value: '(GMT-05:00) Canada/Central' },
  { id: 'America/Toronto', value: '(GMT-04:00) Canada/Eastern' },
  { id: 'America/Halifax', value: '(GMT-03:00) Canada/Atlantic' },
  { id: 'America/St_Johns', value: '(GMT-02:30) Canada/Newfoundland' }
]

export default new autoComplete({
  selector: '#timezone_select',
  source: (term, suggest) => {
    term = term.toLowerCase()
    let suggestions = []
    for (let i = 0; i < timezones.length; i++)
      if (~timezones[i].value.toLowerCase().indexOf(term))
        suggestions.push(timezones[i])
    suggest(suggestions)
  },
  renderItem: (item, search) => {
    search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    var re = new RegExp('(' + search.split(' ').join('|') + ')', 'gi')
    return `<div class="autocomplete-suggestion" data-id="${
      item.id
    }" data-value="${item.value}">${item.value.replace(re, '<b>$1</b>')}</div>`
  },
  onSelect: (e, term, item) => {
    document.getElementById('timezone_select').value = item.dataset.value
    document.getElementById('timezone').value = item.dataset.id
  }
})
