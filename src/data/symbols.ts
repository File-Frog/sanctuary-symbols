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
    tagline: 'God moved into the camp.',
    terms: [
      { word: 'מִשְׁכָּן', translit: 'mishkan', lang: 'Hebrew', meaning: 'Dwelling place, from shakan, to dwell or settle. The later word Shekinah, for God\'s visible glory, comes from the same root.' },
      { word: 'מִקְדָּשׁ', translit: 'miqdash', lang: 'Hebrew', meaning: 'Sanctuary, literally "holy place," from qadash, to be set apart.' },
      { word: 'אֹהֶל מוֹעֵד', translit: "ohel mo'ed", lang: 'Hebrew', meaning: 'Tent of meeting: the place of appointed meetings between God and His people.' },
      { word: 'ἐσκήνωσεν', translit: 'eskēnōsen', lang: 'Greek', meaning: '"He tabernacled" or "pitched His tent," the verb in John 1:14.' },
    ],
    build: `Forty-eight upright boards of acacia overlaid with gold stood in silver sockets made from the atonement money of the people (Exodus 26:15-25; 38:25-27). Four layers covered them. The innermost was fine linen embroidered with cherubim, visible only from inside. Over that came goats' hair, then rams' skins dyed red, then an outer layer of durable skins. A five-pillared hanging formed the door.`,
    measure: 'About 30 × 10 cubits (45 × 15 feet). The holy place took 20 cubits, and the most holy place was a 10-cubit cube.',
    service: `"Let them make me a sanctuary; that I may dwell among them" (Exodus 25:8). That is the reason the tent existed. It was built exactly to a pattern Moses was shown (Exodus 25:9, 40), and it was portable, so God went wherever Israel went. Only priests passed the door.`,
    christ: `"The Word was made flesh, and dwelt among us" (John 1:14) uses the verb for pitching a tent. Like the tabernacle, Jesus had nothing on the outside to attract attention (Isaiah 53:2), yet inside was the glory of God. Hebrews adds a second layer: the earthly tent was a copy of "the true tabernacle, which the Lord pitched, and not man," and Christ ministers there now as High Priest (Hebrews 8:1-5).`,
    deeper: [
      `"Pattern" (Hebrew tabnit) in Exodus 25:9 means a model or copy of something that already exists. Hebrews 8:5 quotes that verse to show that a real sanctuary in heaven came first and the tent was built to match it. That is why the earthly services can be used to understand what Christ is doing now.`,
      `The silver sockets came from the half-shekel each man paid as a "ransom for his soul" (Exodus 30:12-16). The whole building literally stood on redemption money.`,
      `The tent was plain on the outside and full of gold and colour within. Its beauty belonged to those who came inside.`,
    ],
    links: [
      { to: 'veil', text: 'Inside, the tent was split in two by the veil, giving two rooms and two phases of ministry.' },
      { to: 'lampstand', text: 'There were no windows. All the light inside came from the lampstand.' },
    ],
    life: `God still wants to live with His people. Your body is a temple of the Holy Spirit (1 Corinthians 6:19), and He goes with you wherever you go.`,
    verses: [
      { ref: 'Exodus 25:8-9', note: 'That I may dwell among them' },
      { ref: 'John 1:14', note: 'Dwelt among us' },
      { ref: 'Hebrews 8:1-2', note: 'The true tabernacle' },
      { ref: 'Hebrews 8:5', note: 'Example and shadow of heavenly things' },
      { ref: 'Isaiah 53:2', note: 'No form nor comeliness' },
      { ref: 'Revelation 21:3', note: 'The tabernacle of God is with men' },
      { ref: '1 Corinthians 6:19', note: 'Your body is the temple' },
    ],
    resources: [R.pp30, R.gc23, R.davidson],
  },
  {
    id: 'table',
    name: 'Table of Shewbread',
    zone: 'holy',
    tagline: 'Bread that was always in God\'s presence.',
    terms: [
      { word: 'שֻׁלְחָן', translit: 'shulchan', lang: 'Hebrew', meaning: 'Table. It is the ordinary word for a dining table, a place where people eat together.' },
      { word: 'לֶחֶם הַפָּנִים', translit: 'lechem ha-panim', lang: 'Hebrew', meaning: 'Shewbread, literally "bread of the face," meaning bread set before God\'s face, in His presence.' },
      { word: 'πρόθεσις', translit: 'prothesis', lang: 'Greek', meaning: '"A setting forth." Hebrews 9:2 calls it the bread of the setting forth.' },
    ],
    build: `A table of acacia overlaid with pure gold, with a raised gold crown around the edge to keep things from falling off (Exodus 25:23-30). It stood on the north side of the holy place, on the right of a priest walking in.`,
    measure: 'Two cubits long, one wide and one and a half high (about 3 × 1½ × 2¼ feet).',
    service: `Twelve loaves of fine flour, one for each tribe, sat in two rows of six. Pure frankincense was placed on each row as a memorial. Every Sabbath the priests set out fresh bread and ate the old loaves in the holy place (Leviticus 24:5-9).`,
    christ: `"I am the bread of life," Jesus said. "He that cometh to me shall never hunger" (John 6:35). He is also the living Word, and "man shall not live by bread alone, but by every word that proceedeth out of the mouth of God" (Matthew 4:4). The twelve loaves show the whole nation, every tribe, kept continually before God and fed by Him.`,
    deeper: [
      `The bread was renewed on the Sabbath, so the table tied the weekly rhythm of creation to the daily ministry of the sanctuary. Fresh bread arrived on the day God set aside for meeting with His people.`,
      `Grain is crushed and baked before it becomes bread. Christ was "bruised for our iniquities" (Isaiah 53:5) before He could feed the world.`,
      `The frankincense was burned when the bread was changed. The bread fed the priests, and its memorial went up to God. Feeding on the Word and prayer belong together.`,
    ],
    links: [
      { to: 'ark', text: 'A golden pot of manna, the bread from heaven, was kept with the ark. Both tables feed God\'s people with bread He provides.' },
      { to: 'lampstand', text: 'The lampstand stood directly opposite and shone on the table. The Word is understood by the light of the Spirit.' },
    ],
    life: `Eat daily, in His presence. Regular time in Scripture is what the table is about, and the Sabbath is a weekly chance to start fresh.`,
    verses: [
      { ref: 'John 6:35', note: 'The bread of life' },
      { ref: 'Matthew 4:4', note: 'Every word of God' },
      { ref: 'Leviticus 24:5-9', note: 'Twelve cakes, renewed every Sabbath' },
      { ref: 'Exodus 25:30', note: 'Shewbread before me alway' },
      { ref: 'Jeremiah 15:16', note: 'Thy words were found, and I did eat them' },
      { ref: 'John 6:51', note: 'The living bread from heaven' },
    ],
    resources: [R.pp30, R.hardinge, R.andreasen],
  },
  {
    id: 'lampstand',
    name: 'The Golden Candlestick',
    zone: 'holy',
    tagline: 'The only light inside the tent.',
    terms: [
      { word: 'מְנוֹרָה', translit: 'menorah', lang: 'Hebrew', meaning: 'Lampstand. It held oil lamps, not candles. "Candlestick" is the 1611 English word.' },
      { word: 'שָׁקֵד', translit: 'shaqed', lang: 'Hebrew', meaning: 'Almond. The cups were shaped like almond blossoms. The word sounds like shoqed, "watching," a pun God uses in Jeremiah 1:11-12.' },
      { word: 'λυχνία', translit: 'luchnia', lang: 'Greek', meaning: 'Lampstand, the word in Revelation 1:12-20.' },
    ],
    build: `Hammered from a single talent of pure gold, with a central shaft and three branches on each side, decorated with almond-blossom cups, knobs and flowers (Exodus 25:31-40). It stood on the south side, opposite the table.`,
    measure: 'One talent of gold, roughly 75 pounds. No height is given.',
    service: `Seven lamps burned pure olive oil, beaten rather than pressed (Exodus 27:20). The priest trimmed and refilled them morning and evening so the light never went out (Exodus 30:7-8). The tent had no windows, so without the lampstand the holy place was completely dark.`,
    christ: `Jesus is "the light of the world" (John 8:12). The oil stands for the Holy Spirit: "Not by might, nor by power, but by my spirit" (Zechariah 4:6), and the seven lamps match the "seven Spirits of God" before the throne (Revelation 4:5). In Revelation 1, John sees Jesus in priestly robes walking among seven golden lampstands, which He says are His churches (Revelation 1:12-13; Revelation 1:20). The opening scene of Revelation is set in the holy place.`,
    deeper: [
      `It was beaten out of one piece, not assembled from parts. The branches had no light of their own apart from the shaft. "Without me ye can do nothing" (John 15:5).`,
      `Almonds are the first trees to blossom in Israel, while everything else is still bare. Aaron's dead staff blossomed and produced almonds overnight to show whom God had chosen as priest (Numbers 17:8). The lampstand carries that picture of life from death into the holy place.`,
      `Lamps need daily trimming, and the Spirit's work is also ongoing. The priest who tended the lamps also burned the incense. Light and prayer were tended together.`,
    ],
    links: [
      { to: 'table', text: 'It shone across the room onto the bread. Light and food, Spirit and Word.' },
      { to: 'ark', text: 'Aaron\'s almond rod was kept with the ark. The almond blossoms on the lampstand repeat the sign of the true priesthood.' },
      { to: 'incense', text: 'Lamps were trimmed at the same hours the incense was burned (Exodus 30:7-8).' },
    ],
    life: `"Ye are the light of the world" (Matthew 5:14), but only with borrowed light. Your lamp burns as long as the Spirit keeps filling it.`,
    verses: [
      { ref: 'John 8:12', note: 'I am the light of the world' },
      { ref: 'Matthew 5:14-16', note: 'Ye are the light of the world' },
      { ref: 'Revelation 4:5', note: 'Seven lamps, seven Spirits' },
      { ref: 'Revelation 1:12-13', note: 'Christ among the candlesticks' },
      { ref: 'Zechariah 4:6', note: 'By my spirit' },
      { ref: 'Exodus 27:20', note: 'Pure oil olive beaten' },
      { ref: 'Numbers 17:8', note: 'Aaron\'s rod yielded almonds' },
      { ref: 'Psalm 119:105', note: 'A lamp unto my feet' },
    ],
    resources: [R.pp30, R.hardinge, R.haskell],
  },
  {
    id: 'incense',
    name: 'Altar of Incense',
    zone: 'holy',
    tagline: 'Prayer that reaches past the veil.',
    terms: [
      { word: 'קְטֹרֶת', translit: 'qetoret', lang: 'Hebrew', meaning: 'Incense, literally "that which rises in smoke."' },
      { word: 'תָּמִיד', translit: 'tamid', lang: 'Hebrew', meaning: 'Continual or perpetual. Exodus 30:8 calls it a "perpetual incense," and the same word describes the daily sacrifice.' },
      { word: 'θυμίαμα', translit: 'thumiama', lang: 'Greek', meaning: 'Incense, the word used in Revelation 8:3-4.' },
    ],
    build: `A small altar of acacia overlaid with gold, with horns and a gold crown, set "before the vail that is by the ark" (Exodus 30:1-6). It was the tallest piece of furniture in the holy place and stood directly in line with the mercy seat.`,
    measure: 'One cubit square and two cubits high (about 1½ × 1½ × 3 feet).',
    service: `Every morning and evening the priest burned incense on it, using coals taken from the altar of burnt offering (Exodus 30:7-8; Leviticus 16:12). The recipe was sacred: stacte, onycha, galbanum and pure frankincense in equal parts, and copying it for private use was forbidden (Exodus 30:34-38). The smoke filled the room and drifted over the top of the veil into the most holy place. Outside, the people prayed at the hour of incense (Luke 1:10).`,
    christ: `The incense stands for Christ's merits and intercession, with which His people's prayers rise to God. In Revelation an angel at the golden altar offers "much incense" so that it can be offered "with the prayers of all saints" (Revelation 8:3-4). Our prayers are accepted because they arrive wrapped in His righteousness, and "he ever liveth to make intercession for them" (Hebrews 7:25).`,
    deeper: [
      `Nadab and Abihu, Aaron's sons, died for offering "strange fire," fire not taken from the altar (Leviticus 10:1-2). The lesson is direct. Worship that bypasses the sacrifice is not accepted, however sincere it feels.`,
      `Because the smoke crossed the veil, this altar is closely tied to the most holy place. That explains why Hebrews 9:4 can connect the golden censer with the inner room. Prayer offered in the first apartment reaches the throne in the second.`,
      `The blood of some sin offerings was put on the horns of this altar (Leviticus 4:7), and on the Day of Atonement it was cleansed along with the rest of the sanctuary (Exodus 30:10).`,
    ],
    links: [
      { to: 'altar', text: 'Its fire came only from the bronze altar. Intercession is grounded in the sacrifice.' },
      { to: 'mercyseat', text: 'It stood directly in front of the mercy seat, with only the veil between them.' },
      { to: 'lampstand', text: 'Burned at the same hours the lamps were tended.' },
    ],
    life: `Pray morning and evening (Psalm 141:2). What you say may feel weak, but it reaches the throne mixed with the merits of Christ.`,
    verses: [
      { ref: 'Revelation 8:3-4', note: 'Incense with the prayers of saints' },
      { ref: 'Psalm 141:2', note: 'Let my prayer be set forth as incense' },
      { ref: 'Hebrews 7:25', note: 'He ever liveth to make intercession' },
      { ref: 'Exodus 30:6-8', note: 'Before the vail, morning and evening' },
      { ref: 'Leviticus 10:1-2', note: 'Strange fire' },
      { ref: 'Luke 1:10', note: 'Praying at the time of incense' },
    ],
    resources: [R.pp30, R.andreasen, R.hardinge],
  },
  {
    id: 'veil',
    name: 'The Veil',
    zone: 'most',
    tagline: 'Torn from the top down.',
    terms: [
      { word: 'פָּרֹכֶת', translit: 'parochet', lang: 'Hebrew', meaning: 'Partition or barrier. The inner veil only.' },
      { word: 'καταπέτασμα', translit: 'katapetasma', lang: 'Greek', meaning: 'Veil or curtain. The Greek Old Testament uses it for both the inner veil and the door hanging, so the context decides which one is meant.' },
    ],
    build: `A thick curtain of blue, purple, scarlet and fine twined linen with cherubim woven into it, hung on four gold-covered pillars of acacia (Exodus 26:31-33). It divided the holy place from the most holy place.`,
    service: `It hid the throne of God. The high priest went past it once a year, on the Day of Atonement, and never without blood (Hebrews 9:7). The blood of some sin offerings was sprinkled "before the vail" seven times (Leviticus 4:6), so the record of forgiven sin collected at this boundary all year long.`,
    christ: `When Jesus died, "the veil of the temple was rent in twain from the top to the bottom" (Matthew 27:51). It was torn from the top, by God, at the hour of the evening sacrifice. The earthly system had done its job. Hebrews says we now enter "by a new and living way" through the veil, "that is to say, his flesh" (Hebrews 10:19-20). Christ opens access to God by giving Himself.`,
    deeper: [
      `Hebrews 6:19-20 says Jesus has entered "within the veil" as our forerunner. The verse is about access. Christ is in the very presence of God for us (Hebrews 9:24). Richard Davidson has shown that its background is the inauguration of the sanctuary, when Moses anointed the whole tent, both rooms, before regular service began (Exodus 40:9; Daniel 9:24). Christ's ascension inaugurated the heavenly sanctuary. His final, Day-of-Atonement work in the second apartment came later, at the time Daniel 8:14 sets.`,
      `The cherubim woven into the veil recall the cherubim with the flaming sword at the gate of Eden (Genesis 3:24). Since the fall, sinners had been kept back from God's presence. The plan of salvation is about how that guarded way is reopened.`,
    ],
    links: [
      { to: 'gate', text: 'Same colours as the gate. The one who welcomes you in is the one who opens the way to the throne.' },
      { to: 'incense', text: 'The incense altar stood right in front of it, and its smoke crossed over.' },
      { to: 'ark', text: 'Behind it was only one piece of furniture: the ark with its mercy seat.' },
    ],
    life: `Nothing stands between you and God now except sin you refuse to give up. "Let us therefore come boldly unto the throne of grace" (Hebrews 4:16).`,
    verses: [
      { ref: 'Matthew 27:51', note: 'Rent from the top to the bottom' },
      { ref: 'Hebrews 10:19-20', note: 'Through the veil, that is, his flesh' },
      { ref: 'Hebrews 6:19-20', note: 'Within the veil, our forerunner' },
      { ref: 'Hebrews 9:24', note: 'In the presence of God for us' },
      { ref: 'Exodus 26:31-33', note: 'The veil described' },
      { ref: 'Hebrews 4:16', note: 'Come boldly' },
    ],
    resources: [R.pp30, R.gc24, R.davidson],
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
