import type { Verse } from './symbols'

import type { Term } from './symbols'

export interface Step {
  title: string
  text: string
  verses: Verse[]
  at?: [number, number]
}

export const dailyTerms: Term[] = [
  { word: 'תָּמִיד', translit: 'tamid', lang: 'Hebrew', meaning: 'Continual. "The daily" in Daniel 8:11-13 translates this word: the regular, ongoing ministry of the sanctuary.' },
  { word: 'עֹלָה', translit: "'olah", lang: 'Hebrew', meaning: 'Burnt offering, literally "that which goes up," because the whole animal went up in smoke to God. The morning and evening lamb was an \'olah.' },
  { word: 'חַטָּאת', translit: "chatta't", lang: 'Hebrew', meaning: 'Sin offering. Roy Gane and others translate it "purification offering," since its job was to purge sin.' },
  { word: 'סָמַךְ', translit: 'samak', lang: 'Hebrew', meaning: 'To lean or press, used for laying a hand on the head of the offering. It means real weight, not a light touch.' },
  { word: 'כִּפֶּר', translit: 'kipper', lang: 'Hebrew', meaning: 'To atone, purge or ransom. The verb behind kapporet (mercy seat) and Yom Kippur.' },
  { word: 'נָשָׂא עָוֺן', translit: "nasa 'avon", lang: 'Hebrew', meaning: '"To bear iniquity." Used of the priest who ate the sin offering (Leviticus 10:17), and of the Servant who "bare the sin of many" (Isaiah 53:12).' },
  { word: 'נִסְלַח', translit: 'nislach', lang: 'Hebrew', meaning: '"It shall be forgiven." The promise that closes each sin offering in Leviticus 4. Only God is ever the subject of this verb.' },
]

export const dailySteps: Step[] = [
  {
    title: 'The sinner brings an offering',
    text: 'When an Israelite realized he had sinned, he brought a chatta\'t, a sin offering, to the door of the sanctuary. What he brought depended on who he was: a priest or the whole congregation brought a young bull, a ruler a male goat, and an ordinary person a female goat or a female lamb (Leviticus 4:3, 14, 23, 28, 32). Whatever the animal, it had to be "without blemish." A perfect substitute was required because the one bringing it was not perfect, and Peter says we were redeemed "with the precious blood of Christ, as of a lamb without blemish and without spot" (1 Peter 1:19).',
    verses: [{ ref: 'Leviticus 4:32' }, { ref: '1 Peter 1:18-19' }],
    at: [4, 25],
  },
  {
    title: 'A hand on its head and sin confessed',
    text: 'The worshipper then did samak: he leaned his hand with his full weight on the animal\'s head and confessed what he had done (Leviticus 4:33; Leviticus 5:5). In picture, his guilt passed from himself to the victim. The same is still true of confession: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness" (1 John 1:9).',
    verses: [{ ref: 'Leviticus 4:33' }, { ref: 'Leviticus 5:5' }, { ref: '1 John 1:9' }],
    at: [22, 19],
  },
  {
    title: 'The sinner takes its life',
    text: 'He killed the animal with his own hand, at the place where the burnt offerings were slain on the north side of the altar (Leviticus 4:33; Leviticus 1:11). Watching an innocent life end because of his sin was meant to break his heart. "The wages of sin is death" (Romans 6:23), and the substitute paid them, just as the Servant of the LORD "was wounded for our transgressions" (Isaiah 53:5).',
    verses: [{ ref: 'Romans 6:23' }, { ref: 'Isaiah 53:5' }, { ref: 'Leviticus 1:11' }],
    at: [22, 25],
  },
  {
    title: 'The priest ministers the blood',
    text: 'Now the priest took over. When a priest or the whole congregation had sinned, the blood was carried into the holy place and sprinkled seven times before the veil, then put on the horns of the golden altar (Leviticus 4:6-7, 17-18). When a ruler or an ordinary person had sinned, the blood went on the horns of the bronze altar, and the priest ate part of the flesh in the holy place, because God had given it to the priests "to bear the iniquity of the congregation" (Leviticus 6:26; Leviticus 10:17). That phrase, nasa \'avon, means to carry guilt. Either way the sin now stood recorded in the sanctuary. The sinner went home with the promise nislach, "it shall be forgiven him" (Leviticus 4:31), and the sanctuary kept the record.',
    verses: [{ ref: 'Leviticus 4:6-7' }, { ref: 'Leviticus 10:17' }, { ref: 'Leviticus 17:11' }],
    at: [68.4, 25],
  },
  {
    title: 'Morning and evening, without a break',
    text: 'Alongside these personal offerings, a lamb was offered for the whole nation every morning and every evening as an \'olah, a burnt offering that went up entirely to God, and incense was burned on the golden altar at the same hours (Exodus 29:38-42; Exodus 30:7-8). This tamid kept Israel continually covered, even on days when no one brought an offering of his own. Jesus died at the ninth hour, the hour of the evening sacrifice (Mark 15:34-37). Hebrews contrasts the priests who "standeth daily" offering sacrifices "which can never take away sins" with Christ, who "offered one sacrifice for sins for ever" and sat down at God\'s right hand (Hebrews 10:11-12).',
    verses: [{ ref: 'Exodus 29:38-39' }, { ref: 'Hebrews 10:11-12' }, { ref: 'Mark 15:34-37' }],
    at: [22, 25],
  },
]

