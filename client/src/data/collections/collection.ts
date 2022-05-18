export interface NftItem {
  NFTid: number;
  image: string;
  price: number;
  description: string;
  count: number;
  collectionID: number;
}

export interface collectionDataItem {
  id: number;
  name: string;
  description: string;
  volumeTraded: number;
  floorPrice: number;
  header: string;
  productImage: string;
  NFTS: NftItem[];
}

export const collectionData: collectionDataItem[] = [
  {
    id: 1,
    name: "MeinerNFT",
    description:
      "In the wonderful world of fitness, Meiner rules the squatrack. With his godly physique and incredible mindset he has become an inspiration for the rest of us. This is a collection of some of his greatest moments.",
    volumeTraded: 0.2,
    floorPrice: 11,
    header: "/assets/images/Products/CollectionImages/MeinerColPic.png",
    productImage: "/assets/images/Products/CollectionImages/MeinerColPic.png",
    NFTS: [
      {
        NFTid: 1,
        image: "/assets/images/Products/MeinerNFT/GymPicNFT.png",
        price: 19,
        description:
          "Meiner in the gym. Some say it was leg-day but who knows?",
        count: 1,
        collectionID: 1,
      },
      {
        NFTid: 2,
        image: "/assets/images/Products/MeinerNFT/PopsicleNFT.png",
        price: 14,
        description:
          "Meiner eating a popsicle. The man really knows how to cool off.",
        count: 1,
        collectionID: 1,
      },
      {
        NFTid: 3,
        image: "/assets/images/Products/MeinerNFT/LookAwayNFT.png",
        price: 11,
        description: "Meiner not looking at you. He's looking at someone else.",
        count: 1,
        collectionID: 1,
      },
      {
        NFTid: 4,
        image: "/assets/images/Products/MeinerNFT/TravelNFT.png",
        price: 12,
        description:
          "Meiner looking at something else. Still not looking at you, infuriating isn't it?",
        count: 1,
        collectionID: 1,
      },
      {
        NFTid: 5,
        image: "/assets/images/Products/MeinerNFT/StaringAtYouNFT.png",
        price: 12,
        description:
          "Meiner staring into your soul. Can you feel it? That is the knowledge of 20k hours in the gym looking right at you.",
        count: 1,
        collectionID: 1,
      },
      {
        NFTid: 6,
        image: "/assets/images/Products/MeinerNFT/BellpepperNFT.png",
        price: 12,
        description:
          "Meiner eating a bell pepper. When he's not cooling off, he's heating up!",
        count: 1,
        collectionID: 1,
      },
    ],
  },
  {
    id: 2,
    name: "BakkumNFT",
    description:
      "Felix Bakkum the champion of VS-Code & guardian of Excet. With his tall and beautiful posture he looks down on all of us. Keeping us safe on the dance floor and helping us create code-magic. Get your hands on one of his NFT to secure your wealth for generations to come.",
    volumeTraded: 100,
    floorPrice: 10,
    header: "/assets/images/Products/CollectionImages/BakkumColPic.png",
    productImage: "/assets/images/Products/CollectionImages/BakkumColPic.png",
    NFTS: [
      {
        NFTid: 7,
        image: "/assets/images/Products/BakkumNFT/BlåtiraBakkumNFT.png",
        price: 16,
        description:
          "Bakkum with a black eye. Legend says it was given to him by the bouncer at Excet who got jealous of Felix one night.",
        count: 1,
        collectionID: 2,
      },
      {
        NFTid: 8,
        image: "/assets/images/Products/BakkumNFT/BlåtiraBilBakkumNFT.png",
        price: 13,
        description:
          "Bakkum with a black eye in the car. Pretty self explanatory right? ",
        count: 1,
        collectionID: 2,
      },
      {
        NFTid: 9,
        image: "/assets/images/Products/BakkumNFT/ElvisBakkumNFT.png",
        price: 20,
        description:
          "The legendary Elvis. Have you ever heard of hundtricket? This is it!",
        count: 1,
        collectionID: 2,
      },
      {
        NFTid: 10,
        image: "/assets/images/Products/BakkumNFT/FredBakkumNFT.png",
        price: 10,
        description:
          "Bakkum throwing a peace sign. He might be big and tall, but above all, he's a nice guy promoting peace.",
        count: 1,
        collectionID: 2,
      },
      {
        NFTid: 11,
        image: "/assets/images/Products/BakkumNFT/StaroBakkumNFT.png",
        price: 15,
        description:
          "Bakkum drinking Staro. Before going out, one needs to pre-game. This is Felix go-to beer for getting the night started.",
        count: 1,
        collectionID: 2,
      },
      {
        NFTid: 12,
        image: "/assets/images/Products/BakkumNFT/TungaBakkumNFT.png",
        price: 17,
        description:
          "Bakkum sticking out his tongue. You will never get this lalalalala.",
        count: 1,
        collectionID: 2,
      },
    ],
  },
  {
    id: 3,
    name: "PappaNFT",
    description:
      "Pappa, the old and wise. An old soul in a young mans body, this man will fulfill your every wish.",
    volumeTraded: 30,
    floorPrice: 10,
    header: "/assets/images/Products/CollectionImages/PappaColPic.png",
    productImage: "/assets/images/Products/CollectionImages/PappaColPic.png",
    NFTS: [
      {
        NFTid: 13,
        image: "/assets/images/Products/PappaNFT/FullPappaNFT.png",
        price: 22,
        description:
          "Pappa surrounded by smoke. The legend says that the smoke was coming from his brain after thinking about complex issues.",
        count: 1,
        collectionID: 3,
      },
      {
        NFTid: 14,
        image: "/assets/images/Products/PappaNFT/GladPappaNFT.png",
        price: 24,
        description:
          "Pappa very happy. This moment was captured right after Pappa received the Nobel price in physics.",
        count: 1,
        collectionID: 3,
      },
      {
        NFTid: 15,
        image: "/assets/images/Products/PappaNFT/HawkingPappaNFT.png",
        price: 13,
        description:
          "Pappa very relaxed. After a long hard day of thinking, the brain gets tired and its time for some relaxation to recharge the brain.",
        count: 1,
        collectionID: 3,
      },
      {
        NFTid: 16,
        image: "/assets/images/Products/PappaNFT/SovaPappaNFT.png",
        price: 14,
        description: "Pappa very sleepy. Even a god gets tired.",
        count: 1,
        collectionID: 3,
      },
      {
        NFTid: 17,
        image: "/assets/images/Products/PappaNFT/StaringAtYouPappaNFT.png",
        price: 12,
        description: "Pappa staring into your soul. He's very disappointed.",
        count: 1,
        collectionID: 3,
      },
      {
        NFTid: 18,
        image: "/assets/images/Products/PappaNFT/VectorPappaNFT.png",
        price: 10,
        description:
          "Pappa very fresh. New hair who dis? Being a genius never looked so good.",
        count: 1,
        collectionID: 3,
      },
    ],
  },
  {
    id: 4,
    name: "Formula1NFT",
    description:
      "In the wonderful world of Formula One lives the Formula One car. This is a collection of some of the most beautiful racing cars on earth. ",
    volumeTraded: 30,
    floorPrice: 9,
    header: "/assets/images/Products/CollectionImages/F1ColPic.png",
    productImage: "/assets/images/Products/CollectionImages/F1ColPic.png",
    NFTS: [
      {
        NFTid: 19,
        image: "/assets/images/Products/F1NFT/afF1NFT.png",
        price: 14,
        description:
          "Alfa Romeo livery 2022. Will Valtteri Bottas get his revenge on Mercedes? Will he live to tell the tale?",
        count: 1,
        collectionID: 4,
      },
      {
        NFTid: 20,
        image: "/assets/images/Products/F1NFT/atF1NFT.png",
        price: 16,
        description:
          "AlphaTauri livery 2022. Will Pierre Gasly & Yuki Tsunoda finally get a race win? We dont think so but who knows?",
        count: 1,
        collectionID: 4,
      },
      {
        NFTid: 21,
        image: "/assets/images/Products/F1NFT/ferF1NFT.png",
        price: 24,
        description:
          "Ferrari livery 2022. Boy oh boy, the Prancing Horse rises again. This year is looking good for Ferrari and we cant wait to see the results!",
        count: 1,
        collectionID: 4,
      },
      {
        NFTid: 22,
        image: "/assets/images/Products/F1NFT/haasF1NFT.png",
        price: 21,
        description:
          "Haas livery 2022. K-mag and Schumi JR, could it get any better? We are predicting great success for Günther Steiners team this year!",
        count: 1,
        collectionID: 4,
      },
      {
        NFTid: 23,
        image: "/assets/images/Products/F1NFT/mercF1NFT.png",
        price: 9,
        description:
          "Mercedes livery 2022. Where did the sidepods go? No one knows but its not looking great right now. Like Peter Bonnington would say: Head down and get in there.",
        count: 1,
        collectionID: 4,
      },
      {
        NFTid: 24,
        image: "/assets/images/Products/F1NFT/rbF1NFT.png",
        price: 18,
        description:
          "Redbull livery 2022. Will the champion of last year do it again? Will the energy drink company get its second drivers title? Will the Mexican make tacos with the opposition? Buy this NFT and find out.",
        count: 1,
        collectionID: 4,
      },
    ],
  },
  {
    id: 5,
    name: "DCNFT",
    description: "DC superheroes. Could it get any better? We think not.",
    volumeTraded: 30,
    floorPrice: 12,
    header: "/assets/images/Products/CollectionImages/DCColPic.png",
    productImage: "/assets/images/Products/CollectionImages/DCColPic.png",
    NFTS: [
      {
        NFTid: 25,
        image: "/assets/images/Products/DCNFT/SupermanDCNFT.png",
        price: 20,
        description:
          "Clark Kent's own SUPER NFT. Is it a bird? Is it a plane? No its Superman upstairs going hard.",
        count: 1,
        collectionID: 5,
      },
      {
        NFTid: 26,
        image: "/assets/images/Products/DCNFT/BatmanDCNFT.png",
        price: 18,
        description:
          "Bruce Wayne's dark and shadowy NFT. Very rich, very scary.",
        count: 1,
        collectionID: 5,
      },
      {
        NFTid: 27,
        image: "/assets/images/Products/DCNFT/WonderWomanDCNFT.png",
        price: 12,
        description: "Diana's truthful and equal NFT",
        count: 1,
        collectionID: 5,
      },
      {
        NFTid: 28,
        image: "/assets/images/Products/DCNFT/FlashDCNFT.png",
        price: 15,
        description:
          "The fastest NFT alive. Not faster than Felix Bakkum when there's free entrance to Excet tho.",
        count: 1,
        collectionID: 5,
      },
      {
        NFTid: 29,
        image: "/assets/images/Products/DCNFT/GreenLanternDCNFT.png",
        price: 14,
        description:
          "Green Lantern's NFT. Almost as powerful as his ring, but not quite.",
        count: 1,
        collectionID: 5,
      },
      {
        NFTid: 30,
        image: "/assets/images/Products/DCNFT/AquamanDCNFT.png",
        price: 17,
        description:
          "The Royal NFT of Atlantis. Aquaman, what a good guy. Get your hands on this NFT to take part in the legendary story of the man from the sea.",
        count: 1,
        collectionID: 5,
      },
    ],
  },
  {
    id: 6,
    name: "NoccoNFT",
    description:
      "Nocco, the web developers elixir of life. Coffee? Tea? Its 2022 my friend, we only drink overpriced and overcaffinated drinks now.",
    volumeTraded: 30,
    floorPrice: 13,
    header: "/assets/images/Products/CollectionImages/NoccoColPic.png",
    productImage: "/assets/images/Products/CollectionImages/NoccoColPic.png",
    NFTS: [
      {
        NFTid: 31,
        image: "/assets/images/Products/NoccoNFT/BloodOrangeNoccoNFT.png",
        price: 11,
        description:
          "Nocco's new and powerful Blood Orange flavor. The blood in the name refers to the blood of the enemies slaughtered in the battle for sponsoring Christian Meiner.",
        count: 1,
        collectionID: 6,
      },
      {
        NFTid: 32,
        image: "/assets/images/Products/NoccoNFT/CaribbeanNoccoNFT.png",
        price: 24,
        description:
          "Get a taste of the tropics from Nocco's Caribbean NFT. Close your eyes and take a sip, instant satisfaction guaranteed.",
        count: 1,
        collectionID: 6,
      },
      {
        NFTid: 33,
        image: "/assets/images/Products/NoccoNFT/IceSodaNoccoNFT.png",
        price: 13,
        description:
          "GRRM's favorite: A Song of Ice and Soda. The fuel of the white walkers.",
        count: 1,
        collectionID: 6,
      },
      {
        NFTid: 34,
        image: "/assets/images/Products/NoccoNFT/JuicyBreezeNoccoNFT.png",
        price: 20,
        description:
          "The instant 2022 summer classic, Juicy B NFT. Come get yours before its 2023 and this is removed and replaced with something worse.",
        count: 1,
        collectionID: 6,
      },
      {
        NFTid: 35,
        image: "/assets/images/Products/NoccoNFT/LimonNoccoNFT.png",
        price: 26,
        description:
          "When life gives you lemons, make Limón NFT. Pappas personal favorite flavour. Great for breakfast lunch and dinner.",
        count: 1,
        collectionID: 6,
      },
      {
        NFTid: 36,
        image: "/assets/images/Products/NoccoNFT/RamonadeNoccoNFT.png",
        price: 21,
        description:
          "Sylvester Stalone, please don't sue us! This is Ramonade NFT, not Rambonade NFT.",
        count: 1,
        collectionID: 6,
      },
    ],
  },
];
