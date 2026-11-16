export type Zone = 'court' | 'holy' | 'most'

export interface Verse {
  ref: string
  note?: string
}

export interface Term {
  word: string
  translit: string
  lang: 'Hebrew' | 'Greek'
  meaning: string
}

export interface Resource {
  title: string
  detail: string
  url: string
}

export interface Quote {
  quote: string
  by: string
  source: string
}

export type Para = string | Quote

export interface Link {
  to: string
  text: string
}

export interface SanctuarySymbol {
  id: string
  name: string
  zone: Zone
  tagline: string
  terms: Term[]
  build: string
  measure?: string
  service: string
  christ: string
  deeper: Para[]
  meaning?: { title: string; paras: Para[] }
  links: Link[]
  life: string
  verses: Verse[]
  resources: Resource[]
}

export const zones: Record<Zone, { name: string; short: string; phase: string; summary: string }> = {
  court: {
    name: 'The Outer Court',
    short: 'Court',
    phase: 'Justification',
    summary:
      'Any Israelite could enter here. The court held the altar and the laver, and it was the only part of the sanctuary where blood was actually shed. It corresponds to Christ\'s work on earth, finished at the cross.',
  },
  holy: {
    name: 'The Holy Place',
    short: 'Holy Place',
    phase: 'Sanctification',
    summary:
      'Priests ministered here every day. Bread, light and incense describe the believer\'s ongoing life with God, and they match the first phase of Christ\'s priestly ministry in heaven, which began after His ascension.',
  },
  most: {
    name: 'The Most Holy Place',
    short: 'Most Holy',
    phase: 'Glorification',
    summary:
      'The throne room. The high priest entered once a year, on the Day of Atonement, to cleanse the sanctuary. Its antitype is the final phase of Christ\'s ministry: the judgment that precedes His return and ends the sin problem for good.',
  },
}

const wc = (q: string) => `https://search.worldcat.org/search?q=${encodeURIComponent(q)}`
const EGW = 'https://egwwritings.org/'

export const R = {
  pp30: { title: 'Patriarchs and Prophets, ch. 30', detail: 'Ellen G. White, "The Tabernacle and Its Services." A compact, readable tour of the whole system.', url: EGW },
  gc23: { title: 'The Great Controversy, ch. 23', detail: 'Ellen G. White, "What Is the Sanctuary?" How the study of Daniel 8:14 led to the heavenly sanctuary.', url: EGW },
  gc24: { title: 'The Great Controversy, ch. 24', detail: 'Ellen G. White, "In the Holy of Holies." Christ\'s ministry in the second apartment.', url: EGW },
  gc28: { title: 'The Great Controversy, ch. 28', detail: 'Ellen G. White, "Facing Life\'s Record." The judgment and the believer\'s assurance.', url: EGW },
  andreasen: { title: 'The Sanctuary Service', detail: 'M. L. Andreasen (1937). A classic, chapter-by-chapter study of the priesthood, offerings and Day of Atonement.', url: wc('Andreasen The Sanctuary Service') },
  haskell: { title: 'The Cross and Its Shadow', detail: 'Stephen N. Haskell (1914). Devotional typology; strong on the furniture and the feasts.', url: wc('Haskell The Cross and Its Shadow') },
  hardinge: { title: 'With Jesus in His Sanctuary', detail: 'Leslie Hardinge (1991). Detailed on Hebrew words, materials and their meanings.', url: wc('Hardinge With Jesus in His Sanctuary') },
  gane: { title: 'Altar Call', detail: 'Roy Gane (1999). A Hebrew Bible scholar explains the sacrifices and the Day of Atonement for general readers.', url: wc('Roy Gane Altar Call') },
  ganeCult: { title: 'Cult and Character', detail: 'Roy Gane (2005). Technical study of purification offerings and the two phases of atonement.', url: wc('Roy Gane Cult and Character') },
  davidson: { title: 'Typology in Scripture', detail: 'Richard M. Davidson (1981). How biblical types work, with Hebrews as the key case.', url: wc('Richard Davidson Typology in Scripture') },
  goldstein: { title: '1844 Made Simple', detail: 'Clifford Goldstein (1988). A short, clear walk through Daniel 7, 8 and 9.', url: wc('Clifford Goldstein 1844 Made Simple') },
  shea: { title: 'Selected Studies on Prophetic Interpretation', detail: 'William H. Shea (1982, rev. 1992). The day-year principle and the dating of Daniel 9.', url: wc('Shea Selected Studies on Prophetic Interpretation') },
  darcom: { title: 'The Sanctuary and the Atonement', detail: 'A. V. Wallenkampf and W. R. Lesher, eds. (1981). Essays by many scholars on the biblical and historical case.', url: wc('Wallenkampf Lesher The Sanctuary and the Atonement') },
  smith: { title: 'Looking Unto Jesus', detail: 'Uriah Smith (1898). Christ in type and antitype, with chapters on the sanctuary and Hebrews.', url: EGW },
  seventy: { title: 'Seventy Weeks, Leviticus, and the Nature of Prophecy', detail: 'Frank B. Holbrook, ed. (1986). Daniel 9, Leviticus 16 and the link between them.', url: wc('Holbrook Seventy Weeks Leviticus Nature of Prophecy') },
} satisfies Record<string, Resource>