export const yearlyTerms: Term[] = [
  { word: 'יוֹם הַכִּפֻּרִים', translit: 'Yom ha-Kippurim', lang: 'Hebrew', meaning: 'The Day of Atonements. The plural suggests a full, complete atonement.' },
  { word: 'עֲזָאזֵל', translit: "'aza'zel", lang: 'Hebrew', meaning: 'The name given to the second goat. It is set in parallel with "the LORD," so it most naturally names a personal being opposed to God. Early Jewish writers took it that way, and many scholars still do.' },
  { word: 'עִנָּה נֶפֶשׁ', translit: "'innah nefesh", lang: 'Hebrew', meaning: '"Afflict the soul": humble yourself through fasting and heart-searching.' },
  { word: 'נִצְדַּק', translit: 'nitsdaq', lang: 'Hebrew', meaning: 'The verb behind "cleansed" in Daniel 8:14. It comes from tsadaq, to be right, so it carries the ideas of being restored, set right and vindicated, as well as cleansed.' },
]

export const yearlySteps: Step[] = [
  {
    title: 'The tenth day of the seventh month',
    text: 'Once a year Israel kept its most solemn day. Nobody worked, and everyone was to afflict the soul. Anyone who would not was "cut off from among his people" (Leviticus 23:27-29). In Jewish tradition it is still the day when judgment is sealed. The text points the same way, since the day revealed who was loyal.',
    verses: [{ ref: 'Leviticus 23:27-29' }],
    at: [-4, 25],
  },
  {
    title: 'The high priest dresses in plain linen',
    text: 'He set aside his garments of glory and wore only white linen (Leviticus 16:4). He offered a bullock for himself and his house (Leviticus 16:6), then went past the veil with a censer of coals from the altar and a cloud of incense to cover the mercy seat (Leviticus 16:12-13). This was the one day anyone entered the most holy place, and he did not go without blood (Hebrews 9:7).',
    verses: [{ ref: 'Leviticus 16:2-4' }, { ref: 'Leviticus 16:12-13' }, { ref: 'Hebrews 9:7' }],
    at: [22, 25],
  },
  {
    title: 'Two goats, and only one is slain',
    text: 'Lots were cast over two goats, "one lot for the LORD, and the other lot for the scapegoat" (Leviticus 16:8). The LORD\'s goat was killed, and its blood was sprinkled on the mercy seat, then on the incense altar, then on the bronze altar. This cleansed every part of the sanctuary "because of the uncleanness of the children of Israel, and because of their transgressions in all their sins" (Leviticus 16:15-19).',
    verses: [{ ref: 'Leviticus 16:7-9' }, { ref: 'Leviticus 16:15-16' }, { ref: 'Leviticus 16:18-19' }],
    at: [75, 25],
  },
  {
    title: 'The scapegoat carries it away',
    text: 'Only after the sanctuary was clean did the high priest lay both hands on the live goat and confess over it all of Israel\'s iniquities. It was led into the wilderness and left there (Leviticus 16:20-22). Its blood was never shed, so it made no atonement for anyone. It carried away the responsibility for sins already forgiven and already removed from the sanctuary. The fitting antitype is Satan, who started sin and will finally bear the responsibility for it.',
    verses: [{ ref: 'Leviticus 16:20-22' }, { ref: 'Revelation 20:1-3' }],
    at: [-6, 25],
  },
  {
    title: 'A clean people and a clean sanctuary',
    text: '"On that day shall the priest make an atonement for you, to cleanse you, that ye may be clean from all your sins before the LORD" (Leviticus 16:30). The year\'s record was closed. Forgiveness during the year came at the altar. This day removed the record and confirmed who belonged to God.',
    verses: [{ ref: 'Leviticus 16:30' }, { ref: 'Leviticus 16:33-34' }],
    at: [50, 25],
  },
  {
    title: 'The heavenly fulfilment',
    text: 'Hebrews says the heavenly things themselves had to be purified "with better sacrifices" (Hebrews 9:23-24). Daniel says when: "Unto two thousand and three hundred days; then shall the sanctuary be cleansed" (Daniel 8:14). Daniel 7 shows the same event as a heavenly court that sits, opens the books and rules in favour of the saints before the kingdom is given (Daniel 7:9-10; Daniel 7:22). Revelation announces it worldwide: "the hour of his judgment is come" (Revelation 14:7). The cross secured our forgiveness. The judgment shows the universe that God was right to forgive, and then sin is blotted out forever (Acts 3:19-20).',
    verses: [{ ref: 'Hebrews 9:23-24' }, { ref: 'Daniel 8:14' }, { ref: 'Daniel 7:9-10' }, { ref: 'Revelation 14:7' }, { ref: 'Acts 3:19-20' }],
    at: [75, 25],
  },
]

