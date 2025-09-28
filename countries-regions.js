// Dữ liệu quốc gia và tỉnh/khu vực cho xuất khẩu lao động
const COUNTRIES_REGIONS = {
    "Nga": {
        name: "Nga",
        flag: "🇷🇺",
        flagUrl: "/images/flags/russia.png",
        regions: [
            "Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", 
            "Nizhny Novgorod", "Kazan", "Chelyabinsk", "Omsk", "Samara", 
            "Rostov-on-Don", "Ufa", "Krasnoyarsk", "Perm", "Voronezh", 
            "Volgograd", "Krasnodar", "Saratov", "Tyumen", "Tolyatti", "Izhevsk"
        ]
    },
    "Đài Loan": {
        name: "Đài Loan", 
        flag: "🇹🇼",
        flagUrl: "/images/flags/taiwan.png",
        regions: [
            "Taipei", "New Taipei", "Taoyuan", "Taichung", "Tainan", 
            "Kaohsiung", "Keelung", "Hsinchu", "Chiayi", "Changhua",
            "Yunlin", "Pingtung", "Yilan", "Hualien", "Taitung", 
            "Penghu", "Kinmen", "Lienchiang"
        ]
    },
    "Nhật Bản": {
        name: "Nhật Bản",
        flag: "🇯🇵",
        flagUrl: "/images/flags/japan.png", 
        regions: [
            "Tokyo", "Osaka", "Yokohama", "Nagoya", "Sapporo", "Fukuoka",
            "Kobe", "Kawasaki", "Kyoto", "Saitama", "Hiroshima", "Sendai",
            "Chiba", "Kitakyushu", "Sakai", "Niigata", "Hamamatsu", "Okayama",
            "Sagamihara", "Kumamoto", "Shizuoka", "Kagoshima", "Matsuyama", "Kanazawa"
        ]
    },
    "Hàn Quốc": {
        name: "Hàn Quốc",
        flag: "🇰🇷",
        flagUrl: "/images/flags/korea.png",
        regions: [
            "Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju",
            "Suwon", "Ulsan", "Changwon", "Goyang", "Yongin", "Seongnam",
            "Bucheon", "Cheongju", "Ansan", "Jeonju", "Anyang", "Pohang",
            "Uijeongbu", "Siheung", "Cheonan", "Hwaseong", "Gimhae", "Gumi"
        ]
    },
    "Singapore": {
        name: "Singapore",
        flag: "🇸🇬",
        flagUrl: "/images/flags/singapore.png",
        regions: [
            "Central Region", "East Region", "North Region", "North-East Region", "West Region",
            "Marina Bay", "Orchard", "Sentosa", "Jurong", "Tampines", 
            "Woodlands", "Yishun", "Toa Payoh", "Ang Mo Kio", "Bedok"
        ]
    },
    "Malaysia": {
        name: "Malaysia", 
        flag: "🇲🇾",
        flagUrl: "/images/flags/malaysia.png",
        regions: [
            "Kuala Lumpur", "Selangor", "Johor", "Penang", "Perak", "Kedah",
            "Kelantan", "Terengganu", "Pahang", "Negeri Sembilan", "Melaka",
            "Perlis", "Sabah", "Sarawak", "Putrajaya", "Labuan"
        ]
    },
    "Thái Lan": {
        name: "Thái Lan",
        flag: "🇹🇭",
        flagUrl: "/images/flags/thailand.png", 
        regions: [
            "Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Krabi", "Hua Hin",
            "Koh Samui", "Ayutthaya", "Chiang Rai", "Sukhothai", "Kanchanaburi",
            "Nakhon Ratchasima", "Udon Thani", "Khon Kaen", "Hat Yai", "Rayong"
        ]
    },
    "Úc": {
        name: "Úc",
        flag: "🇦🇺",
        flagUrl: "/images/flags/australia.png",
        regions: [
            "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast",
            "Newcastle", "Canberra", "Sunshine Coast", "Wollongong", "Hobart",
            "Geelong", "Townsville", "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo"
        ]
    },
    "New Zealand": {
        name: "New Zealand",
        flag: "🇳🇿",
        flagUrl: "/images/flags/newzealand.png",
        regions: [
            "Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga",
            "Napier-Hastings", "Dunedin", "Palmerston North", "Nelson", "Rotorua",
            "New Plymouth", "Whangarei", "Invercargill", "Whanganui", "Gisborne"
        ]
    },
    "Đức": {
        name: "Đức", 
        flag: "🇩🇪",
        flagUrl: "/images/flags/germany.png",
        regions: [
            "Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart",
            "Düsseldorf", "Dortmund", "Essen", "Leipzig", "Bremen", "Dresden",
            "Hanover", "Nuremberg", "Duisburg", "Bochum", "Wuppertal", "Bielefeld"
        ]
    },
    "Pháp": {
        name: "Pháp",
        flag: "🇫🇷",
        flagUrl: "/images/flags/france.png", 
        regions: [
            "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes",
            "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims",
            "Le Havre", "Saint-Étienne", "Toulon", "Grenoble", "Dijon", "Angers"
        ]
    },
    "Ý": {
        name: "Ý",
        flag: "🇮🇹",
        flagUrl: "/images/flags/italy.png",
        regions: [
            "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa",
            "Bologna", "Florence", "Bari", "Catania", "Venice", "Verona",
            "Messina", "Padua", "Trieste", "Taranto", "Brescia", "Parma"
        ]
    },
    "Tây Ban Nha": {
        name: "Tây Ban Nha",
        flag: "🇪🇸",
        flagUrl: "/images/flags/spain.png",
        regions: [
            "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga",
            "Murcia", "Palma", "Las Palmas", "Bilbao", "Alicante", "Córdoba",
            "Valladolid", "Vigo", "Gijón", "L'Hospitalet", "Granada", "Vitoria"
        ]
    },
    "Hà Lan": {
        name: "Hà Lan",
        flag: "🇳🇱",
        regions: [
            "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg",
            "Groningen", "Almere", "Breda", "Nijmegen", "Enschede", "Haarlem",
            "Arnhem", "Zaanstad", "Haarlemmermeer", "Amersfoort", "Apeldoorn", "'s-Hertogenbosch"
        ]
    },
    "Bỉ": {
        name: "Bỉ", 
        flag: "🇧🇪",
        regions: [
            "Brussels", "Antwerp", "Ghent", "Charleroi", "Liège", "Bruges",
            "Namur", "Leuven", "Mons", "Aalst", "Mechelen", "La Louvière",
            "Kortrijk", "Hasselt", "Sint-Niklaas", "Ostend", "Genk", "Seraing"
        ]
    },
    "Thụy Sĩ": {
        name: "Thụy Sĩ",
        flag: "🇨🇭",
        regions: [
            "Zurich", "Geneva", "Basel", "Lausanne", "Bern", "Winterthur",
            "Lucerne", "St. Gallen", "Lugano", "Biel/Bienne", "Thun", "Köniz",
            "La Chaux-de-Fonds", "Schaffhausen", "Fribourg", "Vernier", "Chur", "Neuchâtel"
        ]
    },
    "Áo": {
        name: "Áo",
        flag: "🇦🇹", 
        regions: [
            "Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt",
            "Villach", "Wels", "Sankt Pölten", "Dornbirn", "Steyr", "Wiener Neustadt",
            "Feldkirch", "Bregenz", "Leonding", "Klosterneuburg", "Baden", "Wolfsberg"
        ]
    },
    "Thụy Điển": {
        name: "Thụy Điển",
        flag: "🇸🇪",
        regions: [
            "Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro",
            "Linköping", "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå",
            "Gävle", "Borås", "Södertälje", "Eskilstuna", "Halmstad", "Växjö"
        ]
    },
    "Na Uy": {
        name: "Na Uy",
        flag: "🇳🇴",
        regions: [
            "Oslo", "Bergen", "Stavanger", "Trondheim", "Drammen", "Fredrikstad",
            "Kristiansand", "Sandnes", "Tromsø", "Sarpsborg", "Skien", "Ålesund",
            "Sandefjord", "Haugesund", "Tønsberg", "Moss", "Bodø", "Arendal"
        ]
    },
    "Phần Lan": {
        name: "Phần Lan",
        flag: "🇫🇮",
        regions: [
            "Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku",
            "Jyväskylä", "Lahti", "Kuopio", "Pori", "Kouvola", "Joensuu",
            "Lappeenranta", "Hämeenlinna", "Vaasa", "Seinäjoki", "Rovaniemi", "Mikkeli"
        ]
    },
    "Đan Mạch": {
        name: "Đan Mạch",
        flag: "🇩🇰",
        regions: [
            "Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers",
            "Kolding", "Horsens", "Vejle", "Roskilde", "Herning", "Hørsholm",
            "Helsingør", "Silkeborg", "Næstved", "Fredericia", "Viborg", "Køge"
        ]
    },
    "Canada": {
        name: "Canada",
        flag: "🇨🇦",
        flagUrl: "/images/flags/canada.png",
        regions: [
            "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa",
            "Winnipeg", "Quebec City", "Hamilton", "Kitchener", "London", "Victoria",
            "Halifax", "Oshawa", "Windsor", "Saskatoon", "St. Catharines", "Regina"
        ]
    },
    "Mỹ": {
        name: "Mỹ",
        flag: "🇺🇸",
        flagUrl: "/images/flags/usa.png",
        regions: [
            "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
            "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
            "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle"
        ]
    }
};

// Export cho sử dụng
if (typeof module !== 'undefined' && module.exports) {
    module.exports = COUNTRIES_REGIONS;
}