export const symbols: SanctuarySymbol[] = [
  {
    id: 'gate',
    name: 'The Gate',
    zone: 'court',
    tagline: 'One way in, and it was the widest opening in the sanctuary.',
    terms: [
      { word: 'מָסָךְ', translit: 'masak', lang: 'Hebrew', meaning: 'A screen or covering. The gate was a hanging curtain, not a door, so anyone could lift it and walk in.' },
      { word: 'חָצֵר', translit: 'chatser', lang: 'Hebrew', meaning: 'An enclosed court or yard. The same word is used for village courtyards, which made the space familiar to ordinary people.' },
      { word: 'θύρα', translit: 'thura', lang: 'Greek', meaning: 'Door. Jesus uses it in John 10:9.' },
    ],
    build: `A woven hanging of blue, purple and scarlet yarn on fine twined linen, the work of an embroiderer, hung on four pillars at the east end of the court (Exodus 27:16). The court around it was fenced with white linen five cubits high, which is above eye level, so the only way to see inside was to come in (Exodus 27:18).`,
    measure: 'Twenty cubits wide, about 30 feet. The tent door and the veil were each ten cubits.',
    service: `Every worshipper came through the same entrance, whether priest or farmer, rich or poor. The gate faced east toward the camp and the sunrise. People entering it turned their backs on the sun, which was a quiet rebuke to the sun worship of Egypt and Canaan (compare Ezekiel 8:16).`,
    christ: `Jesus said, "I am the door: by me if any man enter in, he shall be saved" (John 10:9). There is one gate because there is one way to the Father (John 14:6), but it is twenty cubits wide because the invitation goes to everyone (Matthew 11:28). Many writers have read the four colours as four portraits of Christ, much like the four Gospels: blue for His heavenly origin, purple for His kingship, scarlet for His blood, and white linen for His spotless righteousness (Revelation 19:8).`,
    deeper: [
      `The linen fence set a boundary that taught holiness, and the open gate taught grace. Inside the fence everything was God's ground, and nothing in the camp could cross it on its own terms. Yet the gate was a soft curtain with no lock and no guard.`,
      `The same four materials appear in the gate, the tent door, the veil and the high priest's ephod. As you move inward, the materials do not change. What changes is who may pass. The message is consistent: one Person, approached in stages.`,
    ],
    links: [
      { to: 'veil', text: 'The veil uses the same blue, purple, scarlet and linen. The way in and the way to the throne are the same Christ.' },
      { to: 'altar', text: 'The first thing past the gate is the altar. No one reached the holy things without passing the sacrifice first.' },
    ],
    life: `Nobody had to clean up before coming through this gate. The cleansing happened inside. Come as you are, and come through Christ.`,
    verses: [
      { ref: 'John 10:9', note: 'I am the door' },
      { ref: 'John 14:6', note: 'No man cometh unto the Father, but by me' },
      { ref: 'Exodus 27:16', note: 'The gate described' },
      { ref: 'Psalm 100:4', note: 'Enter into his gates with thanksgiving' },
      { ref: 'Matthew 11:28', note: 'Come unto me' },
      { ref: 'Revelation 19:8', note: 'Fine linen is righteousness' },
    ],
    resources: [R.pp30, R.hardinge, R.haskell],
  },
  {
    id: 'altar',
    name: 'Altar of Burnt Offering',
    zone: 'court',
    tagline: 'The first thing inside the gate is the place of sacrifice.',
    terms: [
      { word: 'מִזְבֵּחַ', translit: 'mizbeach', lang: 'Hebrew', meaning: 'Altar, literally "place of slaughter," from zabach, to slaughter for sacrifice.' },
      { word: 'עֹלָה', translit: 'olah', lang: 'Hebrew', meaning: 'Burnt offering, literally "that which goes up." The whole animal went up to God in smoke. Nothing was kept back.' },
      { word: 'קֶרֶן', translit: 'qeren', lang: 'Hebrew', meaning: 'Horn. A symbol of strength, and in prophecy of a kingdom (Daniel 7:24). Blood on the four horns pointed to salvation offered to every nation.' },
      { word: 'סָמַךְ', translit: 'samak', lang: 'Hebrew', meaning: 'To lean or press. Used for laying a hand on the head of the offering with real weight.' },
      { word: 'חַטָּאת', translit: "chatta't", lang: 'Hebrew', meaning: 'Sin, and also sin offering. The offering carried the name of what it removed.' },
    ],
    build: `The Hebrew word for altar, mizbeach, comes from zabach, "to slaughter": it was literally the place of slaughter. It was built of acacia wood overlaid with bronze (the KJV says "brass"), with a horn at each corner and a bronze grate set halfway down (Exodus 27:1-5). It was the largest piece of furniture in the sanctuary and the only one in the court made for blood and fire.`,
    measure: 'Five cubits square and three cubits high, about 7½ by 7½ by 4½ feet.',
    service: `A person who sinned brought an unblemished animal from his own flock, laid a hand on its head and confessed the sin (Leviticus 5:5). The Hebrew verb for laying on the hand, samak, means to lean or press with your weight. It was a deliberate act, not a light touch. He then killed the animal himself (Leviticus 4:29). The priest put the blood on the horns of the altar and poured the rest at its base. Every morning and evening a lamb was offered for the whole nation as an olah, a burnt offering. The word means "that which goes up," because the whole animal went up to God in smoke and nothing was kept back (Exodus 29:38-42). The fire on the altar was never allowed to go out (Leviticus 6:13).`,
    meaning: {
      title: 'Sin, confession and faith',
      paras: [
        `Scripture defines sin plainly: "sin is the transgression of the law" (1 John 3:4). It is more than a wrong act. It breaks the relationship with God and separates the sinner from Him: "your iniquities have separated between you and your God" (Isaiah 59:2). Every person is caught in it, "for all have sinned, and come short of the glory of God" (Romans 3:23), and its end is death (Romans 6:23). The sanctuary existed because God would not leave His people there.`,
        `Bringing the offering was itself a confession. By leading his animal through the gate, the worshipper admitted that he had broken God's law and that the penalty was death. When he pressed his hand on its head and named his sin aloud, the admission became words. When he took its life with his own hand, it became an act. Repentance, confession and the plea for mercy were all built into the ritual. David knew this was what God was looking for: "The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, thou wilt not despise" (Psalm 51:17).`,
        {
          quote: 'The repentant sinner brought his offering to the door of the tabernacle, and, placing his hand upon the victim\'s head, confessed his sins, thus in figure transferring them from himself to the innocent sacrifice.',
          by: 'Ellen G. White',
          source: 'Patriarchs and Prophets, ch. 30',
        },
        `The animal itself could not save anyone. "It is not possible that the blood of bulls and of goats should take away sins" (Hebrews 10:4). Its value lay in what it pointed to. A worshipper who understood the offering was trusting in the Redeemer God had promised since Eden (Genesis 3:15), "the Lamb slain from the foundation of the world" (Revelation 13:8). That is why Abel's offering is called an act of faith (Hebrews 11:4), and why Jesus said Abraham "rejoiced to see my day" (John 8:56). Believers before the cross were saved the same way believers are now, by grace through faith in Christ. They looked forward to Calvary. We look back to it.`,
        {
          quote: 'Through the shed blood he looked forward to the future sacrifice, Christ dying on the cross of Calvary; and trusting in the atonement that was there to be made, he had witness that he was righteous, and his offering accepted.',
          by: 'Ellen G. White, on Abel',
          source: 'Patriarchs and Prophets, ch. 5',
        },
        `For the same reason, an offering without a changed heart was empty, and the prophets said so bluntly (Isaiah 1:11-17). "For I desired mercy, and not sacrifice; and the knowledge of God more than burnt offerings" (Hosea 6:6). God never wanted the animal for its own sake. He wanted the sinner back.`,
      ],
    },
    christ: `John the Baptist pointed at Jesus and said, "Behold the Lamb of God, which taketh away the sin of the world" (John 1:29). Every animal on this altar was a preview of Calvary. "Without shedding of blood is no remission" (Hebrews 9:22), and Christ "his own self bare our sins in his own body on the tree" (1 Peter 2:24). The laying on of hands is substitution in its plainest form: my sin goes onto Him and His death counts as mine (Isaiah 53:6).`,
    deeper: [
      `The sinner had to take the life himself. The sacrifice was meant to teach what sin costs. As he watched the lamb's life fade away under his own hand, he saw the result of his sin in front of him: an innocent life lost because of what he had done. The sight was meant to convict his heart and bring real sorrow for sin, the "godly sorrow" that "worketh repentance to salvation" (2 Corinthians 7:10). Nobody walked away from this altar thinking sin was a small thing. The cross makes the same point on a larger scale, because our sin is what put Him there, and those who look on Him whom they pierced are moved to mourn (Zechariah 12:10).`,
      {
        quote: 'As he slew the innocent victim, he trembled at the thought that his sin must shed the blood of the spotless Lamb of God.',
        by: 'Ellen G. White, on Adam\'s first sacrifice',
        source: 'Patriarchs and Prophets, ch. 4',
      },
      `The Hebrew word for horn, qeren, also carries the sense of strength and power, and in Bible prophecy a horn stands for a kingdom: "the ten horns out of this kingdom are ten kings" (Daniel 7:24). The number four stands for the whole earth, its four winds and four corners (Daniel 7:2; Isaiah 11:12; Revelation 7:1). When the priest put the blood on the horns at all four corners of the altar (Leviticus 4:30), the act declared that the blood of the sacrifice reaches every kingdom and every direction of the earth. Salvation was never meant for Israel alone: "Look unto me, and be ye saved, all the ends of the earth" (Isaiah 45:22). The same gospel goes "to every nation, and kindred, and tongue, and people" (Revelation 14:6).`,
      `Blood on the horns was not the end of the process. The sin offering is called chatta't in Hebrew, the same word as "sin" itself. The offering bore the name of the very thing it took away. In some sin offerings the blood was carried inside to the holy place, and in others the priest ate part of the flesh and so "bore the iniquity" of the people (Leviticus 10:17; Leviticus 6:26). The priest stood in the place of the Messiah. By eating the flesh of the sin offering he took the sinner's guilt upon himself, a picture of Jesus Christ becoming the sin offering for the guilty. God "hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him" (2 Corinthians 5:21), and "he bare the sin of many" (Isaiah 53:12). Either way the sin was now on record in the sanctuary. The scholar Roy Gane has shown that this is why the sanctuary itself needed cleansing once a year. Forgiveness was real and immediate, but the record remained until the Day of Atonement.`,
      {
        quote: 'The chatta\'t "effected purification from sins (moral faults) and physical ritual impurities."',
        by: 'Roy E. Gane, Old Testament scholar',
        source: '"Atonement: Purification Offering" (2013)',
      },
      `Everything about the altar was oversized: the largest furniture, the hottest fire, the busiest place in the court. The cross is the centre of the plan of salvation, and the altar is the centre of the court.`,
      {
        quote: 'It consumed that which typified sin; and as the fires were continually burning, it has been called the altar of continual atonement.',
        by: 'Stephen N. Haskell',
        source: 'The Cross and Its Shadow (1914), ch. 25',
      },
      `The fire itself carried meaning. It first came from God: when the altar was dedicated, "there came a fire out from before the LORD, and consumed upon the altar the burnt offering" (Leviticus 9:24). Scripture says, "our God is a consuming fire" (Hebrews 12:29; Deuteronomy 4:24). On the altar that fire consumed the offering that carried the sinner's guilt, a picture of God's holiness meeting sin and destroying it. It also points to the end of sin itself. At the close of history death and hell are "cast into the lake of fire" (Revelation 20:14), the wicked become "ashes under the soles of your feet" (Malachi 4:3), and Satan, the originator of sin, is brought "to ashes upon the earth" (Ezekiel 28:18). Then sin is gone for good: "affliction shall not rise up the second time" (Nahum 1:9). The fire that never went out on the altar declared that God will not let sin go on forever, and that He has provided a sacrifice so that the sinner need not be consumed with it.`,
    ],
    links: [
      { to: 'incense', text: 'Coals for the golden altar of incense came only from this altar. Prayer is fuelled by the sacrifice.' },
      { to: 'mercyseat', text: 'On the Day of Atonement blood from the court was carried all the way to the mercy seat. The cross and the judgment are one atonement.' },
      { to: 'laver', text: 'After the altar comes washing. Justification comes before sanctification, never the reverse.' },
    ],
    life: `Forgiveness starts with confession, and confession rests on substitution. He died the death that was mine. The fire never went out, and neither does God's offer of pardon.`,
    verses: [
      { ref: 'John 1:29', note: 'The Lamb of God' },
      { ref: 'Leviticus 4:29', note: 'Hand on the head of the offering' },
      { ref: 'Hebrews 9:22', note: 'No remission without blood' },
      { ref: '1 Peter 2:24', note: 'Bare our sins on the tree' },
      { ref: 'Isaiah 53:6', note: 'The iniquity of us all' },
      { ref: 'Leviticus 6:13', note: 'The fire shall ever be burning' },
      { ref: 'Hebrews 12:29', note: 'Our God is a consuming fire' },
      { ref: 'Revelation 20:14', note: 'The lake of fire' },
      { ref: 'Leviticus 17:11', note: 'The life is in the blood' },
      { ref: 'Exodus 27:1-2', note: 'The altar described' },
    ],
    resources: [R.pp30, R.gane, R.andreasen],
  },
  {
    id: 'laver',
    name: 'The Laver',
    zone: 'court',
    tagline: 'Before a priest could serve, he had to be washed.',
    terms: [
      { word: 'כִּיּוֹר', translit: 'kiyyor', lang: 'Hebrew', meaning: 'Basin. The same word is used for the great bronze basins of Solomon\'s temple.' },
      { word: 'נְחֹשֶׁת', translit: 'nechoshet', lang: 'Hebrew', meaning: 'Bronze or copper, the metal of the court. The KJV says "brass."' },
      { word: 'מַרְאֹת', translit: "mar'ot", lang: 'Hebrew', meaning: 'Mirrors, from ra\'ah, to see. The KJV calls them "lookingglasses" (Exodus 38:8).' },
      { word: 'רָחַץ', translit: 'rachats', lang: 'Hebrew', meaning: 'To wash or bathe. The verb used for the priests washing at the laver (Exodus 30:19).' },
      { word: 'λουτρόν', translit: 'loutron', lang: 'Greek', meaning: 'A washing or bath. Paul uses it for the "washing of regeneration" (Titus 3:5) and the "washing of water by the word" (Ephesians 5:26).' },
    ],
    build: `The Hebrew name, kiyyor, simply means a basin. This one was a bronze basin set on a bronze stand, both made of nechoshet, the same metal as the altar, and it stood between the altar and the door of the tent (Exodus 30:18). It was made from the mar'ot, the polished bronze mirrors, of the women who served at the entrance of the tabernacle (Exodus 38:8). Scripture gives no dimensions for it, which makes it the only piece of furniture in the sanctuary whose size is never stated.`,
    service: `The verb Scripture uses for this washing is rachats, which means to wash or bathe. Each time the priests went into the tent or came near the altar to minister, they washed their hands and feet at the laver, "that they die not" (Exodus 30:18-21). At their ordination they had been washed all over a single time (Exodus 29:4), and from then on only their hands and feet needed washing whenever they served.`,
    meaning: {
      title: 'Cleansing, baptism and the new life',
      paras: [
        `Where the altar dealt with the sinner's guilt, the laver dealt with his defilement. A worshipper was forgiven at the altar, and a forgiven priest was then made clean for service at the laver. Scripture keeps these two works together and always in that order: "but ye are washed, but ye are sanctified, but ye are justified in the name of the Lord Jesus, and by the Spirit of our God" (1 Corinthians 6:11). Justification is what God declares about us when we believe, while sanctification is what He goes on to do in us, and that second work continues for the rest of our lives.`,
        `The full washing that each priest received at his ordination happened only once, and it corresponds to baptism. Ananias told Paul, "Arise, and be baptized, and wash away thy sins, calling on the name of the Lord" (Acts 22:16). Baptism by immersion pictures a death and a resurrection, because "we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life" (Romans 6:4). Jesus had taught Nicodemus the same truth in different words when He said, "Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God" (John 3:5).`,
        {
          quote: 'As the people in the court beheld the priests wash in the water before they performed the work of the holy office … may it not have taught them the truth that Christ gave to Nicodemus, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God?',
          by: 'Stephen N. Haskell',
          source: 'The Cross and Its Shadow (1914), ch. 25',
        },
        `Once that first washing was complete, the priests washed only their hands and feet, but they did so every time they ministered. The hands represent what a person does, and the feet represent where he goes, which is why David asked, "Who shall ascend into the hill of the LORD? or who shall stand in his holy place? He that hath clean hands, and a pure heart" (Psalm 24:3-4). Jesus drew the same distinction when He washed His disciples' feet and told Peter, "He that is washed needeth not save to wash his feet, but is clean every whit" (John 13:10). In the same way, a believer who stumbles does not need to be baptized again, but he does need daily cleansing, and God has promised it: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness" (1 John 1:9).`,
        `This daily cleansing comes through the Word of God and the work of the Holy Spirit. Paul says that Christ cleanses His church "with the washing of water by the word" (Ephesians 5:26), and Jesus told His disciples, "Now ye are clean through the word which I have spoken unto you" (John 15:3). In Titus 3:5 Paul uses the Greek word loutron, which means a bath and carries the very idea of the laver, and he joins it to the "renewing of the Holy Ghost." God had promised this cleansing centuries earlier through Ezekiel: "Then will I sprinkle clean water upon you, and ye shall be clean … A new heart also will I give you, and a new spirit will I put within you" (Ezekiel 36:25-26).`,
        `God attached a serious warning to the laver, since a priest who ministered without washing would die (Exodus 30:20-21). Through that warning He taught that holiness is not optional for those who serve Him, a truth the New Testament repeats: "Follow peace with all men, and holiness, without which no man shall see the Lord" (Hebrews 12:14). The same God who forgives freely at the altar also transforms the people He forgives.`,
        {
          quote: 'Death was the penalty for performing service at the altar or within the tabernacle without first washing in the laver.',
          by: 'Stephen N. Haskell',
          source: 'The Cross and Its Shadow (1914), ch. 25',
        },
      ],
    },
    christ: `The laver represents the cleansing that Christ gives to those He has already forgiven. Paul calls it the "washing of regeneration, and renewing of the Holy Ghost" (Titus 3:5), and the word he uses for washing, loutron, is the word for a bath. The single full washing at ordination corresponds to baptism, which takes place once (Acts 22:16), while the daily washing of hands and feet corresponds to what Jesus told Peter: "He that is washed needeth not save to wash his feet" (John 13:10).`,
    deeper: [
      `It is fitting that the laver was made from mirrors. These mar'ot had been the women's own looking glasses, used to check their appearance, and they gave them up so that a vessel for cleansing could be made. James compares God's Word to a mirror that shows a person what he really looks like (James 1:23-25), so the laver taught that we must first see ourselves honestly before we can be washed. Paul carries the picture further when he writes, "we all, with open face beholding as in a glass the glory of the Lord, are changed into the same image from glory to glory, even as by the Spirit of the Lord" (2 Corinthians 3:18). A mirror that once reflected self now reflects Christ, and as we look at Him we are changed into His likeness.`,
      {
        quote: 'Between the altar and the door of the tabernacle was the laver, which was also of brass, made from the mirrors that had been the freewill offering of the women of Israel.',
        by: 'Ellen G. White',
        source: 'Patriarchs and Prophets, ch. 30',
      },
      `The laver was made of nechoshet, the same bronze as the altar, and bronze was the metal of the court, where sin was dealt with openly before God and the people. Because the laver stood in that same open court, it showed that God's provision for cleansing is not hidden or reserved for a few. It is offered to everyone who has been forgiven.`,
      `Because Scripture gives the laver no dimensions, many readers have seen in it a sign that God's cleansing has no measured limit. That is a devotional reading rather than a stated teaching, but it agrees with the promise of Isaiah: "though your sins be as scarlet, they shall be as white as snow" (Isaiah 1:18).`,
      `The order of the furniture also carries a lesson. The worshipper came to the altar before he came to the laver, because no one can wash his way into forgiveness; it is the forgiven who are then washed. In the same way, no priest could pass the laver and enter the holy place unwashed, which shows that the daily life of the believer, pictured inside the tent, is meant to begin clean.`,
    ],
    links: [
      { to: 'altar', text: 'It stands right after the altar: pardon first, then cleansing.' },
      { to: 'tent', text: 'Nobody entered the tent unwashed. Sanctification is the threshold of the holy place.' },
    ],
    life: `When you read God's Word honestly, it will show you yourself as you really are. Let that lead you to Christ, who washes you first in baptism and then keeps cleansing you every day as you confess your sins and walk with Him.`,
    verses: [
      { ref: 'Exodus 30:18-20', note: 'Wash, that they die not' },
      { ref: 'Exodus 38:8', note: 'Made of the women\'s lookingglasses' },
      { ref: 'Titus 3:5', note: 'Washing of regeneration' },
      { ref: 'Ephesians 5:26', note: 'Washing of water by the word' },
      { ref: 'Acts 22:16', note: 'Be baptized, and wash away thy sins' },
      { ref: 'John 13:10', note: 'Needeth not save to wash his feet' },
      { ref: 'James 1:23-25', note: 'The mirror of the word' },
      { ref: 'Romans 6:4', note: 'Buried with him by baptism' },
      { ref: 'John 3:5', note: 'Born of water and of the Spirit' },
      { ref: '1 John 1:9', note: 'To cleanse us from all unrighteousness' },
      { ref: '2 Corinthians 3:18', note: 'Beholding as in a glass' },
    ],
    resources: [R.pp30, R.hardinge, R.haskell],
  },
  {
    id: 'tent',
    name: 'The Tent and Its Door',
    zone: 'holy',
    tagline: 'God came to live in the middle of His people\'s camp.',
    terms: [
      { word: 'מִשְׁכָּן', translit: 'mishkan', lang: 'Hebrew', meaning: 'Dwelling place, from shakan, to dwell or settle. The later word Shekinah, for God\'s visible glory, comes from the same root.' },
      { word: 'אֹהֶל מוֹעֵד', translit: "ohel mo'ed", lang: 'Hebrew', meaning: 'Tent of meeting: the place of appointed meetings between God and His people.' },
      { word: 'תַּבְנִית', translit: 'tabnit', lang: 'Hebrew', meaning: 'Pattern, model or copy (Exodus 25:9). It assumes an original that already exists.' },
      { word: 'קְרָשִׁים', translit: 'qerashim', lang: 'Hebrew', meaning: 'Boards or frames: the upright acacia panels that formed the walls.' },
      { word: 'אֲדָנִים', translit: 'adanim', lang: 'Hebrew', meaning: 'Sockets or bases. The boards stood in silver adanim.' },
      { word: 'כֹּפֶר', translit: 'kopher', lang: 'Hebrew', meaning: 'Ransom or atonement price, from the same root as kaphar, to atone (Exodus 30:12).' },
      { word: 'ἐσκήνωσεν', translit: 'eskēnōsen', lang: 'Greek', meaning: '"He tabernacled" or "pitched His tent," the verb in John 1:14.' },
    ],
    build: `The walls were made of forty-eight qerashim, upright boards of acacia wood overlaid with gold, with twenty on the south side, twenty on the north and eight across the west end (Exodus 26:15-25). Each board stood on two silver adanim, or sockets, and five bars ran through gold rings along each wall, with the middle bar passing through the boards from end to end (Exodus 26:26-28). Four layers covered the frame, and a hanging of blue, purple, scarlet and fine linen on five gold-covered pillars formed the door at the east end (Exodus 26:36-37).`,
    measure: 'About 30 by 10 cubits (45 by 15 feet). The holy place took 20 cubits of that length, and the most holy place was a 10-cubit cube.',
    service: `Two names describe what this tent was for. It was the mishkan, the dwelling place, because God said, "Let them make me a sanctuary; that I may dwell among them" (Exodus 25:8). It was also the ohel mo'ed, the tent of meeting, because there He promised to meet with His people and speak with them (Exodus 29:42-43). Only the priests passed through the door, but the whole camp lived around it, and when the tent was finished, "the glory of the LORD filled the tabernacle" (Exodus 40:34). Because it was built to be taken apart and carried, God's presence went with Israel wherever the cloud led them (Exodus 40:36-38).`,
    meaning: {
      title: 'God dwelling with His people',
      paras: [
        `From the beginning God's purpose has been to live with the people He made. In Eden He walked with Adam and Eve, but sin drove them from His presence (Genesis 3:8, 23-24). The tabernacle was His way of coming near again, so that a holy God could dwell in the middle of a sinful camp without consuming it. The whole story of Scripture moves toward the day when that separation ends for good, when John hears a voice saying, "Behold, the tabernacle of God is with men, and he will dwell with them" (Revelation 21:3).`,
        `Moses did not design this tent himself. God told him to build it "after the pattern of the tabernacle" that he was shown on the mountain (Exodus 25:9, 40). The Hebrew word for pattern, tabnit, means a model or copy, and it assumes that an original already existed. Hebrews explains that the priests on earth served "unto the example and shadow of heavenly things" (Hebrews 8:5), and that Christ has entered "not into the holy places made with hands, which are the figures of the true; but into heaven itself, now to appear in the presence of God for us" (Hebrews 9:24). For that reason the earthly tent, with its two rooms and its daily and yearly services, gives us a true picture of what Christ is doing in heaven now.`,
        {
          quote: 'The sanctuary in heaven, in which Jesus ministers in our behalf, is the great original, of which the sanctuary built by Moses was a copy.',
          by: 'Ellen G. White',
          source: 'The Great Controversy, ch. 23',
        },
        `The tent also pointed to the coming of Christ in the flesh. John writes, "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth" (John 1:14). The verb he chose, eskēnōsen, means "He pitched His tent," so the glory that once filled the mishkan came to live in a human body. Many writers have also seen in the boards themselves a picture of Christ's two natures: acacia, a hardy desert wood, overlaid with pure gold, just as His true humanity was joined to full divinity, for "in him dwelleth all the fulness of the Godhead bodily" (Colossians 2:9). That reading is devotional rather than directly stated in Scripture, but it fits the way the New Testament speaks of Him.`,
        `The whole building stood on redemption. Every man counted in Israel paid half a shekel of silver as "a ransom for his soul unto the LORD" (Exodus 30:12), and the Hebrew word for that ransom, kopher, comes from the same root as the word for atonement. From that silver the hundred sockets of the sanctuary were cast, "a talent for a socket" (Exodus 38:25-27). The boards did not rest on desert sand but on the price of redemption, just as believers stand on the fact that they were "not redeemed with corruptible things, as silver and gold … but with the precious blood of Christ" (1 Peter 1:18-19).`,
        {
          quote: 'The walls consisted of upright boards, set in silver sockets, and held firm by pillars and connecting bars; and all were overlaid with gold, giving to the building the appearance of solid gold.',
          by: 'Ellen G. White',
          source: 'Patriarchs and Prophets, ch. 30',
        },
        `What was true of the tent is now true of God's people. Paul tells believers, "Know ye not that ye are the temple of God, and that the Spirit of God dwelleth in you?" (1 Corinthians 3:16). He describes the church as a building "fitly framed together" that grows "unto an holy temple in the Lord," in whom believers "are builded together for an habitation of God through the Spirit" (Ephesians 2:21-22). Like the boards held together by the bars and resting on the silver, each believer stands on the same redemption and is joined to the others so that God may live among them.`,
      ],
    },
    christ: `"The Word was made flesh, and dwelt among us" (John 1:14), and John's word for "dwelt" means that Christ pitched His tent among us. Like the tabernacle, Jesus had nothing on the outside to attract attention (Isaiah 53:2), yet the glory of God lived within Him. Hebrews adds that the earthly tent was a copy of "the true tabernacle, which the Lord pitched, and not man," where Christ now ministers as our High Priest (Hebrews 8:1-5).`,
    deeper: [
      `The four layers of covering each carried meaning, and Scripture names them from the inside out. The innermost layer was fine linen in blue, purple and scarlet, with cherubim woven into it, and Exodus calls this layer itself "the tabernacle," the mishkan (Exodus 26:1). Over it lay curtains of goats' hair, which the Hebrew text calls an ohel, a tent, spread over the mishkan (Exodus 26:7). Above those came rams' skins dyed red, and on the very outside a durable covering of skins (Exodus 26:14). The ram was the animal of substitution, offered in Isaac's place (Genesis 22:13), and the red skins wrapped the dwelling of God in the color of sacrifice. The plain outer layer, which was all a passerby ever saw, recalls the Messiah who had "no form nor comeliness" (Isaiah 53:2), while the beauty of the inner layer was seen only by those who came inside.`,
      {
        quote: 'The different colors in the coverings, blending with the golden wall and the gorgeous entrance curtain, or veil, as it was called, combined to make a structure of surpassing glory.',
        by: 'Stephen N. Haskell',
        source: 'The Cross and Its Shadow (1914), ch. 2',
      },
      `The door hanging marked the move from the court into the holy place, and the materials change at that point. The pillars of the court gate stood in bronze, and the five pillars of the tent door also stood in bronze sockets, but beyond the door everything was overlaid with gold and stood on silver (Exodus 26:37). The worshipper who had been forgiven at the bronze altar and washed at the bronze laver now stepped into a room of gold, a picture of the life of fellowship with God that follows forgiveness and cleansing.`,
      `There were no windows in the tent. The only light inside came from the golden lampstand, the only food came from the table of shewbread, and the only fragrance came from the altar of incense. Everything the priest needed inside the holy place, God Himself supplied, which is a fitting picture of the believer's daily life with Christ.`,
    ],
    links: [
      { to: 'veil', text: 'Inside, the tent was split in two by the veil, giving two rooms and two phases of ministry.' },
      { to: 'lampstand', text: 'There were no windows. All the light inside came from the lampstand.' },
    ],
    life: `God still wants to live with His people. Your body is a temple of the Holy Spirit (1 Corinthians 6:19), the church is His dwelling place (Ephesians 2:22), and the God who walked with Israel through the wilderness goes with you wherever you go.`,
    verses: [
      { ref: 'Exodus 25:8-9', note: 'That I may dwell among them' },
      { ref: 'John 1:14', note: 'Dwelt among us' },
      { ref: 'Hebrews 8:1-2', note: 'The true tabernacle' },
      { ref: 'Hebrews 8:5', note: 'Example and shadow of heavenly things' },
      { ref: 'Isaiah 53:2', note: 'No form nor comeliness' },
      { ref: 'Revelation 21:3', note: 'The tabernacle of God is with men' },
      { ref: '1 Corinthians 6:19', note: 'Your body is the temple' },
      { ref: 'Exodus 40:34', note: 'The glory of the LORD filled the tabernacle' },
      { ref: 'Exodus 38:25-27', note: 'A talent for a socket' },
      { ref: 'Ephesians 2:21-22', note: 'An habitation of God' },
    ],
    resources: [R.pp30, R.gc23, R.haskell, R.davidson],
  },
  {
    id: 'table',
    name: 'Table of Shewbread',
    zone: 'holy',
    tagline: 'Bread that was always in God\'s presence.',
    terms: [
      { word: 'שֻׁלְחָן', translit: 'shulchan', lang: 'Hebrew', meaning: 'Table. It is the ordinary word for a dining table, a place where people eat together.' },
      { word: 'לֶחֶם הַפָּנִים', translit: 'lechem ha-panim', lang: 'Hebrew', meaning: 'Shewbread, literally "bread of the face," meaning bread set before God\'s face, in His presence.' },
      { word: 'חַלּוֹת', translit: 'challot', lang: 'Hebrew', meaning: 'Cakes or loaves (Leviticus 24:5). Each was made of two tenth deals of fine flour.' },
      { word: 'זֵר', translit: 'zer', lang: 'Hebrew', meaning: 'Crown or rim. A raised gold border ran around the top of the table (Exodus 25:24).' },
      { word: 'לְבֹנָה', translit: 'levonah', lang: 'Hebrew', meaning: 'Frankincense, from lavan, white, for the pale color of the resin.' },
      { word: 'אַזְכָּרָה', translit: 'azkarah', lang: 'Hebrew', meaning: 'Memorial portion: the part burned to God as a reminder (Leviticus 24:7).' },
      { word: 'πρόθεσις', translit: 'prothesis', lang: 'Greek', meaning: '"A setting forth." Hebrews 9:2 calls the shewbread the bread of the setting forth.' },
    ],
    build: `The word for this piece of furniture, shulchan, is the ordinary Hebrew word for a dining table. It was made of acacia wood overlaid with pure gold, with a zer, a raised crown of gold, running around its top, and a border a handbreadth wide that had its own crown as well (Exodus 25:23-25). Gold rings and gold-covered poles were fixed to it for carrying, and its dishes, spoons, covers and bowls were all made of pure gold (Exodus 25:26-29). It stood on the north side of the holy place, on the right of a priest as he walked in (Exodus 40:22).`,
    measure: 'Two cubits long, one cubit wide and one and a half cubits high (about 3 by 1½ by 2¼ feet).',
    service: `Twelve challot, or loaves, were baked from fine flour and set on the table in two rows of six (Leviticus 24:5-6). Pure levonah, frankincense, was placed on each row as an azkarah, a memorial portion offered to the LORD (Leviticus 24:7). Every Sabbath the priests set out fresh bread, and they ate the old loaves in the holy place, because the bread was counted most holy (Leviticus 24:8-9). In this way the table was never empty, since the command was to keep the bread before the LORD "alway" (Exodus 25:30).`,
    meaning: {
      title: 'Bread from God and life before His face',
      paras: [
        `The Hebrew name lechem ha-panim means "bread of the face," which is to say bread that lay continually before the face of God. There were twelve loaves, one for each tribe of Israel, and every tribe had its loaf no matter how large or small it was. Week after week the whole nation was represented on that table, kept in God's sight and remembered before Him. Paul draws a similar picture of the church when he writes, "For we being many are one bread, and one body: for we are all partakers of that one bread" (1 Corinthians 10:17).`,
        `The bread also taught that Israel lived on what God provided. In the wilderness He had fed them with manna for forty years, so that they would learn "that man doth not live by bread only, but by every word that proceedeth out of the mouth of the LORD doth man live" (Deuteronomy 8:3). The table carried that lesson into the sanctuary, where it stood every day of the year as a confession that both daily food and spiritual life come from God.`,
        {
          quote: 'The showbread was kept ever before the Lord as a perpetual offering. Thus it was a part of the daily sacrifice. It was called showbread, or "bread of the presence," because it was ever before the face of the Lord. It was an acknowledgment of man\'s dependence upon God for both temporal and spiritual food, and that it is received only through the mediation of Christ.',
          by: 'Ellen G. White',
          source: 'Patriarchs and Prophets, p. 354',
        },
        `Jesus applied the meaning of this bread to Himself. After feeding the five thousand He said, "I am the bread of life: he that cometh to me shall never hunger" (John 6:35), and He added, "I am the living bread which came down from heaven: if any man eat of this bread, he shall live for ever" (John 6:51). The manna in the wilderness and the bread on the table both pointed to Him. Because He is also the living Word, feeding on Christ means taking in His Word, as Jeremiah did when he said, "Thy words were found, and I did eat them; and thy word was unto me the joy and rejoicing of mine heart" (Jeremiah 15:16).`,
        {
          quote: 'Both the manna and the showbread pointed to Christ, the living Bread, who is ever in the presence of God for us.',
          by: 'Ellen G. White',
          source: 'Patriarchs and Prophets, p. 354',
        },
        `The bread was renewed on the Sabbath, and the text calls the arrangement "an everlasting covenant" (Leviticus 24:8). The Hebrew phrase there, berit olam, is the same one God uses for the Sabbath itself, which the KJV renders "a perpetual covenant" (Exodus 31:16). By tying the fresh bread to the seventh day, God joined the rest He gave at creation to the daily nourishment He gives in the sanctuary. The priests ate the old loaves during the week that followed, so the bread set out on one Sabbath sustained them until the next. In the same way, the Sabbath is God's weekly invitation to come before His face and be fed, so that we can carry that strength into the days ahead.`,
        {
          quote: 'As the priests ate the bread prepared the Sabbath before, they assimilated it, and thus received strength for daily duties.',
          by: 'Stephen N. Haskell',
          source: 'The Cross and Its Shadow (1914), ch. 6',
        },
        `Finally, the table was a place of fellowship. The priests did not simply look at the bread; they ate it in the holy place, in the presence of God, as guests at His table. Christ offers the same fellowship to every believer when He says, "Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me" (Revelation 3:20).`,
      ],
    },
    christ: `Jesus said, "I am the bread of life: he that cometh to me shall never hunger" (John 6:35). He is also the living Word, and "man shall not live by bread alone, but by every word that proceedeth out of the mouth of God" (Matthew 4:4). The twelve loaves show the whole nation, every tribe, kept continually before God and fed by Him, and Hebrews 9:2 names the bread with the Greek word prothesis, the bread that was "set forth" before Him.`,
    deeper: [
      `Before grain becomes bread it must be crushed and then baked in the fire. In the same way, Christ was "bruised for our iniquities" (Isaiah 53:5) before He could become bread for the world, and He described His own death in those terms when He said, "Except a corn of wheat fall into the ground and die, it abideth alone: but if it die, it bringeth forth much fruit" (John 12:24).`,
      `The levonah placed on each row was burned as the azkarah, the memorial portion, when the loaves were changed (Leviticus 24:7). The bread fed the priests, while its fragrance went up to God. Feeding on God's Word and lifting our praise and prayer to Him belong together in the same way.`,
      `The table stood directly across the room from the golden lampstand, so the light of the seven lamps always fell on the bread. The Word is understood when the Spirit gives light, and David prayed for exactly that: "Open thou mine eyes, that I may behold wondrous things out of thy law" (Psalm 119:18).`,
      `When David was fleeing from Saul, the priest at Nob gave him the shewbread because there was no other food (1 Samuel 21:6). Jesus later used that story to show that God's ordinances were given to serve human need and to reveal His mercy (Matthew 12:3-4, 7). The bread of God's presence was always meant to sustain life.`,
    ],
    links: [
      { to: 'ark', text: 'A golden pot of manna, the bread from heaven, was kept with the ark. Both tables feed God\'s people with bread He provides.' },
      { to: 'lampstand', text: 'The lampstand stood directly opposite and shone on the table. The Word is understood by the light of the Spirit.' },
    ],
    life: `Come to God's table every day by taking time with His Word, and come before His face each Sabbath to be renewed. The bread is always set out, and Christ Himself invites you to eat with Him.`,
    verses: [
      { ref: 'John 6:35', note: 'The bread of life' },
      { ref: 'Matthew 4:4', note: 'Every word of God' },
      { ref: 'Leviticus 24:5-9', note: 'Twelve cakes, renewed every Sabbath' },
      { ref: 'Exodus 25:30', note: 'Shewbread before me alway' },
      { ref: 'Jeremiah 15:16', note: 'Thy words were found, and I did eat them' },
      { ref: 'John 6:51', note: 'The living bread from heaven' },
      { ref: 'Deuteronomy 8:3', note: 'Not by bread only' },
      { ref: '1 Corinthians 10:17', note: 'We being many are one bread' },
      { ref: 'Revelation 3:20', note: 'I will sup with him' },
    ],
    resources: [R.pp30, R.haskell, R.hardinge, R.andreasen],
  },
  {
    id: 'lampstand',
    name: 'The Golden Candlestick',
    zone: 'holy',
    tagline: 'The only light inside the tent.',
    terms: [
      { word: 'מְנוֹרָה', translit: 'menorah', lang: 'Hebrew', meaning: 'Lampstand. It held oil lamps, not candles. "Candlestick" is the 1611 English word.' },
      { word: 'מִקְשָׁה', translit: 'miqshah', lang: 'Hebrew', meaning: 'Hammered or beaten work: shaped from one piece of metal by blows of the hammer (Exodus 25:31).' },
      { word: 'שָׁקֵד', translit: 'shaqed', lang: 'Hebrew', meaning: 'Almond. The cups were shaped like almond blossoms. The word sounds like shoqed, "watching," a play on words God uses in Jeremiah 1:11-12.' },
      { word: 'כָּתִית', translit: 'katit', lang: 'Hebrew', meaning: 'Beaten or crushed. The lamp oil was olive oil from crushed olives (Exodus 27:20).' },
      { word: 'תָּמִיד', translit: 'tamid', lang: 'Hebrew', meaning: 'Continually, regularly. The lamps were to burn tamid before the LORD (Leviticus 24:2).' },
      { word: 'λυχνία', translit: 'luchnia', lang: 'Greek', meaning: 'Lampstand, the word used in Revelation 1:12-20.' },
    ],
    build: `The menorah was not cast in a mold or pieced together. It was miqshah, hammered work, beaten out of a single talent of pure gold, about seventy-five pounds (Exodus 25:31, 39). From its central shaft three branches curved out on each side, and the shaft and branches were decorated with cups shaped like shaqed, almond blossoms, each with a knob and a flower (Exodus 25:32-34). Its seven lamps, its tongs and its snuff dishes were all of pure gold (Exodus 25:37-38). It stood on the south side of the holy place, across the room from the table of shewbread (Exodus 40:24).`,
    measure: 'One talent of gold, roughly 75 pounds. No height is given.',
    service: `The lamps burned "pure oil olive beaten for the light, to cause the lamps to burn continually" (Leviticus 24:2). The oil was katit, beaten from the olives rather than squeezed out in a press, which gave the purest oil and the clearest flame. Aaron trimmed the lamps every morning and lit them again at evening, at the same hours he burned the incense, so that the light burned tamid, continually, before the LORD (Exodus 30:7-8; Leviticus 24:3). The lamps were set to "give light over against" the candlestick (Exodus 25:37; Numbers 8:2), so their light fell across the room onto the table and the altar.`,
    meaning: {
      title: 'Light in God\'s house',
      paras: [
        `The holy place had no windows. Its walls were gold-covered boards, and over them hung four layers of curtains and skins, so no daylight could come in. Without the menorah the priests would have been working in complete darkness, unable to see the bread on the table or the altar where they offered incense. In the same way, no one can see the things of God by their own light. Paul says that God, "who commanded the light to shine out of darkness, hath shined in our hearts, to give the light of the knowledge of the glory of God in the face of Jesus Christ" (2 Corinthians 4:6).`,
        {
          quote: 'There being no windows in the tabernacle, the lamps were never all extinguished at one time, but shed their light by day and by night.',
          by: 'Ellen G. White',
          source: 'Patriarchs and Prophets, p. 348',
        },
        `That light points first to Christ. Jesus said, "I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life" (John 8:12), and John calls Him "the true Light, which lighteth every man that cometh into the world" (John 1:9). The light also reaches us through His Word, which the psalmist calls "a lamp unto my feet, and a light unto my path" (Psalm 119:105). Yet a lamp gives no light without oil, and throughout Scripture oil stands for the Holy Spirit. Zechariah saw a golden candlestick fed by two olive trees and was told what it meant: "Not by might, nor by power, but by my spirit, saith the LORD of hosts" (Zechariah 4:6). Revelation shows the same picture in heaven, where "seven lamps of fire" burn before the throne, "which are the seven Spirits of God" (Revelation 4:5). Seven is the number of completeness, so the seven lamps show the Spirit's work in its fullness.`,
        {
          quote: 'By the lamps is represented the Word of God. The psalmist says, "Thy word is a lamp unto my feet, and a light unto my path." The oil is a symbol of the Holy Spirit.',
          by: 'Ellen G. White',
          source: 'Christ\'s Object Lessons, pp. 406-407',
        },
        `The lampstand also stands for the church. When Jesus appeared to John on Patmos, He was walking among seven golden lampstands, and He explained that "the seven candlesticks which thou sawest are the seven churches" (Revelation 1:20). The Greek word there is luchnia, a lampstand. The church does not produce its own light; it holds up the light of Christ in a dark world. That is why Jesus could say to His followers, "Ye are the light of the world" (Matthew 5:14), and then add, "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven" (Matthew 5:16).`,
        {
          quote: 'The lamps in the earthly sanctuary were to burn continually. So the Christian is ever to let the Spirit of God rule in his life, and thus shed its light abroad.',
          by: 'Stephen N. Haskell',
          source: 'The Cross and Its Shadow (1914), ch. 5',
        },
        `The way the menorah was made carries its own lesson. Every flower and cup was formed by the hammer, blow after blow, from one solid piece of gold. Haskell saw in this a picture of how God shapes His people. Peter tells believers to "think it not strange concerning the fiery trial which is to try you" (1 Peter 4:12), because the blows that seem hard are part of the work that forms a light-bearer.`,
        {
          quote: 'It took many a hard and skilful blow to form those delicate flowers and bowls; but the candlestick was to be made after the heavenly model to teach heavenly lessons to mankind.',
          by: 'Stephen N. Haskell',
          source: 'The Cross and Its Shadow (1914), ch. 5',
        },
        `Finally, the lamps needed daily care. The high priest trimmed the wicks, cleaned away what had burned, and filled them with fresh oil every morning and evening. In Revelation, Christ is described as the one "who walketh in the midst of the seven golden candlesticks" (Revelation 2:1), still tending His churches as a priest tends the lamps. He trims what burns dim, and He supplies the oil of His Spirit so that the light does not go out. The parable of the ten virgins makes the same point, for the wise ones were ready because they "took oil in their vessels with their lamps" (Matthew 25:4).`,
        {
          quote: 'Christ is in the midst of the seven golden candlesticks, walking from church to church, from congregation to congregation, from heart to heart.',
          by: 'Ellen G. White',
          source: 'The Upward Look, p. 207',
        },
      ],
    },
    christ: `Jesus is "the light of the world" (John 8:12). The oil stands for the Holy Spirit, as Zechariah was told: "Not by might, nor by power, but by my spirit" (Zechariah 4:6), and the seven lamps match the "seven Spirits of God" before the throne (Revelation 4:5). In Revelation 1, John sees Jesus in priestly robes walking among seven golden lampstands, which He says are His churches (Revelation 1:12-13; Revelation 1:20). This means the opening scene of Revelation is set in the holy place of the heavenly sanctuary.`,
    deeper: [
      `Because the menorah was beaten from one piece, its branches had no light and no life apart from the central shaft. That is the relationship Jesus described when He said, "I am the vine, ye are the branches," and added, "without me ye can do nothing" (John 15:5).`,
      `The almond is the first tree to blossom in Israel, flowering while everything else is still bare. When God showed Jeremiah an almond branch, He explained the sign with a play on words: shaqed, almond, sounds like shoqed, watching, "for I will hasten my word to perform it" (Jeremiah 1:11-12). Aaron's dead rod also budded, blossomed and bore almonds overnight to show whom God had chosen as priest (Numbers 17:8). The almond blossoms on the menorah carry both ideas into the holy place: God watches over His word, and He brings life out of death.`,
      `The oil itself came from olives that were crushed. The garden where Jesus prayed on the night He was betrayed was called Gethsemane, a name usually explained as "oil press." There He was crushed under the weight of the world's sin, and from His suffering came the gift of the Spirit to His church.`,
      `The same priest who trimmed the lamps also burned the incense, at the same hours of the day (Exodus 30:7-8). Light and prayer were tended together, and the believer's life needs both the Spirit's light and daily prayer.`,
    ],
    links: [
      { to: 'table', text: 'It shone across the room onto the bread. Light and food, Spirit and Word.' },
      { to: 'ark', text: 'Aaron\'s almond rod was kept with the ark. The almond blossoms on the lampstand repeat the sign of the true priesthood.' },
      { to: 'incense', text: 'Lamps were trimmed at the same hours the incense was burned (Exodus 30:7-8).' },
    ],
    life: `Christ calls you the light of the world, but the light is always His. Your lamp keeps burning as long as you stay joined to Him and let His Spirit fill you day by day.`,
    verses: [
      { ref: 'John 8:12', note: 'I am the light of the world' },
      { ref: 'Matthew 5:14-16', note: 'Ye are the light of the world' },
      { ref: 'Revelation 4:5', note: 'Seven lamps, seven Spirits' },
      { ref: 'Revelation 1:12-13', note: 'Christ among the candlesticks' },
      { ref: 'Zechariah 4:6', note: 'By my spirit' },
      { ref: 'Exodus 27:20', note: 'Pure oil olive beaten' },
      { ref: 'Numbers 17:8', note: 'Aaron\'s rod yielded almonds' },
      { ref: 'Psalm 119:105', note: 'A lamp unto my feet' },
      { ref: 'Leviticus 24:2-4', note: 'Lamps to burn continually' },
      { ref: 'John 1:9', note: 'The true Light' },
      { ref: 'Revelation 1:20', note: 'The candlesticks are the churches' },
      { ref: '2 Corinthians 4:6', note: 'Light out of darkness' },
      { ref: 'Matthew 25:1-13', note: 'Oil in their vessels' },
      { ref: 'Jeremiah 1:11-12', note: 'The almond branch' },
    ],
    resources: [R.pp30, R.haskell, R.hardinge],
  },
  {
    id: 'incense',
    name: 'Altar of Incense',
    zone: 'holy',
    tagline: 'Prayer that reaches past the veil.',
    terms: [
      { word: 'קְטֹרֶת', translit: 'qetoret', lang: 'Hebrew', meaning: 'Incense, from a root meaning to make smoke rise. It is what goes up from the altar.' },
      { word: 'תָּמִיד', translit: 'tamid', lang: 'Hebrew', meaning: 'Continual or perpetual. Exodus 30:8 calls it a "perpetual incense," and the same word describes the daily sacrifice.' },
      { word: 'מְמֻלָּח', translit: 'memullach', lang: 'Hebrew', meaning: 'Salted. The KJV translates it "tempered together" in Exodus 30:35. Salt was the sign of a covenant that does not spoil.' },
      { word: 'אֵשׁ זָרָה', translit: 'esh zarah', lang: 'Hebrew', meaning: '"Strange fire": fire that God had not commanded, which Nadab and Abihu offered (Leviticus 10:1).' },
      { word: 'θυμίαμα', translit: 'thumiama', lang: 'Greek', meaning: 'Incense, the word used in Revelation 8:3-4.' },
    ],
    build: `The altar of incense was small, one cubit square and two cubits high, made of acacia wood and covered entirely with pure gold, on its top, its sides and its horns (Exodus 30:1-3). Like the bronze altar it had four horns, and like the table it had a zer, a crown of gold, around its top. It stood "before the vail that is by the ark of the testimony, before the mercy seat that is over the testimony, where I will meet with thee" (Exodus 30:6). Of the three pieces in the holy place it was the one placed closest to God's presence, with only the veil between it and the ark.`,
    measure: 'One cubit square and two cubits high (about 1½ × 1½ × 3 feet).',
    service: `Every morning when Aaron dressed the lamps, and again every evening when he lit them, he burned sweet incense on this altar, "a perpetual incense before the LORD throughout your generations" (Exodus 30:7-8). The qetoret was made by a formula God gave: stacte, onycha, galbanum and pure frankincense in equal weight, memullach, salted, "pure and holy," and beaten very small (Exodus 30:34-36). No one was allowed to copy it for private use (Exodus 30:37-38), and no other incense, burnt offering or grain offering could be put on this altar (Exodus 30:9). The fire for it came from the altar of burnt offering. While the priest burned the incense inside, "the whole multitude of the people were praying without at the time of incense" (Luke 1:10).`,
    meaning: {
      title: 'Prayer and the intercession of Christ',
      paras: [
        `David understood what the incense meant when he prayed, "Let my prayer be set forth before thee as incense; and the lifting up of my hands as the evening sacrifice" (Psalm 141:2). The smoke rising from the golden altar was a picture of prayer rising to God. That is why the people gathered to pray at the hour of incense, and why Israelites far from the sanctuary turned toward it when they prayed.`,
        {
          quote: 'The faithful Israelite who was far from the temple would pray with his face toward the temple where the incense was ascending each morning and evening.',
          by: 'Stephen N. Haskell',
          source: 'The Cross and Its Shadow (1914), ch. 7',
        },
        `Yet the incense was more than the people's prayers. It was a fragrance God Himself provided, made by His own formula and burned with fire from the altar of sacrifice. Human prayer on its own is weak and mixed with self, but it was carried up to God together with something perfect. In Revelation, John sees an angel at the golden altar who is given "much incense, that he should offer it with the prayers of all saints," and then "the smoke of the incense, which came with the prayers of the saints, ascended up before God" (Revelation 8:3-4). The prayers and the incense are two different things that rise together. The incense is the merit of Christ, and it is what makes the prayers acceptable.`,
        {
          quote: 'The incense, ascending with the prayers of Israel, represents the merits and intercession of Christ, His perfect righteousness, which through faith is imputed to His people, and which can alone make the worship of sinful beings acceptable to God.',
          by: 'Ellen G. White',
          source: 'Patriarchs and Prophets, p. 353',
        },
        `This is what the New Testament means when it calls Christ our intercessor. He has entered heaven itself, "now to appear in the presence of God for us" (Hebrews 9:24), and "he ever liveth to make intercession for them" (Hebrews 7:25). The word tamid applied to both the morning and evening lamb and the morning and evening incense. The sacrifice that paid for sin and the intercession that brings sinners near to God were kept going side by side, day after day, and never one without the other.`,
        {
          quote: 'Before the veil of the most holy place, was an altar of perpetual intercession, before the holy, an altar of continual atonement.',
          by: 'Ellen G. White',
          source: 'Patriarchs and Prophets, p. 353',
        },
        `One scene in Israel's history shows how much rests on that intercession. When a plague broke out among the people after Korah's rebellion, Moses told Aaron to take his censer, put fire from the altar in it and add incense, and run among the people. Aaron "stood between the dead and the living; and the plague was stayed" (Numbers 16:48). Christ stands in that same place today, between a dying world and the judgment it deserves, offering His own righteousness for all who come to God through Him.`,
        {
          quote: 'Our prayers, made fragrant by the righteousness of Christ our Saviour, are presented by the Holy Spirit before the Father.',
          by: 'Stephen N. Haskell',
          source: 'The Cross and Its Shadow (1914), ch. 7',
        },
        `For that reason, the way to God is not open on any terms we choose. Nadab and Abihu offered esh zarah, "strange fire," which the LORD had not commanded, and fire came out from before the LORD and killed them (Leviticus 10:1-2). Later King Uzziah, who was not a priest, went into the temple to burn incense and was struck with leprosy (2 Chronicles 26:16-19). Prayer is welcome from anyone, but it reaches God only through the Priest He has appointed and on the ground of the sacrifice He has provided. Paul puts it simply: "There is one God, and one mediator between God and men, the man Christ Jesus" (1 Timothy 2:5).`,
      ],
    },
    christ: `The incense stands for Christ's merits and intercession, with which His people's prayers rise to God. In Revelation an angel at the golden altar offers "much incense" so that it can be offered "with the prayers of all saints" (Revelation 8:3-4). Our prayers are accepted because they arrive wrapped in His righteousness, and "he ever liveth to make intercession for them" (Hebrews 7:25). The Greek word there for incense, thumiama, is the same word used of the incense in the earthly sanctuary.`,
    deeper: [
      `Because the incense altar stood directly in front of the veil and the mercy seat, it was closely tied to the most holy place even though it stood in the first room. That explains why Hebrews 9:4 can connect the golden censer with the inner room. Prayer offered in the holy place was directed to the throne beyond the veil.`,
      `On the Day of Atonement the high priest filled a censer with coals from the altar, took a handful of incense beaten small, and carried them inside the veil, so that "the cloud of the incense may cover the mercy seat that is upon the testimony, that he die not" (Leviticus 16:12-13). Even the high priest could stand in God's presence only under the covering of the incense.`,
      `The blood of some sin offerings was put on the horns of this altar (Leviticus 4:7), and once a year, on the Day of Atonement, its horns were cleansed with the blood of the atonement (Exodus 30:10). The place of intercession was included in the final cleansing of the sanctuary.`,
      `The incense was salted, and salt in Scripture is the sign of a lasting covenant (Numbers 18:19). Paul uses the same picture when he writes, "Let your speech be alway with grace, seasoned with salt" (Colossians 4:6). Prayer offered through Christ is kept pure and acceptable by the covenant God has made.`,
    ],
    links: [
      { to: 'altar', text: 'Its fire came only from the bronze altar. Intercession is grounded in the sacrifice.' },
      { to: 'mercyseat', text: 'It stood directly in front of the mercy seat, with only the veil between them.' },
      { to: 'lampstand', text: 'Burned at the same hours the lamps were tended.' },
    ],
    life: `Make prayer a morning and evening habit, as the incense was (Psalm 141:2). Your words may feel weak, but they reach the throne joined to the merits of Christ, who is praying for you now.`,
    verses: [
      { ref: 'Revelation 8:3-4', note: 'Incense with the prayers of saints' },
      { ref: 'Psalm 141:2', note: 'Let my prayer be set forth as incense' },
      { ref: 'Hebrews 7:25', note: 'He ever liveth to make intercession' },
      { ref: 'Exodus 30:6-8', note: 'Before the vail, morning and evening' },
      { ref: 'Leviticus 10:1-2', note: 'Strange fire' },
      { ref: 'Luke 1:10', note: 'Praying at the time of incense' },
      { ref: 'Numbers 16:46-48', note: 'Between the dead and the living' },
      { ref: 'Hebrews 9:24', note: 'In the presence of God for us' },
      { ref: 'Leviticus 16:12-13', note: 'The cloud covers the mercy seat' },
      { ref: '1 Timothy 2:5', note: 'One mediator' },
      { ref: 'Revelation 5:8', note: 'Odours which are the prayers of saints' },
    ],
    resources: [R.pp30, R.haskell, R.andreasen, R.hardinge],
  },
  {
    id: 'veil',
    name: 'The Veil',
    zone: 'most',
    tagline: 'Torn from the top down.',
    terms: [
      { word: 'פָּרֹכֶת', translit: 'parochet', lang: 'Hebrew', meaning: 'Partition or barrier. Used only of the inner veil, never of the door hangings.' },
      { word: 'מַעֲשֵׂה חֹשֵׁב', translit: 'choshev', lang: 'Hebrew', meaning: '"Cunning work" (Exodus 26:31): the work of a skilled designer, with the cherubim woven into the fabric itself.' },
      { word: 'תְּכֵלֶת', translit: 'tekhelet', lang: 'Hebrew', meaning: 'Blue, a costly violet-blue dye.' },
      { word: 'אַרְגָּמָן', translit: 'argaman', lang: 'Hebrew', meaning: 'Purple, the dye of royal robes.' },
      { word: 'תּוֹלַעַת שָׁנִי', translit: 'tola\'at shani', lang: 'Hebrew', meaning: 'Scarlet, literally "worm of scarlet," because the dye came from an insect.' },
      { word: 'καταπέτασμα', translit: 'katapetasma', lang: 'Greek', meaning: 'Veil or curtain, the word the Gospels use for the veil that was torn.' },
      { word: 'ἐσχίσθη', translit: 'eschisthē', lang: 'Greek', meaning: '"Was torn" (Mark 15:38). Mark uses the same verb for the heavens being torn open at Jesus\' baptism (Mark 1:10).' },
    ],
    build: `The parochet was woven of tekhelet, argaman and tola'at shani, blue, purple and scarlet, with fine twined linen, and cherubim were worked into it as choshev, "cunning work" (Exodus 26:31). It hung by gold hooks on four pillars of acacia overlaid with gold, standing on sockets of silver (Exodus 26:32). God gave its purpose in one sentence: "the vail shall divide unto you between the holy place and the most holy" (Exodus 26:33). Behind it stood only the ark of the covenant with its mercy seat.`,
    service: `The veil hid the throne of God from everyone, priests included. The high priest alone went behind it, once a year on the Day of Atonement, "not without blood" (Hebrews 9:7), and God warned that even he must not come in at any other time, "that he die not: for I will appear in the cloud upon the mercy seat" (Leviticus 16:2). Through the year, the blood of sin offerings for the priest and for the whole congregation was sprinkled seven times "before the vail" (Leviticus 4:6, 17), so the record of forgiven sin was brought to this boundary and kept there until the Day of Atonement.`,
    meaning: {
      title: 'Separation, and the way opened',
      paras: [
        `The name parochet means a partition, and that is exactly what the veil was. It stood between a holy God and the people He loved, and it said plainly that sinners could not simply walk into His presence. Isaiah explains why: "your iniquities have separated between you and your God, and your sins have hid his face from you" (Isaiah 59:2). The cherubim woven into the veil carried that message back to the beginning, because after the fall God placed cherubim at the east of Eden "to keep the way of the tree of life" (Genesis 3:24). Ever since, the way to God had been guarded.`,
        `Yet the veil did not only shut people out. It also marked the way in. Once a year the high priest passed through it with blood, and in doing so he showed that God intended to open the way, though not yet. Hebrews says that as long as the first tabernacle was standing, "the way into the holiest of all was not yet made manifest" (Hebrews 9:8).`,
        `That changed on the afternoon Jesus died. At the ninth hour, the hour of the evening sacrifice, He cried with a loud voice and gave up His life, "and, behold, the veil of the temple was rent in twain from the top to the bottom" (Matthew 27:51). It was torn from the top, so no human hand did it. Mark uses the word eschisthē, "was torn," which is the same verb he used at the beginning of his Gospel, when the heavens were "opened," literally torn, at Jesus' baptism (Mark 1:10). At both the beginning and the end of Christ's ministry, heaven was torn open toward the human race.`,
        {
          quote: 'Type has met antitype in the death of God\'s Son. The great sacrifice has been made. The way into the holiest is laid open. A new and living way is prepared for all. No longer need sinful, sorrowing humanity await the coming of the high priest.',
          by: 'Ellen G. White',
          source: 'The Desire of Ages, p. 757',
        },
        `The torn veil also meant that the earthly temple had finished its work. The sacrifices that had pointed forward to Christ had reached the one they were pointing to, and from that moment the ministry that mattered was His, in the sanctuary in heaven. Hebrews connects the veil directly to Him: we have "boldness to enter into the holiest by the blood of Jesus, by a new and living way, which he hath consecrated for us, through the veil, that is to say, his flesh" (Hebrews 10:19-20). Readers have taken the verse in two ways, either that His flesh was the veil, torn when He died, or that His flesh, His sacrifice, is the way through the veil. Either way the point is the same. Access to God was opened by Christ giving His own body.`,
        {
          quote: 'Christ\'s flesh, or his sacrifice, is the new and living way which he hath consecrated for us.',
          by: 'Uriah Smith',
          source: 'Looking Unto Jesus (1898), p. 131',
        },
        `For that reason, Hebrews turns the torn veil into an invitation. Since we have such a High Priest over the house of God, "let us draw near with a true heart in full assurance of faith" (Hebrews 10:22). No earthly priest stands between the believer and God anymore, and no one has to wait for one day a year. The way is open every day through Christ.`,
        {
          quote: 'The earthly priesthood ceased; but we look to Jesus, the minister of the new covenant, and "to the blood of sprinkling, that speaketh better things than that of Abel."',
          by: 'Ellen G. White',
          source: 'The Desire of Ages, p. 166',
        },
      ],
    },
    christ: `When Jesus died, "the veil of the temple was rent in twain from the top to the bottom" (Matthew 27:51). It was torn from the top, by God, at the hour of the evening sacrifice, and it showed that the earthly system had done its work. Hebrews says we now enter "by a new and living way" through the veil, "that is to say, his flesh" (Hebrews 10:19-20). Christ opened the way to God by giving Himself.`,
    deeper: [
      `Hebrews 6:19-20 says that Jesus has entered "within the veil" as our forerunner. The point of the verse is access: Christ is in the very presence of God for us (Hebrews 9:24). Richard Davidson has shown that its background is the inauguration of the sanctuary, when Moses anointed the whole tent and both of its rooms before the regular service began (Exodus 40:9; Daniel 9:24). Christ's ascension inaugurated the heavenly sanctuary, and His final work in the second apartment, which the Day of Atonement pictured, came later, at the time Daniel 8:14 sets.`,
      `The scarlet dye, tola'at shani, came from a small insect, and the word tola'at by itself means "worm." Many readers have noticed that the same word appears in Psalm 22, the psalm Jesus quoted from the cross, where the sufferer says, "But I am a worm, and no man" (Psalm 22:6). This is a devotional connection rather than a stated interpretation, but it fits the veil well, since its colors were finally torn at the cross.`,
      `The veil was torn, not removed. Its two halves still hung there, but the way between them stood open. In the same way, the holiness of God has not been lowered. He is as holy as ever, and the way to Him is still only through the blood, yet it is now open to everyone who comes through Christ.`,
    ],
    links: [
      { to: 'gate', text: 'Same colours as the gate. The one who welcomes you in is the one who opens the way to the throne.' },
      { to: 'incense', text: 'The incense altar stood right in front of it, and its smoke crossed over.' },
      { to: 'ark', text: 'Behind it was only one piece of furniture: the ark with its mercy seat.' },
    ],
    life: `Nothing stands between you and God now except sin you refuse to give up. "Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need" (Hebrews 4:16).`,
    verses: [
      { ref: 'Matthew 27:51', note: 'Rent from the top to the bottom' },
      { ref: 'Hebrews 10:19-20', note: 'Through the veil, that is, his flesh' },
      { ref: 'Hebrews 6:19-20', note: 'Within the veil, our forerunner' },
      { ref: 'Hebrews 9:24', note: 'In the presence of God for us' },
      { ref: 'Exodus 26:31-33', note: 'The veil described' },
      { ref: 'Hebrews 4:16', note: 'Come boldly' },
      { ref: 'Hebrews 9:7-8', note: 'The way not yet made manifest' },
      { ref: 'Hebrews 10:22', note: 'Draw near in full assurance' },
      { ref: 'Leviticus 16:2', note: 'Not at all times within the vail' },
      { ref: 'Isaiah 59:2', note: 'Iniquities have separated' },
      { ref: 'Genesis 3:24', note: 'Cherubim keep the way' },
      { ref: 'Mark 15:38', note: 'The veil rent in twain' },
    ],
    resources: [R.pp30, R.gc24, R.smith, R.davidson],
  },
  {
    id: 'ark',
    name: 'Ark of the Covenant',
    zone: 'most',
    tagline: 'God\'s law at the centre of His throne.',
    terms: [
      { word: 'אֲרוֹן', translit: 'aron', lang: 'Hebrew', meaning: 'Chest or box. A different word from Noah\'s ark (tevah).' },
      { word: 'עֵדוּת', translit: "'edut", lang: 'Hebrew', meaning: 'Testimony. The tables of the law were called "the testimony," so the ark is also called "the ark of the testimony."' },
      { word: 'בְּרִית', translit: 'berit', lang: 'Hebrew', meaning: 'Covenant: a binding agreement that God initiates and guarantees.' },
      { word: 'κιβωτός', translit: 'kibōtos', lang: 'Greek', meaning: 'Ark or chest, used in Hebrews 9:4 and Revelation 11:19.' },
    ],
    build: `A chest of acacia overlaid with pure gold inside and out, with a gold crown around it and rings for poles that were never to be removed (Exodus 25:10-15).`,
    measure: 'Two and a half cubits long, one and a half wide, one and a half high (about 3¾ × 2¼ × 2¼ feet).',
    service: `Inside were the two tables of stone written by God's own finger: the Ten Commandments (Exodus 31:18; Deuteronomy 10:5). Hebrews 9:4 also mentions a golden pot of manna and Aaron's rod that budded. It was the only furniture in the most holy place, and it led Israel's march through the wilderness.`,
    christ: `The law sits at the centre of God's throne because it describes His character. The Messiah says, "I delight to do thy will, O my God: yea, thy law is within my heart" (Psalm 40:8). In the new covenant God writes that same law on His people's hearts (Hebrews 8:10). Near the end of history John sees "the ark of his testament" in the temple in heaven (Revelation 11:19). Attention turns to the second apartment and to the law kept there, including the fourth commandment's Sabbath.`,
    deeper: [
      `The ark preserves three memories. The tables recall the law God gave. The manna recalls His daily provision, with a double portion before the Sabbath. Aaron's rod recalls His choice of a priest. Law, provision and priesthood are kept together at the heart of the sanctuary.`,
      `Only the stone tables were placed "in the ark." Moses' book of the law was placed "in the side of the ark" (Deuteronomy 31:26). Scripture keeps the Ten Commandments in a category of their own.`,
      `The law did not get in the way of mercy. It was the reason a mercy seat was needed. A broken law that does not matter would need no atonement.`,
    ],
    links: [
      { to: 'mercyseat', text: 'The law lay underneath, and the mercy seat with its blood lay on top. Justice and mercy at the same place.' },
      { to: 'table', text: 'The manna kept with the ark pairs with the bread on the table.' },
      { to: 'lampstand', text: 'Aaron\'s almond rod pairs with the almond-blossom lampstand.' },
    ],
    life: `God's law is not your enemy. It describes Him, and under the new covenant He promises to write it into you (Ezekiel 36:26-27).`,
    verses: [
      { ref: 'Exodus 25:16', note: 'Put into the ark the testimony' },
      { ref: 'Hebrews 9:4', note: 'Manna, rod and tables' },
      { ref: 'Psalm 40:8', note: 'Thy law is within my heart' },
      { ref: 'Hebrews 8:10', note: 'Laws written in their hearts' },
      { ref: 'Revelation 11:19', note: 'The ark seen in heaven' },
      { ref: 'Deuteronomy 10:5', note: 'The tables put in the ark' },
      { ref: 'Revelation 14:12', note: 'They that keep the commandments of God' },
    ],
    resources: [R.pp30, R.gc24, R.andreasen],
  },
  {
    id: 'mercyseat',
    name: 'The Mercy Seat',
    zone: 'most',
    tagline: 'Where justice and mercy meet.',
    terms: [
      { word: 'כַּפֹּרֶת', translit: 'kapporet', lang: 'Hebrew', meaning: 'Mercy seat or atonement cover, from kaphar, to cover, purge or atone. Its name means "the place where atonement is made."' },
      { word: 'ἱλαστήριον', translit: 'hilastērion', lang: 'Greek', meaning: 'Place of atonement. The Greek Old Testament uses it for the mercy seat, and Paul uses it for Christ in Romans 3:25. Hebrews 9:5 uses it for the mercy seat directly.' },
      { word: 'כְּרוּבִים', translit: 'keruvim', lang: 'Hebrew', meaning: 'Cherubim, the angelic guardians of God\'s throne.' },
    ],
    build: `A solid slab of pure gold forming the lid of the ark, with two cherubim of hammered gold rising from its ends. They faced each other and looked down toward the mercy seat, their wings spread over it (Exodus 25:17-20).`,
    measure: 'Two and a half by one and a half cubits, the same footprint as the ark.',
    service: `"There I will meet with thee, and I will commune with thee from above the mercy seat" (Exodus 25:22). God's presence was shown between the cherubim (Psalm 80:1). On the Day of Atonement the high priest sprinkled blood on the mercy seat and before it seven times (Leviticus 16:14-15), and this cleansed the sanctuary from the accumulated sins of the year.`,
    christ: `Paul writes that God set Christ forth "to be a propitiation through faith in his blood" (Romans 3:25). The word is hilastērion, the mercy seat itself. Christ is the place where God and sinners meet. At the cross God shows Himself "just, and the justifier of him which believeth in Jesus" (Romans 3:26). He does not lower the law, and He does not abandon the sinner. "Mercy and truth are met together; righteousness and peace have kissed each other" (Psalm 85:10).`,
    deeper: [
      `The cherubim look down at the blood, not out at the people. Angels "desire to look into" this mystery (1 Peter 1:12). The plan of salvation answers questions for the whole universe, not only for us.`,
      `The Day of Atonement blood on the mercy seat did not forgive anyone new. Forgiveness had already been granted all year at the altar. This blood cleansed the sanctuary and settled the record. Gane calls it the second phase of atonement, and it vindicates God's justice in having forgiven.`,
      `The broken law in the ark lay underneath the blood. God does not erase the law to save sinners. He covers the sinner with the blood of Christ.`,
    ],
    links: [
      { to: 'ark', text: 'It is the lid of the ark: mercy resting on law.' },
      { to: 'altar', text: 'The blood sprinkled here came from the altar outside. The cross and the judgment are one atonement in two phases.' },
      { to: 'incense', text: 'The incense altar stood just outside the veil, directly in front of it.' },
    ],
    life: `You can be honest with God about your sin because the blood is already on the mercy seat. He is "faithful and just to forgive" (1 John 1:9).`,
    verses: [
      { ref: 'Exodus 25:21-22', note: 'There I will meet with thee' },
      { ref: 'Romans 3:25-26', note: 'A propitiation through faith' },
      { ref: 'Leviticus 16:14-15', note: 'Blood upon the mercy seat' },
      { ref: 'Psalm 85:10', note: 'Mercy and truth are met together' },
      { ref: 'Psalm 80:1', note: 'Dwellest between the cherubims' },
      { ref: 'Hebrews 9:5', note: 'Cherubims shadowing the mercyseat' },
      { ref: '1 John 2:2', note: 'The propitiation for our sins' },
    ],
    resources: [R.pp30, R.gc24, R.gane],
  },
]

export const journey = symbols.map((s) => s.id)

export function getSymbol(id: string) {
  return symbols.find((s) => s.id === id)
}