export interface Feast {
  name: string
  hebrew: string
  meaning: string
  season: 'spring' | 'fall'
  date: string
  type: string
  fulfilment: string
  verses: Verse[]
}

export const feasts: Feast[] = [
  {
    name: 'Passover',
    hebrew: 'Pesach',
    meaning: 'a passing over',
    season: 'spring',
    date: 'Abib 14',
    type: 'A lamb was killed and its blood put on the doorposts, and the destroyer passed over that house.',
    fulfilment: 'Christ died on Passover. "Christ our passover is sacrificed for us."',
    verses: [{ ref: 'Exodus 12:13' }, { ref: '1 Corinthians 5:7' }],
  },
  {
    name: 'Unleavened Bread',
    hebrew: 'Matstsot',
    meaning: 'unleavened cakes',
    season: 'spring',
    date: 'Abib 15–21',
    type: 'Seven days with all leaven removed from the house. Leaven was a standard picture of sin spreading.',
    fulfilment: 'The sinless Christ lay in the tomb over the Sabbath. Believers keep the feast "with the unleavened bread of sincerity and truth."',
    verses: [{ ref: 'Leviticus 23:6' }, { ref: '1 Corinthians 5:8' }],
  },
  {
    name: 'Firstfruits',
    hebrew: 'Reshit',
    meaning: 'first, beginning',
    season: 'spring',
    date: 'Abib 16',
    type: 'The first sheaf of barley was waved before the LORD as a pledge of the harvest to come.',
    fulfilment: 'Christ rose that Sunday, "the firstfruits of them that slept," the guarantee of the resurrection harvest.',
    verses: [{ ref: 'Leviticus 23:10-11' }, { ref: '1 Corinthians 15:20' }],
  },
  {
    name: 'Pentecost',
    hebrew: 'Shavuot',
    meaning: 'weeks',
    season: 'spring',
    date: 'Fifty days later',
    type: 'Two leavened loaves were waved after seven full weeks of harvest.',
    fulfilment: 'The Spirit was poured out and three thousand were baptized. It was the signal that Christ had been inaugurated as Priest and King in heaven.',
    verses: [{ ref: 'Leviticus 23:16-17' }, { ref: 'Acts 2:1-4' }, { ref: 'Acts 2:33' }],
  },
  {
    name: 'Trumpets',
    hebrew: 'Yom Teruah',
    meaning: 'day of the shout or blast',
    season: 'fall',
    date: 'Tishri 1',
    type: 'Trumpets sounded ten days before the Day of Atonement as a call to get ready for judgment.',
    fulfilment: 'The worldwide preaching of Christ\'s soon return and the coming judgment in the decades before 1844.',
    verses: [{ ref: 'Leviticus 23:24' }, { ref: 'Joel 2:1' }],
  },
  {
    name: 'Day of Atonement',
    hebrew: 'Yom Kippur',
    meaning: 'day of atonement',
    season: 'fall',
    date: 'Tishri 10',
    type: 'The sanctuary was cleansed and the people were judged.',
    fulfilment: 'Christ\'s ministry in the most holy place of the heavenly sanctuary, the pre-advent judgment, beginning in 1844.',
    verses: [{ ref: 'Leviticus 16:30' }, { ref: 'Revelation 14:7' }],
  },
  {
    name: 'Tabernacles',
    hebrew: 'Sukkot',
    meaning: 'booths',
    season: 'fall',
    date: 'Tishri 15–21',
    type: 'Israel lived in booths and celebrated the last harvest of the year.',
    fulfilment: 'The final ingathering at Christ\'s return, and God living with His people forever.',
    verses: [{ ref: 'Leviticus 23:34' }, { ref: 'Revelation 21:3' }],
  },
]

