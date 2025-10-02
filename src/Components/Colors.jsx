const colors = [
  {
    id: 1,
    name: "Beige Textile",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854334636062/8854514565150/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 2,
    name: "Grey Textile",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854335029278/8854514663454/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 3,
    name: "White Linen",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854335422494/8854514761758/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 4,
    name: "Anthracite Linen",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854336208926/8854514958366/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 5,
    name: "Chromix Silver",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854346760222/8854517940254/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 6,
    name: "Natural Halifax Oak",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854365503518/8854523150366/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 7,
    name: "Grey-Beige Tossini Elm",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854524035102/8860195455006/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 8,
    name: "Fox Grey Tossini Elm",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854524231710/8854524264478/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 9,
    name: "Stone Grey Frozen Wood",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854372188190/8860196536350/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 10,
    name: "White Frozen Wood",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854372581406/8854526525470/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 11,
    name: "Carbon Frozen Wood",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854373367838/8854526623774/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 12,
    name: "Light Natural Casella Oak",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854529179678/8854529212446/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 13,
    name: "White Casella Oak",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854530031646/8854530064414/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 14,
    name: "White Tossini Elm",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854531571742/8854531604510/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 15,
    name: "Hardrock Maple",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854533144606/8854533177374/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 16,
    name: "White Havana Pine",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854394601502/8860202958878/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 17,
    name: "Black Havana Pine",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854394994718/8860203253790/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 18,
    name: "Vicenza Oak",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854400598046/8854538453022/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 19,
    name: "Grey Vicenza Oak",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854401384478/8854538649630/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 20,
    name: "light Vicenza Oak",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854539042846/8854539075614/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 21,
    name: "Oiled Kendal Oak",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854402957342/8854539436062/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 22,
    name: "White Fineline",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854406889502/8854540124190/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 23,
    name: "Natural Carini Walnut",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854420258846/8854545137694/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 24,
    name: "Honey Carini Walnut",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854421831710/8854545530910/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 25,
    name: "Auburn Carini Walnut",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854422224926/8854545629214/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 26,
    name: "Chocolate Carini Walnut",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854422618142/8854545727518/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 27,
    name: "Pebble Grey",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854429302814/8854429335582/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 28,
    name: "Misty Blue",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854550642718/8854550675486/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 29,
    name: "Cashmere Grey",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854449356830/8854449389598/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 30,
    name: "Angora Grey",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854451716126/8854556639262/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 31,
    name: "Stone Grey",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854455648286/8854455681054/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 32,
    name: "Silver Grey",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854559260702/8854559293470/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 33,
    name: "Fog Grey",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854559850526/8854559883294/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 34,
    name: "Monument Grey",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854463971358/8854559981598/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 35,
    name: "Diamond Grey",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854470262814/8854561259550/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 36,
    name: "Black",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854473015326/8854473048094/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 37,
    name: "Black",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854562930718/8854562963486/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 38,
    name: "Alpine White",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854481928222/8854481960990/AR_16_9.webp?width=1440&srcext=png",
  },
  {
    id: 39,
    name: "Alpine White",
    imageUrl:
      "https://cdn.egger.com/img/pim/8854564405278/8854564438046/AR_16_9.webp?width=1440&srcext=png",
  },
]

export default colors