export interface Garment {
  id: string
  name: string
  term: Term
  text: string
  christ: string
  verses: Verse[]
}

export const garments: Garment[] = [
  {
    id: 'mitre',
    name: 'Mitre and golden plate',
    term: { word: 'צִיץ', translit: 'tsits', lang: 'Hebrew', meaning: 'A shining plate or flower.' },
    text: 'A linen turban with a plate of pure gold tied to the front, engraved "HOLINESS TO THE LORD." It was worn so that Aaron could "bear the iniquity of the holy things" and the people\'s gifts would be accepted (Exodus 28:36-38).',
    christ: 'Our gifts and worship are flawed. Christ\'s holiness covers them, and that is why they are accepted.',
    verses: [{ ref: 'Exodus 28:36-38' }],
  },
  {
    id: 'onyx',
    name: 'Shoulder stones',
    term: { word: 'שֹׁהַם', translit: 'shoham', lang: 'Hebrew', meaning: 'Onyx, or possibly carnelian.' },
    text: 'Two onyx stones set in gold on the shoulders of the ephod, each engraved with six tribal names in birth order, "for a memorial" (Exodus 28:9-12).',
    christ: '"The government shall be upon his shoulder" (Isaiah 9:6). Christ carries His people with all of His strength.',
    verses: [{ ref: 'Exodus 28:9-12' }, { ref: 'Isaiah 9:6' }],
  },
  {
    id: 'breastplate',
    name: 'Breastplate of judgment',
    term: { word: 'חֹשֶׁן', translit: 'choshen', lang: 'Hebrew', meaning: 'Breastpiece, which held the Urim and Thummim, "lights and perfections."' },
    text: 'A folded square of the same four colours and gold, set with twelve stones in four rows of three, each engraved with a tribe\'s name. It was worn over the heart "when he goeth in unto the holy place." The Urim and Thummim, used to learn God\'s will, were kept in it (Exodus 28:15-30).',
    christ: 'He carries our names on His heart before the Father. Each stone is different and each is set in gold. It is called the breastplate "of judgment" because He represents us in the judgment.',
    verses: [{ ref: 'Exodus 28:15-21' }, { ref: 'Exodus 28:29-30' }],
  },
  {
    id: 'ephod',
    name: 'The ephod',
    term: { word: 'אֵפוֹד', translit: 'ephod', lang: 'Hebrew', meaning: 'A sleeveless outer vest. Its exact shape is uncertain.' },
    text: 'Made of gold thread, blue, purple, scarlet and fine twined linen, with a skilfully woven band around the waist (Exodus 28:6-8). Gold hammered into thin threads was worked right into the fabric (Exodus 39:3).',
    christ: 'The same materials as the gate and the veil, with gold added. The priest wears the sanctuary, and Christ is the sanctuary\'s meaning.',
    verses: [{ ref: 'Exodus 28:6-8' }, { ref: 'Exodus 39:3' }],
  },
  {
    id: 'robe',
    name: 'Robe of the ephod',
    term: { word: 'מְעִיל', translit: "me'il", lang: 'Hebrew', meaning: 'An outer robe or mantle.' },
    text: 'A robe made entirely of blue. Golden bells alternated with pomegranates of blue, purple and scarlet around the hem, so the people could hear him moving while he ministered out of sight (Exodus 28:31-35).',
    christ: 'The people listened for the bells while the priest was inside. Christ\'s people wait for Him to come out again (Hebrews 9:28). The bells and pomegranates have also long been read as witness and fruit (Galatians 5:22-23).',
    verses: [{ ref: 'Exodus 28:31-35' }, { ref: 'Hebrews 9:28' }],
  },
  {
    id: 'linen',
    name: 'Linen coat',
    term: { word: 'בַּד', translit: 'bad', lang: 'Hebrew', meaning: 'Plain white linen, the material of the Day of Atonement garments.' },
    text: 'Under everything was a fine linen coat. On the Day of Atonement the high priest wore only plain linen: coat, breeches, sash and turban (Leviticus 16:4). In Daniel, the heavenly being "clothed in linen" appears in the same visions as the cleansing of the sanctuary (Daniel 10:5).',
    christ: '"The fine linen is the righteousness of saints" (Revelation 19:8). It is Christ\'s righteousness, given to His people.',
    verses: [{ ref: 'Leviticus 16:4' }, { ref: 'Revelation 19:8' }, { ref: 'Daniel 10:5' }],
  },
]

export const priestTerms: Term[] = [
  { word: 'כֹּהֵן גָּדוֹל', translit: 'kohen gadol', lang: 'Hebrew', meaning: 'High priest, literally "great priest."' },
  { word: 'ἀρχιερεύς', translit: 'archiereus', lang: 'Greek', meaning: 'High priest. Hebrews uses it again and again for Jesus.' },
  { word: 'λειτουργός', translit: 'leitourgos', lang: 'Greek', meaning: 'Minister or public servant (Hebrews 8:2). The source of our word "liturgy."' },
]

export const stones: { name: string; color: string }[] = [
  { name: 'Sardius', color: '#b3262e' },
  { name: 'Topaz', color: '#d9b44a' },
  { name: 'Carbuncle', color: '#8f1d3a' },
  { name: 'Emerald', color: '#1f8a5b' },
  { name: 'Sapphire', color: '#2b4fa8' },
  { name: 'Diamond', color: '#e7eef2' },
  { name: 'Ligure', color: '#d07a2e' },
  { name: 'Agate', color: '#9a7b62' },
  { name: 'Amethyst', color: '#7a4a9e' },
  { name: 'Beryl', color: '#5fb3a8' },
  { name: 'Onyx', color: '#3a3436' },
  { name: 'Jasper', color: '#5f8f4a' },
]

export const priestVerses: Verse[] = [
  { ref: 'Hebrews 4:14-16', note: 'A great high priest, touched with our infirmities' },
  { ref: 'Hebrews 8:1-2', note: 'Set on the right hand of the throne' },
  { ref: 'Hebrews 9:11-12', note: 'By his own blood' },
  { ref: 'Hebrews 7:24-25', note: 'An unchangeable priesthood' },
  { ref: '1 Timothy 2:5', note: 'One mediator' },
  { ref: '1 Peter 2:9', note: 'A royal priesthood' },
]

export interface Period {
  id: string
  label: string
  start: number
  end: number
  title: string
  text: string
  verses: Verse[]
}

// Years: negative = BC. 457 BC to AD 1844 is 2300 years because there is no year zero.
export const prophecyPeriods: Period[] = [
  {
    id: 'sevenWeeks',
    label: '7 weeks',
    start: -457,
    end: -408,
    title: '49 years: the city rebuilt',
    text: 'The prophecy starts "from the going forth of the commandment to restore and to build Jerusalem" (Daniel 9:25). The decree that fits is Artaxerxes\' in his seventh year, 457 BC (Ezra 7:7-8). It was the first to give Jerusalem civil self-government and not only permission to build the temple (Ezra 7:25-26). The first seven weeks, or 49 years, cover the rebuilding "in troublous times."',
    verses: [{ ref: 'Daniel 9:25' }, { ref: 'Ezra 7:7-8' }, { ref: 'Ezra 7:25-26' }],
  },
  {
    id: 'sixtyTwo',
    label: '62 weeks',
    start: -408,
    end: 27,
    title: '434 years: to the Anointed One',
    text: 'Sixty-nine weeks, 483 years, run "unto the Messiah the Prince." Counting from 457 BC brings us to AD 27, the fifteenth year of Tiberius, when Jesus was baptized and anointed by the Spirit (Luke 3:1; Luke 3:21-22). "Messiah" means anointed. Jesus began preaching with the words "The time is fulfilled" (Mark 1:15).',
    verses: [{ ref: 'Luke 3:1' }, { ref: 'Luke 3:21-22' }, { ref: 'Mark 1:14-15' }],
  },
  {
    id: 'lastWeek',
    label: '1 week',
    start: 27,
    end: 34,
    title: '7 years: the covenant confirmed',
    text: '"In the midst of the week he shall cause the sacrifice and the oblation to cease" (Daniel 9:27). Three and a half years after His baptism, in the spring of AD 31, Messiah was "cut off, but not for himself" (Daniel 9:26), and the veil tore. At the end of the week, in AD 34, Stephen was stoned and the gospel spread to the Samaritans and the Gentiles (Acts 8:1-4). That closed the 490 years given to the nation.',
    verses: [{ ref: 'Daniel 9:26-27' }, { ref: 'Acts 7:56-59' }, { ref: 'Acts 8:1-4' }],
  },
  {
    id: 'seventy',
    label: '70 weeks',
    start: -457,
    end: 34,
    title: '490 years: the seventy weeks',
    text: 'Gabriel says seventy weeks are "determined" for Daniel\'s people and Jerusalem (Daniel 9:24). Seventy weeks of years is 490 years. Six things were to happen within them: to finish the transgression, make an end of sins, make reconciliation for iniquity, bring in everlasting righteousness, seal up the vision and prophecy, and anoint the most holy. Every one of them is Messiah\'s work. The last, the anointing of the most holy, points to the inauguration of the heavenly sanctuary when Christ ascended.',
    verses: [{ ref: 'Daniel 9:24' }, { ref: 'Hebrews 9:11-12' }],
  },
  {
    id: 'remainder',
    label: '1,810 years',
    start: 34,
    end: 1844,
    title: 'The rest of the 2,300 years',
    text: 'The 490 years were "determined," literally cut off, from the 2,300 (Daniel 9:24). Gabriel came back specifically to explain the vision (mar\'eh) that had left Daniel sick and confused, which was the 2,300-day vision of chapter 8 (Daniel 8:26-27; Daniel 9:23). Subtract 490 from 2,300 and 1,810 years remain. Added to AD 34, that reaches 1844. On the Day of Atonement that autumn, by the ancient Jewish reckoning, Christ began the closing phase of His ministry: the cleansing of the heavenly sanctuary.',
    verses: [{ ref: 'Daniel 8:14' }, { ref: 'Daniel 9:24' }, { ref: 'Daniel 8:26-27' }, { ref: 'Revelation 14:6-7' }],
  },
]

export const prophecyTerms: Term[] = [
  { word: 'עֶרֶב בֹּקֶר', translit: "'ereb boqer", lang: 'Hebrew', meaning: '"Evening-morning," the unit counted in Daniel 8:14. It echoes Genesis 1 and means full days, not half-days of sacrifices.' },
  { word: 'נֶחְתַּךְ', translit: 'nechtak', lang: 'Hebrew', meaning: '"Determined" in Daniel 9:24. It appears only here in the Bible. In later Hebrew it means "cut off" or "cut out," which suggests the 70 weeks were sliced off a longer period.' },
  { word: 'מַרְאֶה', translit: "mar'eh", lang: 'Hebrew', meaning: 'Appearance or vision. Used in Daniel 8:26 for the 2,300 days and again in 9:23 when Gabriel tells Daniel to "consider the vision."' },
  { word: 'קֹדֶשׁ קָדָשִׁים', translit: 'qodesh qodashim', lang: 'Hebrew', meaning: '"Most holy." Daniel 9:24 says the 70 weeks end with the anointing of the most holy, which matches the anointing that inaugurated a sanctuary (Exodus 30:26-29).' },
]

export const prophecyKeys: Verse[] = [
  { ref: 'Daniel 8:14', note: 'The 2,300 days' },
  { ref: 'Daniel 9:24', note: 'Seventy weeks are determined' },
  { ref: 'Numbers 14:34', note: 'Each day for a year' },
  { ref: 'Ezekiel 4:6', note: 'I have appointed thee each day for a year' },
  { ref: 'Daniel 8:17', note: 'At the time of the end shall be the vision' },
]

export interface QuizQ {
  q: string
  options: string[]
  answer: number
  explain: string
}

export const quiz: QuizQ[] = [
  {
    q: 'How many entrances did the court of the tabernacle have?',
    options: ['One', 'Two', 'Four', 'Twelve'],
    answer: 0,
    explain: 'There was one gate, on the east side. "I am the door: by me if any man enter in, he shall be saved" (John 10:9).',
  },
  {
    q: 'What was the first piece of furniture a worshipper met inside the gate?',
    options: ['The laver', 'The altar of burnt offering', 'The golden candlestick', 'The ark'],
    answer: 1,
    explain: 'The altar came first. Every approach to God begins at the cross.',
  },
  {
    q: 'What was the laver made from?',
    options: ['Gold brought out of Egypt', 'Silver from the atonement money', 'The women\'s bronze mirrors', 'Acacia wood'],
    answer: 2,
    explain: 'Exodus 38:8. Like the Word, it shows you yourself and then washes you.',
  },
  {
    q: 'What does the Hebrew lechem ha-panim, "shewbread," literally mean?',
    options: ['Bread of affliction', 'Bread of the face (presence)', 'Bread of heaven', 'Bread of the covenant'],
    answer: 1,
    explain: 'It was bread set before God\'s face, always in His presence. Twelve loaves were renewed every Sabbath (Leviticus 24:5-8).',
  },
  {
    q: 'The cups of the lampstand were shaped like the blossoms of which tree?',
    options: ['Olive', 'Fig', 'Almond', 'Pomegranate'],
    answer: 2,
    explain: 'Almond (Exodus 25:33). Aaron\'s rod, kept with the ark, sprouted almonds (Numbers 17:8).',
  },
  {
    q: 'Where did the fire for the altar of incense have to come from?',
    options: ['Any clean fire', 'The altar of burnt offering', 'The lampstand', 'A new fire lit each day'],
    answer: 1,
    explain: 'From the bronze altar (Leviticus 16:12). Nadab and Abihu died for offering "strange fire" (Leviticus 10:1-2).',
  },
  {
    q: 'When Jesus died, how was the veil of the temple torn?',
    options: ['From the bottom to the top', 'From the top to the bottom', 'Through the middle', 'It was burned'],
    answer: 1,
    explain: 'From the top to the bottom (Matthew 27:51). God tore it, opening "a new and living way."',
  },
  {
    q: 'Romans 3:25 calls Christ our "propitiation." What Greek word does Paul use?',
    options: ['Hilastērion, the word for the mercy seat', 'Katapetasma, the veil', 'Thusiastērion, the altar', 'Skēnē, the tent'],
    answer: 0,
    explain: 'Hilastērion is the word the Greek Old Testament uses for the mercy seat. Christ is the place where God and sinner meet.',
  },
  {
    q: 'On the Day of Atonement, which goat was slain?',
    options: ['The LORD\'s goat', 'The scapegoat', 'Both goats', 'Neither'],
    answer: 0,
    explain: 'Only the LORD\'s goat. The scapegoat shed no blood and made no atonement. It carried away the responsibility for sin (Leviticus 16:15-22).',
  },
  {
    q: 'In symbolic time prophecy, a prophetic day stands for…',
    options: ['A week', 'A month', 'A year', 'A thousand years'],
    answer: 2,
    explain: 'Numbers 14:34 and Ezekiel 4:6: "each day for a year."',
  },
  {
    q: 'The 70 weeks of Daniel 9 begin in 457 BC. When do they end?',
    options: ['AD 27', 'AD 31', 'AD 34', 'AD 70'],
    answer: 2,
    explain: '490 years from 457 BC reach AD 34, when Stephen was stoned and the gospel went to the Gentiles.',
  },
  {
    q: 'Where does Christ minister as High Priest today?',
    options: ['In the temple at Jerusalem', 'In the heavenly sanctuary', 'In every church building', 'Nowhere, since His work ended at the cross'],
    answer: 1,
    explain: '"In the heavens; a minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man" (Hebrews 8:1-2).',
  },
]

export const generalResources = [
  { title: 'The Holy Bible (KJV)', detail: 'Every verse on this site is quoted from the King James Version. Click any reference to read the full chapter.', url: 'https://www.biblegateway.com/versions/King-James-Version-KJV-Bible/' },
  { title: 'Leviticus 16 with Hebrews 8–10', detail: 'Read the type and its fulfilment side by side. This is the best single study you can do on the subject.', url: 'https://www.biblegateway.com/passage/?search=Leviticus+16%3BHebrews+8-10&version=KJV' },
]
